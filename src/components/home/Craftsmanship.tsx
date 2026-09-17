import { Photo } from "@/components/ui/Photo";
import { Container, Eyebrow } from "@/components/ui/Section";
import { craftsmanship } from "@/lib/media";

export function Craftsmanship() {
  return (
    <section>
      <Container>
        <Eyebrow>Craftsmanship</Eyebrow>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-ice sm:text-5xl">
          Built for the cast, finished like a working boat
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Wide decks, a low console, gasketed hatches and a hidden jet — the HQ E498 is specified as
          one aluminum fishing system, not a kit of bolt-ons.
        </p>
      </Container>
      <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2">
        {craftsmanship.map((item) => (
          <article key={item.title} className="group relative isolate min-h-[18rem] sm:min-h-[22rem]">
            <Photo
              photo={item.photo}
              className="absolute inset-0"
              imgClassName="object-cover transition duration-700 group-hover:scale-[1.04]"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-ice">{item.title}</h3>
              <p className="mt-2 max-w-md text-sm text-ice/80">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
