import { KANTIN_API_URL, isKantinApiConfigured } from "../config/kantinConfig";
import {
  ApiResponse,
  Product,
  TransactionPayload,
  TransactionSuccessData,
} from "../types/wahanakantin";

/**
 * Mengambil daftar master produk aktif dari Google Apps Script Web App.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isKantinApiConfigured()) {
    throw new Error(
      "URL backend belum dikonfigurasi. Silakan atur VITE_WAHANA_KANTIN_API_URL di file .env."
    );
  }

  const endpoint = `${KANTIN_API_URL}${
    KANTIN_API_URL.includes("?") ? "&" : "?"
  }action=get_products`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Server merespons dengan status: ${response.status}`);
    }

    const result: ApiResponse<Product[]> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Gagal memuat daftar produk.");
    }

    const products = Array.isArray(result.data) ? result.data : [];

    // Filter produk yang aktif dan memiliki harga valid (> 0)
    return products.filter(
      (p) =>
        Boolean(p.is_active) &&
        typeof p.price === "number" &&
        !isNaN(p.price) &&
        p.price > 0
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Terjadi kesalahan koneksi saat memuat data produk.");
  }
}

/**
 * Mengirim transaksi baru ke Google Apps Script Web App.
 *
 * Catatan teknis:
 * Menggunakan Content-Type 'text/plain;charset=utf-8' untuk menghindari CORS Preflight (OPTIONS),
 * yang tidak didukung secara native oleh Google Apps Script Web Apps.
 * Apps Script akan tetap membaca isi JSON melalui `e.postData.contents`.
 */
export async function submitTransaction(
  payload: TransactionPayload
): Promise<TransactionSuccessData> {
  if (!isKantinApiConfigured()) {
    throw new Error(
      "URL backend belum dikonfigurasi. Silakan atur VITE_WAHANA_KANTIN_API_URL di file .env."
    );
  }

  try {
    const response = await fetch(KANTIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Server merespons dengan status: ${response.status}`);
    }

    const text = await response.text();
    let result: ApiResponse<TransactionSuccessData>;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Respons dari backend bukan format JSON yang valid.");
    }

    if (!result.success || !result.data) {
      throw new Error(result.message || "Gagal menyimpan transaksi.");
    }

    return result.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Terjadi kesalahan jaringan saat mengirim transaksi.");
  }
}

