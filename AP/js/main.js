/* ==========================================================================
   main.js — Entry point, initializes all modules
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    // Projects module handles data loading, hero population, filter init,
    // and gallery rendering.
    if (window.MuseumProjects) {
      window.MuseumProjects.init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
