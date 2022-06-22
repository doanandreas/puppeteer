const path = require("path");
const puppeteer = require("puppeteer");

require('dotenv').config()

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const PEER_ID = process.env.PEER_ID;

  page.on("console", (msg) => console.log("LOG:", msg.text()));

  await page.goto(`file://${path.join(__dirname, "dist", "index.html")}`, {
    waitUntil: "networkidle0",
  });
  await page.screenshot({ path: path.join(__dirname, "img", "test.png") });
  await page.evaluate((id) => connectToRoom(id), PEER_ID);

  // await browser.close();
})();
