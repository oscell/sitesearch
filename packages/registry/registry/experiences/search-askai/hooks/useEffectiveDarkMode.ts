import { useEffect, useMemo, useState } from "react";

/**
 * Computes effective dark mode with precedence:
 * 1) explicit prop if provided
 * 2) html element has class "dark"
 * 3) prefers-color-scheme: dark
 */
export function useEffectiveDarkMode(explicitDark?: boolean): boolean {
  // SSR-safe initial value
  const initial = useMemo(() => {
    if (explicitDark !== undefined) return explicitDark;
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("dark")) return true;
    }
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
    ) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  }, [explicitDark]);

  const [isDark, setIsDark] = useState<boolean>(initial);

  useEffect(() => {
    // If prop is explicitly set, always use it and skip listeners
    if (explicitDark !== undefined) {
      setIsDark(explicitDark);
      return;
    }

    let disposed = false;

    // Helper to recompute from (2) and (3)
    const recompute = () => {
      if (disposed) return;
      const htmlHasDark = document.documentElement.classList.contains("dark");
      if (htmlHasDark) {
        setIsDark(true);
        return;
      }
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefers);
    };

    // Observe html class changes
    const mo = new MutationObserver(() => recompute());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Listen to OS theme changes
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => recompute();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
    } else if (typeof mql.addListener === "function") {
      mql.addListener(onChange);
    }

    // Initial sync
    recompute();

    return () => {
      disposed = true;
      mo.disconnect();
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", onChange);
      } else if (typeof mql.removeListener === "function") {
        mql.removeListener(onChange);
      }
    };
  }, [explicitDark]);

  return isDark;
}

export default useEffectiveDarkMode;
