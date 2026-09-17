import { ButtonLink } from "@/components/ui/Button";
import { LakeScene } from "@/components/visual/LakeScene";
import { heroCopy } from "@/lib/content";
import { site } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative isolate h-[calc(100svh-2.75rem)] overflow-hidden md:h-svh">
      <LakeScene note={heroCopy.sceneNote} />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-5 pb-8 sm:px-8 md:justify-center md:pb-0">
        <div className="max-w-2xl pt-20 sm:pt-24">
          <p className="font-mono text-[11px] tracking-[0.22em] text-cyan-bright uppercase">
            {site.name} · {site.productModel}
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.02] font-semibold tracking-tight text-ice sm:text-6xl lg:text-7xl">
            {heroCopy.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-ice/80 sm:text-lg">{heroCopy.sub}</p>
          <p className="mt-4 text-lg font-medium text-ice">{site.brandSlogan}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/dealers">{heroCopy.primaryCta}</ButtonLink>
            <ButtonLink href="/contact?topic=product" variant="secondary">
              {heroCopy.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-2 self-stretch sm:grid-cols-4 md:absolute md:right-8 md:bottom-10 md:mt-0 md:w-[min(36rem,calc(100%-4rem))]">
          {heroCopy.params.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/12 bg-black/35 px-3 py-3 backdrop-blur-sm"
            >
              <dt className="sr-only">Key fact</dt>
              <dd className="text-sm leading-snug font-medium text-ice">{item}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
