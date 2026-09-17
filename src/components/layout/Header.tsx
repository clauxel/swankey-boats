"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        solid
          ? "border-white/10 bg-[#05080c]/92 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-black/55 to-transparent"
      }`}
    >
      <div className="h-px w-full bg-cyan/80" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center border border-cyan/50">
            <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
              <path
                d="M4 20c4-2 8-8 12-8s8 6 12 8"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.6"
              />
              <path d="M6 18.5 16 11l10 7.5v3L16 14.2 6 21.5z" fill="#00c2d4" />
              <rect x="14.2" y="12.2" width="3.6" height="3.2" rx="0.4" fill="#05080c" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[13px] font-semibold tracking-[0.26em] text-ice">
              HUANQI
            </span>
            <span className="block truncate font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              {site.domain}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 text-[12px] font-medium tracking-[0.12em] uppercase transition-colors ${
                  active ? "text-cyan" : "text-ice/75 hover:text-ice"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/dealers"
            className="hidden min-h-10 items-center border border-cyan bg-cyan px-4 text-[11px] font-semibold tracking-[0.16em] text-graphite uppercase sm:inline-flex"
          >
            Become a Dealer
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className={`h-px w-4 bg-ice transition ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-ice transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-4 bg-ice transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-[#05080c]/98 px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/8 py-3 text-sm tracking-[0.12em] text-ice uppercase"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dealers"
              className="mt-4 border border-cyan bg-cyan px-4 py-3 text-center text-[11px] font-semibold tracking-[0.16em] text-graphite uppercase"
              onClick={() => setOpen(false)}
            >
              Become a Dealer
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
