
## Restrict Extensions to certain urls

Microsoft Edge extensions **can be configured to only be active on certain URLs**. 
This is done using the `permissions` and `host_permissions` fields in the extension's `manifest.json` file.
Example: `manifest.json` Configuration

Here’s how you can restrict your extension to specific URLs:

```json
{
  "manifest_version": 3,
  "name": "My Edge Extension",
  "version": "1.0",
  "description": "Only active on specific URLs",
  "permissions": ["scripting"],
  "host_permissions": [
    "https://example.com/*",
    "https://*.mydomain.com/*"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  }
}
```


### 🔍 Explanation

- **`host_permissions`**: Specifies which URLs the extension can access or inject scripts into.
- **Wildcards**: You can use `*` to match subdomains or paths.
- **Manifest v3**: This is the current standard for Chromium-based browsers like Edge and Chrome.

### 🧪 Optional: Programmatic Activation

If you want the extension to **only run scripts** on certain URLs, you can use `chrome.scripting` in the background script:

```javascript
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes("example.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content-script.js"]
    });
  }
});
```
