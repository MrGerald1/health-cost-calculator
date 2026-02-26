"use client"

import { Button } from "@/components/ui/button"
import { useCalculator } from "./calculator-context"
import { memo } from "react"

interface InsuranceScreenProps {
  onNext: () => void
  onBack: () => void
}

const InsuranceOption = memo(
  ({
    value,
    label,
    isSelected,
    onClick,
  }: {
    value: string
    label: string
    isSelected: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium ${
        isSelected
          ? "border-[#de633e] bg-orange-50 text-gray-900"
          : "border-gray-200 bg-white hover:border-[#de633e] text-gray-900"
      }`}
      aria-pressed={isSelected}
    >
      {label}
    </button>
  ),
)

InsuranceOption.displayName = "InsuranceOption"

export function StateInsuranceScreen({ onNext, onBack }: InsuranceScreenProps) {
  const { insurance, setInsurance, email, setEmail } = useCalculator()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-pink-50 px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#00473E] hover:text-[#de633e] transition-colors font-medium"
          aria-label="Go back"
        >
          ← Back
        </button>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Last few details</h2>
          <p className="text-gray-600">Tell us about your coverage</p>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Do you have health insurance?</h3>
            <p className="text-sm text-gray-600">This helps us show potential savings</p>
          </div>

          <div className="space-y-2">
            <InsuranceOption
              value="yes"
              label="Yes, I have coverage"
              isSelected={insurance === "yes"}
              onClick={() => setInsurance("yes")}
            />
            <InsuranceOption
              value="no"
              label="No coverage"
              isSelected={insurance === "no"}
              onClick={() => setInsurance("no")}
            />
          </div>
        </div>

        {/* Email section */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Get your results via email?</h3>
            <p className="text-sm text-gray-600">Optional - we'll send you a summary and insights</p>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#de633e] focus:border-transparent transition-all"
            aria-label="Email address"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-12 rounded-2xl bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 transition-all"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 bg-[#de633e] hover:bg-[#c85530] text-white h-12 rounded-2xl transition-all font-semibold"
          >
            See Results
          </Button>
        </div>
      </div>
    </div>
  )
}
