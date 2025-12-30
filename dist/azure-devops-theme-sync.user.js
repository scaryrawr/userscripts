// ==UserScript==
// @name         Azure DevOps Theme Sync
// @namespace    https://github.com/scaryrawr/userscripts
// @version      1.0.0
// @description  Syncs Azure DevOps theme with OS light/dark mode preference
// @author       Mike Wallio
// @match        https://dev.azure.com/*
// @match        https://*.visualstudio.com/*
// @grant        none
// ==/UserScript==

// scripts/azure-devops-theme-sync/index.ts
var THEME_LIGHT = "ms.vss-web.vsts-theme";
var THEME_DARK = "ms.vss-web.vsts-theme-dark";
var CLASS_LIGHT = "ms-vss-web-vsts-theme";
var CLASS_DARK = "ms-vss-web-vsts-theme-dark";
var getApiPath = () => {
  const { hostname, pathname } = window.location;
  if (hostname === "dev.azure.com") {
    const org = pathname.split("/")[1];
    return `/${org}/_apis/Settings/Entries/globalme`;
  }
  return `/_apis/Settings/Entries/globalme`;
};
var getOsTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
var getCurrentTheme = () => {
  if (document.body.classList.contains(CLASS_DARK))
    return "dark";
  if (document.body.classList.contains(CLASS_LIGHT))
    return "light";
  return;
};
var applyTheme = (theme) => {
  const { body } = document;
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
var saveTheme = async (theme) => {
  const themeId = theme === "dark" ? THEME_DARK : THEME_LIGHT;
  const response = await fetch(getApiPath(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;api-version=4.1-preview.1"
    },
    body: JSON.stringify({ "WebPlatform/Theme": themeId })
  });
  if (!response.ok) {
    throw new Error(`Failed to set theme: ${response.status}`);
  }
};
var syncTheme = async () => {
  const osTheme = getOsTheme();
  const currentTheme = getCurrentTheme();
  if (currentTheme === osTheme)
    return;
  applyTheme(osTheme);
  try {
    await saveTheme(osTheme);
  } catch {}
};
var waitForTheme = () => {
  if (getCurrentTheme()) {
    syncTheme();
    return;
  }
  const observer = new MutationObserver(() => {
    if (getCurrentTheme()) {
      observer.disconnect();
      syncTheme();
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });
};
var main = () => {
  waitForTheme();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => void syncTheme());
};
main();
