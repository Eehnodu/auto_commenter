// popup.js

document.getElementById("start").addEventListener("click", () => {
  const keyword = document.getElementById("keyword").value.trim();
  const platform = document.querySelector(
    'input[name="platform"]:checked'
  ).value;
  const commentTextareas = document.querySelectorAll("#commentList textarea");

  const comments = Array.from(commentTextareas)
    .map((c) => c.value.trim())
    .filter((c) => c.length > 0);

  if (!keyword || comments.length === 0) {
    showAlert("검색어와 댓글을 모두 입력해주세요.");
    return;
  }

  chrome.storage.local.set({ keyword, comments, platform }, () => {
    chrome.runtime.sendMessage({ type: "start_search" });
    window.close();
  });
});

function showAlert(message) {
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("alertModal").style.display = "flex";
}

document.getElementById("closeAlertBtn").addEventListener("click", () => {
  document.getElementById("alertModal").style.display = "none";
});
