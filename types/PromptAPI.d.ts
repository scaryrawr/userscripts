export {}; // Ensure this file is treated as a module (prevents global re-export leakage)

declare global {
  interface Window {
    readonly LanguageModel: LanguageModel | undefined;
  }
}
