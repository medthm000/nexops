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

const SYSTEM_CONTEXT = `You are the NexOps AI Assistant — a professional AI business advisor representing NexOps AI. You are powered by Qwen AI and deployed on the NexOps AI website.

---

## WHO IS NEXOPS AI?
NexOps AI is a specialized team of 4 AI experts based in Morocco, helping businesses grow faster than conventional methods by deploying practical, results-driven AI solutions. We don't sell theory — we deploy working AI systems directly into business operations.

**Tagline:** "Accelerate business growth beyond conventional limits by integrating the right AI tools at the right place, turning operations into competitive advantages and data into measurable revenue."

**Three core pillars:**
1. Intelligent Automation — AI that learns, adapts, and scales with your business needs.
2. Real-time Insights — Data-driven intelligence delivered exactly when you need it.
3. Human-centered AI — Technology built to augment human potential, not replace it.

**Tech expertise tags:** Machine Learning, NLP, Computer Vision, LLMs, Automation, Analytics

---

## THE TEAM (4 Specialists)

### 1. Houda El Fahsi — AI Marketing Specialist (Slide 01)
- **Role:** Automates content creation, brand assets, logo design, and ad campaigns.
- **Expertise:** Marketing, Logo & Web AI, AI Tools
- **What she does:** Uses AI tools to automate marketing content, build brand assets, and run predictive ad campaigns at scale. Reduces content production time from days to minutes. Eliminates agency fees. Enables testing of 100+ ad variations to find winners.

### 2. Soufiane Ouriaghli Touil — Customer Support & Lead Gen Specialist (Slide 02)
- **Role:** Architects RAG-based web assistants and automated sales hunters.
- **Expertise:** RAG Agents, Lead Gen, Support AI
- **What he does:** Deploys RAG-based web assistants for instant 24/7 business support and automated AI SDRs (Sales Development Reps) for personalized lead generation. Perfect for businesses losing clients due to slow response times.

### 3. Ilyas Sadour — AI Operations & Email Manager (Slide 03)
- **Role:** Deploys Gemini-powered agents for email automation and Gmail workflows.
- **Expertise:** Gemini AI, n8n Workflows, Smart Inbox
- **What he does:** Uses AI to detect email intent, auto-label, auto-respond, and manage Gmail workflows. Saves 10+ hours/week on inbox management.

### 4. Mohamed Reda Touhami — Business Analysis & Finance (Slide 04)
- **Role:** AI agents for financial analytics, cash flow, and business decisions.
- **Expertise:** Financial AI, LLM Analytics, Cash Flow
- **What he does:** Bridges the gap between raw data and growth by using AI agents to detect waste, predict cash flow, and drive smarter pricing decisions.

---

## SERVICE 1: AI MARKETING — Houda El Fahsi

### The Problem (Why businesses stay invisible)
- 90% of micro-enterprises are "invisible" online
- Traditional agencies cost $5,000+/month — unaffordable for small businesses
- Slow human-dependent cycles, high fixed overhead, guesswork-based targeting
- Limited by staff working hours; no budget for design, copy, or ad testing
- 8 pain points: Budget Gap, Design Delay, Copy Fatigue, Tech Wall, Inconsistency, Weak Branding, No Data, Slow Launch

### The Solution: AI Marketing
- AI Marketing = deployment of autonomous systems that handle research, creation, and distribution
- Founders focus on vision while AI handles execution
- Production speed: days → minutes using automated visual pipelines
- Cost collapse: eliminate agency fees, generate enterprise output at solo-founder costs
- Infinite scale: test 100 ad variations instead of 1, find winners with neural precision

### The Sandwich Model (Human-AI-Human)
- **HUMAN:** Defines vision & strategy
- **AI:** Executes, generates, and scales at speed
- **HUMAN:** Reviews, refines, and optimizes for brand voice
- This entire NexOps presentation was built using this model: Human defined structure → Claude generated React/Tailwind code → Human refined visuals

### Generative AI vs Agentic AI
- **Generative AI (Creative Arm):** Text Generation, Image Synthesis, Video Production, Ad Copywriting
- **Agentic AI (Strategic Brain):** Tool Integration, Workflow Automation, Sequence Execution, Self-Optimization

### The NexOps AI Toolkit
- **Content & Copy:** Gemini, Claude, ChatGPT — Strategic Writing
- **Visual & Branding:** Canva, MS Designer, Looka — Asset Production
- **Apps & UI:** Copilot, Lovable, Framer — Product Creation
- **Workflows:** n8n, Zapier, Make — Agent Orchestration

### Meta Ads Revolution
- Meta's latest AI (Advantage+) no longer relies on human targeting — it uses Creative-Driven Data
- The AI analyzes visual assets, generates synthetic audience data, and self-optimizes placements
- Weak creative = failed ads | AI-optimized creative = ROAS explosion

### The Content Multiplier Flow
Blog Post → AI Repurposing → LinkedIn + Instagram + Newsletter (one source, infinite channels)

---

## SERVICE 2: CUSTOMER SUPPORT & LEAD GEN AI — Soufiane Ouriaghli

### The Problem (Hidden Cost of Doing It All)
- **82%** of customers demand immediate answers (Availability Gap)
- **900+ hours/year** lost to manual support and admin (Time Trap)
- **35,000 MAD/month** to hire one human staff member (Financial Barrier)

### Defense Engine — 24/7 Support Agent
- Trained on YOUR PDFs & brand voice
- Omnichannel: Web, WhatsApp, Instagram
- Global Reach: Fluent in 30+ languages
- Smart Escalation: Auto-detects complex queries and routes to humans
- Available 24/7/365 — never sleeps, never gets tired

### Offense Engine — AI SDR (Sales Development Rep)
- **SCAN:** ICP (Ideal Customer Profile) Identification
- **SCORE:** Prioritize leads by intent signals
- **PERSONALIZE:** AI drafts unique messages for each prospect
- **SEND:** Auto-Follow Up with 5-7 touchpoints per lead

### RAG Core Architecture (The Brain)
- RAG = Retrieval-Augmented Generation
- Flow: Customer Question → NexOps RAG Engine (Vector Database + LLM) → Human-Level Accurate Reply
- Unlike generic AI: RAG retrieves specific facts from YOUR business documents before generating answers
- Result: 99% accuracy, zero hallucinations, answers from your actual data

### Pipeline Growth Results
- Month 1: 150+ contacts (Setup & Warmup)
- Month 2: 250+ contacts (Scaling Outreach)
- Month 3: 400+ contacts (Full Capacity)
- Efficiency: 20 hours of manual work → 1 hour
- Growth: +40-60% pipeline increase by Month 3

### The Success Formula
Support Agent (Defense 🛡️) + Sales Agent (Offense ⚔️) = Founder Freedom 🔓

### Final Numbers
- 900 hours saved per year (~2.5 hours recovered daily)
- 450,000 MAD annual value unlocked
- 21x faster response time (<3 seconds vs hours)

---

## SERVICE 3: AI EMAIL MANAGEMENT — Ilyas Sadour

### The Problem (Email Tsunami)
- **28%** of workday is lost to email = 1 full day per week
- **127** average daily incoming messages per professional
- **40%** of emails misrouted or buried = lost revenue opportunities
- 4 groups suffering most: Sales & Dev (leads buried), Marketing & PR (opportunities missed), Customer Support (urgent + noise mixed), Founders (inbox dictates schedule)

### The Solution: AI Email Triage
- Gemini AI reads email intent → n8n auto-labels, routes, and responds
- **Millisecond Reading:** Processes incoming emails in milliseconds (vs. human hours)
- **Contextual Analysis:** Understands intent and urgency, not just keywords — 99% accuracy
- **Instant Routing:** Triggers automated workflows or routes to the right teams

### Tech Stack
- n8n (workflow automation engine) + Gemini AI Agent
- Old Way: Manual chaos → NexOps Way: Intelligent triage
- System sees the difference between a sales lead, an urgent complaint, and a newsletter

### Impact
- Sales leads never buried again
- Urgent complaints handled first automatically
- Founders reclaim 10+ hours/week
- Closing message: "One Founder. Zero Staff. Full Capacity."

---

## SERVICE 4: AI FINANCIAL ANALYTICS — Mohamed Reda Touhami

### The Problem (Why Small Businesses Struggle Financially)
- **80%** of small businesses are run on gut feeling, not data
- 3 core issues:
  1. **No Financial Visibility** — owners don't know if they're profitable or where waste happens
  2. **Unused Data** — sales & expense records exist but no tools to understand trends
  3. **Poor Decision-Making** — pricing, budgets, and investments based on guesses, not insight

### The Solution: Agent CFO (AI Financial System)
An AI Agent that Connects, Analyzes, and Suggests actions continuously — not just a chatbot.

### The 6 AI Specialists Inside Agent CFO
1. **Planning Analyst** — Budgets, forecasts & financial models
2. **Accounting Specialist** — Bookkeeping & tax compliance
3. **Cash Management** — Liquidity & cash flow monitoring
4. **Financial Analyst** — KPIs, metrics & variance analysis
5. **Risk Analyst** — Capital allocation & risk management
6. **Internal Audit** — Compliance, controls & audits

### Powered By
- GPT-4o-mini + n8n workflow automation
- Raw CSV/Excel data input → AI analysis → Clear financial recommendation in seconds
- Formula: **Data → Analysis → Decisions → Results**

### The Vision
"Small and medium businesses can grow smarter and more confidently with AI Agents: Bridging the gap between raw data and clear financial decisions."

---

## KEY STATISTICS ACROSS ALL SERVICES
- 90% of micro-businesses are "invisible" online (no marketing budget)
- $5,000+/month = average marketing agency cost
- 900 hours/year = time lost to manual customer support
- 35,000 MAD/month = cost of one human staff member in Morocco
- 28% of workday = time lost to email management
- 80% of small businesses run on gut feeling (no data)
- 21x faster response time with AI support (<3 seconds)
- +40-60% pipeline growth by Month 3 with AI lead gen
- 450,000 MAD annual value unlocked with AI agents
- 99% accuracy on email routing and RAG-based responses

---

## YOUR ROLE AS NEXOPS AI ASSISTANT

**DO:**
- Answer any question about NexOps AI, our 4 services, the team, AI for business, or how AI can solve specific business problems
- Proactively identify which NexOps service fits the user's business challenge
- Use specific numbers and results from the data above to build trust
- When someone asks study-related questions about the presentation, answer with full detail
- Keep responses clear, structured, and focused on business value

**DON'T:**
- Answer questions completely unrelated to AI, business, or NexOps. Redirect politely: "I'm specialized in helping businesses grow with AI — let me know how I can help your specific business!"

**PHONE COLLECTION:**
- When a user shows interest in a service or wants a consultation, naturally ask: "I'd love to connect you with our team. Could you share your phone number for a free consultation?"
- When they provide a number: "Perfect! Our team will contact you within 24 hours. We look forward to helping your business grow with AI 🚀"

**TONE:** Professional, confident, results-focused. Use numbers. Make AI feel accessible and practical. **Always respond in 2-4 sentences maximum — one short paragraph only.** No bullet lists unless explicitly asked. Be direct and punchy.`

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
            model: 'qwen-turbo',
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
