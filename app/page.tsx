"use client"

import { useState } from "react"
import { CalculatorProvider, useCalculator } from "@/components/calculator-context"
import { LandingScreen } from "@/components/landing-screen"
import { DiagnosisSelection } from "@/components/diagnosis-selection"
import { FrequencyScreen } from "@/components/frequency-screen"
import { StateInsuranceScreen } from "@/components/state-insurance-screen"
import { ResultsScreen } from "@/components/results-screen"
import { ErrorBoundary } from "@/components/error-boundary"
import { calculateHealthCost } from "@/lib/health-data"

type Screen = "landing" | "diagnosis" | "frequency" | "state-insurance" | "results"

function CalculatorContent() {
  const [screen, setScreen] = useState<Screen>("landing")
  const { selectedDiagnoses, state, monthlyIncome, setResult, reset } = useCalculator()

  const handleCalculate = () => {
    try {
      const validDiagnoses = selectedDiagnoses.filter((item) => item.frequency > 0)
      if (validDiagnoses.length === 0) {
        alert("Please select at least one condition with a frequency greater than 0")
        return
      }
      const result = calculateHealthCost(validDiagnoses, state, monthlyIncome)
      setResult(result)
      setScreen("results")
    } catch (error) {
      console.error("Calculation error:", error)
      // Error boundary will catch this
      throw error
    }
  }

  return (
    <>
      {screen === "landing" && <LandingScreen onStart={() => setScreen("diagnosis")} />}
      {screen === "diagnosis" && <DiagnosisSelection onNext={() => setScreen("frequency")} />}
      {screen === "frequency" && (
        <FrequencyScreen onNext={() => setScreen("state-insurance")} onBack={() => setScreen("diagnosis")} />
      )}
      {screen === "state-insurance" && (
        <StateInsuranceScreen onNext={handleCalculate} onBack={() => setScreen("frequency")} />
      )}
      {screen === "results" && (
        <ResultsScreen
          onBack={() => setScreen("state-insurance")}
          onReset={() => {
            reset()
            setScreen("landing")
          }}
        />
      )}
    </>
  )
}

export default function Home() {
  return (
    <ErrorBoundary>
      <CalculatorProvider>
        <CalculatorContent />
      </CalculatorProvider>
    </ErrorBoundary>
  )
}
