console.log("💬 티스토리 댓글 자동 입력 시작");

chrome.storage.local.get("comments", ({ comments }) => {
  const textarea = document.querySelector("textarea[name='comment']");
  const button = document.querySelector("button.submit");

  if (!textarea || !button) {
    console.warn("댓글 입력창 또는 버튼을 찾지 못했습니다.");
    return;
  }

  const randomComment = comments[Math.floor(Math.random() * comments.length)];
  textarea.value = randomComment;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));

  setTimeout(() => {
    button.click();
    console.log("✅ 댓글 작성 완료:", randomComment);
  }, 1000);
});
