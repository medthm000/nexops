'use client'

import Navbar from './Navbar'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import TeamSection from './TeamSection'
import Footer from './Footer'
import ChatButton from './ChatButton'
import AuditTool from './AuditTool'
import ROICalculator from './ROICalculator'

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
      <AuditTool />
      <ROICalculator />
      <Footer onStartPresentation={onStartPresentation} />
      <ChatButton theme="light" />
    </main>
  )
}
