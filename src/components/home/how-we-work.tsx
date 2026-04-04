"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: "Kid Dash", sub: "Kids", color: "#4df7c8", offset: 60 },
  { label: "5K", sub: "Open & Teens", color: "#fdca00", offset: 30 },
  { label: "10K", sub: "Open", color: "#ff4d4d", offset: -30 },
  { label: "21K", sub: "Half Marathon", color: "#fdca00", offset: -60 },
];

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useGSAP(
    (context) => {
      const q = context.selector;
      const elements = q && q(".elem");

      elements.forEach((element: HTMLElement, index: number) => {
        const progress = element.querySelector(".progress");
        const label = element.querySelector(".cat-label");
        const sub = element.querySelector(".cat-sub");

        const tl = gsap.timeline({
          delay: index * 0.50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            once: true, // animasi hanya jalan sekali
          },
        });

        tl.fromTo(
          progress,
          { strokeDashoffset: 565.48 },
          { strokeDashoffset: 0, duration: 1.2, ease: "power3.out" }
        );

        tl.fromTo(
          [label, sub],
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
          "<0.3"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="min-h-screen lg:h-screen flex justify-center items-center relative bg-blue-900 overflow-hidden py-16 lg:py-0"
      ref={sectionRef}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container text-white text-center px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-white font-bold leading-tight text-center pb-10 lg:pb-14 max-w-3xl mx-auto">
          BAYAN RUN CATEGORY
        </h2>

        {/* Desktop */}
        <div className="hidden lg:flex justify-center items-center gap-0">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="elem relative h-60 w-60 rounded-full flex justify-center items-center"
              style={{ transform: `translateX(${cat.offset}px)` }}
            >
              <div
                className="absolute inset-0 rounded-full opacity-20 blur-md"
                style={{ background: cat.color }}
              />
              <svg className="absolute w-full h-full scale-[130%] rotate-[-90deg]">
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke={`${cat.color}33`}
                  strokeWidth="2"
                  fill="transparent"
                />
                <circle
                  className="progress"
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke={cat.color}
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray="565.48"
                  strokeDashoffset="565.48"
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="absolute w-[70%] h-[70%] rounded-full border opacity-20"
                style={{ borderColor: cat.color }}
              />
              <div className="z-10 flex flex-col items-center gap-1">
                <span
                  className="cat-label text-3xl font-black tracking-tight opacity-0"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
                <span className="cat-sub text-[10px] font-medium tracking-widest uppercase text-white/60 opacity-0">
                  {cat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden grid grid-cols-2 gap-6 max-w-sm sm:max-w-md mx-auto mt-4">
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2">
              <div
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full relative flex items-center justify-center"
                style={{ border: `2px solid ${cat.color}` }}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-10 blur-md"
                  style={{ background: cat.color }}
                />
                <div
                  className="absolute w-[70%] h-[70%] rounded-full border opacity-30"
                  style={{ borderColor: cat.color }}
                />
                <div className="z-10 flex flex-col items-center">
                  <span
                    className="text-2xl sm:text-3xl font-black"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/50 text-center">
                {cat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}