"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Instagram, Globe, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

const VIDEO_URL =
  "https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto/f_auto/v1769479898/bayanrun-video_ifpuhz.mp4";
const POSTER_URL =
  "https://res.cloudinary.com/dwyi4d3rq/image/upload/v1765165219/20251012060936_-_BOM_7023_t5b4rs.jpg";

export default function AboutBanner() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // ✅ GSAP animation — tidak berubah
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, y: 200, visibility: "hidden" },
        { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power2.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    },
    { scope: aboutRef }
  );

  // ✅ Ticker animation dengan cleanup yang benar
  useEffect(() => {
    const topText = topTextRef.current;
    if (!topText) return;

    const tween = gsap.fromTo(topText,
      { x: "-50%" },
      { x: "0%", duration: 20, ease: "none", repeat: -1 }
    );

    return () => {
      tween.kill(); // ✅ Kill instance spesifik, bukan killTweensOf
    };
  }, []);

  // ✅ Intersection Observer — video hanya load saat terlihat di layar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User melihat section ini — mulai load video
            video.src = VIDEO_URL;
            video.load();
            video.play().catch(() => {
              // Autoplay diblokir browser — tetap tampilkan poster
            });
            observer.disconnect(); // Tidak perlu observe lagi
          }
        });
      },
      { threshold: 0.1 } // Trigger saat 10% section terlihat
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // ✅ Pause video saat tidak terlihat — hemat memory & CPU
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          } else if (entry.isIntersecting && video.paused && videoLoaded) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0 }
    );

    visibilityObserver.observe(video);
    return () => visibilityObserver.disconnect();
  }, [videoLoaded]);

  return (
    <section
      ref={aboutRef}
      className="relative flex flex-col text-white overflow-hidden bg-black"
    >
      {/* ── Hero ── */}
      <div className="relative flex items-center justify-center min-h-screen">

        {/* ✅ Poster image tampil duluan sebelum video siap */}
        {!videoLoaded && (
          <Image
            src={POSTER_URL}
            alt="Bayan Run 2026"
            fill
            priority          // ✅ LCP image — load pertama kali
            className="object-cover z-0"
            sizes="100vw"
          />
        )}

        {/* ✅ Video tanpa preload="auto", src diisi oleh IntersectionObserver */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          poster={POSTER_URL}
          preload="none"           // ✅ Tidak preload — tunggu IntersectionObserver
          loop
          muted
          playsInline
          disableRemotePlayback
          onCanPlay={() => setVideoLoaded(true)}  // ✅ Fade in saat siap
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div ref={contentRef} className="relative z-20 text-center px-6 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tight">
            BAYAN RUN 2026
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-wide">
                10 - 11 Oktober 2026
              </span>
            </div>
            <span className="hidden sm:block text-white/40">|</span>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-wide">
                BSCC Dome & Lapangan Merdeka 3, Balikpapan
              </span>
            </div>
          </div>

          {/* Registration Banner */}
          <div className="relative flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-950 rounded-2xl px-8 py-4 mb-10 shadow-[0_0_32px_rgba(250,204,21,0.45)] overflow-hidden">
            <div className="absolute top-0 left-[-10%] w-1/2 h-full bg-white/15 -skew-x-12 pointer-events-none" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] opacity-70">
                Pendaftaran Dibuka
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-wide uppercase">
                13 Juni 2026
              </span>
            </div>
            <span className="text-2xl font-black ml-1">→</span>
          </div>

          {/* Socmed */}
          <div className="flex items-center justify-center gap-6 flex-wrap mb-10">
            <a href="https://instagram.com/bayan_open" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
              <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-base sm:text-lg font-bold">bayan_open</span>
            </a>
            <a href="https://www.bayanrun.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
              <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-base sm:text-lg font-bold">www.bayanrun.com</span>
            </a>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-black tracking-widest text-white/70 uppercase">
            The Biggest Running Event in{" "}
            <span className="text-yellow-400 font-black">Kalimantan</span>
          </p>
        </div>
      </div>

      {/* ── Ticker ── */}
      <div className="relative bg-gray-200 py-6 md:py-8 overflow-hidden">
        <div ref={topTextRef} className="flex whitespace-nowrap" style={{ width: "200%" }}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <span className="text-3xl md:text-5xl font-black text-blue-900 tracking-tight uppercase mx-8">
                THE NEXT LEVEL
              </span>
              <span className="text-3xl md:text-5xl font-black text-blue-900 mx-4">•</span>
              <span className="text-3xl md:text-5xl font-black text-red-600 tracking-tight uppercase mx-8">
                KEEP MOVING KEEP STRONG
              </span>
              <span className="text-3xl md:text-5xl font-black text-red-900 mx-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}