/**
 * D-CENT UI Patterns — patterns.js
 */

(function () {
  'use strict';

  function activateTab(tab) {
    var tabList = tab.closest('[role="tablist"]');
    if (!tabList) return;

    tabList.querySelectorAll('[role="tab"]').forEach(function (t) {
      t.setAttribute('aria-selected', 'false');
      t.classList.remove('is-active');
      t.setAttribute('tabindex', '-1');
    });

    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('is-active');
    tab.setAttribute('tabindex', '0');

    var panelId = tab.getAttribute('aria-controls');
    if (!panelId) return;

    var container = tabList.closest('[data-tabs]') || document;
    container.querySelectorAll('[role="tabpanel"]').forEach(function (panel) {
      panel.hidden = panel.id !== panelId;
    });
  }

  function initStickyHeaders() {
    var stickyElements = document.querySelectorAll('.sticky');
    if (!stickyElements.length) return;

    var fixedClass = 'titlebar-fixed';
    var stickies = [];

    stickyElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var originalOffset = rect.top + scrollY;
      el.style.width = el.offsetWidth + 'px';
      stickies.push({ el: el, originalOffset: originalOffset });
    });

    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      stickies.forEach(function (sticky) {
        if (scrollTop >= sticky.originalOffset) {
          sticky.el.classList.add(fixedClass);
        } else {
          sticky.el.classList.remove(fixedClass);
        }
      });
    }, { passive: true });
  }

  function initInactiveToggle() {
    var items = document.querySelectorAll('.stream-item.inactive');
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

  function initCommentToggle() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-toggle="comment-field"]');
      if (!trigger) return;

      var targetSelector = trigger.getAttribute('data-target');
      if (!targetSelector) return;

      var target = document.querySelector(targetSelector);
      if (!target) return;

      var isHidden = target.style.display === 'none' || !target.style.display;
      target.style.display = isHidden ? 'block' : 'none';

      if (!isHidden) return;
      var textarea = target.querySelector('textarea');
      if (textarea) textarea.focus();
    });
  }

  function initEmbeddedItemClick() {
    document.addEventListener('click', function (e) {
      var item = e.target.closest('.embedded-item');
      if (!item) return;
      if (e.target.closest('a, button')) return;

      var link = item.querySelector('a[href]');
      if (link) {
        window.location.href = link.href;
      }
    });
  }

  function initTabs() {
    document.addEventListener('click', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      activateTab(tab);
      e.preventDefault();
    });

    document.addEventListener('keydown', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      var tabList = tab.closest('[role="tablist"]');
      if (!tabList) return;

      var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));
      var idx = tabs.indexOf(tab);
      var nextTab = null;

      if (e.key === 'ArrowRight') nextTab = tabs[(idx + 1) % tabs.length];
      if (e.key === 'ArrowLeft') nextTab = tabs[(idx - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') nextTab = tabs[0];
      if (e.key === 'End') nextTab = tabs[tabs.length - 1];

      if (!nextTab) return;
      nextTab.focus();
      activateTab(nextTab);
      e.preventDefault();
    });
  }

  function initNotificationDismiss() {
    document.addEventListener('click', function (e) {
      var dismissBtn = e.target.closest('[data-dismiss="notification"]');
      if (!dismissBtn) return;

      var notification = dismissBtn.closest('.notification');
      if (notification) {
        notification.style.transition = 'opacity 0.3s ease';
        notification.style.opacity = '0';
        setTimeout(function () {
          notification.remove();
        }, 300);
      }
    });
  }

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

  function initThemeToggle() {
    var button = document.querySelector('[data-theme-toggle]');
    var root = document.documentElement;
    var saved = localStorage.getItem('theme');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function updateLabel(current) {
      if (!button) return;
      button.setAttribute('aria-label', current === 'dark' ? 'Vaihda vaaleaan tilaan' : 'Vaihda pimeään tilaan');
    }

    root.setAttribute('data-theme', theme);
    updateLabel(theme);

    if (button) {
      button.addEventListener('click', function () {
        theme = theme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateLabel(theme);
      });
    }
  }

  function initScrollSpy() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    var currentSection = 'hero';

    function updateLinks() {
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
      });
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          currentSection = entry.target.id;
        }
      });
      updateLinks();
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(function (section) { obs.observe(section); });
    updateLinks();
  }

  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('#site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Sulje valikko' : 'Avaa valikko');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Avaa valikko');
      });
    });
  }

  function init() {
    initStickyHeaders();
    initInactiveToggle();
    initCommentToggle();
    initEmbeddedItemClick();
    initTabs();
    initNotificationDismiss();
    initGroupNavPulldown();
    initThemeToggle();
    initScrollSpy();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
