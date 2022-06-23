const path = require("path");
const puppeteer = require("puppeteer");

const shortUUID = require("short-uuid");
const generator = shortUUID();

require("dotenv").config();

const { TRIAL_NUMBER, PEER_NUMBER } = process.env;

(async () => {
  // const browser = await puppeteer.launch({
  //   executablePath: "/usr/bin/google-chrome",
  //   args: ["--no-sandbox"],
  // });
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  page.on("console", (msg) => console.log("LOG:", msg.text()));

  // await page.goto(`file://${path.join(__dirname, "dist", "index.html")}`, {
  //   waitUntil: "networkidle0",
  // });
  await page.goto(
    "file:///C:/dev-ssd/%23p2p-collab/puppeteer/dist/index.html",
    {
      waitUntil: "networkidle0",
    }
  );
  await page.screenshot({ path: path.join(__dirname, "img", "test.png") });
  await page.evaluate(
    (id, trials, peers) => connectToRoom(id, trials, peers),
    generator.generate(),
    Number(TRIAL_NUMBER),
    Number(PEER_NUMBER)
  );

  // await browser.close();
})();
