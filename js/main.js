/* EED Research Institute — Iteration C
   Vanilla JS only. No dependencies.

   Motion policy: every animated effect below checks prefersReduced() and,
   when set, jumps straight to the final state rather than animating. All
   scroll-linked work shares one rAF-throttled handler (see initScrollFx) so
   the page never runs competing scroll listeners. */
(function () {
  'use strict';

  var reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function prefersReduced() { return reducedQuery.matches; }

  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var list = document.querySelector('.nav-list');
    if (!toggle || !list) return;

    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- Nav submenu ----------
     CSS already handles pointer hover and :focus-within, so this layer only
     adds what CSS cannot: an explicit toggle, Escape, outside-click, and
     leaving-by-tab. Without JS the menu still opens on hover and on focus. */
  function initNavSubmenu() {
    var parents = document.querySelectorAll('.has-sub');
    if (!parents.length) return;

    function close(parent) {
      parent.classList.remove('open');
      var t = parent.querySelector('.nav-sub-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    }

    Array.prototype.forEach.call(parents, function (parent) {
      var toggle = parent.querySelector('.nav-sub-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var open = parent.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });

      /* Tabbing out of the group closes it. A null relatedTarget means focus
         left the document altogether — switching windows, or moving to browser
         chrome — which must NOT collapse the menu, so only act when we can see
         a real destination outside the group. */
      parent.addEventListener('focusout', function (e) {
        if (!e.relatedTarget) return;
        if (parent.contains(e.relatedTarget)) return;
        close(parent);
      });

      parent.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        close(parent);
        toggle.focus();
      });
    });

    document.addEventListener('click', function (e) {
      Array.prototype.forEach.call(parents, function (parent) {
        if (!parent.contains(e.target)) close(parent);
      });
    });
  }

  function initActiveNav() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-list a');
    Array.prototype.forEach.call(links, function (link) {
      if (link.getAttribute('href') !== current) return;
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });

    /* A pillar page marks "What We Do" as the active parent. Deliberately a
       different class from .active, and no aria-current — that belongs to the
       current page's own link only, and there must never be two. */
    var openSub = document.querySelector('.nav-sub a.active');
    if (!openSub) return;
    var parentLink = openSub.closest('.has-sub');
    parentLink = parentLink && parentLink.querySelector(':scope > a');
    if (parentLink) parentLink.classList.add('active-parent');
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    btn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReduced() ? 'auto' : 'smooth'
      });
    });
  }

  function initSmoothScroll() {
    var triggers = document.querySelectorAll('[data-scroll-to]');
    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function (e) {
        var target = document.querySelector(trigger.getAttribute('data-scroll-to'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReduced() ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  function initDemoForms() {
    var forms = document.querySelectorAll('[data-demo-form]');
    Array.prototype.forEach.call(forms, function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = form.querySelector('.form-note');
        if (note) note.textContent = 'Thank you — your inquiry has been received.';
        showToast('Inquiry sent');
        form.reset();
      });
    });
  }

  /* Team bio modal — opens from any [data-member] trigger, returns focus on
     close. Bios live in <template> elements rather than data- attributes so
     they can carry multiple paragraphs and links. */
  function initTeamModal() {
    var modal = document.getElementById('team-modal');
    if (!modal) return;

    var nameEl = modal.querySelector('[data-modal-name]');
    var roleEl = modal.querySelector('[data-modal-role]');
    var bioEl = modal.querySelector('[data-modal-bio]');
    var initialsEl = modal.querySelector('[data-modal-initials]');
    var photoEl = modal.querySelector('[data-modal-photo]');
    var closeBtn = modal.querySelector('.modal-close');
    var lastTrigger = null;
    var closeTimer = null;

    /* A portrait that fails to load must fall back to the initials block
       rather than showing a broken image. */
    if (photoEl) {
      photoEl.addEventListener('error', function () { photoEl.hidden = true; });
    }

    function open(trigger) {
      lastTrigger = trigger;
      window.clearTimeout(closeTimer);

      if (nameEl) nameEl.textContent = trigger.getAttribute('data-name') || '';
      if (roleEl) roleEl.textContent = trigger.getAttribute('data-role') || '';
      if (initialsEl) initialsEl.textContent = trigger.getAttribute('data-initials') || '';

      if (photoEl) {
        var photo = trigger.getAttribute('data-photo');
        if (photo) {
          photoEl.src = photo;
          photoEl.alt = trigger.getAttribute('data-name') || '';
          photoEl.hidden = false;
        } else {
          photoEl.hidden = true;
          photoEl.removeAttribute('src');
        }
      }

      if (bioEl) {
        bioEl.innerHTML = '';
        var tpl = document.getElementById(trigger.getAttribute('data-bio-id') || '');
        if (tpl && 'content' in tpl) {
          bioEl.appendChild(tpl.content.cloneNode(true));
        }
      }

      modal.classList.remove('closing');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      /* .open only flips display; the transition needs a second frame to have
         a start value to animate from. */
      if (prefersReduced()) {
        modal.classList.add('is-visible');
      } else {
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            /* Bail if the dialog was dismissed before these frames ran.
               Without this guard a fast open-then-close leaves .is-visible
               set, and the next open has no start value to animate from —
               so it snaps in instead of scaling up. */
            if (!modal.classList.contains('open')) return;
            if (modal.classList.contains('closing')) return;
            modal.classList.add('is-visible');
          });
        });
      }

      if (closeBtn) closeBtn.focus();
    }

    function finishClose() {
      modal.classList.remove('open', 'closing');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    }

    function close() {
      if (!modal.classList.contains('open')) return;
      modal.classList.remove('is-visible');

      if (prefersReduced()) { finishClose(); return; }

      modal.classList.add('closing');
      var exit = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--dur-exit')
      ) || 260;
      closeTimer = window.setTimeout(finishClose, exit);
    }

    var triggers = document.querySelectorAll('[data-member]');
    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function () { open(trigger); });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;

      if (e.key === 'Escape') { close(); return; }

      /* Keep Tab inside the dialog while it is open. */
      if (e.key !== 'Tab') return;
      var focusable = modal.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* Shared filter for portfolio + news: category tabs compose with a text query. */
  function initFilter(root) {
    var container = document.querySelector(root);
    if (!container) return;

    var tabs = container.querySelectorAll('.filter-tab');
    var search = container.querySelector('[data-filter-search]');
    var items = container.querySelectorAll('[data-category]');
    var empty = container.querySelector('.empty-state');
    var activeCategory = 'all';

    function apply() {
      var query = search ? search.value.trim().toLowerCase() : '';
      var visible = 0;

      Array.prototype.forEach.call(items, function (item) {
        var category = item.getAttribute('data-category');
        var matchesCategory = activeCategory === 'all' || category === activeCategory;
        var matchesQuery = !query || item.textContent.toLowerCase().indexOf(query) !== -1;
        var show = matchesCategory && matchesQuery;
        item.classList.toggle('hidden', !show);
        if (show) visible++;
      });

      if (empty) empty.classList.toggle('hidden', visible !== 0);
    }

    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        activeCategory = tab.getAttribute('data-filter') || 'all';
        apply();
      });
    });

    if (search) search.addEventListener('input', apply);
    apply();
  }

  function initLoadMore() {
    var btn = document.getElementById('load-more');
    if (!btn) return;
    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.textContent = 'All projects shown';
    });
  }

  /* ---------- Count-up ----------
     Reads the target straight from the element's existing text, so the markup
     never duplicates the number and the final value is what search engines
     and no-JS readers see. Prefix/suffix and zero-padding are preserved:
     "04" counts 00 -> 04, "150+" counts 000+ -> 150+. */
  function parseCountTarget(el) {
    var text = el.textContent.trim();
    var match = text.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!match) return null;

    var numStr = match[2];
    var clean = numStr.replace(/,/g, '');
    var value = parseFloat(clean);
    if (isNaN(value)) return null;

    var dot = clean.indexOf('.');
    return {
      prefix: match[1],
      suffix: match[3],
      value: value,
      decimals: dot === -1 ? 0 : clean.length - dot - 1,
      /* Only pad whole numbers, so "04" keeps its leading zero. */
      pad: dot === -1 ? numStr.length : 0,
      grouped: numStr.indexOf(',') !== -1
    };
  }

  function renderCount(el, spec, current) {
    var out = spec.decimals > 0
      ? current.toFixed(spec.decimals)
      : String(Math.round(current));

    if (spec.pad) { while (out.length < spec.pad) { out = '0' + out; } }
    if (spec.grouped) { out = Number(out).toLocaleString('en-US'); }

    el.textContent = spec.prefix + out + spec.suffix;
  }

  function runCount(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';

    var spec = parseCountTarget(el);
    if (!spec || prefersReduced()) return;   /* text already holds the final value */

    var duration = 1100;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);          /* easeOutCubic */
      renderCount(el, spec, spec.value * eased);
      if (t < 1) window.requestAnimationFrame(frame);
      else renderCount(el, spec, spec.value);      /* land exactly on target */
    }

    renderCount(el, spec, 0);
    window.requestAnimationFrame(frame);
  }

  /* ---------- Scroll reveals ----------
     One observer drives block reveals, staggered grids, drawn rules and
     count-ups. Children of [data-reveal-stagger] get an --i index so the
     per-item delay maths can stay in CSS. */
  function initReveal() {
    var selector = '[data-reveal], [data-reveal-stagger], [data-rule]';
    var items = document.querySelectorAll(selector);
    var counters = document.querySelectorAll('[data-count]');

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-reveal-stagger]'),
      function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) {
          /* Cap the index: beyond ~8 items the tail feels laggy rather than
             choreographed. */
          child.style.setProperty('--i', String(Math.min(i, 8)));
        });
      }
    );

    if (!items.length && !counters.length) return;

    if (prefersReduced() || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (item) {
        item.classList.add('in-view');
      });
      return;   /* counters keep their final text */
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        Array.prototype.forEach.call(
          entry.target.querySelectorAll('[data-count]'), runCount
        );
        if (entry.target.hasAttribute('data-count')) runCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(items, function (item) { observer.observe(item); });

    /* Counters that sit outside any revealed container still need a trigger. */
    Array.prototype.forEach.call(counters, function (counter) {
      if (!counter.closest(selector)) observer.observe(counter);
    });
  }

  /* ---------- Image header entrance ----------
     Applies to every .on-image block — the homepage hero and each inner page
     header. Adds .hero-ready once the frame is painted, then .hero-settled
     after the settle finishes so parallax can track scroll without easing
     behind it. */
  function initHero() {
    var blocks = document.querySelectorAll('.on-image');
    if (!blocks.length) return;

    var settle = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--dur-settle')
    ) || 900;

    function ready(el) {
      el.classList.add('hero-ready');
      window.setTimeout(function () { el.classList.add('hero-settled'); }, settle + 40);
    }

    Array.prototype.forEach.call(blocks, function (el) {
      if (prefersReduced()) { el.classList.add('hero-ready', 'hero-settled'); return; }
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { ready(el); });
      });
    });
  }

  /* ---------- Scroll effects ----------
     Sticky-header state, hero parallax and the article reading-progress bar,
     all on a single rAF-throttled scroll handler. */
  function initScrollFx() {
    var header = document.querySelector('.site-header');
    var heroImg = document.querySelector('.hero--image .hero-bg');
    var hero = document.querySelector('.hero--image');
    var progress = document.querySelector('.read-progress');
    var article = document.querySelector('.post-body');

    if (!header && !heroImg && !progress) return;

    var reduced = prefersReduced();
    var wide = window.matchMedia('(min-width: 900px)');
    var queued = false;

    function update() {
      queued = false;
      var y = window.pageYOffset || document.documentElement.scrollTop;

      if (header) header.classList.toggle('is-stuck', y > 40);

      /* Parallax: decorative layer only, small delta, desktop only. */
      if (heroImg && hero && !reduced && wide.matches) {
        var h = hero.offsetHeight || 1;
        if (y < h) {
          heroImg.style.setProperty('--py', (y * 0.08).toFixed(1) + 'px');
          heroImg.style.willChange = 'transform';
        } else if (heroImg.style.willChange) {
          /* Out of view — release the GPU hint rather than leaving it on. */
          heroImg.style.willChange = '';
        }
      }

      if (progress && article) {
        var rect = article.getBoundingClientRect();
        var total = rect.height - window.innerHeight;
        var done = total > 0 ? (-rect.top) / total : 1;
        progress.style.setProperty('--progress', Math.min(Math.max(done, 0), 1).toFixed(4));
      }
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    initNavSubmenu();
    initActiveNav();
    initBackToTop();
    initSmoothScroll();
    initDemoForms();
    initTeamModal();
    initFilter('[data-filter-root="portfolio"]');
    initFilter('[data-filter-root="news"]');
    initLoadMore();
    initReveal();
    initHero();
    initScrollFx();
  });
})();
