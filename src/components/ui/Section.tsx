import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-bright">
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  actions?: ReactNode;
}) {
  return (
    <Section className="page-hero mb-14 pb-14 pt-16 sm:pb-20 sm:pt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-ice sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">{lead}</p>
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </Section>
  );
}
