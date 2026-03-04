'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'     },
  { label: 'Team',     href: '#team'      },
  { label: 'AI Audit', href: '#audit',    highlight: true },
  { label: 'Solutions', href: '#solutions' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    if (scrolled) setMobileOpen(false)
  }, [scrolled])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? 'backdrop-blur-xl' : 'bg-transparent'
      }`}
      style={scrolled || mobileOpen
        ? { background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }
        : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.6"/>
                  <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
                </svg>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow"/>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              NexOps <span className="text-blue-500">AI</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`animated-underline text-sm font-medium transition-colors duration-200 ${
                  item.highlight
                    ? 'text-blue-600 font-semibold hover:text-blue-500'
                    : 'text-slate-600 hover:text-blue-500'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {item.highlight && <span className="mr-1">✦</span>}{item.label}
              </a>
            ))}
          </div>

          {/* Right side: badge + hamburger */}
          <div className="flex items-center gap-3">
            <span
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"/>
              Live Platform
            </span>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-0.5 bg-slate-700 transition-all duration-300"
                style={{ transform: mobileOpen ? 'translateY(4px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-300"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-300"
                style={{ transform: mobileOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.98)', borderTop: '1px solid #e2e8f0' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl font-medium text-sm transition-colors ${
                    item.highlight
                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.highlight ? 'bg-blue-600 animate-pulse' : 'bg-blue-400'}`}/>
                  {item.label}
                </a>
              ))}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 px-3 text-xs font-medium text-blue-600"
                style={{ fontFamily: 'var(--font-mono)' }}>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"/>
                Live Platform
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
