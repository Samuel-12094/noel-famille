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
