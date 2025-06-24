chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "start_search") {
    chrome.storage.local.get("keyword", ({ keyword }) => {
      const encoded = encodeURIComponent(keyword);
      const searchUrl = `https://section.blog.naver.com/Search/Post.naver?query=${encoded}`;
      chrome.tabs.create({ url: searchUrl });
    });
  }
});
