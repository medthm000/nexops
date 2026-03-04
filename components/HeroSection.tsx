'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import QRCodePlaceholder from './QRCodePlaceholder'

// ── Neural Network Canvas Background ─────────────────────────────
function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Blue, indigo and violet — matches the hero gradient palette
    const PALETTE = [
      { r: 37,  g: 99,  b: 235 },  // blue-600
      { r: 99,  g: 102, b: 241 },  // indigo-500
      { r: 124, g: 58,  b: 237 },  // violet-600
      { r: 59,  g: 130, b: 246 },  // blue-500
    ]

    const N = 75
    const pts = Array.from({ length: N }, () => {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      return {
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r:  Math.random() * 2.5 + 1.5,
        o:  Math.random() * 0.5 + 0.3,
        c,
      }
    })

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c.r},${p.c.g},${p.c.b},${p.o})`
        ctx.fill()
      })
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 145) {
            const alpha = 0.3 * (1 - d / 145)
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(${pts[i].c.r},${pts[i].c.g},${pts[i].c.b},${alpha})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.8 }} />
}

// ── Animated count-up ────────────────────────────────────────────
function CountUpHero({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      observer.disconnect()
      let s = 0
      const step = target / (1000 / 16)
      const timer = setInterval(() => {
        s += step
        if (s >= target) { setCount(target); clearInterval(timer) }
        else setCount(Math.floor(s))
      }, 16)
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <div ref={ref}>{count}{suffix}</div>
}

interface HeroProps {
  onStartPresentation: () => void
}

const TYPED_WORDS = ['Marketing', 'Operations', 'Analytics', 'Automation', 'Intelligence']

export default function HeroSection({ onStartPresentation }: HeroProps) {
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, -120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const word = TYPED_WORDS[wordIdx]
    if (!deleting && displayed.length < word.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % TYPED_WORDS.length)
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [displayed, deleting, wordIdx])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden aurora-bg grid-pattern">
      {/* Neural network animated background */}
      <NeuralBackground />
      {/* Soft ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)' }} />
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:pt-24 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                Next-Gen AI Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Transforming{' '}
              <br />
              <span className="gradient-text">Business</span>
              <br />
              <span className="text-slate-900">with AI</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-slate-600 text-lg" style={{ fontFamily: 'var(--font-mono)' }}>
                Powering{' '}
              </span>
              <span className="text-blue-600 font-bold text-lg min-w-[140px]" style={{ fontFamily: 'var(--font-mono)' }}>
                {displayed}
                <span className="blink">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              NexOps AI delivers enterprise-grade artificial intelligence across marketing,
              customer service, data analytics, and operations, empowering businesses to
              make smarter decisions, faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={onStartPresentation}
                className="group relative inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 blue-glow hover:blue-glow-lg hover:-translate-y-0.5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span>Start Presentation</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <a
                href="#about"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 font-medium px-4 py-4 rounded-xl transition-colors duration-200 hover:bg-blue-500/5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span>Learn More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-8 mt-12 pt-8 border-t border-slate-200"
            >
              {[
                { val: 4,   suffix: '',   label: 'AI Specialists',  isNum: true  },
                { val: 0,   suffix: '24/7', label: 'Autonomous Ops', isNum: false },
                { val: 100, suffix: '%',  label: 'Practical AI',    isNum: true  },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.isNum ? <CountUpHero target={s.val} suffix={s.suffix} /> : s.suffix}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - QR Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center lg:justify-end"
          >
            <div className="relative flex flex-col items-center gap-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg blue-glow"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse"/>
                Scan to Join · NexOps AI 2026
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative glass-blue rounded-3xl border border-blue-500/20 shadow-2xl blue-glow-lg p-6 float-anim"
              >
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"/>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg"/>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg"/>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-lg"/>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.5"/>
                        <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>NexOps AI</span>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20" style={{ fontFamily: 'var(--font-mono)' }}>LIVE</span>
                </div>

                <QRCodePlaceholder size={220} />

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Point camera at QR code</p>
                  <p className="text-xs font-semibold text-blue-400 truncate max-w-[220px]" style={{ fontFamily: 'var(--font-mono)' }}>nexopsai.vercel.app</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-2 text-slate-500 text-xs"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                Use your phone camera to scan
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-slate-300 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-blue-500 rounded-full"/>
        </motion.div>
      </motion.div>
    </section>
  )
}
