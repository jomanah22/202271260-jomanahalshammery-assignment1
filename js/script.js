/* ==========================================================================
   Jomanah Alshammary - Portfolio Scripts (Assignment 1)
   1. Dark / light theme toggle (saved in localStorage)
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
})();
