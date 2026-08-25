(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var groupCounters = new Map();
  els.forEach(function (el) {
    var group = el.closest('[data-reveal-group]');
    var delay = 0;
    if (group) {
      var count = groupCounters.get(group) || 0;
      delay = count * 90;
      groupCounters.set(group, count + 1);
    }
    if (el.hasAttribute('data-reveal-delay')) {
      delay = parseInt(el.getAttribute('data-reveal-delay'), 10) || 0;
    }
    el.style.setProperty('--reveal-delay', delay + 'ms');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();
