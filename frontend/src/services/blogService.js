/** Blog service. Mock-backed; mirrors ENDPOINTS.blog. */

import { posts, postById, blogCategories } from "../data/blog.js";
import { ApiError, mockResponse } from "./httpClient.js";

export async function listPosts({ search = "", category = "" } = {}) {
  const needle = search.trim().toLowerCase();
  const items = posts.filter((post) => {
    if (category && post.category !== category) return false;
    if (!needle) return true;
    return (
      post.title.toLowerCase().includes(needle) ||
      post.excerpt.toLowerCase().includes(needle) ||
      post.category.toLowerCase().includes(needle) ||
      post.author.toLowerCase().includes(needle)
    );
  });

  return mockResponse({
    items: [...items].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
    ),
    total: items.length,
    categories: blogCategories,
  });
}

export async function getPost(slug) {
  const post = postById[slug];
  if (!post) {
    throw new ApiError("That article could not be found.", { status: 404 });
  }
  return mockResponse(post);
}

export async function getRelatedPosts(slug, limit = 3) {
  const post = postById[slug];
  if (!post) return mockResponse([]);
  const sameCategory = posts.filter(
    (item) => item.id !== slug && item.category === post.category,
  );
  const rest = posts.filter(
    (item) => item.id !== slug && item.category !== post.category,
  );
  return mockResponse([...sameCategory, ...rest].slice(0, limit));
}

export async function getFeaturedPost() {
  return mockResponse(posts.find((post) => post.featured) ?? posts[0]);
}
