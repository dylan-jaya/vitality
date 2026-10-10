import { describe, expect, it } from "vitest";
import {
  ACTIVITY_LEVELS,
  bmi,
  bmiCategory,
  bmr,
  bodyFatCategory,
  bodyFatNavy,
  calorieTargets,
  healthyWeightRange,
  tdee,
  waterIntakeLiters,
  type ActivityId,
} from "./health";

describe("bmi", () => {
  it("divides weight by height in metres squared", () => {
    expect(bmi(70, 175)).toBeCloseTo(22.86, 2);
    expect(bmi(100, 200)).toBe(25);
  });
});

describe("bmiCategory", () => {
  it.each([
    [18.49, "Underweight"],
    [18.5, "Healthy weight"],
    [24.99, "Healthy weight"],
    [25, "Overweight"],
    [29.99, "Overweight"],
    [30, "Obese"],
  ])("WHO: %s → %s", (value, label) => {
    expect(bmiCategory(value, "who").label).toBe(label);
  });

  it.each([
    [18.49, "Underweight"],
    [22.99, "Healthy weight"],
    [23, "Overweight"],
    [27.49, "Overweight"],
    [27.5, "Obese"],
  ])("Asia-Pacific: %s → %s", (value, label) => {
    expect(bmiCategory(value, "asian").label).toBe(label);
  });

  it("defaults to the WHO standard", () => {
    expect(bmiCategory(24).label).toBe("Healthy weight");
  });

  it("assigns a tone per category", () => {
    expect(bmiCategory(17).tone).toBe("info");
    expect(bmiCategory(22).tone).toBe("good");
    expect(bmiCategory(27).tone).toBe("warn");
    expect(bmiCategory(35).tone).toBe("bad");
  });
});

describe("healthyWeightRange", () => {
  it("returns the weights at BMI 18.5 and the overweight cut-off", () => {
    const who = healthyWeightRange(175, "who");
    expect(who.min).toBeCloseTo(56.66, 2);
    expect(who.max).toBeCloseTo(76.56, 2);
    expect(healthyWeightRange(175, "asian").max).toBeCloseTo(70.44, 2);
  });
});

describe("bmr (Mifflin–St Jeor)", () => {
  it("adds 5 for males", () => {
    expect(bmr("male", 70, 175, 30)).toBeCloseTo(1648.75, 2);
  });
  it("subtracts 161 for females", () => {
    expect(bmr("female", 60, 165, 30)).toBeCloseTo(1320.25, 2);
  });
});

describe("tdee", () => {
  it.each(ACTIVITY_LEVELS.map((l) => [l.id, l.factor] as const))("%s multiplies BMR by %s", (id, factor) => {
    expect(tdee(1000, id)).toBeCloseTo(1000 * factor, 6);
  });
  it("falls back to sedentary for an unknown level", () => {
    expect(tdee(1000, "nope" as ActivityId)).toBeCloseTo(1200, 6);
  });
});

describe("calorieTargets", () => {
  it("returns cut / maintain / bulk around TDEE", () => {
    expect(calorieTargets(2500)).toEqual({ cut: 2000, maintain: 2500, bulk: 2800 });
  });
});

describe("bodyFatNavy", () => {
  it("estimates male body fat from neck and waist", () => {
    expect(bodyFatNavy("male", 180, 38, 85)).toBeCloseTo(16.1, 1);
  });
  it("uses hip measurement for females", () => {
    expect(bodyFatNavy("female", 165, 34, 75, 100)).toBeCloseTo(28.9, 1);
    expect(bodyFatNavy("female", 165, 34, 75, 110)!).toBeGreaterThan(bodyFatNavy("female", 165, 34, 75, 100)!);
  });
  it("returns null when the girth would be non-positive", () => {
    expect(bodyFatNavy("male", 180, 40, 40)).toBeNull();
    expect(bodyFatNavy("male", 180, 50, 40)).toBeNull();
  });
});

describe("bodyFatCategory", () => {
  it.each([
    [5.9, "Essential fat"],
    [6, "Athletic"],
    [14, "Fitness"],
    [18, "Average"],
    [25, "High"],
  ])("male %s%% → %s", (pct, label) => {
    expect(bodyFatCategory("male", pct).label).toBe(label);
  });

  it.each([
    [13.9, "Essential fat"],
    [14, "Athletic"],
    [21, "Fitness"],
    [25, "Average"],
    [32, "High"],
  ])("female %s%% → %s", (pct, label) => {
    expect(bodyFatCategory("female", pct).label).toBe(label);
  });
});

describe("waterIntakeLiters", () => {
  it("is ~33 ml per kg with no exercise", () => {
    expect(waterIntakeLiters(70, 0)).toBeCloseTo(2.31, 2);
  });
  it("adds 350 ml per 30 minutes of exercise", () => {
    expect(waterIntakeLiters(70, 60)).toBeCloseTo(3.01, 2);
  });
});
