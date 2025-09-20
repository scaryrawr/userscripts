import z from "zod";

const main = () => {
  if (!window.LanguageModel) return;

  const sessionPromise = LanguageModel.create({
    initialPrompts: [
      {
        role: "system",
        content:
          "You are a constructive feedback meter for user comments. Rate the constructive feedback of the user's input with an emoji. This emoji will be used to encourage or discourage the user from posting their comment. You may also provide a replacement comment that is more constructive.",
      },
    ],
  });

  const responseSchema = z.object({
    emoji: z.string().describe("A single emoji representing the constructiveness of the comment"),
    suggestion: z.string().optional().describe("Replacement text for the comment to be more constructive"),
  });

  const responseConstraint = z.toJSONSchema(responseSchema);

  const commentSelector = window.location.hostname.includes("github")
    ? "textarea.js-comment-field"
    : 'textarea[aria-label="Add a comment"]';

  const observer = new MutationObserver((mutations) => {
    const DEBOUNCE_MS = 500;

    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const textarea = node.querySelector(commentSelector);

        if (!(textarea instanceof HTMLTextAreaElement)) return;

        const emojiSpan = node.querySelector(".emoji-feedback") ?? document.createElement("h1");
        emojiSpan.textContent = "⏳";
        emojiSpan.className = "emoji-feedback";
        if (!(emojiSpan instanceof HTMLElement)) return;
        if (!emojiSpan.isConnected) {
          textarea.parentElement?.appendChild(emojiSpan);
        }

        emojiSpan.onclick = () => {
          const suggestion = emojiSpan.title;
          if (!suggestion) return;
          void navigator.clipboard.writeText(suggestion);
        };

        let abortController: AbortController | undefined = undefined;
        let timer: number | undefined = undefined;
        textarea.addEventListener("input", (e) => {
          const target = e.target;
          if (!(target instanceof HTMLTextAreaElement)) return;

          // reset any existing timer
          if (timer) clearTimeout(timer);
          abortController?.abort();

          // schedule a debounced prompt
          abortController = new AbortController();
          const signal = abortController.signal;
          timer = window.setTimeout(() => {
            const userInput = target.value;
            sessionPromise
              .then(async (session) => {
                // Always start with an empty session to avoid confusing the LLM.
                const lm = await session.clone();
                try {
                  const response = await lm.prompt(
                    `The user wants to comment:
            <comment>${userInput}</comment>
            
            Please rate with a single emoji the constructiveness of this comment. Please provide a suggested replacement if the comment is not constructive.`,
                    {
                      responseConstraint,
                      signal,
                    },
                  );

                  const parseResults = responseSchema.safeParse(JSON.parse(response));
                  const { emoji, suggestion } = parseResults.success
                    ? parseResults.data
                    : { emoji: "⏳", suggestion: "" };
                  emojiSpan.textContent = emoji;
                  emojiSpan.title = suggestion ?? "";
                } catch {
                  // ignore errors
                } finally {
                  lm.destroy();
                }
              })
              .catch(() => {
                // ignore error
              });
          }, DEBOUNCE_MS);
        });
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

(() => {
  // Wait for the page to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
