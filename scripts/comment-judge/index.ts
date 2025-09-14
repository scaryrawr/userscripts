import z from "zod";

const main = async () => {
  if (!window.LanguageModel) return;

  const session = await LanguageModel.create({
    initialPrompts: [
      {
        role: "system",
        content:
          "You are a constructive feedback meter. Rate the constructive feedback of the user's input with an emoji. This emoji will be used to encourage or discourage the user from posting their comment. You may also provide a replacement comment that is more constructive.",
      },
    ],
  });

  const responseSchema = z.object({
    emoji: z
      .string()
      .describe(
        "A single emoji representing the constructiveness of the comment"
      ),
    suggestion: z
      .string()
      .optional()
      .describe("Replacement text for the comment to be more constructive"),
  });

  const responseConstraint = z.toJSONSchema(responseSchema);

  const commentSelector = window.location.hostname.includes("github")
    ? "textarea.js-comment-field"
    : 'textarea[aria-label="Add a comment"]';

  const observer = new MutationObserver((mutations) => {
    const emojiPlaceholders = new WeakMap<HTMLTextAreaElement, HTMLElement>();
    const debounceTimers = new WeakMap<HTMLTextAreaElement, number>();
    const DEBOUNCE_MS = 500;

    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const textarea = node.querySelector(commentSelector);

        if (!(textarea instanceof HTMLTextAreaElement)) return;

        const emojiSpan =
          node.querySelector(".emoji-feedback") ?? document.createElement("h1");
        emojiSpan.textContent = "⏳";
        emojiSpan.className = "emoji-feedback";
        if (!(emojiSpan instanceof HTMLElement)) return;
        emojiPlaceholders.set(textarea, emojiSpan);
        if (!emojiSpan.isConnected) {
          textarea.parentElement?.appendChild(emojiSpan);
        }

        emojiSpan.onclick = () => {
          const suggestion = emojiSpan.title;
          if (!suggestion) return;
          navigator.clipboard.writeText(suggestion);
        };

        textarea.addEventListener("input", (e) => {
          const target = e.target;
          if (!(target instanceof HTMLTextAreaElement)) return;

          // reset any existing timer
          const existing = debounceTimers.get(target);
          if (existing) clearTimeout(existing);

          // schedule a debounced prompt
          const timer = window.setTimeout(async () => {
            debounceTimers.delete(target);
            const userInput = target.value;

            // Always start with an empty session to avoid confusing the LLM.
            const lm = await session.clone();
            try {
              const response = await lm.prompt(
                `The user wants to comment:
            <comment>${userInput}</comment>
            
            Please rate with a single emoji the constructiveness of this comment.`,
                {
                  responseConstraint,
                }
              );

              const parsed = JSON.parse(response);
              const { emoji, suggestion } = responseSchema.parse(parsed);
              emojiSpan.textContent = emoji;
              emojiSpan.title = suggestion ?? "";
            } catch {
              // ignore parse errors
            } finally {
              lm.destroy();
            }
          }, DEBOUNCE_MS);

          debounceTimers.set(target, timer);
        });
      });

      mutation.removedNodes.forEach((node) => {
        if (!(node instanceof HTMLTextAreaElement)) return;

        const timer = debounceTimers.get(node);
        debounceTimers.delete(node);
        if (timer) clearTimeout(timer);

        const emojiSpan = emojiPlaceholders.get(node);
        emojiPlaceholders.delete(node);
        emojiSpan?.remove();
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
