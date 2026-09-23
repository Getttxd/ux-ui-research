import { useState, useEffect } from 'react'
import Home from './components/Home'
import DemoAppA from './components/DemoAppA'
import DemoAppB from './components/DemoAppB'

function App() {
  // 'home' | 'appA' | 'appB'
  const [currentScreen, setCurrentScreen] = useState('home')

  const handleStartApp = (appType) => {
    setCurrentScreen(appType)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const handleBackToHome = () => {
    setCurrentScreen('home')
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [currentScreen])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {currentScreen === 'home' && (
        <Home onSelectApp={handleStartApp} />
      )}

      {currentScreen === 'appA' && (
        <DemoAppA onBack={handleBackToHome} />
      )}

      {currentScreen === 'appB' && (
        <DemoAppB onBack={handleBackToHome} />
      )}
    </div>
  )
}

export default App

