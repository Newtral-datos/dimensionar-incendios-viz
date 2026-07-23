import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('console', (msg) => {
	if (msg.type() === 'error') console.log('CONSOLE-ERR', msg.text());
});
page.on('response', (res) => {
	if (!res.ok()) console.log('BADRESP', res.status(), res.url());
});
page.on('requestfailed', (req) => console.log('REQFAIL', req.url(), req.failure()?.errorText));
page.on('console', (msg) => console.log('CONSOLE', msg.type(), msg.text()));

await page.goto('http://localhost:4176/dimensionar-incendios-viz/', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(10000);

const heroValue = await page.locator('.hero-value').textContent();
console.log('hero value:', heroValue?.trim());

const logoSrc = await page.locator('.logo').getAttribute('src');
console.log('logo src:', logoSrc);

await page.screenshot({
	path: '/private/tmp/claude-501/-Users-miguel-ros-Desktop-TEMAS-Dimensionar-incendios/318c2ae8-251f-4f13-9c42-5dec93caae42/scratchpad/deploy-check.png'
});

await browser.close();
