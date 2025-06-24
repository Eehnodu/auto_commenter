console.log("🔍 티스토리 검색 페이지 스크립트 실행");

setTimeout(() => {
  const anchors = document.querySelectorAll("a.search_result_title");

  const links = [...anchors]
    .map((a) => a.href)
    .filter((h) => h.includes(".tistory.com"));

  links.slice(0, 3).forEach((link, i) => {
    setTimeout(() => {
      window.open(link, "_blank");
    }, i * 3000); // 3초 간격으로 열기
  });
}, 3000);
