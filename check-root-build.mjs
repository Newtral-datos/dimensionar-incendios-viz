import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('console', (msg) => console.log('CONSOLE', msg.type(), msg.text()));
page.on('requestfailed', (req) => console.log('REQFAIL', req.url(), req.failure()?.errorText));
await page.goto('http://localhost:4175/', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(4000);
await page.screenshot({
	path: '/private/tmp/claude-501/-Users-miguel-ros-Desktop-TEMAS-Dimensionar-incendios/318c2ae8-251f-4f13-9c42-5dec93caae42/scratchpad/root-build-check.png'
});
await browser.close();
