import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "border-teal-bright/80 bg-teal-bright text-white hover:bg-cyan-bright",
  secondary:
    "border-white/18 bg-white/6 text-ice hover:border-cyan-bright/50 hover:bg-white/10",
  ghost:
    "border-transparent bg-transparent text-ice hover:bg-white/6",
} as const;

type Variant = keyof typeof variants;

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-none border px-5 text-sm font-semibold tracking-wide transition-colors";

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
