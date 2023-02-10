export function loadDataList(urlList) {
  return Promise.all(urlList.map((url) => fetch(url).then((res) => res.json())));
}
