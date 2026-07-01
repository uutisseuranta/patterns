/**
 * D-CENT UI Patterns — patterns.js
 * Perustuu d-cent/patterns kalles-styles.mustache JS-logiikkaan.
 * Tekninen rakenne vastaa uutisseuranta.github.io-konventiota (vanilla JS, ei jQuery-riippuvuutta).
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. STICKY HEADER / TITLEBAR-FIXED
     Lisää luokan 'titlebar-fixed' .sticky-elementeille kun ne scrollaavat
     näkymän yläosan ohi. Vastaa alkuperäistä jQuery-logiikkaa.
     ========================================================================== */

  function initStickyHeaders() {
    var stickyElements = document.querySelectorAll('.sticky');
    if (!stickyElements.length) return;

    var fixedClass = 'titlebar-fixed';
    var stickies = [];

    stickyElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var originalOffset = rect.top + scrollY + el.offsetHeight;
      // Force same width when position changes to fixed
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

  /* ==========================================================================
     2. STREAM ITEM — INACTIVE / ACTIVE TOGGLE
     Hallitsee .inactive-luokan käyttöliittymätilaa stream-kohteissa.
     ========================================================================== */

  function initInactiveToggle() {
    // CSS hoitaa hover-efektin, mutta tarvittaessa JS-pohjainen toggle:
    var items = document.querySelectorAll('.stream-item');
    items.forEach(function (item) {
      item.addEventListener('focusin', function () {
        item.classList.remove('inactive');
      });
      item.addEventListener('focusout', function () {
        // Palauta inactive-tila vain jos ei ole valittuna
        if (!item.contains(document.activeElement)) {
          item.classList.add('inactive');
        }
      });
    });
  }

  /* ==========================================================================
     3. COMMENT FIELD — NÄYTÄ/PIILOTA
     Näyttää kommentointikentän kun "Kommentoi"-painiketta klikataan.
     ========================================================================== */

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

  /* ==========================================================================
     4. EMBEDDED ITEM — KLIKKAUS
     Ohjaa käyttäjän embedded-item-kohteen URL:iin.
     ========================================================================== */

  function initEmbeddedItemClick() {
    document.addEventListener('click', function (e) {
      var item = e.target.closest('.embedded-item');
      if (!item) return;
      // Älä navigoi jos klikkaus osui suoraan painikkeeseen tai linkkiin
      if (e.target.closest('a, button')) return;

      var link = item.querySelector('a[href]');
      if (link) {
        window.location.href = link.href;
      }
    });
  }

  /* ==========================================================================
     5. TABS — AKTIIVINEN VÄLILEHTI
     Hallitsee välilehtivalintaa .tabs-komponentissa.
     ========================================================================== */

  function initTabs() {
    document.addEventListener('click', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (!tab) return;

      var tabList = tab.closest('[role="tablist"]');
      if (!tabList) return;

      // Poista aktiivisuus kaikilta
      tabList.querySelectorAll('[role="tab"]').forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove('is-active');
      });

      // Aktivoi klikattu
      tab.setAttribute('aria-selected', 'true');
      tab.classList.add('is-active');

      // Piilota/näytä panel-sisällöt
      var panelId = tab.getAttribute('aria-controls');
      if (!panelId) return;

      var container = tabList.closest('[data-tabs]') || document;
      container.querySelectorAll('[role="tabpanel"]').forEach(function (panel) {
        panel.hidden = panel.id !== panelId;
      });

      e.preventDefault();
    });
  }

  /* ==========================================================================
     6. NOTIFICATION — SULJE
     Sulkee ilmoituksen [data-dismiss]-painikkeella.
     ========================================================================== */

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

  /* ==========================================================================
     7. GROUP NAVIGATION — MOBILE PULLDOWN
     Muuntaa .group-navigation-linkit pudotusvalikoksi mobiilissa.
     ========================================================================== */

  function initGroupNavPulldown() {
    var groupNavs = document.querySelectorAll('.group-navigation');
    groupNavs.forEach(function (nav) {
      var label = nav.querySelector('.group-navigation__label');
      var links = nav.querySelectorAll('a');
      if (!label || links.length < 2) return;

      // Luo select-elementti mobiilia varten
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
     INIT
     ========================================================================== */

  function init() {
    initStickyHeaders();
    initInactiveToggle();
    initCommentToggle();
    initEmbeddedItemClick();
    initTabs();
    initNotificationDismiss();
    initGroupNavPulldown();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
