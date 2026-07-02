/**
 * Uutisseuranta UI Patterns — patterns.js
 * Perustuu d-cent/patterns kalles-styles.mustache JS-logiikkaan.
 * Tekninen rakenne vastaa uutisseuranta.github.io-konventiota (vanilla JS, ei jQuery-riippuvuutta).
 *
 * Issues implemented:
 *  #2  dark mode localStorage persistence + FOUC fix
 *  #3  initStickyHeaders: correct offset, ResizeObserver for dynamic width
 *  #4  initThemeToggle: dynamic aria-label + sun/moon icon swap
 *  #5  initTabs: arrow-key nav, roving tabindex, aria-labelledby on panels
 *  #8  refactored: initThemeToggle + initScrollNav moved here from inline script
 *  #9  initMobileNav: hamburger with aria, Escape key, focus management
 * #10  initScrollNav: no hardcoded active class, id="hero" tracked, fixed rootMargin
 * #13  initCommentToggle: Escape key dismiss, aria-expanded; tooltip scaffold
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. STICKY HEADER / TITLEBAR-FIXED
     Fix #3: remove el.offsetHeight from originalOffset;
             use ResizeObserver to keep width current.
     ========================================================================== */

  function initStickyHeaders() {
    var stickyElements = document.querySelectorAll('.sticky');
    if (!stickyElements.length) return;

    var fixedClass = 'titlebar-fixed';
    var stickies = [];

    stickyElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      // Fix #3: correct offset — rect.top + scrollY only, no + el.offsetHeight
      var originalOffset = rect.top + scrollY;

      // Fix #3: dynamic width via ResizeObserver instead of locked px value
      var updateWidth = function () {
        if (el.classList.contains(fixedClass)) {
          el.style.width = el.parentElement
            ? el.parentElement.getBoundingClientRect().width + 'px'
            : '';
        }
      };
      if (window.ResizeObserver) {
        new ResizeObserver(updateWidth).observe(el.parentElement || document.body);
      }

      stickies.push({ el: el, originalOffset: originalOffset, updateWidth: updateWidth });
    });

    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      stickies.forEach(function (sticky) {
        var wasFixed = sticky.el.classList.contains(fixedClass);
        var shouldFix = scrollTop >= sticky.originalOffset;
        if (shouldFix && !wasFixed) {
          sticky.el.classList.add(fixedClass);
          sticky.updateWidth();
        } else if (!shouldFix && wasFixed) {
          sticky.el.classList.remove(fixedClass);
          sticky.el.style.width = '';
        }
      });
    }, { passive: true });
  }

  /* ==========================================================================
     2. STREAM ITEM — INACTIVE / ACTIVE TOGGLE
     ========================================================================== */

  function initInactiveToggle() {
    var items = document.querySelectorAll('.stream-item');
    items.forEach(function (item) {
      item.addEventListener('focusin', function () {
        item.classList.remove('inactive');
      });
      item.addEventListener('focusout', function () {
        if (!item.contains(document.activeElement)) {
          item.classList.add('inactive');
        }
      });
    });
  }

  /* ==========================================================================
     3. COMMENT FIELD — NÄYTÄ/PIILOTA
     Fix #13: Escape key dismiss + aria-expanded on trigger.
     ========================================================================== */

  function initCommentToggle() {
    // Click: open/close comment field
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-toggle="comment-field"]');
      if (!trigger) return;

      var targetSelector = trigger.getAttribute('data-target');
      if (!targetSelector) return;
      var target = document.querySelector(targetSelector);
      if (!target) return;

      var isHidden = target.hidden || target.style.display === 'none' || !target.style.display;
      target.hidden = !isHidden;
      target.style.display = '';
      trigger.setAttribute('aria-expanded', String(!isHidden));

      if (!isHidden) return;
      var textarea = target.querySelector('textarea');
      if (textarea) textarea.focus();
    });

    // #13: Escape key dismisses open comment fields
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('[data-toggle="comment-field"]').forEach(function (trigger) {
        var targetSelector = trigger.getAttribute('data-target');
        if (!targetSelector) return;
        var target = document.querySelector(targetSelector);
        if (target && !target.hidden) {
          target.hidden = true;
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
        }
      });
    });
  }

  /* ==========================================================================
     4. TOOLTIP — SC 1.4.13 compliant pattern scaffold
     #13: dismissible (Escape), hoverable (pointer leaves trigger→tooltip delay),
          persistent (stays open until explicit dismiss or focus leaves).
     Usage: <button data-tooltip-trigger aria-describedby="tip1">...</button>
            <div role="tooltip" id="tip1" data-tooltip hidden>...</div>
     ========================================================================== */

  function initTooltips() {
    var HIDE_DELAY = 100; // ms — allows pointer to move from trigger into tooltip
    var triggers = document.querySelectorAll('[data-tooltip-trigger]');

    triggers.forEach(function (trigger) {
      var tooltipId = trigger.getAttribute('aria-describedby');
      if (!tooltipId) return;
      var tooltip = document.getElementById(tooltipId);
      if (!tooltip) return;

      var hideTimer = null;

      function showTooltip() {
        clearTimeout(hideTimer);
        tooltip.hidden = false;
      }

      function scheduleHide() {
        hideTimer = setTimeout(function () {
          tooltip.hidden = true;
        }, HIDE_DELAY);
      }

      // Hoverable: cancel hide when pointer enters the tooltip itself
      tooltip.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
      tooltip.addEventListener('mouseleave', scheduleHide);

      trigger.addEventListener('mouseenter', showTooltip);
      trigger.addEventListener('mouseleave', scheduleHide);
      trigger.addEventListener('focusin', showTooltip);
      trigger.addEventListener('focusout', scheduleHide);

      // Dismissible: Escape closes without moving focus
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !tooltip.hidden) {
          e.stopPropagation();
          tooltip.hidden = true;
        }
      });
    });
  }

  /* ==========================================================================
     5. EMBEDDED ITEM — KLIKKAUS
     ========================================================================== */

  function initEmbeddedItemClick() {
    document.addEventListener('click', function (e) {
      var item = e.target.closest('.embedded-item');
      if (!item) return;
      if (e.target.closest('a, button')) return;
      var link = item.querySelector('a[href]');
      if (link) window.location.href = link.href;
    });
  }

  /* ==========================================================================
     6. TABS — AKTIIVINEN VÄLILEHTI
     Fix #5: arrow-key navigation, roving tabindex, aria-labelledby on panels.
     ========================================================================== */

  function initTabs() {
    // Helper: activate a single tab within its tablist
    function activateTab(tab, tabList) {
      var tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

      // Roving tabindex: only active tab is in tab order
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        t.classList.remove('is-active');
      });
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.classList.add('is-active');

      // Show/hide panels + set aria-labelledby
      var panelId = tab.getAttribute('aria-controls');
      if (!panelId) return;
      var container = tabList.closest('[data-tabs]') || document;
      container.querySelectorAll('[role="tabpanel"]').forEach(function (panel) {
        panel.hidden = panel.id !== panelId;
        // #5: aria-labelledby — link panel back to its tab
        if (panel.id === panelId && tab.id) {
          panel.setAttribute('aria-labelledby', tab.id);
        }
      });
    }

    // Click handler
    document.addEventListener('click', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      var tabList = tab.closest('[role="tablist"]');
      if (!tabList) return;
      activateTab(tab, tabList);
      e.preventDefault();
    });

    // #5: Arrow-key navigation
    document.addEventListener('keydown', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      var tabList = tab.closest('[role="tablist"]');
      if (!tabList) return;

      var tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
      var idx = tabs.indexOf(tab);

      var next = null;
      if (e.key === 'ArrowRight') { next = tabs[(idx + 1) % tabs.length]; }
      if (e.key === 'ArrowLeft')  { next = tabs[(idx - 1 + tabs.length) % tabs.length]; }
      if (e.key === 'Home')       { next = tabs[0]; }
      if (e.key === 'End')        { next = tabs[tabs.length - 1]; }

      if (next) {
        e.preventDefault();
        activateTab(next, tabList);
        next.focus();
      }
    });

    // Init roving tabindex on existing tablists
    document.querySelectorAll('[role="tablist"]').forEach(function (tabList) {
      var tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
      var active = tabs.find(function (t) { return t.getAttribute('aria-selected') === 'true'; }) || tabs[0];
      if (active) activateTab(active, tabList);
    });
  }

  /* ==========================================================================
     7. NOTIFICATION — SULJE
     ========================================================================== */

  function initNotificationDismiss() {
    document.addEventListener('click', function (e) {
      var dismissBtn = e.target.closest('[data-dismiss="notification"]');
      if (!dismissBtn) return;
      var notification = dismissBtn.closest('.notification');
      if (!notification) return;

      var prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        notification.remove();
      } else {
        notification.style.transition = 'opacity 0.3s ease';
        notification.style.opacity = '0';
        setTimeout(function () { notification.remove(); }, 300);
      }
    });

    // #13: Escape dismisses notifications too
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var notification = document.querySelector('.notification');
      if (notification) notification.remove();
    });
  }

  /* ==========================================================================
     8. GROUP NAVIGATION — MOBILE PULLDOWN
     ========================================================================== */

  function initGroupNavPulldown() {
    var groupNavs = document.querySelectorAll('.group-navigation');
    groupNavs.forEach(function (nav) {
      var label = nav.querySelector('.group-navigation__label');
      var links = nav.querySelectorAll('a');
      if (!label || links.length < 2) return;

      var select = document.createElement('select');
      select.className = 'group-navigation__select';
      select.setAttribute('aria-label', label.textContent.trim());

      links.forEach(function (link) {
        var option = document.createElement('option');
        option.value = link.href;
        option.textContent = link.textContent.trim();
        if (link.classList.contains('nav__item-open') || link.getAttribute('aria-current')) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      select.addEventListener('change', function () {
        if (select.value) window.location.href = select.value;
      });

      nav.appendChild(select);
    });
  }

  /* ==========================================================================
     9. MOBILE NAV — HAMBURGER
     Fix #9: aria-expanded/controls/label, Escape key, focus management.
     ========================================================================== */

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function openNav() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Sulje navigaatio');
      var firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeNav() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Avaa navigaatio');
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) { closeNav(); } else { openNav(); }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });

    // Close when nav link is clicked (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 600) closeNav();
      });
    });
  }

  /* ==========================================================================
    10. THEME TOGGLE — dynamic aria-label + icon swap
     Fix #4: update aria-label and SVG icon on each toggle.
     Fix #2: persist to localStorage; read on init.
     Fix #8: moved here from inline script.
     ========================================================================== */

  var SUN_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  var MOON_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function syncThemeButton(btn, theme) {
    if (!btn) return;
    var isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Vaihda vaaleaan tilaan' : 'Vaihda pimeään tilaan');
    btn.innerHTML = isDark ? SUN_ICON : MOON_ICON;
  }

  function initThemeToggle() {
    var btn = document.getElementById('theme-toggle');
    var root = document.documentElement;

    // Read current theme (set by blocking script in <head>)
    var currentTheme = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    syncThemeButton(btn, currentTheme);

    if (!btn) return;
    btn.addEventListener('click', function () {
      currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      try { localStorage.setItem('theme', currentTheme); } catch (e) { /* sandboxed */ }
      syncThemeButton(btn, currentTheme);
    });
  }

  /* ==========================================================================
    11. SCROLL NAV — active link highlight
     Fix #10: no hardcoded active class; track hero section; safer rootMargin.
     Fix #8: moved here from inline script.
     ========================================================================== */

  function initScrollNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    // Clear any hardcoded active classes
    navLinks.forEach(function (l) { l.classList.remove('active'); });

    var currentId = null;

    // #10: track last visible section, wider rootMargin to avoid dead zone
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) currentId = e.target.id;
      });
      navLinks.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + currentId);
      });
    }, { rootMargin: '-20% 0px -70%' });

    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ==========================================================================
     INIT
     ========================================================================== */

  function init() {
    initStickyHeaders();
    initInactiveToggle();
    initCommentToggle();
    initTooltips();
    initEmbeddedItemClick();
    initTabs();
    initNotificationDismiss();
    initGroupNavPulldown();
    initMobileNav();
    initThemeToggle();
    initScrollNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
