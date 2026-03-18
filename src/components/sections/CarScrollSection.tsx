'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ─── SVG Auto ─────────────────────────────────────────────────────────────────
function CarSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg"
      aria-label="Silhouette berlina Daunia Cars" role="img" className={className}>
      <ellipse cx="450" cy="272" rx="370" ry="12" fill="#000" opacity="0.35" />
      <path d="M90 215 L90 182 Q93 155 118 148 L230 135 Q268 85 330 68 L555 66 Q630 70 680 112 L762 130 Q810 140 820 162 L825 188 L825 215 Z"
        fill="#141416" stroke="#2A2A30" strokeWidth="1.5" />
      <path d="M238 135 Q278 83 335 68 L553 66 Q626 70 672 110 L690 132 L238 135 Z"
        fill="#1C1C22" stroke="#2A2A30" strokeWidth="1" />
      <path d="M345 70 L328 133 L460 133 L468 70 Z" fill="#1E3040" opacity="0.9" stroke="#2A4055" strokeWidth="0.8" />
      <path d="M475 70 L471 133 L655 132 L630 75 Z" fill="#1E3040" opacity="0.9" stroke="#2A4055" strokeWidth="0.8" />
      <path d="M345 70 L332 133" stroke="#2A4055" strokeWidth="2" opacity="0.5" />
      <line x1="465" y1="133" x2="470" y2="215" stroke="#2A2A30" strokeWidth="2" />
      <path d="M240 135 Q242 175 248 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M466 133 Q468 175 468 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M685 130 Q690 175 690 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M95 192 L820 192" stroke="#C41C0C" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M90 195 Q80 198 76 210 L82 215 L108 215 L108 195 Z" fill="#C41C0C" opacity="0.9" />
      <line x1="84" y1="200" x2="84" y2="212" stroke="#C0200A" strokeWidth="1.5" />
      <line x1="90" y1="198" x2="90" y2="214" stroke="#C0200A" strokeWidth="1.5" />
      <line x1="96" y1="197" x2="96" y2="214" stroke="#C0200A" strokeWidth="1.5" />
      <path d="M812 195 Q822 198 826 210 L820 215 L798 215 L798 195 Z" fill="#1C1C22" />
      <ellipse cx="100" cy="168" rx="16" ry="10" fill="#C0C8D8" opacity="0.9" />
      <ellipse cx="100" cy="168" rx="9" ry="6" fill="#E8F0FF" opacity="0.95" />
      <path d="M88 178 L116 178" stroke="#E8F0FF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <rect x="808" y="158" width="18" height="16" rx="3" fill="#C41C0C" opacity="0.95" />
      <rect x="810" y="160" width="14" height="12" rx="2" fill="#FF5533" opacity="0.6" />
      <path d="M128 215 Q128 170 175 170 Q222 170 222 215 Z" fill="#141416" />
      <circle cx="175" cy="228" r="44" fill="#141416" />
      <circle cx="175" cy="228" r="34" fill="#1E1E24" />
      <circle cx="175" cy="228" r="22" fill="#D0D0DC" opacity="0.9" />
      <circle cx="175" cy="228" r="9" fill="#2A2A30" />
      {[0,60,120,180,240,300].map((deg,i)=>{const r=(deg*Math.PI)/180;return<line key={i} x1={175+9*Math.cos(r)} y1={228+9*Math.sin(r)} x2={175+22*Math.cos(r)} y2={228+22*Math.sin(r)} stroke="#3A3A42" strokeWidth="2.5"/>})}
      <circle cx="175" cy="228" r="44" fill="none" stroke="#0A0A0C" strokeWidth="8" />
      <path d="M665 215 Q665 170 712 170 Q759 170 759 215 Z" fill="#141416" />
      <circle cx="712" cy="228" r="44" fill="#141416" />
      <circle cx="712" cy="228" r="34" fill="#1E1E24" />
      <circle cx="712" cy="228" r="22" fill="#D0D0DC" opacity="0.9" />
      <circle cx="712" cy="228" r="9" fill="#2A2A30" />
      {[0,60,120,180,240,300].map((deg,i)=>{const r=(deg*Math.PI)/180;return<line key={i} x1={712+9*Math.cos(r)} y1={228+9*Math.sin(r)} x2={712+22*Math.cos(r)} y2={228+22*Math.sin(r)} stroke="#3A3A42" strokeWidth="2.5"/>})}
      <circle cx="712" cy="228" r="44" fill="none" stroke="#0A0A0C" strokeWidth="8" />
      <path d="M340 67 L625 66" stroke="#3A3A42" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Skyline lontano (profilo edifici tall) ────────────────────────────────────
function FarSkyline() {
  return (
    <svg viewBox="0 0 1920 420" preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none" style={{ minWidth: '100%' }}>
      {/* Skyline compatto — grattacieli sfondo */}
      <path
        d="M0,420 L0,260 L45,260 L45,220 L55,210 L65,200 L75,210 L85,220 L85,260
           L130,260 L130,180 L140,165 L148,155 L156,165 L165,180 L165,260
           L210,260 L210,200 L220,190 L235,185 L250,190 L260,200 L260,260
           L300,260 L300,230 L310,215 L320,205 L330,215 L340,230 L340,260
           L380,260 L380,150 L390,135 L398,120 L406,110 L414,120 L422,135 L432,150 L432,260
           L470,260 L470,190 L480,178 L492,170 L504,178 L514,190 L514,260
           L550,260 L550,240 L558,225 L570,215 L582,225 L590,240 L590,260
           L640,260 L640,160 L650,145 L658,130 L666,120 L674,130 L682,145 L692,160 L692,260
           L730,260 L730,200 L742,188 L754,180 L766,188 L778,200 L778,260
           L820,260 L820,230 L830,215 L840,205 L850,215 L860,230 L860,260
           L910,260 L910,170 L918,155 L926,140 L934,125 L942,140 L950,155 L958,170 L958,260
           L1000,260 L1000,200 L1010,185 L1022,175 L1034,185 L1044,200 L1044,260
           L1090,260 L1090,220 L1100,205 L1110,195 L1120,205 L1130,220 L1130,260
           L1170,260 L1170,155 L1180,140 L1188,125 L1196,115 L1204,125 L1212,140 L1220,155 L1220,260
           L1265,260 L1265,195 L1275,182 L1285,172 L1295,182 L1305,195 L1305,260
           L1350,260 L1350,240 L1360,225 L1370,215 L1380,225 L1390,240 L1390,260
           L1430,260 L1430,160 L1440,145 L1450,130 L1460,120 L1470,130 L1480,145 L1490,160 L1490,260
           L1540,260 L1540,205 L1550,192 L1562,183 L1574,192 L1584,205 L1584,260
           L1630,260 L1630,230 L1640,218 L1650,208 L1660,218 L1670,230 L1670,260
           L1720,260 L1720,170 L1730,155 L1738,140 L1746,130 L1754,140 L1762,155 L1770,170 L1770,260
           L1820,260 L1820,195 L1830,182 L1840,172 L1850,182 L1860,195 L1860,260
           L1920,260 L1920,420 Z"
        fill="#1A1A2E"
      />
      {/* Antenne */}
      <line x1="406" y1="110" x2="406" y2="80" stroke="#22223A" strokeWidth="3"/>
      <circle cx="406" cy="78" r="4" fill="#C41C0C" opacity="0.6"/>
      <line x1="666" y1="120" x2="666" y2="88" stroke="#22223A" strokeWidth="3"/>
      <circle cx="666" cy="86" r="4" fill="#C41C0C" opacity="0.5"/>
      <line x1="934" y1="125" x2="934" y2="92" stroke="#22223A" strokeWidth="2.5"/>
      <circle cx="934" cy="90" r="3" fill="#C41C0C" opacity="0.6"/>
      <line x1="1196" y1="115" x2="1196" y2="82" stroke="#22223A" strokeWidth="3"/>
      <circle cx="1196" cy="80" r="4" fill="#C41C0C" opacity="0.55"/>
      <line x1="1460" y1="120" x2="1460" y2="88" stroke="#22223A" strokeWidth="3"/>
      <circle cx="1460" cy="86" r="4" fill="#C41C0C" opacity="0.5"/>
      <line x1="1746" y1="130" x2="1746" y2="98" stroke="#22223A" strokeWidth="2.5"/>
      <circle cx="1746" cy="96" r="3" fill="#C41C0C" opacity="0.55"/>
      {/* Finestre illuminate — caldi */}
      {[140,150,160,170,155,165].map((y,i)=>(
        <rect key={i} x={392+i*6} y={y} width="4" height="3" rx="0.5" fill="rgba(255,210,80,0.55)"/>
      ))}
      {[132,145,158,142,155,168].map((y,i)=>(
        <rect key={i} x={652+i*6} y={y} width="4" height="3" rx="0.5" fill="rgba(255,200,70,0.5)"/>
      ))}
      {[143,155,133,148,162,138].map((y,i)=>(
        <rect key={i} x={1182+i*6} y={y} width="4" height="3" rx="0.5" fill="rgba(255,215,80,0.5)"/>
      ))}
      {/* Finestre blu/fredde */}
      {[188,200,193,205,185,210].map((y,i)=>(
        <rect key={i} x={1276+i*5} y={y} width="4" height="3" rx="0.5" fill="rgba(130,170,255,0.4)"/>
      ))}
      {[175,188,165,178,195,170].map((y,i)=>(
        <rect key={i} x={1442+i*6} y={y} width="4" height="3" rx="0.5" fill="rgba(140,180,255,0.4)"/>
      ))}
    </svg>
  )
}

// ─── Skyline vicino (primo piano, più scuro) ────────────────────────────────────
function NearSkyline() {
  return (
    <svg viewBox="0 0 1920 200" preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '32%', minWidth: '100%' }}>
      <path
        d="M0,200 L0,80 L60,80 L60,60 L80,60 L80,80 L140,80 L140,40 L160,40 L160,80
           L240,80 L240,55 L270,55 L270,80 L340,80 L340,65 L365,65 L365,80
           L440,80 L440,45 L465,45 L465,80 L530,80 L530,60 L560,60 L560,80
           L640,80 L640,30 L665,30 L665,80 L730,80 L730,50 L758,50 L758,80
           L840,80 L840,65 L868,65 L868,80 L940,80 L940,42 L965,42 L965,80
           L1050,80 L1050,55 L1080,55 L1080,80 L1160,80 L1160,38 L1186,38 L1186,80
           L1260,80 L1260,58 L1290,58 L1290,80 L1370,80 L1370,44 L1396,44 L1396,80
           L1480,80 L1480,62 L1508,62 L1508,80 L1580,80 L1580,35 L1606,35 L1606,80
           L1700,80 L1700,52 L1728,52 L1728,80 L1800,80 L1800,68 L1830,68 L1830,80
           L1920,80 L1920,200 Z"
        fill="#0C0C18"
      />
    </svg>
  )
}

// ─── Luci bokeh (riflessi città) ──────────────────────────────────────────────
const BOKEH: { left: string; top: string; w: number; h: number; color: string; blur: number }[] = [
  { left: '2%',  top: '8%',  w: 90,  h: 55,  color: 'rgba(255,170,50,0.28)',   blur: 50 },
  { left: '9%',  top: '20%', w: 40,  h: 40,  color: 'rgba(130,160,255,0.22)',  blur: 28 },
  { left: '18%', top: '11%', w: 65,  h: 42,  color: 'rgba(255,200,80,0.22)',   blur: 38 },
  { left: '28%', top: '25%', w: 28,  h: 28,  color: 'rgba(200,220,255,0.18)',  blur: 18 },
  { left: '38%', top: '7%',  w: 100, h: 60,  color: 'rgba(196,28,12,0.16)',    blur: 60 },
  { left: '48%', top: '16%', w: 50,  h: 50,  color: 'rgba(80,140,255,0.2)',    blur: 32 },
  { left: '57%', top: '22%', w: 32,  h: 32,  color: 'rgba(255,155,60,0.24)',   blur: 22 },
  { left: '66%', top: '9%',  w: 75,  h: 48,  color: 'rgba(255,220,100,0.18)',  blur: 44 },
  { left: '75%', top: '18%', w: 55,  h: 38,  color: 'rgba(180,100,255,0.18)',  blur: 34 },
  { left: '83%', top: '13%', w: 42,  h: 42,  color: 'rgba(100,200,255,0.22)',  blur: 26 },
  { left: '91%', top: '24%', w: 60,  h: 40,  color: 'rgba(255,175,50,0.26)',   blur: 38 },
  { left: '96%', top: '9%',  w: 80,  h: 50,  color: 'rgba(196,28,12,0.14)',    blur: 48 },
]

// ─── Streaks di luce (scie luminose velocità) ─────────────────────────────────
const STREAKS = [
  { y: '28%', w: '35%', color: 'rgba(255,255,255,0.09)', h: 1,   left: '0%'  },
  { y: '32%', w: '18%', color: 'rgba(196,28,12,0.18)',   h: 1.5, left: '10%' },
  { y: '35%', w: '50%', color: 'rgba(255,255,255,0.06)', h: 1,   left: '20%' },
  { y: '38%', w: '25%', color: 'rgba(196,28,12,0.14)',   h: 2,   left: '5%'  },
  { y: '41%', w: '40%', color: 'rgba(255,255,255,0.07)', h: 1,   left: '30%' },
  { y: '44%', w: '20%', color: 'rgba(196,28,12,0.12)',   h: 1.5, left: '60%' },
  { y: '47%', w: '55%', color: 'rgba(255,255,255,0.05)', h: 1,   left: '15%' },
  { y: '50%', w: '30%', color: 'rgba(196,28,12,0.16)',   h: 2,   left: '40%' },
  { y: '53%', w: '45%', color: 'rgba(255,255,255,0.08)', h: 1,   left: '0%'  },
  { y: '56%', w: '22%', color: 'rgba(196,28,12,0.1)',    h: 1,   left: '70%' },
  { y: '59%', w: '60%', color: 'rgba(255,255,255,0.04)', h: 1.5, left: '8%'  },
  { y: '62%', w: '28%', color: 'rgba(196,28,12,0.13)',   h: 2.5, left: '50%' },
]

// ─── Componente principale ────────────────────────────────────────────────────
export default function CarScrollSection() {
  const spacerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start start', 'end end'],
  })

  // ── Macchina ──
  const carX = useTransform(scrollYProgress, [0, 1], ['-30vw', '130vw'])

  // ── Scia ──
  const trailOpacity = useTransform(scrollYProgress, [0, 0.15, 0.78, 1], [0, 0.9, 0.9, 0])
  const trailScaleX  = useTransform(scrollYProgress, [0, 0.15, 0.78, 1], [0, 1,   1,   0])

  // ── Parallax: skyline lontano si muove lento verso sinistra ──
  const farCityX  = useTransform(scrollYProgress, [0, 1], ['8vw', '-12vw'])
  // ── Parallax: skyline vicino si muove più veloce ──
  const nearCityX = useTransform(scrollYProgress, [0, 1], ['12vw', '-28vw'])

  // ── Intensità streaks e bokeh (appaiono con lo scroll) ──
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0])

  // ── Brand DAUNIA CARS ──
  const brandClip = useTransform(
    scrollYProgress,
    [0, 0.20, 0.50, 0.72, 1.0],
    ['inset(0 100% 0 0)', 'inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 100%)'],
  )

  // ── Tagline ──
  const taglineOpacity = useTransform(scrollYProgress, [0.28, 0.50, 0.72, 1.0], [0, 1, 1, 0])
  const taglineY       = useTransform(scrollYProgress, [0.28, 0.50], [14, 0])

  return (
    <>
      {/* ── Desktop ────────────────────────────────────────────────────────── */}
      <section
        ref={spacerRef}
        className="hidden md:block relative"
        style={{ height: '300vh' }}
        aria-label="Daunia Cars — in movimento su Parma"
      >
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh' }}
          aria-hidden="true"
        >

          {/* ── 1. SKY gradient ── */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #05050F 0%, #0A0A1C 22%, #0E0E1A 45%, #09090D 72%, #080810 100%)',
            }}
          />

          {/* ── 2. Bokeh city lights ── */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: sceneOpacity }}>
            {BOKEH.map((b, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: b.left,
                  top:  b.top,
                  width:  b.w,
                  height: b.h,
                  background: b.color,
                  filter: `blur(${b.blur}px)`,
                }}
              />
            ))}
          </motion.div>

          {/* ── 3. Far skyline (slow parallax) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ x: farCityX, opacity: sceneOpacity }}
          >
            <FarSkyline />
          </motion.div>

          {/* ── 4. Speed streaks ── */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: sceneOpacity }}>
            {STREAKS.map((s, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top:    s.y,
                  left:   s.left,
                  width:  s.w,
                  height: s.h,
                  background: s.color,
                  filter: 'blur(0.8px)',
                }}
              />
            ))}
          </motion.div>

          {/* ── 5. Road surface ── */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: '32%' }}
          >
            {/* Asfalto scuro */}
            <div className="absolute inset-0" style={{ background: '#07070C' }} />
            {/* Riflesso rosso sull'asfalto (luci posteriori) */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 60% 40% at 30% 20%, rgba(196,28,12,0.08) 0%, transparent 70%)',
              }}
            />
            {/* Riflesso bianco (fari) */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 40% 50% at 20% 30%, rgba(200,220,255,0.05) 0%, transparent 60%)',
              }}
            />
            {/* Linee centro strada */}
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
              style={{ width: '2px', background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 24px, transparent 24px, transparent 48px)' }}
            />
            {/* Margini stradali */}
            <div className="absolute top-0 left-0 right-0" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* ── 6. Near skyline (medium parallax, above road) ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ x: nearCityX, opacity: sceneOpacity }}
          >
            <NearSkyline />
          </motion.div>

          {/* ── 7. Griglia prospettica leggera ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
            }}
          />

          {/* ── 8. Brand DAUNIA CARS ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none"
            style={{ clipPath: brandClip }}
          >
            <span
              className="font-display font-black text-white leading-none tracking-tighter"
              style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', textShadow: '0 0 80px rgba(196,28,12,0.35), 0 0 160px rgba(196,28,12,0.15)' }}
            >
              DAUNIA
            </span>
            <span
              className="font-display font-black leading-none tracking-tighter"
              style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', color: '#C41C0C', textShadow: '0 0 60px rgba(196,28,12,0.7), 0 0 120px rgba(196,28,12,0.3)' }}
            >
              CARS
            </span>
          </motion.div>

          {/* ── 9. Tagline ── */}
          <motion.p
            className="absolute left-0 right-0 text-center select-none font-body text-text-muted tracking-[0.3em] uppercase pointer-events-none"
            style={{ bottom: '22%', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', opacity: taglineOpacity, y: taglineY, letterSpacing: '0.3em' }}
          >
            Noleggio &amp; Vendita Auto · Parma
          </motion.p>

          {/* ── 10. Auto + scia ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ bottom: '28%', left: 0, x: carX, willChange: 'transform' }}
          >
            {/* Alone luminoso sotto la macchina */}
            <div
              className="absolute"
              style={{
                bottom: '-8px',
                left: '10%',
                right: '10%',
                height: '20px',
                background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(196,28,12,0.25) 0%, transparent 100%)',
                filter: 'blur(6px)',
              }}
            />
            {/* Scia */}
            <motion.div
              className="absolute"
              style={{
                right: '100%',
                top: '20%',
                width: '60vw',
                height: '60%',
                background: 'linear-gradient(to right, transparent 0%, rgba(196,28,12,0.04) 50%, rgba(220,225,240,0.04) 100%)',
                filter: 'blur(12px)',
                transformOrigin: 'right center',
                scaleX: trailScaleX,
                opacity: trailOpacity,
              }}
            />
            {/* Cono luci anteriori */}
            <div
              className="absolute"
              style={{
                left: '-20%',
                top: '10%',
                width: '25%',
                height: '80%',
                background: 'linear-gradient(to left, transparent, rgba(220,235,255,0.06))',
                filter: 'blur(16px)',
              }}
            />
            <CarSVG className="relative z-10 w-[clamp(400px,50vw,760px)]" />
          </motion.div>

          {/* ── 11. Vignette bordi ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)',
            }}
          />

          {/* ── 12. Gradiente basso (sfuma nella sezione successiva) ── */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: '15%', background: 'linear-gradient(to top, #09090D 0%, transparent 100%)' }}
          />
        </div>
      </section>

      {/* ── Mobile: layout statico ── */}
      <div className="md:hidden w-full bg-bg py-12 px-5 flex flex-col items-center gap-5">
        <CarSVG className="w-[75vw] max-w-[320px]" />
        <div className="text-center">
          <p className="font-display font-black text-white leading-none tracking-tighter text-[clamp(1.75rem,10vw,2.5rem)]">DAUNIA</p>
          <p className="font-display font-black leading-none tracking-tighter text-[clamp(1.75rem,10vw,2.5rem)] text-accent">CARS</p>
          <p className="font-body text-text-muted text-[11px] uppercase tracking-[0.2em] mt-3">Noleggio &amp; Vendita Auto · Parma</p>
        </div>
      </div>
    </>
  )
}
