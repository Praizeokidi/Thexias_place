import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const assetDir = path.join(root, "public", "images", "products", "jorts");
const files = (await fs.readdir(assetDir)).filter((file) => file.endsWith(".png")).sort();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setContent("<!doctype html><html><body></body></html>");
const results = [];
for (const file of files) {
  const source = path.join(assetDir, file);
  const output = path.join(assetDir, file.replace(/\.png$/i, ".webp"));
  const dataUrl = `data:image/png;base64,${(await fs.readFile(source)).toString("base64")}`;
  const result = await page.evaluate(async ({ dataUrl }) => {
    const image = new Image();
    image.src = dataUrl;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d").drawImage(image, 0, 0);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.84));
    return { width: image.naturalWidth, height: image.naturalHeight, bytes: Array.from(new Uint8Array(await blob.arrayBuffer())) };
  }, { dataUrl });
  await fs.writeFile(output, Buffer.from(result.bytes));
  results.push({ file: path.basename(output), width: result.width, height: result.height, bytes: result.bytes.length });
}
await browser.close();
console.log(JSON.stringify({ processed: results.length, totalBytes: results.reduce((sum, item) => sum + item.bytes, 0), results }, null, 2));
