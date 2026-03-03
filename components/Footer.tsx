'use client'

import { motion } from 'framer-motion'

interface FooterProps { onStartPresentation: () => void }

export default function Footer({ onStartPresentation }: FooterProps) {
  return (
    <footer id="solutions" className="relative overflow-hidden" style={{ background: '#0d1b2e' }}>
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"/>
      {/* Soft radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)' }}/>
      </div>

      {/* ── CTA SECTION ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-blue-400 text-xs font-bold uppercase tracking-[0.35em] mb-5"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Ready to see it?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          View our{' '}
          <span className="gradient-text">AI Solutions</span>
          <br />
          presentation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          A deep dive into how NexOps AI is revolutionizing marketing, customer service, analytics, and operations.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartPresentation}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-4 rounded-full blue-glow transition-all duration-300"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <span>Launch Presentation</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M10 8l6 4-6 4V8z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* ── FOOTER BAR ── */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center blue-glow">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.5"/>
                <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
              </svg>
            </div>
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>
              NexOps <span className="text-blue-400">AI</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-slate-600 text-xs text-center" style={{ fontFamily: 'var(--font-mono)' }}>
            © 2026 NexOps AI · Transforming Business with Intelligent Solutions
          </p>

          {/* Built with */}
          <p className="text-slate-600 text-xs flex-shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
            Built with <span className="text-blue-400 font-semibold">Next.js + AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
