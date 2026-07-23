import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message, e.stack?.slice(0, 300)));
page.on('console', (msg) => console.log('CONSOLE', msg.type(), msg.text().slice(0, 200)));
page.on('requestfailed', (req) =>
	console.log('REQFAIL', req.resourceType(), req.url(), req.failure()?.errorText)
);
page.on('request', (req) => {
	if (req.url().includes('worker') || req.url().startsWith('blob:')) {
		console.log('REQ', req.resourceType(), req.url());
	}
});
page.on('response', (res) => {
	if (res.url().includes('worker')) console.log('RESP', res.status(), res.url());
});
await page.goto('http://localhost:4176/dimensionar-incendios-viz/', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(4000);
await browser.close();
