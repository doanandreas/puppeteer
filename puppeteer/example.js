const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("test:3000");
  await page.screenshot({ path: "./img/react.png" });

  await browser.close();
})();
