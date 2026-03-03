'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GeminiChat from './GeminiChat'

const NEXOPS_API_KEY = 'sk-9aebd922b58e40489df125822084472e'

interface ChatButtonProps {
  theme?: 'light' | 'dark'
}

export default function ChatButton({ theme = 'light' }: ChatButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      {/* Floating button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[9998]"
      >
        <button
          onClick={handleOpen}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-2xl flex items-center justify-center blue-glow-lg transition-all hover:scale-110 active:scale-95 relative"
        >
          <svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/>
          </span>
        </button>
        <div className="text-center mt-1.5">
          <span className={`text-[10px] font-mono ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Ask AI</span>
        </div>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <GeminiChat apiKey={NEXOPS_API_KEY} onClose={() => setOpen(false)} theme={theme} />
        )}
      </AnimatePresence>
    </>
  )
}
