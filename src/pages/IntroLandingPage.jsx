import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import postHeroBackground from '../../image.png'

const FALLBACK_PROPERTY_IMAGE = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80'

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: auto; }
  body { background: #08090d; color: #e8e3d8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; cursor: none !important; }
  * { cursor: none !important; }

  @keyframes scrollDrop {
    0%   { transform: translateY(-100%); opacity: 0; }
    30%  { opacity: 1; }
    100% { transform: translateY(200%); opacity: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulseGold {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }

  .nest-card {
    background: linear-gradient(135deg, #13151c, #0d0f16);
    border: 1px solid rgba(201,169,110,0.18);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
  .nest-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(201,169,110,0.06), transparent 60%);
    pointer-events: none;
  }
  .nest-card:hover {
    border-color: rgba(201,169,110,0.4);
    transition: border-color 0.4s ease;
  }

  .feat-item {
    background: #08090d;
    padding: 2.5rem 2rem;
    transition: background 0.3s;
  }
  .feat-item:hover { background: #0d0f14; }

  .cta-primary {
    background: #c9a96e;
    color: #08090d;
    padding: 0.8rem 2.2rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    transition: background 0.3s, transform 0.2s;
  }
  .cta-primary:hover { background: #ddbf8a; transform: translateY(-2px); }

  .nav-cta {
    border: 1px solid rgba(201,169,110,0.5);
    color: #c9a96e;
    padding: 0.5rem 1.4rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-decoration: none;
    background: transparent;
    transition: all 0.3s;
    display: inline-block;
  }
  .nav-cta:hover { background: rgba(201,169,110,0.1); border-color: #c9a96e; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #08090d; }
  ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 2px; }
`

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', move)
    let raf
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top = pos.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#c9a96e',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          willChange: 'left,top'
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%,-50%)',
          willChange: 'left,top'
        }}
      />
    </>
  )
}

function PropertyCard({ img, tag, title, address, price, est, beds, sqft, view, style }) {
  return (
    <div className="nest-card" style={style}>
      {img && (
        <img
          src={img}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = FALLBACK_PROPERTY_IMAGE
          }}
          alt={typeof title === 'string' ? title : 'property'}
          style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', filter: 'brightness(0.82) saturate(0.85)' }}
        />
      )}
      <div style={{ padding: '1.3rem 1.5rem 1.6rem' }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '0.45rem' }}>{tag}</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.2, color: '#e8e3d8', marginBottom: '0.3rem' }}>{title}</div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(232,227,216,0.38)', letterSpacing: '0.03em', marginBottom: '0.85rem' }}>{address}</div>
        <div style={{ height: 1, background: 'rgba(201,169,110,0.12)', margin: '0.7rem 0' }} />
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: '#c9a96e' }}>{price}</div>
        {est && <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.08em', color: 'rgba(232,227,216,0.28)', marginTop: '0.15rem' }}>{est}</div>}
        {(beds || sqft || view) && (
          <>
            <div style={{ height: 1, background: 'rgba(201,169,110,0.12)', margin: '0.7rem 0' }} />
            <div style={{ display: 'flex', gap: '1.4rem' }}>
              {beds && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', color: 'rgba(232,227,216,0.38)', letterSpacing: '0.06em' }}><strong style={{ color: 'rgba(232,227,216,0.7)', fontWeight: 400 }}>{beds}</strong> BHK</span>}
              {sqft && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', color: 'rgba(232,227,216,0.38)', letterSpacing: '0.06em' }}><strong style={{ color: 'rgba(232,227,216,0.7)', fontWeight: 400 }}>{sqft}</strong> sqft</span>}
              {view && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', color: 'rgba(232,227,216,0.38)', letterSpacing: '0.06em' }}><strong style={{ color: 'rgba(232,227,216,0.7)', fontWeight: 400 }}>{view}</strong></span>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function MarketPulseCard({ style }) {
  return (
    <div className="nest-card" style={{ ...style, minHeight: 200 }}>
      <div style={{ padding: '1.6rem 1.7rem' }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Market Pulse</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 300, color: '#e8e3d8', lineHeight: 1.1, marginBottom: '0.5rem' }}>
          Prime demand
          <br /><em style={{ color: '#c9a96e' }}>+14.3%</em> QoQ
        </div>
        <div style={{ height: 1, background: 'rgba(201,169,110,0.12)', margin: '0.9rem 0' }} />
        <div style={{ fontSize: '0.75rem', lineHeight: 1.75, color: 'rgba(232,227,216,0.38)', fontWeight: 300 }}>
          Mumbai and Bangalore premium absorption accelerating with limited inventory driving yields up.
        </div>
        <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'flex-end', gap: 4, height: 32 }}>
          {[40,55,42,68,58,75,65,82,72,90].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`, borderRadius: 2,
              background: i === 9 ? '#c9a96e' : `rgba(201,169,110,${0.15 + i * 0.07})`,
              transition: 'height 0.3s'
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactDetailsCard({ style }) {
  return (
    <div className="nest-card" style={style}>
      <div style={{ padding: '1.35rem 1.5rem' }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
          Contact Advisor
        </div>
        <div style={{ display: 'grid', gap: '0.55rem' }}>
          <input placeholder="Name" style={{ width: '100%', background: '#0f131d', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 6, color: '#e8e3d8', padding: '0.55rem 0.7rem', fontSize: '0.72rem' }} />
          <input placeholder="Phone" style={{ width: '100%', background: '#0f131d', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 6, color: '#e8e3d8', padding: '0.55rem 0.7rem', fontSize: '0.72rem' }} />
          <input placeholder="Email" style={{ width: '100%', background: '#0f131d', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 6, color: '#e8e3d8', padding: '0.55rem 0.7rem', fontSize: '0.72rem' }} />
          <textarea rows={3} placeholder="Tell us what you are looking for" style={{ width: '100%', resize: 'none', background: '#0f131d', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 6, color: '#e8e3d8', padding: '0.55rem 0.7rem', fontSize: '0.72rem' }} />
          <button className="cta-primary" style={{ width: '100%', marginTop: '0.35rem', padding: '0.7rem 1rem' }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

function HeroScene({ onExplore }) {
  const sceneRef = useRef(null)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const card0Ref = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const stackRef = useRef(null)
  const scrollPct = useRef(0)
  const mouse = useRef({ nx: 0, ny: 0 })
  const tilt = useRef({ x: 0, y: 0 })

  const cards = [
    { ref: card0Ref },
    { ref: card1Ref },
    { ref: card2Ref },
  ]

  const fanConfig = [
    { sx:0, sy:0, sr:0, fx:-280, fy:-135, fr:-5, fz:0, fs:1 },
    { sx:8, sy:10, sr:3, fx:70, fy:-148, fr:4, fz:20, fs:0.96 },
    { sx:14, sy:18, sr:6, fx:-265, fy:115, fr:-4, fz:10, fs:0.93 },
  ]

  useEffect(() => {
    const onMouse = (e) => {
      mouse.current.nx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.ny = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!sceneRef.current) return
      const maxScroll = sceneRef.current.offsetHeight - window.innerHeight
      scrollPct.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let raf
    const lerp = (a, b, t) => a + (b - a) * t
    const ease = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t) * t

    const loop = () => {
      const p = scrollPct.current
      const p1 = Math.min(p / 0.55, 1)
      const ep1 = ease(p1)
      const p2 = Math.max((p - 0.55) / 0.4, 0)
      const ep2 = ease(p2)

      tilt.current.x += (mouse.current.ny * -4 * (1 - ep1 * 0.7) - tilt.current.x) * 0.06
      tilt.current.y += (mouse.current.nx * 5 * (1 - ep1 * 0.7) - tilt.current.y) * 0.06

      if (stackRef.current) {
        stackRef.current.style.transform =
          `translate(-50%, -50%) rotateX(${tilt.current.x}deg) rotateY(${tilt.current.y}deg)`
      }

      cards.forEach(({ ref }, i) => {
        if (!ref.current) return
        const cfg = fanConfig[i]

        const x = lerp(cfg.sx, cfg.fx, ep1)
        const y = lerp(cfg.sy, cfg.fy, ep1)
        const rot = lerp(cfg.sr, cfg.fr, ep1)
        const z = lerp(0, cfg.fz, ep1)
        const sc = lerp(1, cfg.fs, ep1)
        const driftY = lerp(0, -60, ep2)
        const opacity = lerp(1, 0, ep2 * 1.5)

        ref.current.style.transform =
          `translateX(${x}px) translateY(${y + driftY}px) translateZ(${z}px) rotate(${rot}deg) scale(${sc})`
        ref.current.style.opacity = String(Math.max(opacity, 0))
        ref.current.style.zIndex = String(4 - i)
      })

      if (heroRef.current) {
        const ho = lerp(1, 0, ep1 * 2.5)
        const hy = lerp(0, -40, ep1)
        heroRef.current.style.opacity = String(Math.max(ho, 0))
        heroRef.current.style.transform = `translateY(${hy}px)`
      }

      if (statsRef.current) {
        statsRef.current.style.opacity = String(lerp(1, 0, p1 * 2.8))
      }

      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [])

  const cardStyle = {
    position: 'absolute',
    width: 310,
    top: 0,
    left: 0,
    marginLeft: -155,
    marginTop: -210,
    willChange: 'transform, opacity',
    transformStyle: 'preserve-3d',
    transition: 'box-shadow 0.3s',
    filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.7))',
  }

  return (
    <div ref={sceneRef} style={{ position: 'relative', height: '500vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', perspective: '1100px', perspectiveOrigin: '50% 45%' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(8,9,13,0.62), rgba(8,9,13,0.74)), radial-gradient(ellipse at 30% 25%, rgba(28,22,8,0.7) 0%, rgba(8,9,13,0.92) 55%), url(${postHeroBackground})`,
            backgroundSize: 'cover, cover, cover',
            backgroundPosition: 'center, center, center',
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat'
          }}
        />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px'
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: `linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div
          ref={stackRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '55%',
            transformStyle: 'preserve-3d',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform'
          }}
        >
          <div ref={card2Ref} style={{ ...cardStyle }}>
            <PropertyCard
              img="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=560&q=80"
              tag="New · Bangalore"
              title={<><span>Garden Villa</span><br/><span>Whitefield</span></>}
              address="Plot 22, Embassy Springs"
              price="₹ 2.85 Cr"
              est="~₹28,000 / mo est."
              beds="3"
              sqft="1,900"
            />
          </div>
          <div ref={card1Ref} style={{ ...cardStyle }}>
            <PropertyCard
              img="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=560&q=80"
              tag="Premium · Delhi NCR"
              title={<><span>Modern Villa</span><br/><span>Gurugram</span></>}
              address="DLF Phase 5, Sector 43"
              price="₹ 6.8 Cr"
              est="~₹65,000 / mo est."
              beds="5"
              sqft="4,200"
            />
          </div>
          <div ref={card0Ref} style={{ ...cardStyle }}>
            <PropertyCard
              img="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=640&q=80"
              tag="Featured · Mumbai"
              title={<><span>Seaside Residence</span><br/><span>Bandra West</span></>}
              address="1502 Carter Road, Bandra W"
              price="₹ 4.2 Cr"
              est="~₹42,000 / mo est."
              beds="4"
              sqft="2,800"
              view="Sea"
            />
          </div>
        </div>

        <div ref={heroRef} style={{ position: 'absolute', left: '5vw', top: '50%', transform: 'translateY(-50%)', zIndex: 20, maxWidth: 500, animation: 'fadeUp 0.9s ease both', willChange: 'transform, opacity' }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.63rem', letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: 32, height: 1, background: '#c9a96e', opacity: 0.6, display: 'inline-block' }} />
            Immersive Property Platform
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,5.5vw,5.5rem)', fontWeight: 300, lineHeight: 0.94, letterSpacing: '-0.01em', color: '#e8e3d8' }}>
            Beautiful<br />
            <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>homes</em><br />
            made for you
          </h1>

          <p style={{ marginTop: '1.8rem', fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(232,227,216,0.48)', maxWidth: 370, fontWeight: 300 }}>
            Verified listings, cinematic property tours, and secure closing workflows - all in one premium experience.
          </p>

          <div style={{ marginTop: '2.4rem', display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
            <button type="button" className="cta-primary" onClick={onExplore}>Explore Listings</button>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.63rem', letterSpacing: '0.15em', color: 'rgba(232,227,216,0.38)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              How it works  -&gt;
            </span>
          </div>
        </div>

        <div ref={statsRef} style={{ position: 'absolute', bottom: '2.5rem', left: '5vw', right: '5vw', display: 'flex', gap: '3rem', zIndex: 10, willChange: 'opacity' }}>
          {[
            { num: '2,400', sup: '+', label: 'Verified Listings' },
            { num: '98', sup: '%', label: 'Close Rate' },
            { num: '₹840', sup: 'Cr', label: 'Transacted 2024' },
          ].map((s) => (
            <div key={s.label} style={{ borderLeft: '1px solid rgba(201,169,110,0.25)', paddingLeft: '1.2rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: '#e8e3d8', lineHeight: 1 }}>
                {s.num}<span style={{ fontSize: '1rem', color: '#c9a96e', marginLeft: '0.1rem' }}>{s.sup}</span>
              </div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.15em', color: 'rgba(232,227,216,0.32)', textTransform: 'uppercase', marginTop: '0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem', zIndex: 10 }}>
          <div style={{ width: 1, height: 64, background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.5))', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#c9a96e', animation: 'scrollDrop 1.8s ease-in-out infinite' }} />
          </div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
            Scroll
          </div>
        </div>

        <div style={{ position: 'absolute', right: '28%', top: '52%', transform: 'translate(50%,-50%)', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '28%', top: '52%', transform: 'translate(50%,-50%)', width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.04)', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}

function PostHeroStaticCards({ onHome }) {
  return (
    <section style={{ background: 'transparent', padding: '4rem 5vw 2rem', position: 'relative', zIndex: 11 }}>
      <div style={{ textAlign: 'center', marginBottom: '2.4rem' }}>
        <button type="button" className="cta-primary" onClick={onHome} style={{ padding: '0.85rem 2.5rem' }}>
          Go To Home Page
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
        <MarketPulseCard style={{ minHeight: 280 }} />
        <ContactDetailsCard />
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    { num: '01', title: 'Verified Listings', desc: 'Every property undergoes a rigorous verification process - ownership docs, legal clearances, and site visits confirmed before listing.' },
    { num: '02', title: '3D Property Tours', desc: 'Photorealistic walkthroughs let you experience a home in full spatial detail before ever stepping through the door.' },
    { num: '03', title: 'Secure Closing', desc: 'End-to-end transaction workflows with escrow, legal review, and registry handling built right into the platform.' },
  ]

  return (
    <section style={{ minHeight: '100vh', background: 'transparent', padding: '10rem 5vw 8rem', position: 'relative', zIndex: 10 }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.63rem', letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span style={{ width: 32, height: 1, background: '#c9a96e', opacity: 0.6, display: 'inline-block' }} />
        The Platform
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,4vw,3.8rem)', fontWeight: 300, maxWidth: 620, lineHeight: 1.1, color: '#e8e3d8' }}>
        Architected for clarity, <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>trust</em>, and speed
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'rgba(201,169,110,0.08)', marginTop: '3rem' }}>
        {features.map((f, i) => (
          <div key={f.num} className="feat-item" style={{ animationDelay: `${i * 0.12}s` }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', fontWeight: 300, color: 'rgba(201,169,110,0.18)', lineHeight: 1, marginBottom: '1rem' }}>{f.num}</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', fontWeight: 300, color: '#e8e3d8', marginBottom: '0.8rem' }}>{f.title}</div>
            <div style={{ fontSize: '0.8rem', lineHeight: 1.8, color: 'rgba(232,227,216,0.38)' }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ListingsSection({ onBrowse }) {
  const [step, setStep] = useState(1)
  const [showListings, setShowListings] = useState(false)
  const [answers, setAnswers] = useState({
    location: 'Delhi NCR',
    type: 'Villa',
    purpose: 'Investment'
  })

  const listings = [
    { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', tag: 'Premium · Delhi NCR', title: 'Modern Villa, Gurugram', address: 'DLF Phase 5, Sector 43', price: '₹ 6.8 Cr', beds: '5', sqft: '4,200', location: 'Delhi NCR', type: 'Villa' },
    { img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', tag: 'New Launch · Pune', title: 'Sky Penthouse, Koregaon', address: 'Koregaon Park Annex', price: '₹ 3.1 Cr', beds: '3', sqft: '2,100', location: 'Pune', type: 'Penthouse' },
    { img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', tag: 'Verified · Chennai', title: 'Seafront Flat, Besant', address: 'Besant Nagar, ECR', price: '₹ 1.95 Cr', beds: '2', sqft: '1,350', location: 'Chennai', type: 'Apartment' },
  ]

  const mockRecommendations = listings.slice(0, 3)

  return (
    <section style={{ background: 'transparent', padding: '4rem 5vw 10rem', position: 'relative', zIndex: 10 }}>
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)', marginBottom: '6rem' }} />
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.63rem', letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span style={{ width: 32, height: 1, background: '#c9a96e', opacity: 0.6, display: 'inline-block' }} />
        Featured Listings
      </div>

      {!showListings && (
        <div className="nest-card" style={{ maxWidth: 700, margin: '0 auto', padding: '1.6rem' }}>
          {step === 1 && (
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.9rem', color: '#e8e3d8', marginBottom: '1rem' }}>Where are you looking?</div>
              <select
                value={answers.location}
                onChange={(e) => setAnswers((prev) => ({ ...prev, location: e.target.value }))}
                style={{ width: '100%', background: '#0f131d', border: '1px solid rgba(201,169,110,0.24)', borderRadius: 6, color: '#e8e3d8', padding: '0.7rem 0.8rem', fontSize: '0.8rem' }}
              >
                <option>Delhi NCR</option>
                <option>Pune</option>
                <option>Chennai</option>
              </select>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.9rem', color: '#e8e3d8', marginBottom: '1rem' }}>What type of house do you prefer?</div>
              <select
                value={answers.type}
                onChange={(e) => setAnswers((prev) => ({ ...prev, type: e.target.value }))}
                style={{ width: '100%', background: '#0f131d', border: '1px solid rgba(201,169,110,0.24)', borderRadius: 6, color: '#e8e3d8', padding: '0.7rem 0.8rem', fontSize: '0.8rem' }}
              >
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Apartment</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.9rem', color: '#e8e3d8', marginBottom: '1rem' }}>What is your buying purpose?</div>
              <select
                value={answers.purpose}
                onChange={(e) => setAnswers((prev) => ({ ...prev, purpose: e.target.value }))}
                style={{ width: '100%', background: '#0f131d', border: '1px solid rgba(201,169,110,0.24)', borderRadius: 6, color: '#e8e3d8', padding: '0.7rem 0.8rem', fontSize: '0.8rem' }}
              >
                <option>Investment</option>
                <option>Primary Home</option>
                <option>Vacation Home</option>
              </select>
            </div>
          )}

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.7rem' }}>
            {step > 1 && (
              <button type="button" className="nav-cta" onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" className="cta-primary" onClick={() => setStep((s) => s + 1)}>
                Next
              </button>
            ) : (
              <button type="button" className="cta-primary" onClick={() => setShowListings(true)}>
                Show Listings
              </button>
            )}
          </div>
        </div>
      )}

      {showListings && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {mockRecommendations.map((l) => (
              <PropertyCard key={l.title} img={l.img} tag={l.tag} title={l.title} address={l.address} price={l.price} beds={l.beds} sqft={l.sqft} />
            ))}
          </div>
          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <button type="button" className="cta-primary" style={{ padding: '0.9rem 2.8rem' }} onClick={onBrowse}>View All Listings</button>
          </div>
        </>
      )}
    </section>
  )
}

function CTABanner({ onBrowse }) {
  return (
    <section style={{ background: 'transparent', padding: '0 5vw 8rem', zIndex: 10, position: 'relative' }}>
      <div style={{
        border: '1px solid rgba(201,169,110,0.2)', padding: '4rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: '2rem', flexWrap: 'wrap',
        background: 'linear-gradient(135deg, #0d0f14, #0a0c10)'
      }}>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '1rem' }}>Ready to begin?</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: '#e8e3d8', lineHeight: 1.1 }}>
            Enter the full<br /><em style={{ fontStyle: 'italic', color: '#c9a96e' }}>NestBridge</em> experience
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button type="button" className="cta-primary" style={{ padding: '0.85rem 2.4rem' }} onClick={onBrowse}>Browse Listings</button>
          <Link to="/dashboard/seller" className="nav-cta" style={{ padding: '0.85rem 2rem' }}>Work with us</Link>
        </div>
      </div>
    </section>
  )
}

export default function IntroLandingPage() {
  const navigate = useNavigate()
  const goBrowse = () => navigate('/properties')
  const goHome = () => navigate('/home')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />
      <CustomCursor />

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.4rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,9,13,0.88), transparent)',
          pointerEvents: 'none'
        }} />
        <Link to="/home" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', fontWeight: 400, letterSpacing: '0.08em', color: '#e8e3d8', zIndex: 1, position: 'relative', textDecoration: 'none' }}>
          Nest<span style={{ color: '#c9a96e' }}>Bridge</span>
        </Link>
        <Link to="/properties" className="nav-cta" style={{ zIndex: 1, position: 'relative' }}>View Listings</Link>
      </nav>

      <main style={{ background: '#08090d' }}>
        <HeroScene onExplore={goBrowse} />
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(8,9,13,0.82), rgba(8,9,13,0.9)), url(${postHeroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <PostHeroStaticCards onHome={goHome} />
          <FeaturesSection />
          <ListingsSection onBrowse={goBrowse} />
          <CTABanner onBrowse={goBrowse} />

          <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', color: 'rgba(232,227,216,0.5)' }}>
              Nest<span style={{ color: '#c9a96e' }}>Bridge</span>
            </div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.15em', color: 'rgba(232,227,216,0.22)', textTransform: 'uppercase' }}>
              © 2025 NestBridge · Premium Real Estate
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
