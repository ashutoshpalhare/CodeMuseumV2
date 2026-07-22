/* ==========================================================================
   animations.js — Scroll reveal, staggered entrance, filter transitions
   Replaces Framer Motion AnimatePresence with CSS transitions + RAF.
   ========================================================================== */

(function () {
  'use strict';

  /**
   * IntersectionObserver-based scroll reveal.
   * Adds .is-visible to elements with .reveal class when they enter viewport.
   */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Animate cards out before removing them from the DOM.
   * Returns a Promise that resolves when all cards have exited.
   */
  function animateCardsOut(container) {
    return new Promise(function (resolve) {
      var cards = container.querySelectorAll('.exhibit-card:not(.is-exiting)');
      if (!cards.length) {
        resolve();
        return;
      }
      var remaining = cards.length;
      cards.forEach(function (card) {
        card.classList.add('is-exiting');
        card.addEventListener('animationend', function handler() {
          card.removeEventListener('animationend', handler);
          remaining--;
          if (remaining === 0) resolve();
        });
      });
      // Safety timeout
      setTimeout(resolve, 400);
    });
  }

  /**
   * Stagger the entrance of newly rendered cards.
   */
  function staggerEntrance(container, baseDelay) {
    var cards = container.querySelectorAll('.exhibit-card:not(.is-exiting)');
    cards.forEach(function (card, i) {
      card.style.animationDelay = (baseDelay + i * 0.05) + 's';
    });
  }

  // Expose globally
  window.MuseumAnimations = {
    initScrollReveal: initScrollReveal,
    animateCardsOut: animateCardsOut,
    staggerEntrance: staggerEntrance,
  };
})();
