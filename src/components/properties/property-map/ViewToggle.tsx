"use client";

type View = "list" | "map";

type Props = {
  value: View;
  onChange: (v: View) => void;
  className?: string;
};

/** Mobile-only switch between list and faux map (desktop shows both). */
export function ViewToggle({ value, onChange, className = "" }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Browse view"
      className={`flex rounded-2xl border border-border bg-surface-2 p-1 shadow-inner ${className}`}
    >
      {(
        [
          { id: "list" as const, label: "List view" },
          { id: "map" as const, label: "Map view" },
        ] satisfies { id: View; label: string }[]
      ).map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-extrabold tracking-wide transition ${
            value === t.id
              ? "bg-surface text-accent shadow-sm ring-1 ring-accent/20"
              : "text-muted hover:text-text"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
