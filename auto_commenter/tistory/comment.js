chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "POST_COMMENT") {
    const { entryId, blogDomain, commentText } = request;
    const url = `https://${blogDomain}/m/api/${entryId}/comment`;

    const payload = {
      captcha: "",
      comment: commentText,
      homepage: "https://automaker404.tistory.com",
      isSecret: false,
      mentionId: null,
      name: "오메404",
      parent: null,
      password:
        "f215faf9d88b7f0a881632ee22459ee452a296c808d261b6cc993d3a1fd0600e",
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          console.log(`✅ 댓글 작성 성공: ${url}`);
        } else {
          console.error(`❌ 댓글 실패 (${res.status})`);
        }
      })
      .catch((err) => {
        console.error("❌ 요청 에러:", err);
      });
  }
});
