"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Download } from "lucide-react";

type Subscriber = { email: string; date: string };

const defaultSubs: Subscriber[] = [
  { email: "bride2025@gmail.com", date: "2025-05-10" },
  { email: "sarah.jones@email.com", date: "2025-05-08" },
  { email: "wedding.emma@mail.com", date: "2025-05-06" },
  { email: "lily.b@hotmail.com", date: "2025-05-03" },
  { email: "grace.w@gmail.com", date: "2025-04-29" },
];

export default function NewsletterPage() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vowen_newsletter");
    setSubs(saved ? JSON.parse(saved) : defaultSubs);
  }, []);

  const remove = (email: string) => {
    const updated = subs.filter((s) => s.email !== email);
    setSubs(updated);
    localStorage.setItem("vowen_newsletter", JSON.stringify(updated));
    setDeleteEmail(null);
  };

  const exportCSV = () => {
    const csv = ["Email,Tarih", ...subs.map((s) => `${s.email},${s.date}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vowen-newsletter.csv";
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">Newsletter</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">{subs.length} abone</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[13px] text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" /> CSV İndir
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#b89a72]" />
          <span className="text-[12px] font-semibold text-gray-600 uppercase tracking-wider">Aboneler</span>
        </div>
        <div className="divide-y divide-gray-100">
          {subs.map((s) => (
            <div key={s.email} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <div>
                <p className="text-[13px] text-gray-900">{s.email}</p>
                <p className="text-[11px] text-gray-400">{s.date}</p>
              </div>
              <button
                onClick={() => setDeleteEmail(s.email)}
                className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {subs.length === 0 && (
            <p className="px-4 py-10 text-center text-[13px] text-gray-400">Henüz abone yok.</p>
          )}
        </div>
      </div>

      {deleteEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl p-6">
            <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Aboneyi Sil</h2>
            <p className="text-[13px] text-gray-500 mb-1">{deleteEmail}</p>
            <p className="text-[13px] text-gray-500 mb-5">Bu aboneyi listeden kaldırmak istiyor musunuz?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteEmail(null)} className="px-4 py-2 text-[13px] text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">İptal</button>
              <button onClick={() => remove(deleteEmail)} className="px-4 py-2 text-[13px] bg-red-500 text-white rounded-lg hover:bg-red-600">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
