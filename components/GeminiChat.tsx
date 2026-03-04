'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Message {
  role: 'user' | 'ai'
  text: string
  ts: number
}

interface GeminiChatProps {
  apiKey: string
  onClose: () => void
  theme?: 'light' | 'dark'
}

// ── Theme tokens ──────────────────────────────────────────────────
// light → dark frosted glass floating above the white page (high contrast, modern)
// dark  → subtle luminous glass blending with the dark presentation bg
const THEMES = {
  light: {
    container:  {
      background: 'rgba(8, 12, 30, 0.78)',
      backdropFilter: 'blur(32px) saturate(220%)',
      WebkitBackdropFilter: 'blur(32px) saturate(220%)',
      border: '1px solid rgba(255,255,255,0.11)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.30), 0 8px 32px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
    },
    header:     { background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' },
    messages:   { background: 'transparent' },
    aiBubble:   { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', color: '#cbd5e1' },
    suggestions:{ background: 'rgba(0,0,0,0.12)', borderTop: '1px solid rgba(255,255,255,0.06)' },
    suggBtn:    'text-blue-300 border border-blue-400/30 bg-blue-500/15 hover:bg-blue-500/25 transition-colors',
    inputArea:  { background: 'rgba(0,0,0,0.18)', borderTop: '1px solid rgba(255,255,255,0.07)' },
    inputField: 'border border-white/30 placeholder-white/35 focus:border-blue-400/70',
    inputBg:    'rgba(255,255,255,0.08)',
    textColor:   '#f1f5f9',
    placeholderColor: 'rgba(148,163,184,0.7)',
    dots:       'bg-blue-400',
    loadBubble: { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' },
  },
  dark: {
    container:  {
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(32px) saturate(180%)',
      WebkitBackdropFilter: 'blur(32px) saturate(180%)',
      border: '1px solid rgba(255,255,255,0.13)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.60), 0 0 60px rgba(59,130,246,0.07), inset 0 1px 0 rgba(255,255,255,0.10)',
    },
    header:     { background: 'rgba(0,0,0,0.28)', borderBottom: '1px solid rgba(255,255,255,0.07)' },
    messages:   { background: 'transparent' },
    aiBubble:   { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', color: '#cbd5e1' },
    suggestions:{ background: 'rgba(0,0,0,0.22)', borderTop: '1px solid rgba(255,255,255,0.06)' },
    suggBtn:    'text-blue-300 border border-blue-500/30 bg-blue-500/12 hover:bg-blue-500/22 transition-colors',
    inputArea:  { background: 'rgba(0,0,0,0.28)', borderTop: '1px solid rgba(255,255,255,0.07)' },
    inputField: 'border border-white/30 placeholder-white/35 focus:border-blue-400/70',
    inputBg:    'rgba(255,255,255,0.08)',
    textColor:   '#e2e8f0',
    placeholderColor: 'rgba(148,163,184,0.6)',
    dots:       'bg-blue-400',
    loadBubble: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' },
  },
}

const SYSTEM_CONTEXT = `You are the NexOps AI Assistant. Be concise: max 3 sentences per reply, no bullet lists unless asked.

NEXOPS AI — 4-specialist team in Morocco deploying practical AI systems for businesses.
Mission: "Accelerate business growth beyond conventional limits using the right AI at the right place."

TEAM & SERVICES:
1. Houda El Fahsi (AI Marketing) — automates content, brand assets, ad campaigns. Eliminates $5K/mo agency fees. Tools: ChatGPT, Canva AI, n8n, Meta Advantage+. Sandwich Model: Human strategy → AI execution → Human refinement. Result: 100x faster production, test 100 ad variations.
2. Soufiane Ouriaghli (Customer Support & Lead Gen) — RAG chatbot (24/7, 30+ languages, trained on client docs) + AI SDR that scans→scores→personalizes→sends leads. Results: 900h/year saved, 450K MAD value, 21x faster response (<3s), +40-60% pipeline growth by Month 3.
3. Ilyas Sadour (AI Email Management) — Gemini+n8n reads email intent, auto-labels, routes, responds. 99% accuracy. Saves 10h+/week. Fixes buried leads, missed opportunities, inbox chaos.
4. Mohamed Reda Touhami (Financial Analytics) — Agent CFO: 6 AI specialists (Planning, Accounting, Cash Flow, Financial Analysis, Risk, Audit). GPT-4o-mini+n8n. Raw CSV/Excel → financial recommendation in seconds. Fixes: no visibility, unused data, gut-feel decisions.

KEY NUMBERS: 90% micro-businesses invisible online | 35K MAD/mo for 1 human staff | 28% workday lost to email | 80% SMBs run on gut feeling | RAG accuracy 99% | 21x response speed.

RULES:
- When user asks about marketing/content/ads → mention Houda El Fahsi
- When user asks about support/chatbot/leads → mention Soufiane Ouriaghli
- When user asks about email/inbox/operations → mention Ilyas Sadour
- When user asks about finance/data/analytics → mention Mohamed Reda Touhami
- Only answer topics related to NexOps or AI for business. Otherwise: "I specialize in AI for business growth — how can I help yours?"
- When user wants to know more or try a service: ask for phone number for free consultation.
- If phone provided: "Perfect! Our team will contact you within 24 hours 🚀"`

export default function GeminiChat({ apiKey, onClose, theme = 'light' }: GeminiChatProps) {
  const t = THEMES[theme]
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I\'m the NexOps AI Assistant 👋\n\nI help businesses grow faster using AI. Tell me what type of business you run, and I\'ll suggest exactly where AI can make the biggest impact for you. 🚀', ts: Date.now() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg: Message = { role: 'user', text, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      // Build conversation history (OpenAI-compatible format for Qwen)
      const messages_payload = [
        { role: 'system', content: SYSTEM_CONTEXT },
        ...messages
          .slice(1) // skip the initial greeting
          .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: text }
      ]

      const res = await fetch(
        'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'qwen2.5-0.5b-instruct',
            messages: messages_payload,
            max_tokens: 150,
            temperature: 0.7
          })
        }
      )
      const data = await res.json()
      if (!res.ok) {
        const code = data?.error?.code || res.status
        const msg = code === 429 || code === 'Throttling.RateQuota'
          ? 'I\'m receiving too many requests right now. Please wait a moment and try again. 🙏'
          : code === 400
          ? 'Invalid request. Please try rephrasing your question.'
          : code === 401
          ? 'API key is not authorized. Please check the key.'
          : `API error (${code}). Please try again.`
        setMessages(prev => [...prev, { role: 'ai', text: msg, ts: Date.now() }])
        setLoading(false)
        return
      }
      const reply = data?.choices?.[0]?.message?.content || 'Sorry, I could not process that. Please try again.'
      setMessages(prev => [...prev, { role: 'ai', text: reply, ts: Date.now() }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error. Please try again. 🔌', ts: Date.now() }])
    }
    setLoading(false)
  }

  const SUGGESTIONS = ['How can AI grow my business?', 'What services do you offer?', 'I want a free AI audit', 'How does customer support AI work?']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-24 right-4 sm:right-8 z-[9999] w-[calc(100vw-2rem)] sm:w-96 flex flex-col"
      style={{ height: 'min(520px, calc(100dvh - 7rem))', borderRadius: '16px', ...t.container }}
    >
      {/* clip layer — separate from backdrop-filter layer so blur shows through rounded corners */}
      <div className="flex flex-col h-full rounded-2xl overflow-hidden" style={{ position: 'relative' }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3" style={t.header}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center" style={{ boxShadow: '0 0 12px rgba(59,130,246,0.5)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2a10 10 0 0110 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 4v4l3 3"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>NexOps AI</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"/>
                <span className="text-emerald-400 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>AI Powered · Live</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={t.messages}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 18 18" fill="none">
                    <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'rounded-tl-none'}`}
                style={{ fontFamily: 'var(--font-body)', ...(msg.role === 'ai' ? t.aiBubble : {}) }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 18 18" fill="none">
                  <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
                </svg>
              </div>
              <div className="px-3 py-2 rounded-xl rounded-tl-none" style={t.loadBubble}>
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(j => (
                    <motion.div key={j} className={`w-1.5 h-1.5 rounded-full ${t.dots}`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, delay: j * 0.15, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Suggestions ── */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 pt-2 flex flex-wrap gap-1.5" style={t.suggestions}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setInput(s)}
                className={`text-xs px-2.5 py-1 rounded-full transition-colors ${t.suggBtn}`}
                style={{ fontFamily: 'var(--font-mono)' }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ── Input ── */}
        <div className="px-4 pb-4 pt-3" style={t.inputArea}>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Ask NexOps AI anything..."
              className={`flex-1 rounded-xl px-3 py-2 text-sm outline-none transition-colors ${t.inputField}`}
              style={{ fontFamily: 'var(--font-body)', cursor: 'text', color: t.textColor, background: t.inputBg }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white px-3 py-2 rounded-xl transition-colors"
              style={{ boxShadow: '0 0 16px rgba(59,130,246,0.4)' }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
