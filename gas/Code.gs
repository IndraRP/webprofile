/**
 * Google Apps Script Backend untuk Wahana Kantin Form
 * Spreadsheet: Master Produk ("Products") & Data Transaksi ("Transactions")
 */

const SHEET_NAME_PRODUCTS = "Products";
const SHEET_NAME_TRANSACTIONS = "Transactions";

/**
 * Setup otomatis sheet dan header kolom.
 * Jalankan fungsi ini satu kali dari Google Apps Script Editor untuk inisialisasi.
 */
function setupWahanaKantinSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup Sheet Products
  let productSheet = ss.getSheetByName(SHEET_NAME_PRODUCTS);
  if (!productSheet) {
    productSheet = ss.insertSheet(SHEET_NAME_PRODUCTS);
  }

  const productHeaders = [
    "product_id",
    "product_name",
    "unit",
    "price",
    "is_active",
    "created_at",
  ];

  if (productSheet.getLastRow() === 0) {
    productSheet.appendRow(productHeaders);
    productSheet.getRange(1, 1, 1, productHeaders.length).setFontWeight("bold");

    // Master produk awal sesuai petunjuk: Milo, Nescafé, Gelas, Teh, Energen
    // Catatan: Harga awal dapat disesuaikan langsung oleh admin di spreadsheet
    const now = new Date().toISOString();
    const initialProducts = [
      ["PROD001", "Milo", "pcs", 5000, true, now],
      ["PROD002", "Nescafé", "pcs", 6000, true, now],
      ["PROD003", "Gelas", "pcs", 1000, true, now],
      ["PROD004", "Teh", "pcs", 3000, true, now],
      ["PROD005", "Energen", "pcs", 4000, true, now],
    ];

    productSheet
      .getRange(2, 1, initialProducts.length, productHeaders.length)
      .setValues(initialProducts);
  }

  // 2. Setup Sheet Transactions
  let trxSheet = ss.getSheetByName(SHEET_NAME_TRANSACTIONS);
  if (!trxSheet) {
    trxSheet = ss.insertSheet(SHEET_NAME_TRANSACTIONS);
  }

  const trxHeaders = [
    "transaction_id",
    "transaction_date",
    "created_at",
    "inputter_name",
    "product_id",
    "product_name",
    "quantity",
    "unit_price",
    "total_price",
    "notes",
    "status",
  ];

  if (trxSheet.getLastRow() === 0) {
    trxSheet.appendRow(trxHeaders);
    trxSheet.getRange(1, 1, 1, trxHeaders.length).setFontWeight("bold");
  }

  Logger.log("Setup spreadsheet Wahana Kantin selesai.");
}

/**
 * Helper untuk response JSON
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * GET Handler: Mengambil master produk aktif dengan harga valid
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const productSheet = ss.getSheetByName(SHEET_NAME_PRODUCTS);

    if (!productSheet) {
      return createJsonResponse({
        success: false,
        message: `Sheet "${SHEET_NAME_PRODUCTS}" belum tersedia. Jalankan fungsi setupWahanaKantinSpreadsheet terlebih dahulu.`,
        data: [],
      });
    }

    const lastRow = productSheet.getLastRow();
    if (lastRow <= 1) {
      return createJsonResponse({
        success: true,
        message: "Belum ada produk terdaftar.",
        data: [],
      });
    }

    const data = productSheet.getRange(2, 1, lastRow - 1, 6).getValues();
    const products = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const productId = String(row[0] || "").trim();
      const productName = String(row[1] || "").trim();
      const unit = String(row[2] || "pcs").trim();
      const price = Number(row[3]);
      const isActiveRaw = row[4];
      const isActive =
        isActiveRaw === true ||
        String(isActiveRaw).toLowerCase() === "true" ||
        isActiveRaw === 1;
      const createdAt = row[5] ? new Date(row[5]).toISOString() : "";

      // Hanya masukkan produk yang memiliki ID, nama, aktif, dan harga valid (> 0)
      if (productId && productName && isActive && !isNaN(price) && price > 0) {
        products.push({
          product_id: productId,
          product_name: productName,
          unit: unit,
          price: price,
          is_active: true,
          created_at: createdAt,
        });
      }
    }

    return createJsonResponse({
      success: true,
      message: "Berhasil mengambil master produk.",
      data: products,
    });
  } catch (err) {
    return createJsonResponse({
      success: false,
      message: "Terjadi kesalahan pada server: " + err.message,
      data: [],
    });
  }
}

/**
 * POST Handler: Menyimpan transaksi baru dengan validasi dan LockService
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Tunggu lock hingga 10 detik untuk mencegah race conditions saat multiple submission
  const hasLock = lock.tryLock(10000);

  if (!hasLock) {
    return createJsonResponse({
      success: false,
      message: "Server sedang sibuk memproses transaksi lain. Silakan coba sesaat lagi.",
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        message: "Payload transaksi kosong atau tidak valid.",
      });
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        message: "Format JSON pada request tidak valid.",
      });
    }

    // 1. Validasi input wajib
    const transactionDate = String(payload.transaction_date || "").trim();
    const inputterName = String(payload.inputter_name || "").trim();
    const productId = String(payload.product_id || "").trim();
    const quantity = Number(payload.quantity);
    const notes = String(payload.notes || "").trim();

    if (!transactionDate || isNaN(Date.parse(transactionDate))) {
      return createJsonResponse({
        success: false,
        message: "Tanggal transaksi tidak valid.",
      });
    }

    if (!inputterName) {
      return createJsonResponse({
        success: false,
        message: "Nama penginput wajib diisi.",
      });
    }

    if (!productId) {
      return createJsonResponse({
        success: false,
        message: "Produk wajib dipilih.",
      });
    }

    if (isNaN(quantity) || !Number.isInteger(quantity) || quantity < 1) {
      return createJsonResponse({
        success: false,
        message: "Jumlah harus berupa bilangan bulat positif minimal 1.",
      });
    }

    // 2. Baca master data produk untuk memvalidasi ketersediaan dan harga resmi
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const productSheet = ss.getSheetByName(SHEET_NAME_PRODUCTS);
    const trxSheet = ss.getSheetByName(SHEET_NAME_TRANSACTIONS);

    if (!productSheet || !trxSheet) {
      return createJsonResponse({
        success: false,
        message: "Sheet database belum siap. Jalankan fungsi setup terlebih dahulu.",
      });
    }

    const pLastRow = productSheet.getLastRow();
    if (pLastRow <= 1) {
      return createJsonResponse({
        success: false,
        message: "Master data produk masih kosong.",
      });
    }

    const productRows = productSheet.getRange(2, 1, pLastRow - 1, 6).getValues();
    let matchedProduct = null;

    for (let i = 0; i < productRows.length; i++) {
      const row = productRows[i];
      const pId = String(row[0] || "").trim();
      if (pId === productId) {
        const pName = String(row[1] || "").trim();
        const pUnit = String(row[2] || "pcs").trim();
        const pPrice = Number(row[3]);
        const pActiveRaw = row[4];
        const pActive =
          pActiveRaw === true ||
          String(pActiveRaw).toLowerCase() === "true" ||
          pActiveRaw === 1;

        matchedProduct = {
          product_id: pId,
          product_name: pName,
          unit: pUnit,
          price: pPrice,
          is_active: pActive,
        };
        break;
      }
    }

    if (!matchedProduct) {
      return createJsonResponse({
        success: false,
        message: `Produk dengan ID "${productId}" tidak ditemukan dalam master data.`,
      });
    }

    if (!matchedProduct.is_active) {
      return createJsonResponse({
        success: false,
        message: `Produk "${matchedProduct.product_name}" sedang nonaktif dan tidak dapat ditransaksikan.`,
      });
    }

    if (
      isNaN(matchedProduct.price) ||
      typeof matchedProduct.price !== "number" ||
      matchedProduct.price <= 0
    ) {
      return createJsonResponse({
        success: false,
        message: `Harga untuk produk "${matchedProduct.product_name}" belum diisi atau tidak valid di master data spreadsheet.`,
      });
    }

    // 3. Hitung ulang total harga berdasarkan harga master data resmi
    const unitPrice = matchedProduct.price;
    const totalPrice = unitPrice * quantity;

    // 4. Buat unique transaction ID
    const now = new Date();
    const dateStr = Utilities.formatDate(now, "GMT+7", "yyyyMMdd");
    const randomSuffix = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
    const transactionId = `TRX-${dateStr}-${randomSuffix}`;
    const createdAt = Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss");

    // 5. Simpan transaksi sebagai baris baru pada Transactions sheet
    trxSheet.appendRow([
      transactionId,
      transactionDate,
      createdAt,
      inputterName,
      matchedProduct.product_id,
      matchedProduct.product_name,
      quantity,
      unitPrice,
      totalPrice,
      notes,
      "SUBMITTED",
    ]);

    // 6. Return response sukses
    return createJsonResponse({
      success: true,
      message: "Transaksi berhasil disimpan.",
      data: {
        transaction_id: transactionId,
        product_name: matchedProduct.product_name,
        quantity: quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
        transaction_date: transactionDate,
        inputter_name: inputterName,
      },
    });
  } catch (err) {
    return createJsonResponse({
      success: false,
      message: "Gagal menyimpan transaksi: " + err.message,
    });
  } finally {
    lock.releaseLock();
  }
}

