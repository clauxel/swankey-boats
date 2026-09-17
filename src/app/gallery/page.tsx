import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, PageHero, Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
export const metadata = buildMetadata("gallery", "/gallery");
const images = [
 {src:"/media/film-poster.jpg",label:"Open water. Endless possibility."},
 {src:"/media/lake-run.jpg",label:"A new perspective on the lake."},
 {src:"/media/fishing.jpg",label:"For the moments that keep you coming back."},
 {src:"/media/horizon.jpg",label:"Find your next horizon."},
];
export default function GalleryPage(){return <main id="main"><PageHero eyebrow="ON THE WATER" title="The water is calling." lead="Wide-open lakes, early starts and another cast. Explore the world that inspires Swankey." actions={<><ButtonLink href="#film">Watch the film</ButtonLink><ButtonLink href="/contact?topic=media" variant="secondary">Request a media kit</ButtonLink></>} />
<Section className="pt-0" id="film"><Eyebrow>ON THE WATER</Eyebrow><video className="gallery-film" controls playsInline preload="metadata" poster="/media/film-poster.jpg" src="/media/swankey-water-film.mp4?v=3" aria-label="On the water boating film" /></Section>
<Section className="pt-0"><div className="gallery-grid">{images.map(i=><figure key={i.src}><Image src={i.src} width={1920} height={816} alt={i.label}/><figcaption>{i.label}</figcaption></figure>)}</div></Section>
<Section className="pt-0"><Eyebrow>E498</Eyebrow><h2 className="font-display mb-8 text-3xl">Designed around the cast.</h2><figure><div className="product-render"><Image src="/media/e498-design.png" width={1536} height={1024} alt="Swankey E498 design rendering" /></div><figcaption className="media-caption">E498 design — configuration and details are confirmed in your build sheet.</figcaption></figure><div className="mt-8"><ButtonLink href="/product">Discover the E498</ButtonLink></div></Section></main>}
