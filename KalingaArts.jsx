'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useSpring,
} from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════
// KALINGA ARTS — Handcrafted Heritage | Global Export
// Manufacturer, Wholesaler & Exporter | Est. 2005 | Jaipur, Rajasthan
// CEO: Mr. Mukesh Chauhan | +91 94140 74067
// ═══════════════════════════════════════════════════════════════════════

// ─── COLOUR SYSTEM ────────────────────────────────────────────────────
// Rule: ALL backgrounds = cream family | ALL text = maroon family
const C = {
  // Backgrounds (cream shades)
  cream:      '#FDF6EE',   // primary bg
  offWhite:   '#F9F5F0',   // secondary bg
  sand:       '#EDE0CA',   // warm section divider bg
  parchment:  '#F5EAD5',   // soft warm bg
  // Text (maroon family)
  maroon:     '#7B1626',   // PRIMARY brand / main headings
  maroonMid:  '#5C0F1C',   // subheadings / strong text
  maroonDark: '#3D0A13',   // deep emphasis
  body:       '#4A2030',   // body text on cream
  muted:      '#8B4A5A',   // muted text / captions
  // Accents
  gold:       '#D4AF37',   // decorative lines / stars only
  goldLight:  '#F0D060',
  goldDark:   '#8B6914',
  tan:        '#C4A882',   // warm accent
  copper:     '#B87333',
};

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────
const V = {
  fadeUp:    { hidden: { opacity:0, y:55 },     visible: { opacity:1, y:0,    transition:{ duration:0.85, ease:[0.22,1,0.36,1] } } },
  fadeIn:    { hidden: { opacity:0 },            visible: { opacity:1,          transition:{ duration:0.9 } } },
  scaleIn:   { hidden: { opacity:0, scale:0.88}, visible: { opacity:1, scale:1, transition:{ duration:0.75, ease:[0.22,1,0.36,1] } } },
  slideLeft: { hidden: { opacity:0, x:-75 },     visible: { opacity:1, x:0,    transition:{ duration:0.9,  ease:[0.22,1,0.36,1] } } },
  slideRight:{ hidden: { opacity:0, x:75  },     visible: { opacity:1, x:0,    transition:{ duration:0.9,  ease:[0.22,1,0.36,1] } } },
  stagger:   { visible: { transition:{ staggerChildren:0.13 } } },
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
    const st = document.createElement('style');
    st.textContent = RAW_CSS;
    document.head.appendChild(st);
    return () => { try{document.head.removeChild(link);}catch{} try{document.head.removeChild(st);}catch{} };
  }, []);
  return null;
}

const RAW_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family:'Inter',system-ui,sans-serif; background:#FDF6EE; color:#7B1626; overflow-x:hidden; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:#FDF6EE; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(#7B1626,#5C0F1C); border-radius:2px; }

  .f-display { font-family:'Playfair Display',Georgia,serif; }
  .f-luxury  { font-family:'Cormorant Garamond',Georgia,serif; }

  .text-grad {
    background:linear-gradient(135deg,#7B1626 0%,#A0203A 50%,#5C0F1C 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .shimmer-maroon {
    background:linear-gradient(90deg,#3D0A13 0%,#7B1626 30%,#A0203A 50%,#7B1626 70%,#3D0A13 100%);
    background-size:250% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:shimmer 5s linear infinite;
  }

  @keyframes shimmer { to { background-position:250% center; } }
  @keyframes float   { 0%,100%{transform:translateY(0);}  50%{transform:translateY(-14px);} }
  @keyframes floatB  { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-9px) rotate(2deg);} }
  @keyframes spin    { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes pulseM  { 0%,100%{box-shadow:0 0 0 0 rgba(123,22,38,0);} 50%{box-shadow:0 0 28px 8px rgba(123,22,38,0.18);} }

  .anim-float  { animation:float  6s ease-in-out infinite; }
  .anim-floatB { animation:floatB 8s ease-in-out infinite 1.8s; }
  .anim-spin   { animation:spin  42s linear infinite; }
  .anim-spin-r { animation:spin  30s linear infinite reverse; }
  .anim-pm     { animation:pulseM 3.5s ease-in-out infinite; }

  .gold-bar { height:1px; background:linear-gradient(90deg,transparent,#D4AF37,transparent); }
  .maroon-bar { height:1px; background:linear-gradient(90deg,transparent,#7B1626,transparent); }
  .pattern-stripe {
    height:3px;
    background-image:repeating-linear-gradient(90deg,#7B1626 0,#7B1626 3px,transparent 3px,transparent 12px,#D4AF37 12px,#D4AF37 15px,transparent 15px,transparent 24px);
  }

  .lux-input {
    background:rgba(123,22,38,0.04);
    border:1px solid rgba(123,22,38,0.25);
    border-radius:2px; padding:14px 18px;
    color:#7B1626; font-family:'Inter',sans-serif; font-size:14px; width:100%;
    transition:all .3s; outline:none;
  }
  .lux-input::placeholder { color:rgba(123,22,38,0.4); }
  .lux-input:focus { border-color:#7B1626; background:rgba(123,22,38,0.07); box-shadow:0 0 0 1px rgba(123,22,38,0.12); }
  textarea.lux-input { resize:none; min-height:130px; }
  select.lux-input option { background:#FDF6EE; color:#7B1626; }

  .card-lift { transition:transform .45s cubic-bezier(.25,.8,.25,1), box-shadow .45s; }
  .card-lift:hover { transform:translateY(-8px); box-shadow:0 28px 60px rgba(123,22,38,0.12); }
  .coll-img  { transition:transform .75s ease; }
  .coll-card:hover .coll-img { transform:scale(1.08); }

  .nav-link { position:relative; color:inherit; text-decoration:none; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; font-weight:500; transition:color .3s; }
  .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background:#7B1626; transition:width .35s ease; }
  .nav-link:hover::after { width:100%; }

  @media(max-width:900px){
    .ka-collections-grid { grid-template-columns:1fr 1fr !important; }
  }
  @media(max-width:580px){
    .ka-collections-grid { grid-template-columns:1fr !important; }
    .ka-section-pad { padding-left:24px !important; padding-right:24px !important; }
    .ka-hide-mobile { display:none !important; }
    .ka-show-mobile { display:block !important; }
  }
  @media(min-width:581px){
    .ka-show-mobile { display:none !important; }
  }
`;

// ─── SVG DECORATIVES ─────────────────────────────────────────────────
const Mandala = ({ size=220, opacity=0.07, color='#7B1626', spin=false }) => (
  <svg width={size} height={size} viewBox="0 0 220 220" style={{ opacity, display:'block' }} className={spin ? 'anim-spin' : ''}>
    {[18,32,48,64,80,96,106].map((r,i)=>(
      <circle key={i} cx="110" cy="110" r={r} fill="none" stroke={color} strokeWidth={i===6?1:0.6} strokeDasharray={i%2===0?'none':'4 3'}/>
    ))}
    {Array.from({length:24},(_,i)=>{ const a=(i*15*Math.PI)/180; return(
      <line key={i} x1={110+18*Math.cos(a)} y1={110+18*Math.sin(a)} x2={110+106*Math.cos(a)} y2={110+106*Math.sin(a)} stroke={color} strokeWidth="0.5" opacity="0.7"/>
    );})}
    {Array.from({length:12},(_,i)=>{ const a=(i*30*Math.PI)/180; const cx=110+72*Math.cos(a); const cy=110+72*Math.sin(a); return(
      <ellipse key={i} cx={cx} cy={cy} rx="7" ry="3.5" fill={color} opacity="0.5" transform={`rotate(${i*30},${cx},${cy})`}/>
    );})}
    <circle cx="110" cy="110" r="8" fill={color} opacity="0.3"/>
    <circle cx="110" cy="110" r="3.5" fill={color} opacity="0.6"/>
  </svg>
);

const GoldDivider = () => (
  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
    <div className="gold-bar" style={{ flex:1 }}/>
    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 1L9.8 6H15L10.6 9.2L12.4 14.2L8 11L3.6 14.2L5.4 9.2L1 6H6.2Z" fill="#D4AF37"/></svg>
    <div className="gold-bar" style={{ flex:1 }}/>
  </div>
);

const LotusDecor = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <path d="M24 42C24 42 9 30 9 18C9 12 14.5 8.5 18.5 11C20 11.8 22 13.5 24 16C26 13.5 28 11.8 29.5 11C33.5 8.5 39 12 39 18C39 30 24 42 24 42Z" fill="#7B1626" opacity="0.6"/>
    <path d="M24 42C24 42 6 26.5 6 15C6 9 11 5.5 15.5 8C17.5 9 20.5 11.5 24 16C27.5 11.5 30.5 9 32.5 8C37 5.5 42 9 42 15C42 26.5 24 42 24 42Z" fill="#D4AF37" opacity="0.25"/>
    <circle cx="24" cy="22" r="3" fill="#7B1626" opacity="0.8"/>
  </svg>
);

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:120, damping:30 });
  return (
    <motion.div style={{
      scaleX, transformOrigin:'0%', position:'fixed', top:0, left:0, right:0,
      height:'2px', background:'linear-gradient(90deg,#7B1626,#A0203A,#D4AF37)', zIndex:200,
    }}/>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href:'#about',        label:'About'       },
  { href:'#collections',  label:'Collections' },
  { href:'#why-us',       label:'Why Us'      },
  { href:'#process',      label:'Process'     },
  { href:'#global',       label:'Global'      },
  { href:'#contact',      label:'Contact'     },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>60);
    window.addEventListener('scroll',h,{passive:true});
    return ()=>window.removeEventListener('scroll',h);
  },[]);

  return (
    <motion.nav
      initial={{ y:-80, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        background: scrolled ? 'rgba(253,246,238,0.97)' : 'rgba(253,246,238,0.72)',
        backdropFilter:'blur(18px)',
        borderBottom: scrolled ? '1px solid rgba(123,22,38,0.12)' : '1px solid rgba(123,22,38,0.06)',
        boxShadow: scrolled ? '0 2px 24px rgba(123,22,38,0.08)' : 'none',
        transition:'all 0.45s ease',
        padding:'0 48px',
      }}
    >
      <div style={{ maxWidth:1320, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
          <img src="/logo.png" alt="Kalinga Arts"
            style={{ height:56, width:'auto', objectFit:'contain', transition:'opacity 0.3s', mixBlendMode:'multiply' }}
            onError={e=>{ e.target.style.display='none'; }}
          />
          <span className="f-luxury ka-hide-mobile" style={{ fontSize:11, color:C.muted, letterSpacing:3, textTransform:'uppercase', marginLeft:4 }}>Est. 2005 · Jaipur, India</span>
        </a>

        {/* Desktop nav */}
        <div className="ka-hide-mobile" style={{ display:'flex', gap:36, alignItems:'center' }}>
          {NAV_LINKS.map(l=>(
            <a key={l.href} href={l.href} className="nav-link" style={{ color:C.maroon }}>{l.label}</a>
          ))}
          <a href="#contact" style={{
            padding:'9px 22px', background:C.maroon, color:C.cream,
            fontSize:12, letterSpacing:1.5, textTransform:'uppercase', textDecoration:'none',
            fontWeight:500, fontFamily:'Inter,sans-serif', transition:'all 0.3s',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background=C.maroonMid; e.currentTarget.style.boxShadow='0 4px 16px rgba(123,22,38,0.35)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background=C.maroon; e.currentTarget.style.boxShadow='none'; }}
          >
            Inquire Now
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={()=>setOpen(!open)} className="ka-show-mobile"
          style={{ background:'none', border:'none', cursor:'pointer', padding:8 }}>
          {[0,1,2].map(i=>(
            <div key={i} style={{
              width: i===1?18:24, height:2, background:C.maroon, marginBottom: i<2?5:0,
              transition:'all 0.3s',
              transform: open ? (i===0?'rotate(45deg) translate(5px,5px)': i===2?'rotate(-45deg) translate(5px,-5px)':'none') : 'none',
              opacity: open && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            style={{ background:C.cream, borderTop:`1px solid rgba(123,22,38,0.1)`, padding:'16px 48px 24px' }}>
            {NAV_LINKS.map(l=>(
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)}
                style={{ display:'block', color:C.maroon, padding:'12px 0', fontSize:14, letterSpacing:2, textTransform:'uppercase', textDecoration:'none', borderBottom:`1px solid rgba(123,22,38,0.08)` }}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── REVEAL WRAPPERS ─────────────────────────────────────────────────
function Reveal({ children, variant='fadeUp', delay=0, className='', style:sx={} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px 0px' });
  return (
    <motion.div ref={ref} variants={V[variant]} initial="hidden" animate={inView?'visible':'hidden'}
      transition={{ delay }} className={className} style={sx}>
      {children}
    </motion.div>
  );
}

function StaggerGroup({ children, className='', style:sx={} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px 0px' });
  return (
    <motion.div ref={ref} variants={V.stagger} initial="hidden" animate={inView?'visible':'hidden'}
      className={className} style={sx}>
      {children}
    </motion.div>
  );
}

// ─── COUNT-UP NUMBER ─────────────────────────────────────────────────
function CountUp({ end, suffix='', duration=2.4 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true });
  const [val, setVal] = useState(0);
  useEffect(()=>{
    if(!inView) return;
    const n = parseInt(end);
    if(isNaN(n)){ setVal(end); return; }
    let cur = 0;
    const step = n / (duration * 60);
    const id = setInterval(()=>{
      cur += step;
      if(cur >= n){ setVal(n); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 1000/60);
    return ()=>clearInterval(id);
  }, [inView, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── WORD-BY-WORD REVEAL ─────────────────────────────────────────────
function WordReveal({ children, className='', style:sx={} }) {
  const words = String(children).split(' ');
  return (
    <motion.span className={className} style={{ display:'block', ...sx }}
      variants={{ visible:{ transition:{ staggerChildren:0.1 } } }}>
      {words.map((w,i)=>(
        <motion.span key={i} style={{ display:'inline-block', marginRight:'0.28em' }}
          variants={{
            hidden:  { opacity:0, y:48, filter:'blur(4px)' },
            visible: { opacity:1, y:0,  filter:'blur(0px)', transition:{ duration:0.75, ease:[0.22,1,0.36,1] } },
          }}>
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle, center=true }) {
  return (
    <div style={{ textAlign: center?'center':'left', marginBottom:64 }}>
      <Reveal>
        <span className="f-luxury" style={{ fontSize:13, letterSpacing:4, textTransform:'uppercase', color:C.gold, display:'block', marginBottom:12 }}>
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="f-display" style={{ fontSize:'clamp(2rem,4.5vw,3.5rem)', fontWeight:700, color:C.maroon, lineHeight:1.18, marginBottom:16 }}>
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="gold-bar" style={{ width:80, margin: center?'0 auto 20px':'0 0 20px' }}/>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.25}>
          <p className="f-luxury" style={{ fontSize:'clamp(1.1rem,2vw,1.35rem)', color:C.body, maxWidth:620, margin: center?'0 auto':'0', lineHeight:1.7 }}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO  (cream background)
// ═══════════════════════════════════════════════════════════════════════
const HERO_STATS = [
  { num:500,   suffix:'+', label:'Artisan Network'     },
  { num:35,    suffix:'+', label:'Countries Exported'  },
  { num:'Low', suffix:'',  label:'MOQ Capability'      },
  { num:100,   suffix:'%', label:'Handcrafted Quality' },
];

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:['start start','end start'] });
  const yBg      = useTransform(scrollYProgress, [0,1], ['0%','25%']);
  const opacityB = useTransform(scrollYProgress, [0,0.7], [1,0]);

  return (
    <section ref={heroRef} id="hero" style={{
      position:'relative', minHeight:'100vh', display:'flex', alignItems:'center',
      overflow:'hidden', background:C.parchment,
    }}>
      {/* ── COVER PHOTO with parallax zoom ── */}
      <motion.div style={{
        position:'absolute', inset:'-8%',        /* extra bleed for parallax movement */
        y: yBg,
        backgroundImage:`url('/hero.png')`,
        backgroundSize:'cover', backgroundPosition:'center',
        scale: useTransform(scrollYProgress,[0,1],[1.08,1.0]),
      }}/>

      {/* Cream tint overlay — keeps backgrounds cream, fonts readable */}
      <div style={{
        position:'absolute', inset:0,
        background:`linear-gradient(145deg,
          rgba(245,234,213,0.87) 0%,
          rgba(253,246,238,0.82) 40%,
          rgba(249,245,240,0.85) 100%)`,
      }}/>

      {/* Subtle vignette */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`
          radial-gradient(ellipse at 15% 85%, rgba(123,22,38,0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 15%, rgba(212,175,55,0.08) 0%, transparent 50%)
        `,
      }}/>

      {/* Subtle grid texture */}
      <div style={{
        position:'absolute', inset:0, opacity:0.025,
        backgroundImage:`linear-gradient(rgba(123,22,38,1) 1px, transparent 1px), linear-gradient(90deg,rgba(123,22,38,1) 1px,transparent 1px)`,
        backgroundSize:'60px 60px',
      }}/>

      {/* Decorative mandalas */}
      <motion.div style={{ y:yBg, position:'absolute', inset:0, zIndex:0 }}>
        <div style={{ position:'absolute', top:'5%', left:'2%', zIndex:1 }} className="anim-spin">
          <Mandala size={320} opacity={0.06} color={C.maroon}/>
        </div>
        <div style={{ position:'absolute', bottom:'3%', right:'1%', zIndex:1 }} className="anim-spin-r">
          <Mandala size={280} opacity={0.05} color={C.gold}/>
        </div>
        <div style={{ position:'absolute', top:'35%', right:'20%', zIndex:1 }} className="anim-floatB">
          <Mandala size={150} opacity={0.07} color={C.maroon}/>
        </div>
      </motion.div>

      {/* Floating dots */}
      {[{top:'25%',left:'12%'},{top:'60%',left:'8%'},{top:'40%',right:'10%'},{top:'18%',right:'32%'},{bottom:'32%',left:'28%'}].map((pos,i)=>(
        <div key={i} style={{
          position:'absolute', ...pos, zIndex:1,
          width:4, height:4, borderRadius:'50%', background:C.gold, opacity:0.5,
          animation:`float ${5+i}s ease-in-out infinite ${i*0.7}s`,
        }}/>
      ))}

      <div className="pattern-stripe" style={{ position:'absolute', top:0, left:0, right:0, zIndex:3 }}/>

      {/* Content */}
      <motion.div style={{ opacity:opacityB, position:'relative', zIndex:5, width:'100%' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'120px 48px 80px' }} className="ka-section-pad">

          {/* Eyebrow */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}}
            style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28 }}>
            <div className="gold-bar" style={{ width:40 }}/>
            <span className="f-luxury" style={{ color:C.gold, fontSize:14, letterSpacing:4, textTransform:'uppercase' }}>
              Handcrafted in Jaipur, Rajasthan · Exported Worldwide
            </span>
            <div className="gold-bar" style={{ width:40 }}/>
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <motion.h1 className="f-display"
            initial="hidden" animate="visible"
            variants={{ visible:{ transition:{ staggerChildren:0.1, delayChildren:0.35 } } }}
            style={{ fontSize:'clamp(2.6rem,7vw,6rem)', fontWeight:800, lineHeight:1.15, color:C.maroon, marginBottom:12, maxWidth:860 }}>
            {'Where Indian'.split(' ').map((w,i)=>(
              <motion.span key={i} style={{ display:'inline-block', marginRight:'0.28em' }}
                variants={{ hidden:{opacity:0,y:50,filter:'blur(5px)'}, visible:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:0.8,ease:[0.22,1,0.36,1]}} }}>
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={{ hidden:{opacity:0,y:50,filter:'blur(5px)'}, visible:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:0.8,ease:[0.22,1,0.36,1]}} }}
              style={{ display:'inline-block', marginRight:'0.28em' }}>
              <span className="text-grad">Craftsmanship</span>
            </motion.span>
            <br/>
            {'Meets Global Luxury'.split(' ').map((w,i)=>(
              <motion.span key={i} style={{ display:'inline-block', marginRight:'0.28em' }}
                variants={{ hidden:{opacity:0,y:50,filter:'blur(5px)'}, visible:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:0.8,ease:[0.22,1,0.36,1]}} }}>
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p className="f-luxury"
            initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.55}}
            style={{ fontSize:'clamp(1.15rem,2.2vw,1.5rem)', color:C.body, marginBottom:36, maxWidth:660, lineHeight:1.65 }}>
            Kalinga Arts bridges the royal artisan traditions of Jaipur with the refined tastes
            of global markets — wooden décor, spiritual products, luxury gifting &amp; bespoke export sourcing.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.7}}
            style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:70 }}>
            <HeroBtn href="#collections" primary>Explore Collections</HeroBtn>
            <HeroBtn href="#contact">Connect for Export Inquiry</HeroBtn>
          </motion.div>

          {/* Stats — animated count-up */}
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.9}}
            style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
            {HERO_STATS.map((s,i)=>(
              <div key={i} style={{
                padding:'16px 24px', minWidth:140,
                background:'rgba(123,22,38,0.05)',
                border:`1px solid rgba(123,22,38,0.18)`,
                backdropFilter:'blur(4px)',
                transition:'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(123,22,38,0.14)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <div className="f-display" style={{ fontSize:30, fontWeight:800, color:C.maroon, lineHeight:1, marginBottom:4 }}>
                  <CountUp end={s.num} suffix={s.suffix} duration={2.0+i*0.2}/>
                </div>
                <div style={{ fontSize:11, color:C.muted, letterSpacing:2, textTransform:'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:80, zIndex:4,
        background:`linear-gradient(to top, ${C.cream}, transparent)`,
      }}/>

      {/* Scroll cue */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.6}}
        style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', zIndex:5, textAlign:'center' }}
        className="anim-float">
        <div style={{ width:1, height:45, background:`linear-gradient(to bottom,${C.maroon},transparent)`, margin:'0 auto 6px' }}/>
        <span style={{ color:C.muted, fontSize:10, letterSpacing:3, textTransform:'uppercase', fontFamily:'Inter,sans-serif' }}>Scroll</span>
      </motion.div>
    </section>
  );
}

function HeroBtn({ href, children, primary=false }) {
  return (
    <a href={href} style={{
      display:'inline-block', padding:'14px 34px',
      fontSize:13, fontWeight:500, letterSpacing:1.8, textTransform:'uppercase', textDecoration:'none',
      fontFamily:'Inter,sans-serif', transition:'all 0.35s ease',
      ...(primary ? {
        background:`linear-gradient(135deg,${C.maroon},${C.maroonMid})`,
        color:C.cream, border:'none',
      } : {
        background:'transparent', color:C.maroon,
        border:`1.5px solid rgba(123,22,38,0.5)`,
      }),
    }}
    onMouseEnter={e=>{
      if(primary){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 30px rgba(123,22,38,0.3)'; }
      else       { e.currentTarget.style.background='rgba(123,22,38,0.06)'; e.currentTarget.style.borderColor=C.maroon; }
    }}
    onMouseLeave={e=>{
      if(primary){ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }
      else       { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(123,22,38,0.5)'; }
    }}>
      {children}
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 2 — ABOUT  (off-white background)
// ═══════════════════════════════════════════════════════════════════════
const VALUES = [
  { icon:'🌿', title:'Ethical Sourcing',   desc:'Every piece originates from artisan collectives with fair-wage practices.' },
  { icon:'✋', title:'Handcrafted Always',  desc:'Zero mass production. Each export consignment carries authentic handmade value.' },
  { icon:'📦', title:'Export Standards',   desc:'International-grade packaging, documentation, and compliance built-in.' },
  { icon:'🤝', title:'Custom Partnership', desc:'From design to delivery, we co-create with each global buyer.' },
];

function AboutSection() {
  return (
    <section id="about" style={{ position:'relative', padding:'120px 48px', background:C.offWhite, overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-80, right:-80, opacity:0.04 }}>
        <Mandala size={400} color={C.maroon}/>
      </div>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(420px,1fr))', gap:72, alignItems:'center' }}>

          {/* Left: Story */}
          <div>
            <Reveal>
              <span className="f-luxury" style={{ fontSize:13, letterSpacing:4, textTransform:'uppercase', color:C.gold, display:'block', marginBottom:14 }}>Our Story</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="f-display" style={{ fontSize:'clamp(1.9rem,3.8vw,3rem)', fontWeight:700, color:C.maroon, lineHeight:1.2, marginBottom:24 }}>
                Born from the Royal Craft<br/><em style={{ color:C.maroonMid }}>Heritage of Rajasthan</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}><div className="gold-bar" style={{ width:60, marginBottom:28 }}/></Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize:15.5, lineHeight:1.85, color:C.body, marginBottom:20 }}>
                Founded in 2005 by Mr. Mukesh Chauhan, Kalinga Arts was born from a deep reverence for
                Rajasthan's millennia-old artisan traditions — a land where every craft tells a royal story,
                where blue pottery, block printing, and stone carving are not trades but sacred inheritances
                passed across generations.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p style={{ fontSize:15.5, lineHeight:1.85, color:C.body, marginBottom:32 }}>
                As a manufacturer, wholesaler, and exporter based in Jaipur, we connect master artisans
                with discerning global buyers — boutique stores in Amsterdam, spiritual retailers in
                California, luxury hotels in Dubai, gifting firms in Singapore. Our role is simple:
                translate centuries of Rajasthani artistry into impeccable export products the world deserves.
              </p>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.3}>
              <div style={{ padding:'22px 28px', borderLeft:`3px solid ${C.maroon}`, background:'rgba(123,22,38,0.04)', marginBottom:36 }}>
                <p className="f-luxury" style={{ fontSize:'clamp(1.1rem,1.8vw,1.3rem)', color:C.maroon, lineHeight:1.6, fontStyle:'italic' }}>
                  "We do not just export objects — we export the soul of Indian craftsmanship to every corner of the world."
                </p>
              </div>
            </Reveal>

            {/* Values grid */}
            <StaggerGroup style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {VALUES.map((v,i)=>(
                <motion.div key={i} variants={V.scaleIn}
                  style={{ padding:'18px', background:C.cream, border:`1px solid rgba(123,22,38,0.12)` }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{v.icon}</div>
                  <div className="f-display" style={{ fontSize:13, fontWeight:600, color:C.maroon, marginBottom:5, letterSpacing:0.5 }}>{v.title}</div>
                  <div style={{ fontSize:12.5, color:C.body, lineHeight:1.6 }}>{v.desc}</div>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>

          {/* Right: visual */}
          <Reveal variant="slideRight">
            <div style={{ position:'relative' }}>
              <div style={{
                width:'100%', paddingBottom:'125%', position:'relative',
                overflow:'hidden',
              }}>
                <img src="/img7.png" alt="Kalinga Arts Artisans"
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'left center' }}/>
                {/* Corner brackets */}
                <div style={{ position:'absolute', top:20, left:20, width:40, height:40, borderTop:`2px solid ${C.gold}`, borderLeft:`2px solid ${C.gold}`, opacity:0.7, zIndex:2 }}/>
                <div style={{ position:'absolute', bottom:20, right:20, width:40, height:40, borderBottom:`2px solid ${C.gold}`, borderRight:`2px solid ${C.gold}`, opacity:0.7, zIndex:2 }}/>
              </div>
              {/* Floating accent card */}
              <div style={{ position:'absolute', bottom:-28, left:-28, background:C.maroon, padding:'20px 26px', border:`1px solid rgba(212,175,55,0.35)`, minWidth:180 }}>
                <div className="f-display" style={{ fontSize:28, color:C.cream, fontWeight:700 }}>Est. 2005</div>
                <div style={{ fontSize:12, color:'rgba(253,246,238,0.75)', letterSpacing:2, textTransform:'uppercase' }}>Years of<br/>Craftsmanship</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 3 — COLLECTIONS  (cream background, maroon cards)
// ═══════════════════════════════════════════════════════════════════════
const COLLECTIONS = [
  { title:'Wooden Handicrafts',        label:'Heritage Wood Arts',     desc:'Hand-carved wooden sculptures, decorative panels, furniture accents, and tribal artworks — each piece shaped by generational mastery.',   tag:'MOQ: 50 pcs',        img:'/wooden-handicraft-01.png', pos:'center', whiteBg:true },
  { title:'Spiritual & Pooja Décor',   label:'Sacred Artisanal Pieces',desc:'Handcrafted brass diyas, wooden mandirs, incense holders, and ritual objects for spiritual retailers worldwide.',                         tag:'Export Ready',       img:'/img9.png',  pos:'center top' },
  { title:'Luxury Gifting Collections',label:'Premium Bespoke Gifts',  desc:'Curated gift sets with handcrafted objects, luxury packaging, and customizable branding for premium gifting companies.',                   tag:'White Label',        img:'/img6.png',  pos:'center' },
  { title:'Home Décor & Lifestyle',    label:'Artisan Living',          desc:'Wall art, vases, decorative bowls, woven textiles, and curated lifestyle objects for interior designers and boutique stores.',            tag:'Designer Line',      img:'/img3.png',  pos:'center' },
  { title:'Corporate Gift Collections',label:'Brand-Embedded Crafts',  desc:'Customized artisanal products with your branding — perfect for corporate awards, festival gifting, and premium client experiences.',      tag:'Fully Customizable', img:'/img10.png', pos:'center' },
  { title:'Boutique Export Collections',label:'Curated for Retail',    desc:'Ready-to-retail curated capsule collections for boutique stores, concept shops, and exclusive interior galleries globally.',               tag:'Retail Ready',       img:'/img14.png', pos:'center' },
];

function CollectionsSection() {
  return (
    <section id="collections" style={{ padding:'120px 48px', background:C.cream, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', bottom:-60, left:-60, opacity:0.04 }}><Mandala size={400} color={C.maroon}/></div>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <SectionHeader eyebrow="Our Collections" title="Artisan Categories for Global Markets"
          subtitle="Six curated export lines — each representing a distinct dimension of India's infinite craft heritage."/>
        <div className="ka-collections-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {COLLECTIONS.map((col,i)=><CollectionCard key={i} {...col} index={i}/>)}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ title, label, desc, tag, img, pos='center', whiteBg=false, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px 0px' });
  const [hov, setHov] = useState(false);

  return (
    <motion.div ref={ref} variants={V.scaleIn} initial="hidden" animate={inView?'visible':'hidden'}
      transition={{ delay:(index%3)*0.12 }} className="coll-card"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:C.offWhite,
        border:`1px solid rgba(123,22,38,${hov?0.35:0.1})`,
        overflow:'hidden',
        transform: hov ? 'translateY(-10px) scale(1.015)' : 'translateY(0) scale(1)',
        boxShadow: hov
          ? '0 28px 60px rgba(123,22,38,0.18), 0 0 0 1px rgba(123,22,38,0.12), 0 0 40px rgba(212,175,55,0.08)'
          : '0 4px 18px rgba(123,22,38,0.06)',
        transition:'all 0.45s cubic-bezier(0.25,0.8,0.25,1)',
      }}>

      {/* Image area */}
      <div style={{ position:'relative', paddingBottom:'62%', overflow:'hidden' }}>
        {/* Real product photo */}
        <div style={{ position:'absolute', inset:0, background: whiteBg ? C.parchment : 'transparent' }}/>
        <img src={img} alt={title} style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit: whiteBg ? 'contain' : 'cover',
          objectPosition:pos, padding: whiteBg ? '12px' : 0,
          transform: hov ? 'scale(1.09)' : 'scale(1)',
          transition:'transform 0.75s ease',
          mixBlendMode: whiteBg ? 'multiply' : 'normal',
        }}/>
        {/* Dark gradient overlay for text readability */}
        <div style={{ position:'absolute', inset:0, background: whiteBg
          ? 'linear-gradient(to top,rgba(123,22,38,0.55) 0%,rgba(123,22,38,0.1) 50%,transparent 100%)'
          : 'linear-gradient(to top,rgba(30,5,10,0.75) 0%,rgba(30,5,10,0.25) 55%,rgba(30,5,10,0.1) 100%)' }}/>
        {/* Shimmer on hover */}
        <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration:0.4 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.07) 50%,transparent 70%)' }}/>
        {/* Label badge */}
        <div style={{ position:'absolute', top:14, left:14, padding:'5px 12px', background:'rgba(253,246,238,0.15)', border:'1px solid rgba(212,175,55,0.4)', backdropFilter:'blur(8px)' }}>
          <span style={{ fontSize:10, letterSpacing:2.5, textTransform:'uppercase', color:'#F0D060', fontFamily:'Inter,sans-serif' }}>{label}</span>
        </div>
        {/* Corner mandala */}
        <motion.div animate={{ opacity: hov ? 0.12 : 0.07, rotate: hov ? 15 : 0 }} transition={{ duration:0.6 }}
          style={{ position:'absolute', bottom:-25, right:-25 }}>
          <Mandala size={120} color={C.cream}/>
        </motion.div>
      </div>

      {/* Content — cream bg */}
      <div style={{ padding:'22px 22px 26px', background:C.cream }}>
        <h3 className="f-display" style={{ fontSize:17, fontWeight:600, color:C.maroon, marginBottom:8, letterSpacing:0.3 }}>{title}</h3>
        <motion.div animate={{ width: hov ? 50 : 28 }} transition={{ duration:0.4 }} className="gold-bar" style={{ marginBottom:10 }}/>
        <p style={{ fontSize:13, color:C.body, lineHeight:1.72, marginBottom:16 }}>{desc}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:10.5, color:C.maroon, letterSpacing:2, textTransform:'uppercase', border:`1px solid rgba(123,22,38,0.3)`, padding:'4px 10px' }}>{tag}</span>
          <motion.span animate={{ x:hov?8:0, opacity:hov?1:0.35 }} transition={{ duration:0.3 }}
            style={{ color:C.maroon, fontSize:20, cursor:'pointer', fontWeight:300 }}>→</motion.span>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 4 — WHY CHOOSE US  (parchment / warm cream background)
// ═══════════════════════════════════════════════════════════════════════
const WHY_FEATURES = [
  { icon:'🏺', title:'Strong Artisan Network',      desc:'500+ trained artisans across Rajasthan, skilled in blue pottery, block printing, stone carving, and metalwork.' },
  { icon:'✏️', title:'End-to-End Customization',    desc:'Design, material, size, finish, packaging — every variable is yours to define. We execute flawlessly.' },
  { icon:'📉', title:'Low MOQ Support',             desc:'We support small order quantities to help boutique buyers and new importers test and grow.' },
  { icon:'📦', title:'Export-Grade Packaging',      desc:'International-standard export packaging with shock protection, humidity control, and branding options.' },
  { icon:'⏱️', title:'Reliable Production Timeline', desc:'Structured production schedules with milestone tracking and transparent communication.' },
  { icon:'🛡️', title:'Quality Assurance',           desc:'Multi-stage QC process — raw material, in-progress, and pre-shipment inspections. Zero compromise.' },
  { icon:'🏷️', title:'Private Labeling / OEM',      desc:'Full white-label and OEM capability. Your brand, your story — our craftsmanship powering it.' },
  { icon:'🌍', title:'Bulk Order Capability',       desc:'Scalable production infrastructure for large retail chains, hospitality groups, and wholesale buyers.' },
  { icon:'🤲', title:'Flexible Sourcing',           desc:'Mix collections, combine categories, or build a completely bespoke export program tailored to you.' },
];

function WhyUsSection() {
  return (
    <section id="why-us" style={{ padding:'120px 48px', position:'relative', overflow:'hidden', background:C.parchment }}>
      <div className="pattern-stripe" style={{ position:'absolute', top:0, left:0, right:0 }}/>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.04 }}>
        <Mandala size={700} color={C.maroon} spin/>
      </div>
      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionHeader eyebrow="Why Partner With Us" title="What Makes Kalinga Arts the Export Partner You Need"
          subtitle="Nine pillars of trust that global buyers come back to, year after year."/>
        <StaggerGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
          {WHY_FEATURES.map((f,i)=>(
            <motion.div key={i} variants={V.fadeUp} className="card-lift"
              style={{ padding:'32px 28px', background:C.cream, border:`1px solid rgba(123,22,38,0.1)`, transition:'border-color 0.4s ease' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(123,22,38,0.3)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(123,22,38,0.1)'}>
              <div style={{ fontSize:30, marginBottom:16 }}>{f.icon}</div>
              <h3 className="f-display" style={{ fontSize:16, fontWeight:600, color:C.maroon, marginBottom:10, letterSpacing:0.3 }}>{f.title}</h3>
              <div className="gold-bar" style={{ width:30, marginBottom:12 }}/>
              <p style={{ fontSize:13.5, color:C.body, lineHeight:1.75 }}>{f.desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
      <div className="pattern-stripe" style={{ position:'absolute', bottom:0, left:0, right:0 }}/>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 5 — EXPORT PROCESS  (cream background)
// ═══════════════════════════════════════════════════════════════════════
const PROCESS_STEPS = [
  { num:'01', title:'Product Selection',  desc:'Browse our catalog or share your concept. We guide you to the right artisan category.', icon:'🔍' },
  { num:'02', title:'Customization',      desc:'Design, size, finish, material, branding — we co-create to your exact specification.',   icon:'✏️' },
  { num:'03', title:'Sampling',           desc:'Receive physical samples before committing to production. Revise until perfect.',         icon:'📋' },
  { num:'04', title:'Production',         desc:'Artisan workshops execute with milestone tracking. Full transparency at every stage.',     icon:'🏺' },
  { num:'05', title:'Quality Check',      desc:'Three-stage inspection — material, mid-production, and pre-shipment quality assurance.', icon:'✅' },
  { num:'06', title:'Export Packaging',   desc:'International-grade packing with customs documentation, COO, and phytosanitary support.', icon:'📦' },
  { num:'07', title:'Global Shipping',    desc:'Sea, air, or courier delivery worldwide with real-time tracking and insured logistics.',  icon:'🚢' },
];

function ProcessSection() {
  return (
    <section id="process" style={{ padding:'120px 48px', background:C.cream, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, right:0, opacity:0.04 }}><Mandala size={500} color={C.maroon}/></div>
      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionHeader eyebrow="How We Work" title="Our Export Process"
          subtitle="A seamless journey from initial inquiry to your doorstep — seven steps refined through thousands of international shipments."/>
        <div style={{ position:'relative' }}>
          <div style={{ position:'absolute', top:48, left:'4%', right:'4%', height:1, background:`linear-gradient(90deg,transparent,${C.gold},${C.goldDark},${C.gold},transparent)`, zIndex:0, opacity:0.5 }}/>
          <StaggerGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, position:'relative', zIndex:1 }}>
            {PROCESS_STEPS.map((step,i)=><ProcessStep key={i} {...step} index={i}/>)}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ num, title, desc, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div variants={V.fadeUp} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
      <motion.div
        animate={{ scale:hov?1.1:1, boxShadow:hov?`0 0 0 8px rgba(123,22,38,0.08)`:'0 0 0 0 transparent' }}
        transition={{ duration:0.35 }}
        style={{
          width:80, height:80, borderRadius:'50%',
          background: hov ? `linear-gradient(135deg,${C.maroon},${C.maroonMid})` : C.offWhite,
          border:`2px solid ${hov ? C.maroon : 'rgba(123,22,38,0.2)'}`,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          marginBottom:16, cursor:'default', zIndex:2, position:'relative',
          transition:'background 0.35s, border-color 0.35s',
        }}>
        <span style={{ fontSize:22, lineHeight:1 }}>{icon}</span>
        <span style={{ fontSize:10, color:hov?C.cream:C.maroon, fontWeight:700, letterSpacing:1, fontFamily:'Inter,sans-serif' }}>{num}</span>
      </motion.div>
      <h4 className="f-display" style={{ fontSize:13.5, fontWeight:600, color:C.maroon, marginBottom:8, letterSpacing:0.3, lineHeight:1.3 }}>{title}</h4>
      <p style={{ fontSize:12, color:C.body, lineHeight:1.65 }}>{desc}</p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 6 — CRAFTSMANSHIP  (off-white / parchment background)
// ═══════════════════════════════════════════════════════════════════════
const CRAFT_STATS = [
  { value:'500+', label:'Master Artisans'  },
  { value:'20+',  label:'Craft Disciplines'},
  { value:'3',    label:'Generations Deep' },
  { value:'∞',    label:'Stories Told'     },
];

function CraftsmanshipSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] });
  const yP = useTransform(scrollYProgress, [0,1], ['-6%','6%']);

  return (
    <section ref={ref} id="craftsmanship" style={{
      position:'relative', minHeight:'85vh', display:'flex', alignItems:'center',
      overflow:'hidden', background:`linear-gradient(135deg,${C.offWhite} 0%,${C.parchment} 35%,${C.sand} 65%,${C.offWhite} 100%)`,
    }}>
      {/* Subtle texture */}
      <motion.div style={{ y:yP, position:'absolute', inset:0, zIndex:0 }}>
        <div style={{
          position:'absolute', inset:0, opacity:0.04,
          backgroundImage:`repeating-linear-gradient(87deg,transparent 0,transparent 3px,rgba(123,22,38,1) 3px,rgba(123,22,38,1) 4px), repeating-linear-gradient(180deg,transparent 0,transparent 18px,rgba(123,22,38,0.5) 18px,rgba(123,22,38,0.5) 19px)`,
        }}/>
      </motion.div>

      {/* Giant mandala bg */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.05, zIndex:1 }}>
        <Mandala size={900} color={C.maroon} spin/>
      </div>
      <div style={{ position:'absolute', left:-100, top:'10%', opacity:0.06, zIndex:1 }} className="anim-spin-r">
        <Mandala size={350} color={C.gold}/>
      </div>
      <div style={{ position:'absolute', right:-80, bottom:'5%', opacity:0.06, zIndex:1 }} className="anim-spin">
        <Mandala size={280} color={C.maroon}/>
      </div>

      <div className="pattern-stripe" style={{ position:'absolute', top:0, left:0, right:0, zIndex:4 }}/>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'100px 48px', position:'relative', zIndex:5, width:'100%' }} className="ka-section-pad">
        <Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32, justifyContent:'center' }}>
            <div className="gold-bar" style={{ width:50 }}/>
            <LotusDecor/>
            <span className="f-luxury" style={{ color:C.gold, fontSize:13, letterSpacing:4, textTransform:'uppercase' }}>The Soul of Our Work</span>
            <LotusDecor/>
            <div className="gold-bar" style={{ width:50 }}/>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="f-display" style={{
            textAlign:'center', fontSize:'clamp(2.2rem,5.5vw,4.8rem)', fontWeight:800,
            color:C.maroon, lineHeight:1.1, marginBottom:16,
          }}>
            Every Chisel Mark<br/>
            <span className="text-grad">Carries a Thousand Years</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="f-luxury" style={{
            textAlign:'center', fontSize:'clamp(1.1rem,2.2vw,1.45rem)', color:C.body,
            maxWidth:680, margin:'0 auto 56px', lineHeight:1.75, fontStyle:'italic',
          }}>
            In Rajasthan, craft is not a trade — it is a royal inheritance. Families in
            Jaipur, Jodhpur, and Udaipur have shaped palaces, shaped rituals, and now shape
            the objects that travel to living rooms and sacred spaces across the globe.
          </p>
        </Reveal>

        {/* Stats */}
        <StaggerGroup style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:32, marginBottom:64 }}>
          {CRAFT_STATS.map((s,i)=>(
            <motion.div key={i} variants={V.scaleIn} style={{ textAlign:'center' }}>
              <div className="f-display shimmer-maroon" style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:800, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:12, color:C.muted, letterSpacing:2.5, textTransform:'uppercase', marginTop:6 }}>{s.label}</div>
            </motion.div>
          ))}
        </StaggerGroup>

        {/* Two column */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24 }}>
          <Reveal variant="slideLeft">
            <div style={{ padding:'32px', background:'rgba(255,255,255,0.7)', border:`1px solid rgba(123,22,38,0.12)`, backdropFilter:'blur(6px)' }}>
              <div style={{ fontSize:36, marginBottom:16 }}>🪵</div>
              <h3 className="f-display" style={{ fontSize:20, color:C.maroon, marginBottom:12 }}>Rajasthani Wood Craft Heritage</h3>
              <div className="gold-bar" style={{ width:32, marginBottom:14 }}/>
              <p style={{ fontSize:14, color:C.body, lineHeight:1.8 }}>
                The craftsmen of Rajasthan work with Sheesham, Mango, and Teak — carving intricate
                patterns inspired by Mughal court aesthetics, Rajasthani miniature painting, and
                sacred geometry. A single sculpture may take 40 hours of patient, meditative work.
              </p>
            </div>
          </Reveal>
          <Reveal variant="slideRight">
            <div style={{ padding:'32px', background:'rgba(255,255,255,0.7)', border:`1px solid rgba(123,22,38,0.12)`, backdropFilter:'blur(6px)' }}>
              <div style={{ fontSize:36, marginBottom:16 }}>🎨</div>
              <h3 className="f-display" style={{ fontSize:20, color:C.maroon, marginBottom:12 }}>Meenakari & Block Print Mastery</h3>
              <div className="gold-bar" style={{ width:32, marginBottom:14 }}/>
              <p style={{ fontSize:14, color:C.body, lineHeight:1.8 }}>
                Traditional lacquering, Meenakari enamelling, and hand-block printing techniques
                using natural dyes and mineral pigments transform functional objects into collectible pieces.
                No two items are identical — that is not a flaw, it is the signature.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="pattern-stripe" style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:6 }}/>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 7 — GLOBAL EXPORT  (off-white)
// ═══════════════════════════════════════════════════════════════════════
const GLOBAL_CAPABILITIES = [
  { icon:'🏪', title:'Boutique Retail Stores',      desc:'Curated collections for independent luxury boutiques worldwide.'         },
  { icon:'🏨', title:'Hospitality Sourcing',        desc:'Custom décor and gifting programs for luxury hotel chains.'             },
  { icon:'🎁', title:'Corporate Gifting Firms',     desc:'Branded artisanal gifts for Fortune 500 and growing companies.'         },
  { icon:'🧘', title:'Spiritual & Wellness Stores', desc:'Authentic ritual objects, malas, and wellness décor.'                   },
  { icon:'🖼️', title:'Interior Design Studios',    desc:'Heritage pieces for residential and commercial interiors.'              },
  { icon:'🛒', title:'Wholesale Importers',         desc:'Bulk export programs with flexible MOQ structures.'                    },
];

const EXPORT_REGIONS = ['USA & Canada','United Kingdom','Germany & Austria','France & Italy','Australia & NZ','UAE & GCC','Singapore & SE Asia','Japan & South Korea'];

function GlobalSection() {
  return (
    <section id="global" style={{ padding:'120px 48px', background:C.offWhite, position:'relative', overflow:'hidden' }}>
      {/* Globe watermark */}
      <div style={{ position:'absolute', top:'50%', right:'-5%', transform:'translateY(-50%)' }}>
        <svg width="500" height="500" viewBox="0 0 500 500" opacity="0.04">
          <circle cx="250" cy="250" r="230" fill="none" stroke={C.maroon} strokeWidth="1.5"/>
          <circle cx="250" cy="250" r="170" fill="none" stroke={C.maroon} strokeWidth="1"/>
          <circle cx="250" cy="250" r="110" fill="none" stroke={C.maroon} strokeWidth="1"/>
          <ellipse cx="250" cy="250" rx="230" ry="100" fill="none" stroke={C.maroon} strokeWidth="1"/>
          <ellipse cx="250" cy="250" rx="230" ry="170" fill="none" stroke={C.maroon} strokeWidth="0.8"/>
          <line x1="20" y1="250" x2="480" y2="250" stroke={C.maroon} strokeWidth="1"/>
          <line x1="250" y1="20" x2="250" y2="480" stroke={C.maroon} strokeWidth="1"/>
        </svg>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionHeader eyebrow="Global Reach" title="Handcrafted in India. Delivered Worldwide."
          subtitle="From our artisan workshops in Jaipur, Rajasthan to your customer's hands — we manage the entire journey."/>

        <StaggerGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20, marginBottom:70 }}>
          {GLOBAL_CAPABILITIES.map((cap,i)=>(
            <motion.div key={i} variants={V.fadeUp} className="card-lift"
              style={{ padding:'28px 24px', background:C.cream, border:`1px solid rgba(123,22,38,0.1)` }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{cap.icon}</div>
              <h3 className="f-display" style={{ fontSize:15.5, fontWeight:600, color:C.maroon, marginBottom:8, letterSpacing:0.3 }}>{cap.title}</h3>
              <div className="gold-bar" style={{ width:24, marginBottom:10 }}/>
              <p style={{ fontSize:13.5, color:C.body, lineHeight:1.7 }}>{cap.desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>

        {/* Export regions bar */}
        <Reveal>
          <div style={{ padding:'40px 48px', background:C.maroon, border:`1px solid rgba(212,175,55,0.2)`, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', right:-50, top:-50, opacity:0.06 }}><Mandala size={250} color={C.cream}/></div>
            <div style={{ position:'relative', zIndex:2 }}>
              <p className="f-luxury" style={{ color:C.gold, fontSize:13, letterSpacing:4, textTransform:'uppercase', marginBottom:20 }}>Active Export Markets</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:28 }}>
                {EXPORT_REGIONS.map((region,i)=>(
                  <span key={i} style={{ padding:'7px 16px', border:'1px solid rgba(253,246,238,0.25)', color:'rgba(253,246,238,0.8)', fontSize:13, letterSpacing:1, fontFamily:'Inter,sans-serif' }}>
                    {region}
                  </span>
                ))}
              </div>
              <div style={{ display:'flex', gap:36, flexWrap:'wrap' }}>
                {[['35+','Countries'],['10K+','Units Shipped'],['98%','On-Time Delivery'],['0','Compromise on Quality']].map(([n,l],i)=>(
                  <div key={i}>
                    <div className="f-display" style={{ fontSize:26, color:C.cream, fontWeight:700 }}>{n}</div>
                    <div style={{ fontSize:11, color:'rgba(253,246,238,0.6)', letterSpacing:1.5, textTransform:'uppercase' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 8 — TESTIMONIALS  (parchment / warm cream)
// ═══════════════════════════════════════════════════════════════════════
const TESTIMONIALS = [
  { quote:"Kalinga Arts transformed our store's Indian collection. The quality is beyond what I've seen from any other supplier. Our customers can feel the authenticity the moment they touch the pieces.", name:'Isabelle Moreau',   title:'Owner, Maison Indigo',          location:'Lyon, France',           type:'Boutique Retail Store', rating:5 },
  { quote:"We sourced 2,000 units of customized wooden gift sets for our annual corporate event. Not only was the quality impeccable, but the communication and delivery were absolutely seamless.",        name:'Jonathan Weller',  title:'Head of Procurement',           location:'London, UK',             type:'Corporate Gifting',     rating:5 },
  { quote:"As a spiritual wellness store, authenticity is everything. Kalinga Arts delivers the real thing — items that carry genuine energy and craftsmanship. Our customers ask for more every season.",   name:'Priya Nambiar',    title:'Founder, Sacred Space Co.',     location:'San Francisco, USA',     type:'Spiritual Retail',      rating:5 },
  { quote:"The bespoke décor pieces we received for our hotel lobby exceeded every expectation. Kalinga Arts understood our vision perfectly and delivered with an artistry we could not find anywhere else.",name:'Rashid Al Mansoori',title:'Design Director, Palacial Hotels',location:'Dubai, UAE',            type:'Hospitality Sourcing',  rating:5 },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  return (
    <section style={{ padding:'120px 48px', background:C.parchment, position:'relative', overflow:'hidden' }}>
      <div className="pattern-stripe" style={{ position:'absolute', top:0, left:0, right:0 }}/>
      <div style={{ position:'absolute', top:'50%', left:'-5%', transform:'translateY(-50%)', opacity:0.04 }}>
        <Mandala size={600} color={C.maroon} spin/>
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionHeader eyebrow="Global Voices" title="What Our Buyers Say"
          subtitle="Partnerships built on trust, quality, and the shared love of authentic craftsmanship."/>

        {/* Active testimonial */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-30 }} transition={{ duration:0.5 }}
            style={{ padding:'48px 52px', background:'rgba(255,255,255,0.75)', border:`1px solid rgba(123,22,38,0.12)`, backdropFilter:'blur(8px)', position:'relative', marginBottom:28 }}>
            {/* Big quote mark */}
            <div className="f-luxury" style={{ position:'absolute', top:20, left:32, fontSize:120, lineHeight:1, color:C.maroon, opacity:0.08, fontWeight:700, userSelect:'none' }}>"</div>
            {/* Stars */}
            <div style={{ marginBottom:18 }}>
              {[...Array(TESTIMONIALS[active].rating)].map((_,i)=>(
                <span key={i} style={{ color:C.gold, fontSize:18, marginRight:3 }}>★</span>
              ))}
            </div>
            <p className="f-luxury" style={{ fontSize:'clamp(1.1rem,2vw,1.4rem)', color:C.maroon, lineHeight:1.8, fontStyle:'italic', marginBottom:30, position:'relative', zIndex:2 }}>
              "{TESTIMONIALS[active].quote}"
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:18 }}>
              <div style={{ width:50, height:50, borderRadius:'50%', background:`linear-gradient(135deg,${C.maroon},${C.maroonMid})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="f-display" style={{ fontSize:20, color:C.cream, fontWeight:700 }}>{TESTIMONIALS[active].name[0]}</span>
              </div>
              <div>
                <div className="f-display" style={{ fontSize:15, fontWeight:600, color:C.maroon }}>{TESTIMONIALS[active].name}</div>
                <div style={{ fontSize:12.5, color:C.body }}>{TESTIMONIALS[active].title} · {TESTIMONIALS[active].location}</div>
                <div style={{ fontSize:11, color:C.muted, letterSpacing:1.5, textTransform:'uppercase', marginTop:2 }}>{TESTIMONIALS[active].type}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:10, marginBottom:28 }}>
          {TESTIMONIALS.map((_,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{ background:'none', border:'none', cursor:'pointer', padding:'8px 0' }}>
              <div style={{ width:i===active?30:8, height:2, background:i===active?C.maroon:'rgba(123,22,38,0.25)', transition:'all 0.4s ease' }}/>
            </button>
          ))}
        </div>

        {/* Mini cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12 }}>
          {TESTIMONIALS.map((t,i)=>(
            <button key={i} onClick={()=>setActive(i)}
              style={{ padding:'14px 18px', background:i===active?'rgba(123,22,38,0.06)':C.cream, border:`1px solid rgba(123,22,38,${i===active?0.3:0.1})`, cursor:'pointer', textAlign:'left', transition:'all 0.3s' }}>
              <div style={{ fontSize:12, fontWeight:600, color:i===active?C.maroon:C.muted, fontFamily:'Inter,sans-serif', marginBottom:2 }}>{t.name}</div>
              <div style={{ fontSize:11, color:C.muted, fontFamily:'Inter,sans-serif' }}>{t.location}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="pattern-stripe" style={{ position:'absolute', bottom:0, left:0, right:0 }}/>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 9 — CONTACT  (cream background)
// ═══════════════════════════════════════════════════════════════════════
function ContactSection() {
  const [form, setForm] = useState({ name:'', company:'', email:'', country:'', category:'', message:'' });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f=>({ ...f, [e.target.name]:e.target.value }));
  const submit = e => { e.preventDefault(); setSent(true); };

  return (
    <section id="contact" style={{ padding:'120px 48px', position:'relative', overflow:'hidden', background:C.offWhite }}>
      <div className="pattern-stripe" style={{ position:'absolute', top:0, left:0, right:0, zIndex:3 }}/>
      <div style={{ position:'absolute', top:'10%', right:'5%', opacity:0.05 }} className="anim-spin-r">
        <Mandala size={300} color={C.maroon}/>
      </div>
      <div style={{ position:'absolute', bottom:'5%', left:'3%', opacity:0.04 }} className="anim-spin">
        <Mandala size={220} color={C.gold}/>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:5 }}>
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <LotusDecor/>
            <h2 className="f-display" style={{ fontSize:'clamp(2rem,4.5vw,3.5rem)', fontWeight:700, color:C.maroon, lineHeight:1.2, margin:'20px 0 14px' }}>
              Let's Build Global Handcrafted<br/><span className="text-grad">Experiences Together</span>
            </h2>
            <div className="gold-bar" style={{ width:80, margin:'0 auto 16px' }}/>
            <p className="f-luxury" style={{ fontSize:'clamp(1.1rem,2vw,1.3rem)', color:C.body, maxWidth:560, margin:'0 auto', lineHeight:1.7, fontStyle:'italic' }}>
              Whether you're sourcing 50 pieces or 50,000, we are ready to craft the perfect export experience for your business.
            </p>
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:48 }}>
          {/* Contact info */}
          <Reveal variant="slideLeft">
            <div>
              {[
                { icon:'📧', label:'Email',          value:'kalingaartsai@gmail.com',  href:'mailto:kalingaartsai@gmail.com?subject=Export Inquiry — Kalinga Arts' },
                { icon:'💬', label:'WhatsApp',       value:'+91 94140 74067',           href:'https://wa.me/919414074067?text=Hi%20Kalinga%20Arts%2C%20I\'m%20interested%20in%20export%20sourcing.' },
                { icon:'👤', label:'CEO & Founder',  value:'Mr. Mukesh Chauhan',        href:null },
                { icon:'🏭', label:'Business Type',  value:'Manufacturer, Wholesaler & Exporter', href:null },
                { icon:'📍', label:'Based In',       value:'Jaipur, Rajasthan, India',  href:null },
                { icon:'🕐', label:'Response Time',  value:'Within 24 hours (IST)',     href:null },
              ].map((item,i)=>(
                <a key={i} href={item.href||undefined} target={item.href&&item.href.includes('wa.me')?'_blank':undefined}
                  rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:20, textDecoration:'none' }}>
                  <div style={{ width:42, height:42, flexShrink:0, background:'rgba(123,22,38,0.06)', border:`1px solid rgba(123,22,38,0.15)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize:10.5, color:C.gold, letterSpacing:2.5, textTransform:'uppercase', marginBottom:3, fontFamily:'Inter,sans-serif' }}>{item.label}</div>
                    <div style={{ fontSize:14, color: item.href ? C.maroon : C.body, fontFamily:'Inter,sans-serif', lineHeight:1.5, fontWeight: item.href ? 500 : 400 }}>{item.value}</div>
                  </div>
                </a>
              ))}

              {/* Quick CTA buttons */}
              <div style={{ marginTop:28, display:'flex', flexDirection:'column', gap:12 }}>
                <a href="https://wa.me/919414074067?text=Hi%20Kalinga%20Arts%2C%20I'm%20interested%20in%20export%20sourcing." target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 22px', background:'#25D366', color:'#fff', textDecoration:'none', fontSize:14, fontWeight:500, letterSpacing:1, fontFamily:'Inter,sans-serif', transition:'opacity 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                  <span style={{ fontSize:18 }}>💬</span> Chat on WhatsApp
                </a>
                <a href="mailto:kalingaartsai@gmail.com?subject=Export Inquiry — Kalinga Arts"
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 22px', background:'transparent', border:`1.5px solid ${C.maroon}`, color:C.maroon, textDecoration:'none', fontSize:14, fontWeight:500, letterSpacing:1, fontFamily:'Inter,sans-serif', transition:'all 0.3s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=C.maroon; e.currentTarget.style.color=C.cream; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=C.maroon; }}>
                  <span style={{ fontSize:18 }}>📧</span> Send Email Inquiry
                </a>
              </div>

              {/* Trust badges */}
              <div style={{ marginTop:32, paddingTop:24, borderTop:`1px solid rgba(123,22,38,0.12)` }}>
                <p style={{ fontSize:11, color:C.gold, letterSpacing:2.5, textTransform:'uppercase', marginBottom:12, fontFamily:'Inter,sans-serif' }}>Export Trust Indicators</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {['MSME Registered','GST Compliant','Export License','ISO Practices'].map((t,i)=>(
                    <span key={i} style={{ padding:'5px 12px', border:`1px solid rgba(123,22,38,0.2)`, fontSize:11, color:C.maroon, letterSpacing:1, fontFamily:'Inter,sans-serif' }}>✓ {t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variant="slideRight">
            {!sent ? (
              <form onSubmit={submit}>
                {[
                  { name:'name',  label:'Full Name',     type:'text',  placeholder:'Your full name',     req:true,  full:true  },
                  { name:'email', label:'Email Address',  type:'email', placeholder:'your@email.com',     req:true,  full:true  },
                ].map(f=>(
                  <div key={f.name} style={{ marginBottom:16 }}>
                    <label style={{ display:'block', fontSize:11, color:C.gold, letterSpacing:2, textTransform:'uppercase', marginBottom:7, fontFamily:'Inter,sans-serif' }}>{f.label} {f.req&&'*'}</label>
                    <input className="lux-input" type={f.type} name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} required={f.req}/>
                  </div>
                ))}

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
                  <div>
                    <label style={{ display:'block', fontSize:11, color:C.gold, letterSpacing:2, textTransform:'uppercase', marginBottom:7, fontFamily:'Inter,sans-serif' }}>Company</label>
                    <input className="lux-input" type="text" name="company" value={form.company} onChange={handle} placeholder="Company name"/>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:11, color:C.gold, letterSpacing:2, textTransform:'uppercase', marginBottom:7, fontFamily:'Inter,sans-serif' }}>Country *</label>
                    <input className="lux-input" type="text" name="country" value={form.country} onChange={handle} placeholder="Your country" required/>
                  </div>
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontSize:11, color:C.gold, letterSpacing:2, textTransform:'uppercase', marginBottom:7, fontFamily:'Inter,sans-serif' }}>Interest Category</label>
                  <select className="lux-input" name="category" value={form.category} onChange={handle} style={{ appearance:'none', WebkitAppearance:'none', cursor:'pointer' }}>
                    <option value="">Select a category</option>
                    {['Wooden Handicrafts','Spiritual & Pooja Décor','Luxury Gifting','Home Décor & Lifestyle','Corporate Gifts','Boutique Collections','Custom / OEM','Multiple Categories'].map(o=>(
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom:24 }}>
                  <label style={{ display:'block', fontSize:11, color:C.gold, letterSpacing:2, textTransform:'uppercase', marginBottom:7, fontFamily:'Inter,sans-serif' }}>Message / Requirements</label>
                  <textarea className="lux-input" name="message" value={form.message} onChange={handle} placeholder="Tell us about your requirements — quantity, customization, timeline..."/>
                </div>

                <button type="submit" style={{
                  width:'100%', padding:'15px', background:`linear-gradient(135deg,${C.maroon},${C.maroonMid})`,
                  color:C.cream, border:'none', fontSize:13, fontWeight:600, letterSpacing:2.5, textTransform:'uppercase',
                  cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.35s',
                }}
                onMouseEnter={e=>{ e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow=`0 12px 30px rgba(123,22,38,0.4)`; }}
                onMouseLeave={e=>{ e.target.style.transform='none'; e.target.style.boxShadow='none'; }}>
                  Submit Export Inquiry
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                style={{ textAlign:'center', padding:'60px 40px', background:'rgba(123,22,38,0.05)', border:`1px solid rgba(123,22,38,0.2)` }}>
                <div style={{ fontSize:52, marginBottom:20 }}>🙏</div>
                <h3 className="f-display" style={{ fontSize:24, color:C.maroon, marginBottom:12 }}>Inquiry Received</h3>
                <p className="f-luxury" style={{ fontSize:17, color:C.body, lineHeight:1.7, fontStyle:'italic' }}>
                  Namaste, {form.name||'dear friend'}. Our export team will reach you within 24 hours. We look forward to crafting something extraordinary together.
                </p>
              </motion.div>
            )}
          </Reveal>
        </div>
      </div>
      <div className="pattern-stripe" style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:3 }}/>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 10 — FOOTER  (sand / warm cream background)
// ═══════════════════════════════════════════════════════════════════════
const FOOTER_LINKS = {
  'Collections': ['Wooden Handicrafts','Spiritual Décor','Luxury Gifting','Home Décor','Corporate Gifts','Boutique Export'],
  'Services':    ['Custom Manufacturing','Private Labeling','Export Packaging','Wholesale Supply','Hospitality Sourcing'],
  'Export':      ['USA & Canada','Europe','UAE & GCC','SE Asia','Australia & NZ'],
};

function Footer() {
  return (
    <footer style={{ background:C.sand, color:C.maroon, position:'relative', overflow:'hidden' }}>
      <div className="pattern-stripe" style={{ position:'absolute', top:0, left:0, right:0 }}/>
      <div style={{ position:'absolute', bottom:-80, right:-80, opacity:0.05 }}><Mandala size={400} color={C.maroon}/></div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'72px 48px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr repeat(3,1fr)', gap:48, marginBottom:52 }}>
          {/* Brand */}
          <div>
            <img src="/logo.webp" alt="Kalinga Arts" style={{ height:58, width:'auto', objectFit:'contain', marginBottom:14, display:'block' }}
              onError={e=>{ e.target.style.display='none'; }}/>
            <div className="f-display" style={{ fontSize:20, fontWeight:800, color:C.maroon, letterSpacing:1, marginBottom:4 }}>KALINGA ARTS</div>
            <div className="f-luxury" style={{ fontSize:12, color:C.goldDark, letterSpacing:4, textTransform:'uppercase', marginBottom:18 }}>Handcrafted Heritage · Global Export</div>
            <p style={{ fontSize:13.5, color:C.body, lineHeight:1.8, maxWidth:260, marginBottom:26 }}>
              Manufacturer, Wholesaler &amp; Exporter of premium Indian handicrafts from Jaipur, Rajasthan. Est. 2005 by Mr. Mukesh Chauhan.
            </p>
            {/* Social */}
            <div style={{ display:'flex', gap:10 }}>
              {['Instagram','LinkedIn','Pinterest','YouTube'].map((s,i)=>(
                <a key={i} href="#" title={s}
                  style={{ width:34, height:34, border:`1px solid rgba(123,22,38,0.25)`, display:'flex', alignItems:'center', justifyContent:'center', color:C.maroon, fontSize:12, textDecoration:'none', fontFamily:'Inter,sans-serif', transition:'all 0.3s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=C.maroon; e.currentTarget.style.color=C.cream; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=C.maroon; }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([col,items])=>(
            <div key={col}>
              <h4 style={{ fontSize:11, color:C.maroon, letterSpacing:3, textTransform:'uppercase', marginBottom:18, fontFamily:'Inter,sans-serif' }}>{col}</h4>
              <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                {items.map((item,i)=>(
                  <li key={i} style={{ marginBottom:10 }}>
                    <a href="#" style={{ color:C.body, fontSize:13, textDecoration:'none', fontFamily:'Inter,sans-serif', transition:'color 0.3s' }}
                      onMouseEnter={e=>e.target.style.color=C.maroon} onMouseLeave={e=>e.target.style.color=C.body}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-bar" style={{ marginBottom:24 }}/>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:14 }}>
          <p style={{ fontSize:12.5, color:C.muted, fontFamily:'Inter,sans-serif' }}>
            © {new Date().getFullYear()} Kalinga Arts. All rights reserved. Crafted with love in Jaipur, Rajasthan, India. 🙏
          </p>
          <div style={{ display:'flex', gap:22 }}>
            {['Privacy Policy','Export Terms','Cookie Policy'].map((t,i)=>(
              <a key={i} href="#" style={{ fontSize:12, color:C.muted, textDecoration:'none', fontFamily:'Inter,sans-serif', transition:'color 0.3s' }}
                onMouseEnter={e=>e.target.style.color=C.maroon} onMouseLeave={e=>e.target.style.color=C.muted}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ────────────────────────────────────────────────
function FloatingWhatsApp() {
  const [show, setShow]       = useState(false);
  const [tooltip, setTooltip] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setShow(true),2500); return()=>clearTimeout(t); },[]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity:0, scale:0.5, x:20 }} animate={{ opacity:1, scale:1, x:0 }} exit={{ opacity:0, scale:0.5 }}
          style={{ position:'fixed', bottom:32, right:32, zIndex:150, display:'flex', alignItems:'center', gap:12 }}>
          <AnimatePresence>
            {tooltip && (
              <motion.div initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:10 }}
                style={{ padding:'10px 16px', background:C.maroon, border:`1px solid rgba(212,175,55,0.3)`, color:C.cream, fontSize:13, fontFamily:'Inter,sans-serif', whiteSpace:'nowrap' }}>
                Chat with our Export Team
              </motion.div>
            )}
          </AnimatePresence>
          <a href="https://wa.me/919414074067?text=Hi%20Kalinga%20Arts%2C%20I'm%20interested%20in%20export%20sourcing."
            target="_blank" rel="noopener noreferrer"
            onMouseEnter={()=>setTooltip(true)} onMouseLeave={()=>setTooltip(false)}
            className="anim-pm"
            style={{ width:56, height:56, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', boxShadow:'0 6px 24px rgba(37,211,102,0.4)' }}>
            <svg width="26" height="26" viewBox="0 0 28 28" fill="white">
              <path d="M14 2C7.373 2 2 7.373 2 14c0 2.104.548 4.08 1.508 5.797L2 26l4.396-1.483A11.94 11.94 0 0014 26c6.627 0 12-5.373 12-12S20.627 2 14 2zm0 21.5a9.47 9.47 0 01-4.846-1.326l-.347-.206-3.604 1.216 1.237-3.515-.226-.361A9.47 9.47 0 014.5 14C4.5 8.701 8.701 4.5 14 4.5S23.5 8.701 23.5 14 19.299 23.5 14 23.5zm5.19-7.01c-.284-.142-1.683-.83-1.944-.924-.26-.095-.45-.142-.638.142-.19.284-.732.924-.898 1.114-.165.19-.33.213-.614.071-.284-.142-1.199-.44-2.284-1.404-.844-.75-1.41-1.676-1.576-1.96-.165-.284-.018-.437.124-.578.127-.127.284-.331.425-.496.142-.165.19-.284.284-.473.095-.19.048-.355-.024-.497-.071-.142-.638-1.535-.874-2.1-.23-.55-.464-.475-.638-.484l-.543-.01c-.19 0-.497.071-.756.355-.26.284-1 .977-1 2.382 0 1.404 1.023 2.761 1.165 2.951.142.19 2.013 3.072 4.878 4.309.682.294 1.213.47 1.628.6.684.217 1.307.187 1.799.113.549-.082 1.683-.688 1.92-1.352.237-.663.237-1.232.166-1.352-.07-.12-.26-.19-.544-.33z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════
export default function KalingaArts() {
  return (
    <>
      <GlobalStyles/>
      <ScrollProgress/>
      <Navbar/>
      <main>
        <HeroSection/>
        <AboutSection/>
        <CollectionsSection/>
        <WhyUsSection/>
        <ProcessSection/>
        <CraftsmanshipSection/>
        <GlobalSection/>
        <TestimonialsSection/>
        <ContactSection/>
      </main>
      <Footer/>
      <FloatingWhatsApp/>
    </>
  );
}
