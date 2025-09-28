import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { LanguageModelV2 } from "@ai-sdk/provider";
import { generateObject, generateText, jsonSchema, streamText, type ModelMessage } from "ai";

const lmstudio = createOpenAICompatible({
  baseURL: "http://localhost:1234/v1",
  name: "lmsutdio",
});

class LanguageModelFill extends EventTarget implements LanguageModel {
  private _model: LanguageModelV2;
  private _topK: number;
  private _temperature: number;
  private _inputUsage: number = 0;
  private _inputQuota: number = 1000000; // 1M tokens default quota
  private _conversationHistory: ModelMessage[] = [];

  constructor(model: LanguageModelV2, options?: LanguageModelCreateOptions) {
    super();
    this._model = model;
    this._topK = options?.topK ?? 20;
    this._temperature = options?.temperature ?? 0.7;

    // Handle initial prompts if provided
    if ("initialPrompts" in (options || {})) {
      const createOptions = options;
      if (createOptions?.initialPrompts) {
        this._conversationHistory = this.convertInitialPromptsToMessages(createOptions.initialPrompts);
      }
    }
  }

  static create(options?: LanguageModelCreateOptions): Promise<LanguageModel> {
    return Promise.resolve(new LanguageModelFill(lmstudio("qwen/qwen3-32b"), options));
  }

  static availability(/*options?: LanguageModelCreateCoreOptions*/): Promise<Availability> {
    // For now, return "downloadable" since we need providers to be implemented
    // In a real implementation, this would check if the required provider/model is available
    try {
      // You could check network connectivity, API keys, etc.
      // For now, we assume everything is downloadable but not immediately available
      return Promise.resolve("downloadable");
    } catch {
      return Promise.resolve("unavailable");
    }
  }

  static params(): Promise<LanguageModelParams> {
    return Promise.resolve({
      defaultTopK: 20,
      maxTopK: 100,
      defaultTemperature: 0.7,
      maxTemperature: 2.0,
    });
  }

  async prompt(input: LanguageModelPrompt, options?: LanguageModelPromptOptions): Promise<string> {
    if (!input) {
      throw new Error("Input cannot be empty");
    }

    try {
      this.checkQuota();
      const messages = this.convertPromptToMessages(input);

      if (messages.length === 0) {
        throw new Error("No valid messages to process");
      }

      if (options?.responseConstraint) {
        // Use generateObject for structured output - convert responseConstraint to zod schema
        const schema = jsonSchema(options.responseConstraint);
        const result = await generateObject({
          model: this._model,
          messages,
          schema,
          temperature: this._temperature,
          topK: this._topK,
          abortSignal: options?.signal,
        });

        const response = JSON.stringify(result.object);
        this.updateUsageAndHistory(input, response);
        return response;
      } else {
        // Use generateText for regular text generation
        const result = await generateText({
          model: this._model,
          messages,
          temperature: this._temperature,
          topK: this._topK,
          abortSignal: options?.signal,
        });

        this.updateUsageAndHistory(input, result.text);
        return result.text;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw error;
        }
        // Handle AI SDK specific errors
        if (error.message.includes("quota") || error.message.includes("limit")) {
          this.dispatchQuotaOverflowEvent();
        }
      }
      throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : error}`);
    }
  }

  promptStreaming(input: LanguageModelPrompt, options?: LanguageModelPromptOptions): ReadableStream<string> {
    if (!input) {
      throw new Error("Input cannot be empty");
    }

    const messages = this.convertPromptToMessages(input);
    if (messages.length === 0) {
      throw new Error("No valid messages to process");
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new ReadableStream({
      async start(controller) {
        try {
          self.checkQuota();

          const stream = streamText({
            model: self._model,
            messages,
            temperature: self._temperature,
            topK: self._topK,
            abortSignal: options?.signal,
          });

          let fullResponse = "";

          try {
            for await (const chunk of stream.textStream) {
              fullResponse += chunk;
              controller.enqueue(chunk);
            }

            self.updateUsageAndHistory(input, fullResponse);
            controller.close();
          } catch (streamError) {
            if (streamError instanceof Error && streamError.name === "AbortError") {
              controller.error(streamError);
              return;
            }
            controller.error(
              new Error(`Stream error: ${streamError instanceof Error ? streamError.message : streamError}`),
            );
          }
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === "AbortError") {
              controller.error(error);
              return;
            }
            if (error.message.includes("quota") || error.message.includes("limit")) {
              self.dispatchQuotaOverflowEvent();
            }
          }
          controller.error(new Error(`Failed to start stream: ${error instanceof Error ? error.message : error}`));
        }
      },
    });
  }

  async append(input: LanguageModelPrompt /*, options?: LanguageModelAppendOptions*/): Promise<undefined> {
    if (!input) {
      throw new Error("Input cannot be empty");
    }

    try {
      const messages = this.convertPromptToMessages(input);
      // Add to conversation history without generating a response - take only new messages
      const newMessages = messages.slice(this._conversationHistory.length);
      this._conversationHistory.push(...newMessages);

      // Update usage for appended content (input only, no response)
      const inputTokens = await this.measureInputUsage(input);
      this._inputUsage += inputTokens;

      return undefined;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }
      throw new Error(`Failed to append input: ${error instanceof Error ? error.message : error}`);
    }
  }

  measureInputUsage(input: LanguageModelPrompt, options?: LanguageModelPromptOptions): Promise<number> {
    // Better token estimation using a more accurate method
    const messages = this.convertPromptToMessages(input);
    let totalTokens = 0;

    for (const message of messages) {
      // Rough estimation: 4 chars = 1 token, plus overhead for role and formatting
      const contentTokens = Math.ceil(message.content.length / 4);
      const roleTokens = Math.ceil(message.role.length / 4);
      totalTokens += contentTokens + roleTokens + 2; // +2 for message formatting overhead
    }

    // Add tokens for response constraint if present
    if (options?.responseConstraint) {
      const constraintTokens = Math.ceil(JSON.stringify(options.responseConstraint).length / 4);
      totalTokens += constraintTokens;
    }

    return Promise.resolve(totalTokens);
  }

  get inputUsage(): number {
    return this._inputUsage;
  }

  get inputQuota(): number {
    return this._inputQuota;
  }

  onquotaoverflow: ((this: LanguageModel, ev: Event) => any) | null = null;

  get topK(): number {
    return this._topK;
  }

  get temperature(): number {
    return this._temperature;
  }

  clone(/*options?: LanguageModelCloneOptions*/): Promise<LanguageModel> {
    const cloned = new LanguageModelFill(this._model, {
      topK: this._topK,
      temperature: this._temperature,
    });
    // Copy conversation history and usage stats
    cloned._conversationHistory = [...this._conversationHistory];
    cloned._inputUsage = this._inputUsage;
    cloned._inputQuota = this._inputQuota;
    return Promise.resolve(cloned);
  }

  destroy(): undefined {
    this._conversationHistory = [];
    this._inputUsage = 0;
    this.removeAllListeners();
    return undefined;
  }

  private convertPromptToMessages(input: LanguageModelPrompt): ModelMessage[] {
    if (typeof input === "string") {
      return [...this._conversationHistory, { role: "user", content: input }];
    }

    const messages: ModelMessage[] = [...this._conversationHistory];

    for (const message of input) {
      let content = "";
      if (typeof message.content === "string") {
        content = message.content;
      } else {
        // Handle array of content items (text, image, audio)
        content = message.content
          .map((item) => {
            if (item.type === "text" && typeof item.value === "string") {
              return item.value;
            }
            return `[${item.type}]`; // Placeholder for non-text content
          })
          .join(" ");
      }

      // Convert LanguageModelMessage role to ModelMessage role
      const role =
        message.role === "user"
          ? ("user" as const)
          : message.role === "assistant"
            ? ("assistant" as const)
            : ("system" as const);

      messages.push({ role, content });
    }

    return messages;
  }

  private updateUsageAndHistory(input: LanguageModelPrompt, response: string): void {
    const inputTokens = Math.ceil((typeof input === "string" ? input.length : JSON.stringify(input).length) / 4);
    const outputTokens = Math.ceil(response.length / 4);

    this._inputUsage += inputTokens + outputTokens;

    // Add to conversation history
    if (typeof input === "string") {
      this._conversationHistory.push({ role: "user", content: input });
    } else {
      input.forEach((msg) => {
        const content = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
        const role =
          msg.role === "user"
            ? ("user" as const)
            : msg.role === "assistant"
              ? ("assistant" as const)
              : ("system" as const);
        this._conversationHistory.push({ role, content });
      });
    }

    this._conversationHistory.push({ role: "assistant", content: response });

    // Check quota overflow
    if (this._inputUsage > this._inputQuota) {
      this.dispatchQuotaOverflowEvent();
    }
  }

  private checkQuota(): void {
    if (this._inputUsage >= this._inputQuota) {
      throw new Error("Input quota exceeded");
    }
  }

  private dispatchQuotaOverflowEvent(): void {
    const event = new Event("quotaoverflow");
    this.dispatchEvent(event);
    if (this.onquotaoverflow) {
      this.onquotaoverflow.call(this, event);
    }
  }

  private convertInitialPromptsToMessages(
    initialPrompts: [LanguageModelSystemMessage, ...LanguageModelMessage[]] | LanguageModelMessage[],
  ): ModelMessage[] {
    const messages: ModelMessage[] = [];

    for (const message of initialPrompts) {
      let content = "";
      if (typeof message.content === "string") {
        content = message.content;
      } else {
        content = message.content
          .map((item) => {
            if (item.type === "text" && typeof item.value === "string") {
              return item.value;
            }
            return `[${item.type}]`;
          })
          .join(" ");
      }

      const role =
        message.role === "user"
          ? ("user" as const)
          : message.role === "assistant"
            ? ("assistant" as const)
            : ("system" as const);

      messages.push({ role, content });
    }

    return messages;
  }

  private removeAllListeners(): void {
    // Remove all event listeners - EventTarget doesn't have a built-in method for this
    // This is a simplified implementation
    this.onquotaoverflow = null;
  }
}

function main() {
  // Browser already has a Prompt API - assign the class constructor, not an instance
  if (!window.LanguageModel) {
    window.LanguageModel = LanguageModelFill;

    // Log that the polyfill has been loaded
    console.log("Prompt API polyfill loaded successfully");

    // Example usage (commented out for production):
    /*
    // Basic usage example:
    async function example() {
      try {
        const model = await window.LanguageModel.create({
          temperature: 0.7,
          topK: 50
        });
        
        // Simple text generation
        const response = await model.prompt("What is AI?");
        console.log("Response:", response);
        
        // Streaming text generation
        const stream = model.promptStreaming("Tell me a joke");
        const reader = stream.getReader();
        let result = "";
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += value;
          console.log("Chunk:", value);
        }
        
        // Structured output with constraints
        const structuredResponse = await model.prompt("Describe a cat", {
          responseConstraint: {
            name: "string",
            color: "string", 
            age: "number"
          }
        });
        console.log("Structured:", JSON.parse(structuredResponse));
        
        // Clean up
        model.destroy();
      } catch (error) {
        console.error("Example error:", error);
      }
    }
    */
  }
}

main();
