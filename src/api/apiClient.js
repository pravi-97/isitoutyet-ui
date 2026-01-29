import { auth } from "../services/authService";

const BASE_URL = "http://localhost:8080";

export async function apiFetch(path, options = {}) {
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : null;

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
    }

    return res.json();
}
