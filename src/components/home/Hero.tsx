"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function HomeHero() {
  const video = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const resumeBackground = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { if (preference.matches) media.pause(); else void media.play().catch(() => {}); };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  function openFilm() {
    resumeBackground.current = !video.current?.paused;
    dialog.current?.showModal();
    video.current?.pause();
    void film.current?.play().catch(() => {});
  }
  function closeFilm() {
    film.current?.pause();
    dialog.current?.close();
    if (resumeBackground.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) void video.current?.play().catch(() => {});
  }

  return (
    <section className="home-hero" aria-label="Swankey on the water">
      <video ref={video} className="hero-video" src="/media/swankey-water-film.mp4?v=7" poster="/media/film-poster.jpg" autoPlay muted={muted} loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Boating film across inland lakes" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="overline">SWANKEY · ELECTRIC JET BASS BOATS</p>
        <h1>Go shallow.<br />Fish further.</h1>
        <p className="hero-intro">A new perspective on life on the water.</p>
        <div className="hero-actions"><Link className="action primary" href="/product">Explore E498</Link><button className="action outline" onClick={openFilm}>Watch the film</button></div>
      </div>
      <div className="hero-bottom"><a href="#discover" className="scroll-cue">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><div className="video-controls"><button onClick={() => { const v = video.current; if (v) {if (v.paused) void v.play().catch(() => {}); else v.pause();} }} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Pause" : "Play"}</button><span aria-hidden="true">/</span><button onClick={() => setMuted(!muted)} aria-label={muted ? "Enable video sound" : "Mute video sound"}>{muted ? "Sound off" : "Sound on"}</button></div></div>
      <dialog ref={dialog} className="film-dialog" aria-label="On the water film" onCancel={(event) => { event.preventDefault(); closeFilm(); }} onClick={(event) => {if(event.target === event.currentTarget) closeFilm();}}>
        <div className="film-shell"><button className="film-close" onClick={closeFilm}>Close film ×</button><video ref={film} src="/media/swankey-water-film.mp4?v=7" poster="/media/film-poster.jpg" controls playsInline preload="none" aria-label="On the water — boating film" /></div>
      </dialog>
    </section>
  );
}
