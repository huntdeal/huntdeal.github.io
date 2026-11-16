import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import * as authService from "../services/authService.js";
import { ROLE_LABELS } from "../utils/constants.js";

const AdminAuthContext = createContext(null);

/**
 * Admin session state.
 *
 * Mock only — see authService for why this cannot be treated as security.
 * The UI uses `can()` to hide controls a role should not see; the backend
 * must enforce the same rules independently.
 */
export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.readSession());
  const [pending, setPending] = useState(false);

  const signIn = useCallback(async (credentials) => {
    setPending(true);
    try {
      const next = await authService.login(credentials);
      setSession(next);
      return next;
    } finally {
      setPending(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      role: session?.user?.role ?? null,
      roleLabel: session?.user?.role ? ROLE_LABELS[session.user.role] : null,
      permissions: session?.permissions ?? [],
      isAuthenticated: Boolean(session),
      isMock: authService.AUTH_IS_MOCK,
      pending,
      signIn,
      signOut,
      can: (permission) => authService.hasPermission(session, permission),
    }),
    [session, pending, signIn, signOut],
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used inside <AdminAuthProvider>");
  }
  return context;
}
