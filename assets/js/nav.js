document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var wrap = document.querySelector('.nav-wrap');
  if (!toggle || !wrap) return;
  toggle.addEventListener('click', function () {
    var isOpen = wrap.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});
