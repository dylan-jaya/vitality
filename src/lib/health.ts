// Pure health formulas. Units are metric throughout: kg, cm, years.

export type Sex = "male" | "female";

export type BmiStandard = "who" | "asian";

export interface BmiCategory {
  label: string;
  tone: "info" | "good" | "warn" | "bad";
}

export function bmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

// WHO cut-offs, plus the lower WHO Asia-Pacific cut-offs commonly used in Indonesia.
const BMI_THRESHOLDS: Record<BmiStandard, { overweight: number; obese: number }> = {
  who: { overweight: 25, obese: 30 },
  asian: { overweight: 23, obese: 27.5 },
};

export function bmiCategory(value: number, standard: BmiStandard = "who"): BmiCategory {
  const t = BMI_THRESHOLDS[standard];
  if (value < 18.5) return { label: "Underweight", tone: "info" };
  if (value < t.overweight) return { label: "Healthy weight", tone: "good" };
  if (value < t.obese) return { label: "Overweight", tone: "warn" };
  return { label: "Obese", tone: "bad" };
}

export function healthyWeightRange(heightCm: number, standard: BmiStandard = "who") {
  const m = heightCm / 100;
  return {
    min: 18.5 * m * m,
    max: BMI_THRESHOLDS[standard].overweight * m * m,
  };
}

// Mifflin–St Jeor equation.
export function bmr(sex: Sex, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Sedentary", hint: "Little or no exercise", factor: 1.2 },
  { id: "light", label: "Lightly active", hint: "1–3 days/week", factor: 1.375 },
  { id: "moderate", label: "Moderately active", hint: "3–5 days/week", factor: 1.55 },
  { id: "very", label: "Very active", hint: "6–7 days/week", factor: 1.725 },
  { id: "extra", label: "Extra active", hint: "Physical job or 2×/day training", factor: 1.9 },
] as const;

export type ActivityId = (typeof ACTIVITY_LEVELS)[number]["id"];

export function tdee(bmrValue: number, activity: ActivityId): number {
  const level = ACTIVITY_LEVELS.find((l) => l.id === activity) ?? ACTIVITY_LEVELS[0];
  return bmrValue * level.factor;
}

// U.S. Navy circumference method (metric form).
export function bodyFatNavy(
  sex: Sex,
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm = 0,
): number | null {
  const girth = sex === "male" ? waistCm - neckCm : waistCm + hipCm - neckCm;
  if (girth <= 0) return null;
  const density =
    sex === "male"
      ? 1.0324 - 0.19077 * Math.log10(girth) + 0.15456 * Math.log10(heightCm)
      : 1.29579 - 0.35004 * Math.log10(girth) + 0.221 * Math.log10(heightCm);
  return 495 / density - 450;
}

// American Council on Exercise ranges.
export function bodyFatCategory(sex: Sex, pct: number): BmiCategory {
  const [essential, athletes, fitness, average] = sex === "male" ? [6, 14, 18, 25] : [14, 21, 25, 32];
  if (pct < essential) return { label: "Essential fat", tone: "info" };
  if (pct < athletes) return { label: "Athletic", tone: "good" };
  if (pct < fitness) return { label: "Fitness", tone: "good" };
  if (pct < average) return { label: "Average", tone: "warn" };
  return { label: "High", tone: "bad" };
}

// Rough daily guideline: ~33 ml per kg, plus ~350 ml per 30 minutes of exercise.
export function waterIntakeLiters(weightKg: number, exerciseMinutes: number): number {
  return weightKg * 0.033 + (exerciseMinutes / 30) * 0.35;
}

export function calorieTargets(tdeeValue: number) {
  return {
    cut: tdeeValue - 500,
    maintain: tdeeValue,
    bulk: tdeeValue + 300,
  };
}
