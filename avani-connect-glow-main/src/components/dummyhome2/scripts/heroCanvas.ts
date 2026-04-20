/* ── CANVAS HERO BACKGROUND ──────────────────────────────
   Rich animated particle field + orbiting tech nodes +
   flowing grid lines — always renders, video overlays on top
─────────────────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  ph: number;
  ps: number;
  c: number; // 0 = gold | 1 = beige | 2 = white
}

interface GridLine {
  h: boolean;
  p: number;
  o: number;
  sp: number;
  a: number;
  w: number;
}

interface Orbit {
  r: number;
  angle: number;
  spd: number;
  ns: number;
  na: number;
}

interface StreamSegment {
  y: number;
  len: number;
  a: number;
}

interface Stream {
  x: number;
  segments: StreamSegment[];
  sp: number;
}

/* Colour base strings */
const G = 'rgba(201,168,76,';
const B = 'rgba(213,206,163,';
const W2 = 'rgba(255,255,255,';

function colStr(type: number, alpha: number): string {
  return (type === 0 ? G : type === 1 ? B : W2) + alpha + ')';
}

export function initHeroCanvas(canvas: HTMLCanvasElement): (() => void) {
  const cx = canvas.getContext('2d')!;
  let W: number;
  let H: number;
  let frame = 0;
  let animId: number;
  const mouse = { x: 0, y: 0 };

  /* ── Particle factory ── */
  function mkPt(): Particle {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.2 + 0.3,
      a: Math.random() * 0.55 + 0.1,
      ph: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.02 + 0.005,
      c: Math.random() > 0.65 ? 0 : Math.random() > 0.5 ? 1 : 2,
    };
  }

  /* ── Grid line factory ── */
  function mkLine(): GridLine {
    const h = Math.random() > 0.5;
    return {
      h,
      p: Math.random() * (h ? H : W),
      o: 0,
      sp: (Math.random() * 0.35 + 0.08) * (Math.random() > 0.5 ? 1 : -1),
      a: Math.random() * 0.07 + 0.018,
      w: Math.random() * 0.7 + 0.2,
    };
  }

  /* ── Orbit rings ── */
  const ORBITS: Orbit[] = Array.from({ length: 7 }, (_, i) => ({
    r: 100 + i * 75,
    angle: (i / 7) * Math.PI * 2,
    spd: (0.0012 + i * 0.00025) * (i % 2 ? 1 : -1),
    ns: 2.5 + Math.random() * 3,
    na: 0.2 + Math.random() * 0.25,
  }));

  /* ── Data stream lines (vertical scrolling) ── */
  const STREAMS: Stream[] = Array.from({ length: 14 }, () => ({
    x: Math.random() * (innerWidth * 0.5) + innerWidth * 0.5,
    segments: Array.from({ length: 8 }, () => ({
      y: Math.random() * innerHeight,
      len: 15 + Math.random() * 60,
      a: Math.random() * 0.2 + 0.05,
    })),
    sp: 0.5 + Math.random() * 1.5,
  }));

  let lines: GridLine[];
  let pts_arr: Particle[];

  function resize(): void {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }

  function init(): void {
    resize();
    pts_arr = Array.from({ length: 110 }, mkPt);
    lines = Array.from({ length: 18 }, mkLine);
  }

  function draw(): void {
    frame++;

    /* BG gradient */
    const bg = cx.createRadialGradient(W * 0.6, H * 0.3, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
    bg.addColorStop(0, '#1e1208');
    bg.addColorStop(0.45, '#110c07');
    bg.addColorStop(1, '#090604');
    cx.fillStyle = bg;
    cx.fillRect(0, 0, W, H);

    /* ── Light rays emanating top-right ── */
    const rcx = W * 0.78;
    const rcy = H * 0.1;
    for (let i = 0; i < 10; i++) {
      const ang = -0.6 + (i / 9) * 1.8 + frame * 0.0003;
      const len = 300 + Math.sin(frame * 0.008 + i) * 100;
      const grd = cx.createLinearGradient(rcx, rcy, rcx + Math.cos(ang) * len, rcy + Math.sin(ang) * len);
      grd.addColorStop(0, `rgba(201,168,76,${0.055 + Math.sin(frame * 0.009 + i) * 0.025})`);
      grd.addColorStop(1, 'rgba(201,168,76,0)');
      cx.beginPath();
      cx.moveTo(rcx, rcy);
      cx.lineTo(rcx + Math.cos(ang) * len, rcy + Math.sin(ang) * len);
      cx.strokeStyle = grd;
      cx.lineWidth = 1.8;
      cx.stroke();
    }

    /* ── Horizontal / vertical grid lines ── */
    lines.forEach((l) => {
      l.o += l.sp;
      const dim = l.h ? H : W;
      const pos = ((l.p + l.o) % dim + dim) % dim;
      cx.beginPath();
      if (l.h) {
        cx.moveTo(0, pos);
        cx.lineTo(W, pos);
      } else {
        cx.moveTo(pos, 0);
        cx.lineTo(pos, H);
      }
      cx.strokeStyle = G + l.a + ')';
      cx.lineWidth = l.w;
      cx.stroke();
    });

    /* ── Orbiting node system (right side) ── */
    const ocx = W * 0.78;
    const ocy = H * 0.42;
    ORBITS.forEach((o) => {
      o.angle += o.spd;
      const nx = ocx + Math.cos(o.angle) * o.r;
      const ny = ocy + Math.sin(o.angle) * o.r;

      cx.beginPath();
      cx.arc(ocx, ocy, o.r, 0, Math.PI * 2);
      cx.strokeStyle = G + '.038)';
      cx.lineWidth = 0.5;
      cx.stroke();

      cx.beginPath();
      cx.arc(nx, ny, o.ns, 0, Math.PI * 2);
      cx.fillStyle = G + o.na + ')';
      cx.fill();

      const glow = cx.createRadialGradient(nx, ny, 0, nx, ny, o.ns * 5);
      glow.addColorStop(0, G + (o.na * 0.55) + ')');
      glow.addColorStop(1, G + '0)');
      cx.beginPath();
      cx.arc(nx, ny, o.ns * 5, 0, Math.PI * 2);
      cx.fillStyle = glow;
      cx.fill();

      cx.beginPath();
      cx.moveTo(ocx, ocy);
      cx.lineTo(nx, ny);
      cx.strokeStyle = G + (o.na * 0.12) + ')';
      cx.lineWidth = 0.4;
      cx.stroke();
    });

    /* Central core glow */
    const core = cx.createRadialGradient(ocx, ocy, 0, ocx, ocy, 70);
    core.addColorStop(0, G + '.22)');
    core.addColorStop(0.5, G + '.05)');
    core.addColorStop(1, G + '0)');
    cx.beginPath();
    cx.arc(ocx, ocy, 70, 0, Math.PI * 2);
    cx.fillStyle = core;
    cx.fill();

    /* ── Vertical data streams (right portion) ── */
    STREAMS.forEach((s) => {
      s.segments.forEach((seg) => {
        seg.y = (seg.y + s.sp) % H;
        cx.beginPath();
        cx.moveTo(s.x, seg.y);
        cx.lineTo(s.x, seg.y + seg.len);
        const sgrd = cx.createLinearGradient(s.x, seg.y, s.x, seg.y + seg.len);
        sgrd.addColorStop(0, G + '0)');
        sgrd.addColorStop(0.4, G + seg.a + ')');
        sgrd.addColorStop(1, G + '0)');
        cx.strokeStyle = sgrd;
        cx.lineWidth = 0.6;
        cx.stroke();
      });
    });

    /* ── Particles + connection lines ── */
    pts_arr.forEach((p) => {
      p.x += p.vx + (mouse.x - W / 2) * 7e-5;
      p.y += p.vy + (mouse.y - H / 2) * 7e-5;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      p.ph += p.ps;
      const alpha = p.a * (0.65 + 0.35 * Math.sin(p.ph));

      pts_arr.forEach((q) => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 85 && d > 0) {
          cx.beginPath();
          cx.moveTo(p.x, p.y);
          cx.lineTo(q.x, q.y);
          cx.strokeStyle = G + ((1 - d / 85) * 0.055) + ')';
          cx.lineWidth = 0.35;
          cx.stroke();
        }
      });

      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fillStyle = colStr(p.c, alpha);
      cx.fill();
    });

    /* Bottom fade to black */
    const fade = cx.createLinearGradient(0, H * 0.55, 0, H);
    fade.addColorStop(0, 'rgba(9,6,4,0)');
    fade.addColorStop(1, 'rgba(9,6,4,.75)');
    cx.fillStyle = fade;
    cx.fillRect(0, H * 0.55, W, H * 0.45);

    /* Left edge fade */
    const lfade = cx.createLinearGradient(0, 0, W * 0.25, 0);
    lfade.addColorStop(0, 'rgba(9,6,4,.6)');
    lfade.addColorStop(1, 'rgba(9,6,4,0)');
    cx.fillStyle = lfade;
    cx.fillRect(0, 0, W * 0.25, H);

    animId = requestAnimationFrame(draw);
  }

  /* ── Event handlers ── */
  function onResize(): void {
    resize();
    pts_arr = Array.from({ length: 110 }, mkPt);
  }

  function onMouseMove(e: MouseEvent): void {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  init();
  draw();

  /* Return cleanup function */
  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onMouseMove);
  };
}
