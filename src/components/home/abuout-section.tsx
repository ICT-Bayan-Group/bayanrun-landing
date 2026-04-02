"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.innerWidth >= 1024) {
        const elements = sectionRef.current?.querySelectorAll(".animate-group");

        gsap.from(elements as NodeListOf<HTMLElement>, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          filter: "blur(6px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=800",
            scrub: 2,
            pin: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen -mt-28 lg:mt-0 flex justify-center items-center text-white font-extralight px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-0 bg-blue-900"
    >
      <div className="text-center max-w-3xl w-full -mt-12 sm:-mt-8 md:-mt-4 lg:mt-0">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed sm:leading-relaxed md:leading-snug lg:leading-snug mx-auto flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 text-center">
          <span className="animate-group">BAYAN RUN 2026,</span>
          <span className="animate-group">THE</span>
          <span className="animate-group">BIGGEST</span>
          <span className="animate-group">RUNNING</span>
          <span className="animate-group">EVENT</span>
          <span className="animate-group">IN</span>
          <span className="animate-group">KALIMANTAN</span>
        </p>
        {/*
        <div
          className="animate-group mt-8 sm:mt-10 md:mt-12 flex justify-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <Link href="/about">
            <Button className="group w-32 sm:w-36 md:w-40 lg:w-40 h-12 sm:h-13 md:h-14 lg:h-14 flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 text-base sm:text-lg md:text-xl border-2 border-[#ffffff] hover:bg-white/20 bg-white/10 backdrop-blur-sm transition-all">
              <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full" />
              <span>About</span>
            </Button>
          </Link>
        </div>*/}
      </div>
    </section>
  );
}