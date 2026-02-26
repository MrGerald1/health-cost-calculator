"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { CalculationItem, CalculationResult } from "@/lib/health-data"

interface CalculatorContextType {
  selectedDiagnoses: CalculationItem[]
  state: string
  insurance: "yes" | "no"
  email: string
  result: CalculationResult | null
  setSelectedDiagnoses: (items: CalculationItem[]) => void
  setState: (state: string) => void
  setInsurance: (insurance: "yes" | "no") => void
  setEmail: (email: string) => void
  setResult: (result: CalculationResult | null) => void
  toggleDiagnosis: (diagnosisId: string) => void
  updateFrequency: (diagnosisId: string, frequency: number) => void
  updateCostOverride: (diagnosisId: string, cost: number | null) => void
  reset: () => void
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined)

export function CalculatorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<CalculationItem[]>([])
  const [state, setState] = useState("lagos")
  const [insurance, setInsurance] = useState<"yes" | "no">("no")
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)

  const toggleDiagnosis = (diagnosisId: string) => {
    setSelectedDiagnoses((prev) => {
      const exists = prev.find((item) => item.diagnosisId === diagnosisId)
      if (exists) {
        return prev.filter((item) => item.diagnosisId !== diagnosisId)
      } else {
        if (prev.length >= 12) return prev
        return [...prev, { diagnosisId, frequency: 1, costOverride: null }]
      }
    })
  }

  const updateFrequency = (diagnosisId: string, frequency: number) => {
    setSelectedDiagnoses((prev) =>
      prev.map((item) => (item.diagnosisId === diagnosisId ? { ...item, frequency } : item)),
    )
  }

  const updateCostOverride = (diagnosisId: string, cost: number | null) => {
    setSelectedDiagnoses((prev) =>
      prev.map((item) => (item.diagnosisId === diagnosisId ? { ...item, costOverride: cost } : item)),
    )
  }

  const reset = () => {
    setSelectedDiagnoses([])
    setState("lagos")
    setInsurance("no")
    setEmail("")
    setResult(null)
  }

  return (
    <CalculatorContext.Provider
      value={{
        selectedDiagnoses,
        state,
        insurance,
        email,
        result,
        setSelectedDiagnoses,
        setState,
        setInsurance,
        setEmail,
        setResult,
        toggleDiagnosis,
        updateFrequency,
        updateCostOverride,
        reset,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculator() {
  const context = useContext(CalculatorContext)
  if (!context) {
    throw new Error("useCalculator must be used within CalculatorProvider")
  }
  return context
}
