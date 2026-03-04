'use client'

import Navbar from './Navbar'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import TeamSection from './TeamSection'
import Footer from './Footer'
import ChatButton from './ChatButton'
import AuditTool from './AuditTool'

interface LandingPageProps {
  onStartPresentation: () => void
}

export default function LandingPage({ onStartPresentation }: LandingPageProps) {
  return (
    <main data-theme="light" className="min-h-screen" style={{ background: '#f0f6ff' }}>
      <Navbar />
      <HeroSection onStartPresentation={onStartPresentation} />
      <AboutSection />
      <TeamSection />
      <AuditTool onStartPresentation={onStartPresentation} />
      <Footer onStartPresentation={onStartPresentation} />
      <ChatButton theme="light" />
    </main>
  )
}
