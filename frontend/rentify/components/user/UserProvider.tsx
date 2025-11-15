"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/lib/api";

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoaded: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("rentify-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.warn("Failed to parse stored user", error);
        window.localStorage.removeItem("rentify-user");
      }
    }
    setIsLoaded(true);
  }, []);

  const persistUser = useCallback((next: User | null) => {
    setUser(next);
    if (typeof window === "undefined") return;
    if (next) {
      window.localStorage.setItem("rentify-user", JSON.stringify(next));
    } else {
      window.localStorage.removeItem("rentify-user");
    }
  }, []);

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const value = useMemo(
    () => ({
      user,
      setUser: persistUser,
      logout,
      isLoaded,
    }),
    [user, persistUser, logout, isLoaded]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
