"use client";

import { useId, useState } from "react";
import { NumberField } from "@/components/number-field";
import { ResultCard } from "@/components/result-card";
import { SegmentedControl } from "@/components/segmented-control";
import { ACTIVITY_LEVELS, bmr, calorieTargets, tdee, type ActivityId, type Sex } from "@/lib/health";
import { LIMITS, parseInRange } from "@/lib/parse";

const SEXES = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

const kcal = (n: number) => Math.round(n).toLocaleString("en-US");

export function CalorieCalculator() {
  const activityId = useId();
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<ActivityId>("moderate");

  const a = parseInRange(age, ...LIMITS.age);
  const h = parseInRange(height, ...LIMITS.heightCm);
  const w = parseInRange(weight, ...LIMITS.weightKg);
  const base = a !== null && h !== null && w !== null ? bmr(sex, w, h, a) : null;
  const daily = base === null ? null : tdee(base, activity);
  const targets = daily === null ? null : calorieTargets(daily);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <SegmentedControl label="Sex" options={SEXES} value={sex} onChange={setSex} />
        <NumberField label="Age" unit="years" step={1} value={age} onChange={setAge} min={LIMITS.age[0]} max={LIMITS.age[1]} />
        <NumberField label="Height" unit="cm" value={height} onChange={setHeight} min={LIMITS.heightCm[0]} max={LIMITS.heightCm[1]} />
        <NumberField label="Weight" unit="kg" value={weight} onChange={setWeight} min={LIMITS.weightKg[0]} max={LIMITS.weightKg[1]} />
        <div className="flex flex-col gap-1.5">
          <label htmlFor={activityId} className="text-sm font-medium">
            Activity level
          </label>
          <select
            id={activityId}
            value={activity}
            onChange={(e) => setActivity(e.target.value as ActivityId)}
            className="rounded-xl border border-border bg-card px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-accent"
          >
            {ACTIVITY_LEVELS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} — {l.hint}
              </option>
            ))}
          </select>
        </div>
      </form>
      <ResultCard
        title="Maintenance calories"
        value={daily === null ? undefined : kcal(daily)}
        unit="kcal/day"
        hint="Enter your age, height and weight (age 15–100)."
      >
        {base !== null && targets && (
          <dl className="grid grid-cols-2 gap-y-1.5">
            <dt className="text-muted">Resting (BMR)</dt>
            <dd className="text-right tabular-nums">{kcal(base)} kcal</dd>
            <dt className="text-muted">Lose weight</dt>
            <dd className="text-right tabular-nums">{kcal(targets.cut)} kcal</dd>
            <dt className="text-muted">Gain muscle</dt>
            <dd className="text-right tabular-nums">{kcal(targets.bulk)} kcal</dd>
          </dl>
        )}
      </ResultCard>
    </div>
  );
}
