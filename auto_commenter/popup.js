// 시작 버튼 클릭 이벤트 처리
document.getElementById("start").addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value.trim();
  const platform = document.querySelector(
    'input[name="platform"]:checked'
  ).value;
  const commentTextareas = document.querySelectorAll("#commentList textarea");

  // 댓글 목록 수집 및 공백 제거
  const comments = Array.from(commentTextareas)
    .map((c) => c.value.trim())
    .filter((c) => c.length > 0);

  // 필수 입력값 확인
  if (!keyword || comments.length === 0) {
    showAlert("검색어와 댓글을 모두 입력해주세요.");
    return;
  }

  // 입력값 저장
  chrome.storage.local.set({ keyword, comments, platform }, async () => {
    if (platform === "tistory") {
      try {
        // 티스토리 검색
        const results = await searchTistory(keyword);

        if (results.length === 0) {
          showAlert("검색 결과가 없습니다.");
          return;
        }

        // 댓글 대상 엔트리 선택 (예: 상위 3개)
        const targetEntries = results.slice(0, 3);
        const formattedEntries = targetEntries.map((entry) => ({
          entryId: entry.entryId,
          blogDomain: new URL(entry.blogUrl).hostname,
          entryUrl: entry.entryUrl,
        }));

        // 댓글 작성 배치 시작 메시지 전송
        chrome.runtime.sendMessage({
          type: "START_COMMENT_BATCH",
          entries: formattedEntries,
          comments,
        });
      } catch (e) {
        showAlert("검색 또는 댓글 작성 중 오류가 발생했습니다.");
        // 오류 상세는 필요 시 개발자 도구에서 확인
      }
    }
  });
});

// 경고 메시지 표시 함수
function showAlert(message) {
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("alertModal").style.display = "flex";
}

// 경고창 닫기 버튼
document.getElementById("closeAlertBtn").addEventListener("click", () => {
  document.getElementById("alertModal").style.display = "none";
});
