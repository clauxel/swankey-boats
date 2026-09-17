import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "border-cyan bg-cyan text-graphite hover:border-cyan-bright hover:bg-cyan-bright",
  secondary:
    "border-white/30 bg-transparent text-ice hover:border-cyan hover:text-cyan-bright",
  ghost:
    "border-transparent bg-transparent text-ice hover:text-cyan-bright",
} as const;

type Variant = keyof typeof variants;

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 border px-6 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
