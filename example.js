const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
  });
  const page = await browser.newPage();
  await page.goto("http://google.com/");
  await page.screenshot({ path: "./img/google.png" });

  await browser.close();
})();
