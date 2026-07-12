"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";
import { CONTACT, MAIN_NAV, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

/**
 * Sticky header. A slim utility bar sits over the hero and collapses on scroll;
 * the nav is transparent over the (dark) hero and turns to a solid white bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-ink/10 bg-white/90 backdrop-blur-md shadow-[0_10px_40px_-24px_rgba(11,20,29,0.55)]"
            : "bg-transparent",
        )}
      >
        {/* Utility bar — visible over the hero only */}
        <div
          className={cn(
            "overflow-hidden border-b border-white/10 transition-all duration-300",
            solid ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
          )}
        >
          <div className="container-x flex h-11 items-center justify-between text-xs text-white/70">
            <span className="eyebrow text-bronze-300">{SITE.slogan}</span>
            <div className="hidden items-center gap-6 sm:flex">
              <a
                href={CONTACT.phonePrimary.href}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="size-3.5" />
                {CONTACT.phonePrimary.display}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Mail className="size-3.5" />
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div className="container-x flex h-24 items-center justify-between gap-4">
          <Logo onDark={!solid} />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {MAIN_NAV.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      solid ? "text-ink hover:text-bronze-600" : "text-white/85 hover:text-white",
                      isActive(item.href) && (solid ? "text-bronze-600" : "text-white"),
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-80 overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-2xl shadow-ink/15">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper-dim hover:text-bronze-600",
                            isActive(child.href) && "bg-paper-dim text-bronze-600",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    solid ? "text-ink hover:text-bronze-600" : "text-white/85 hover:text-white",
                    isActive(item.href) && (solid ? "text-bronze-600" : "text-white"),
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button href="/contact" size="sm" variant={solid ? "primary" : "onDark"}>
                Start a Conversation
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
                solid ? "text-ink hover:bg-paper-dim" : "text-white hover:bg-white/10",
              )}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />
    </>
  );
}
