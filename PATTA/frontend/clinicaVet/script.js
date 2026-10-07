// Menu mobile
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

btn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  btn.setAttribute('aria-expanded', aberto);
});

menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menu.classList.remove('aberto');
    btn.setAttribute('aria-expanded', false);
  })
);

// Destaca o link da seção visível
const links = [...menu.querySelectorAll('a[href^="#"]')];
const secoes = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

const obs = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('ativo', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

secoes.forEach(s => obs.observe(s));