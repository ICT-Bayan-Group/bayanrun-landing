"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { points } from "@/lib/constant";

// Register sekali di module level — konsisten dengan komponen lain
gsap.registerPlugin(ScrollTrigger);

const KICKERS = ["WHO WE ARE", "WHAT DRIVES US", "WHERE WE'RE HEADED"];
const ACCENT_CHARS = ["A", "M", "V"];

const SIDE_PANEL_WORDS = [
  ["Community", "Unity", "Kalimantan", "2026", "Pride", "Running"],
  ["Push Limits", "Train Hard", "5K", "10K", "21K", "Finish Line"],
  ["Future", "Growth", "Record", "Champion", "Together", "Legacy"],
];

const SIDE_PANEL_QUOTES = [
  '"The biggest running celebration Kalimantan has ever seen."',
  '"Every stride brings our community closer together."',
  '"Building a legacy one finish line at a time."',
];

const SIDE_PANEL_LABELS = ["About Us", "Our Mission", "Our Vision"];

export default function AboutMissionVision() {
  const rootRef = useRef<HTMLElement>(null);

  // ── Ganti useLayoutEffect + gsap.context manual → useGSAP ─────────────────
  // useGSAP:
  //   ✅ Aman di SSR (tidak jalan di server)
  //   ✅ Auto revert context saat unmount (cleanup ScrollTrigger otomatis)
  //   ✅ Konsisten dengan komponen GSAP lainnya di project
  useGSAP(
    () => {
      // ── Section reveals ─────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".amv-section").forEach((section, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            // "play none none reverse" menyebabkan ScrollTrigger tetap hidup
            // setelah animasi selesai untuk handle reverse. Jika tidak butuh
            // reverse, ganti ke "play none none none" + once: true lebih hemat.
            toggleActions: "play none none reverse",
          },
        });

        tl.from(section.querySelector(".amv-accent-char"), {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
        });

        tl.from(
          section.querySelectorAll(".amv-kicker, .amv-heading, .amv-body, .amv-divider"),
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          },
          "<0.2"
        );

        tl.from(
          section.querySelector(".amv-side-panel"),
          {
            scaleY: 0,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            transformOrigin: "top center",
          },
          "<0.3"
        );
      });

      // ── Diagonal stripe parallax ────────────────────────────────────────
      gsap.to(".amv-stripe", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // useGSAP dengan scope otomatis revert semua tween & ScrollTrigger
      // saat komponen unmount — tidak perlu return ctx.revert() manual
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="about-mission-vision"
      className="relative w-full overflow-hidden bg-white text-blue-900"
    >
      <div className="mx-auto max-w-6xl px-6 pb-24 space-y-0">
        {points.map((item, idx) => (
          <article
            key={item.id}
            id={item.id}
            className={`amv-section relative border-b border-blue-900/15 py-16 md:py-20 grid grid-cols-12 gap-6 items-start
              ${idx % 2 === 1 ? "md:direction-rtl" : ""}`}
          >
            {/* Giant accent char — purely decorative */}
            <div
              className={`amv-accent-char hidden md:block absolute select-none pointer-events-none
                text-[20rem] font-black leading-none opacity-[0.035] text-blue-900 top-0
                ${idx % 2 === 0 ? "-right-8" : "-left-8"}`}
              aria-hidden
            >
              {ACCENT_CHARS[idx]}
            </div>

            {/* Index number */}
            <div className="col-span-12 md:col-span-1 flex md:flex-col items-center md:items-start gap-3 md:gap-0">
              <span className="text-[10px] font-mono text-blue-900/30 tracking-widest md:writing-mode-vertical">
                0{idx + 1}
              </span>
              <div className="h-px md:h-20 w-10 md:w-px bg-red-500/60 md:mt-3" />
            </div>

            {/* Text content */}
            <div
              className={`col-span-12 md:col-span-7 relative z-10 ${
                idx % 2 === 1 ? "md:col-start-2" : ""
              }`}
            >
              <span className="amv-kicker mb-4 inline-flex items-center gap-2 text-[10px] tracking-[0.4em] text-red-500 uppercase">
                <span className="inline-block w-4 h-px bg-red-500" aria-hidden />
                {KICKERS[idx]}
              </span>

              <h2 className="amv-heading text-5xl md:text-7xl font-black leading-[0.9] tracking-tight text-blue-900 mb-6">
                {item.heading}
              </h2>

              <div className="amv-divider h-[2px] w-16 bg-yellow-400 mb-6" />

              <p className="amv-body text-base font-semibold md:text-lg leading-relaxed text-blue-900/70 max-w-lg font-light">
                {item.body}
              </p>
            </div>

            {/* Side panel */}
            <div
              className={`amv-side-panel hidden md:block col-span-4 ${
                idx % 2 === 1 ? "md:col-start-9" : ""
              }`}
            >
              <div className="relative h-48 rounded-2xl overflow-hidden border border-blue-900/10 bg-orange-500/[0.03]">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400" aria-hidden />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500" aria-hidden />

                <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-2 p-4">
                  {SIDE_PANEL_WORDS[idx].map((word) => (
                    <span
                      key={word}
                      className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-blue-900/15 text-blue-900/50"
                    >
                      {word}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-3 right-3 bg-blue-900 text-yellow-400 text-[9px] tracking-widest uppercase px-3 py-1 rounded-full">
                  {SIDE_PANEL_LABELS[idx]}
                </div>
              </div>

              <blockquote className="mt-4 pl-4 border-l-2 border-yellow-400">
                <p className="text-xs leading-relaxed text-blue-900/50 italic">
                  {SIDE_PANEL_QUOTES[idx]}
                </p>
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}