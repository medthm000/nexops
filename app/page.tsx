'use client'

import { useState } from 'react'
import BootScreen from '../components/BootScreen'
import LandingPage from '../components/LandingPage'
import PresentationMode from '../components/PresentationMode'

type AppState = 'boot' | 'landing' | 'presentation'

export default function Home() {
  const [state, setState] = useState<AppState>('boot')

  if (state === 'boot') {
    return <BootScreen onComplete={() => setState('landing')} />
  }

  if (state === 'presentation') {
    return <PresentationMode onExit={() => setState('landing')} />
  }

  return <LandingPage onStartPresentation={() => setState('presentation')} />
}
