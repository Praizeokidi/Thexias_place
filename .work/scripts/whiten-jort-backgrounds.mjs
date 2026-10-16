import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const sourceDir = path.join(root, "public", "images", "products", "jorts");
const backupDir = path.join(root, ".work", "jorts-originals");
const files = (await fs.readdir(sourceDir)).filter((file) => /\.(jpe?g|png)$/i.test(file)).sort();

await fs.mkdir(backupDir, { recursive: true });
for (const file of files) {
  const source = path.join(sourceDir, file);
  const backup = path.join(backupDir, file);
  try {
    await fs.access(backup);
  } catch {
    await fs.copyFile(source, backup);
  }
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setContent("<!doctype html><html><body></body></html>");

const results = [];
for (const file of files) {
  const inputPath = path.join(sourceDir, file);
  const originalPath = path.join(backupDir, file);
  const sourcePath = await fs.stat(originalPath).then(() => originalPath).catch(() => inputPath);
  const inputDataUrl = `data:image/jpeg;base64,${(await fs.readFile(sourcePath)).toString("base64")}`;
  const outputPath = path.join(sourceDir, file.replace(/\.jpg$/i, ".png"));
  const result = await page.evaluate(async ({ inputDataUrl, outputPath }) => {
    const image = new Image();
    image.src = inputDataUrl;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = pixels;

    // The supplied product photography uses neutral near-white studio backdrops.
    // Only flood-fill neutral, bright pixels connected to an image edge so garment
    // colors and skin tones remain untouched.
    const isBackdrop = (offset) => {
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      return min >= 205 && max - min <= 34;
    };
    const visited = new Uint8Array(width * height);
    const queue = new Int32Array(width * height);
    let head = 0;
    let tail = 0;
    const enqueue = (x, y) => {
      const index = y * width + x;
      if (visited[index]) return;
      const offset = index * 4;
      if (!isBackdrop(offset)) return;
      visited[index] = 1;
      queue[tail++] = index;
    };
    for (let x = 0; x < width; x += 1) {
      enqueue(x, 0);
      enqueue(x, height - 1);
    }
    for (let y = 1; y < height - 1; y += 1) {
      enqueue(0, y);
      enqueue(width - 1, y);
    }
    while (head < tail) {
      const index = queue[head++];
      const x = index % width;
      const y = Math.floor(index / width);
      const offset = index * 4;
      data[offset] = 255;
      data[offset + 1] = 255;
      data[offset + 2] = 255;
      data[offset + 3] = 255;
      if (x > 0) enqueue(x - 1, y);
      if (x < width - 1) enqueue(x + 1, y);
      if (y > 0) enqueue(x, y - 1);
      if (y < height - 1) enqueue(x, y + 1);
    }
    context.putImageData(pixels, 0, 0);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const bytes = new Uint8Array(await blob.arrayBuffer());
    return { width, height, whitenedPixels: tail, bytes: Array.from(bytes) };
  }, { inputDataUrl, outputPath });
  await fs.writeFile(outputPath, Buffer.from(result.bytes));
  results.push({ file: path.basename(outputPath), width: result.width, height: result.height, whitenedPixels: result.whitenedPixels });
}

await browser.close();
console.log(JSON.stringify({ processed: results.length, results }, null, 2));
