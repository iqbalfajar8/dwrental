"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Catalog", link: "/catalog" },
  { name: "Testimoni", link: "/#testimonials" },
  { name: "Contact", link: "/contact" },
];

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <Navbar delay={6}>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <NavbarButton
        as="a"
        variant="primary"
        href={waLink("Halo DWRENTAL, saya ingin bertanya soal sewa perlengkapan event.")}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"

        >
        <WhatsAppIcon /> WhatsApp
        </NavbarButton>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={open}>
          {navItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
              className="m-item text-lg font-medium text-neutral-200"
            >
              {item.name}
            </Link>
          ))}
            <NavbarButton
            as="a"
            variant="primary"
            href={waLink("Halo DWRENTAL, saya ingin bertanya soal sewa perlengkapan event.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
            >
            <WhatsAppIcon />
            WhatsApp
            </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}