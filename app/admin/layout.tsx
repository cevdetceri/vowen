"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Mail,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Ürünler", href: "/admin/products", icon: ShoppingBag },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Ayarlar", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f5f4f2] flex">
      {/* Sidebar */}
      <>
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 bottom-0 z-50 w-[240px] bg-[#111111] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10">
            <span
              className="text-white text-[18px] font-light tracking-[0.3em] uppercase"
              style={{ fontFamily: "Georgia, serif" }}
            >
              VOWEN
            </span>
            <p className="text-[10px] text-gray-500 tracking-[0.15em] uppercase mt-0.5">
              Admin Panel
            </p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {navItems.map(({ label, href, icon: Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-[13px] transition-all duration-150 ${
                    active
                      ? "bg-[#b89a72] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded text-[13px] text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              Siteyi Görüntüle
            </a>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-[13px] text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all">
              <LogOut className="w-4 h-4 shrink-0" />
              Çıkış
            </button>
          </div>
        </aside>
      </>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-5 h-[56px] flex items-center justify-between shrink-0">
          <button
            className="lg:hidden p-1 text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-gray-500">admin@vowenstudio.com</span>
            <div className="w-7 h-7 rounded-full bg-[#b89a72] flex items-center justify-center text-white text-[11px] font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
