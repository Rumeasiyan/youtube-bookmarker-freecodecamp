(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, respones) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const fetchBookmarks = () => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    const newVideoLoaded = async () => {
        const bookmarkBtnExists =
            document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "bookmark-btn" + "ytp-button";
            bookmarkBtn.title = "Bookmark this timestamp";

            youtubeLeftControls =
                document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    };

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            timestamp: currentTime,
            desc: "Bookmark at " + getCurrentTime(currentTime),
        };

       currentVideoBookmarks = await fetchBookmarks();

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify(
                [...currentVideoBookmarks, newBookmark].sort(
                    (a, b) => a.timestamp - b.timestamp
                )
            ),
        });
    };

    newVideoLoaded();
})();

const getCurrentTime = (time) => {
    var date = new Date(0);
    date.setSeconds(time);

    return date.toISOString().substr(11, 8);
};
