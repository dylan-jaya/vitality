import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Know your numbers.</h1>
        <p className="mt-2 max-w-xl text-muted">
          Quick, private health calculators. Everything runs in your browser — nothing you type is sent anywhere.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block h-full rounded-2xl border border-border bg-card p-5 transition hover:border-accent hover:shadow-sm"
            >
              <span aria-hidden className="text-2xl">{t.emoji}</span>
              <h2 className="mt-2 font-semibold">{t.name}</h2>
              <p className="mt-1 text-sm text-muted">{t.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
