"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { MoveDown, MoveUp, Workflow,} from "lucide-react";
import { Button } from "../ui/button";

// Array gambar dari folder images
const slideImages = [
 "https://drive.google.com/uc?export=view&id=19ldCPknuViZSShI7f4CKGa7BM_WRbIBQ",
  "https://drive.google.com/uc?export=view&id=1j5wRlbFmqCq3LsmlNG_5XTHixjy9w2nt",
  "https://drive.google.com/uc?export=view&id=1qOuGL3lgLX7iiwnd0E4BjswkoNMTg_kF",
  "https://drive.google.com/uc?export=view&id=1v8yW_xikFFrScUBSdmJGuQDr5ldt8dnj",
  "https://drive.google.com/uc?export=view&id=1GW2tV1M2vpRGKghP-kn-uy4cHvKXBAlQ",
  "https://drive.google.com/uc?export=view&id=1ERCnjuGRVGwIIKsKeAw6K56D-hmEWdyD",
  "https://drive.google.com/uc?export=view&id=17sW74BoIr3zwRl9cXxrL-rTdy0pdUR5z",
  "https://drive.google.com/uc?export=view&id=1J2dCml3DONs5lisQW07ZWeDXcIHYE9mT",
  "https://drive.google.com/uc?export=view&id=1v8yW_xikFFrScUBSdmJGuQDr5ldt8dnj",
];

export default function StackedSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const slides = slideImages;

  // move to next (top card -> bottom)
  const moveNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // move to previous (bottom card -> top)
  const movePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // animate cards whenever current changes
  useEffect(() => {
    const cards = gsap.utils.toArray(".slide") as HTMLDivElement[];
    cards.forEach((card, i) => {
      const order = (i - current + slides.length) % slides.length;
      gsap.to(card, {
        y: -order * 20,
        scale: 1 - order * 0.02,
        zIndex: slides.length - order,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [current, slides.length]);

  // initial stack
  useEffect(() => {
    const cards = gsap.utils.toArray(".slide") as HTMLDivElement[];
    cards.forEach((card, i) => {
      const order = (i - current + slides.length) % slides.length;
      gsap.set(card, {
        y: -order * 20,
        scale: 1 - order * 0.02,
        zIndex: slides.length - order,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section className="py-8 lg:py-20 bg-blue-900">
      <div className="container">
        <div className="pb-10 lg:max-w-6xl lg:px-40 mx-auto">
          <p className="lg:text-5xl text-xl leading-5 text-justify lg:leading-snug mx-auto flex flex-wrap justify-center gap-3 ">
            <span className="animate-group text-red-500">OUR</span>
            <span className="animate-group text-red-500">GALLERY</span>
          </p>

          <div className="animate-group mt-8 flex justify-center">
            <Link href="/gallery">
              <Button className="group w-40 h-12 flex items-center justify-center gap-3 text-lg border-2 border-[#FFFFFF] cursor-pointer bg-[#1d1d1d]/30">
                <Workflow className="w-6 h-6" />
                <span>View All</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative max-w-4xl h-[60svh] mx-auto mt-20">
          <div ref={containerRef} className="relative h-full w-full">
            {slides.map((imageSrc, i) => (
              <div
                key={i}
                className="slide absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-2xl"
              >
                <div className="relative block h-full cursor-pointer">
                  <div className="absolute bottom-0 w-full h-full opacity-70 bg-gradient-to-t from-black to-white/6"></div>
                  <Image
                    src={imageSrc}
                    alt={`slide-${i + 1}`}
                    width={1000}
                    height={700}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute z-20 translate-x-1/2 right-1/2 lg:right-[-60px] lg:top-1/2 -translate-y-1/2 flex lg:flex-col gap-2">
            <button
              onClick={movePrev}
              className="bg-white text-black px-3 py-2 lg:py-1 rounded shadow cursor-pointer"
            >
              <MoveUp />
              <span className="sr-only">Previous</span>
            </button>
            <button
              onClick={moveNext}
              className="bg-white text-black px-3 py-2 lg:py-1 rounded shadow cursor-pointer"
            >
              <MoveDown />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}