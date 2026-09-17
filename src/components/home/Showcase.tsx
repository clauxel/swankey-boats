"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const cards = [
  { title: "E498", caption: "Electric jet bass boat", image: "/media/e498-equipped.png", href: "/product", product: true },
  { title: "Electric. Integrated.", caption: "Explore the technology", image: "/media/lake-run.jpg", href: "/technology" },
  { title: "Life on the water", caption: "Find your next horizon", image: "/media/film-poster.jpg", href: "/gallery" },
  { title: "Become a dealer", caption: "Build something together", image: "/media/fishing.jpg", href: "/dealers" },
  { title: "Made for your market", caption: "OEM / ODM cooperation", image: "/media/waterline.jpg", href: "/contact?topic=oem" },
];

export function ProductCarousel() {
  const track = useRef<HTMLDivElement>(null);
  function move(direction: number) {
    const t = track.current;
    if (!t) return;
    const end = t.scrollWidth - t.clientWidth;
    const step = (t.querySelector("article")?.getBoundingClientRect().width ?? t.clientWidth) + Number.parseFloat(getComputedStyle(t).columnGap);
    const destination = direction > 0 && t.scrollLeft >= end - 5 ? 0 : direction < 0 && t.scrollLeft <= 5 ? end : t.scrollLeft + direction * step;
    t.scrollTo({left: destination, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
  }
  return <section className="catalogue" id="discover" aria-label="Discover Swankey">
    <div className="catalogue-heading"><p className="overline">MADE FOR THE WATER</p><h2>Find your Swankey.</h2></div>
    <div className="catalogue-wrap"><button className="carousel-arrow prev" onClick={() => move(-1)} aria-label="Previous products">←</button>
      <div className="catalogue-track" ref={track}>{cards.map(card => <article className="catalogue-card" key={card.title}><Link href={card.href}><div className="catalogue-title"><h3>{card.title}</h3><p>{card.caption}</p></div><div className={`catalogue-image ${card.product ? "boat-image" : ""}`}><Image src={card.image} width={600} height={400} alt={card.product ? "Swankey E498 equipped design with fishing gear and compact sun canopy" : card.title} /></div><span className="card-cta">Discover more <span aria-hidden="true">↗</span></span></Link></article>)}</div>
      <button className="carousel-arrow next" onClick={() => move(1)} aria-label="Next products">→</button></div>
  </section>;
}

const slides = [
  { title: "SWANKEY E498", sub: "ENGINEERED FOR SHALLOW WATER. BUILT FOR THE CAST.", left: "4.98", unit: "M", leftLabel: "Length class", right: "GNSS", rightLabel: "Station keeping", image: "/media/film-poster.jpg", link: "/product", cta: "Explore the E498" },
  { title: "ONE COMPLETE SYSTEM", sub: "ELECTRIC PROPULSION. INTUITIVE CONTROL. MORE TIME TO FISH.", left: "JET", unit: "", leftLabel: "Integrated electric propulsion", right: "HOLD", rightLabel: "Heading & current control", image: "/media/lake-run.jpg", link: "/technology", cta: "Explore the technology" },
];
export function FeatureSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    if (paused || interacting || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, interacting]);
  const slide = slides[active];
  const move = (d: number) => setActive(i => (i + d + slides.length) % slides.length);
  return <section className="feature-slider" aria-roledescription="carousel" aria-label="E498 highlights" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocus={() => setInteracting(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }}>
    <div className="feature-backgrounds">{slides.map((s, i) => <Image key={s.title} src={s.image} fill sizes="100vw" alt="" className={i === active ? "active" : ""} />)}</div>
    <div className="feature-blue-panel" />
    <div className="feature-content" key={active} aria-live={paused || interacting ? "polite" : "off"}><div className="feature-heading"><h2>{slide.title}</h2><p>{slide.sub}</p></div>
      <div className="feature-stage"><div className="feature-stat"><p>{slide.left}<small>{slide.unit}</small></p><span>{slide.leftLabel}</span></div><Image className="feature-boat" src="/media/e498-equipped.png" width={1536} height={1024} alt="Swankey E498 equipped design with fishing gear and compact sun canopy" /><div className="feature-stat"><p>{slide.right}</p><span>{slide.rightLabel}</span></div></div>
      <Link className="action outline" href={slide.link}>{slide.cta} <span aria-hidden="true">↗</span></Link>
    </div>
    <button className="carousel-arrow prev" onClick={() => move(-1)} aria-label="Previous highlight">←</button><button className="carousel-arrow next" onClick={() => move(1)} aria-label="Next highlight">→</button>
    <button className="slider-motion" onClick={() => setPaused(!paused)} aria-label={paused ? "Play automatic highlights" : "Pause automatic highlights"}>{paused ? "Play" : "Pause"}</button><div className="slider-dots">{slides.map((s, i) => <button key={s.title} aria-label={`Show ${s.title}`} aria-pressed={active === i} onClick={() => setActive(i)} className={active === i ? "active" : ""} />)}</div>
  </section>;
}
