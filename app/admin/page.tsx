"use client";

import { ShoppingBag, Mail, TrendingUp, Eye, ArrowUpRight, Package } from "lucide-react";

const stats = [
  { label: "Toplam Ürün", value: "34", icon: Package, change: "+2 bu ay", up: true },
  { label: "Newsletter Üyesi", value: "128", icon: Mail, change: "+12 bu hafta", up: true },
  { label: "Sayfa Görüntüleme", value: "1.4K", icon: Eye, change: "+8% bu hafta", up: true },
  { label: "Toplam Koleksiyon", value: "8", icon: ShoppingBag, change: "Aktif", up: true },
];

const recentActivity = [
  { action: "Yeni ürün eklendi", detail: "Teddi Drop Earrings — £195", time: "2 saat önce" },
  { action: "Newsletter aboneliği", detail: "yeni@email.com", time: "5 saat önce" },
  { action: "Ürün güncellendi", detail: "Emma Stud Earrings 18ct Gold", time: "1 gün önce" },
  { action: "Ürün güncellendi", detail: "Arlo Wedding Veil fiyat güncellendi", time: "2 gün önce" },
  { action: "Newsletter aboneliği", detail: "bride2025@mail.com", time: "3 gün önce" },
];

const quickLinks = [
  { label: "Yeni Ürün Ekle", href: "/admin/products/new", icon: Package },
  { label: "Newsletter Listesi", href: "/admin/newsletter", icon: Mail },
  { label: "Ayarları Düzenle", href: "/admin/settings", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold text-gray-900">Dashboard</h1>
        <p className="text-[13px] text-gray-500 mt-1">VOWEN Studio yönetim paneline hoş geldiniz.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, change, up }) => (
          <div key={label} className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#f5f0ea] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#b89a72]" />
              </div>
              <span className={`text-[11px] font-medium ${up ? "text-emerald-600" : "text-red-500"}`}>
                {up ? "↑" : "↓"} {change}
              </span>
            </div>
            <p className="text-[26px] font-semibold text-gray-900 leading-none mb-1">{value}</p>
            <p className="text-[12px] text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 rounded-full bg-[#b89a72] mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-gray-900">{item.action}</p>
                  <p className="text-[12px] text-gray-400 truncate">{item.detail}</p>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="space-y-2">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#b89a72] hover:bg-[#faf8f5] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#b89a72]" />
                  <span className="text-[13px] text-gray-700 group-hover:text-gray-900">{label}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#b89a72] transition-colors" />
              </a>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-[#111111]">
            <p className="text-[12px] text-gray-400 mb-1">Site URL</p>
            <a
              href="https://gamze-studio.netlify.app"
              target="_blank"
              className="text-[13px] text-[#b89a72] hover:underline break-all"
            >
              gamze-studio.netlify.app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
