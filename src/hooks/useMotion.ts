import { useEffect, useRef, useState } from "react";

/** Single source of truth for the user's motion preference. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveals `.rv` / `.rv-wipe` / `.rv-rule` descendants (and the root itself)
 * once the root scrolls into view, staggered in DOM order.
 *
 * Writes `--rv-delay` and toggles `is-in`; all easing lives in CSS, so this
 * only touches opacity/transform (never layout) and never re-renders React.
 * Fires once per element, then disconnects.
 *
 * Safety: under `prefers-reduced-motion` or when IntersectionObserver is
 * unavailable, every target is revealed immediately with no motion. The
 * hidden start state itself is gated on the `reveal-ready` root class (set in
 * `main.tsx`), so if this JS never runs the content simply stays visible.
 */
export function useReveal<T extends HTMLElement>(opts?: {
  threshold?: number;
  stagger?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T | null>(null);
  const stagger = opts?.stagger ?? 60;
  const rootMargin = opts?.rootMargin ?? "0px 0px -10% 0px";

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(".rv, .rv-wipe, .rv-rule")
    );
    if (root.matches(".rv, .rv-wipe, .rv-rule")) targets.unshift(root);

    const revealAll = () => {
      root.classList.add("is-in");
      targets.forEach((el) => el.classList.add("is-in"));
    };

    // No motion, or no observer support: show everything at once.
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    // Stagger in DOM order.
    targets.forEach((el, i) => {
      el.style.setProperty("--rv-delay", `${i * stagger}ms`);
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          revealAll();
          obs.disconnect();
          break;
        }
      },
      { threshold: 0, rootMargin }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [stagger, rootMargin]);

  return ref;
}

/**
 * Writes the element's scroll progress (0 -> 1 as it crosses the viewport)
 * into a CSS custom property on that element.
 *
 * Deliberately bypasses React state: the value updates every frame while the
 * element is on screen, and a setState per frame would be a re-render per frame.
 * An IntersectionObserver gates the rAF loop so nothing runs off-screen.
 */
export function useScrollProgress<T extends HTMLElement>(
  varName = "--p",
  _opts?: { start?: number; end?: number }
) {
  const ref = useRef<T | null>(null);

  // Pinned at 1: every trace renders complete rather than drawing on scroll.
  useEffect(() => {
    ref.current?.style.setProperty(varName, "1");
  }, [varName]);

  return ref;
}

/**
 * Counts a figure up when it first scrolls into view.
 * Returns the live value plus the ref to attach.
 */
export function useCountUp(
  target: number,
  _opts?: { duration?: number; decimals?: number }
) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // No count-up: the figure is simply printed.
  return { ref, value: target };
}

/** True once the window has scrolled past `offset`. Used by the header. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > offset);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}
