"use client";

import { useState } from "react";
import { NumberField } from "@/components/number-field";
import { ResultCard } from "@/components/result-card";
import { waterIntakeLiters } from "@/lib/health";
import { LIMITS, parseInRange } from "@/lib/parse";

const GLASS_ML = 250;

export function WaterCalculator() {
  const [weight, setWeight] = useState("");
  const [exercise, setExercise] = useState("0");

  const w = parseInRange(weight, ...LIMITS.weightKg);
  const ex = parseInRange(exercise, ...LIMITS.exerciseMinutes);
  const liters = w !== null && ex !== null ? waterIntakeLiters(w, ex) : null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <NumberField label="Weight" unit="kg" value={weight} onChange={setWeight} min={LIMITS.weightKg[0]} max={LIMITS.weightKg[1]} />
        <NumberField
          label="Exercise per day"
          unit="min"
          step={5}
          value={exercise}
          onChange={setExercise}
          min={LIMITS.exerciseMinutes[0]}
          max={LIMITS.exerciseMinutes[1]}
        />
        <p className="text-xs text-muted">Hot weather, illness, pregnancy and breastfeeding all increase your needs.</p>
      </form>
      <ResultCard
        title="Daily water target"
        value={liters === null ? undefined : liters.toFixed(1)}
        unit="litres"
        hint="Enter your weight to see your target."
      >
        {liters !== null && <p>That&apos;s about <strong>{Math.round((liters * 1000) / GLASS_ML)} glasses</strong> of 250 ml.</p>}
      </ResultCard>
    </div>
  );
}
