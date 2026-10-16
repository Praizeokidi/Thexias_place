import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const assetDir = path.join(root, "public", "images", "products", "jorts");
const files = (await fs.readdir(assetDir)).filter((file) => file.endsWith(".webp") && !/-480\.webp$/i.test(file)).sort();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setContent("<!doctype html><html><body></body></html>");
const results = [];

for (const file of files) {
  const source = path.join(assetDir, file);
  const output = path.join(assetDir, file.replace(/\.webp$/i, "-480.webp"));
  const dataUrl = `data:image/webp;base64,${(await fs.readFile(source)).toString("base64")}`;
  const result = await page.evaluate(async ({ dataUrl }) => {
    const image = new Image();
    image.src = dataUrl;
    await image.decode();
    const width = Math.min(480, image.naturalWidth);
    const height = Math.round(image.naturalHeight * (width / image.naturalWidth));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.84));
    return { width, height, bytes: Array.from(new Uint8Array(await blob.arrayBuffer())) };
  }, { dataUrl });
  await fs.writeFile(output, Buffer.from(result.bytes));
  results.push({ file: path.basename(output), width: result.width, height: result.height, bytes: result.bytes.length });
}

await browser.close();
console.log(JSON.stringify({ processed: results.length, totalBytes: results.reduce((sum, item) => sum + item.bytes, 0), results }, null, 2));
