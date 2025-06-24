// popup.js
document.getElementById("start").addEventListener("click", async () => {
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

  chrome.storage.local.set({ keyword, comments, platform }, async () => {
    if (platform === "tistory") {
      try {
        const results = await searchTistory(keyword); // tistory/search.js에 정의된 함수
        console.log("티스토리 검색 결과:", results);
        // 여기서 results를 처리하거나 comment.js에 전달하는 방식 설계 가능
      } catch (e) {
        showAlert("검색 중 오류가 발생했습니다.");
        console.error(e);
      }
    } else if (platform === "naver") {
      // 이후 네이버 API 호출 시 이쪽 처리
    }
  });
});

function showAlert(message) {
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("alertModal").style.display = "flex";
}

document.getElementById("closeAlertBtn").addEventListener("click", () => {
  document.getElementById("alertModal").style.display = "none";
});
