import { apiFetch } from "./apiClient";

export function fetchTrendingShows(page = 1) {
  return apiFetch(`/shows/trending?page=${page}`);
}

export function fetchMyDetails() {
  return apiFetch(`/user/me`);
}

export function searchShowByName(showName, page = 1, nsfw) {
  return apiFetch(`/shows/search?name=${showName}&page=${page}&nsfw=${nsfw}`);
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

export function getAllTrackedShows() {
  return apiFetch("/track/all");
}

export function updateTrackedShows(body){
  return apiFetch("/track/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
}

export function fetchMyDetailsMini() {
  return apiFetch(`/user/me/mini`);
}

export function updateUserDetails(name){
  return apiFetch(`/user/update?name=${name}`, {
    method: "PUT"
  })
}