"use client"

import { useState, useMemo, memo } from "react"
import { Button } from "@/components/ui/button"
import { DIAGNOSES, DIAGNOSIS_EMOJIS } from "@/lib/health-data"
import { useCalculator } from "./calculator-context"
import { ChevronDown } from "lucide-react"

interface DiagnosisSelectionProps {
  onNext: () => void
}

const DiagnosisButton = memo(
  ({
    diagnosis,
    isSelected,
    isDisabled,
    onClick,
  }: {
    diagnosis: (typeof DIAGNOSES)[0]
    isSelected: boolean
    isDisabled: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`p-4 rounded-xl border-2 transition-all text-center space-y-2 ${
        isSelected ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white hover:border-purple-300"
      } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-pressed={isSelected}
      aria-label={`Select ${diagnosis.layLabel}`}
    >
      <div className="text-3xl">{DIAGNOSIS_EMOJIS[diagnosis.id] || "💊"}</div>
      <div className="text-sm font-medium text-gray-900">{diagnosis.layLabel}</div>
    </button>
  ),
)

DiagnosisButton.displayName = "DiagnosisButton"

export function DiagnosisSelection({ onNext }: DiagnosisSelectionProps) {
  const { selectedDiagnoses, toggleDiagnosis } = useCalculator()
  const [showAll, setShowAll] = useState(false)

  const selectedIds = useMemo(() => selectedDiagnoses.map((item) => item.diagnosisId), [selectedDiagnoses])
  const visibleDiagnoses = useMemo(() => (showAll ? DIAGNOSES : DIAGNOSES.slice(0, 6)), [showAll])

  const suggestedDiagnoses = useMemo(() => {
    if (selectedIds.length === 0) return []
    const lastSelected = selectedIds[selectedIds.length - 1]
    const diagnosis = DIAGNOSES.find((d) => d.id === lastSelected)
    if (!diagnosis) return []
    return diagnosis.suggestedRelations
      .map((id) => DIAGNOSES.find((d) => d.id === id))
      .filter((d) => d && !selectedIds.includes(d.id))
      .slice(0, 3)
  }, [selectedIds])

  const isMaxSelected = selectedIds.length >= 12

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 px-4 py-8 flex flex-col">
      <div className="max-w-2xl mx-auto space-y-6 flex-1 flex flex-col">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">What's been bothering you?</h2>
          <p className="text-gray-600">Pick the health conditions you or your family had in the last 12 months</p>
        </div>

        {/* Main diagnosis grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 overflow-y-auto">
          {visibleDiagnoses.map((diagnosis) => (
            <DiagnosisButton
              key={diagnosis.id}
              diagnosis={diagnosis}
              isSelected={selectedIds.includes(diagnosis.id)}
              isDisabled={isMaxSelected && !selectedIds.includes(diagnosis.id)}
              onClick={() => toggleDiagnosis(diagnosis.id)}
            />
          ))}
        </div>

        {!showAll && DIAGNOSES.length > 6 && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-3 text-purple-600 font-medium flex items-center justify-center gap-2 hover:bg-purple-50 rounded-lg transition-colors"
          >
            See more conditions
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {/* Suggested diagnoses */}
        {suggestedDiagnoses.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-600">People also picked:</p>
            <div className="flex gap-2 flex-wrap">
              {suggestedDiagnoses.map((diagnosis) => (
                <button
                  key={diagnosis!.id}
                  onClick={() => toggleDiagnosis(diagnosis!.id)}
                  className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm font-medium transition-colors"
                >
                  + {diagnosis!.layLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selection summary */}
        {selectedIds.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3 animate-in fade-in duration-300">
            <p className="text-sm font-medium text-gray-900">Selected: {selectedIds.length}/12</p>
            <div className="flex flex-wrap gap-2">
              {selectedDiagnoses.map((item) => {
                const diagnosis = DIAGNOSES.find((d) => d.id === item.diagnosisId)
                return (
                  <div
                    key={item.diagnosisId}
                    className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 animate-in fade-in duration-300"
                  >
                    {DIAGNOSIS_EMOJIS[item.diagnosisId] || "💊"} {diagnosis?.layLabel}
                    <button
                      onClick={() => toggleDiagnosis(item.diagnosisId)}
                      className="ml-1 hover:opacity-70 transition-opacity"
                      aria-label={`Remove ${diagnosis?.layLabel}`}
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {selectedIds.length > 0 && (
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-gradient-to-t from-purple-50 via-purple-50 to-transparent pb-4">
            <Button
              onClick={onNext}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-xl transition-all"
            >
              Continue
            </Button>
          </div>
        )}

        {selectedIds.length === 0 && (
          <p className="text-center text-sm text-red-600 pt-4">Pick at least one health condition to continue</p>
        )}
      </div>
    </div>
  )
}
