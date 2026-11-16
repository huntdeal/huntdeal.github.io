/**
 * Mock admin users.
 *
 * DEMO DATA. These accounts exist only in the frontend so the role-based UI
 * can be demonstrated. They are NOT credentials and grant no real access —
 * authentication and authorization must be implemented on the backend.
 * The demo sign-in accepts any password of six characters or more.
 */

import { ROLES } from "../utils/constants.js";

export const adminUsers = [
  {
    id: "u-1",
    name: "Divya Chouhan",
    email: "admin@huntdeal.example",
    role: ROLES.ADMIN,
    status: "active",
    lastActive: "2026-11-16T08:12:00Z",
    joinedAt: "2025-04-02",
  },
  {
    id: "u-2",
    name: "Ritika Shah",
    email: "ritika@huntdeal.example",
    role: ROLES.PRODUCT_MANAGER,
    status: "active",
    lastActive: "2026-11-15T17:40:00Z",
    joinedAt: "2026-01-19",
  },
  {
    id: "u-3",
    name: "Dev Mehta",
    email: "dev@huntdeal.example",
    role: ROLES.PRODUCT_MANAGER,
    status: "active",
    lastActive: "2026-11-14T11:05:00Z",
    joinedAt: "2026-03-08",
  },
  {
    id: "u-4",
    name: "Ananya Rao",
    email: "ananya@huntdeal.example",
    role: ROLES.ADMIN,
    status: "invited",
    lastActive: null,
    joinedAt: "2026-11-10",
  },
  {
    id: "u-5",
    name: "Karan Iyer",
    email: "karan@huntdeal.example",
    role: ROLES.PRODUCT_MANAGER,
    status: "suspended",
    lastActive: "2026-09-02T09:25:00Z",
    joinedAt: "2025-11-21",
  },
];

/** Accounts offered as one-click demo sign-ins on the mock login screen. */
export const demoAccounts = [
  { email: "admin@huntdeal.example", role: ROLES.ADMIN, label: "Admin" },
  {
    email: "ritika@huntdeal.example",
    role: ROLES.PRODUCT_MANAGER,
    label: "Product Manager",
  },
];

export const defaultSettings = {
  profile: {
    name: "Divya Chouhan",
    email: "admin@huntdeal.example",
    title: "Founder",
    timezone: "Asia/Kolkata",
  },
  site: {
    siteName: "HuntDeal",
    tagline: "Hunt the best deals, every day",
    supportEmail: "support@huntdeal.example",
    defaultCurrency: "INR",
    marketplace: "amazon.in",
  },
  affiliate: {
    disclosureText: "As an Amazon Associate I earn from qualifying purchases.",
    showInFooter: true,
    showOnProductPages: true,
    openLinksInNewTab: true,
  },
  preferences: {
    emailOnExpiredDeals: true,
    weeklyPerformanceDigest: true,
    compactTables: false,
    autoPublishNewProducts: false,
  },
};
