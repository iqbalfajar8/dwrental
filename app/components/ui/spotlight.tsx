"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";


type SpotlightProps = {
  className?: string;
  fill?: string;
  /** detik, buat nunggu preloader kelar */
  delay?: number;
  /** 0 = nonaktif, 1 = default, 2 = dua kali lebih besar gerakannya */
  intensity?: number;
};

export const Spotlight = ({
  className,
  fill = "white",
  delay = 0,
  intensity = 1,
}: SpotlightProps) => {
  const outer = useRef<HTMLDivElement>(null); // posisi + mouse
  const sway = useRef<HTMLDivElement>(null); // idle
  const svg = useRef<SVGSVGElement>(null); // entrance

  useEffect(() => {
    if (!outer.current || !sway.current || !svg.current) return;

    const end = { opacity: 1, xPercent: -50, yPercent: -40, scale: 1 };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(svg.current, end);
      return;
    }

    const ctx = gsap.context(() => {
      // 1) entrance
      gsap.fromTo(
        svg.current,
        { opacity: 0, xPercent: -72, yPercent: -62, scale: 0.5 },
        { ...end, duration: 2, delay, ease: "power2.out" }
      );

      // 2) idle sway, mulai setelah entrance selesai
      gsap.set(sway.current, { transformOrigin: "30% 0%" });
      gsap.to(sway.current, {
        rotation: 5 * intensity,
        x: 50 * intensity,
        duration: 6,
        delay: delay + 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 3) ngikutin kursor (desktop saja)
      if (intensity > 0 && window.matchMedia("(pointer: fine)").matches) {
        const moveX = gsap.quickTo(outer.current, "x", { duration: 1.4, ease: "power3.out" });
        const moveY = gsap.quickTo(outer.current, "y", { duration: 1.4, ease: "power3.out" });
        const rotate = gsap.quickTo(outer.current, "rotation", { duration: 1.8, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          moveX(nx * 90 * intensity);
          moveY(ny * 50 * intensity);
          rotate(nx * 4 * intensity);
        };

        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      }
    }, outer);

    return () => ctx.revert();
  }, [delay, intensity]);

  return (
    <div
      ref={outer}
      className={cn(
        "pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%]",
        className
      )}
    >
      <div ref={sway} className="h-full w-full">
        <svg
          ref={svg}
          className="h-full w-full opacity-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3787 2842"
          fill="none"
        >
          <g filter="url(#spotlight-blur)">
            <ellipse
              cx="1924.71"
              cy="273.501"
              rx="1924.71"
              ry="273.501"
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
              fill={fill}
              fillOpacity="0.21"
            />
          </g>
          <defs>
            <filter
              id="spotlight-blur"
              x="0.860352"
              y="0.838989"
              width="3785.16"
              height="2840.26"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};