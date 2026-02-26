"use client"

import { Button } from "@/components/ui/button"
import { AVERAGE_NIGERIAN_ANNUAL_HEALTHCARE } from "@/lib/health-data"

interface LandingScreenProps {
  onStart: () => void
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-pink-50 flex items-center justify-center px-4 py-8 md:py-12 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md text-center space-y-6 md:space-y-8 animate-in fade-in duration-700 relative z-10">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-foreground leading-snug">
            I swear I had this money in my account😩.
          </h1>

          <div className="space-y-3 md:space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              You track data. You track food. You track transport. But you ignore the "small-small" ₦5k you spend on
              medicine at the chemist.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">It adds up faster than you think.</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 space-y-3 md:space-y-4 border border-white/40 shadow-lg">
          <h2 className="text-lg sm:text-2xl md:text-5xl font-black text-primary break-words">
            The ₦{AVERAGE_NIGERIAN_ANNUAL_HEALTHCARE.toLocaleString()} Myth
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
            They say this is the average healthcare cost in Nigeria. But you and I know that if you buy your own medicine
            or traditional remedies, your real cost is 2-4x higher.
          </p>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="w-full bg-[#de633e] hover:bg-[#c85530] text-white text-sm sm:text-base md:text-lg h-11 sm:h-12 md:h-14 rounded-2xl transition-all active:scale-95 shadow-lg font-bold"
        >
          Calculate My Real Cost
        </Button>

        <p className="text-xs text-gray-600">Health insurance comparison • Medical expense tracker</p>
      </div>
    </main>
  )
}
