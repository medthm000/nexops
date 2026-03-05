'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatButton from './ChatButton'

interface PresentationModeProps {
  onExit: () => void
}

// ─────────────────────────────────────────────
// SLIDE DATA
// ─────────────────────────────────────────────
const slides = [
  // ── SLIDE 1: AI IN MARKETING ──────────────
{
    number: '01',
    category: 'The New Paradigm',
    title: 'AI Marketing',
    subtitle: 'From manual friction to autonomous brand dominance',
    color: 'from-blue-600 to-indigo-900',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    content: (
      <div className="space-y-24 pb-20">
        {/* ================= 1. STRONG OPENING ================= */}
        <section className="text-center space-y-6 pt-10">
          <h2 className="text-3xl sm:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
            Marketing at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Light Speed.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            AI Marketing is the deployment of autonomous systems that handle research, creation, and distribution, allowing founders to focus on vision while the engine handles the execution.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mt-12">
            <div className="p-8 rounded-3xl border border-white/5 bg-white/5 text-left">
              <div className="text-red-400 font-bold uppercase tracking-widest text-xs mb-4">Traditional Marketing</div>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li>• Slow human-dependent cycles</li>
                <li>• High fixed monthly overhead</li>
                <li>• Guesswork-based targeting</li>
                <li>• Limited by staff working hours</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl border border-blue-500/30 bg-blue-500/5 text-left relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10 text-6xl">⚡</div>
              <div className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">NexOps AI Marketing</div>
              <ul className="space-y-3 text-sm text-slate-200 font-bold">
                <li>• Millisecond execution cycles</li>
                <li>• Pay-per-output scalability</li>
                <li>• Data-driven neural targeting</li>
                <li>• 24/7/365 Autonomous growth</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= 2. THE PROBLEM ================= */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-white text-3xl font-black italic uppercase">The Startup Struggle</h3>
            <p className="text-slate-500 text-sm mt-2">Why 90% of micro-enterprises stay "invisible"</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Budget Gap', desc: 'Cannot afford $5k/mo agency retainers.', icon: '💸' },
              { title: 'Design Delay', desc: 'Waiting days for simple social assets.', icon: '🎨' },
              { title: 'Copy Fatigue', desc: 'Founders too busy to write high-converting ads.', icon: '✍️' },
              { title: 'Tech Wall', desc: 'Complex ad managers and coding barriers.', icon: '🧱' },
              { title: 'Inconsistency', desc: 'Posting once a month when time permits.', icon: '📉' },
              { title: 'Weak Branding', desc: 'Generic designs that don’t command authority.', icon: '🎭' },
              { title: 'No Data', desc: 'Running ads without knowing what actually works.', icon: '📊' },
              { title: 'Slow Launch', desc: 'Taking weeks to build a simple landing page.', icon: '🚀' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="text-white font-bold text-xs mb-1 uppercase">{item.title}</div>
                <div className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 p-6 rounded-3xl text-center border-x border-red-500/20">
             <span className="text-white font-black italic uppercase tracking-widest text-sm">
                "In a fast-moving digital world, slow marketing means lost opportunity."
             </span>
          </div>
        </section>

        {/* ================= 3. HOW AI SOLVES THIS ================= */}
        <section className="bg-blue-600/5 border border-blue-500/20 rounded-[24px] sm:rounded-[40px] p-6 sm:p-12 space-y-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">The NexOps Solution</h2>
            <p className="text-slate-400 text-sm mt-2">Strategic deployment of intelligence to reclaim founder freedom.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: 'Production Speed', d: 'Reduce creation time from days to minutes using automated visual pipelines.', c: 'from-blue-500 to-cyan-400' },
              { t: 'Cost Collapse', d: 'Eliminate middleman agency fees. Generate enterprise output at solo-founder costs.', c: 'from-indigo-500 to-purple-400' },
              { t: 'Infinite Scale', d: 'Test 100 variations of an ad instead of one. Find winners with neural precision.', c: 'from-emerald-500 to-teal-400' }
            ].map((box, i) => (
              <div key={i} className="space-y-4">
                <div className={`h-1 w-12 bg-gradient-to-r ${box.c}`} />
                <h4 className="text-white font-bold uppercase text-sm tracking-widest">{box.t}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{box.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 4. AI TYPES ================= */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
             <h3 className="text-white text-3xl font-black italic uppercase">The Intelligence Stack</h3>
             <p className="text-blue-400 font-mono text-[10px] tracking-[0.3em] uppercase">Generative vs. Agentic</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl space-y-6 group hover:border-blue-500/30 transition-all">
              <div className="text-4xl">🎨</div>
              <h4 className="text-2xl font-black text-white italic">Generative AI</h4>
              <p className="text-slate-400 text-sm">The "Creative Arm" that produces raw assets.</p>
              <div className="grid grid-cols-2 gap-3">
                {['Text Generation', 'Image Synth', 'Video Production', 'Ad Copywriting'].map(li => (
                  <div key={li} className="bg-black/40 p-3 rounded-xl border border-white/5 text-[10px] text-slate-300 font-bold uppercase tracking-tight">
                    • {li}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl space-y-6 group hover:border-indigo-500/30 transition-all">
              <div className="text-4xl">🤖</div>
              <h4 className="text-2xl font-black text-white italic">Agentic AI</h4>
              <p className="text-slate-400 text-sm">The "Strategic Brain" that executes actions.</p>
              <div className="grid grid-cols-2 gap-3">
                {['Tool Integration', 'Workflow Automation', 'Sequence Execution', 'Self-Optimization'].map(li => (
                  <div key={li} className="bg-black/40 p-3 rounded-xl border border-white/5 text-[10px] text-indigo-300 font-bold uppercase tracking-tight">
                    • {li}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. TOOLKIT ================= */}
        <section className="space-y-12">
          <h3 className="text-center text-white font-black italic uppercase text-3xl">The NexOps Toolkit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { 
                cat: 'Content & Copy', 
                tools: [
                  { name: 'Gemini', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
                  { name: 'Claude', logo: '/images/claude.jpg' },
                  { name: 'ChatGPT', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' }
                ],
                desc: 'Strategic Writing'
              },
              { 
                cat: 'Visual & Branding', 
                tools: [
                  { name: 'Canva', logo: '/images/Canva-and-Leonardo.jpg' },
                  { name: 'MS Designer', logo: '/images/ms_desinger.jpg' },
                  { name: 'Looka', logo: '/images/looka.png' }
                ],
                desc: 'Asset Production'
              },
              { 
                cat: 'Apps & UI', 
                tools: [
                  { name: 'Copilot', logo: '/images/copilot.jpg' },
                  { name: 'Lovable', logo: 'https://lovable.dev/favicon.ico' },
                  { name: 'Framer', logo: '/images/framer.png' }
                ],
                desc: 'Product Creation'
              },
              { 
                cat: 'Workflows', 
                tools: [
                  { name: 'n8n', logo: '/images/n8n.png' },
                  { name: 'Zapier', logo: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
                  { name: 'Make', logo: '/images/make.jpg' }
                ],
                desc: 'Agent Orchestration'
              }
            ].map((group) => (
              <div key={group.cat} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/20 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-white font-bold uppercase text-xs tracking-widest">{group.cat}</div>
                  <div className="text-[9px] text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded-full">{group.desc}</div>
                </div>
                <div className="flex gap-8">
                  {group.tools.map(tool => (
                    <div key={tool.name} className="flex flex-col items-center gap-2 group/tool">
                       <div className="w-12 h-12 bg-white rounded-xl p-2.5 flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                          <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" onError={(e) => {e.target.src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png"}} />
                       </div>
                       <span className="text-slate-500 text-[9px] font-bold uppercase">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. META ADS UPDATE ================= */}
        <section className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 rounded-[24px] sm:rounded-[40px] p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full" />
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-12 items-center">
            <div className="sm:col-span-4 flex flex-col items-center justify-center space-y-4">
              <div className="w-24 h-24 bg-white rounded-3xl p-4 shadow-2xl">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" className="w-full h-full object-contain" alt="Meta" />
              </div>
              <div className="text-blue-400 font-black text-xl tracking-tighter">Advantage+</div>
            </div>
            <div className="sm:col-span-8 space-y-6 border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 pl-0 sm:pl-12">
               <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">The Death of Manual Targeting</h3>
               <p className="text-slate-300 text-sm leading-relaxed">
                 Meta’s latest updates prove the world has shifted. Modern Meta Ads no longer rely on human targeting—they rely on **Creative-Driven Data**. 
               </p>
               <p className="text-slate-400 text-xs leading-relaxed">
                 The AI analyzes your visual assets, generates synthetic audience data, and self-optimizes placements. If your creative is weak, your ads fail. If your creative is AI-optimized, your ROAS explodes.
               </p>
            </div>
          </div>
        </section>

        {/* ================= 7. FLOW DIAGRAM ================= */}
        <section className="space-y-12">
          <h3 className="text-center text-white font-black italic uppercase text-2xl tracking-tighter">The Content Multiplier</h3>
          <div className="overflow-x-auto pb-2">
          <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto min-w-[480px]">
            {[
              { label: 'Blog Post', icon: '📄' },
              { label: 'AI Repurposing', icon: '🧠' },
              { label: 'LinkedIn', icon: '💼' },
              { label: 'Instagram', icon: '📸' },
              { label: 'Newsletter', icon: '📧' }
            ].map((step, i) => (
              <div key={i} className="flex flex-1 items-center gap-4">
                <div className="flex-1 text-center space-y-3">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-xl">
                    {step.icon}
                  </div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{step.label}</div>
                </div>
                {i < 4 && <div className="text-blue-500 font-bold text-xl">→</div>}
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ================= 8. SANDWICH MODEL ================= */}
        <section className="bg-white border border-white/10 rounded-[24px] sm:rounded-[40px] p-6 sm:p-12 relative overflow-hidden text-black">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl font-black italic leading-tight uppercase tracking-tighter">The <span className="text-blue-600">Sandwich</span> Model</h3>
              <div className="space-y-4">
                {[
                  { label: 'HUMAN', desc: 'Defines vision & strategy', color: 'bg-blue-600', text: 'text-white' },
                  { label: 'AI', desc: 'Executes, generates, and scales at speed', color: 'bg-slate-200', text: 'text-slate-800' },
                  { label: 'HUMAN', desc: 'Reviews, refines, and optimizes for brand voice', color: 'bg-blue-600', text: 'text-white' }
                ].map((row, i) => (
                  <div key={i} className={`p-5 rounded-2xl flex items-center justify-between shadow-lg ${row.color}`}>
                    <div className={`${row.text} font-black text-sm tracking-widest`}>{row.label}</div>
                    <div className={`text-[11px] font-bold ${row.text} opacity-80 uppercase`}>{row.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-3xl shadow-2xl space-y-4 border-4 border-blue-500/20">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
               </div>
               <h4 className="font-bold text-sm text-blue-400 uppercase tracking-widest">Case Study: Me-Claude-Me</h4>
               <p className="text-xs leading-relaxed text-slate-400">
                  This entire presentation system was built via the sandwich:
               </p>
               <ul className="text-[10px] space-y-2 font-mono">
                  <li className="text-blue-300">• ME: Defined the prompt and structure</li>
                  <li className="text-emerald-300">• CLAUDE: Generated the complex React/Tailwind code</li>
                  <li className="text-blue-300">• ME: Refined the visuals and fixed implementation</li>
               </ul>
               <div className="pt-4 mt-4 border-t border-white/10 text-[9px] font-black uppercase text-center text-slate-500">
                  Human Creativity x AI Velocity
               </div>
            </div>
          </div>
        </section>

        {/* ================= 9. CLOSING ================= */}
        <section className="text-center py-10 border-t border-white/5">
           <h4 className="text-2xl font-black text-white italic max-w-2xl mx-auto leading-tight">
             "AI does not replace marketing strategy. It amplifies creativity and accelerates execution."
           </h4>
        </section>
      </div>
    ),
  },
  // ── SLIDE 2: CUSTOMER SERVICE AUTOMATION ──
{
    number: '02',
    category: 'Strategic Growth',
    title: 'Empowering the One-Person Enterprise',
    subtitle: 'Scaling Auto-Entrepreneurs with Human-Level AI Agents',
    color: 'from-blue-600 to-indigo-700',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    content: (
      <div className="space-y-16">
        {/* ================= HERO SECTION ================= */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
            One Founder. <span className="text-blue-500">Zero Staff.</span> Full Capacity.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            The "Zero Staff" solution for micro-businesses. No-code, instantly deployable AI agents acting as your Defense (Support) and Offense (Lead Gen) engines.
          </p>
        </section>

        {/* ================= PROBLEM: THE HIDDEN COST ================= */}
        <section className="space-y-6">
          <h3 className="text-red-400 text-sm font-bold uppercase tracking-widest text-center">
            The Hidden Cost of "Doing It All"
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { val: '82%', label: 'Availability Gap', desc: 'Customers demanding immediate answers.' },
              { val: '900+h', label: 'The Time Trap', desc: 'Lost annually to manual support and admin.' },
              { val: '35K MAD', label: 'Financial Barrier', desc: 'Monthly cost to hire one human staff member.' },
            ].map((item) => (
              <div key={item.label} className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-red-400">{item.val}</div>
                <div className="text-white font-bold text-sm mt-1">{item.label}</div>
                <div className="text-slate-400 text-xs mt-2 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= THE ENGINES (DEFENSE & OFFENSE) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Defense Engine */}
          <section className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase">
              Defense Engine
            </div>
            <h3 className="text-xl font-bold text-white">24/7 Support Agent</h3>
            <ul className="space-y-3">
              {[
                'Trained on YOUR PDFs & brand voice',
                'Omnichannel: Web, WhatsApp, Instagram',
                'Global Reach: Fluent in 30+ languages',
                'Smart Escalation: Auto-detects complex queries'
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Offense Engine */}
          <section className="bg-indigo-600/5 border border-indigo-500/20 rounded-3xl p-8 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
              Offense Engine
            </div>
            <h3 className="text-xl font-bold text-white">The AI SDR (Lead Gen)</h3>
            <ul className="space-y-3">
              {[
                'SCAN: ICP Identification',
                'SCORE: Prioritize by Intent',
                'PERSONALIZE: AI Drafts Unique Messages',
                'SEND: Auto-Follow Up (5-7 Touchpoints)'
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ================= RAG ARCHITECTURE SECTION ================= */}
        <section className="space-y-8">
          <h3 className="text-blue-400 text-sm font-bold uppercase tracking-widest text-center">
            The RAG Core Brain Architecture
          </h3>
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-center">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-blue-400 text-[10px] font-bold uppercase mb-1">Input</div>
                <div className="text-white text-xs">Customer Question (WhatsApp/Web)</div>
              </div>
              <div className="flex justify-center text-blue-500 text-2xl rotate-90 md:rotate-0">→</div>
              <div className="bg-blue-600 p-6 rounded-2xl text-white font-black shadow-xl shadow-blue-500/30 border border-blue-400/50">
                NexOps RAG Engine
                <div className="text-[9px] font-medium mt-1 opacity-80 uppercase tracking-tighter">Vector Database + LLM</div>
              </div>
              <div className="hidden md:flex justify-center text-blue-500 text-2xl">→</div>
              <div className="md:hidden flex justify-center text-blue-500 text-2xl rotate-90">→</div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-emerald-400 text-[10px] font-bold uppercase mb-1">Output</div>
                <div className="text-white text-xs">Human-Level Accurate Reply</div>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] mt-6 italic">
              Unlike generic AI, RAG retrieves specific facts from your business documents before generating an answer.
            </p>
          </div>
        </section>
        {/* Change 'overflow-hidden' to 'overflow-visible' and add 'z-10 hover:z-50' */}
        <div className="relative group p-1 bg-gradient-to-br from-blue-500/20 to-transparent rounded-[40px] z-10 hover:z-50 transition-all duration-500">
        <div className="bg-black/60 rounded-[38px] overflow-visible border border-white/10 shadow-2xl">
          <img 
            src="/images/rag1.png" 
            alt="rag 1" 
        /* Added 'group-hover:relative' and 'group-hover:z-50' to ensure it jumps to the front */
            className="w-full h-auto object-contain rounded-[38px] opacity-80 
                 group-hover:opacity-100 group-hover:scale-110 
                 group-hover:relative group-hover:z-50
                 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.9)] 
                 transition-all duration-700 ease-out cursor-zoom-in"
            />
        </div>   
        </div>     

        {/* ================= PIPELINE GROWTH CHART ================= */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-white font-bold text-xl uppercase tracking-tight">Consistent Pipeline, Predictable Revenue</h3>
          </div>
          
          <div className="relative h-48 w-full max-w-2xl mx-auto flex items-end justify-between px-10 border-b border-white/10">
            {[
               { month: 'Month 1', height: 'h-20', val: '150+', label: 'Setup & Warmup' },
               { month: 'Month 2', height: 'h-32', val: '250+', label: 'Scaling Outreach' },
               { month: 'Month 3', height: 'h-44', val: '400+', label: 'Full Capacity' },
            ].map((m) => (
              <div key={m.month} className="flex flex-col items-center gap-4 w-32 relative">
                <div className="text-white font-black text-lg animate-pulse">{m.val}</div>
                <div className={`${m.height} w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-lg opacity-90 shadow-lg shadow-blue-500/20`} />
                <div className="absolute -bottom-12 text-center w-32">
                  <div className="text-white text-xs font-bold">{m.month}</div>
                  <div className="text-slate-500 text-[10px] leading-tight mt-1">{m.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-16 grid grid-cols-2 gap-4">
             <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-1">Efficiency Impact</div>
                <div className="text-white text-sm font-medium">20 hours of manual work reduced to 1 hour</div>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest mb-1">Growth Impact</div>
                <div className="text-white text-sm font-medium">+40-60% Pipeline growth by Month 3</div>
             </div>
          </div>
        </section>
 {/* ================= THE EQUATION OF FREEDOM ================= */}
        <section className="py-12 border-y border-white/5 text-center space-y-8">
          <h3 className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em]">The Success Formula</h3>
          <div className="flex justify-center items-center gap-6 md:gap-12">
            <div className="group text-center">
              <div className="w-20 h-20 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 text-2xl font-bold mb-3 group-hover:scale-110 transition-transform">🛡️</div>
              <div className="text-white text-xs font-bold uppercase">Support Agent</div>
            </div>
            <div className="text-slate-500 text-3xl font-light">+</div>
            <div className="group text-center">
              <div className="w-20 h-20 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 text-2xl font-bold mb-3 group-hover:scale-110 transition-transform">⚔️</div>
              <div className="text-white text-xs font-bold uppercase">Sales Agent</div>
            </div>
            <div className="text-slate-500 text-3xl font-light">=</div>
            <div className="group text-center">
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl font-bold mb-3 group-hover:scale-110 transition-transform">🔓</div>
              <div className="text-emerald-400 text-xs font-black uppercase tracking-widest underline decoration-emerald-500/50 underline-offset-4">Founder Freedom</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm italic max-w-lg mx-auto">
            "When defense is automated and offense is on autopilot, the founder is finally free to focus on high-level strategy and growth."
          </p>
        </section>
        {/* ================= FINAL SUMMARY (MAX VALUE) ================= */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-10 overflow-hidden relative">
          <div className="absolute top-4 left-6 text-blue-200/20 font-mono text-[10px] tracking-[0.3em]">ΣTIME + £REVENUE = MAX(VALUE)</div>
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-white tracking-tighter">900</div>
              <div className="text-blue-100 text-xs font-bold uppercase mt-1">Hours Saved/Year</div>
              <p className="text-blue-200/60 text-[10px] mt-2 italic">~2.5 hours recovered daily</p>
            </div>
            <div>
              <div className="text-4xl font-black text-white tracking-tighter">450K</div>
              <div className="text-blue-100 text-xs font-bold uppercase mt-1">MAD Value</div>
              <p className="text-blue-200/60 text-[10px] mt-2 italic">Annual billable productivity</p>
            </div>
            <div>
              <div className="text-4xl font-black text-white tracking-tighter">21x</div>
              <div className="text-blue-100 text-xs font-bold uppercase mt-1">Conversion</div>
              <p className="text-blue-200/60 text-[10px] mt-2 italic">Response time &lt;3 seconds</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 text-9xl font-black text-white/5 select-none uppercase italic">
            Max
          </div>
        </section>
      </div>
    ),
  },

  // ── SLIDE 3: EMAIL MANAGEMENT / OPERATIONS ──
 {
    number: '03',
    category: 'Operations',
    title: 'AI Email Management',
    subtitle: 'The Email Tsunami: how AI tames it in milliseconds',
    color: 'from-blue-700 to-cyan-700',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    content: (
      <div className="space-y-24 pb-20">
        {/* ================= 1. THE PROBLEM: EMAIL TSUNAMI ================= */}
        <section className="space-y-8 pt-6">
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🌊</div>
            <div>
              <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">The Email Tsunami</h2>
              <p className="text-slate-400 text-sm font-medium">Information overload creates a stalling momentum that paralyzes growth.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { val: '28%', unit: 'Of workday lost to email', icon: '⏳', detail: '1 full day per week' },
              { val: '127', unit: 'Daily incoming messages', icon: '📬', detail: 'Average professional' },
              { val: '40%', unit: 'Misrouted or buried', icon: '❌', detail: 'Lost revenue ops' },
            ].map(({ val, unit, icon, detail }) => (
              <div key={unit} className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center group hover:bg-amber-500/5 transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-amber-400 font-black text-3xl italic tracking-tighter mb-1">{val}</div>
                <div className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">{unit}</div>
                <div className="text-slate-500 text-[9px] font-mono">{detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 2. WHO SUFFERS? ================= */}
        <section className="space-y-8">
          <h3 className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] text-center italic">Impact Assessment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { dept: 'Sales & Dev', pain: 'High-value requests buried; speed-to-lead is dead.', icon: '📊', color: 'border-emerald-500/20' },
              { dept: 'Marketing & PR', pain: 'Influencer offers & media ops missed in the noise.', icon: '📣', color: 'border-blue-500/20' },
              { dept: 'Customer Support', pain: 'Urgent complaints mixed with low-priority noise.', icon: '🎧', color: 'border-indigo-500/20' },
              { dept: 'Founders', pain: 'Decision fatigue. Inbox dictates the schedule.', icon: '👤', color: 'border-purple-500/20' },
            ].map((item) => (
              <div key={item.dept} className={`flex items-start gap-4 bg-white/5 border ${item.color} rounded-2xl p-6 hover:scale-[1.05] transition-transform duration-300`}>
                <span className="text-2xl bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl">{item.icon}</span>
                <div>
                  <div className="text-white font-black text-sm uppercase italic mb-1">{item.dept}</div>
                  <div className="text-slate-400 text-xs leading-relaxed font-medium">{item.pain}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

       {/* ================= 3. THE EVOLUTION (TOP-LAYER HOVER) ================= */}
<section className="space-y-10 isolation-auto">
  <div className="text-center">
    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">The Evolution</h2>
    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Hover to inspect. Details will appear above all layers</p>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    {/* OLD WAY COLUMN */}
    <div className="space-y-4">
      <div className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] text-center italic">The Old Way (Manual) [cite: 11, 33]</div>
      <div className="rounded-[32px] bg-black/40 relative group transition-all overflow-hidden">
        <img 
          src="/images/oldway.jpg" 
          alt="Old Way Inbox Chaos" 
          className="w-full h-auto object-contain rounded-[32px] border-2 border-red-500/20 grayscale opacity-60 
                     group-hover:grayscale-0 group-hover:opacity-100 
                     group-hover:scale-125 group-hover:z-[9999] group-hover:relative
                     transition-all duration-500 ease-in-out cursor-zoom-in shadow-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
           <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase italic">Chaos Inbound</span>
        </div>
      </div>
    </div>

    {/* NEXOPS WAY COLUMN */}
    <div className="space-y-4">
      <div className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] text-center italic">The NexOps Way (AI) [cite: 12, 34]</div>
      <div className="rounded-[32px] bg-blue-900/10 relative group transition-all overflow-hidden">
        <img 
          src="/images/newway.jpg" 
          alt="NexOps Organized AI" 
          className="w-full h-auto object-contain rounded-[32px] border-2 border-blue-500/40 
                     group-hover:scale-125 group-hover:z-[9999] group-hover:relative
                     group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.6)] 
                     transition-all duration-500 ease-in-out cursor-zoom-in"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
           <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase italic">Intelligent Triage</span>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* ================= 4. THE WORKFLOW (PDF PAGE 1 IMAGE) ================= */}
        <section className="space-y-8">
           <div className="text-center">
              <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-none">The Solution Architecture</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 italic">From Manual Sorting to Intelligent AI Triage</p>
           </div>
           
           <div className="relative group p-1 bg-gradient-to-br from-blue-500/20 to-transparent rounded-[40px]">
              <div className="bg-black/60 rounded-[38px] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="/images/workflow.jpg" 
                  alt="NexOps AI Workflow" 
                  className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-in-out"
                />
              </div>
              
              <div className="absolute top-8 left-8 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-xl italic shadow-xl pointer-events-none">
                 CORE ENGINE: n8n + AI AGENT
              </div>
           </div>
        </section>

        {/* ================= 5. THE AI GAME CHANGER ================= */}
        <section className="bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/30 rounded-[24px] sm:rounded-[40px] p-6 sm:p-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-md text-left">
              <h3 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">The AI Game Changer</h3>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Understanding Intent</h2>
            </div>
            <div className="bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
              <span className="text-blue-300 font-mono text-[10px] font-bold">Accuracy: 99%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { t: 'Millisecond Reading', d: 'Processes incoming emails in milliseconds, far exceeding human speed.', i: '⚡' },
              { t: 'Contextual Analysis', d: 'Understands intent and urgency, not just keywords.', i: '🧠' },
              { t: 'Instant Routing', d: 'Triggers automated workflows or routes to teams.', i: '🎯' }
            ].map((tech, idx) => (
              <div key={idx} className="space-y-4 p-6 bg-black/20 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors">
                <div className="text-3xl">{tech.i}</div>
                <h4 className="text-white font-bold text-sm uppercase tracking-tighter italic">{tech.t}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{tech.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. FINAL IMPACT ================= */}
        <section className="text-center pt-10 pb-20">
           <div className="inline-block bg-white text-black px-8 py-4 rounded-2xl transform -rotate-1 shadow-2xl hover:rotate-0 transition-transform duration-300">
              <h4 className="font-black italic uppercase tracking-tighter text-xl leading-none">
                ONE FOUNDER. ZERO STAFF. FULL CAPACITY.
              </h4>
           </div>
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-6 italic">
             Reclaim your time. Focus on what truly matters.
           </p>
        </section>
      </div>
    ),
  },
 
 // ── SLIDE 4: DATA & ANALYTICS ──────────────
// ── SLIDE 4: DATA & ANALYTICS (FULL PDF ADAPTATION) ──────────────
{
  number: '04',
  category: 'Data & Analytics',
  title: 'AI Data & Financial Analytics',
  subtitle: 'Empowering Small Business Owners with Intelligent AI Agents',
  color: 'from-slate-700 to-blue-700',
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  ),
  content: (
    <div className="space-y-28 pb-24">
      
      {/* SECTION 1: THE CHALLENGE (PDF PAGE 3-4) */}
      <section className="space-y-10 pt-6">
        <div className="text-center space-y-4">
          <h3 className="text-red-500 text-xs font-black uppercase tracking-[0.4em] italic">01. The Challenge</h3>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Why Small Business Owners Struggle</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">Most people start businesses with energy and ideas, but without strong analytical or financial experience, they hit a wall.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'No Financial Visibility', desc: "Owners don't know if they are profitable or where waste is happening.", icon: '📉' },
            { title: 'Unused Data', desc: 'Sales and expense records exist, but there are no tools to understand trends.', icon: '📂' },
            { title: 'Poor Decision-Making', desc: 'Pricing, budgets, and investments are based on guesses, not insight.', icon: '⚠️' },
          ].map((item) => (
            <div key={item.title} className="bg-red-500/5 border border-red-500/10 p-8 rounded-[40px] hover:bg-red-500/10 transition-all border-dashed">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="text-white font-black text-base uppercase italic mb-2">{item.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: WHAT ARE AI AGENTS? (PDF PAGE 5-6) */}
      <section className="bg-white/5 border border-white/10 rounded-[24px] sm:rounded-[50px] p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl font-black italic uppercase">Solution</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-start sm:items-center">
          <div className="space-y-6">
             <h3 className="text-blue-400 text-xs font-black uppercase tracking-[0.4em] italic">02. The Solution</h3>
             <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">AI Agents: Your Smart System</h2>
             <p className="text-slate-400 text-sm leading-relaxed font-medium">
               An AI Agent isn't just a chatbot. It's a system that <span className="text-blue-400">Connects</span>, <span className="text-blue-400">Analyzes</span>, and <span className="text-blue-400">Suggests</span> actions continuously.
             </p>
             <div className="grid grid-cols-2 gap-4">
               <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                 <div className="text-blue-400 font-bold text-xs uppercase mb-1">Automated</div>
                 <div className="text-slate-500 text-[10px]">Works 24/7 without manual input</div>
               </div>
               <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                 <div className="text-blue-400 font-bold text-xs uppercase mb-1">Intelligent</div>
                 <div className="text-slate-500 text-[10px]">Learns from your specific data</div>
               </div>
             </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-transparent p-8 rounded-full border border-blue-500/20 text-center">
             <div className="text-5xl mb-4">🤖</div>
             <div className="text-white font-black italic text-xl uppercase tracking-tighter">The Agent CFO</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WORKFLOW DIAGRAM (PDF PAGE 15) */}
      <section className="space-y-10">
        <div className="text-center">
          <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.4em] italic mb-2">03. How It Works</h3>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none text-blue-500">Agent CFO Workflow</h2>
        </div>

        <div className="relative group p-1 bg-gradient-to-br from-blue-500/40 to-transparent rounded-[40px] z-10 hover:z-50 transition-all">
          <div className="bg-black rounded-[38px] overflow-visible border border-white/10 shadow-2xl">
            <img 
              src="/images/cfo-workflow.png" 
              alt="Agent CFO n8n Workflow" 
              className="w-full h-auto object-contain rounded-[38px] opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out cursor-zoom-in"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: SPECIALIST DELEGATION (PDF PAGE 14) */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
          <div className="max-w-md">
            <h3 className="text-blue-400 text-xs font-black uppercase tracking-[0.4em] italic mb-2">04. The Squad</h3>
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">6 Specialists, One Goal.</h2>
          </div>
          <p className="text-slate-500 text-[10px] uppercase font-bold text-right italic">Powered by Claude & n8n</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { role: 'Planning Analyst', task: 'Budgets, forecasts & models', icon: '📅' },
            { role: 'Accounting Specialist', task: 'Bookkeeping & tax compliance', icon: '📂' },
            { role: 'Cash Management', task: 'Liquidity & cash flow monitoring', icon: '💰' },
            { role: 'Financial Analyst', task: 'KPIs, metrics & variance analysis', icon: '📊' },
            { role: 'Risk Analyst', task: 'Capital allocation & risk mgmt', icon: '⚖️' },
            { role: 'Internal Audit', task: 'Compliance, controls & audits', icon: '🛡️' },
          ].map((agent) => (
            <div key={agent.role} className="flex flex-col gap-4 bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group">
              <span className="text-3xl w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl group-hover:bg-blue-500/20 transition-colors shadow-inner">{agent.icon}</span>
              <div>
                <div className="text-white font-black text-xs uppercase italic tracking-tighter mb-1">{agent.role}</div>
                <div className="text-slate-500 text-[11px] leading-tight font-medium">{agent.task}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FINAL IMPACT (PDF PAGE 16) */}
      <section className="pt-10">
        <div className="text-center space-y-8 sm:space-y-12 bg-gradient-to-b from-transparent to-blue-900/20 rounded-[24px] sm:rounded-[60px] p-8 sm:p-16 border-x border-b border-white/5">
           <h2 className="text-3xl sm:text-5xl font-black text-white italic uppercase tracking-tighter">The Future of <span className="gradient-text">Small Business</span></h2>
           
           <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
             {['Data', 'Analysis', 'Decisions', 'Results'].map((text, i, arr) => (
               <div key={text} className="flex items-center gap-3">
                 <div className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-black italic uppercase text-sm sm:text-lg shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                   {text}
                 </div>
                 {i < arr.length - 1 && <span className="text-blue-500 font-bold text-xl sm:text-2xl">→</span>}
               </div>
             ))}
           </div>

           <div className="max-w-2xl mx-auto pt-10">
              <p className="text-slate-400 text-sm italic font-medium">
                "Small and medium businesses can grow smarter and more confidently with AI Agents: Bridging the gap between raw data and clear financial decisions."
              </p>
           </div>
        </div>
      </section>

    </div>
  ),
},

  // ── SLIDE 5: THANK YOU ────────────────────────
  {
    number: '',
    category: 'NexOps AI · 2026',
    title: 'Thank You',
    subtitle: "Let's build your AI future together",
    color: 'from-slate-900 to-blue-950',
    icon: (
      <svg width="28" height="28" viewBox="0 0 18 18" fill="none">
        <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.5"/>
        <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
      </svg>
    ),
    content: (onExit: () => void) => (
      <div className="flex flex-col items-center justify-center text-center space-y-10 py-10 relative">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 65%)' }} />
        </div>

        {/* Logo */}
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 140 }}
          className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center"
              style={{ boxShadow: '0 0 60px rgba(37,99,235,0.55), 0 8px 32px rgba(0,0,0,0.5)' }}>
              <svg width="54" height="54" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.55"/>
                <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
              </svg>
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-400 rounded-full border-2 border-black animate-pulse" />
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              NexOps <span className="text-blue-400">AI</span>
            </div>
            <div className="text-slate-500 text-xs uppercase tracking-[0.35em] mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
              Intelligent Business Automation
            </div>
          </div>
        </motion.div>

        {/* Thank you heading */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="space-y-4">
          <h2 className="text-5xl sm:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
            Thank{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">You</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            We appreciate your time. The next step is yours —<br />
            let&apos;s build your AI system and unlock your growth.
          </p>
        </motion.div>

        {/* Website link */}
        <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          href="https://nexopsai.vercel.app" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
          style={{ fontFamily: 'var(--font-mono)' }}>
          🌐 nexopsai.vercel.app
        </motion.a>

        {/* Exit button */}
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          onClick={onExit}
          className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-base"
          style={{ fontFamily: 'var(--font-body)', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Return to Website
        </motion.button>

        {/* Team credits */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 pt-8 border-t border-white/5 w-full max-w-xl">
          {[
            { name: 'Houda El Fahsi',       role: 'Marketing AI'  },
            { name: 'Soufiane Ouriaghli',   role: 'Support AI'    },
            { name: 'Ilyas Sadour',         role: 'Email AI'      },
            { name: 'Mohamed Reda Touhami', role: 'Finance AI'    },
          ].map(m => (
            <div key={m.name}>
              <div className="text-white text-xs font-semibold leading-tight">{m.name}</div>
              <div className="text-blue-500 text-[10px] mt-0.5 font-medium" style={{ fontFamily: 'var(--font-mono)' }}>{m.role}</div>
            </div>
          ))}
        </motion.div>
      </div>
    ),
  },
]


// ─────────────────────────────────────────────
// SPEAKER NOTES
// ─────────────────────────────────────────────
const NOTES: Record<string, string[]> = {
  '01': [
    'Audience hook: "How much does a marketing agency cost per month?" — Answer: $5K+',
    'Highlight the gap: 90% of micro-businesses stay invisible online because of high costs and slow execution cycles.',
    'Explain the Sandwich Model: Human (vision & strategy) → AI (execution at scale) → Human (review & brand voice).',
    'Closing line: "AI doesn\'t replace marketing strategy — it amplifies creativity and accelerates execution."',
  ],
  '02': [
    'Shocking numbers: 900 hours/year lost + 35K MAD/month for one staff member = the hidden cost of "doing it all yourself".',
    'Defense Engine = 24/7 Support Agent trained on YOUR docs | Offense Engine = autonomous Lead Gen SDR.',
    'RAG Core: doesn\'t answer from memory — answers from your documents. 99% accuracy, zero hallucinations.',
    'Closing stat: +40–60% pipeline growth by Month 3 with both engines running.',
  ],
  '03': [
    'Shocking stat: 28% of the workday is lost to email — that\'s one full day every single week.',
    'Show both images: Old Way (red chaos) vs NexOps Way (intelligent triage) — let the visual do the talking.',
    'n8n + Gemini reads intent, classifies, and routes automatically in milliseconds — 99% accuracy.',
    'Closing line: "One founder. Zero staff. Full capacity." — that\'s the entire goal of this solution.',
  ],
  '04': [
    'Root problem: 80% of small businesses are run on gut feeling, not real data — no financial visibility.',
    'Agent CFO = 6 AI specialists in one system: Planner + Accountant + Cash Flow + Analyst + Risk + Auditor.',
    'Walk through the n8n workflow: raw CSV/Excel in → clear financial recommendation out — in seconds.',
    'Closing message: "The data already exists in every business. The difference is who can interpret it fast and accurately."',
  ],
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function PresentationMode({ onExit }: PresentationModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'right' | 'left'>('right')
  const [isAnimating, setIsAnimating] = useState(false)

  // ── Presenter features ──────────────────────
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [laserMode, setLaserMode] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [timerSec, setTimerSec] = useState(0)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const fsDotRef = useRef<HTMLDivElement>(null)
  const fsRingRef = useRef<HTMLDivElement>(null)

  // ── Timer ──
  useEffect(() => {
    const id = setInterval(() => setTimerSec(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  // ── First-time shortcuts hint ──
  useEffect(() => {
    if (!localStorage.getItem('nexops-shortcuts-seen')) {
      setShowShortcuts(true)
      localStorage.setItem('nexops-shortcuts-seen', '1')
      const t = setTimeout(() => setShowShortcuts(false), 7000)
      return () => clearTimeout(t)
    }
  }, [])

  // ── Fullscreen cursor tracking ──
  useEffect(() => {
    if (!isFullscreen) return
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const loop = () => {
      if (fsDotRef.current) {
        fsDotRef.current.style.left = mx + 'px'
        fsDotRef.current.style.top = my + 'px'
      }
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (fsRingRef.current) {
        fsRingRef.current.style.left = rx + 'px'
        fsRingRef.current.style.top = ry + 'px'
      }
      rafId = requestAnimationFrame(loop)
    }
    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [isFullscreen])

  // ── Fullscreen listener ──
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen()
    else document.exitFullscreen()
  }, [])

  // ── Laser pointer: hide custom cursor when active ──
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (dot) dot.style.opacity = laserMode ? '0' : ''
    if (ring) ring.style.opacity = laserMode ? '0' : ''
    if (!laserMode) return
    const handler = (e: MouseEvent) => setLaserPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => {
      window.removeEventListener('mousemove', handler)
      if (dot) dot.style.opacity = ''
      if (ring) ring.style.opacity = ''
    }
  }, [laserMode])

  const goTo = useCallback((index: number, dir: 'right' | 'left') => {
    if (isAnimating || index < 0 || index >= slides.length) return
    setIsAnimating(true)
    setDirection(dir)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const next = useCallback(() => goTo(currentSlide + 1, 'right'), [currentSlide, goTo])
  const prev = useCallback(() => goTo(currentSlide - 1, 'left'), [currentSlide, goTo])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
      if (e.key === 'Escape') {
        if (showGallery) { setShowGallery(false); return }
        if (showNotes) { setShowNotes(false); return }
        if (document.fullscreenElement) { document.exitFullscreen(); return }
        onExit()
      }
      if (e.key === 'f' || e.key === 'F') toggleFullscreen()
      if (e.key === 'n' || e.key === 'N') setShowNotes(v => !v)
      if (e.key === 'l' || e.key === 'L') setLaserMode(v => !v)
      if (e.key === 'g' || e.key === 'G') setShowGallery(v => !v)
      if (e.key === 'p' || e.key === 'P') window.print()
      if (e.key === '?') setShowShortcuts(v => !v)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, onExit, toggleFullscreen, showGallery, showNotes])

  const slide = slides[currentSlide]
  const progressPct = ((currentSlide + 1) / slides.length) * 100
  const currentNotes = NOTES[slide.number] || []

  return (
    <div ref={containerRef} className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: '#020408', color: '#e2e8f0' }}>
      {/* ── IN-CONTAINER CURSOR (active in fullscreen mode) ── */}
      <div ref={fsDotRef} className="pointer-events-none fixed z-[99999]"
        style={{ width: 8, height: 8, background: '#3b82f6', borderRadius: '50%', transform: 'translate(-50%,-50%)', opacity: isFullscreen ? 1 : 0 }}/>
      <div ref={fsRingRef} className="pointer-events-none fixed z-[99998]"
        style={{ width: 36, height: 36, border: '1.5px solid rgba(59,130,246,0.5)', borderRadius: '50%', transform: 'translate(-50%,-50%)', transition: 'width 0.2s, height 0.2s', opacity: isFullscreen ? 1 : 0 }}/>
      {/* ── CINEMATIC PROGRESS BAR (top) ── */}
      <div className="absolute top-0 left-0 right-0 z-50 h-0.5 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ── TOP BAR ── */}
      <div className="relative z-20 flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/50 backdrop-blur-xl mt-0.5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 blue-glow">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.5"/>
              <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-bold text-sm hidden sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
            NexOps <span className="text-blue-400">AI</span>
          </span>
          <span className="text-slate-700 text-xs mx-1 hidden lg:inline">|</span>
          <span className="text-slate-500 text-xs hidden lg:inline" style={{ fontFamily: 'var(--font-mono)' }}>
            AI Solutions Presentation 2026
          </span>
        </div>

        {/* Slide dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > currentSlide ? 'right' : 'left')}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* ── Action controls ── */}
        <div className="flex items-center gap-0.5">
          {/* Timer */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-xs px-2 py-1.5" style={{ fontFamily: 'var(--font-mono)' }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round"/>
            </svg>
            {formatTime(timerSec)}
          </div>
          <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block"/>
          {/* Gallery */}
          <button onClick={() => setShowGallery(v => !v)} title="Slide Gallery [G]"
            className={`hidden sm:block p-1.5 rounded-lg transition-colors ${showGallery ? 'text-blue-400 bg-blue-500/10' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
          {/* Notes */}
          <button onClick={() => setShowNotes(v => !v)} title="Speaker Notes [N]"
            className={`hidden sm:block p-1.5 rounded-lg transition-colors ${showNotes ? 'text-yellow-400 bg-yellow-500/10' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Laser */}
          <button onClick={() => setLaserMode(v => !v)} title="Laser Pointer [L]"
            className={`hidden sm:block p-1.5 rounded-lg transition-colors ${laserMode ? 'text-red-400 bg-red-500/10' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Print/PDF */}
          <button onClick={() => window.print()} title="Export PDF [P]"
            className="hidden sm:block p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm1-4h4m-5-8V3h8v4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} title="Fullscreen [F]"
            className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition-colors">
            {isFullscreen ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 8V5h3M21 8V5h-3M3 16v3h3M21 16v3h-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <div className="w-px h-4 bg-white/10 mx-1"/>
          {/* Help */}
          <button onClick={() => setShowShortcuts(v => !v)} title="Shortcuts [?]"
            className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold">?
          </button>
          {/* Exit */}
          <button onClick={onExit}
            className="flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
            style={{ fontFamily: 'var(--font-mono)' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* ── MAIN SLIDE AREA ── */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (dir: string) => ({
                x: dir === 'right' ? 120 : -120,
                opacity: 0,
                scale: 0.97,
              }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (dir: string) => ({
                x: dir === 'right' ? -120 : 120,
                opacity: 0,
                scale: 0.97,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex"
          >
            {/* ── LEFT PANEL (hidden on mobile) ── */}
            <div className={`relative hidden md:flex w-64 xl:w-72 flex-shrink-0 bg-gradient-to-b ${slide.color} flex-col p-8 overflow-hidden`}>
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-1/4 -left-16 w-48 h-48 border border-white rounded-full"/>
                <div className="absolute bottom-1/4 -right-16 w-64 h-64 border border-white rounded-full"/>
              </div>
              {/* Grid on panel */}
              <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"/>

              {slide.number && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-7xl font-extrabold text-white/10 leading-none block"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {slide.number}
                </motion.span>
              )}

              <div className="flex-1 flex flex-col justify-center gap-4">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                  className="w-14 h-14 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center text-white">
                  {slide.icon}
                </motion.div>

                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                  className="text-xs font-semibold text-white/60 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  {slide.category}
                </motion.span>

                <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-lg xl:text-xl font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                  {slide.title}
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                  className="text-xs text-white/55 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {slide.subtitle}
                </motion.p>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span>Slide</span>
                  <span>{currentSlide + 1} / {slides.length}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ background: '#020408' }}>
              {/* Mobile slide info bar */}
              <div className={`md:hidden flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${slide.color}`}>
                <span className="text-white/40 font-black text-2xl leading-none" style={{ fontFamily: 'var(--font-display)' }}>{slide.number}</span>
                <div>
                  <div className="text-white font-semibold text-sm leading-tight">{slide.title}</div>
                  <div className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{slide.category}</div>
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-10 max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 mb-6 text-slate-700 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-xs">←</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-xs">→</kbd>
                  <span>Navigate</span>
                  <span className="text-slate-800">·</span>
                  <button onClick={() => setShowShortcuts(v => !v)} className="text-slate-700 hover:text-slate-400 transition-colors">? shortcuts</button>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {typeof slide.content === 'function' ? slide.content(onExit) : slide.content}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="relative z-20 flex items-center justify-between px-6 py-3 border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <button onClick={prev} disabled={currentSlide === 0}
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
            currentSlide === 0 ? 'text-slate-800 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`} style={{ fontFamily: 'var(--font-body)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Previous
        </button>

        <div className="hidden md:flex items-center gap-1">
          {slides.filter(s => s.number).map((s) => {
            const idx = slides.indexOf(s)
            return (
              <button key={idx} onClick={() => goTo(idx, idx > currentSlide ? 'right' : 'left')}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                  idx === currentSlide ? 'text-blue-400 bg-blue-500/10 font-semibold border border-blue-500/20' : 'text-slate-600 hover:text-slate-400 hover:bg-white/5'
                }`} style={{ fontFamily: 'var(--font-mono)' }}>
                {s.number}
              </button>
            )
          })}
        </div>

        <button onClick={currentSlide === slides.length - 1 ? onExit : next}
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
            currentSlide === slides.length - 1
              ? 'text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`} style={{ fontFamily: 'var(--font-body)' }}>
          {currentSlide === slides.length - 1 ? (
            <>Back to Site
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </>
          ) : (
            <>Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </div>

      {/* ── Laser Pointer Dot ── */}
      {laserMode && (
        <div
          className="pointer-events-none fixed z-[9999]"
          style={{
            left: laserPos.x, top: laserPos.y,
            transform: 'translate(-50%, -50%)',
            width: 18, height: 18, borderRadius: '50%',
            background: 'rgba(239,68,68,0.95)',
            boxShadow: '0 0 0 3px rgba(239,68,68,0.3), 0 0 16px 6px rgba(239,68,68,0.5), 0 0 32px 12px rgba(239,68,68,0.2)',
          }}
        />
      )}

      {/* ── Speaker Notes Panel ── */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-14 left-0 right-0 z-50 px-6 pb-2"
          >
            <div className="max-w-3xl mx-auto border border-yellow-500/20 rounded-2xl p-5 backdrop-blur-xl"
              style={{ background: 'rgba(12,10,4,0.97)', boxShadow: '0 -8px 32px rgba(0,0,0,0.8)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>📋</span> Speaker Notes · Slide {slide.number}
                </span>
                <button onClick={() => setShowNotes(false)}
                  className="text-slate-600 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-white/5 transition-colors">
                  ✕ close
                </button>
              </div>
              <ul className="space-y-2">
                {currentNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="text-yellow-500 font-bold mt-0.5 flex-shrink-0 text-xs">{i + 1}.</span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Slide Gallery Modal ── */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: 'rgba(2,4,8,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
              <div>
                <span className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>Slide Overview</span>
                <span className="text-slate-600 text-xs ml-3" style={{ fontFamily: 'var(--font-mono)' }}>{slides.length} slides</span>
              </div>
              <button onClick={() => setShowGallery(false)}
                className="flex items-center gap-2 text-slate-500 hover:text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <span>Close</span>
                <kbd className="text-xs bg-white/10 border border-white/10 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-mono)' }}>G</kbd>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                {slides.map((s, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => { goTo(i, i > currentSlide ? 'right' : 'left'); setShowGallery(false) }}
                    className={`relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-200 hover:scale-[1.04] ${
                      i === currentSlide ? 'border-blue-500 shadow-lg shadow-blue-500/30' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`h-28 bg-gradient-to-br ${s.color} flex flex-col justify-between p-4`}>
                      <div className="flex items-center justify-between">
                        <span className="text-white/30 font-black text-4xl leading-none">{s.number}</span>
                        {i === currentSlide && <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>}
                      </div>
                      <div className="text-white/60">{s.icon}</div>
                    </div>
                    <div className="bg-white/5 border-t border-white/5 p-3">
                      <div className="text-white font-semibold text-xs leading-tight truncate">{s.title}</div>
                      <div className="text-slate-500 text-[10px] mt-0.5 truncate" style={{ fontFamily: 'var(--font-mono)' }}>{s.category}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Keyboard Shortcuts Tooltip ── */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-5 z-[60] rounded-2xl p-5 shadow-2xl"
            style={{ background: 'rgba(8,10,18,0.97)', border: '1px solid rgba(255,255,255,0.08)', minWidth: 224, backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-bold text-xs uppercase tracking-widest">Shortcuts</span>
              <button onClick={() => setShowShortcuts(false)} className="text-slate-600 hover:text-white text-xs transition-colors">✕</button>
            </div>
            <div className="space-y-2">
              {[
                { key: '← →', action: 'Navigate slides' },
                { key: 'F', action: 'Toggle fullscreen' },
                { key: 'N', action: 'Speaker notes' },
                { key: 'L', action: 'Laser pointer' },
                { key: 'G', action: 'Slide gallery' },
                { key: 'P', action: 'Print / PDF' },
                { key: '?', action: 'Toggle this panel' },
                { key: 'Esc', action: 'Back / Exit' },
              ].map(({ key, action }) => (
                <div key={key} className="flex items-center justify-between gap-6">
                  <kbd className="text-xs bg-white/10 border border-white/10 px-2 py-1 rounded text-slate-300 flex-shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                    {key}
                  </kbd>
                  <span className="text-slate-500 text-xs text-right">{action}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat */}
      <ChatButton theme="dark" />
    </div>
  )
}
