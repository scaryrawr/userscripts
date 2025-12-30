# Azure DevOps Theme Sync

Automatically syncs Azure DevOps theme (Light/Dark) with your operating system's color scheme preference.

## Features

- Detects OS light/dark mode preference
- Automatically switches Azure DevOps theme to match
- Saves theme preference to Azure DevOps server (persists across devices)
- Listens for OS theme changes in real-time

## How It Works

1. On page load, the script waits for Azure DevOps to initialize its theme
2. Compares OS preference (`prefers-color-scheme`) with current Azure DevOps theme
3. If they differ, applies the matching theme classes immediately
4. Saves the new theme preference via Azure DevOps Settings API

## Caveats

### First Load Flash

On the very first page load after an OS theme change, you may see a brief flash of the old theme before the new theme is applied. This is because Azure DevOps pre-bakes theme colors into CSS at page load time. Subsequent navigations will load with the correct theme.

### No True Dynamic Switching

Azure DevOps uses Microsoft Fluent UI's theming system which pre-computes CSS colors rather than using CSS variables. This means we cannot dynamically re-theme the page the same way the built-in theme picker does (which triggers a full CSS regeneration from the server). Our script applies theme classes immediately to minimize flash, but some elements may not update until the next page load.

### Supported Themes

Only Light and Dark themes are supported for automatic sync:

- Light: `ms.vss-web.vsts-theme`
- Dark: `ms.vss-web.vsts-theme-dark`

Other themes (High Contrast, Blue, etc.) are not affected by this script.

## Supported Sites

- `https://dev.azure.com/*`
- `https://*.visualstudio.com/*`

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or similar userscript manager
2. Install the userscript from `dist/azure-devops-theme-sync.user.js`
