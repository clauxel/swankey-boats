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
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1620] ${ratios[ratio]}`}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {children}
        <span className="absolute top-3 left-3 z-10 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-cyan-bright uppercase">
          Media slot
        </span>
      </div>
      <figcaption className="mt-3">
        <p className="text-sm font-semibold text-ice">{label}</p>
        {caption ? <p className="mt-1 text-sm text-muted">{caption}</p> : null}
      </figcaption>
    </figure>
  );
}
