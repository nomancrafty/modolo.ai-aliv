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
 * never touches layout and never re-renders React.
 */
export function useReveal<T extends HTMLElement>(opts?: {
  threshold?: number;
  stagger?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T | null>(null);
  const { threshold = 0.15, stagger = 55, rootMargin = "0px 0px -12% 0px" } =
    opts ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = Array.from(
      node.querySelectorAll<HTMLElement>(".rv, .rv-wipe, .rv-rule, .rv-draw")
    );
    if (node.matches(".rv, .rv-wipe, .rv-rule, .rv-draw")) targets.unshift(node);

    // Reduced motion: land everything immediately, skip the observer entirely.
    if (prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    targets.forEach((el, i) => {
      if (!el.style.getPropertyValue("--rv-delay")) {
        el.style.setProperty("--rv-delay", `${i * stagger}ms`);
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          targets.forEach((el) => el.classList.add("is-in"));
          io.disconnect();
        });
      },
      { threshold, rootMargin }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [threshold, stagger, rootMargin]);

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
  opts?: { start?: number; end?: number }
) {
  const ref = useRef<T | null>(null);
  const { start = 0.9, end = 0.25 } = opts ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.style.setProperty(varName, "1");
      return;
    }

    let frame = 0;
    let visible = false;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element's top sits at `start` of the viewport,
      // 1 once its bottom has risen past `end`.
      const total = rect.height + vh * (start - end);
      const travelled = vh * start - rect.top;
      const p = total <= 0 ? 1 : travelled / total;
      node.style.setProperty(varName, String(Math.min(1, Math.max(0, p))));
      if (visible) frame = requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(frame);
        if (visible) frame = requestAnimationFrame(measure);
        else measure();
      },
      { threshold: 0 }
    );

    io.observe(node);
    measure();

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [varName, start, end]);

  return ref;
}

/**
 * Counts a figure up when it first scrolls into view.
 * Returns the live value plus the ref to attach.
 */
export function useCountUp(
  target: number,
  opts?: { duration?: number; decimals?: number }
) {
  const { duration = 1500, decimals = 0 } = opts ?? {};
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(() =>
    prefersReducedMotion() ? target : 0
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let frame = 0;
    let startedAt = 0;

    const step = (now: number) => {
      if (!startedAt) startedAt = now;
      const t = Math.min(1, (now - startedAt) / duration);
      // ease-out cubic: fast arrival, gentle settle
      const eased = 1 - Math.pow(1 - t, 3);
      const next = target * eased;
      setValue(Number(next.toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        frame = requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.6 }
    );

    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, decimals]);

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
