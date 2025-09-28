export {}; // Ensure this file is treated as a module (prevents global re-export leakage)

declare global {
  interface Window {
    LanguageModel: LanguageModel | undefined;
  }
}
