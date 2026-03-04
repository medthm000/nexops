'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type ServiceConfig = {
  id: string; label: string; icon: string; tagline: string; color: string
  sliderA: { label: string; min: number; max: number; step: number; unit: string; def: number }
  sliderB: { label: string; min: number; max: number; step: number; unit: string; def: number }
  calc: (a: number, b: number) => {
    metric1: number; metric1Unit: string; metric1Label: string
    metric2: number; metric2Unit: string; metric2Label: string
    metric3: number; metric3Unit: string; metric3Label: string
    qualifier: string
  }
}

const SERVICES: ServiceConfig[] = [
  {
    id: 'marketing', label: 'Marketing AI', icon: 'U+1F4E3', color: '#2563eb',
    tagline: 'Scale content, optimise ad spend and grow revenue',
    sliderA: { label: 'Monthly marketing and ad budget', min: 2000, max: 100000, step: 500, unit: 'MAD/month', def: 15000 },
    sliderB: { label: 'Content pieces needed monthly', min: 5, max: 150, step: 5, unit: 'pieces', def: 25 },
    calc: (budget, pieces) => ({
      metric1: Math.round(budget * 0.33), metric1Unit: 'MAD/mo', metric1Label: 'Extra revenue from smarter campaigns',
      metric2: Math.round(pieces * 3.5),  metric2Unit: 'hrs/mo',  metric2Label: 'Hours freed from content creation',
      metric3: 2,                          metric3Unit: 'months',  metric3Label: 'Estimated payback period',
      qualifier: 'Avg 33% campaign ROI improvement + content at 10x speed',
    }),
  },
  {
    id: 'support', label: 'Support AI', icon: 'U+1F4AC', color: '#7c3aed',
    tagline: 'Respond to every customer instantly, 24/7',
    sliderA: { label: 'Monthly customer inquiries', min: 50, max: 5000, step: 50, unit: 'inquiries', def: 300 },
    sliderB: { label: 'Avg cost per support interaction', min: 20, max: 500, step: 10, unit: 'MAD', def: 80 },
    calc: (inquiries, cost) => ({
      metric1: Math.round(inquiries * 0.78 * cost * 0.85), metric1Unit: 'MAD/mo', metric1Label: 'Value from automated support handling',
      metric2: Math.round(inquiries * 0.78 * 0.22),        metric2Unit: 'hrs/mo',  metric2Label: 'Hours freed for complex cases',
      metric3: 1,                                           metric3Unit: 'month',   metric3Label: 'Estimated payback period',
      qualifier: '78% of inquiries handled automatically, zero wait time',
    }),
  },
  {
    id: 'email', label: 'Email AI', icon: 'U+1F4E7', color: '#0891b2',
    tagline: 'Turn every email into a business opportunity',
    sliderA: { label: 'Emails sent and received monthly', min: 200, max: 30000, step: 200, unit: 'emails', def: 2000 },
    sliderB: { label: 'Average deal value per conversion', min: 200, max: 20000, step: 200, unit: 'MAD', def: 2000 },
    calc: (emails, deal) => ({
      metric1: Math.round(emails * 0.003 * deal * 1.35), metric1Unit: 'MAD/mo', metric1Label: 'Additional revenue from personalised outreach',
      metric2: Math.round(emails * 0.003 * 45),          metric2Unit: 'hrs/mo',  metric2Label: 'Hours saved on manual email management',
      metric3: 2,                                         metric3Unit: 'months',  metric3Label: 'Estimated payback period',
      qualifier: '+35% conversion lift with AI-personalised email sequences',
    }),
  },
  {
    id: 'finance', label: 'Finance AI', icon: 'U+1F4CA', color: '#059669',
    tagline: 'From raw data to clear business decisions in seconds',
    sliderA: { label: 'Documents processed monthly', min: 10, max: 1000, step: 10, unit: 'docs', def: 60 },
    sliderB: { label: 'Hours spent weekly on data and reporting', min: 2, max: 40, step: 1, unit: 'hrs/week', def: 10 },
    calc: (docs, hrs) => ({
      metric1: Math.round(hrs * 4.3 * 200 * 0.88), metric1Unit: 'MAD/mo', metric1Label: 'Finance team productivity recovered',
      metric2: Math.round(hrs * 4.3 * 0.88),        metric2Unit: 'hrs/mo',  metric2Label: 'Hours freed from manual data processing',
      metric3: 1,                                    metric3Unit: 'month',   metric3Label: 'Estimated payback period',
      qualifier: '88% of reporting automated, decisions in seconds not days',
    }),
  },
]

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
    { label: 'Revenue / Value Impact', value: r.metric1.toLocaleString(), unit: r.metric1Unit, note: r.metric1Label, bg: '#f0fdf4', border: '#bbf7d0', textMain: '#15803d', textSub: '#22c55e', icon: 'MAD' },
    { label: 'Time Saved',             value: r.metric2.toLocaleString(), unit: r.metric2Unit, note: r.metric2Label, bg: '#eff6ff', border: '#bfdbfe', textMain: '#1d4ed8', textSub: '#3b82f6', icon: 'HRS' },
    { label: 'Payback Period',         value: `${r.metric3}`,             unit: r.metric3Unit, note: r.metric3Label, bg: '#eef2ff', border: '#c7d2fe', textMain: '#3730a3', textSub: '#6366f1', icon: 'ROI' },
  ]

  return (
    <section id="roi" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: '#ffffff' }} ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)' }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
            Select the AI solution that fits your business and see the projected impact.
          </p>
        </motion.div>

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
              <div className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: activeId === s.id ? s.color : '#1e293b' }}>
                {s.label}
              </div>
              <div className="text-xs text-slate-500 leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                {s.tagline}
              </div>
            </button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-8"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {svc.label}  Your Numbers
              </h3>
              <p className="text-sm text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>
                Adjust the sliders to match your current situation.
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black ml-4 flex-shrink-0"
                    style={{ background: `${c.textSub}20`, color: c.textSub }}>
                    {c.icon}
                  </div>
                </div>
              </motion.div>
            ))}

            <a href="#contact"
              className="text-center font-bold py-4 rounded-2xl text-white transition-all hover:-translate-y-0.5 shadow-lg text-sm"
              style={{ background: svc.color, boxShadow: `0 8px 20px ${svc.color}35`, fontFamily: 'var(--font-body)' }}>
              Get My Custom {svc.label} Proposal
            </a>
          </div>
        </motion.div>

        <p className="text-center text-xs text-slate-400 mt-8" style={{ fontFamily: 'var(--font-mono)' }}>
          Projections are indicative and based on industry benchmarks. Actual impact depends on implementation scope.
        </p>
      </div>
    </section>
  )
}