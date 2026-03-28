// Canvas-based per-pixel hue rotation — Photoshop-quality color shifting
// Preserves translucency, gradients, highlights, and shadows.

const cache = new Map<string, string>();
const imageCache = new Map<string, HTMLImageElement>();

function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Shift the hue of an image by `hueShift` degrees.
 * hueShift=0 means no change. hueShift=120 turns reds into greens, etc.
 * Returns a data URL of the recolored image.
 */
export async function shiftHue(src: string, hueShift: number): Promise<string> {
  // Normalize
  hueShift = ((hueShift % 360) + 360) % 360;

  // No shift needed
  if (hueShift === 0) return src;

  const key = `${src}:${hueShift}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const img = await loadImage(src);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return src;

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const shift = hueShift / 360;

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a === 0) continue; // skip fully transparent pixels

    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;

    // RGB to HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) continue; // achromatic — no hue to shift

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    let h: number;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;

    // Rotate hue
    h = (h + shift) % 1;

    // HSL to RGB
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    data[i] = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    data[i + 1] = Math.round(hue2rgb(p, q, h) * 255);
    data[i + 2] = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  }

  ctx.putImageData(imageData, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");
  cache.set(key, dataUrl);
  return dataUrl;
}

function hue2rgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/** Pre-warm the cache for a given image + set of hues */
export function preloadHues(src: string, hues: number[]): void {
  hues.forEach((h) => shiftHue(src, h));
}
