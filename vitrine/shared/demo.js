// Mostra o selo "Modelo" com link de volta para a vitrine.
// Use ?limpo na URL para esconder (ex.: para tirar prints). Remova este script ao entregar ao cliente.
(function () {
  if (new URLSearchParams(location.search).has('limpo')) return;
  var a = document.createElement('a');
  a.className = 'demo-pill';
  a.href = '../';
  a.innerHTML = '<b>MODELO</b> ← Ver outros modelos';
  document.body.appendChild(a);
})();
