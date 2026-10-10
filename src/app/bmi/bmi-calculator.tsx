"use client";

import { useState } from "react";
import { NumberField } from "@/components/number-field";
import { ResultCard } from "@/components/result-card";
import { SegmentedControl } from "@/components/segmented-control";
import { bmi, bmiCategory, healthyWeightRange, type BmiStandard } from "@/lib/health";
import { LIMITS, parseInRange } from "@/lib/parse";

const STANDARDS = [
  { value: "who", label: "WHO" },
  { value: "asian", label: "Asia-Pacific" },
] as const;

export function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [standard, setStandard] = useState<BmiStandard>("who");

  const h = parseInRange(height, ...LIMITS.heightCm);
  const w = parseInRange(weight, ...LIMITS.weightKg);
  const value = h !== null && w !== null ? bmi(w, h) : null;
  const range = h !== null ? healthyWeightRange(h, standard) : null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <NumberField label="Height" unit="cm" value={height} onChange={setHeight} min={LIMITS.heightCm[0]} max={LIMITS.heightCm[1]} />
        <NumberField label="Weight" unit="kg" value={weight} onChange={setWeight} min={LIMITS.weightKg[0]} max={LIMITS.weightKg[1]} />
        <SegmentedControl label="Standard" options={STANDARDS} value={standard} onChange={setStandard} />
        <p className="text-xs text-muted">
          Asia-Pacific cut-offs (overweight from 23, obese from 27.5) are recommended for Asian populations.
        </p>
      </form>
      <ResultCard
        title="Your BMI"
        value={value === null ? undefined : value.toFixed(1)}
        unit="kg/m²"
        category={value === null ? undefined : bmiCategory(value, standard)}
        hint="Enter your height and weight to see your BMI."
      >
        {range && (
          <p>
            Healthy weight for your height:{" "}
            <strong>
              {range.min.toFixed(1)}–{range.max.toFixed(1)} kg
            </strong>
          </p>
        )}
      </ResultCard>
    </div>
  );
}
