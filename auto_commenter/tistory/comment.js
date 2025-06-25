// tistory/comment.js
async function postCommentToTistory(entryId, blogDomain, commentText) {
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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.ok) {
      console.log(`✅ 댓글 성공: ${blogDomain}/${entryId}`);
    } else {
      console.error(
        `❌ 댓글 실패 (${response.status}): ${blogDomain}/${entryId}`
      );
    }
  } catch (error) {
    console.error("요청 중 에러 발생:", error);
  }
}
