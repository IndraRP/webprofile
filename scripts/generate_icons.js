import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Helper to create a valid uncompressed PNG using Node.js built-ins
function createPng(width, height, getPixel) {
  // getPixel(x, y) => [r, g, b, a]
  const bytesPerPixel = 4;
  const scanlineLength = width * bytesPerPixel + 1; // 1 filter byte per row
  const rawData = Buffer.alloc(scanlineLength * height);

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // Helper CRC32
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(typeStr, dataBuf) {
    const len = dataBuf.length;
    const chunk = Buffer.alloc(4 + 4 + len + 4);
    chunk.writeUInt32BE(len, 0);
    chunk.write(typeStr, 4, 4, 'ascii');
    dataBuf.copy(chunk, 8);
    const crcVal = crc32(chunk.subarray(4, 8 + len));
    chunk.writeUInt32BE(crcVal, 8 + len);
    return chunk;
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // Deflate
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // No interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Function to draw Wahana Kantin branding icon
function generateKantinIcon(size) {
  return createPng(size, size, (x, y) => {
    // Normalized coordinates -1 to 1
    const nx = (x / size) * 2 - 1;
    const ny = (y / size) * 2 - 1;
    const rDist = Math.sqrt(nx * nx + ny * ny);

    // Rounded rectangle border / corner check
    const cornerRadius = 0.25;
    const qx = Math.max(0, Math.abs(nx) - (1 - cornerRadius));
    const qy = Math.max(0, Math.abs(ny) - (1 - cornerRadius));
    const distCorner = Math.sqrt(qx * qx + qy * qy);

    if (distCorner > cornerRadius) {
      return [0, 0, 0, 0]; // Transparent outer
    }

    // Background gradient: Deep emerald to slate (#064e3b -> #022c22)
    const t = (ny + 1) / 2;
    let bgR = Math.round(5 + (6 - 5) * t);
    let bgG = Math.round(78 - 34 * t);
    let bgB = Math.round(59 - 25 * t);

    // Subtle emerald outer border
    if (distCorner > cornerRadius - 0.04 || Math.abs(nx) > 0.94 || Math.abs(ny) > 0.94) {
      return [16, 185, 129, 255]; // #10b981
    }

    // Inside badge: Store / Bag / Cup icon representation
    // Let's draw an elegant Coffee / Cup / Store graphic
    // 1. Cup body: y from -0.1 to 0.45, x from -0.32 to 0.32 tapering to -0.24 to 0.24
    let isCup = false;
    if (ny >= -0.1 && ny <= 0.45) {
      const taper = 0.32 - (0.08 * (ny - -0.1)) / 0.55;
      if (Math.abs(nx) <= taper) {
        // Cup inner vs outer rim
        if (Math.abs(nx) >= taper - 0.05 || ny >= 0.40) {
          isCup = true;
        }
      }
    }

    // Cup handle on the right: y from 0.0 to 0.3, x from 0.30 to 0.48
    if (ny >= 0.0 && ny <= 0.3) {
      const hDist = Math.sqrt(Math.pow(nx - 0.32, 2) + Math.pow(ny - 0.15, 2));
      if (hDist <= 0.16 && hDist >= 0.10 && nx >= 0.30) {
        isCup = true;
      }
    }

    // Steam lines above cup: 3 wavy streams
    // Center stream: x ~ 0, y from -0.45 to -0.18
    const isSteam1 = Math.abs(nx - 0.04 * Math.sin(ny * 15)) < 0.035 && ny >= -0.45 && ny <= -0.18;
    const isSteam2 = Math.abs((nx - 0.15) - 0.04 * Math.sin(ny * 15)) < 0.035 && ny >= -0.40 && ny <= -0.18;
    const isSteam3 = Math.abs((nx + 0.15) - 0.04 * Math.sin(ny * 15)) < 0.035 && ny >= -0.40 && ny <= -0.18;

    // Saucer / Base plate below cup: y from 0.48 to 0.54, x from -0.45 to 0.45
    let isSaucer = false;
    if (ny >= 0.48 && ny <= 0.54 && Math.abs(nx) <= 0.44) {
      isSaucer = true;
    }

    if (isCup || isSteam1 || isSteam2 || isSteam3 || isSaucer) {
      // Crisp white / emerald glow
      return [255, 255, 255, 255];
    }

    // Cup coffee content: dark warm amber
    if (ny >= -0.05 && ny <= 0.38) {
      const taper = 0.28 - (0.07 * (ny - -0.05)) / 0.43;
      if (Math.abs(nx) <= taper) {
        return [245, 158, 11, 230]; // Amber-500 (#f59e0b)
      }
    }

    return [bgR, bgG, bgB, 255];
  });
}

// Generate files in public directory
const publicDir = path.resolve('public');
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generateKantinIcon(192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generateKantinIcon(512));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generateKantinIcon(180));

// Also generate SVG version
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="110" fill="url(#bgGrad)" stroke="#10b981" stroke-width="12" />
  <g filter="url(#shadow)" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">
    <!-- Steam -->
    <path d="M 210 110 Q 195 150 210 190" stroke="#34d399" />
    <path d="M 256 95 Q 240 145 256 190" stroke="#10b981" />
    <path d="M 302 110 Q 287 150 302 190" stroke="#34d399" />
    <!-- Cup -->
    <path d="M 140 220 L 372 220 L 350 360 C 346 390 320 410 290 410 L 222 410 C 192 410 166 390 162 360 Z" fill="#0f172a" stroke="#ffffff" />
    <!-- Coffee fill -->
    <path d="M 168 250 L 344 250 L 332 340 C 330 360 310 380 290 380 L 222 380 C 202 380 182 360 180 340 Z" fill="#f59e0b" stroke="none" />
    <!-- Handle -->
    <path d="M 365 240 C 430 240 430 340 355 340" />
    <!-- Saucer -->
    <path d="M 120 440 L 392 440" stroke="#10b981" stroke-width="22" />
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
console.log('Icons generated successfully in public/');

