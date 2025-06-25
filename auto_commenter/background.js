let commentQueue = [];
let currentTabId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "START_COMMENT_BATCH") {
    const { entries, comments } = request;

    // 댓글 대기열 생성
    commentQueue = entries.map((entry) => ({
      ...entry,
      commentText: comments[Math.floor(Math.random() * comments.length)],
    }));

    // 첫 게시글 탭 열기
    const first = commentQueue[0];
    chrome.tabs.create({ url: first.entryUrl }, (tab) => {
      currentTabId = tab.id;
    });
  }

  if (request.type === "COMMENT_DONE") {
    // 현재 댓글 작업 완료 → 큐에서 제거
    commentQueue.shift();

    if (commentQueue.length === 0) {
      // 모두 끝났으면 탭 닫기
      if (currentTabId) chrome.tabs.remove(currentTabId);
      currentTabId = null;
      return;
    }

    // 다음 게시글로 탭 업데이트
    const next = commentQueue[0];
    chrome.tabs.update(currentTabId, { url: next.entryUrl });
  }
});

// 탭 로딩 완료되면 댓글 작성 메시지 전송
chrome.tabs.onUpdated.addListener((tabId, info) => {
  if (tabId === currentTabId && info.status === "complete") {
    if (commentQueue.length === 0) return;

    const current = commentQueue[0];

    // 약간의 딜레이 후 메시지 전송
    setTimeout(() => {
      chrome.tabs.sendMessage(
        tabId,
        {
          type: "POST_COMMENT",
          entryId: current.entryId,
          blogDomain: current.blogDomain,
          commentText: current.commentText,
        },
        (response) => {
          // 실패해도 다음으로 넘기기 위해 COMMENT_DONE 전송
          if (chrome.runtime.lastError) {
            chrome.runtime.sendMessage({ type: "COMMENT_DONE" });
          }
        }
      );
    }, 300);
  }
});
