"use client";

import { useEffect, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Workflow } from "lucide-react";
import { Button } from "../ui/button";
import { useReducer } from "react";

// ─── Register GSAP plugin (once, at module level) ───────────────────────────
gsap.registerPlugin();

const slideImages = [
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765529/20251012070224_-_BOM_8032_qy3ajc.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765525/20251012064855_-_BOM_0690_f1v4kw.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765525/AR__4961_njqhws.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765516/20251012060936_-_BOM_7023_uzwd7f.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765516/DJI_20251012054325_0006_D_p3yx0k.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765513/20251012061749_-_BOM_0335_tssmcb.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765497/DJI_20251012090310_0032_D_nm8eit.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765514/20251012061107_-_BOM_7070_nah0u9.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765537/20251012065145_-_BOM_0769_xlklog.jpg",
];

// ─── State via useReducer (hindari banyak useState re-render) ────────────────
type State = { current: number; isAnimating: boolean };
type Action =
  | { type: "START_ANIM"; next: number }
  | { type: "END_ANIM" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_ANIM":
      return { current: action.next, isAnimating: true };
    case "END_ANIM":
      return { ...state, isAnimating: false };
    default:
      return state;
  }
}

// ─── Helper ──────────────────────────────────────────────────────────────────
const getOrder = (i: number, cur: number, total: number) =>
  (i - cur + total) % total;

const getStackProps = (order: number, total: number) => ({
  x: 0,
  y: order * 14,
  scale: 1 - order * 0.04,
  zIndex: total - order,
  opacity: order > 4 ? 0 : 1 - order * 0.15,
  rotateZ:
    order === 0 ? 0 : order % 2 === 0 ? order * 0.8 : -order * 0.8,
  rotate: 0,
});

// ─── Component ───────────────────────────────────────────────────────────────
export default function StackedSlider() {
  const [{ current, isAnimating }, dispatch] = useReducer(reducer, {
    current: 0,
    isAnimating: false,
  });

  const total = slideImages.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── GSAP init: pakai useGSAP agar ada automatic context cleanup ─────────────
  useGSAP(
    () => {
      slidesRef.current.forEach((card, i) => {
        if (!card) return;
        const order = getOrder(i, current, total);
        gsap.set(card, getStackProps(order, total));
      });
    },
    { scope: containerRef, dependencies: [] } // hanya run sekali saat mount
  );

  // ── Cleanup semua tween + timer saat unmount ────────────────────────────────
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      // Kill semua tween aktif pada slide elements
      gsap.killTweensOf(slidesRef.current.filter(Boolean));
    };
  }, []);

  // ── Animate ke state baru ────────────────────────────────────────────────────
  const animateToState = useCallback(
    (nextCurrent: number) => {
      if (isAnimating) return;
      dispatch({ type: "START_ANIM", next: nextCurrent });

      // Kill tween sebelumnya sebelum mulai yang baru (hindari tween bertumpuk)
      gsap.killTweensOf(slidesRef.current.filter(Boolean));

      slidesRef.current.forEach((card, i) => {
        if (!card) return;
        const order = getOrder(i, nextCurrent, total);
        const isOutgoing = getOrder(i, current, total) === 0;

        if (isOutgoing) {
          gsap.to(card, {
            x: 600,
            y: -100,
            rotate: 20,
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
              // Reset posisi outgoing card ke belakang stack
              gsap.set(card, getStackProps(order, total));
            },
          });
        } else {
          gsap.to(card, {
            ...getStackProps(order, total),
            duration: 0.5,
            ease: "power3.out",
            delay: 0.1,
          });
        }
      });

      // Simpan timer reference agar bisa di-clear
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        dispatch({ type: "END_ANIM" });
        timerRef.current = null;
      }, 600);
    },
    [current, isAnimating, total]
  );

  const movePrev = useCallback(() => {
    if (isAnimating) return;
    const prevCurrent = (current - 1 + total) % total;

    dispatch({ type: "START_ANIM", next: prevCurrent });
    gsap.killTweensOf(slidesRef.current.filter(Boolean));

    slidesRef.current.forEach((card, i) => {
      if (!card) return;
      const order = getOrder(i, prevCurrent, total);
      const isIncoming = getOrder(i, current, total) === total - 1;

      if (isIncoming) {
        gsap.fromTo(
          card,
          { x: -600, y: -100, rotate: -20, opacity: 0, scale: 0.8 },
          {
            ...getStackProps(0, total),
            duration: 0.5,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(card, {
          ...getStackProps(order, total),
          duration: 0.5,
          ease: "power3.out",
          delay: 0.05,
        });
      }
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatch({ type: "END_ANIM" });
      timerRef.current = null;
    }, 600);
  }, [current, isAnimating, total]);

  const moveNext = useCallback(() => {
    animateToState((current + 1) % total);
  }, [animateToState, current, total]);

  return (
    <section className="py-16 lg:py-24 bg-[#f5f2ec] overflow-hidden relative">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-[11px] uppercase font-semibold tracking-[0.5em] text-blue-900/40 mb-3">
          Bayan Run 2025
        </p>
        <p className="text-4xl lg:text-6xl font-bold flex flex-wrap justify-center gap-3">
          <span className="text-blue-900">OUR</span>
          <span className="text-red-500">GALLERY</span>
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-amber-400" />
        <p className="text-blue-900/40 mt-4 text-sm font-semibold tracking-widest uppercase">
          Moment terbaik Bayan Run
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/gallery">
            <Button className="group flex items-center gap-2 px-6 h-11 border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white shadow-sm transition-all duration-300">
              <Workflow className="w-4 h-4" />
              <span>Galeri</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div className="relative max-w-2xl mx-auto px-4">
        {/* Stack container — dijadikan scope untuk useGSAP */}
        <div ref={containerRef} className="relative h-[55svh] w-full">
          {slideImages.map((src, i) => {
            const order = getOrder(i, current, total);
            // Hanya render gambar yang visible (order 0-4), sisanya skip
            // tapi tetap render div-nya agar GSAP punya DOM node
            const isVisible = order <= 4;

            return (
              <div
                key={i}
                ref={(el) => { slidesRef.current[i] = el; }}
                className="slide absolute inset-0 rounded-2xl overflow-hidden shadow-xl cursor-pointer will-change-transform border border-black/5"
                onClick={moveNext}
                role="button"
                aria-label={`Slide ${i + 1} dari ${total}. Klik untuk slide berikutnya.`}
                tabIndex={order === 0 ? 0 : -1}
                onKeyDown={(e) => e.key === "Enter" && moveNext()}
              >
                {isVisible && (
                  <Image
                    src={src}
                    alt={`Foto Bayan Run 2025 nomor ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                    // Cloudinary sudah handle optimasi (q_auto/f_auto),
                    // matikan Next.js image optimization agar tidak double-process
                    unoptimized
                    // Hanya eager load slide aktif & 1 berikutnya
                    priority={order === 0 || order === 1}
                    loading={order <= 1 ? "eager" : "lazy"}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {order === 0 && (
                  <div className="absolute bottom-4 left-4 text-white/80 text-xs tracking-widest uppercase font-mono">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={movePrev}
            disabled={isAnimating}
            aria-label="Slide sebelumnya"
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2 items-center" role="tablist" aria-label="Navigasi slide">
            {slideImages.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Pergi ke slide ${i + 1}`}
                onClick={() => !isAnimating && animateToState(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-blue-900"
                    : "w-2 h-2 bg-blue-900/20 hover:bg-blue-900/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={moveNext}
            disabled={isAnimating}
            aria-label="Slide berikutnya"
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center font-semibold text-blue-900/30 text-xs mt-4 tracking-wider">
          Klik gambar untuk slide berikutnya
        </p>
      </div>
    </section>
  );
}