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

    const SEL = ".rv, .rv-wipe, .rv-rule, .rv-bar, .rv-pop";
    const targets = Array.from(root.querySelectorAll<HTMLElement>(SEL));
    if (root.matches(SEL)) targets.unshift(root);

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
 * Counts a figure up from zero the first time it scrolls into view, once.
 * Returns the live value plus the ref to attach to the element being counted.
 *
 * Reduced motion (or no observer support) prints the final value immediately.
 * Runs on requestAnimationFrame for the ~1.5s it animates, then stops — no
 * looping, and it cleans up its frame and observer on unmount.
 */
export function useCountUp(
  target: number,
  opts?: { duration?: number; decimals?: number }
) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const duration = opts?.duration ?? 1500;
  const [value, setValue] = useState(() =>
    prefersReducedMotion() ? target : 0
  );

  useEffect(() => {
    const el = ref.current;
    if (
      prefersReducedMotion() ||
      typeof IntersectionObserver === "undefined" ||
      !el
    ) {
      setValue(target);
      return;
    }

    let raf = 0;
    let startT = 0;
    let started = false;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (!startT) startT = now;
      const p = Math.min((now - startT) / duration, 1);
      setValue(target * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            raf = requestAnimationFrame(tick);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, value };
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
