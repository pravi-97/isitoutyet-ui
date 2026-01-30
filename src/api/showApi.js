import { apiFetch } from "./apiClient";

export function fetchTrendingShows(page = 1) {
  return apiFetch(`/shows/trending?page=${page}`);
}

export function fetchMyDetails() {
  return apiFetch(`/user/me`);
}

export function searchShowByName(showName, page = 1) {
  return apiFetch(`/shows/search?name=${showName}&page=${page}`);
}

export function getShowById(showId) {
  return apiFetch(`/shows/${showId}`);
}

// export function trackNewShowDefault(body){
//   return apiFetch(`/track/new`, { method: "POST", body });
// }

export function trackNewShowDefault(body) {
  return apiFetch("/track/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
}