import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBuildingStore,
  IconCalendar,
  IconUser,
  IconCoffee,
  IconReceipt2,
  IconNotes,
  IconCheck,
  IconAlertCircle,
  IconLoader2,
  IconRefresh,
  IconPlus,
  IconMinus,
  IconCircleCheckFilled,
  IconDownload,
  IconDeviceMobile,
  IconWifiOff,
  IconHelpCircle,
  IconX,
} from "@tabler/icons-react";
import {
  Product,
  TransactionPayload,
  TransactionSuccessData,
} from "../types/wahanakantin";
import { getProducts, submitTransaction } from "../services/kantinApi";
import { isKantinApiConfigured } from "../config/kantinConfig";

// Interface untuk event PWA beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// Format currency Rupiah Indonesia
const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Default date: YYYY-MM-DD
const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const WahanaKantinForm: React.FC = () => {
  // State produk
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // State form input
  const [transactionDate, setTransactionDate] = useState<string>(getTodayDateString());
  const [inputterName, setInputterName] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");

  // Search filter untuk produk
  const [searchFilter, setSearchFilter] = useState<string>("");

  // State submit & notifikasi
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<TransactionSuccessData | null>(null);

  // PWA State (Install Prompt, Standalone, Online/Offline, Help Modal)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [showPwaHelp, setShowPwaHelp] = useState<boolean>(false);

  // Validasi field errors
  const [fieldErrors, setFieldErrors] = useState<{
    date?: string;
    inputter?: string;
    product?: string;
    quantity?: string;
  }>({});

  // Cek apakah API sudah dikonfigurasi
  const apiConfigured = isKantinApiConfigured();

  // Set document title secara dinamis khusus untuk halaman ini
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Wahana Kantin - Form Transaksi";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Deteksi PWA standalone & install prompt
  useEffect(() => {
    // Cek apakah sudah berjalan di mode standalone (PWA terinstal)
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(checkStandalone);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setInstallPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      setShowPwaHelp(true);
      return;
    }
    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  // Load master produk
  const loadProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setProductsError(err.message);
      } else {
        setProductsError("Gagal mengambil master data produk.");
      }
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (apiConfigured) {
      loadProducts();
    } else {
      setProductsLoading(false);
      setProductsError(
        "VITE_WAHANA_KANTIN_API_URL belum dikonfigurasi. Hubungkan Google Apps Script Web App pada file .env terlebih dahulu."
      );
    }
  }, [apiConfigured]);

  // Produk yang sedang dipilih
  const selectedProduct = useMemo(() => {
    return products.find((p) => p.product_id === selectedProductId) || null;
  }, [products, selectedProductId]);

  // Filtered products list for dropdown search
  const filteredProducts = useMemo(() => {
    if (!searchFilter.trim()) return products;
    const term = searchFilter.toLowerCase();
    return products.filter(
      (p) =>
        p.product_name.toLowerCase().includes(term) ||
        p.product_id.toLowerCase().includes(term)
    );
  }, [products, searchFilter]);

  // Unit price dan Total price
  const unitPrice = selectedProduct?.price ?? 0;
  const totalPrice = useMemo(() => {
    if (!selectedProduct || quantity <= 0) return 0;
    return unitPrice * quantity;
  }, [selectedProduct, unitPrice, quantity]);

  // Validasi form saat input berubah
  const validateForm = (): boolean => {
    const errors: {
      date?: string;
      inputter?: string;
      product?: string;
      quantity?: string;
    } = {};

    if (!transactionDate || isNaN(Date.parse(transactionDate))) {
      errors.date = "Tanggal transaksi harus diisi dengan format valid.";
    }

    if (!inputterName.trim()) {
      errors.inputter = "Nama penginput wajib diisi.";
    }

    if (!selectedProductId) {
      errors.product = "Pilih salah satu produk.";
    } else if (!selectedProduct) {
      errors.product = "Produk yang dipilih tidak ditemukan dalam daftar aktif.";
    } else if (typeof selectedProduct.price !== "number" || selectedProduct.price <= 0) {
      errors.product = "Harga produk belum dikonfigurasi dengan benar di spreadsheet.";
    }

    if (
      typeof quantity !== "number" ||
      isNaN(quantity) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      errors.quantity = "Jumlah harus berupa bilangan bulat positif minimal 1.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessData(null);

    if (!validateForm()) {
      return;
    }

    const payload: TransactionPayload = {
      transaction_date: transactionDate,
      inputter_name: inputterName.trim(),
      product_id: selectedProductId,
      quantity: Math.floor(quantity),
      notes: notes.trim() || undefined,
    };

    setSubmitting(true);
    try {
      const response = await submitTransaction(payload);
      setSuccessData(response);

      // Reset form field yang relevan untuk input transaksi berikutnya
      setSelectedProductId("");
      setSearchFilter("");
      setQuantity(1);
      setNotes("");
      setFieldErrors({});

      // Scroll ke atas card untuk melihat status sukses
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Terjadi kegagalan saat menyimpan transaksi.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Helper pengubah jumlah
  const adjustQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, (Number.isInteger(prev) ? prev : 1) + delta));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Baris Status PWA & Offline Warning di Atas */}
      <div className="w-full max-w-2xl mb-4 flex items-center justify-between gap-2 z-10 text-xs">
        <div className="flex items-center gap-2">
          {isStandalone ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PWA Mode Aktif
            </span>
          ) : (
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-900/40 transition cursor-pointer"
            >
              <IconDownload size={14} />
              <span>Install Aplikasi (PWA)</span>
            </button>
          )}

          {!isStandalone && (
            <button
              type="button"
              onClick={() => setShowPwaHelp(true)}
              className="text-slate-400 hover:text-slate-200 transition p-1"
              title="Cara pasang PWA di HP"
            >
              <IconHelpCircle size={16} />
            </button>
          )}
        </div>

        {!isOnline && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 font-medium">
            <IconWifiOff size={14} />
            Offline
          </span>
        )}
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-3 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <IconBuildingStore size={36} stroke={1.7} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Form Transaksi Wahana Kantin
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
            Gunakan formulir ini untuk mencatat transaksi penjualan kantin dengan benar.
          </p>
        </div>

        {/* Notifikasi Backend Belum Dikonfigurasi */}
        {!apiConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-sm"
          >
            <div className="flex items-start gap-3">
              <IconAlertCircle className="shrink-0 text-amber-400 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-amber-300">
                  Backend Belum Terhubung
                </p>
                <p className="mt-1 text-xs text-amber-200/90 leading-relaxed">
                  Endpoint Google Apps Script belum disetel pada environment variable.
                  Tambahkan <code className="bg-amber-900/60 px-1.5 py-0.5 rounded text-amber-100 font-mono text-[11px]">VITE_WAHANA_KANTIN_API_URL</code> ke file <code className="bg-amber-900/60 px-1.5 py-0.5 rounded text-amber-100 font-mono text-[11px]">.env</code> setelah melakukan deployment Google Apps Script Web App.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifikasi Transaksi Berhasil */}
        <AnimatePresence>
          {successData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="mb-6 p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-100 shadow-xl shadow-emerald-950/50"
            >
              <div className="flex items-start gap-3">
                <IconCircleCheckFilled className="shrink-0 text-emerald-400 mt-0.5" size={24} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-emerald-300 text-base">
                      Transaksi Berhasil Disimpan
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSuccessData(null)}
                      className="text-xs text-emerald-400/80 hover:text-emerald-200 underline transition cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                  <p className="text-xs text-emerald-200/80 mt-1">
                    Data transaksi telah dicatat ke sheet Google Spreadsheet.
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/20">
                    <div>
                      <span className="text-emerald-300/70 block">ID Transaksi:</span>
                      <span className="font-mono font-medium text-emerald-200">
                        {successData.transaction_id}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-300/70 block">Produk:</span>
                      <span className="font-medium text-emerald-200">
                        {successData.product_name}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-300/70 block">Jumlah:</span>
                      <span className="font-medium text-emerald-200">
                        {successData.quantity} item
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-300/70 block">Total:</span>
                      <span className="font-bold text-emerald-300">
                        {formatRupiah(successData.total_price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifikasi Transaksi Gagal */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-sm flex items-start gap-3 shadow-lg"
            >
              <IconAlertCircle className="shrink-0 text-red-400 mt-0.5" size={20} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-red-300">Gagal Menyimpan Transaksi</p>
                  <button
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="text-xs text-red-400/80 hover:text-red-200 underline transition cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
                <p className="text-xs text-red-200/90 mt-1 leading-relaxed">
                  {submitError}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifikasi Error Memuat Produk */}
        {productsError && apiConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <IconAlertCircle className="shrink-0 text-rose-400" size={20} />
              <span className="text-xs">{productsError}</span>
            </div>
            <button
              type="button"
              onClick={loadProducts}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-xs text-white transition shrink-0 cursor-pointer"
            >
              <IconRefresh size={14} />
              Coba Lagi
            </button>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {/* Header Card Subtitle */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <IconReceipt2 className="text-emerald-400" size={20} />
              <h2 className="font-semibold text-white text-base sm:text-lg">
                Input Penjualan
              </h2>
            </div>
            {productsLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <IconLoader2 size={16} className="animate-spin text-emerald-400" />
                <span>Memuat master data...</span>
              </div>
            )}
            {!productsLoading && products.length > 0 && (
              <span className="text-xs text-slate-400">
                {products.length} Produk Aktif
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field A: Tanggal Transaksi */}
            <div>
              <label
                htmlFor="transaction_date"
                className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1.5"
              >
                <IconCalendar size={16} className="text-slate-400" />
                Tanggal Transaksi <span className="text-rose-400">*</span>
              </label>
              <input
                id="transaction_date"
                type="date"
                value={transactionDate}
                onChange={(e) => {
                  setTransactionDate(e.target.value);
                  if (fieldErrors.date) {
                    setFieldErrors((prev) => ({ ...prev, date: undefined }));
                  }
                }}
                disabled={submitting}
                className={`w-full px-3.5 py-2.5 bg-slate-950/80 border ${
                  fieldErrors.date ? "border-rose-500" : "border-slate-800"
                } rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition disabled:opacity-50`}
              />
              {fieldErrors.date && (
                <p className="mt-1 text-xs text-rose-400">{fieldErrors.date}</p>
              )}
            </div>

            {/* Field B: Nama Penginput */}
            <div>
              <label
                htmlFor="inputter_name"
                className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1.5"
              >
                <IconUser size={16} className="text-slate-400" />
                Nama Penginput <span className="text-rose-400">*</span>
              </label>
              <input
                id="inputter_name"
                type="text"
                placeholder="Contoh: Admin Kantin / Nama Petugas"
                value={inputterName}
                onChange={(e) => {
                  setInputterName(e.target.value);
                  if (fieldErrors.inputter) {
                    setFieldErrors((prev) => ({ ...prev, inputter: undefined }));
                  }
                }}
                disabled={submitting}
                className={`w-full px-3.5 py-2.5 bg-slate-950/80 border ${
                  fieldErrors.inputter ? "border-rose-500" : "border-slate-800"
                } rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition disabled:opacity-50`}
              />
              {fieldErrors.inputter && (
                <p className="mt-1 text-xs text-rose-400">{fieldErrors.inputter}</p>
              )}
            </div>

            {/* Field C: Produk */}
            <div>
              <label
                htmlFor="product_select"
                className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1.5"
              >
                <IconCoffee size={16} className="text-slate-400" />
                Pilih Produk <span className="text-rose-400">*</span>
              </label>

              {/* Search input untuk kemudahan pencarian jika produk banyak */}
              {products.length > 5 && (
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Cari nama produk..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    disabled={submitting || productsLoading}
                    className="w-full px-3 py-1.5 bg-slate-950/50 border border-slate-800/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              )}

              <select
                id="product_select"
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  if (fieldErrors.product) {
                    setFieldErrors((prev) => ({ ...prev, product: undefined }));
                  }
                }}
                disabled={submitting || productsLoading || products.length === 0}
                className={`w-full px-3.5 py-2.5 bg-slate-950/80 border ${
                  fieldErrors.product ? "border-rose-500" : "border-slate-800"
                } rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition disabled:opacity-50 cursor-pointer`}
              >
                <option value="" className="bg-slate-900 text-slate-400">
                  {productsLoading
                    ? "-- Memuat master data produk... --"
                    : products.length === 0
                    ? "-- Tidak ada produk aktif yang tersedia --"
                    : "-- Pilih Produk Kantin --"}
                </option>
                {filteredProducts.map((p) => (
                  <option
                    key={p.product_id}
                    value={p.product_id}
                    className="bg-slate-900 text-white py-1"
                  >
                    {p.product_name} ({p.unit || "pcs"}) — {formatRupiah(p.price)}
                  </option>
                ))}
              </select>
              {fieldErrors.product && (
                <p className="mt-1 text-xs text-rose-400">{fieldErrors.product}</p>
              )}
            </div>

            {/* Field D & E: Jumlah & Harga Satuan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field D: Jumlah */}
              <div>
                <label
                  htmlFor="quantity_input"
                  className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5"
                >
                  Jumlah <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => adjustQuantity(-1)}
                    disabled={submitting || quantity <= 1}
                    className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-l-xl text-slate-300 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Kurangi jumlah"
                  >
                    <IconMinus size={16} />
                  </button>
                  <input
                    id="quantity_input"
                    type="number"
                    min={1}
                    step={1}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setQuantity(isNaN(val) ? 0 : val);
                      if (fieldErrors.quantity) {
                        setFieldErrors((prev) => ({ ...prev, quantity: undefined }));
                      }
                    }}
                    disabled={submitting}
                    className={`w-full px-3 py-2.5 bg-slate-950/80 border-y ${
                      fieldErrors.quantity ? "border-rose-500" : "border-slate-800"
                    } text-center text-white text-sm font-semibold focus:outline-none disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                  <button
                    type="button"
                    onClick={() => adjustQuantity(1)}
                    disabled={submitting}
                    className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-r-xl text-slate-300 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Tambah jumlah"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>
                {fieldErrors.quantity && (
                  <p className="mt-1 text-xs text-rose-400">{fieldErrors.quantity}</p>
                )}
              </div>

              {/* Field E: Harga Satuan (Read Only) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Harga Satuan (Master)
                </label>
                <div className="w-full px-3.5 py-2.5 bg-slate-950/40 border border-slate-800/80 rounded-xl text-slate-300 text-sm font-medium flex items-center justify-between select-none">
                  <span>{selectedProduct ? formatRupiah(unitPrice) : "—"}</span>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider">
                    {selectedProduct?.unit || "Otomatis"}
                  </span>
                </div>
              </div>
            </div>

            {/* Field F: Total Harga (Real-time Calculated with visual emphasis) */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between shadow-inner">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block">
                  Total Harga
                </span>
                <span className="text-xs text-slate-400">
                  {quantity > 0 && selectedProduct
                    ? `${quantity} × ${formatRupiah(unitPrice)}`
                    : "Pilih produk dan jumlah"}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-300">
                {formatRupiah(totalPrice)}
              </div>
            </div>

            {/* Field G: Catatan (Opsional) */}
            <div>
              <label
                htmlFor="notes_input"
                className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1.5"
              >
                <IconNotes size={16} className="text-slate-400" />
                Catatan <span className="text-slate-500 text-xs font-normal">(Opsional)</span>
              </label>
              <textarea
                id="notes_input"
                rows={2}
                placeholder="Tambahkan catatan khusus transaksi jika ada..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={submitting}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition disabled:opacity-50 resize-none"
              />
            </div>

            {/* Tombol Utama */}
            <button
              type="submit"
              disabled={submitting || productsLoading || !apiConfigured || !isOnline}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 active:from-emerald-700 active:to-green-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/30 border border-emerald-500/40 transition duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <>
                  <IconLoader2 size={18} className="animate-spin" />
                  <span>Menyimpan Transaksi...</span>
                </>
              ) : (
                <>
                  <IconCheck size={18} stroke={2.5} />
                  <span>Simpan Transaksi</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Card Notice */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400">
              Pastikan data transaksi sudah benar sebelum disimpan.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Panduan Pasang PWA (Add to Home Screen) */}
      <AnimatePresence>
        {showPwaHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl text-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <IconDeviceMobile size={18} />
                  <span>Cara Pasang Aplikasi (PWA)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPwaHelp(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <IconX size={18} />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <p className="font-semibold text-white mb-1">Di Google Chrome / Android:</p>
                  <p>1. Klik tombol titik tiga (⋮) di pojok kanan atas browser.</p>
                  <p>2. Pilih menu <strong>"Install aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.</p>
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <p className="font-semibold text-white mb-1">Di Safari / iOS (iPhone):</p>
                  <p>1. Tekan tombol <strong>Share</strong> (ikon kotak dengan panah ke atas).</p>
                  <p>2. Gulir ke bawah lalu pilih <strong>"Add to Home Screen"</strong> (Tambah ke Layar Utama).</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPwaHelp(false)}
                className="w-full mt-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition"
              >
                Mengerti
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WahanaKantinForm;
