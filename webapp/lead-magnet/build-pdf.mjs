import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const src = "file://" + path.join(dir, "index.html").replace(/\\/g, "/");
const out = path.join(dir, "razbor-garderoba.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(src, { waitUntil: "networkidle" });
await page.pdf({
  path: out,
  width: "794px",
  height: "1123px",
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});
await browser.close();
console.log("PDF written to", out);
