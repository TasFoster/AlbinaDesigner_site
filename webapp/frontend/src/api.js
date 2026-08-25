const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    let detail = `${res.status}`;
    try {
      const body = await res.json();
      detail = JSON.stringify(body);
    } catch {
      // ignore — no JSON body
    }
    throw new Error(`API ${path} failed: ${detail}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getServices: () => request("/services/").then((d) => d.results),
  getService: (slug) => request(`/services/${slug}/`),
  // Returns the full paginated envelope ({count, next, previous, results})
  // so the blog page can drive "show more".
  getPosts: (page = 1) => request(`/posts/?page=${page}`),
  getPost: (slug) => request(`/posts/${slug}/`),
  getProfile: () => request("/profile/"),
  createLead: (payload) =>
    request("/leads/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
};
