import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-accent">●</span> Vitality
        </Link>
        <nav aria-label="Tools" className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="hover:text-foreground">
              {t.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
