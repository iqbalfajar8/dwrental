"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const PILL_SHADOW =
  "0 0 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), 0 16px 68px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset";

type WithVisible = { visible?: boolean };

/* ───────────── Wrapper ───────────── */

export const Navbar = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** detik, buat nunggu preloader kelar */
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 100));

  // GSAP: entrance dari atas
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        yPercent: -120,
        opacity: 0,
        duration: 1,
        delay,
        ease: "power4.out",
      });
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn("fixed inset-x-0 top-4 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<WithVisible>, {
              visible,
            })
          : child
      )}
    </div>
  );
};

/* ───────────── Desktop ───────────── */

export const NavBody = ({
  children,
  className,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
} & WithVisible) => (
  <motion.div
    animate={{
      width: visible ? "55%" : "100%",
      y: visible ? 12 : 0,
      backdropFilter: visible ? "blur(10px)" : "blur(0px)",
      boxShadow: visible ? PILL_SHADOW : "0 0 0 rgba(0,0,0,0)",
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    style={{ minWidth: 720 }}
    className={cn(
      "relative z-[60] mx-auto hidden max-w-7xl items-center justify-between rounded-full bg-transparent px-4 py-2 lg:flex",
      visible && "bg-neutral-900/70",
      className
    )}
  >
    {children}
  </motion.div>
);

export const NavItems = ({
  items,
  className,
  onItemClick,
}: {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-row items-center justify-center gap-1 text-sm font-medium lg:flex",
        // biar area kosong nggak nutupin logo & tombol
        "pointer-events-none",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={item.link}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="pointer-events-auto relative px-4 py-2 text-neutral-300 transition-colors hover:text-white"
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hovered"
              className="absolute inset-0 rounded-full bg-white/10"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

/* ───────────── Mobile ───────────── */

export const MobileNav = ({
  children,
  className,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
} & WithVisible) => (
  <motion.div
    animate={{
      width: visible ? "90%" : "100%",
      y: visible ? 8 : 0,
      paddingInline: visible ? 12 : 16,
      borderRadius: visible ? 16 : 0,
      backdropFilter: visible ? "blur(10px)" : "blur(0px)",
      boxShadow: visible ? PILL_SHADOW : "0 0 0 rgba(0,0,0,0)",
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent py-2 lg:hidden",
      visible && "bg-neutral-900/70",
      className
    )}
  >
    {children}
  </motion.div>
);

export const MobileNavHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full items-center justify-between", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // GSAP: stagger anak-anak yang punya class .m-item saat menu mount
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".m-item",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-4 rounded-2xl border border-white/10 bg-neutral-900 px-6 py-8",
            className
          )}
          style={{ boxShadow: PILL_SHADOW }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Tutup menu" : "Buka menu"}
    className="text-white"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {isOpen ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  </button>
);

/* ───────────── Logo & Button ───────────── */

export const NavbarLogo = () => (
  <Link
    href="/"
    className="relative z-20 flex items-center px-2 py-1 text-lg font-bold tracking-tight text-white"
  >
    DWRENTAL
  </Link>
);

export const NavbarButton = ({
  href,
  as: Tag = Link,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "gradient";
} & Record<string, unknown>) => {
  const base =
    "relative inline-block cursor-pointer rounded-md px-4 py-2 text-center text-sm font-bold transition duration-200 hover:-translate-y-0.5";

  const variants = {
    primary: "bg-white text-black",
    secondary: "bg-transparent text-white",
    outline: "border border-white/20 bg-transparent text-white hover:border-white/50",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_2px_0_0_rgba(255,255,255,0.3)_inset]",
  };

  // Link wajib punya href; elemen lain (misal "button") nggak perlu
  const hrefProps = Tag === Link ? { href: href ?? "#" } : href ? { href } : {};

  return (
    <Tag {...hrefProps} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Tag>
  );
};