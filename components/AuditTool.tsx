'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── Question definitions ──────────────────────────────────────────────────────
type QChoice = { label: string; icon: string }
type Question = {
  id: string
  category: string
  question: string
  choices: QChoice[]
  cols: 2 | 4
}

const QUESTIONS: Question[] = [
  // ── Business Profile ───────────────────────────────────────────────────────
  {
    id: 'industry', category: 'Business Profile',
    question: 'What industry is your business in?',
    cols: 4,
    choices: [
      { label: 'E-Commerce & Online Sales', icon: '🛒' },
      { label: 'Professional Services',     icon: '💼' },
      { label: 'Retail & Products',         icon: '🏪' },
      { label: 'Restaurant & Food',         icon: '🍽️' },
      { label: 'Healthcare & Wellness',     icon: '🏥' },
      { label: 'Real Estate',               icon: '🏢' },
      { label: 'Education & Coaching',      icon: '🎓' },
      { label: 'Other',                     icon: '⚙️' },
    ],
  },
  {
    id: 'team_size', category: 'Business Profile',
    question: 'How many people are on your team?',
    cols: 2,
    choices: [
      { label: 'Just me',       icon: '🙋' },
      { label: '2–10 people',   icon: '👥' },
      { label: '11–50 people',  icon: '🏢' },
      { label: '50+ people',    icon: '🏭' },
    ],
  },
  {
    id: 'main_goal', category: 'Business Profile',
    question: 'What is your #1 business goal this year?',
    cols: 2,
    choices: [
      { label: 'Increase revenue & sales',       icon: '📈' },
      { label: 'Reduce operational costs',       icon: '💡' },
      { label: 'Scale operations faster',        icon: '🚀' },
      { label: 'Improve customer satisfaction',  icon: '⭐' },
    ],
  },
  {
    id: 'business_age', category: 'Business Profile',
    question: 'How long has your business been operating?',
    cols: 2,
    choices: [
      { label: 'Less than 1 year', icon: '🌱' },
      { label: '1–3 years',        icon: '🌿' },
      { label: '3–7 years',        icon: '🌳' },
      { label: '7+ years',         icon: '🏅' },
    ],
  },
  // ── Customer Experience ────────────────────────────────────────────────────
  {
    id: 'inquiry_handling', category: 'Customer Experience',
    question: 'How do you handle customer inquiries today?',
    cols: 2,
    choices: [
      { label: 'Phone & manual replies', icon: '📞' },
      { label: 'Email only',             icon: '📧' },
      { label: 'WhatsApp / live chat',   icon: '💬' },
      { label: 'No clear process',       icon: '😅' },
    ],
  },
  {
    id: 'response_time', category: 'Customer Experience',
    question: 'How fast do you typically respond to customers?',
    cols: 2,
    choices: [
      { label: 'Under 1 hour',     icon: '⚡' },
      { label: 'Same day',         icon: '📅' },
      { label: 'Next day or more', icon: '🐌' },
      { label: 'Inconsistent',     icon: '🎲' },
    ],
  },
  {
    id: 'lead_acquisition', category: 'Customer Experience',
    question: 'How do you currently acquire new clients?',
    cols: 2,
    choices: [
      { label: 'Word of mouth',    icon: '🗣️' },
      { label: 'Social media',     icon: '📱' },
      { label: 'Paid advertising', icon: '🎯' },
      { label: 'Mix of channels',  icon: '🔀' },
    ],
  },
  {
    id: 'followup', category: 'Customer Experience',
    question: 'How would you describe your client follow-up process?',
    cols: 2,
    choices: [
      { label: 'Systematic & consistent', icon: '✅' },
      { label: 'Mostly manual',           icon: '✍️' },
      { label: 'Hit or miss',             icon: '🎰' },
      { label: 'We rarely follow up',     icon: '😬' },
    ],
  },
  // ── Marketing & Content ────────────────────────────────────────────────────
  {
    id: 'content_frequency', category: 'Marketing & Content',
    question: 'How often does your business publish content online?',
    cols: 2,
    choices: [
      { label: 'Daily',                icon: '🔥' },
      { label: 'Several times a week', icon: '📆' },
      { label: 'Monthly',              icon: '📅' },
      { label: 'Rarely or never',      icon: '😴' },
    ],
  },
  {
    id: 'content_creation', category: 'Marketing & Content',
    question: 'Who currently creates your marketing content?',
    cols: 2,
    choices: [
      { label: 'I do it all myself',   icon: '🙋' },
      { label: 'A team member',        icon: '👤' },
      { label: 'Freelancers / agency', icon: '🤝' },
      { label: 'We have no strategy',  icon: '🤷' },
    ],
  },
  {
    id: 'paid_ads', category: 'Marketing & Content',
    question: 'Do you currently run paid ad campaigns?',
    cols: 2,
    choices: [
      { label: 'Yes, consistently', icon: '✅' },
      { label: 'Tried but stopped', icon: '⏸️' },
      { label: 'Planning to start', icon: '📋' },
      { label: 'Not at all',        icon: '❌' },
    ],
  },
  {
    id: 'marketing_challenge', category: 'Marketing & Content',
    question: "What's your biggest marketing challenge?",
    cols: 2,
    choices: [
      { label: 'Creating content consistently', icon: '✏️' },
      { label: 'Knowing which ads perform',     icon: '📊' },
      { label: 'Reaching the right audience',   icon: '🎯' },
      { label: 'Lack of time & resources',      icon: '⏰' },
    ],
  },
  // ── Operations & Data ──────────────────────────────────────────────────────
  {
    id: 'financial_tracking', category: 'Operations & Data',
    question: 'How do you manage invoicing & financial tracking?',
    cols: 2,
    choices: [
      { label: 'Manual spreadsheets',   icon: '📋' },
      { label: 'Accounting software',   icon: '💻' },
      { label: 'Outsourced to someone', icon: '🤝' },
      { label: "It's disorganised",     icon: '🗂️' },
    ],
  },
  {
    id: 'data_analysis', category: 'Operations & Data',
    question: 'How often do you analyse your business data & KPIs?',
    cols: 2,
    choices: [
      { label: 'Daily',                 icon: '📈' },
      { label: 'Weekly',                icon: '📅' },
      { label: 'Monthly',               icon: '🗓️' },
      { label: "Rarely, I go by gut",   icon: '🤔' },
    ],
  },
  {
    id: 'email_management', category: 'Operations & Data',
    question: 'How do you manage business emails & communications?',
    cols: 2,
    choices: [
      { label: 'I handle everything manually', icon: '🙋' },
      { label: 'Shared team inbox',            icon: '👥' },
      { label: 'Messages often get missed',    icon: '📭' },
      { label: "It's overwhelming",            icon: '😩' },
    ],
  },
  {
    id: 'ai_experience', category: 'Operations & Data',
    question: 'Have you used AI or automation tools before?',
    cols: 2,
    choices: [
      { label: 'Yes, actively',       icon: '🤖' },
      { label: 'Tried a few basics',  icon: '🔰' },
      { label: 'Aware but not tried', icon: '👀' },
      { label: 'New to this topic',   icon: '🌱' },
    ],
  },
  // ── Vision ─────────────────────────────────────────────────────────────────
  {
    id: 'bottleneck', category: 'Your Vision',
    question: "What's your biggest operational bottleneck right now?",
    cols: 2,
    choices: [
      { label: 'Not enough time for everything', icon: '⏱️' },
      { label: 'Hard to find & keep clients',    icon: '🔍' },
      { label: 'Operations are chaotic',         icon: '🌪️' },
      { label: "Can't measure ROI clearly",      icon: '❓' },
    ],
  },
  {
    id: 'timeline', category: 'Your Vision',
    question: 'How soon do you need to see results?',
    cols: 2,
    choices: [
      { label: 'Within a month',    icon: '🚀' },
      { label: 'Within 3 months',   icon: '📅' },
      { label: 'Within 6 months',   icon: '🗓️' },
      { label: 'Long-term planning', icon: '🔮' },
    ],
  },
]

const TOTAL_Q = QUESTIONS.length // 18
// Steps: 0=intro, 1–18=questions, 19=contact form, 20=loading, 21=result

const CAT_COLOR: Record<string, string> = {
  'Business Profile':    '#2563eb',
  'Customer Experience': '#7c3aed',
  'Marketing & Content': '#0891b2',
  'Operations & Data':   '#059669',
  'Your Vision':         '#d97706',
}

const CHALLENGES = [
  {
    label: 'Marketing & Content',
    icon: '📣',
    specialist: 'Houda El Fahsi',
    solution: 'Content, ads & brand assets on autopilot — 100x faster production',
  },
  {
    label: 'Customer Support & Leads',
    icon: '💬',
    specialist: 'Soufiane Ouriaghli',
    solution: '24/7 AI chatbot + Lead scoring that fills your pipeline automatically',
  },
  {
    label: 'Email & Operations',
    icon: '📧',
    specialist: 'Ilyas Sadour',
    solution: 'Every email read, sorted & responded to in seconds — 99% accuracy',
  },
  {
    label: 'Finance & Data Analysis',
    icon: '📊',
    specialist: 'Mohamed Reda Touhami',
    solution: 'Agent CFO — raw CSV/Excel → financial insights in seconds',
  },
]

export default function AuditTool() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [step,     setStep]     = useState(0)
  const [answers,  setAnswers]  = useState<Record<string, string>>({})
  const [fullName, setFullName] = useState('')
  const [company,  setCompany]  = useState('')
  const [report,   setReport]   = useState('')
  const [error,    setError]    = useState('')

  const currentQ  = step >= 1 && step <= TOTAL_Q ? QUESTIONS[step - 1] : null
  const progress  = step >= 1 && step <= TOTAL_Q + 1 ? ((step - 1) / (TOTAL_Q + 1)) * 100 : 0
  const catColor  = currentQ ? CAT_COLOR[currentQ.category] : '#2563eb'

  const handleChoice = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
    setStep(s => s + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1)
    else if (step === 1) setStep(0)
  }

  const submitAudit = async () => {
    if (!fullName.trim() || !company.trim()) return
    const allAnswers: Record<string, string> = {
      'Full name':    fullName.trim(),
      'Company name': company.trim(),
      ...Object.fromEntries(QUESTIONS.map(q => [q.question, answers[q.id] ?? 'N/A'])),
    }
    setStep(20)
    setError('')
    try {
      const res  = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: allAnswers }),
      })
      const data = await res.json()
      setReport(data.report)
      setStep(21)
    } catch {
      setError('Network error — please try again.')
      setStep(19)
    }
  }

  const reset = () => {
    setStep(0); setAnswers({}); setFullName(''); setCompany(''); setReport(''); setError('')
  }

  return (
    <section id="audit" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: '#f8faff' }} ref={ref}>
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              Free AI Audit
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Discover the <span className="gradient-text">AI opportunities</span> in your business
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Answer ~20 quick questions and our AI will generate a personalised strategy report — pinpointing exactly where custom AI can accelerate your growth.
          </p>
        </motion.div>

        {/* ── Card ───────────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl border border-slate-200 overflow-hidden"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>

          {/* Progress bar */}
          {step > 0 && step < 20 && (
            <div className="h-1 bg-slate-100">
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}cc)` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }} />
            </div>
          )}

          <div className="p-8 sm:p-12">
            <AnimatePresence mode="wait">

              {/* ── INTRO ────────────────────────────────────────────────── */}
              {step === 0 && (
                <motion.div key="intro"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-8">
                  <div className="text-7xl">🔍</div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      Your Free AI Strategy Audit
                    </h3>
                    <p className="text-slate-500 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                      In about 3 minutes, our AI will analyse your business profile and generate a personalised report — pinpointing the exact AI solutions that will drive real growth for your company.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                    {[{ n: '~20', l: 'Questions' }, { n: '3 min', l: 'Duration' }, { n: '100%', l: 'Free' }].map(s => (
                      <div key={s.l} className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <div className="text-lg font-black text-blue-600">{s.n}</div>
                        <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(1)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 text-lg"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    Start My Free Audit →
                  </button>
                </motion.div>
              )}

              {/* ── CHOICE QUESTIONS (steps 1–18) ────────────────────────── */}
              {step >= 1 && step <= TOTAL_Q && currentQ && (
                <motion.div key={`q-${step}`}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}>
                  <div className="flex items-center justify-between mb-8">
                    <button onClick={handleBack}
                      className="text-slate-400 hover:text-slate-700 flex items-center gap-1 text-sm transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      ← Back
                    </button>
                    <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ fontFamily: 'var(--font-mono)', color: catColor, background: `${catColor}15` }}>
                      {currentQ.category}
                    </span>
                    <span className="text-xs text-slate-400" style={{ fontFamily: 'var(--font-mono)' }}>
                      {step} / {TOTAL_Q + 1}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-7" style={{ fontFamily: 'var(--font-display)' }}>
                    {currentQ.question}
                  </h3>
                  <div className={`grid gap-3 ${currentQ.cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {currentQ.choices.map(c => (
                      <button key={c.label}
                        onClick={() => handleChoice(currentQ.id, c.label)}
                        className="p-4 rounded-2xl border-2 text-left font-semibold text-slate-700 hover:text-blue-700 transition-all duration-200 border-slate-200 hover:border-blue-400 hover:bg-blue-50 active:scale-95"
                        style={{ fontFamily: 'var(--font-body)' }}>
                        <div className="text-2xl mb-2">{c.icon}</div>
                        <div className="text-sm leading-snug">{c.label}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── CONTACT FORM (step 19) ───────────────────────────────── */}
              {step === TOTAL_Q + 1 && (
                <motion.div key="contact"
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}>
                  <div className="flex items-center justify-between mb-8">
                    <button onClick={handleBack}
                      className="text-slate-400 hover:text-slate-700 flex items-center gap-1 text-sm transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      ← Back
                    </button>
                    <span className="text-xs text-slate-400" style={{ fontFamily: 'var(--font-mono)' }}>
                      Final step
                    </span>
                  </div>
                  <div className="mb-8 text-center">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      Almost there — who should we address this report to?
                    </h3>
                    <p className="text-slate-500" style={{ fontFamily: 'var(--font-body)' }}>
                      Our AI will personalise the report with your name and company.
                    </p>
                  </div>
                  <div className="max-w-md mx-auto space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        Your full name *
                      </label>
                      <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Ahmed Benali"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:outline-none text-slate-900 transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        Company name *
                      </label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                        placeholder="e.g. TechStore Maroc"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:outline-none text-slate-900 transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onKeyDown={e => { if (e.key === 'Enter' && fullName.trim() && company.trim()) submitAudit() }} />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>
                    )}
                    <button onClick={submitAudit}
                      disabled={!fullName.trim() || !company.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 text-lg"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      Generate My AI Report →
                    </button>
                    <p className="text-xs text-center text-slate-400" style={{ fontFamily: 'var(--font-mono)' }}>
                      Used only to personalise your report. We never spam.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── LOADING (step 20) ────────────────────────────────────── */}
              {step === 20 && (
                <motion.div key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-12 space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <motion.div animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600" />
                    <div className="absolute inset-2 bg-blue-50 rounded-full flex items-center justify-center text-2xl">🤖</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      Analysing your business profile…
                    </h3>
                    <p className="text-slate-500" style={{ fontFamily: 'var(--font-body)' }}>
                      Our AI is reviewing your answers and crafting a personalised strategy for <strong>{company}</strong>.
                    </p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 bg-blue-600 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── RESULT (step 21) ─────────────────────────────────────── */}
              {step === 21 && report && (
                <motion.div key="result"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8">
                  <div className="flex items-center gap-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
                      className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-green-500/30 flex-shrink-0">
                      ✓
                    </motion.div>
                    <div>
                      <div className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                        Personalised AI Report
                      </div>
                      <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                        Strategy Report — {company}
                      </h3>
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black">AI</div>
                      <span className="text-xs font-semibold text-blue-600" style={{ fontFamily: 'var(--font-mono)' }}>
                        NexOps AI Consultant
                      </span>
                    </div>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.97rem' }}>
                      {report}
                    </div>
                  </motion.div>

                  <div>
                    <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                      Based on your profile
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {QUESTIONS.slice(0, 6).map(q => answers[q.id] && (
                        <span key={q.id}
                          className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full"
                          style={{ fontFamily: 'var(--font-body)' }}>
                          {answers[q.id]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a href="#contact"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      Book My Free Strategy Call →
                    </a>
                    <button onClick={reset}
                      className="text-slate-500 hover:text-slate-700 font-medium px-6 py-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      Retake Audit
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
