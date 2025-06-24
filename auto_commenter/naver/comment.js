console.log("💬 블로그 게시글 로딩됨 - 댓글 작성 시도 중...");

chrome.storage.local.get("comments", ({ comments }) => {
  const frame = document.querySelector("iframe#mainFrame");
  if (!frame) {
    console.warn("iframe(mainFrame)을 찾을 수 없습니다.");
    return;
  }

  const iframeDoc = frame.contentDocument || frame.contentWindow.document;
  const input = iframeDoc.querySelector(".u_cbox_text");
  const button = iframeDoc.querySelector(".u_cbox_btn_upload");

  if (!input || !button) {
    console.warn("댓글 입력창 또는 버튼을 찾을 수 없습니다.");
    return;
  }

  const randomComment = comments[Math.floor(Math.random() * comments.length)];

  input.value = randomComment;
  input.dispatchEvent(new Event("input", { bubbles: true }));

  setTimeout(() => {
    button.click();
    console.log("✅ 댓글 작성 완료:", randomComment);
  }, 1000);
});
