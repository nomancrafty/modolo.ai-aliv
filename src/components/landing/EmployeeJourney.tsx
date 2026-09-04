import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { prefersReducedMotion } from "@/hooks/useMotion";

/* ============================================================
   EmployeeJourney — the seven-stage system line.

   A compact, sticky progress rail over the seven exits. On first view it plays
   a one-time 01 → 07 introduction so the whole system reads as "working," then
   hands off to the reader: as chapters scroll through the viewport the active
   stage follows, and hovering / focusing / clicking a stage takes over
   immediately (and navigates on click). Completed stages carry a check, the
   active stage a coral ring + slight scale, upcoming stages stay neutral — so
   state never rests on colour alone. All timers and observers are cleaned up,
   ticks pause when the tab is hidden, and reduced-motion skips the sequence
   entirely while keeping every state and control intact.

   No animation dependency: CSS transitions + IntersectionObserver only.
   ============================================================ */

export type JourneyStage = { n: string; name: string };

/** Fixed header height; anchor scrolls clear it (plus the sticky rail on md+). */
const HEADER_H = 88;
const STEP_MS = 1000; // ~900–1200ms per stage during the intro
const HOLD_MS = 1150; // pause on 07 before handing off

export default function EmployeeJourney({
  stages,
}: {
  stages: JourneyStage[];
}) {
  const count = stages.length;
  const [active, setActive] = useState(0);
  const [snap, setSnap] = useState(false); // one update with no line transition

  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const introTimer = useRef<number | null>(null);
  const holdTimer = useRef<number | null>(null);
  const introStarted = useRef(false);
  const introDone = useRef(false);
  const visible = useRef(false);
  const hovered = useRef<number | null>(null);
  const scrollActive = useRef(0);

  const reduce =
    typeof window !== "undefined" ? prefersReducedMotion() : false;

  const chapterEl = useCallback(
    (i: number) => document.getElementById(`exit-${stages[i]?.n}`),
    [stages]
  );

  const clearIntro = useCallback(() => {
    if (introTimer.current !== null) {
      window.clearInterval(introTimer.current);
      introTimer.current = null;
    }
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    introDone.current = true;
  }, []);

  // Hand the rail over to the reading position without animating the rewind.
  const finishIntro = useCallback(() => {
    introDone.current = true;
    setSnap(true);
    setActive(scrollActive.current);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setSnap(false))
    );
  }, []);

  // --- Effect: observers + intro sequence, all cleaned up on unmount ---
  useEffect(() => {
    const chapters = stages
      .map((_, i) => chapterEl(i))
      .filter((el): el is HTMLElement => !!el);

    // Scroll-spy: the active chapter is the last one whose top has passed a
    // reading line ~45% down the viewport. Rects are read only on the
    // observer's (infrequent) boundary callbacks, never on a scroll loop, and
    // the measure is independent of each chapter's height.
    const commitScroll = (i: number) => {
      scrollActive.current = i;
      if ((introDone.current || reduce) && hovered.current === null) {
        setActive(i);
      }
    };
    const pick = () => {
      const line = window.innerHeight * 0.45;
      let idx = 0;
      for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].getBoundingClientRect().top <= line) idx = i;
        else break;
      }
      return idx;
    };
    const spy = new IntersectionObserver(() => commitScroll(pick()), {
      rootMargin: "-45% 0px -50% 0px",
      threshold: [0, 1],
    });
    chapters.forEach((c) => spy.observe(c));

    // Intro: start once when the rail is first well in view.
    const startIntro = () => {
      if (introStarted.current || reduce) return;
      introStarted.current = true;
      setActive(0);
      let k = 0;
      introTimer.current = window.setInterval(() => {
        if (document.hidden || !visible.current) return; // pause off-screen/hidden
        k += 1;
        if (k >= count - 1) {
          setActive(count - 1);
          if (introTimer.current !== null) {
            window.clearInterval(introTimer.current);
            introTimer.current = null;
          }
          holdTimer.current = window.setTimeout(finishIntro, HOLD_MS);
          return;
        }
        setActive(k);
      }, STEP_MS);
    };

    const railObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible.current = e.isIntersecting;
          if (e.isIntersecting) startIntro();
        }
      },
      { threshold: 0.4 }
    );
    if (railRef.current) railObs.observe(railRef.current);

    // Reduced motion: no sequence — settle straight onto the reading position.
    if (reduce) {
      introDone.current = true;
    }

    return () => {
      spy.disconnect();
      railObs.disconnect();
      if (introTimer.current !== null) window.clearInterval(introTimer.current);
      if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    };
  }, [stages, count, reduce, chapterEl, finishIntro]);

  // Keep the active stage scrolled into view within the horizontal track
  // (mobile), never moving the page itself.
  useEffect(() => {
    const track = trackRef.current;
    const btn = btnRefs.current[active];
    if (!track || !btn) return;
    if (track.scrollWidth > track.clientWidth + 4) {
      const target = btn.offsetLeft - track.clientWidth / 2 + btn.clientWidth / 2;
      track.scrollTo({
        left: Math.max(0, target),
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [active, reduce]);

  // --- Interaction ---
  const emphasize = (i: number) => {
    clearIntro();
    hovered.current = i;
    setActive(i);
  };
  const release = () => {
    hovered.current = null;
    setActive(scrollActive.current);
  };
  const goTo = (i: number) => {
    clearIntro();
    hovered.current = null;
    setActive(i);
    const el = chapterEl(i);
    if (!el) return;
    const stickyH =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches &&
      barRef.current
        ? barRef.current.offsetHeight
        : 0;
    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      HEADER_H -
      stickyH -
      12;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };

  const progressPct = count > 1 ? (active / count) * 100 : 0;
  const railInsetPct = count > 1 ? 50 / count : 0;

  return (
    <div ref={railRef} className="md:sticky md:top-[88px] z-40">
      <div
        ref={barRef}
        className="border-y border-[hsl(var(--ink)/0.08)] bg-[hsl(var(--surface)/0.82)] backdrop-blur-md shadow-[0_12px_32px_-28px_hsl(var(--ink)/0.35)]"
      >
        <div className="shell py-4 md:py-5">
          <div
            ref={trackRef}
            className="relative overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Base + progress line, aligned to the badge centres (top: 22px) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[22px] -translate-y-1/2 h-0.5 bg-rule"
              style={{ left: `${railInsetPct}%`, right: `${railInsetPct}%` }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[22px] -translate-y-1/2 h-0.5 bg-coral"
              style={{
                left: `${railInsetPct}%`,
                width: `${progressPct}%`,
                transition: snap
                  ? "none"
                  : "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Stages */}
            <ol className="relative flex min-w-max md:min-w-0">
              {stages.map((s, i) => {
                const state =
                  i < active ? "done" : i === active ? "active" : "upcoming";
                const short = s.name.replace(/^The\s+/, "");
                return (
                  <li
                    key={s.n}
                    className="flex-1 flex justify-center min-w-[72px] md:min-w-0"
                  >
                    <button
                      ref={(el) => {
                        btnRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => goTo(i)}
                      onMouseEnter={() => emphasize(i)}
                      onMouseLeave={release}
                      onFocus={() => emphasize(i)}
                      onBlur={release}
                      aria-label={`Go to Exit ${s.n} — ${s.name}`}
                      aria-current={state === "active" ? "step" : undefined}
                      className="group/stage flex flex-col items-center gap-2.5 px-2 pt-0 pb-0 min-h-[44px]"
                    >
                      <span
                        className={[
                          "flex items-center justify-center h-11 w-11 rounded-full border transition-all duration-300 figure text-[0.8125rem]",
                          state === "active"
                            ? "node-active-ring border-coral text-coral-ink bg-paper scale-[1.04] shadow-[0_0_0_4px_hsl(var(--coral)/0.16)]"
                            : state === "done"
                            ? "border-coral bg-coral text-white"
                            : "border-rule text-stone-mid bg-paper",
                        ].join(" ")}
                      >
                        {state === "done" ? (
                          <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                        ) : (
                          s.n
                        )}
                      </span>
                      <span
                        className={[
                          "label text-[0.5625rem] md:text-[0.625rem] text-center leading-tight whitespace-normal transition-colors duration-300",
                          state === "upcoming" ? "text-stone-mid" : "text-ink",
                        ].join(" ")}
                      >
                        {short}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Textual active indicator — keeps state legible without relying on
              colour, and names the current employee on narrow screens. */}
          <p className="label text-stone-mid mt-4 text-center md:text-left">
            <span className="text-coral-ink">Exit {stages[active]?.n}</span>
            <span className="mx-2 text-stone-soft" aria-hidden="true">
              ·
            </span>
            {stages[active]?.name}
          </p>
        </div>
      </div>
    </div>
  );
}
