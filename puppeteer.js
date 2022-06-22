const path = require("path");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`file://${path.join(__dirname, "dist", "index.html")}`, {
    waitUntil: "networkidle0",
  });
  await page.screenshot({ path: path.join(__dirname, "img", "test.png") });
  await page.evaluate(() => connectToRoom("A"));

  await browser.close();
})();
