/**
 * User & role service (admin, mock).
 *
 * Role changes made here only affect the local demo list. Real role
 * assignment must be enforced by the backend (ENDPOINTS.users.*).
 */

import { adminUsers } from "../data/users.js";
import { PERMISSIONS, ROLES } from "../utils/constants.js";
import { ApiError, mockResponse } from "./httpClient.js";

let users = [...adminUsers];

export async function listUsers({ search = "", role = "" } = {}) {
  const needle = search.trim().toLowerCase();
  const items = users.filter((user) => {
    if (role && user.role !== role) return false;
    if (!needle) return true;
    return (
      user.name.toLowerCase().includes(needle) ||
      user.email.toLowerCase().includes(needle)
    );
  });
  return mockResponse({ items, total: items.length });
}

export async function inviteUser({ name, email, role = ROLES.PRODUCT_MANAGER }) {
  if (!name?.trim() || !email?.trim()) {
    throw new ApiError("Name and email are both required.", { status: 422 });
  }
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    throw new ApiError("That email already has an account.", { status: 409 });
  }
  const user = {
    id: `u-${Date.now().toString(36)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    status: "invited",
    lastActive: null,
    joinedAt: new Date().toISOString().slice(0, 10),
  };
  users = [user, ...users];
  return mockResponse(user);
}

export async function updateUserRole(id, role) {
  users = users.map((user) => (user.id === id ? { ...user, role } : user));
  return mockResponse(users.find((user) => user.id === id));
}

export async function updateUserStatus(id, status) {
  users = users.map((user) => (user.id === id ? { ...user, status } : user));
  return mockResponse(users.find((user) => user.id === id));
}

export async function removeUser(id) {
  users = users.filter((user) => user.id !== id);
  return mockResponse({ ok: true, id });
}

export function permissionsForRole(role) {
  return PERMISSIONS[role] ?? [];
}
