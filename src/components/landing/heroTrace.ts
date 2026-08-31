/**
 * Hero trace markers — the six labels the hero's pulse has always carried.
 *
 * This data is deliberately kept SEPARATE from the seven-employee section
 * (`AIEmployees.tsx`). The hero must render exactly as it did before that
 * section was reworked: six markers, these six labels, in this order. Editing
 * the section's employee list must never change the hero, so the hero reads
 * from here rather than from the section.
 *
 * Shape matches the hero's usage (`EMPLOYEES.map((e) => e.name)`).
 */

export type HeroMarker = { n: string; name: string };

/** Six markers, left to right along the hero trace — unchanged from origin. */
export const EMPLOYEES: HeroMarker[] = [
  { n: "01", name: "AI Sales Coaching" },
  { n: "02", name: "AI Receptionist" },
  { n: "03", name: "AI Reengagement Campaigns" },
  { n: "04", name: "AI Reviews & Referrals" },
  { n: "05", name: "AI Website Lead Nurture" },
  { n: "06", name: "AI Lead Gen (Paid Ads)" },
];
