

"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Head from "next/head";
import Image from "next/image";
import { Instagram, Globe } from "lucide-react";

export default function AboutBanner() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

 useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        aboutRef.current,
        {
          opacity: 0,
          y: 200,
          duration: 1,
          ease: "power2.out",
          visibility: "invisible",
        },
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          ease: "power2.out",
          duration: 1,
        }
      ).fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
    },
    { scope: aboutRef }
  );

  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="video"
         href="https://res.cloudinary.com/dgcedsrzf/video/upload/v1761553124/202510271554_vb6tyk.mp4"
          type="video/mp4"
        />
      </Head>
      <section
        ref={aboutRef}
        className="lg:min-h-screen flex items-center justify-center text-white relative z-10 bg-black invisible lg:-mt-24 py-32 lg:py-0"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
          src="https://res.cloudinary.com/dgcedsrzf/video/upload/v1761553124/202510271554_vb6tyk.mp4"
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          style={{ opacity: videoLoaded ? 1 : 0 }}
        />
        {!videoLoaded && (
          <Image
            alt="placeholder"
            width={1920}
            height={1080}
            src="https://res.cloudinary.com/dgcedsrzf/video/upload/v1761553124/202510271554_vb6tyk.mp4"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        <div className="absolute inset-0 bg-black/40 z-10" />
         {/* Content */}
        <div
          ref={contentRef}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
            BAYAN RUN 2026
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 tracking-wide">
            KEEP MOVING, KEEP STRONG
          </p>
          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <a
              href="https://instagram.com/bayan_open"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-400 transition-colors group"
            >
              <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">bayan_open</span>
            </a>
            <a
              href="https://www.bayanrun.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
            >
              <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">www.bayanrun.com</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
