/* Минимален JavaScript: навигация, илюстративен чат и реални линкове за изтегляне. */
(() => {
  'use strict';

  const config = window.BULGARIANCHAT_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const menuButton = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Отвори менюто');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Затвори менюто' : 'Отвори менюто');
      mobileNav.hidden = !willOpen;
      document.body.classList.toggle('menu-open', willOpen);
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closeMenu(); menuButton.focus(); }
    });
    document.addEventListener('click', event => {
      if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  // Всички съобщения са измислени и се показват само като демонстрация на дизайна.
  const demos = {
    general: { title: 'общ', subtitle: 'Примерен IRC канал', members: '12', messages: [
      ['М', 'Мария', '10:24', 'Здравейте! 👋 Как сте днес?', 'teal'],
      ['И', 'Иван', '10:25', 'Супер! Радвам се, че всички сме тук.', 'purple'],
      ['Аз', 'Ти', '10:26', 'Хубав ден на всички! ☀️', 'blue', true],
      ['Д', 'Дани', '10:27', 'Някой за разговор тази вечер?', 'orange']
    ]},
    friends: { title: 'приятели', subtitle: 'Примерен IRC канал', members: '8', messages: [
      ['Н', 'Ники', '11:02', 'Кой има планове за уикенда? 🙂', 'purple'],
      ['С', 'Силвия', '11:03', 'Мисля за разходка!', 'teal'],
      ['Аз', 'Ти', '11:04', 'Звучи чудесно.', 'blue', true],
      ['Н', 'Ники', '11:05', 'Супер, ще се чуем пак!', 'purple']
    ]},
    direct: { title: 'личен разговор', subtitle: 'Примерен личен чат', members: '2', messages: [
      ['М', 'Мария', '12:11', 'Здрасти! Имаш ли минутка?', 'teal'],
      ['Аз', 'Ти', '12:12', 'Разбира се. 😊', 'blue', true],
      ['М', 'Мария', '12:12', 'Исках само да кажа здравей!', 'teal']
    ]}
  };
  const demoPanel = $('#demo-panel');
  const demoChannel = $('#demo-channel');
  const demoDescription = $('#demo-description');
  const demoMembers = $('#demo-members');
  const tabs = Array.from(document.querySelectorAll('[data-demo-tab]'));
  const esc = str => String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function showDemo(name) {
    const data = demos[name];
    if (!data || !demoPanel || !demoChannel || !demoDescription || !demoMembers) return;
    tabs.forEach(tab => {
      const active = tab.dataset.demoTab === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    demoChannel.textContent = data.title;
    demoDescription.textContent = data.subtitle;
    demoMembers.textContent = data.members;
    const lines = data.messages.map(([initial, name, time, message, color, self]) => `
      <div class="chat-line${self ? ' chat-line--self' : ''}">
        <span class="chat-avatar chat-avatar--${color}">${esc(initial)}</span>
        <div><div class="chat-heading"><strong>${esc(name)}</strong><time>${esc(time)}</time></div><p>${esc(message)}</p></div>
      </div>`).join('');
    demoPanel.innerHTML = '<div class="date-pill">Днес</div>' + lines;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => showDemo(tab.dataset.demoTab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = i;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      tabs[next].focus(); showDemo(tabs[next].dataset.demoTab);
    });
  });

  function safeHttpsUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try { const u = new URL(value.trim()); return u.protocol === 'https:' ? u.href : ''; }
    catch { return ''; }
  }
  const playUrl = safeHttpsUrl(config.playStoreUrl);
  const apkUrl = safeHttpsUrl(config.apkUrl);
  const playLink = $('#play-link');
  const apkLink = $('#apk-link');
  if (playUrl && playLink) { playLink.href = playUrl; playLink.hidden = false; }
  if (apkUrl && apkLink) { apkLink.href = apkUrl; apkLink.hidden = false; }
  const pending = $('#download-pending');
  if (pending && (playUrl || apkUrl)) pending.hidden = true;


  // Показваме само действителни екранни снимки, добавени от разработчика.
  const screenshotPaths = config.screenshots || {};
  document.querySelectorAll('[data-screenshot]').forEach(card => {
    const img = card.querySelector('img');
    const placeholder = card.querySelector('.screenshot-placeholder');
    const path = screenshotPaths[card.dataset.screenshot];
    if (!img || typeof path !== 'string' || !/^assets\/screenshots\/[\w.-]+\.(?:png|jpg|jpeg|webp)$/i.test(path)) return;
    // Отделният Image зарежда дори когато визуалният img е скрит.
    const loader = new Image();
    loader.addEventListener('load', () => {
      img.src = path;
      img.hidden = false;
      if (placeholder) placeholder.hidden = true;
      const note = $('#screenshots-notice');
      if (note) note.hidden = true;
    }, { once: true });
    loader.src = path;
  });

  const email = typeof config.contactEmail === 'string' ? config.contactEmail.trim() : '';
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (emailIsValid) {
    const footerEmail = $('#footer-email');
    if (footerEmail) { footerEmail.href = 'mailto:' + encodeURIComponent(email); footerEmail.hidden = false; }
    document.querySelectorAll('[data-contact-email]').forEach(el => {
      el.textContent = email;
      el.href = 'mailto:' + encodeURIComponent(email);
      el.hidden = false;
    });
    document.querySelectorAll('[data-contact-pending]').forEach(el => el.hidden = true);
  }
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); } });
    }, { rootMargin: '0px 0px -35px 0px', threshold: .08 });
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
  }
})();
