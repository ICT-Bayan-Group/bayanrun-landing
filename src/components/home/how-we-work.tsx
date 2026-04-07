"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    label: "Kid Dash",
    sub: "Kids",
    accent: "#09a30e",
    distance: "±1 KM",
    tagline: "Mulai dari yang kecil!",
    desc: "Cocok untuk anak-anak yang ingin merasakan serunya berlari. Lintasan aman, suasana meriah, dan penuh semangat untuk si kecil.",
  },
  {
    label: "5K",
    sub: "Open & Teens",
    accent: "#3b82f6",
    distance: "5 KM",
    tagline: "Baru mulai berlari?",
    desc: "Cocok bagi kamu yang baru memulai perjalanan lari. Jarak yang ramah untuk pemula, tapi tetap menantang dan menyenangkan.",
  },
  {
    label: "10K",
    sub: "Open",
    accent: "#ef4444",
    distance: "10 KM",
    tagline: "Siap naik level?",
    desc: "Cocok bagi kamu yang sudah rutin berlari dan ingin menguji stamina lebih jauh. Rasakan perbedaan setiap langkahmu.",
  },
  {
    label: "21K",
    sub: "Half Marathon",
    accent: "#8b5cf6",
    distance: "21 KM",
    tagline: "Untuk jiwa pelari sejati.",
    desc: "Cocok bagi kamu yang siap menantang batas diri. Half marathon penuh perjuangan, kebanggaan, dan pencapaian terbesar.",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useGSAP(
    (context) => {
      const q = context.selector;
      const elements = q && q(".elem");

      elements.forEach((element: HTMLElement, index: number) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="min-h-screen flex justify-center items-center relative bg-amber-500 overflow-hidden py-20"
      ref={sectionRef}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container text-white text-center px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-white font-bold leading-tight text-center pb-4 max-w-3xl mx-auto">
          OUR CATEGORY
        </h2>
        <p className="text-white/70 text-base sm:text-lg mb-12 max-w-xl mx-auto font --">
          Pilih kategori yang paling cocok untukmu dan mulai perjalanan larimu di Bayan Run 2026.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={cat.label}
              className="elem opacity-0 group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top accent bar */}
              <div
                className="h-1.5 w-full flex-shrink-0"
                style={{ background: cat.accent }}
              />

              <div className="flex flex-col flex-1 p-6 text-left">
                {/* Index + distance */}
          

                {/* Label */}
                <span
                  className="text-5xl font-black text-center tracking-tight leading-none mb-1"
                  style={{ color: cat.accent }}
                >
                  {cat.label}
                </span>

                {/* Sub */}
                <span className="text-[15px] font-semibold text-center tracking-[0.3em] uppercase text-gray-400 mb-5">
                  {cat.sub}
                </span>

                {/* Divider */}
                <div
                  className="h-px w-full mb-5"
                  style={{ background: cat.accent }}
                />

                {/* Tagline */}
                <p className="text-sm font-bold text-gray-800 mb-5">
                  {cat.tagline}
                </p>

                {/* Desc */}
                <p className="text-sm leading-relaxed text-gray-500 flex-1">
                  {cat.desc}
                </p>

                {/* Bottom CTA hint 
                <div
                  className="mt-6 flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: cat.accent }}
                >
                  <span>Daftar Sekarang</span>
                  <span className="text-base leading-none">→</span>
                </div>*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}