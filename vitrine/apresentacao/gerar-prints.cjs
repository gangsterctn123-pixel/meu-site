// Gera os prints usados na vitrine e no PDF (pasta vitrine/img).
// Uso: node vitrine/apresentacao/gerar-prints.cjs   (requer Playwright)
const { chromium } = require('playwright');
const path = require('path');
const root = path.join(__dirname, '..');
const sites = ['padaria','barbearia','loja-roupas','hamburgueria','clinica-odontologica'];
(async () => {
  const b = await chromium.launch();
  for (const s of sites) {
    const url = 'file://' + path.join(root, s, 'index.html') + '?limpo';
    let p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: '*{animation:none!important}' });
    await p.screenshot({ path: path.join(root, 'img', s + '-desktop.jpg'), quality: 82, type: 'jpeg' });
    await p.screenshot({ path: path.join(root, 'img', s + '-full.jpg'), quality: 70, type: 'jpeg', fullPage: true });
    await p.close();
    p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: '*{animation:none!important}' });
    await p.screenshot({ path: path.join(root, 'img', s + '-mobile.jpg'), quality: 80, type: 'jpeg' });
    const ow = await p.evaluate(() => document.documentElement.scrollWidth);
    console.log(s, 'mobile scrollWidth', ow);
    await p.close();
  }
  await b.close();
})();
