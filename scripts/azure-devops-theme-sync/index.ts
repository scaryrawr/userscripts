type Theme = "light" | "dark";

const THEME_LIGHT = "ms.vss-web.vsts-theme";
const THEME_DARK = "ms.vss-web.vsts-theme-dark";
const CLASS_LIGHT = "ms-vss-web-vsts-theme";
const CLASS_DARK = "ms-vss-web-vsts-theme-dark";

const getApiPath = (): string => {
  const { hostname, pathname } = window.location;

  // dev.azure.com/{org}/... -> /{org}/_apis/...
  if (hostname === "dev.azure.com") {
    const org = pathname.split("/")[1];
    return `/${org}/_apis/Settings/Entries/globalme`;
  }

  // {org}.visualstudio.com/... -> /_apis/...
  return `/_apis/Settings/Entries/globalme`;
};

const getOsTheme = (): Theme => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const getCurrentTheme = (): Theme | undefined => {
  if (!document.body) return undefined;
  if (document.body.classList.contains(CLASS_DARK)) return "dark";
  if (document.body.classList.contains(CLASS_LIGHT)) return "light";
  return undefined;
};

const applyTheme = (theme: Theme): void => {
  const { body } = document;
  if (!body) return;
  if (theme === "dark") {
    body.classList.remove(CLASS_LIGHT);
    body.classList.add(CLASS_DARK);
    body.dataset.theme = THEME_DARK;
  } else {
    body.classList.remove(CLASS_DARK);
    body.classList.add(CLASS_LIGHT);
    body.dataset.theme = THEME_LIGHT;
  }
};

const saveTheme = async (theme: Theme): Promise<void> => {
  const themeId = theme === "dark" ? THEME_DARK : THEME_LIGHT;
  const response = await fetch(getApiPath(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;api-version=4.1-preview.1",
    },
    body: JSON.stringify({ "WebPlatform/Theme": themeId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to set theme: ${response.status}`);
  }
};

const syncTheme = async (): Promise<void> => {
  const osTheme = getOsTheme();
  const currentTheme = getCurrentTheme();
  if (currentTheme === osTheme) return;

  applyTheme(osTheme);

  try {
    await saveTheme(osTheme);
  } catch {
    // Ignore save errors to avoid blocking UI updates
  }
};

const waitForTheme = (): void => {
  if (getCurrentTheme()) {
    void syncTheme();
    return;
  }

  const observer = new MutationObserver(() => {
    if (getCurrentTheme()) {
      observer.disconnect();
      void syncTheme();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
};

const main = (): void => {
  waitForTheme();
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  // addEventListener on MediaQueryList was added in Safari 14 / iOS Safari 14;
  // fall back to the deprecated addListener for older versions.
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", () => void syncTheme());
  } else {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    mediaQuery.addListener(() => void syncTheme());
  }
};

main();
