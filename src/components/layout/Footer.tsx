import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-graphite">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-ice">
            {site.name}
          </p>
          <p className="mt-1 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {site.chineseName} · {site.domain}
          </p>
          <p className="mt-4 max-w-md text-sm text-muted">{site.companyLine}</p>
          <p className="mt-4 text-sm text-ice">{site.brandSlogan}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-cyan-bright uppercase">
            Site
          </p>
          <ul className="mt-4 grid gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="text-muted hover:text-ice" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-muted hover:text-ice" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-cyan-bright uppercase">
            Contact
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            <li>
              <a className="hover:text-ice" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
            <li>Working model {site.productModel}</li>
            <li>
              <Link className="text-teal-bright hover:text-cyan-bright" href="/dealers">
                Become a Dealer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.foundedLine}
          </p>
          <p>Product specifications are confirmed in the quotation and build sheet.</p>
        </div>
      </div>
    </footer>
  );
}
