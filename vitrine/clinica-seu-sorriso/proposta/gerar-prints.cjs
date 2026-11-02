// Gera os prints da página da clínica usados na proposta (pasta proposta/img).
// Uso: node vitrine/clinica-seu-sorriso/proposta/gerar-prints.cjs   (requer Playwright)
const { chromium } = require('playwright');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const out = (n) => path.join(__dirname, 'img', n);
const css = '.reveal{opacity:1!important;transform:none!important;transition:none!important}*{animation:none!important}';

(async () => {
  const b = await chromium.launch();
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await m.goto(url, { waitUntil: 'networkidle' });
  await m.addStyleTag({ content: css + '.sticky{display:none!important}' });
  await m.screenshot({ path: out('m-hero.jpg'), type: 'jpeg', quality: 85 });
  for (const [sel, name, sticky] of [['#especialidades', 'm-servicos.jpg'], ['#clinica', 'm-galeria.jpg'], ['#sobre', 'm-sobre.jpg'], ['.final', 'm-final.jpg', true]]) {
    await m.evaluate((s) => window.scrollTo(0, document.querySelector(s).offsetTop), sel);
    if (sticky) await m.addStyleTag({ content: '.sticky{display:flex!important;transform:none!important}' });
    await m.waitForTimeout(150);
    await m.screenshot({ path: out(name), type: 'jpeg', quality: 85 });
  }
  const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto(url, { waitUntil: 'networkidle' });
  await d.addStyleTag({ content: css + '.sticky{display:none!important}' });
  await d.screenshot({ path: out('d-hero.jpg'), type: 'jpeg', quality: 82 });
  await b.close();
})();
