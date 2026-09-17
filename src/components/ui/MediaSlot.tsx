import type { ReactNode } from "react";

const ratios = {
  video: "aspect-video",
  wide: "aspect-[16/8]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  hero: "aspect-[16/10]",
} as const;

export function MediaSlot({
  label,
  caption,
  children,
  className = "",
  ratio = "video",
}: {
  label: string;
  caption?: string;
  children?: ReactNode;
  className?: string;
  ratio?: keyof typeof ratios;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#102236] ${ratios[ratio]}`}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(71,148,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(71,148,212,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {children}

      </div>
      <figcaption className="mt-3">
        <p className="text-sm font-semibold text-ice">{label}</p>
        {caption ? <p className="mt-1 text-sm text-muted">{caption}</p> : null}
      </figcaption>
    </figure>
  );
}
