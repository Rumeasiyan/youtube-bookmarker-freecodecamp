import { getActiveTabURL } from "./utils.js";

const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = () => {};

const onPause = () => {};

const setBookmark = () => {};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTabURL = await getActiveTabURL();
    const queryParam = activeTabURL.split("?")[1];
    const urlParams = new URLSearchParams(queryParam);

    const videoId = urlParams.get("v");

    if (activeTabURL.includes("youtube.com/watch") && videoId) {
        chrome.storage.sync.get([videoId], (obj) => {
            const bookmarks = obj[videoId] ? JSON.parse(obj[videoId]) : [];
        });
    } else {
        document.getElementById("container")[0].innerHTML =
            '<div class="title">Please open a YouTube video to view and add bookmarks.</div>';
    }
});
