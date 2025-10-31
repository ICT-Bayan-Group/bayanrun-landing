"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

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
      className="lg:min-h-screen -mt-28 lg:mt-0 flex justify-center items-center text-white font-extralight px-4 pb-16 lg:py-0"
    >
      <div className="text-center max-w-3xl">
        <p className="lg:text-5xl text-2xl lg:leading-snug mx-auto flex flex-wrap justify-center gap-3 text-center">
          <span className="animate-group">BAYAN RUN 2026,</span>
          <span className="animate-group">THE</span>
          <span className="animate-group">BIGGEST</span>
          <span className="animate-group">RUNNING</span>
          <span className="animate-group">EVENT</span>
          <span className="animate-group">IN</span>
          <span className="animate-group">KALIMANTAN</span>
        </p>

        <div
          className="animate-group mt-10 flex justify-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <Link href="/about">
            <Button className="group w-24 lg:w-28 h-11 lg:h-12 flex items-center gap-4 lg:gap-5 text-base lg:text-lg border-2 border-[#1b1b1b] bg-[#1d1d1d]/30">
              <User className="w-6 h-6 lg:w-7 lg:h-7 rounded-full group-hover:p-0" />
              <span>About</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
