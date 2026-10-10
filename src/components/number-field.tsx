"use client";

import { useId } from "react";

interface NumberFieldProps {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberField({ label, unit, value, onChange, min, max, step = 0.1 }: NumberFieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-border bg-card focus-within:ring-2 focus-within:ring-accent">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent px-3 py-2.5 text-base outline-none"
        />
        <span className="pr-3 text-sm text-muted">{unit}</span>
      </div>
    </div>
  );
}
