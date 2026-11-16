/**
 * Mock admin authentication.
 *
 * SECURITY NOTE: this is a UI demo only. There is no real authentication here
 * — the "session" is a plain object in localStorage, any six-character
 * password is accepted, and nothing is verified. Anyone can edit local
 * storage. Real sign-in, session handling and authorization must be
 * implemented on the backend (ENDPOINTS.auth.*), with this module reduced to
 * HTTP calls against it. Never store secrets or API keys in frontend code.
 */

import { adminUsers } from "../data/users.js";
import { PERMISSIONS, STORAGE_KEYS } from "../utils/constants.js";
import { ApiError, mockResponse } from "./httpClient.js";

export const AUTH_IS_MOCK = true;

export function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.adminSession);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (typeof window === "undefined") return;
  try {
    if (session) {
      window.localStorage.setItem(
        STORAGE_KEYS.adminSession,
        JSON.stringify(session),
      );
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.adminSession);
    }
  } catch {
    /* storage blocked — the session simply will not persist */
  }
}

/**
 * @param {{email: string, password: string, remember?: boolean}} credentials
 * @returns {Promise<{user: object, permissions: string[]}>}
 */
export async function login({ email, password, remember = false }) {
  await mockResponse(null, { ms: 420 });

  const normalised = String(email ?? "").trim().toLowerCase();
  const user = adminUsers.find(
    (candidate) => candidate.email.toLowerCase() === normalised,
  );

  if (!user) {
    throw new ApiError(
      "No demo account matches that email. Try one of the demo accounts listed below.",
      { status: 401 },
    );
  }
  if (user.status === "suspended") {
    throw new ApiError("This account is suspended.", { status: 403 });
  }
  if (!password || password.length < 6) {
    throw new ApiError("Password must be at least 6 characters.", { status: 401 });
  }

  const session = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    permissions: PERMISSIONS[user.role] ?? [],
    issuedAt: new Date().toISOString(),
    remember,
    mock: true,
  };

  writeSession(session);
  return session;
}

export async function logout() {
  writeSession(null);
  return mockResponse({ ok: true }, { ms: 120 });
}

export function hasPermission(session, permission) {
  if (!session) return false;
  return session.permissions?.includes(permission) ?? false;
}
