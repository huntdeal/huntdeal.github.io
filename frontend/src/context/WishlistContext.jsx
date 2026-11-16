import { createContext, useCallback, useContext, useMemo } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { STORAGE_KEYS } from "../utils/constants.js";

const WishlistContext = createContext(null);

/**
 * Wishlist state.
 *
 * Stored in localStorage so saved items survive a refresh. This is device-
 * local by design: there are no user accounts in this build. When accounts
 * arrive, swap the storage for a backend call and keep this API.
 */
export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage(STORAGE_KEYS.wishlist, []);

  const toggle = useCallback(
    (id) => {
      let added = false;
      setIds((current) => {
        const list = Array.isArray(current) ? current : [];
        if (list.includes(id)) return list.filter((item) => item !== id);
        added = true;
        return [id, ...list];
      });
      return added;
    },
    [setIds],
  );

  const remove = useCallback(
    (id) => {
      setIds((current) => (current ?? []).filter((item) => item !== id));
    },
    [setIds],
  );

  const clear = useCallback(() => setIds([]), [setIds]);

  const value = useMemo(() => {
    const list = Array.isArray(ids) ? ids : [];
    return {
      ids: list,
      count: list.length,
      has: (id) => list.includes(id),
      toggle,
      remove,
      clear,
    };
  }, [ids, toggle, remove, clear]);

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  }
  return context;
}
