chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParam = tab.url.split("?")[1];
        const urlParams = new URLSearchParams(queryParam);

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParams.get("v"),
        });
    }
});
