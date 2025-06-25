chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "START_COMMENT") {
    const { entryUrl, entryId, blogDomain, commentText } = request;

    chrome.tabs.create({ url: entryUrl }, (tab) => {
      // 탭 완전히 열린 후 실행
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["comment.js"],
        },
        () => {
          chrome.tabs.sendMessage(tab.id, {
            type: "POST_COMMENT",
            entryId,
            blogDomain,
            commentText,
          });
        }
      );
    });
  }
});
