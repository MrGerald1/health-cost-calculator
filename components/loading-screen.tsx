"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

const FACTS = [
  "Did you know? Malaria costs Nigerians over ₦2 trillion annually in healthcare and lost productivity.",
  "Prevention is better than cure. A routine checkup can prevent serious health complications.",
  "Regular exercise and proper nutrition can reduce healthcare costs by up to 30% per year.",
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentFact, setCurrentFact] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const totalDuration = 6000
    const factDuration = 2000

    let currentFactIndex = 0
    let factStartTime = startTime

    const factInterval = setInterval(() => {
      const now = Date.now()
      const timeSinceFact = now - factStartTime

      if (timeSinceFact >= factDuration) {
        currentFactIndex = (currentFactIndex + 1) % FACTS.length
        setCurrentFact(currentFactIndex)
        factStartTime = now
        setFadeOut(false)
      } else if (timeSinceFact >= factDuration - 500) {
        setFadeOut(true)
      }
    }, 100)

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const targetProgress = (elapsed / totalDuration) * 100

      setProgress((prev) => {
        const newProgress = Math.min(targetProgress, 100)
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          clearInterval(factInterval)
          setTimeout(onComplete, 300)
        }
        return newProgress
      })
    }, 100)

    return () => {
      clearInterval(factInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="text-center space-y-8 max-w-md relative z-10">
        {/* Animated loading indicator */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-gray-300 border-t-[#de633e] animate-spin"></div>
        </div>

        {/* Status text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900">Calculating your health costs...</h2>
          <p className="text-gray-700 font-medium">Checking prices across Nigeria</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 min-h-28 flex items-center border border-white/40">
          <p
            className={`text-gray-900 text-lg leading-relaxed font-medium transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            {FACTS[currentFact]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="w-full bg-gray-300/30 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div
              className="bg-[#de633e] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-700 text-sm font-medium">{Math.min(Math.round(progress), 100)}%</p>
        </div>
      </div>
    </div>
  )
}
