import type { ReactNode } from "react";

export function DemoPageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 px-6 md:px-8 pt-8 pb-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-muted max-w-xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
