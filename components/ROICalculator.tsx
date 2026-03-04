'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Service configurations ────────────────────────────────────────────────────
type ServiceConfig = {
  id: string
  label: string
  icon: string
  tagline: string
  color: string
  sliderA: { label: string; min: number; max: number; step: number; unit: string; def: number }
  sliderB: { label: string; min: number; max: number; step: number; unit: string; def: number }
  calc: (a: number, b: number) => {
    value: number; hours: number; payback: number
    valueLabel: string; hoursLabel: string; qualifier: string
  }
}

const SERVICES: ServiceConfig[] = [
  {
    id: 'marketing', label: 'Marketing AI', icon: '📣', color: '#2563eb',
    tagline: 'Scale content, optimise ad spend & grow revenue',
    sliderA: { label: 'Monthly marketing & ad budget', min: 2000, max: 100000, step: 500, unit: 'MAD/month', def: 15000 },
    sliderB: { label: 'Content pieces needed monthly', min: 5, max: 150, step: 5, unit: 'pieces', def: 25 },
    calc: (budget, pieces) => ({
      value:      Math.round(budget * 0.33),
      hours:      Math.round(pieces * 3.5),
      payback:    2,
      valueLabel: 'MAD/month in additional revenue from smarter campaigns',
      hoursLabel: 'hours freed from content creation each month',
      qualifier:  'Avg 33% improvement in campaign ROI + content at 10× speed',
    }),
  },
  {
    id: 'support', label: 'Support AI', icon: '💬', color: '#7c3aed',
    tagline: 'Respond to every customer instantly, 24/7',
    sliderA: { label: 'Monthly customer inquiries', min: 50, max: 5000, step: 50, unit: 'inquiries', def: 300 },
    sliderB: { label: 'Avg cost per support interaction', min: 20, max: 500, step: 10, unit: 'MAD', def: 80 },
    calc: (inquiries, cost) => ({
      value:      Math.round(inquiries * 0.78 * cost * 0.85),
      hours:      Math.round(inquiries * 0.78 * 0.22),
      payback:    1,
      valueLabel: 'MAD/month in support cost optimisation',
      hoursLabel: 'hours freed for complex, high-value cases',
      qualifier:  '78% of inquiries handled automatically — zero wait time',
    }),
  },
  {
    id: 'email', label: 'Email AI', icon: '📧', color: '#0891b2',
    tagline: 'Turn every email into a business opportunity',
    sliderA: { label: 'Emails sent & received monthly', min: 200, max: 30000, step: 200, unit: 'emails', def: 2000 },
    sliderB: { label: 'Average deal value per conversion', min: 200, max: 20000, step: 200, unit: 'MAD', def: 2000 },
    calc: (emails, deal) => ({
      value:      Math.round(emails * 0.003 * deal * 1.35),
      hours:      Math.round(emails * 0.003 * 45),
      payback:    2,
      valueLabel: 'MAD/month in additional revenue from personalised outreach',
      hoursLabel: 'hours saved on manual email management',
      qualifier:  '+35% conversion lift with AI-personalised email sequences',
    }),
  },
  {
    id: 'finance', label: 'Finance AI', icon: '📊', color: '#059669',
    tagline: 'From raw data to clear business decisions in seconds',
    sliderA: { label: 'Documents processed monthly', min: 10, max: 1000, step: 10, unit: 'documents', def: 60 },
    sliderB: { label: 'Hours spent weekly on data & reporting', min: 2, max: 40, step: 1, unit: 'hrs/week', def: 10 },
    calc: (docs, hrs) => ({
      value:      Math.round(hrs * 4.3 * 200 * 0.88),
      hours:      Math.round(hrs * 4.3 * 0.88),
      payback:    1,
      valueLabel: 'MAD/month in finance team productivity recovered',
      hoursLabel: 'hours freed from manual data processing',
      qualifier:  '88% of reporting automated — decisions in seconds, not days',
    }),
  },
]

// ── Slider ────────────────────────────────────────────────────────────────────
function Slider({ label, value, min, max, step, unit, color, setter }: {
  label: string; value: number; min: number; max: number; step: number; unit: string
  color: string; setter: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'var(--font-body)' }}>{label}</span>
        <span className="text-sm font-bold px-3 py-1 rounded-lg border"
          style={{ fontFamily: 'var(--font-mono)', color, background: `${color}12`, borderColor: `${color}30` }}>
          {value.toLocaleString()} <span className="font-normal text-xs">{unit}</span>
        </span>
      </div>
      <div className="relative h-2 bg-slate-100 rounded-full">
        <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-150"
          style={{ width: `${pct}%`, background: color, opacity: 0.7 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => setter(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          aria-label={label} />
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-150 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)`, background: color }} />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
        <span>{min.toLocaleString()}</span><span>{max.toLocaleString()}</span>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ROICalculator() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [activeId, setActiveId] = useState('marketing')
  const svc = SERVICES.find(s => s.id === activeId)!

  const [sliderA, setSliderA] = useState(svc.sliderA.def)
  const [sliderB, setSliderB] = useState(svc.sliderB.def)

  const selectService = (s: ServiceConfig) => {
    setActiveId(s.id); setSliderA(s.sliderA.def); setSliderB(s.sliderB.def)
  }

  const r = useMemo(() => svc.calc(sliderA, sliderB), [svc, sliderA, sliderB])

  const cards = [
    { label: 'Monthly value unlocked', value: r.value.toLocaleString(), unit: 'MAD',   icon: '💰', note: r.valueLabel,  bg: '#f0fdf4', border: '#bbf7d0', textMain: '#15803d', textSub: '#22c55e' },
    { label: 'Time freed per month',   value: r.hours.toLocaleString(), unit: 'hours', icon: '⏱️', note: r.hoursLabel,  bg: '#eff6ff', border: '#bfdbfe', textMain: '#1d4ed8', textSub: '#3b82f6' },
    { label: 'Payback period',         value: `${r.payback}`,           unit: r.payback === 1 ? 'month' : 'months', icon: '📈', note: 'Typical time to positive ROI', bg: '#eef2ff', border: '#c7d2fe', textMain: '#3730a3', textSub: '#6366f1' },
  ]

  return (
    <section id="roi" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: '#ffffff' }} ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              ROI Calculator
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Estimate the <span className="gradient-text">business value</span> of your AI solution
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Select the AI solution that fits your needs and see the projected impact for your business.
          </p>
        </motion.div>

        {/* Service tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {SERVICES.map(s => (
            <button key={s.id} onClick={() => selectService(s)}
              className="p-4 rounded-2xl border-2 text-left transition-all duration-200"
              style={{
                borderColor: activeId === s.id ? s.color : '#e2e8f0',
                background:  activeId === s.id ? `${s.color}0f` : 'white',
                boxShadow:   activeId === s.id ? `0 0 0 1px ${s.color}30` : 'none',
              }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: activeId === s.id ? s.color : '#1e293b' }}>
                {s.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                {s.tagline}
              </div>
            </button>
          ))}
        </motion.div>

        {/* Body */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8">

          {/* Sliders */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-8"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{svc.icon}</span>
                <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                  {svc.label} — Your Numbers
                </h3>
              </div>
              <p className="text-sm text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>
                Adjust the sliders to reflect your current situation.
              </p>
            </div>
            <Slider label={svc.sliderA.label} value={sliderA} min={svc.sliderA.min} max={svc.sliderA.max}
              step={svc.sliderA.step} unit={svc.sliderA.unit} color={svc.color} setter={setSliderA} />
            <Slider label={svc.sliderB.label} value={sliderB} min={svc.sliderB.min} max={svc.sliderB.max}
              step={svc.sliderB.step} unit={svc.sliderB.unit} color={svc.color} setter={setSliderB} />
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 italic" style={{ fontFamily: 'var(--font-mono)' }}>
                {r.qualifier}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            {cards.map((c, i) => (
              <motion.div key={c.label} animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="p-6 rounded-2xl border-2 flex-1"
                style={{ background: c.bg, borderColor: c.border }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1"
                      style={{ fontFamily: 'var(--font-mono)', color: c.textSub }}>
                      {c.label}
                    </div>
                    <motion.div key={`${activeId}-${c.value}`}
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl font-extrabold" style={{ color: c.textMain, fontFamily: 'var(--font-display)' }}>
                      {c.value} <span className="text-base font-semibold" style={{ color: c.textSub }}>{c.unit}</span>
                    </motion.div>
                    <div className="text-xs mt-1" style={{ fontFamily: 'var(--font-body)', color: c.textSub }}>
                      {c.note}
                    </div>
                  </div>
                  <div className="text-3xl ml-4">{c.icon}</div>
                </div>
              </motion.div>
            ))}
            <a href="#contact"
              className="text-center font-bold py-4 rounded-2xl text-white transition-all hover:-translate-y-0.5 shadow-lg text-sm"
              style={{ background: svc.color, boxShadow: `0 8px 20px ${svc.color}35`, fontFamily: 'var(--font-body)' }}>
              Get My Custom {svc.label} Proposal →
            </a>
          </div>
        </motion.div>

        <p className="text-center text-xs text-slate-400 mt-8" style={{ fontFamily: 'var(--font-mono)' }}>
          * Projections are indicative and based on industry benchmarks. Actual impact depends on implementation scope.
        </p>
      </div>
    </section>
  )
}
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'var(--font-body)' }}>{label}</span>
        <span className="text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg" style={{ fontFamily: 'var(--font-mono)' }}>
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => setter(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#2563eb' }}
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default function ROICalculator() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [employees,    setEmployees]    = useState(5)
  const [salary,       setSalary]       = useState(6000)   // MAD/month
  const [hoursWasted,  setHoursWasted]  = useState(3)      // hours/day

  const results = useMemo(() => {
    const workDaysPerYear  = 250
    const hourlyRate       = salary / 22 / 8                                          // monthly ÷ days ÷ hours
    const hoursPerYear     = Math.round(employees * hoursWasted * workDaysPerYear)
    const moneySaved       = Math.round(employees * hourlyRate * hoursWasted * workDaysPerYear * 0.65)
    const nexopsAnnual     = 30_000                                                   // rough annual NexOps cost (MAD)
    const roi              = Math.round((moneySaved / nexopsAnnual) * 100)
    return { hoursPerYear, moneySaved, roi }
  }, [employees, salary, hoursWasted])

  const cards = [
    { label: 'Hours recovered per year', value: results.hoursPerYear.toLocaleString(), unit: 'hours',  icon: '⏱️', desc: 'Redirected to high-value work',     bg: '#eff6ff', border: '#bfdbfe', textMain: '#1d4ed8', textSub: '#3b82f6' },
    { label: 'Annual savings potential',  value: results.moneySaved.toLocaleString(),  unit: 'MAD',    icon: '💰', desc: 'Based on 65 % efficiency gain',     bg: '#f0fdf4', border: '#bbf7d0', textMain: '#15803d', textSub: '#22c55e' },
    { label: 'Estimated ROI with NexOps', value: `${results.roi}`,                     unit: '%',      icon: '📈', desc: 'Return on your investment',          bg: '#eef2ff', border: '#c7d2fe', textMain: '#3730a3', textSub: '#6366f1' },
  ]

  return (
    <section id="roi" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: '#ffffff' }} ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              ROI Calculator
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            How much is <span className="gradient-text">manual work costing you?</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Adjust the sliders below to calculate your potential savings with NexOps AI.
          </p>
        </motion.div>

        {/* Body */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8">

          {/* Sliders panel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-8"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
            <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Your Current Situation
            </h3>

            <Slider label="Employees doing manual tasks" value={employees} min={1}    max={50}     step={1}    unit="people"    setter={setEmployees} />
            <Slider label="Average monthly salary"        value={salary}    min={3000} max={20000}  step={500}  unit="MAD/mo"    setter={setSalary} />
            <Slider label="Hours wasted daily on manual work" value={hoursWasted} min={1} max={8}  step={0.5}  unit="hrs/day"   setter={setHoursWasted} />

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400" style={{ fontFamily: 'var(--font-mono)' }}>
              * Estimates based on industry averages. Actual savings may vary.
            </div>
          </div>

          {/* Results panel */}
          <div className="space-y-4">
            {cards.map((r, i) => (
              <motion.div key={r.label}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="p-6 rounded-2xl border-2"
                style={{ background: r.bg, borderColor: r.border }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1"
                      style={{ fontFamily: 'var(--font-mono)', color: r.textSub }}>
                      {r.label}
                    </div>
                    <motion.div
                      key={r.value}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-black"
                      style={{ fontFamily: 'var(--font-display)', color: r.textMain }}>
                      {r.value} <span className="text-xl">{r.unit}</span>
                    </motion.div>
                    <div className="text-xs mt-1" style={{ color: r.textSub, fontFamily: 'var(--font-mono)' }}>{r.desc}</div>
                  </div>
                  <div className="text-4xl">{r.icon}</div>
                </div>
              </motion.div>
            ))}

            <a href="#contact"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 mt-2"
              style={{ fontFamily: 'var(--font-body)' }}>
              Get My Free ROI Report →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
