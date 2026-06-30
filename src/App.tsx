import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import QuestionScreen from './components/QuestionScreen'
import SuccessScreen from './components/SuccessScreen'
import FloatingHeartsBackground from './components/FloatingHeartsBackground'

function App() {
  const [hasAccepted, setHasAccepted] = useState(false)

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      <FloatingHeartsBackground />

      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <QuestionScreen
            key="question"
            onAccept={() => setHasAccepted(true)}
          />
        ) : (
          <SuccessScreen key="success" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
