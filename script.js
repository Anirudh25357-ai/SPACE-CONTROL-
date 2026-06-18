/* ============================================================
   SPACE CONTROL — Mission Command
   JavaScript: main.js
   ============================================================ */

/* ============================================================
   1. STARFIELD CANVAS ANIMATION
   ============================================================ */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 350; i++) {
      stars.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.5 + 0.2,
        a:     Math.random(),
        speed: Math.random() * 0.3 + 0.05,
        drift: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a    += s.speed * 0.01;
      s.x    += s.drift;
      if (s.x < 0)             s.x = canvas.width;
      if (s.x > canvas.width)  s.x = 0;
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.a));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,224,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  drawStars();
})();

/* ============================================================
   2. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
(function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Trigger counters inside revealed elements
        if (e.target.dataset.target) animateCounter(e.target);
        e.target.querySelectorAll('[data-target]').forEach(animateCounter);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   3. COUNTER ANIMATION
   ============================================================ */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const duration = 2200;
  const start    = performance.now();

  function step(now) {
    const p    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ============================================================
   4. TELEMETRY BAR FILL — triggered on panel reveal
   ============================================================ */
(function initTelemetryBars() {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.tel-fill').forEach(b => {
          b.style.transform = 'scaleX(1)';
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.control-panel').forEach(p => barObserver.observe(p));
})();

/* ============================================================
   5. KALPANA CHAWLA — Canvas Portrait Illustration
   ============================================================ */
(function initKalpanaPortrait() {
  const canvas = document.getElementById('kalpanaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = 420;
  canvas.height = 560;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* — Background deep space — */
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0,   '#06040e');
    bgGrad.addColorStop(0.6, '#0e0820');
    bgGrad.addColorStop(1,   '#020410');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* — Subtle background stars — */
    for (let i = 0; i < 80; i++) {
      const sx = Math.random() * canvas.width;
      const sy = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.random() * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,224,255,${Math.random() * 0.5 + 0.1})`;
      ctx.fill();
    }

    /* — Purple glow aura — */
    const aura = ctx.createRadialGradient(210, 240, 30, 210, 240, 220);
    aura.addColorStop(0, 'rgba(180,120,255,0.25)');
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* — Spacesuit body — */
    ctx.beginPath();
    ctx.ellipse(210, 460, 130, 140, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1035';
    ctx.fill();
    ctx.strokeStyle = 'rgba(180,120,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    /* — Chest detail — */
    ctx.beginPath();
    ctx.ellipse(210, 440, 90, 80, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#150d28';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,245,255,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    /* — NASA chest patch — */
    const patchGrad = ctx.createRadialGradient(210, 430, 0, 210, 430, 35);
    patchGrad.addColorStop(0, 'rgba(0,100,200,0.6)');
    patchGrad.addColorStop(1, 'rgba(0,50,120,0.3)');
    ctx.beginPath();
    ctx.arc(210, 430, 30, 0, Math.PI * 2);
    ctx.fillStyle = patchGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,245,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'bold 9px Orbitron,monospace';
    ctx.textAlign = 'center';
    ctx.fillText('NASA', 210, 434);

    /* — Neck — */
    ctx.beginPath();
    ctx.rect(185, 300, 50, 60);
    ctx.fillStyle = '#c8a87a';
    ctx.fill();

    /* — Head — */
    const headGrad = ctx.createRadialGradient(210, 230, 10, 210, 240, 80);
    headGrad.addColorStop(0,   '#d4a87a');
    headGrad.addColorStop(0.7, '#c08060');
    headGrad.addColorStop(1,   '#8a5040');
    ctx.beginPath();
    ctx.ellipse(210, 240, 70, 85, 0, 0, Math.PI * 2);
    ctx.fillStyle = headGrad;
    ctx.fill();

    /* — Hair — */
    ctx.beginPath();
    ctx.ellipse(210, 175, 72, 45, 0, Math.PI, Math.PI * 2);
    ctx.quadraticCurveTo(285, 200, 280, 240);
    ctx.quadraticCurveTo(285, 180, 210, 155);
    ctx.quadraticCurveTo(135, 180, 140, 240);
    ctx.quadraticCurveTo(138, 200, 148, 175);
    ctx.fillStyle = '#1a0a00';
    ctx.fill();

    /* — Hair flow — left — */
    ctx.beginPath();
    ctx.moveTo(145, 210);
    ctx.quadraticCurveTo(120, 280, 140, 330);
    ctx.quadraticCurveTo(150, 300, 160, 270);
    ctx.quadraticCurveTo(145, 250, 150, 210);
    ctx.fillStyle = '#1a0a00';
    ctx.fill();

    /* — Hair flow — right — */
    ctx.beginPath();
    ctx.moveTo(275, 210);
    ctx.quadraticCurveTo(300, 280, 280, 330);
    ctx.quadraticCurveTo(270, 300, 260, 270);
    ctx.quadraticCurveTo(275, 250, 270, 210);
    ctx.fillStyle = '#1a0a00';
    ctx.fill();

    /* — Eyes whites — */
    ctx.beginPath(); ctx.ellipse(185, 235, 10, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(235, 235, 10, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill();

    /* — Irises — */
    ctx.beginPath(); ctx.arc(185, 235, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#2a1500'; ctx.fill();
    ctx.beginPath(); ctx.arc(235, 235, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#2a1500'; ctx.fill();

    /* — Eye catch light — */
    ctx.beginPath(); ctx.arc(183, 233, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fill();
    ctx.beginPath(); ctx.arc(233, 233, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fill();

    /* — Eyebrows — */
    ctx.strokeStyle = '#1a0a00'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(173, 222); ctx.quadraticCurveTo(185, 218, 198, 222); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(222, 222); ctx.quadraticCurveTo(235, 218, 248, 222); ctx.stroke();

    /* — Nose — */
    ctx.strokeStyle = 'rgba(140,80,50,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(210, 240); ctx.quadraticCurveTo(205, 258, 200, 265); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(210, 240); ctx.quadraticCurveTo(215, 258, 220, 265); ctx.stroke();

    /* — Smile — */
    ctx.strokeStyle = 'rgba(140,70,50,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(210, 278, 18, 0.2, Math.PI - 0.2); ctx.stroke();

    /* — Helmet collar ring — */
    const ringGrad = ctx.createLinearGradient(120, 300, 300, 310);
    ringGrad.addColorStop(0,   '#2a2060');
    ringGrad.addColorStop(0.5, '#4a3090');
    ringGrad.addColorStop(1,   '#2a2060');
    ctx.beginPath(); ctx.ellipse(210, 310, 100, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = ringGrad; ctx.fill();
    ctx.strokeStyle = 'rgba(180,120,255,0.6)'; ctx.lineWidth = 2; ctx.stroke();

    /* — Visor reflection overlay — */
    const visor = ctx.createLinearGradient(160, 180, 270, 280);
    visor.addColorStop(0,   'rgba(0,200,255,0.05)');
    visor.addColorStop(0.5, 'rgba(180,120,255,0.08)');
    visor.addColorStop(1,   'rgba(0,200,255,0.03)');
    ctx.beginPath(); ctx.ellipse(210, 240, 80, 90, 0, 0, Math.PI * 2);
    ctx.fillStyle = visor; ctx.fill();

    /* — Indian flag patch on arm — */
    ctx.save(); ctx.translate(145, 410);
    ctx.beginPath(); ctx.rect(-25, -15, 50, 30); ctx.fillStyle = '#ff6600'; ctx.fill();
    ctx.beginPath(); ctx.rect(-25, -5,  50, 20); ctx.fillStyle = '#fff';    ctx.fill();
    ctx.beginPath(); ctx.rect(-25,  5,  50, 10); ctx.fillStyle = '#138808'; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.strokeStyle = '#000080'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();

    /* — Portrait label — */
    ctx.fillStyle = 'rgba(180,120,255,0.8)';
    ctx.font = 'bold 13px "Orbitron",monospace';
    ctx.textAlign = 'center';
    ctx.fillText('KALPANA CHAWLA', 210, 540);
    ctx.font = '10px "Share Tech Mono",monospace';
    ctx.fillStyle = 'rgba(200,224,255,0.4)';
    ctx.fillText('MISSION SPECIALIST · NASA', 210, 556);
  }

  draw();
})();

/* ============================================================
   6. RADAR / SIGNAL MAP ANIMATION
   ============================================================ */
(function initRadar() {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  canvas.width  = canvas.offsetWidth || 1200;
  canvas.height = 220;
  const ctx     = canvas.getContext('2d');
  let angle     = 0;
  const blips   = [];

  for (let i = 0; i < 12; i++) {
    blips.push({
      x:      80 + Math.random() * (canvas.width - 160),
      y:      20 + Math.random() * (canvas.height - 40),
      a:      Math.random() * 0.8 + 0.3,
      fadeAt: Math.random() * Math.PI * 2
    });
  }

  function drawRadar() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    /* Background */
    ctx.fillStyle = 'rgba(6,13,31,0.4)';
    ctx.fillRect(0, 0, w, h);

    /* Grid lines */
    ctx.strokeStyle = 'rgba(0,245,255,0.05)';
    ctx.lineWidth   = 1;
    for (let x = 0; x < w; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    const cx = w / 2, cy = h / 2;
    const maxR = Math.max(w, h);

    /* Sweep line */
    ctx.save();
    ctx.strokeStyle = 'rgba(0,245,255,0.6)';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
    ctx.stroke();

    /* Sweep trail */
    for (let t = 1; t <= 20; t++) {
      const ta    = angle - t * 0.04;
      const alpha = 0.3 * (1 - t / 20);
      ctx.strokeStyle = `rgba(0,245,255,${alpha})`;
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ta) * maxR, cy + Math.sin(ta) * maxR);
      ctx.stroke();
    }
    ctx.restore();

    /* Blips */
    blips.forEach((b, i) => {
      const ba   = Math.atan2(b.y - cy, b.x - cx);
      const diff = ((angle - ba) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      let   alpha = 0;
      if      (diff < 0.3)          alpha = 1;
      else if (diff < Math.PI * 1.5) alpha = Math.max(0, 1 - diff / (Math.PI * 1.5)) * 0.7;

      if (alpha > 0) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(0,245,255,${alpha})`;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = 'rgba(0,245,255,0.8)';
        ctx.fill();
        ctx.shadowBlur  = 0;

        if (alpha > 0.5) {
          ctx.font      = '9px "Share Tech Mono",monospace';
          ctx.fillStyle = `rgba(0,245,255,${alpha * 0.7})`;
          ctx.fillText(`OBJ-${String(i + 1).padStart(2, '0')}`, b.x + 8, b.y - 4);
        }
      }
    });

    /* CRT scan-lines overlay */
    for (let y = 0; y < h; y += 6) {
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.fillRect(0, y, w, 3);
    }

    angle += 0.015;
    if (angle > Math.PI * 2) angle -= Math.PI * 2;
    requestAnimationFrame(drawRadar);
  }

  drawRadar();
})();

/* ============================================================
   7. INTERACTIVE SOLAR SYSTEM ORRERY
   ============================================================ */
(function initSolarSystem() {
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight || 500;
  }
  resize();
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');

  const planets = [
    { name: 'Mercury', r: 5,  dist: 80,  speed: 0.047, color: '#a8a8a8', glow: 'rgba(168,168,168,0.4)' },
    { name: 'Venus',   r: 9,  dist: 120, speed: 0.035, color: '#e8c06a', glow: 'rgba(232,192,106,0.4)' },
    { name: 'Earth',   r: 10, dist: 170, speed: 0.029, color: '#4a90d9', glow: 'rgba(74,144,217,0.4)'  },
    { name: 'Mars',    r: 7,  dist: 220, speed: 0.024, color: '#d95030', glow: 'rgba(217,80,48,0.4)'   },
    { name: 'Jupiter', r: 22, dist: 300, speed: 0.013, color: '#c89060', glow: 'rgba(200,144,96,0.4)'  },
    { name: 'Saturn',  r: 18, dist: 390, speed: 0.009, color: '#ddb86a', glow: 'rgba(221,184,106,0.4)', ring: true },
    { name: 'Uranus',  r: 12, dist: 470, speed: 0.006, color: '#70d8e8', glow: 'rgba(112,216,232,0.4)' },
    { name: 'Neptune', r: 11, dist: 545, speed: 0.005, color: '#3050d0', glow: 'rgba(48,80,208,0.4)'   },
  ];

  let angles  = planets.map(() => Math.random() * Math.PI * 2);
  let hovered = -1;
  let scale   = 1;

  /* Hover detection */
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left;
    const my   = e.clientY - rect.top;
    const cx   = canvas.width  / 2;
    const cy   = canvas.height / 2;
    hovered = -1;
    planets.forEach((p, i) => {
      const px = cx + Math.cos(angles[i]) * p.dist * scale;
      const py = cy + Math.sin(angles[i]) * p.dist * scale;
      if (Math.hypot(mx - px, my - py) < p.r * scale + 8) hovered = i;
    });
    canvas.style.cursor = hovered >= 0 ? 'pointer' : 'default';
  });

  function draw() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight || 500;
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    scale = Math.min(w, h) / 700;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#020510';
    ctx.fillRect(0, 0, w, h);

    /* Orbit rings */
    planets.forEach(p => {
      ctx.beginPath();
      ctx.arc(cx, cy, p.dist * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,245,255,0.07)';
      ctx.lineWidth   = 1;
      ctx.stroke();
    });

    /* Sun */
    const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40 * scale);
    sunGrad.addColorStop(0,   '#fff8e0');
    sunGrad.addColorStop(0.3, '#ffa500');
    sunGrad.addColorStop(0.7, '#ff6000');
    sunGrad.addColorStop(1,   'transparent');
    ctx.beginPath(); ctx.arc(cx, cy, 38 * scale, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad; ctx.fill();

    /* Sun corona glow */
    ctx.beginPath(); ctx.arc(cx, cy, 50 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,160,0,0.15)';
    ctx.lineWidth   = 12 * scale;
    ctx.stroke();

    /* Planets */
    planets.forEach((p, i) => {
      const px = cx + Math.cos(angles[i]) * p.dist * scale;
      const py = cy + Math.sin(angles[i]) * p.dist * scale;

      /* Saturn's rings */
      if (p.ring) {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, 0.35);
        ctx.beginPath();
        ctx.arc(0, 0, (p.r + 14) * scale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(221,184,106,0.5)';
        ctx.lineWidth   = 5 * scale;
        ctx.stroke();
        ctx.restore();
      }

      /* Glow halo */
      const glowR = ctx.createRadialGradient(px, py, 0, px, py, p.r * scale * 2);
      glowR.addColorStop(0, p.color);
      glowR.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(px, py, p.r * scale * 2, 0, Math.PI * 2);
      ctx.fillStyle = p.glow; ctx.fill();

      /* Planet body */
      ctx.beginPath(); ctx.arc(px, py, p.r * scale, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      if (hovered === i) { ctx.shadowBlur = 20; ctx.shadowColor = p.glow; }
      ctx.fill();
      ctx.shadowBlur = 0;

      /* Hover label */
      if (hovered === i) {
        ctx.font      = `bold ${11 * scale}px "Share Tech Mono",monospace`;
        ctx.fillStyle = 'rgba(200,224,255,0.9)';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py - (p.r * scale + 12));
      }

      angles[i] += p.speed * 0.012;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ============================================================
   8. LIVE MISSION LOG — auto-appends new entries every 4s
   ============================================================ */
(function initMissionLog() {
  const msgs = [
    { t: 'warn',  m: 'Micrometeorite proximity alert — 3.2km separation.' },
    { t: 'ok',    m: 'Course correction burn complete. On nominal trajectory.' },
    { t: '',      m: 'Science payload collecting atmospheric particulate data.' },
    { t: 'ok',    m: 'Ground uplink re-established. Telemetry synced.' },
    { t: 'alert', m: 'Temperature spike in thruster B module. Auto-cooling active.' },
    { t: '',      m: 'Crew meal period. Low-activity monitoring mode.' },
    { t: 'ok',    m: 'EVA hatch sealed. Pressure nominal.' },
  ];
  let idx  = 0;
  let tSec = 0;

  setInterval(() => {
    tSec++;
    const log = document.getElementById('missionLog');
    if (!log) return;

    const m   = msgs[idx % msgs.length];
    const h   = String(Math.floor(tSec / 3600)).padStart(2, '0');
    const min = String(Math.floor((tSec % 3600) / 60)).padStart(2, '0');
    const s   = String(tSec % 60).padStart(2, '0');

    const entry       = document.createElement('div');
    entry.className   = 'log-entry';
    entry.innerHTML   = `<span class="log-time">T+${h}:${min}:${s}</span><span class="log-msg ${m.t}">${m.m}</span>`;
    log.insertBefore(entry, log.firstChild);

    if (log.children.length > 10) log.removeChild(log.lastChild);
    idx++;
  }, 4000);
})();
