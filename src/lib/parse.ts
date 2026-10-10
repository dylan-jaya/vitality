// Parses a form string into a number within [min, max], or null if missing/out of range.
export function parseInRange(raw: string, min: number, max: number): number | null {
  if (raw.trim() === "") return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

export const LIMITS = {
  heightCm: [50, 250],
  weightKg: [2, 400],
  age: [15, 100],
  circumferenceCm: [10, 250],
  exerciseMinutes: [0, 600],
} as const satisfies Record<string, readonly [number, number]>;
