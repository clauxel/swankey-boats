import Image from "next/image";
import type { ReactNode } from "react";
import { photos } from "@/lib/media";
import { ButtonLink } from "./Button";
import { Container, Eyebrow } from "./Section";

export function CtaBand({
  eyebrow = "Dealer path",
  title,
  body,
  primaryHref = "/dealers",
  primaryLabel = "Become a Dealer",
  secondaryHref,
  secondaryLabel,
  children,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={photos.heroLake.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_70%] opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/55" />
      <Container className="relative z-10 py-16 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-ice sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          {secondaryHref && secondaryLabel ? (
            <ButtonLink href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
