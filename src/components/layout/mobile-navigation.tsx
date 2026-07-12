"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { CONTACT, MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

/** Full-screen mobile menu with accordion sub-items for the Services group. */
export function MobileNavigation({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>("/services");

  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
            // Close the menu whenever any link inside the panel is activated.
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) onClose();
            }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full text-ink hover:bg-paper-dim"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    {item.children ? (
                      <div className="rounded-2xl">
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((cur) => (cur === item.href ? null : item.href))
                          }
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-ink hover:bg-paper-dim"
                          aria-expanded={expanded === item.href}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-300",
                              expanded === item.href && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === item.href && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <li>
                                <Link
                                  href={item.href}
                                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-bronze-600"
                                >
                                  All Services
                                </Link>
                              </li>
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "block rounded-lg px-4 py-2.5 text-sm text-muted hover:text-ink",
                                      isActive(child.href) && "text-ink",
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-paper-dim",
                          isActive(item.href) && "bg-paper-dim",
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-ink/10 px-5 py-5">
              <Button href="/contact" className="w-full" size="md">
                Start a Conversation
              </Button>
              <a
                href={CONTACT.phonePrimary.href}
                className="mt-3 block text-center text-sm font-medium text-muted hover:text-ink"
              >
                {CONTACT.phonePrimary.display}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
