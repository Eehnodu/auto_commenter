// 현재 페이지가 티스토리 블로그인지 확인
if (
  document.location.href.includes("/m/api/") ||
  document.body.innerHTML.includes("티스토리")
) {
  // background.js로부터 댓글 작성 요청 수신
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "POST_COMMENT") {
      const { entryId, blogDomain, commentText } = request;

      // 댓글 전송 API URL 구성
      const url = `https://${blogDomain}/m/api/${entryId}/comment`;

      // 전송할 댓글 페이로드 구성
      const payload = {
        comment: commentText,
        homepage: "https://automaker404.tistory.com",
        isSecret: false,
        name: "오메404",
        parent: null,
        captcha: "",
        mentionId: null,
        password:
          "f215faf9d88b7f0a881632ee22459ee452a296c808d261b6cc993d3a1fd0600e",
      };

      // 댓글 POST 요청 후 결과와 관계없이 완료 메시지 전송
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      }).finally(() => {
        // 댓글 작업 완료 알림 (다음 단계 진행을 위한 트리거)
        chrome.runtime.sendMessage({ type: "COMMENT_DONE" }, () => {});
      });
    }
  });
}
