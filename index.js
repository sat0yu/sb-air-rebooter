const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  // Access the control panel
  await page.goto('http://172.16.255.254');

  // Open the authentication modal window
  await page.click('a[href="javascript:btn_reboot_on();"]');

  // Fill credentials
  await page.type('#popinAuth #popinBox input#username', 'user');
  await page.type('#popinAuth #popinBox input#password', 'user');

  // Set an event handler for the confirmation dialog
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  });

  // Proceed the authentication (then, open the dialog)
  await page.click('#popinAuth #popinBox input#login');

  // Collect evidences
  await page.waitForNavigation({timeout: 10000}),
  await page.screenshot({path: 'result.png', fullPage: true});

  await browser.close();
})();
