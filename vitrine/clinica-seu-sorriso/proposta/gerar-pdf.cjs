// Gera o PDF da proposta a partir de proposta.html.
// 1) Edite o bloco CONFIG no topo de proposta.html (nome do cliente, seu WhatsApp, preço...)
// 2) Rode: node vitrine/clinica-seu-sorriso/proposta/gerar-pdf.cjs
// Requer Playwright: npm i -D playwright && npx playwright install chromium
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'proposta.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(__dirname, 'Proposta-Clinica-Seu-Sorriso.pdf');
  await page.pdf({ path: out, format: 'A4', landscape: false, printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('PDF gerado em', out);
})();
