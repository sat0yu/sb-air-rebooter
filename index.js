const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://172.16.255.254');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
