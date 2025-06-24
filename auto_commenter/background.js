chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "start_search") {
    chrome.storage.local.get(
      ["keyword", "platform"],
      ({ keyword, platform }) => {
        const encoded = encodeURIComponent(keyword);

        let searchUrl = "";

        if (platform === "naver") {
          searchUrl = `https://section.blog.naver.com/Search/Post.naver?query=${encoded}`;
        } else if (platform === "tistory") {
          searchUrl = `https://search.daum.net/search?w=blog&q=${encoded}`;
        }

        if (searchUrl) {
          chrome.tabs.create({ url: searchUrl });
        }
      }
    );
  }
});
