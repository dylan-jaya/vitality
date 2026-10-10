import type { ReactNode } from "react";
import type { BmiCategory } from "@/lib/health";

const TONE_CLASSES: Record<BmiCategory["tone"], string> = {
  info: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  good: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  warn: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  bad: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

interface ResultCardProps {
  title: string;
  value?: string;
  unit?: string;
  category?: BmiCategory;
  hint?: string;
  children?: ReactNode;
}

export function ResultCard({ title, value, unit, category, hint, children }: ResultCardProps) {
  return (
    <section aria-live="polite" className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-sm font-medium text-muted">{title}</h2>
      {value === undefined ? (
        <p className="mt-2 text-sm text-muted">{hint ?? "Fill in the fields to see your result."}</p>
      ) : (
        <>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span data-testid="result-value" className="text-4xl font-semibold tabular-nums">
              {value}
            </span>
            {unit && <span className="text-muted">{unit}</span>}
          </p>
          {category && (
            <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-sm font-medium ${TONE_CLASSES[category.tone]}`}>
              {category.label}
            </span>
          )}
          {children && <div className="mt-4 text-sm">{children}</div>}
        </>
      )}
    </section>
  );
}
