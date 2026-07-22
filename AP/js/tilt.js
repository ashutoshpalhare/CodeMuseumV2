/* ==========================================================================
   tilt.js — Vanilla JS 3D tilt effect for exhibit cards
   Replaces Framer Motion's useSpring/useTransform with requestAnimationFrame
   smoothing.
   ========================================================================== */

(function () {
  'use strict';

  var MAX_TILT = 8; // degrees
  var SPRING_STIFFNESS = 150;
  var SPRING_DAMPING = 20;
  var SPRING_MASS = 0.4;

  /**
   * Spring-animated value that eases toward a target.
   * Uses the same stiffness/damping/mass model as Framer Motion.
   */
  function SpringValue(initial) {
    this.current = initial;
    this.target = initial;
    this.velocity = 0;
    this._raf = null;
  }

  SpringValue.prototype.set = function (target) {
    this.target = target;
    if (this._raf === null) {
      this._loop();
    }
  };

  SpringValue.prototype._loop = function () {
    var dt = 1 / 60;
    var spring = SPRING_STIFFNESS;
    var damping = SPRING_DAMPING;
    var mass = SPRING_MASS;

    var force = -spring * (this.current - this.target) - damping * this.velocity;
    var acceleration = force / mass;
    this.velocity += acceleration * dt;
    this.current += this.velocity * dt;

    if (Math.abs(this.current - this.target) < 0.0005 && Math.abs(this.velocity) < 0.0005) {
      this.current = this.target;
      this.velocity = 0;
      this._raf = null;
      return;
    }

    var self = this;
    this._raf = requestAnimationFrame(function () {
      self._loop();
    });
  };

  /**
   * Attach tilt + spotlight to a single card element.
   */
  function attachTilt(card) {
    var body = card.querySelector('.exhibit-card-body');
    var spotlight = card.querySelector('.exhibit-spotlight');
    if (!body) return;

    var sx = new SpringValue(0.5);
    var sy = new SpringValue(0.5);
    var currentRx = 0;
    var currentRy = 0;

    function applyTransform() {
      currentRx = sy.current * (MAX_TILT * 2) - MAX_TILT;
      currentRy = sx.current * (MAX_TILT * 2) - MAX_TILT;
      body.style.transform =
        'perspective(1200px) rotateX(' + (-currentRx) + 'deg) rotateY(' + currentRy + 'deg)';

      if (spotlight) {
        var px = (sx.current * 100).toFixed(1);
        var py = (sy.current * 100).toFixed(1);
        spotlight.style.background =
          'radial-gradient(500px circle at ' + px + '% ' + py + '%, ' +
          'rgba(201, 162, 39, 0.20), ' +
          'rgba(47, 107, 79, 0.12) 28%, ' +
          'transparent 60%)';
      }
    }

    // Continuous RAF loop while hovered
    var rafActive = false;
    function rafLoop() {
      applyTransform();
      if (rafActive) {
        requestAnimationFrame(rafLoop);
      }
    }

    function startLoop() {
      if (!rafActive) {
        rafActive = true;
        rafLoop();
      }
    }

    function stopLoop() {
      rafActive = false;
    }

    card.addEventListener('pointermove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      sx.set(x);
      sy.set(y);
      startLoop();
    });

    card.addEventListener('pointerenter', function () {
      card.classList.add('is-active');
      startLoop();
    });

    card.addEventListener('pointerleave', function () {
      card.classList.remove('is-active');
      sx.set(0.5);
      sy.set(0.5);
      // Keep loop running briefly to ease back, then stop
      setTimeout(stopLoop, 600);
    });

    // Keyboard focus also activates the card
    body.addEventListener('focusin', function () {
      card.classList.add('is-active');
    });

    body.addEventListener('focusout', function () {
      card.classList.remove('is-active');
      sx.set(0.5);
      sy.set(0.5);
    });
  }

  // Expose globally
  window.MuseumTilt = {
    attach: attachTilt,
  };
})();
