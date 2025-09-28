# Prompt Fil A - Polyfill for the Prompt API

This userscript provides a polyfill implementation of the [Web Prompt API](https://github.com/webmachinelearning/prompt-api) using the [AI SDK](https://sdk.vercel.ai/) for text generation capabilities.

## Features

✅ **Implemented:**

- Complete `LanguageModel` interface implementation
- Text generation using `generateText` from AI SDK
- Streaming text generation using `streamText`
- Structured output generation using `generateObject`
- Conversation history management
- Token usage tracking and quota management
- Event handling for quota overflow
- Input validation and error handling
- Support for initial prompts and system messages
- Model cloning and cleanup

🚧 **In Progress:**

- Provider implementations (OpenAI, Claude, etc.)
- Better schema conversion for response constraints

## Current Implementation Status

The polyfill currently provides a complete interface implementation but uses placeholder providers. The architecture is designed to easily plug in different AI providers later.

### Key Components

1. **LanguageModelFill Class**: Main implementation of the `LanguageModel` interface
2. **Message Conversion**: Converts Prompt API messages to AI SDK format
3. **Usage Tracking**: Token-based quota system with overflow events
4. **Error Handling**: Comprehensive error handling with proper abort signal support
5. **Streaming Support**: ReadableStream implementation for real-time responses

### Supported Methods

- `LanguageModel.create()` - Create a new language model instance
- `LanguageModel.availability()` - Check model availability
- `LanguageModel.params()` - Get model parameters
- `prompt()` - Generate text responses
- `promptStreaming()` - Stream text responses
- `append()` - Add messages to conversation history
- `measureInputUsage()` - Estimate token usage
- `clone()` - Create model copies
- `destroy()` - Clean up resources

### Usage Example

```javascript
// Create a model instance
const model = await window.LanguageModel.create({
  temperature: 0.7,
  topK: 50,
  initialPrompts: [{ role: "system", content: "You are a helpful assistant." }],
});

// Simple text generation
const response = await model.prompt("What is machine learning?");
console.log(response);

// Streaming generation
const stream = model.promptStreaming("Tell me about AI");
const reader = stream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(value); // Each chunk as it arrives
}

// Structured output
const structured = await model.prompt("Describe a dog", {
  responseConstraint: {
    breed: "string",
    size: "string",
    temperament: "string",
  },
});

// Clean up
model.destroy();
```

## Next Steps

1. **Provider Implementation**: Add support for popular AI providers
2. **Configuration**: Allow API key configuration and provider selection
3. **Advanced Features**: Tool calling, multimodal support, etc.
4. **Testing**: Add comprehensive test suite
5. **Documentation**: Complete API documentation

## Technical Details

- Built with TypeScript for type safety
- Uses AI SDK v5.0+ for text generation
- Bundled as a UserScript for browser injection
- Follows the official Prompt API specification
- Compatible with Tampermonkey/Greasemonkey

## Contributing

The implementation is designed to be modular and extensible. Providers can be added by implementing the `LanguageModelV2` interface from AI SDK.
