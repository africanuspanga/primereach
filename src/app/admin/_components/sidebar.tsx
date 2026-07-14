"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Settings,
  Home,
  Briefcase,
  Wrench,
  Globe,
  Flag,
  Newspaper,
  Building2,
  Inbox,
  Users,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/solutions", label: "Solutions", icon: Briefcase },
  { href: "/admin/capabilities", label: "Capabilities", icon: Wrench },
  { href: "/admin/impact", label: "Impact", icon: Globe },
  { href: "/admin/programmes", label: "Programmes", icon: Flag },
  { href: "/admin/insights", label: "Insights", icon: Newspaper },
  { href: "/admin/about", label: "About", icon: Building2 },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-ink/10 bg-white lg:flex">
      <div className="flex h-16 items-center border-b border-ink/10 px-6">
        <span className="font-display text-lg font-medium">PrimeReach Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-bronze/10 text-bronze-700"
                      : "text-ink hover:bg-ink/5"
                  }`}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-ink/10 p-4">
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-ink/5"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
