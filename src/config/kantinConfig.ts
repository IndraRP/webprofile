/**
 * Konfigurasi endpoint backend Google Apps Script untuk Wahana Kantin Form.
 * URL backend diambil dari environment variable VITE_WAHANA_KANTIN_API_URL.
 */
export const KANTIN_API_URL: string =
  (import.meta.env.VITE_WAHANA_KANTIN_API_URL as string) || "";

export const isKantinApiConfigured = (): boolean => {
  return typeof KANTIN_API_URL === "string" && KANTIN_API_URL.trim().length > 0;
};

