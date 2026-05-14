"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Filter } from "lucide-react";

type Product = {
  id: string;
  name: string;
  variant: string;
  price: string;
  category: string;
  status: "active" | "draft";
};

const defaultProducts: Product[] = [
  { id: "1", name: "Emma Stud Earrings", variant: "18ct Gold", price: "165", category: "Earrings", status: "active" },
  { id: "2", name: "Ada Pearl Earrings", variant: "18ct Gold", price: "165", category: "Earrings", status: "active" },
  { id: "3", name: "Nova Drop Earrings", variant: "Bridal Collection", price: "175", category: "Earrings", status: "active" },
  { id: "4", name: "Leni Drop Earrings", variant: "Sterling Silver", price: "125", category: "Earrings", status: "active" },
  { id: "5", name: "Teddi Drop Earrings", variant: "Statement", price: "195", category: "Earrings", status: "active" },
  { id: "6", name: "Etta Hoop", variant: "Bridal Collection", price: "155", category: "Earrings", status: "active" },
  { id: "7", name: "Kit Drop Earrings", variant: "Sterling Silver", price: "195", category: "Earrings", status: "active" },
  { id: "8", name: "Lola Drop Earrings", variant: "18ct Gold", price: "165", category: "Earrings", status: "draft" },
  { id: "9", name: "Arlo Wedding Veil", variant: "Cathedral Length", price: "375", category: "Veils", status: "active" },
  { id: "10", name: "Emily Two-Tier Veil", variant: "Standard", price: "445", category: "Veils", status: "active" },
  { id: "11", name: "Olivia Pearl Two-Tier", variant: "Pearl Edge", price: "345", category: "Veils", status: "active" },
  { id: "12", name: "Sofia Wedding Veil", variant: "Classic", price: "125", category: "Veils", status: "active" },
];

const categories = ["Tümü", "Earrings", "Veils", "Headbands", "Hairvines", "Haircombs"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", variant: "", price: "", category: "Earrings", status: "active" as "active" | "draft" });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vowen_products");
    setProducts(saved ? JSON.parse(saved) : defaultProducts);
  }, []);

  const save = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem("vowen_products", JSON.stringify(updated));
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.variant.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Tümü" || p.category === category;
    return matchSearch && matchCat;
  });

  const openNew = () => {
    setEditProduct(null);
    setForm({ name: "", variant: "", price: "", category: "Earrings", status: "active" });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, variant: p.variant, price: p.price, category: p.category, status: p.status });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editProduct) {
      save(products.map((p) => (p.id === editProduct.id ? { ...p, ...form } : p)));
    } else {
      save([...products, { ...form, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    save(products.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">Ürünler</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">{products.length} ürün</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-[13px] rounded-lg hover:bg-[#b89a72] transition-colors"
        >
          <Plus className="w-4 h-4" /> Yeni Ürün
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-[13px] border border-gray-200 rounded-lg bg-white outline-none focus:border-[#b89a72]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-[12px] rounded-lg border transition-colors ${
                category === c
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Ürün</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Fiyat</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-[13px] font-medium text-gray-900">{p.name}</p>
                    <p className="text-[11px] text-gray-400">{p.variant}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] text-gray-600 px-2 py-0.5 rounded bg-gray-100">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-gray-900 font-medium">£{p.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      p.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {p.status === "active" ? "Aktif" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[13px] text-gray-400">
                    Ürün bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-gray-900">
                {editProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1.5">Ürün Adı *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-[#b89a72]"
                  placeholder="Emma Stud Earrings"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1.5">Varyant</label>
                <input
                  type="text"
                  value={form.variant}
                  onChange={(e) => setForm({ ...form, variant: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-[#b89a72]"
                  placeholder="18ct Gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1.5">Fiyat (£) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-[#b89a72]"
                    placeholder="165"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1.5">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-[#b89a72] bg-white"
                  >
                    {["Earrings", "Veils", "Headbands", "Hairvines", "Haircombs", "Hairpins"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1.5">Durum</label>
                <div className="flex gap-3">
                  {(["active", "draft"] as const).map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={form.status === s}
                        onChange={() => setForm({ ...form, status: s })}
                        className="accent-[#b89a72]"
                      />
                      <span className="text-[13px] text-gray-700">{s === "active" ? "Aktif" : "Taslak"}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-[13px] text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-[13px] bg-[#111111] text-white rounded-lg hover:bg-[#b89a72] transition-colors"
              >
                {editProduct ? "Güncelle" : "Ekle"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl p-6">
            <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Ürünü Sil</h2>
            <p className="text-[13px] text-gray-500 mb-5">Bu ürünü silmek istediğinize emin misiniz?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-[13px] text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-[13px] bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
