export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-1 text-muted">{description}</p>
    </div>
  );
}
