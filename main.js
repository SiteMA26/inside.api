// ── Mobile menu ──────────────────────────────────────────
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── Navegação robusta (funciona em file://, GitHub Pages e hospedagem) ──
function goTo(page) {
  window.location.href = page;
}

function goToBlank(page) {
  window.open(page, '_blank');
}

// ── Fade-in on scroll ────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Smooth scroll para âncoras ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── Intercepta TODOS os links internos e força navegação JS ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    // Ignora: âncoras, externos (http/https com domínio diferente), wa.me
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    // Links internos (.html)
    if (href.endsWith('.html') || href.includes('.html#')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        if (link.getAttribute('target') === '_blank') {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      });
    }
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
});
