/**
 * Site-level services: contact form, newsletter, admin settings.
 * All mock-backed. Nothing is transmitted anywhere in this build.
 */

import { defaultSettings } from "../data/users.js";
import { STORAGE_KEYS } from "../utils/constants.js";
import { ApiError, mockResponse } from "./httpClient.js";

/* --- Contact ---------------------------------------------------------- */

/**
 * Validates and "submits" a contact message.
 * The message is not sent anywhere yet — wire to ENDPOINTS.contact.
 */
export async function submitContactMessage(payload) {
  await mockResponse(null, { ms: 520 });
  if (!payload?.email || !payload?.message) {
    throw new ApiError("Email and message are required.", { status: 422 });
  }
  return {
    ok: true,
    reference: `HD-${Date.now().toString(36).toUpperCase()}`,
    delivered: false,
    note: "Demo mode: this message was validated but not delivered.",
  };
}

/* --- Newsletter ------------------------------------------------------- */

export async function subscribeToNewsletter(email) {
  await mockResponse(null, { ms: 420 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? ""))) {
    throw new ApiError("Enter a valid email address.", { status: 422 });
  }
  try {
    window.localStorage.setItem(STORAGE_KEYS.newsletter, email);
  } catch {
    /* ignore storage failures */
  }
  return { ok: true, delivered: false };
}

export function getSavedNewsletterEmail() {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.newsletter) ?? "";
  } catch {
    return "";
  }
}

/* --- Admin settings --------------------------------------------------- */

export async function getSettings() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEYS.adminSettings);
    if (saved) {
      const parsed = JSON.parse(saved);
      return mockResponse({
        profile: { ...defaultSettings.profile, ...parsed.profile },
        site: { ...defaultSettings.site, ...parsed.site },
        affiliate: { ...defaultSettings.affiliate, ...parsed.affiliate },
        preferences: { ...defaultSettings.preferences, ...parsed.preferences },
      });
    }
  } catch {
    /* fall through to defaults */
  }
  return mockResponse(defaultSettings);
}

export async function saveSettings(settings) {
  await mockResponse(null, { ms: 380 });
  try {
    window.localStorage.setItem(
      STORAGE_KEYS.adminSettings,
      JSON.stringify(settings),
    );
  } catch {
    throw new ApiError("Could not save settings in this browser.", { status: 500 });
  }
  return { ok: true, settings };
}
