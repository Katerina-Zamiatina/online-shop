export function getQuery() {
  return new URLSearchParams(window.location.search);
}

export function updateRout(path: string) {
  window.history.pushState({}, path, window.location.origin + path);
}

// export function updateQuery(options) {
//   const params = new URLSearchParams(window.location.search);
// }
