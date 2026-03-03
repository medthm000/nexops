'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const teamMembers = [
  {
    name: 'Houda El Fahsi',
    role: 'AI Marketing Specialist',
    color: 'from-blue-500 to-blue-700',
    glow: 'rgba(59,130,246,0.2)',
    initials: 'HF',
    expertise: ['Marketing', 'Logo & Web AI', 'AI Tools'],
    description: 'Uses AI tools to automate marketing content, build brand assets, and run predictive ad campaigns at scale.',
    slideRef: 'Slide 01',
  },
  {
    name: 'Soufiane Ouriaghli Touil',
    role: 'Customer Support Specialist',
    color: 'from-indigo-500 to-blue-600',
    glow: 'rgba(99,102,241,0.2)',
    initials: 'SO',
    expertise: ['RAG Agents', 'Lead Gen', 'Support AI'],
    description: 'Architects RAG-based web assistants for instant business support and automated sales hunters for personalized lead generation.',
    slideRef: 'Slide 02',
  },
  {
    name: 'Ilyas Sadour',
    role: 'AI Operations & Emails Manager',
    color: 'from-blue-600 to-cyan-600',
    glow: 'rgba(6,182,212,0.2)',
    initials: 'IS',
    expertise: ['Gemini AI', 'n8n Workflows', 'Smart Inbox'],
    description: 'Deploys Gemini-powered agents to detect intent and automate Gmail labeling, reducing inbox overload for high-focus teams.',
    slideRef: 'Slide 03',
  },
  {
    name: 'Mohamed Reda Touhami',
    role: 'Business Analysis & Finance',
    color: 'from-slate-600 to-blue-700',
    glow: 'rgba(71,85,105,0.2)',
    initials: 'RT',
    expertise: ['Financial AI', 'LLM Analytics', 'Cash Flow'],
    description: 'Bridges the gap between raw data and growth by using AI agents to detect waste, predict cash flow, and drive smarter pricing decisions.',
    slideRef: 'Slide 04',
  },
]

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="py-16 lg:py-32 relative overflow-hidden" style={{ background: '#f8faff' }}>
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none"/>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }}/>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-blue-500"/>
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>The Team</span>
            <div className="w-8 h-px bg-blue-500"/>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Meet the <span className="gradient-text">Specialists</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Four AI professionals, each owning a critical domain, from marketing automation to financial intelligence.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div key={member.role}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover group relative rounded-2xl overflow-hidden hover:border-blue-400/60"
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease' }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 40px ${member.glow}` }}/>

              <div className={`h-0.5 w-full bg-gradient-to-r ${member.color}`}/>
              <div className="p-6">
                <div className="relative mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>{member.initials}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"/>
                  <span className="absolute -top-1 right-0 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200" style={{ fontFamily: 'var(--font-mono)' }}>
                    {member.slideRef}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-0.5 text-base leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{member.name}</h3>
                <p className="text-xs text-blue-500 font-semibold mb-3 leading-tight" style={{ fontFamily: 'var(--font-mono)' }}>{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>{member.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md" style={{ fontFamily: 'var(--font-mono)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
