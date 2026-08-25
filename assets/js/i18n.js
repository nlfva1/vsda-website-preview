function initI18n(translations, storageKey) {
  storageKey = storageKey || 'lang';

  function applyLanguage(lang) {
    var code = translations[lang] ? lang : 'nl';
    var d = translations[code];
    document.documentElement.setAttribute('lang', code);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = d[key] != null ? d[key] : translations.nl[key];
      if (val == null) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var val = d[key] != null ? d[key] : translations.nl[key];
      if (val != null) el.setAttribute('aria-label', val);
    });

    if (d.title) document.title = d.title;
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && d.meta_description) descMeta.setAttribute('content', d.meta_description);

    try { localStorage.setItem(storageKey, code); } catch (e) {}
  }

  function detectInitialLanguage() {
    var saved;
    try { saved = localStorage.getItem(storageKey); } catch (e) {}
    if (saved && translations[saved]) return saved;
    var navLang = ((navigator.language || navigator.userLanguage || 'nl') + '').slice(0, 2).toLowerCase();
    if (translations[navLang]) return navLang;
    return 'nl';
  }

  var langSwitch = document.getElementById('langSwitch');
  if (!langSwitch) return;
  var initialLang = detectInitialLanguage();
  langSwitch.value = initialLang;
  applyLanguage(initialLang);
  langSwitch.addEventListener('change', function () {
    applyLanguage(this.value);
  });
}
