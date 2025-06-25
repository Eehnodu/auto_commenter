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
        const results = await searchTistory(keyword);
        console.log("티스토리 검색 결과:", results);

        if (results.length === 0) {
          showAlert("검색 결과가 없습니다.");
          return;
        }

        const targetEntries = results.slice(0, 1); // → 테스트용
        // const targetEntries = results;

        for (const entry of targetEntries) {
          const entryId = entry.entryId;
          const blogDomain = new URL(entry.blogUrl).hostname;
          const randomComment =
            comments[Math.floor(Math.random() * comments.length)];

          await postCommentToTistory(entryId, blogDomain, randomComment);
          console.log(`✅ 댓글 작성 완료: ${entry.blogUrl}`);
        }
      } catch (e) {
        showAlert("검색 또는 댓글 작성 중 오류가 발생했습니다.");
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
