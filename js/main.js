// ============================================================
// NAVIGATION – active link & mobile toggle
// ============================================================
(function () {
  const toggle  = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links   = navLinks ? navLinks.querySelectorAll('a') : [];

  // mobile hamburger
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // close on link click
    links.forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // highlight active section on scroll
  const sections = document.querySelectorAll('section[id]');
  function setActiveLink() {
    const scrollY = window.scrollY + 80;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id     = sec.getAttribute('id');
      const link   = navLinks ? navLinks.querySelector(`a[href="#${id}"]`) : null;
      if (link) {
        if (scrollY >= top && scrollY < bottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
})();

// ============================================================
// SCROLL-TO-TOP BUTTON
// ============================================================
(function () {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================================
// FADE-UP ANIMATION (IntersectionObserver)
// ============================================================
(function () {
  const els = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

// ============================================================
// SKILL BAR ANIMATION
// ============================================================
(function () {
  const fills = document.querySelectorAll('.skill-bar__fill[data-pct]');
  if (!('IntersectionObserver' in window)) {
    fills.forEach(el => { el.style.width = el.dataset.pct + '%'; });
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.pct + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(el => obs.observe(el));
})();

// ============================================================
// COUNTER ANIMATION
// ============================================================
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCount(el) {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1400;
    const start    = performance.now();
    function step(now) {
      const elapsed = now - start;
      const pct     = Math.min(elapsed / duration, 1);
      const ease    = 1 - Math.pow(1 - pct, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (pct < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCount);
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
})();

// ============================================================
// CONTACT FORM – sends message via WhatsApp
// ============================================================
(function () {
  const form = document.getElementById('contactForm');
  const msg  = document.getElementById('formMsg');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = (form.querySelector('#formName')    || {}).value || '';
    const email   = (form.querySelector('#formEmail')   || {}).value || '';
    const message = (form.querySelector('#formMessage') || {}).value || '';

    const text = encodeURIComponent(
      'Nama: ' + name + '\nEmail: ' + email + '\nPesan: ' + message
    );
    window.open('https://wa.me/6281261089777?text=' + text, '_blank', 'noopener,noreferrer');

    form.reset();
    if (msg) {
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 4000);
    }
  });
})();
