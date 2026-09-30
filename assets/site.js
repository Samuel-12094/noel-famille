(function () {
  'use strict';

  /* =========================================================
     1. MENU MOBILE
     ========================================================= */
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

  /* =========================================================
     2. HEADER — changement d'état au scroll
     ========================================================= */
  var header = document.querySelector('.header');
  if (header) {
    var onScrollHeader = function () {
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle('is-scrolled', y > 120);
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /* =========================================================
     3. REVEAL GÉNÉRIQUE
     ========================================================= */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  /* =========================================================
     4. INTRO — révélation mot par mot
     ========================================================= */
  var manifesto = document.querySelector('.s-intro__manifesto[data-words]');
  var introRule = document.querySelector('.s-intro__rule');
  if (manifesto && !reduce) {
    // Découpe en mots, en conservant les <em>
    var walker = document.createTreeWalker(manifesto, NodeFilter.SHOW_TEXT, null);
    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (var t = 0; t < textNodes.length; t++) {
      var node = textNodes[t];
      var words = node.nodeValue.split(/(\s+)/);
      var frag = document.createDocumentFragment();
      for (var w = 0; w < words.length; w++) {
        var word = words[w];
        if (!word.trim()) {
          frag.appendChild(document.createTextNode(word));
          continue;
        }
        var span = document.createElement('span');
        span.textContent = word;
        frag.appendChild(span);
      }
      node.parentNode.replaceChild(frag, node);
    }

    var spans = manifesto.querySelectorAll('span');
    var revIO = new IntersectionObserver(function (entries) {
      for (var e = 0; e < entries.length; e++) {
        if (!entries[e].isIntersecting) continue;
        for (var si = 0; si < spans.length; si++) {
          spans[si].style.transitionDelay = (si * 40) + 'ms';
          spans[si].classList.add('is-on');
        }
        if (introRule) {
          setTimeout(function () {
            introRule.classList.add('is-on');
          }, 400 + spans.length * 40);
        }
        revIO.disconnect();
        break;
      }
    }, { threshold: 0.3 });
    revIO.observe(manifesto);
  } else {
    // fallback : tout visible
    var mSpans = manifesto ? manifesto.querySelectorAll('span') : [];
    for (var s = 0; s < mSpans.length; s++) mSpans[s].classList.add('is-on');
    if (introRule) introRule.classList.add('is-on');
  }

  /* =========================================================
     5. FRISE — dessin du fil vertical
     ========================================================= */
  var friseList = document.querySelector('.s-frise__list');
  if (friseList && 'IntersectionObserver' in window) {
    var filIO = new IntersectionObserver(function (entries) {
      for (var fi = 0; fi < entries.length; fi++) {
        if (!entries[fi].isIntersecting) continue;
        friseList.classList.add('is-on');
        filIO.disconnect();
        break;
      }
    }, { threshold: 0.15 });
    filIO.observe(friseList);
  } else if (friseList) {
    friseList.classList.add('is-on');
  }

  /* =========================================================
     6. HERO — rotation de la couronne (drag / molette / clavier)
     ========================================================= */
  var familleHero = document.querySelector('.hero-v2--famille');
  if (familleHero && !reduce) {
    var ring = familleHero.querySelector('.hero-v2__ring');
    var plates = Array.prototype.slice.call(familleHero.querySelectorAll('.hero-v2__plate'));

    if (ring && plates.length) {
      var applyRadius = function () {
        var stage = familleHero.querySelector('.hero-v2__stage');
        if (!stage) return;
        var r = stage.clientWidth * 0.335;
        for (var p = 0; p < plates.length; p++) {
          plates[p].style.setProperty('--r', r + 'px');
          plates[p].style.setProperty('--a', plates[p].dataset.angle || 0);
        }
      };

      var positions = [0, -60, -120, -180, -240, -300];
      var idx = 0;
      var dragX = 0, startX = 0, dragging = false;
      var ticking = false;

      var setRotation = function (deg, immediate) {
        ring.style.transition = immediate ? 'none' : 'transform .5s cubic-bezier(.2,.8,.3,1)';
        ring.style.transform = 'rotate(' + deg + 'deg)';
      };

      var settle = function () {
        idx = (idx % 6 + 6) % 6;
        setRotation(positions[idx], false);
        var active = plates[(idx + 3) % 6];
        for (var q = 0; q < plates.length; q++) plates[q].classList.remove('is-active');
        if (active) active.classList.add('is-active');
      };

      var wheelLock = false;
      familleHero.addEventListener('wheel', function (e) {
        var r = familleHero.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(d) < 4) return;
        if (wheelLock) return;
        wheelLock = true;
        idx += d > 0 ? 1 : -1;
        settle();
        setTimeout(function () { wheelLock = false; }, 550);
      }, { passive: true });

      var onDown = function (e) {
        dragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        dragX = positions[idx];
        ring.style.transition = 'none';
      };
      var onMove = function (e) {
        if (!dragging) return;
        var x = (e.touches ? e.touches[0].clientX : e.clientX);
        var d = (x - startX) * 0.35;
        ring.style.transform = 'rotate(' + (dragX + d) + 'deg)';
      };
      var onUp = function () {
        if (!dragging) return;
        dragging = false;
        var current = dragX;
        var m = /rotate\((-?\d+(?:\.\d+)?)deg\)/.exec(ring.style.transform);
        if (m) current = parseFloat(m[1]);
        var best = 0, bestDist = Infinity;
        for (var pi = 0; pi < positions.length; pi++) {
          var pv = positions[pi];
          var dist = Math.abs(((current - pv) % 360 + 540) % 360 - 180);
          if (dist < bestDist) { bestDist = dist; best = pi; }
        }
        idx = best;
        settle();
      };

      familleHero.addEventListener('mousedown', onDown);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      familleHero.addEventListener('touchstart', onDown, { passive: true });
      document.addEventListener('touchmove', onMove, { passive: true });
      document.addEventListener('touchend', onUp);

      familleHero.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { idx += 1; settle(); e.preventDefault(); }
        if (e.key === 'ArrowLeft')  { idx -= 1; settle(); e.preventDefault(); }
      });
      familleHero.setAttribute('tabindex', '0');

      applyRadius();
      settle();
      window.addEventListener('resize', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          applyRadius();
          ticking = false;
        });
      }, { passive: true });
    }
  }

  /* =========================================================
     7. CTA FINAL — assiette qui se lève
     ========================================================= */
  var ctaPart = document.querySelector('.cta-part');
  if (ctaPart) {
    ctaPart.addEventListener('click', function (e) {
      // Laisser le navigateur suivre le href : on n'a rien à bloquer.
      // On ajoute juste un état visuel avant la navigation.
      if (reduce) return;
      if (ctaPart.classList.contains('is-flipped')) return;
      ctaPart.classList.add('is-flipped');
      // ne pas bloquer : l'utilisateur est redirigé par le href
    });
  }

  /* =========================================================
     8. FAQ — accordéon exclusif (conservé)
     ========================================================= */
  var faqs = document.querySelectorAll('.faq details');
  if (faqs.length > 1) {
    for (var n = 0; n < faqs.length; n++) {
      faqs[n].addEventListener('toggle', function (ev) {
        if (!ev.target.open) return;
        for (var m = 0; m < faqs.length; m++) {
          if (faqs[m] !== ev.target) faqs[m].open = false;
        }
      });
    }
  }

})();