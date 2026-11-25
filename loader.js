(() => {
  'use strict';

  const root = document.documentElement;
  const loader = document.querySelector('.loader');
  const page = document.querySelector('main');
  if (!loader || !page) {
    root.classList.remove('is-loading');
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 120 : 2500;
  const fade = reducedMotion ? 0 : 160;
  const elapsed = performance.now() - (window.loaderStartedAt ?? performance.now());
  page.inert = true;

  const reveal = () => {
    page.inert = false;
    loader.setAttribute('aria-hidden', 'true');
    loader.classList.add('is-leaving');
    page.classList.add('page-ready');
    window.setTimeout(() => {
      loader.remove();
      root.classList.remove('is-loading');
      window.clearTimeout(window.loaderFallback);
    }, fade);
  };

  window.setTimeout(reveal, Math.max(0, duration - elapsed));

  // Ao voltar pelo botão do navegador, a abertura não prende a página.
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      page.inert = false;
      loader.remove();
      root.classList.remove('is-loading');
      window.clearTimeout(window.loaderFallback);
    }
  });
})();
