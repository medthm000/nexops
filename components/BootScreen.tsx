'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootScreenProps {
  onComplete: () => void
}

const BOOT_LINES = [
  { text: 'NEXOPS AI SYSTEM v2.6.0', delay: 0, color: 'text-blue-400', bold: true },
  { text: 'Initializing core modules...', delay: 300, color: 'text-slate-400' },
  { text: '> Loading Neural Engine.............. [OK]', delay: 700, color: 'text-slate-500' },
  { text: '> Mounting Knowledge Base............ [OK]', delay: 1100, color: 'text-slate-500' },
  { text: '> Connecting Gemini Interface........ [OK]', delay: 1500, color: 'text-slate-500' },
  { text: '> Syncing LLM Agents................. [OK]', delay: 1900, color: 'text-slate-500' },
  { text: '> Deploying Marketing Module......... [OK]', delay: 2200, color: 'text-slate-500' },
  { text: '> Deploying Customer AI Module....... [OK]', delay: 2500, color: 'text-slate-500' },
  { text: '> Deploying Operations Module........ [OK]', delay: 2800, color: 'text-slate-500' },
  { text: '> Deploying Finance Analytics........ [OK]', delay: 3100, color: 'text-slate-500' },
  { text: 'All systems operational.', delay: 3500, color: 'text-emerald-400', bold: true },
  { text: 'Launching NexOps AI Interface...', delay: 3900, color: 'text-blue-300' },
]

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'boot' | 'progress' | 'flash' | 'done'>('boot')
  const [showFlash, setShowFlash] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    })

    // Start progress bar after lines
    setTimeout(() => setPhase('progress'), 4100)
  }, [])

  useEffect(() => {
    if (phase !== 'progress') return
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 4 + 2
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setShowFlash(true)
          setPhase('flash')
          setTimeout(() => {
            if (!completedRef.current) {
              completedRef.current = true
              onComplete()
            }
          }, 600)
        }, 300)
      }
      setProgress(p)
    }, 60)
    return () => clearInterval(interval)
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {!showFlash && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] bg-[#020408] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scanline effect */}
          <div className="scanline" />

          {/* Grid */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Radial glow center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
          </div>

          <div className="relative z-10 w-full max-w-2xl px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center blue-glow">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.5"/>
                  <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  NexOps <span className="text-blue-400">AI</span>
                </div>
                <div className="text-slate-600 text-xs font-mono">Enterprise AI Platform · 2026</div>
              </div>
            </motion.div>

            {/* Terminal */}
            <div className="bg-black/60 border border-blue-500/20 rounded-2xl p-6 font-mono text-sm mb-8 min-h-[280px]"
              style={{ fontFamily: 'var(--font-mono)' }}>
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-slate-600 text-xs">nexops-ai - boot</span>
              </div>

              <div className="space-y-1.5">
                {BOOT_LINES.map((line, i) => (
                  <AnimatePresence key={i}>
                    {visibleLines.includes(i) && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${line.color} ${line.bold ? 'font-bold' : ''} text-xs leading-relaxed`}
                      >
                        {line.text}
                        {i === visibleLines[visibleLines.length - 1] && i < BOOT_LINES.length - 1 && (
                          <span className="blink ml-1">█</span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            {phase === 'progress' || phase === 'flash' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-400 text-xs font-mono font-bold uppercase tracking-widest">
                    System Loading
                  </span>
                  <span className="text-blue-400 text-xs font-mono font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                {progress >= 100 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest"
                  >
                    ✓ All Systems Ready - Launching...
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="h-8" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
