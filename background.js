chrome.tabs.onUpdated.addListener(function (tabId, tab) {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParam = tab.url.split("?")[1];
        const urlParams = new URLSearchParams(queryParam);
        console.log(urlParams.get("v"));

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParams.get("v"),
        });
    }
});
