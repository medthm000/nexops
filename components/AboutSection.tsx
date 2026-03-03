'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

const pillars = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    title: 'Intelligent Automation',
    desc: 'AI that learns, adapts, and scales with your business needs.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    title: 'Real-time Insights',
    desc: 'Data-driven intelligence delivered exactly when you need it.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    title: 'Human-centered AI',
    desc: 'Technology built to augment human potential, not replace it.',
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-16 lg:py-32 relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right, rgba(37,99,235,0.06) 0%, transparent 70%)' }}/>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)' }}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-blue-500"/>
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>About Us</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Small team.{' '}<span className="gradient-text">Big impact.</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              NexOps AI is a focused team of four AI specialists dedicated to helping businesses unlock the transformative power of artificial intelligence. We specialize in practical, deployable AI solutions, not theoretical concepts.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-slate-600 leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)' }}>
              From automating customer service workflows to building predictive marketing engines, our mission is to make enterprise-grade AI accessible to businesses of every size.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-6 bg-blue-600 rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
              <div className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Our Mission</div>
              <p className="text-white text-lg font-medium leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                &quot;To accelerate business growth beyond conventional limits, by integrating the right AI tools at the right place, turning operations into competitive advantages and data into measurable revenue.&quot;
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200">
              {[
                { target: 4, suffix: '', label: 'Specialists' },
                { target: 100, suffix: '%', label: 'Practical AI' },
                { target: 24, suffix: '/7', label: 'Autonomous' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Pillars */}
          <div className="space-y-5">
            {pillars.map((pillar, i) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="card-hover flex items-start gap-5 p-6 rounded-2xl hover:border-blue-300"
                style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{pillar.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{pillar.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-2 pt-2">
              {['Machine Learning', 'NLP', 'Computer Vision', 'LLMs', 'Automation', 'Analytics'].map((tag) => (
                <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full" style={{ fontFamily: 'var(--font-mono)' }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


