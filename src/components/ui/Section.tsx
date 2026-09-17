import Image from "next/image";
import type { ReactNode } from "react";
import type { PhotoAsset } from "@/lib/media";

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
    <p className="mb-3 font-mono text-[11px] font-medium tracking-[0.28em] text-cyan uppercase">
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  photo,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  actions?: ReactNode;
  photo?: PhotoAsset;
}) {
  if (photo) {
    return (
      <section className="relative isolate min-h-[58svh] overflow-hidden sm:min-h-[64svh]">
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_62%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/25 to-transparent" />
        <Container className="relative z-10 flex min-h-[58svh] flex-col justify-end pb-12 pt-28 sm:min-h-[64svh] sm:pb-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display max-w-4xl text-4xl leading-[1.04] font-semibold tracking-tight text-ice sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ice/80">{lead}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </Container>
      </section>
    );
  }

  return (
    <Section className="pt-28 pb-10 sm:pt-32 sm:pb-12">
      <div className="mb-6 h-px w-16 bg-cyan" />
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-ice sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">{lead}</p>
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </Section>
  );
}
