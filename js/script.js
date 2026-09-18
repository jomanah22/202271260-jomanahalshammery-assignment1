/* ==========================================================================
   Jomanah Alshammary - Portfolio Scripts (Assignment 1)
   1. Dark / light theme toggle (saved in localStorage)
   2. Mobile navigation
   3. Typing effect for the hero title
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ------------------------------------------------------------------
     1. Theme toggle
     The active theme lives on <html data-theme="...">. A small inline
     script in <head> applies the saved value before first paint; this
     part only handles the button and saving the choice.
     ------------------------------------------------------------------ */
  var themeToggle = document.getElementById('theme-toggle');

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) {
      return explicit;
    }
    // No saved choice yet: follow the operating system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateThemeLabel() {
    themeToggle.setAttribute(
      'aria-label',
      currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  themeToggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeLabel();
  });

  updateThemeLabel();

  /* ------------------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuToggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });

  // Close the menu after a link is chosen so the section is visible
  nav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* ------------------------------------------------------------------
     3. Typing effect
     Types the hero title one character at a time, then keeps a
     blinking cursor. The full text stays in the markup so the page
     reads correctly without JavaScript and for screen readers.
     ------------------------------------------------------------------ */
  var heroTitle = document.getElementById('hero-title');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroTitle && !reduceMotion) {
    var fullText = heroTitle.textContent.trim();
    var index = 0;

    heroTitle.setAttribute('aria-label', fullText);
    heroTitle.textContent = '';
    heroTitle.classList.add('is-typing');

    function typeNext() {
      heroTitle.textContent = fullText.slice(0, index + 1);
      index += 1;
      if (index < fullText.length) {
        setTimeout(typeNext, 80);
      }
    }

    setTimeout(typeNext, 400);
  }
})();
