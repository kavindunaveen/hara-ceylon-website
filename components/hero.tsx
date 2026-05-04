"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const HERO_VIDEOS = ["/img/video2.mp4", "/img/video1.mp4"];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_VIDEOS.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <header
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden bg-black"
    >
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/hero.png"
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1 border border-brand-gold/50 rounded-full bg-white/5 backdrop-blur">
          <span className="text-brand-gold font-serif italic text-sm md:text-lg">
            Discover the Pure Essence of Sri Lanka
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-xl">
          Pure Ceylon
          <br />
          <span className="text-brand-gold">Tea &amp; Coffee</span>
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
          <Link
            href="/shop"
            className="px-8 py-4 bg-brand-green text-white font-bold rounded-full shadow-2xl transition-transform hover:scale-105 hover:bg-green-800"
          >
            Shop Collection
          </Link>
          <Link
            href="/#about"
            className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-brand-dark transition-all"
          >
            Our Story
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 flex space-x-3 z-20">
        {HERO_VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === i ? "bg-brand-gold w-8" : "bg-white/50 w-2 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </header>
  );
}
