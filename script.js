(function () {
  'use strict';

  /* ================= Settings (edit freely) ================= */
  var START = new Date(2025, 7, 16, 0, 0, 0); // 16 Aug 2025 (month is 0-based)

  var WISHES = [
    'Hamesha aise hi muskurati rehna 😊',
    'Hum dono ka pyaar roz badhta rahe 💞',
    'Tere har sapne poore hon 🌙',
    'Har Diwali hum saath manayein 🪔',
    'Tu meri zindagi ki sabse badi khushi hai ❤️'
  ];

  var CAT_LINES = [
    'Meow! 😺 Happy Diwali Khushi!',
    'Purrr... tu bahut pyaari hai 💕',
    'Shivam tujhse bahut pyaar karta hai, meow 🪔',
    'Mujhe bhi ek diya chahiye 🐾',
    'Meow meow! Smile karo na ❤️',
    'Tu sabse cute hai, meow 😻'
  ];

  /* ================= Helpers ================= */
  function $(id) { return document.getElementById(id); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ================= SVG builders ================= */
  function diyaSVG() {
    return '<svg viewBox="0 0 120 120" class="diya-svg" aria-hidden="true">' +
      '<circle class="glow" cx="60" cy="46" r="48" fill="url(#gGlow)"/>' +
      '<path d="M8 64 Q60 122 112 64 Z" fill="url(#gClay)"/>' +
      '<circle cx="38" cy="84" r="3" fill="#ffd27a" opacity=".85"/>' +
      '<circle cx="60" cy="93" r="3" fill="#ffd27a" opacity=".85"/>' +
      '<circle cx="82" cy="84" r="3" fill="#ffd27a" opacity=".85"/>' +
      '<ellipse cx="60" cy="64" rx="52" ry="9" fill="#7a2e12"/>' +
      '<ellipse cx="60" cy="64" rx="44" ry="6" fill="#ffb938" opacity=".85"/>' +
      '<rect x="58" y="50" width="4" height="14" rx="2" fill="#3b1a0b"/>' +
      '<g class="flame">' +
      '<path d="M60 8 C75 26 78 40 60 52 C42 40 45 26 60 8 Z" fill="url(#gFlame)"/>' +
      '<path d="M60 28 C67 37 68 44 60 50 C52 44 53 37 60 28 Z" fill="#fff7c9" opacity=".9"/>' +
      '</g></svg>';
  }

  function catSVG(o) {
    var stripes = o.stripe ?
      '<path d="M70 32 L70 40 M61 34 L62 41 M79 34 L78 41" stroke="' + o.stripe + '" stroke-width="3" stroke-linecap="round" fill="none"/>' : '';
    return '<svg viewBox="0 0 140 150" class="cat-svg" aria-hidden="true">' +
      '<path class="tail" d="M104 128 C142 130 142 84 122 80" fill="none" stroke="' + o.body + '" stroke-width="12" stroke-linecap="round"/>' +
      '<ellipse cx="70" cy="112" rx="38" ry="32" fill="' + o.body + '"/>' +
      '<ellipse cx="70" cy="120" rx="22" ry="22" fill="' + o.belly + '"/>' +
      '<ellipse cx="52" cy="140" rx="13" ry="7" fill="' + o.body + '"/>' +
      '<ellipse cx="88" cy="140" rx="13" ry="7" fill="' + o.body + '"/>' +
      '<g class="head">' +
      '<polygon points="42,46 46,14 68,36" fill="' + o.body + '"/>' +
      '<polygon points="98,46 94,14 72,36" fill="' + o.body + '"/>' +
      '<polygon points="48,38 49,23 61,35" fill="#ffb3c7"/>' +
      '<polygon points="92,38 91,23 79,35" fill="#ffb3c7"/>' +
      '<circle cx="70" cy="62" r="31" fill="' + o.body + '"/>' +
      stripes +
      '<ellipse class="eye" cx="58" cy="62" rx="4.2" ry="5.4" fill="#2b1b2e"/>' +
      '<ellipse class="eye" cx="82" cy="62" rx="4.2" ry="5.4" fill="#2b1b2e"/>' +
      '<circle cx="59.5" cy="60" r="1.5" fill="#fff"/><circle cx="83.5" cy="60" r="1.5" fill="#fff"/>' +
      '<ellipse cx="48" cy="72" rx="6" ry="4" fill="#ff8fb1" opacity=".5"/>' +
      '<ellipse cx="92" cy="72" rx="6" ry="4" fill="#ff8fb1" opacity=".5"/>' +
      '<path d="M66 70 L74 70 L70 75 Z" fill="#ff7a9c"/>' +
      '<path d="M70 75 Q66 81 61 78 M70 75 Q74 81 79 78" fill="none" stroke="#2b1b2e" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="M46 74 L30 71 M46 78 L30 80 M94 74 L110 71 M94 78 L110 80" stroke="#5b4a5e" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round" fill="none"/>' +
      '<circle cx="70" cy="46" r="2.6" fill="#ff3b5c"/>' +
      '</g></svg>';
  }

  function rangoliSVG() {
    var cols = ['#ff7eb6', '#ffd27a', '#ff9a3c', '#b794ff'];
    var s = '<svg viewBox="-100 -100 200 200" class="rangoli-svg" aria-hidden="true">';
    var ring, i, n, r, rx, ry, ang;
    for (ring = 0; ring < 3; ring++) {
      n = 12 + ring * 4;
      r = 26 + ring * 26;
      rx = 6 + ring * 2;
      ry = 15 + ring * 4;
      for (i = 0; i < n; i++) {
        ang = (360 / n) * i;
        s += '<ellipse cx="0" cy="-' + r + '" rx="' + rx + '" ry="' + ry + '" fill="' + cols[(i + ring) % cols.length] +
          '" opacity=".55" transform="rotate(' + ang + ')"/>';
        s += '<circle cx="0" cy="-' + (r + ry + 5) + '" r="2" fill="#fff3c4" opacity=".8" transform="rotate(' + (ang + 180 / n) + ')"/>';
      }
    }
    s += '<circle cx="0" cy="0" r="10" fill="url(#gGold)"/></svg>';
    return s;
  }

  function ringsSVG() {
    return '<svg viewBox="-60 -40 120 80" class="rings-svg" aria-hidden="true">' +
      '<circle cx="-14" cy="8" r="22" fill="none" stroke="url(#gGold)" stroke-width="5"/>' +
      '<circle cx="14" cy="8" r="22" fill="none" stroke="url(#gGold)" stroke-width="5"/>' +
      '<path d="M0 -30 L6 -22 L0 -14 L-6 -22 Z" fill="#fff" opacity=".95"/></svg>';
  }

  /* ================= Inject illustrations ================= */
  Array.prototype.forEach.call(document.querySelectorAll('[data-diya]'), function (el) { el.innerHTML = diyaSVG(); });
  $('rangoli').innerHTML = rangoliSVG();
  $('rings').innerHTML = ringsSVG();

  var CAT_COLORS = {
    orange: { body: '#ffb347', belly: '#ffe2b8', stripe: '#e0862a' },
    grey: { body: '#b9c0d0', belly: '#eef1f8', stripe: '' }
  };
  Array.prototype.forEach.call(document.querySelectorAll('.cat'), function (btn) {
    var key = btn.getAttribute('data-cat');
    btn.querySelector('.cat-art').innerHTML = catSVG(CAT_COLORS[key] || CAT_COLORS.orange);
  });

  // Fairy lights
  (function () {
    var wrap = $('lights');
    var cols = ['#ffd27a', '#ff7eb6', '#ff9a3c', '#9be7ff', '#c7a6ff'];
    var count = window.innerWidth < 600 ? 14 : 28;
    for (var i = 0; i < count; i++) {
      var b = document.createElement('span');
      b.style.setProperty('--c', cols[i % cols.length]);
      b.style.setProperty('--dl', (i * 0.23).toFixed(2) + 's');
      wrap.appendChild(b);
    }
  })();

  /* ================= Sound (tiny chime) ================= */
  var actx = null;
  function chime(freq) {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!actx) actx = new AC();
      if (actx.state === 'suspended') actx.resume();
      var o = actx.createOscillator();
      var g = actx.createGain();
      var t = actx.currentTime;
      o.type = 'sine';
      o.frequency.value = freq || 880;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      o.connect(g);
      g.connect(actx.destination);
      o.start(t);
      o.stop(t + 1.3);
    } catch (e) { /* sound is optional */ }
  }

  /* ================= Canvas: sparkles + fireworks ================= */
  var canvas = $('fx');
  var ctx = canvas.getContext('2d');
  var W = 0, H = 0;
  var sparkles = [], parts = [], rockets = [];
  var COLORS = ['#ffd27a', '#ff7eb6', '#ff9a3c', '#ffffff', '#b794ff', '#7ee8fa'];
  var HEART_COLORS = ['#ff4d8d', '#ff7eb6', '#ff2e63', '#ffc2da'];

  function initSparkles() {
    var n = reduce ? 12 : (W < 600 ? 34 : 70);
    sparkles = [];
    for (var i = 0; i < n; i++) {
      sparkles.push({ x: rand(0, W), y: rand(0, H), r: rand(0.8, 2.2), vy: rand(0.08, 0.35), ph: rand(0, 6.28), sp: rand(0.6, 2) });
    }
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initSparkles();
  }
  window.addEventListener('resize', resize);
  resize();

  function burst(x, y, n) {
    var count = n || 60;
    var base = pick(COLORS);
    for (var i = 0; i < count; i++) {
      var a = Math.random() * Math.PI * 2;
      var sp = 1 + Math.random() * 4.5;
      parts.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: 0, max: 50 + Math.random() * 30,
        c: Math.random() < 0.7 ? base : pick(COLORS), s: 1.4 + Math.random() * 1.6
      });
    }
    if (parts.length > 1800) parts.splice(0, parts.length - 1800);
  }

  function heartBurst(x, y) {
    for (var i = 0; i < 80; i++) {
      var t = (i / 80) * Math.PI * 2;
      var vx = 16 * Math.pow(Math.sin(t), 3) * 0.2;
      var vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.2;
      parts.push({
        x: x, y: y, vx: vx + rand(-0.12, 0.12), vy: vy + rand(-0.12, 0.12),
        life: 0, max: 75 + Math.random() * 20, c: pick(HEART_COLORS), s: 1.8 + Math.random() * 1.2
      });
    }
    if (parts.length > 1800) parts.splice(0, parts.length - 1800);
  }

  function launch(heart) {
    rockets.push({ x: rand(W * 0.15, W * 0.85), y: H + 10, ty: rand(H * 0.15, H * 0.5), vy: -(7 + Math.random() * 2), heart: !!heart });
  }

  var last = 0;
  function frame(ts) {
    requestAnimationFrame(frame);
    if (document.hidden) { last = ts; return; }
    var dt = (ts - last) / 16.67;
    last = ts;
    if (!(dt > 0)) dt = 1;
    if (dt > 3) dt = 3;

    ctx.clearRect(0, 0, W, H);
    var t = ts / 1000, i, s, p, r;

    // sparkles
    for (i = 0; i < sparkles.length; i++) {
      s = sparkles[i];
      if (!reduce) s.y -= s.vy * dt;
      if (s.y < -6) { s.y = H + 6; s.x = rand(0, W); }
      var a = 0.25 + 0.65 * Math.abs(Math.sin(t * s.sp + s.ph));
      ctx.globalAlpha = a * 0.35;
      ctx.fillStyle = '#ffd27a';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 2.8, 0, 6.2832); ctx.fill();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#fff3c4';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
    }

    ctx.globalCompositeOperation = 'lighter';

    // rockets
    for (i = rockets.length - 1; i >= 0; i--) {
      r = rockets[i];
      r.y += r.vy * dt;
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffe9b0';
      ctx.fillRect(r.x - 1, r.y, 2, 10);
      if (r.y <= r.ty) {
        if (r.heart) heartBurst(r.x, r.y); else burst(r.x, r.y, 70);
        rockets.splice(i, 1);
      }
    }

    // particles
    for (i = parts.length - 1; i >= 0; i--) {
      p = parts[i];
      p.vx *= Math.pow(0.985, dt);
      p.vy = p.vy * Math.pow(0.985, dt) + 0.05 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life += dt;
      if (p.life >= p.max) { parts.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.2832); ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(function (ts) { last = ts; frame(ts); });

  /* ================= Floating hearts (DOM) ================= */
  function floatHeart(x, y, rise) {
    var s = document.createElement('span');
    s.className = 'fheart';
    s.textContent = pick(['❤️', '💖', '💕', '✨', '🪔', '💗']);
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.fontSize = Math.round(rand(16, 30)) + 'px';
    s.style.setProperty('--dx', Math.round(rand(-50, 50)) + 'px');
    s.style.setProperty('--dy', '-' + Math.round(rise || rand(110, 190)) + 'px');
    document.body.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 3200);
  }

  /* ================= Tap anywhere = small firework ================= */
  var lastTap = 0;
  document.addEventListener('pointerdown', function (e) {
    var now = Date.now();
    if (now - lastTap < 160) return;
    lastTap = now;
    if (e.target && e.target.closest && e.target.closest('button, a')) return;
    burst(e.clientX, e.clientY, 34);
  });

  /* ================= Live counter ================= */
  function tick() {
    var diff = Date.now() - START.getTime();
    if (diff < 0) diff = 0;
    var s = Math.floor(diff / 1000);
    $('cDays').textContent = Math.floor(s / 86400);
    $('cHours').textContent = Math.floor((s % 86400) / 3600);
    $('cMins').textContent = Math.floor((s % 3600) / 60);
    $('cSecs').textContent = s % 60;
  }
  tick();
  setInterval(tick, 1000);

  /* ================= Observers (scroll reveal) ================= */
  var finaleVisible = false;
  function setupObservers() {
    var items = document.querySelectorAll('.reveal');
    var chat = $('chat');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
      chat.classList.add('play');
      finaleVisible = true;
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          if (e.target.id === 'chat') e.target.classList.add('play');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });

    var fin = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { finaleVisible = e.isIntersecting; });
    }, { threshold: 0.3 });
    fin.observe($('finale'));
  }

  /* ================= Start (intro diya) ================= */
  var started = false;
  $('startBtn').addEventListener('click', function () {
    if (started) return;
    started = true;
    this.disabled = true;
    $('introDiya').classList.add('lit');
    chime(659);
    burst(W / 2, H * 0.35, 60);
    setTimeout(function () { launch(false); launch(true); }, 500);

    setTimeout(function () {
      $('intro').classList.add('hide');
      $('main').hidden = false;
      document.body.classList.remove('locked');
      document.body.classList.add('started');
      window.scrollTo(0, 0);
      setupObservers();
      Array.prototype.forEach.call(document.querySelectorAll('[data-autolit]'), function (el, i) {
        setTimeout(function () { el.classList.add('lit'); }, 900 + i * 350);
      });
    }, 1900);

    setTimeout(function () { $('intro').style.display = 'none'; }, 2900);
  });

  /* ================= Cats ================= */
  Array.prototype.forEach.call(document.querySelectorAll('.cat'), function (btn) {
    btn.addEventListener('click', function () {
      var say = btn.querySelector('.say');
      var next = pick(CAT_LINES);
      if (next === say.textContent) next = pick(CAT_LINES);
      say.textContent = next;
      btn.classList.remove('poke');
      void btn.offsetWidth;
      btn.classList.add('poke');
      var r = btn.getBoundingClientRect();
      for (var i = 0; i < 4; i++) {
        floatHeart(r.left + r.width / 2 + rand(-30, 30), r.top + r.height * 0.5, rand(90, 160));
      }
    });
  });

  /* ================= Wish diyas ================= */
  var NOTES = [523, 587, 659, 784, 880];
  var litCount = 0;
  var finaleOpen = false;
  var wishText = $('wishText');
  var wishCount = $('wishCount');

  function showWish(text) {
    wishText.textContent = text;
    wishText.classList.remove('swap');
    void wishText.offsetWidth;
    wishText.classList.add('swap');
  }

  function unlockFinale() {
    if (finaleOpen) return;
    finaleOpen = true;
    var fin = $('finale');
    fin.hidden = false;
    wishCount.textContent = 'Saare diye jal gaye ✨ aakhri surprise neeche hai';
    launch(false);
    setTimeout(function () { launch(true); }, 400);
    setTimeout(function () { launch(false); }, 800);
    setTimeout(function () { fin.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 500);
  }

  Array.prototype.forEach.call(document.querySelectorAll('.wish-diya'), function (btn) {
    btn.addEventListener('click', function () {
      var i = parseInt(btn.getAttribute('data-i'), 10) || 0;
      if (btn.classList.contains('lit')) { showWish(WISHES[i]); return; }
      btn.classList.add('lit');
      litCount++;
      chime(NOTES[i % NOTES.length]);
      var r = btn.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + 10, 40);
      showWish(WISHES[i]);
      if (litCount < WISHES.length) wishCount.textContent = litCount + '/' + WISHES.length + ' diye jale';
      if (litCount >= WISHES.length) setTimeout(unlockFinale, 1500);
    });
  });

  /* ================= Finale ================= */
  $('moreLove').addEventListener('click', function () {
    heartBurst(W / 2, H * 0.35);
    launch(true);
    setTimeout(function () { launch(true); }, 300);
    chime(784);
    for (var i = 0; i < 10; i++) {
      (function (k) {
        setTimeout(function () { floatHeart(rand(W * 0.1, W * 0.9), H - 20, H * 0.7); }, k * 120);
      })(i);
    }
  });

  setInterval(function () {
    if (!finaleOpen || !finaleVisible || document.hidden) return;
    launch(Math.random() < 0.5);
  }, 2200);

  setInterval(function () {
    if (!finaleOpen || !finaleVisible || document.hidden) return;
    floatHeart(rand(W * 0.05, W * 0.95), H - 10, H * 0.8);
  }, 700);
})();
