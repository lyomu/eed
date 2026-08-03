/* EED Research Institute — Iteration C
   Vanilla JS only. No dependencies. */
(function () {
  'use strict';

  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var list = document.querySelector('.nav-list');
    if (!toggle || !list) return;

    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
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
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initSmoothScroll() {
    var triggers = document.querySelectorAll('[data-scroll-to]');
    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function (e) {
        var target = document.querySelector(trigger.getAttribute('data-scroll-to'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  /* Team bio modal — opens from any [data-member] trigger, returns focus on close. */
  function initTeamModal() {
    var modal = document.getElementById('team-modal');
    if (!modal) return;

    var nameEl = modal.querySelector('[data-modal-name]');
    var roleEl = modal.querySelector('[data-modal-role]');
    var bioEl = modal.querySelector('[data-modal-bio]');
    var initialsEl = modal.querySelector('[data-modal-initials]');
    var closeBtn = modal.querySelector('.modal-close');
    var lastTrigger = null;

    function open(trigger) {
      lastTrigger = trigger;
      if (nameEl) nameEl.textContent = trigger.getAttribute('data-name') || '';
      if (roleEl) roleEl.textContent = trigger.getAttribute('data-role') || '';
      if (bioEl) bioEl.textContent = trigger.getAttribute('data-bio') || '';
      if (initialsEl) initialsEl.textContent = trigger.getAttribute('data-initials') || '';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
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

  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (item) { item.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(items, function (item) { observer.observe(item); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    initActiveNav();
    initBackToTop();
    initSmoothScroll();
    initDemoForms();
    initTeamModal();
    initFilter('[data-filter-root="portfolio"]');
    initFilter('[data-filter-root="news"]');
    initLoadMore();
    initReveal();
  });
})();
