/* eslint-disable @next/next/no-img-element */
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useGSAP(
    (context) => {
      if (window.innerWidth >= 1014) {
        const q = context.selector;
        const elements = q && q(".elem");

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 2,
        });

        elements.forEach((element: HTMLElement, index: number) => {
          const progress = element.querySelector(".progress");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 10%",
              end: "+=800",
              scrub: 2,
            },
          });

          tl.fromTo(
            progress,
            { strokeDashoffset: 565.48 },
            { strokeDashoffset: 0, duration: 1 }
          );

          tl.fromTo(
            element,
            {
              y: 0,
              x: index === 0 ? 30 : -30,
              duration: 1,
            },
            {
              y: 150,
              x: index === 0 ? 150 : -150,
              duration: 1,
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="min-h-screen lg:h-screen flex justify-center items-center relative bg-blue-900 overflow-hidden py-16 sm:py-20 md:py-24 lg:py-0"
      ref={sectionRef}
    >
      <div className="container text-white text-center px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-red-600 font-bold leading-tight text-center pb-8 sm:pb-10 md:pb-12 max-w-2xl mx-auto -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-32">
          BAYAN RUN CATEGORY
        </h2>

        <div className="hidden lg:flex justify-center">
          <div className="relative h-64 w-64 translate-x-[30px] rounded-full flex justify-center items-center elem">
            <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="transparent"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                className="progress"
                cx="50%"
                cy="50%"
                r="90"
                stroke="#fdca00ff"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="565.48"
                strokeDashoffset="565.48"
              />
            </svg>
            <span
              className="z-10 flex flex-col gap-2 justify-center items-center"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <span className="text-xl font-bold leading-tight text-center max-w-2xl mx-auto">5K</span>
            </span>
          </div>

          <div className="relative h-64 w-64 rounded-full flex justify-center items-center">
            <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="#fdca00ff"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                className="progress"
                cx="50%"
                cy="50%"
                r="90"
                stroke="#1b1b1b"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="565.48"
                strokeDashoffset="565.48"
              />
            </svg>
            <span
              className="z-10 flex flex-col gap-2 justify-center items-center"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <span className="text-xl font-bold leading-tight text-center max-w-2xl mx-auto">10K</span>
            </span>
          </div>

          <div className="relative h-64 w-64 -translate-x-[30px] rounded-full flex justify-center items-center elem">
            <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="transparent"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                className="progress"
                cx="50%"
                cy="50%"
                r="90"
                stroke="#fdca00ff"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="565.48"
                strokeDashoffset="565.48"
              />
            </svg>
            <span
              className="z-10 flex flex-col gap-2 justify-center items-center"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <span className="text-xl font-bold leading-tight text-center max-w-2xl mx-auto">21K</span>
            </span>
          </div>
        </div>

        {/* Mobile & Tab - Improved Responsive */}
        <div className="lg:hidden relative w-full flex justify-center items-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px] -mt-8 sm:-mt-12">
          {/* First Circle - 5K */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-yellow-400 relative bg-blue-900/50 backdrop-blur-sm">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-center">5K</span>
              </div>
            </div>
          </div>

          {/* Second Circle - 10K */}
          <div className="absolute top-20 sm:top-24 md:top-32 left-1/4 sm:left-1/3 -translate-x-1/2">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-yellow-400 relative bg-blue-900/50 backdrop-blur-sm">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-center">10K</span>
              </div>
            </div>
          </div>

          {/* Third Circle - 21K */}
          <div className="absolute top-20 sm:top-24 md:top-32 right-1/4 sm:right-1/3 translate-x-1/2">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-yellow-400 relative bg-blue-900/50 backdrop-blur-sm">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-center">21K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}