(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!document.body.classList.contains('menu-open')) return;
      var nav = document.querySelector('.nav');
      if (nav && !nav.contains(e.target) && e.target !== toggle) {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !document.body.classList.contains('menu-open')) return;
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
  }

  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !targets.length) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-visible');
  } else {
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (!entries[j].isIntersecting) continue;
        entries[j].target.classList.add('is-visible');
        io.unobserve(entries[j].target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    for (var k = 0; k < targets.length; k++) {
      targets[k].style.transitionDelay = Math.min(k % 6, 5) * 70 + 'ms';
      io.observe(targets[k]);
    }
  }

  /* --- parallaxe légère dans le héros : l'image et le filigrane bougent
         à des vitesses différentes, ce qui crée la profondeur. Désactivé
         si l'utilisateur préfère réduire les animations. */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var hero = document.querySelector('.hero');
    if (hero) {
      var layers = [
        { el: hero.querySelector('.hero__img'), f: 14 },
        { el: hero.querySelector('.hero__star--a'), f: -10 },
        { el: hero.querySelector('.hero__star--b'), f: -18 },
        { el: hero.querySelector('.hero__badge'), f: 6 }
      ].filter(function (l) { return l.el; });

      var ticking = false;
      var apply = function () {
        ticking = false;
        var r = hero.getBoundingClientRect();
        if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
        var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        layers.forEach(function (l) {
          l.el.style.transform = 'translate3d(0,' + (p * l.f).toFixed(2) + 'px,0)';
        });
      };
      var onScroll = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(apply);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      apply();
    }
  }

  var faqs = document.querySelectorAll('.faq details');
  if (faqs.length > 1) {
    for (var n = 0; n < faqs.length; n++) {
      faqs[n].addEventListener('toggle', function (ev) {
        if (!ev.target.open) return;
        for (var m = 0; m < faqs.length; m++) if (faqs[m] !== ev.target) faqs[m].open = false;
      });
    }
  }
})();
