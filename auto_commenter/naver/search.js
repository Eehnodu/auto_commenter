console.log("🔍 Naver blog search page loaded.");

setTimeout(() => {
  const links = [...document.querySelectorAll("a.desc_inner")]
    .map((a) => a.href)
    .filter((h) => h.includes("blog.naver.com"));

  if (links.length === 0) {
    console.warn("❗ 블로그 링크를 찾을 수 없습니다.");
    return;
  }

  // 최대 3개 열기
  links.slice(0, 3).forEach((link, index) => {
    setTimeout(() => {
      window.open(link, "_blank");
    }, index * 3000);
  });
}, 3000);
