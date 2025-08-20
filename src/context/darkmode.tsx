import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";

export interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
}

interface DarkModeProviderProps {
  children: React.ReactNode;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const { user, updateUser } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply dark mode to the document
  const applyDarkMode = useCallback((darkMode: boolean) => {
    document.documentElement.classList.toggle("dark", darkMode);
    setIsDarkMode(darkMode);
  }, []);

  // Save to localStorage
  const saveToLocalStorage = useCallback((darkMode: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, []);

  // Update user preference in database
  const updateUserPreference = useCallback(
    (darkMode: boolean) => {
      if (user) {
        updateUser({ darkMode }, (error) => {
          console.error("Failed to save dark mode preference:", error);
        });
      }
    },
    [user, updateUser]
  );

  // Set dark mode with all side effects
  const setDarkMode = useCallback(
    (enabled: boolean) => {
      applyDarkMode(enabled);
      saveToLocalStorage(enabled);
      updateUserPreference(enabled);
    },
    [applyDarkMode, saveToLocalStorage, updateUserPreference]
  );

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!isDarkMode);
  }, [isDarkMode, setDarkMode]);

  // Initialize dark mode when user changes
  useEffect(() => {
    if (!user) {
      // No user logged in - check localStorage for dark mode preference
      if (typeof window !== "undefined") {
        const storedDarkMode = localStorage.getItem("darkMode");
        if (storedDarkMode !== null) {
          const isDark = JSON.parse(storedDarkMode);
          applyDarkMode(isDark);
        } else {
          // No stored preference - use system preference
          const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
          applyDarkMode(systemDarkMode);
          saveToLocalStorage(systemDarkMode);
        }
      }
      return;
    }

    // User is logged in - prioritize user's database preference
    if (typeof user.darkMode === "boolean") {
      // User has a dark mode preference in database - use it and sync to localStorage
      applyDarkMode(user.darkMode);
      saveToLocalStorage(user.darkMode);
    } else {
      // User exists but no dark mode preference in database - use localStorage or system preference
      if (typeof window !== "undefined") {
        const storedDarkMode = localStorage.getItem("darkMode");
        if (storedDarkMode !== null) {
          const isDark = JSON.parse(storedDarkMode);
          applyDarkMode(isDark);
          // Update the user's preference in the database with what we're using
          updateUserPreference(isDark);
        } else {
          // No stored preference - use system preference
          const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
          applyDarkMode(systemDarkMode);
          saveToLocalStorage(systemDarkMode);
          // Update the user's preference in the database
          updateUserPreference(systemDarkMode);
        }
      }
    }
  }, [user, applyDarkMode, saveToLocalStorage, updateUserPreference]);

  // Listen for system theme changes when no explicit preference is set
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // Only auto-update if user hasn't explicitly set a preference
        const hasUserPreference =
          user?.darkMode !== undefined || localStorage.getItem("darkMode") !== null;

        if (!hasUserPreference) {
          applyDarkMode(e.matches);
          saveToLocalStorage(e.matches);

          // Update database if user is logged in
          if (user) {
            updateUserPreference(e.matches);
          }
        }
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [user, applyDarkMode, saveToLocalStorage, updateUserPreference]);

  const contextValue: DarkModeContextType = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
      setDarkMode,
    }),
    [isDarkMode, toggleDarkMode, setDarkMode]
  );

  return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
}

export { DarkModeContext };
