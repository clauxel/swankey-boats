import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/lib/media";
import { heroCopy } from "@/lib/content";
import { site } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden md:h-svh">
      <Image
        src={photos.heroLake.src}
        alt={photos.heroLake.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_62%]"
      />
      <div className="photo-shade absolute inset-0" />
      <div className="relative z-10 mx-auto flex h-full min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pb-8 pt-24 sm:px-8 md:min-h-0 md:pt-0 md:pb-14">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
            {site.name} · {site.productModel}
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.02] font-semibold tracking-tight text-ice sm:text-6xl lg:text-[4.5rem]">
            {heroCopy.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-ice/85 sm:text-lg">{heroCopy.sub}</p>
          <p className="mt-4 text-lg font-medium text-ice">{site.brandSlogan}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/dealers">{heroCopy.primaryCta}</ButtonLink>
            <ButtonLink href="/contact?topic=product" variant="secondary">
              {heroCopy.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-px self-stretch border border-white/15 bg-black/55 sm:grid-cols-4">
          {heroCopy.params.map((item) => (
            <div key={item} className="bg-black/50 px-4 py-4 backdrop-blur-md">
              <dt className="sr-only">Key fact</dt>
              <dd className="text-sm leading-snug font-medium text-ice">{item}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
