"use client"

import { useRef } from "react"
import html2canvas from "html2canvas"

interface ShareCardProps {
  totalCost: number
  topDrivers: Array<{
    diagnosisId: string
    layLabel: string
    total: number
    frequency: number
    stateUnitCost: number
  }>
  resultId: string
  onDownload?: () => void
}

export function ShareCard({ totalCost, topDrivers, resultId, onDownload }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const generateImage = async () => {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
      })

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `health-cost-${resultId}.png`
      link.click()

      onDownload?.()
    } catch (error) {
      console.error("Error generating share card:", error)
    }
  }

  return (
    <>
      {/* Hidden card for image generation */}
      <div
        ref={cardRef}
        className="hidden"
        style={{
          width: "1200px",
          height: "630px",
          padding: "40px",
          backgroundColor: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" }}
        >
          <div>
            <div style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>My 2025 Health Cost</div>
            <div style={{ fontSize: "56px", fontWeight: "bold", color: "#7c3aed" }}>₦{totalCost.toLocaleString()}</div>
          </div>
          <div style={{ fontSize: "48px" }}>💊</div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>
            Top Health Costs
          </div>
          {topDrivers.map((item, idx) => (
            <div
              key={item.diagnosisId}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}
            >
              <span style={{ color: "#333" }}>
                {idx + 1}. {item.layLabel}
              </span>
              <span style={{ fontWeight: "bold", color: "#333" }}>₦{item.total.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", color: "#666", fontSize: "14px", marginTop: "40px" }}>
          Calculate your health costs: healthcalc.app
        </div>
      </div>

      {/* Visible button to trigger download */}
      <button
        onClick={generateImage}
        style={{
          display: "none",
        }}
        id="generate-share-card"
      >
        Generate
      </button>
    </>
  )
}
