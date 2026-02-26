"use client"

import { Button } from "@/components/ui/button"
import { DIAGNOSES, DIAGNOSIS_EMOJIS } from "@/lib/health-data"
import { useCalculator } from "./calculator-context"
import { memo } from "react"

interface FrequencyScreenProps {
  onNext: () => void
  onBack: () => void
}

const FrequencyRanges = [
  { label: "Once", multiplier: 1, value: 1 },
  { label: "2-3 times", multiplier: 3, value: 3 },
  { label: "4-6 times", multiplier: 6, value: 6 },
  { label: "7+ times", multiplier: 10, value: 10 },
]

const FrequencyItem = memo(
  ({
    diagnosisId,
    frequency,
    onUpdate,
  }: {
    diagnosisId: string
    frequency: number
    onUpdate: (freq: number) => void
  }) => {
    const diagnosis = DIAGNOSES.find((d) => d.id === diagnosisId)
    if (!diagnosis) return null

    const getSelectedRange = () => {
      if (frequency === 0) return null
      if (frequency === 1) return 0
      if (frequency === 3) return 1
      if (frequency === 6) return 2
      if (frequency >= 10) return 3
      return null
    }

    const selectedIndex = getSelectedRange()

    return (
      <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-4 md:p-5 space-y-3 md:space-y-4 transition-all hover:bg-white/80">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-2xl md:text-3xl">{DIAGNOSIS_EMOJIS[diagnosisId] || "💊"}</span>
          <h3 className="font-bold text-base md:text-lg text-foreground truncate">{diagnosis.layLabel}</h3>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {FrequencyRanges.map((range, idx) => (
            <button
              key={idx}
              onClick={() => onUpdate(range.value)}
              className={`py-2 md:py-3 px-1 md:px-2 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all ${
                selectedIndex === idx
                  ? "bg-[#de633e] text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    )
  },
)

FrequencyItem.displayName = "FrequencyItem"

export function FrequencyScreen({ onNext, onBack }: FrequencyScreenProps) {
  const { selectedDiagnoses, updateFrequency } = useCalculator()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-8 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-foreground">How often did you have these?</h2>
          <p className="text-gray-700 text-lg">Select the frequency range for each condition</p>
        </div>

        <div className="space-y-4 flex-1">
          {selectedDiagnoses.map((item) => (
            <FrequencyItem
              key={item.diagnosisId}
              diagnosisId={item.diagnosisId}
              frequency={item.frequency}
              onUpdate={(freq) => updateFrequency(item.diagnosisId, freq)}
            />
          ))}
        </div>

        <div className="flex gap-3 pt-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-12 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-white text-foreground hover:bg-white/80 transition-all"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 rounded-xl transition-all font-bold"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
