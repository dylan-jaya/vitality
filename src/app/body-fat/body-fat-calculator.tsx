"use client";

import { useState } from "react";
import { NumberField } from "@/components/number-field";
import { ResultCard } from "@/components/result-card";
import { SegmentedControl } from "@/components/segmented-control";
import { bodyFatCategory, bodyFatNavy, type Sex } from "@/lib/health";
import { LIMITS, parseInRange } from "@/lib/parse";

const SEXES = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

const [cMin, cMax] = LIMITS.circumferenceCm;

export function BodyFatCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const h = parseInRange(height, ...LIMITS.heightCm);
  const n = parseInRange(neck, cMin, cMax);
  const wa = parseInRange(waist, cMin, cMax);
  const hp = sex === "female" ? parseInRange(hip, cMin, cMax) : 0;

  const complete = h !== null && n !== null && wa !== null && hp !== null;
  const raw = complete ? bodyFatNavy(sex, h, n, wa, hp) : null;
  // Outside this range the formula is unreliable — almost always a measurement typo.
  const pct = raw !== null && raw >= 2 && raw <= 70 ? raw : null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <SegmentedControl label="Sex" options={SEXES} value={sex} onChange={setSex} />
        <NumberField label="Height" unit="cm" value={height} onChange={setHeight} min={LIMITS.heightCm[0]} max={LIMITS.heightCm[1]} />
        <NumberField label="Neck" unit="cm" value={neck} onChange={setNeck} min={cMin} max={cMax} />
        <NumberField label="Waist" unit="cm" value={waist} onChange={setWaist} min={cMin} max={cMax} />
        {sex === "female" && <NumberField label="Hip" unit="cm" value={hip} onChange={setHip} min={cMin} max={cMax} />}
        <p className="text-xs text-muted">
          Measure the neck below the larynx, the waist at the navel{sex === "female" ? ", and the hips at their widest point" : ""}.
        </p>
      </form>
      <ResultCard
        title="Estimated body fat"
        value={pct === null ? undefined : pct.toFixed(1)}
        unit="%"
        category={pct === null ? undefined : bodyFatCategory(sex, pct)}
        hint={complete ? "Those measurements don't look right — please double-check them." : "Enter your measurements to see your estimate."}
      />
    </div>
  );
}
