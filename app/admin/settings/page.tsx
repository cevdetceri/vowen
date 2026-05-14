"use client";

import { useState, useEffect } from "react";
import { Save, Check, RefreshCw, AlertCircle } from "lucide-react";

type Settings = {
  brandName: string;
  tagline: string;
  email: string;
  instagram: string;
  facebook: string;
  siteUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  newsletterDiscount: string;
};

const defaults: Settings = {
  brandName: "VOWEN Studio",
  tagline: "Luxury Bridal Accessories",
  email: "hello@vowenstudio.com",
  instagram: "vowenstudio",
  facebook: "vowenstudio",
  siteUrl: "https://gamze-studio.netlify.app",
  heroTitle: "luxury accessories for modern brides",
  heroSubtitle: "soft colour palettes, sculptural forms and intricate details",
  newsletterDiscount: "10%",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [saved, setSaved] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => {
    const s = localStorage.getItem("vowen_settings");
    if (s) setSettings(JSON.parse(s));
  }, []);

  const handleSave = () => {
    localStorage.setItem("vowen_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleEtsySync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/etsy-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSyncResult({ ok: true, msg: `${data.total} ürün senkronize edildi (${data.earrings} küpe, ${data.veils} peçe). Sayfayı yenileyin.` });
      } else {
        setSyncResult({ ok: false, msg: data.error || "Senkronizasyon başarısız." });
      }
    } catch {
      setSyncResult({ ok: false, msg: "Sunucuya bağlanılamadı." });
    } finally {
      setSyncing(false);
    }
  };

  const Field = ({
    label,
    field,
    type = "text",
    placeholder,
  }: {
    label: string;
    field: keyof Settings;
    type?: string;
    placeholder?: string;
  }) => (
    <div>
      <label className="block text-[12px] font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={settings[field]}
        onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-[#b89a72] bg-white"
      />
    </div>
  );

  const Textarea = ({ label, field, placeholder }: { label: string; field: keyof Settings; placeholder?: string }) => (
    <div>
      <label className="block text-[12px] font-medium text-gray-700 mb-1.5">{label}</label>
      <textarea
        rows={2}
        value={settings[field]}
        onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-[#b89a72] bg-white resize-none"
      />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">Ayarlar</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">Site bilgilerini düzenleyin.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] rounded-lg transition-all ${
            saved ? "bg-emerald-500 text-white" : "bg-[#111111] text-white hover:bg-[#b89a72]"
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Kaydedildi!" : "Kaydet"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Marka */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Marka Bilgileri</h2>
          <div className="space-y-4">
            <Field label="Marka Adı" field="brandName" placeholder="VOWEN Studio" />
            <Field label="Slogan" field="tagline" placeholder="Luxury Bridal Accessories" />
            <Field label="E-posta" field="email" type="email" placeholder="hello@vowenstudio.com" />
            <Field label="Site URL" field="siteUrl" placeholder="https://..." />
          </div>
        </div>

        {/* Sosyal medya */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Sosyal Medya</h2>
          <div className="space-y-4">
            <Field label="Instagram kullanıcı adı" field="instagram" placeholder="vowenstudio" />
            <Field label="Facebook kullanıcı adı" field="facebook" placeholder="vowenstudio" />
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Hero Bölümü</h2>
          <div className="space-y-4">
            <Textarea label="Başlık" field="heroTitle" placeholder="luxury accessories for modern brides" />
            <Textarea label="Alt başlık" field="heroSubtitle" placeholder="soft colour palettes..." />
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-4">Newsletter</h2>
          <div className="space-y-4">
            <Field label="İndirim Oranı" field="newsletterDiscount" placeholder="10%" />
          </div>
        </div>

        {/* Etsy Sync */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 lg:col-span-2">
          <h2 className="text-[14px] font-semibold text-gray-900 mb-1">Etsy Ürün Senkronizasyonu</h2>
          <p className="text-[12px] text-gray-500 mb-4">
            Etsy mağazanızdaki tüm ürünleri (isimler, fiyatlar, görseller, videolar) otomatik olarak siteye aktarın.
            Bunun için <code className="bg-gray-100 px-1 rounded text-[11px]">.env.local</code> dosyasına{" "}
            <code className="bg-gray-100 px-1 rounded text-[11px]">ETSY_API_KEY=...</code> eklemeniz gerekir.
            API anahtarını buradan ücretsiz alın:{" "}
            <a href="https://www.etsy.com/developers/register" target="_blank" rel="noopener noreferrer"
              className="text-[#b89a72] underline">etsy.com/developers/register</a>
          </p>
          <button
            onClick={handleEtsySync}
            disabled={syncing}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#111] text-white text-[13px] rounded-lg hover:bg-[#b89a72] transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Senkronize ediliyor..." : "Etsy'den Ürünleri Çek"}
          </button>
          {syncResult && (
            <div className={`mt-3 flex items-start gap-2 p-3 rounded-lg text-[12px] ${syncResult.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
              {syncResult.ok ? <Check className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
              {syncResult.msg}
            </div>
          )}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-[12px] text-blue-700">
              <strong>İpucu:</strong> Komut satırından da çalıştırabilirsiniz:{" "}
              <code className="bg-blue-100 px-1 rounded">node scripts/sync-etsy.mjs</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
