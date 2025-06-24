// tistory/search.js
async function searchTistory(keyword) {
  const url = `https://www.tistory.com/api/v1/search/posts?keyword=${encodeURIComponent(
    keyword
  )}&page=1&sort=ACCURACY`;

  const res = await fetch(url);
  const json = await res.json();
  console.log("티스토리 검색 응답:", json);

  return json.data.searchedEntries;
}
