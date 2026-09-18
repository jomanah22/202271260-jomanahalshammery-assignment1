/* ==========================================================================
   Jomanah Alshammary - Portfolio Scripts (Assignment 1)
   1. Dark / light theme toggle (saved in localStorage)
   2. Mobile navigation
   3. Typing effect for the hero title
   4. Contact form feedback (no backend)
   5. Footer year
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

  /* ------------------------------------------------------------------
     4. Contact form
     No backend for this assignment: check the fields are filled in and
     the email looks valid, then show a confirmation message.
     ------------------------------------------------------------------ */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();

    status.classList.remove('is-success', 'is-error');

    if (!name || !email || !message) {
      status.textContent = 'Please fill in your name, email and message before sending.';
      status.classList.add('is-error');
      return;
    }

    // Simple shape check: something@something.something
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('is-error');
      return;
    }

    status.textContent = 'Thank you, ' + name + '! Your message has been received. I will get back to you at ' + email + '.';
    status.classList.add('is-success');
    form.reset();
  });

  /* ------------------------------------------------------------------
     5. Footer year
     ------------------------------------------------------------------ */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
