"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const LINES = ["YOUR", "TRUSTED", "EVENT", "EQUIPMENT", "SOLUTIONS"];

function Chars({ text, cls }: { text: string; cls: string }) {
  return (
    <span className="block overflow-hidden">
      {text.split("").map((c, i) => (
        <span key={i} className={`${cls} inline-block will-change-transform`}>
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Preloader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

     


  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // posisi awal: semua huruf di bawah mask
      gsap.set(".char-a, .char-b", { yPercent: 110 });
      gsap.set(".stage", { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());

        },
      });

      tl
        // 1) DWRENTAL in
        .to(".char-a", { yPercent: 0, duration: 0.9, stagger: 0.06 })
        // DWRENTAL out
        .to(
          ".char-a",
          { yPercent: -110, duration: 0.6, stagger: 0.04, ease: "power3.in" },
          "+=0.5"
        )
        // 2) tagline in (per baris, tiap huruf stagger)
        .to(
          ".char-b",
          { yPercent: 0, duration: 0.8, stagger: 0.02 },
          "+=0.1"
        )
        // tagline out
        .to(
          ".char-b",
          { yPercent: 0, duration: 0.5, stagger: 0.012, ease: "power3.in" },
          "+=0.8"
        );
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          ref={root}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Stage 1 */}
          <div className="stage invisible absolute text-[16vw] font-bold leading-none -tracking-wider md:text-[12vw]">
            <Chars text="DWRENTAL" cls="char-a" />
          </div>

          {/* Stage 2 */}
          <div className="stage invisible absolute text-center text-[10vw] font-semibold uppercase leading-[0.8] -tracking-wider md:text-[6vw]">
            {LINES.map((line) => (
              <Chars key={line} text={line} cls="char-b" />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}