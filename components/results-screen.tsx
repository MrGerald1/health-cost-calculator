"use client"

import { Button } from "@/components/ui/button"
import { useCalculator } from "./calculator-context"
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { analytics } from "@/lib/analytics"
import { DIAGNOSIS_EMOJIS, NIGERIAN_MINIMUM_WAGE, AVERAGE_NIGERIAN_SPENDING, DIAGNOSES } from "@/lib/health-data"
import { LoadingScreen } from "./loading-screen"
import SocialShareButtons from "./social-share-buttons"
import { responseStorage } from "@/lib/response-storage"
import html2canvas from "html2canvas"

interface ResultsScreenProps {
  onBack: () => void
  onReset: () => void
}

const DIAGNOSIS_QUOTES: Record<string, string> = {
  CHECKUP: "Prevention is better than cure — you understood the assignment",
  FEVER: "Catching it early. That's the move",
  MAL: "Knowledge is power. Now you know the real cost",
  COUGH: "Sometimes the littlest things cost the most",
  TYPHOID: "Getting ahead of it. That's how it's done",
  ULCER: "Taking care of yourself. Non-negotiable",
  PREG: "The investment that keeps paying dividends",
  PAIN: "Listen to your body. It was worth the cost",
}

export function ResultsScreen({ onBack, onReset }: ResultsScreenProps) {
  const { result, insurance, email } = useCalculator()
  const [isLoading, setIsLoading] = useState(true)
  const [currentCard, setCurrentCard] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [expandedDiagnosis, setExpandedDiagnosis] = useState<string | null>(null) // Moved to top level
  const finalCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (result) {
      analytics.trackCalculation(result.totalAnnual, result.items.length, "")
      
      // Save respondent response to localStorage
      const validItems = result.items.filter((item) => item.frequency > 0)
      const totalVisits = validItems.reduce((sum, item) => sum + item.frequency, 0)
      const percentOfAverageSpending = Math.round((result.totalAnnual / AVERAGE_NIGERIAN_SPENDING) * 100)
      
      try {
        responseStorage.saveResponse({
          diagnoses: validItems.map((item) => ({
            diagnosisId: item.diagnosisId,
            label: item.layLabel,
            frequency: item.frequency,
            cost: item.total,
          })),
          totalCost: result.totalAnnual,
          totalVisits,
          insurance,
          email,
          percentOfAverageSpending,
        })
      } catch (error) {
        console.error("[v0] Failed to save response:", error)
      }
      
      const timer = setTimeout(() => setIsLoading(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [result, insurance, email])

  if (isLoading && result) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">No results available</p>
      </div>
    )
  }

  const validItems = result.items.filter((item) => item.frequency > 0)
  const topDrivers = validItems.sort((a, b) => b.total - a.total).slice(0, 3)
  const topCondition = topDrivers[0]
  const totalVisits = validItems.reduce((sum, item) => sum + item.frequency, 0)

  const percentOfMinimumWage = Math.round((result.totalAnnual / NIGERIAN_MINIMUM_WAGE) * 100)
  const comparisonDifference = result.totalAnnual - AVERAGE_NIGERIAN_SPENDING
  const comparisonPercentage = Math.abs(Math.round((comparisonDifference / AVERAGE_NIGERIAN_SPENDING) * 100))
  const isAboveAverage = result.totalAnnual > AVERAGE_NIGERIAN_SPENDING

  const buildCards = () => {
    const cards: any[] = [
      { type: "intro", title: "Your Health Journey" },
      { type: "bigReveal", title: "Your Health Cost" },
      { type: "topCondition", title: "Most Frequent" },
      { type: "breakdown", title: "Cost Breakdown" },
      { type: "comparison", title: "How You Compare" },
    ]

    if (insurance === "no") {
      cards.push({ type: "upsell", title: "Coverage Matters" })
    }

    cards.push({ type: "final", title: "That's Your Story" })

    return cards
  }

  const cards = buildCards()
  const currentCardData = cards[currentCard]

  const shareText = (() => {
    const diagnosisList = validItems.map((item) => `${item.layLabel} (₦${item.total.toLocaleString()})`).join(", ")

    return `I spent ₦${result.totalAnnual.toLocaleString()} on healthcare. My main costs: ${diagnosisList}. Calculate yours at skydd.ng/health-recap`
  })()

  const captureAndShareCard = async (platform: string) => {
    if (!finalCardRef.current) return

    try {
      const canvas = await html2canvas(finalCardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: true,
      })

      const imageData = canvas.toDataURL("image/png")

      if (platform === "whatsapp") {
        const text = encodeURIComponent(shareText)
        window.open(`https://wa.me/?text=${text}`, "_blank")
        analytics.trackShare("whatsapp", result.id)
      } else if (platform === "twitter") {
        const text = encodeURIComponent(shareText)
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
        analytics.trackShare("twitter", result.id)
      } else if (platform === "copy") {
        navigator.clipboard.writeText(shareText)
        analytics.trackShare("copy", result.id)
      }

      setShowShareMenu(false)
    } catch (error) {
      console.error("Error capturing card:", error)
    }
  }

  const handleShare = (platform: string) => {
    if (platform === "native" && navigator.share) {
      navigator
        .share({
          title: "My Health Cost Recap",
          text: shareText,
          url: window.location.href,
        })
        .catch((err) => console.log("Share cancelled"))
      analytics.trackShare("native", result.id)
      setShowShareMenu(false)
      return
    }

    if (currentCard === cards.length - 1) {
      // On final card, capture image
      captureAndShareCard(platform)
    } else {
      // On other cards, use text share
      if (platform === "whatsapp") {
        const text = encodeURIComponent(shareText)
        window.open(`https://wa.me/?text=${text}`, "_blank")
        analytics.trackShare("whatsapp", result.id)
      } else if (platform === "twitter") {
        const text = encodeURIComponent(shareText)
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
        analytics.trackShare("twitter", result.id)
      } else if (platform === "copy") {
        navigator.clipboard.writeText(shareText)
        analytics.trackShare("copy", result.id)
      }
      setShowShareMenu(false)
    }
  }

  const getCardBackground = (type: string) => {
    const backgrounds: Record<string, string> = {
      intro: "bg-gradient-to-br from-blue-100 to-cyan-100",
      bigReveal: "bg-gradient-to-br from-orange-100 to-pink-100",
      topCondition: "bg-gradient-to-br from-amber-100 to-yellow-100",
      breakdown: "bg-gradient-to-br from-green-100 to-cyan-100",
      comparison: "bg-gradient-to-br from-indigo-100 to-blue-100",
      upsell: "bg-gradient-to-br from-rose-100 to-orange-100",
      final: "bg-gradient-to-br from-slate-100 to-gray-100",
    }
    return backgrounds[type] || "bg-gradient-to-br from-blue-100 to-purple-100"
  }

  const renderCard = () => {
    const cardType = currentCardData.type

    if (cardType === "intro") {
      return (
        <div className="space-y-4 md:space-y-6 h-full flex flex-col justify-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#00473E] leading-tight">Your Health, Unwrapped🤭.</h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-700 font-medium">Let's dive in.
          
          </p>
        </div>
      )
    }

    if (cardType === "bigReveal") {
      return (
        <div className="space-y-4 sm:space-y-6 md:space-y-8 h-full flex flex-col justify-center text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">Your total healthcare spend</p>
          <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-[#de633e] leading-tight break-words">
            ₦{result.totalAnnual.toLocaleString()}
          </h1>
          <div className="space-y-1">
            <p className="text-base sm:text-lg md:text-2xl font-semibold text-[#00473E]">
              {totalVisits} {totalVisits === 1 ? "visit" : "visits"}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">across {validItems.length} condition{validItems.length === 1 ? "" : "s"}</p>
          </div>
        </div>
      )
    }

    if (cardType === "topCondition") {
      const emoji = DIAGNOSIS_EMOJIS[topCondition?.diagnosisId || ""] || "💊"
      const quote = DIAGNOSIS_QUOTES[topCondition?.diagnosisId || ""] || "Taking care of yourself. That matters."
      return (
        <div className="space-y-4 sm:space-y-6 md:space-y-8 h-full flex flex-col justify-center text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">Most common condition</p>
          <div className="space-y-2 md:space-y-4">
            <p className="text-5xl sm:text-6xl">{emoji}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">{topCondition?.layLabel}</h2>
            <p className="text-4xl sm:text-5xl md:text-5xl font-black text-[#de633e]">{topCondition?.frequency}x</p>
          </div>
          <p className="text-gray-700 italic text-sm sm:text-base md:text-lg font-medium max-w-sm mx-auto">"{quote}"</p>
        </div>
      )
    }

    if (cardType === "breakdown") {
      return (
        <div className="space-y-4 md:space-y-6 h-full flex flex-col justify-between">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium text-center">Your costs by condition</p>
          <div className="space-y-2 md:space-y-3 flex-1">
            {validItems.sort((a, b) => b.total - a.total).map((item, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/40 flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{item.layLabel}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.frequency} {item.frequency === 1 ? "visit" : "visits"}</p>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-black text-[#de633e] whitespace-nowrap">₦{item.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (cardType === "comparison") {
      return (
        <div className="space-y-4 sm:space-y-6 md:space-y-8 h-full flex flex-col justify-center text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">How you compare</p>
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#de633e]">{comparisonPercentage}%</h2>
            <p className="text-2xl sm:text-3xl font-black text-[#00473E] mt-2">{isAboveAverage ? "ABOVE" : "BELOW"} AVERAGE</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/40">
              <p className="text-xs sm:text-sm text-gray-700 font-medium">You</p>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mt-1 break-words">₦{result.totalAnnual.toLocaleString()}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/40">
              <p className="text-xs sm:text-sm text-gray-700 font-medium">Average</p>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mt-1 break-words">₦{AVERAGE_NIGERIAN_SPENDING.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )
    }

    if (cardType === "upsell") {
      return (
        <div className="space-y-8 h-full flex flex-col justify-center text-center">
          <p className="text-lg text-gray-700 font-medium">You don't have coverage</p>
          <h2 className="text-5xl font-black text-[#de633e]">That's risky.</h2>
          <div className="space-y-4">
            <p className="text-gray-700 text-lg font-medium">
              With proper insurance, you could reduce these costs by up to 80%.
            </p>
            <p className="text-4xl font-black text-[#00473E]">
              ₦{Math.round(result.totalAnnual * 0.8).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Potential annual savings with coverage</p>
          </div>
          <Button className="bg-[#de633e] text-white hover:bg-[#c85530] h-12 rounded-2xl transition-all font-semibold mt-6 w-full">
            Check Our Plans
          </Button>
        </div>
      )
    }

    if (cardType === "final") {
      const selectedItem = validItems.find((d) => d.diagnosisId === expandedDiagnosis)
      const diagnosis = selectedItem ? DIAGNOSES.find((d) => d.id === selectedItem.diagnosisId) : null
      const isExpanded = expandedDiagnosis !== null

      return (
        <div ref={finalCardRef} className="space-y-6 md:space-y-8 h-full flex flex-col justify-between py-6 md:py-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-black text-[#00473E]">That's your health recap</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {validItems.map((item, idx) => {
              const emoji = DIAGNOSIS_EMOJIS[item.diagnosisId || ""] || "💊"
              const costPerVisit = Math.round(item.total / item.frequency)
              const itemDiagnosis = DIAGNOSES.find((d) => d.id === item.diagnosisId)
              const procedures = itemDiagnosis?.procedures || []

              return (
                <div key={idx} className="flex flex-col">
                  <button
                    onClick={() =>
                      setExpandedDiagnosis(
                        isExpanded && expandedDiagnosis === item.diagnosisId ? null : item.diagnosisId,
                      )
                    }
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/40 hover:bg-white/80 transition-all text-left flex flex-col text-xs md:text-sm"
                  >
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <p className="text-2xl md:text-3xl">{emoji}</p>
                    </div>
                    <p className="text-xs font-semibold text-gray-900 mb-2 md:mb-3 leading-tight line-clamp-2">
                      {item.layLabel}
                    </p>

                    {/* Calculation breakdown */}
                    <div className="space-y-1 md:space-y-2 mb-2 md:mb-3 text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Visits:</span>
                        <span className="font-black text-[#de633e]">{item.frequency}x</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Avg/visit:</span>
                        <span className="font-black text-gray-900">₦{costPerVisit.toLocaleString()}</span>
                      </div>
                      <div className="h-px bg-gray-200 my-1 md:my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-900">Total:</span>
                        <span className="font-black text-[#de633e] text-sm md:text-lg">
                          ₦{item.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Expand indicator */}
                    {procedures.length > 0 && (
                      <p className="text-xs text-[#de633e] font-semibold mt-2">
                        {isExpanded && expandedDiagnosis === item.diagnosisId ? "Hide" : "Show"} {procedures.length}{" "}
                        procedures
                      </p>
                    )}
                  </button>

                  {isExpanded && expandedDiagnosis === item.diagnosisId && procedures.length > 0 && (
                    <div className="mt-2 bg-white/40 backdrop-blur-sm rounded-2xl p-2 md:p-3 border border-white/40 space-y-1 md:space-y-2">
                      {procedures.map((proc, procIdx) => (
                        <div key={procIdx} className="flex justify-between items-start text-xs gap-1">
                          <span className="text-gray-700 font-medium flex-1 leading-tight">{proc.name}</span>
                          <span className="text-[#de633e] font-black whitespace-nowrap">
                            ₦{proc.cost.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-center space-y-2 border-t border-gray-200 pt-3 md:pt-6">
            <p className="text-xs md:text-sm text-gray-600 font-medium">Total spent</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#de633e] leading-tight break-words">
              ₦{result.totalAnnual.toLocaleString()}
            </h1>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4 md:pt-6 mt-4 flex-wrap gap-2">
            <img src="/skydd-logo.png" alt="Skydd" className="h-6 md:h-8" />
            <a
              href="https://skydd.ng/health-recap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#de633e] font-semibold text-xs md:text-sm hover:underline"
            >
              skydd.ng/health-recap
            </a>
          </div>
        </div>
      )
    }
  }

  return (
    <div
      className={`min-h-screen ${getCardBackground(currentCardData.type)} flex flex-col items-center justify-center px-4 py-8 transition-all duration-500`}
    >
      <div className="w-full max-w-2xl">
        {/* Main card */}
        <div className="bg-white/75 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 min-h-96 flex flex-col justify-center shadow-2xl transition-all duration-500 ease-out transform border border-white/40">
          {renderCard()}
        </div>

        {/* Navigation and controls */}
        <div className="mt-8 space-y-6">
          {/* Card counter and navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
              disabled={currentCard === 0}
              className="p-3 rounded-full bg-[#de633e] text-white hover:bg-[#c85530] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-xl shadow-lg border border-[#de633e]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="text-center">
              <p className="text-[#de633e] font-bold drop-shadow-md bg-white/60 px-4 py-2 rounded-full">
                {currentCard + 1} of {cards.length}
              </p>
              <div className="flex gap-2 justify-center mt-2">
                {cards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCard(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentCard ? "bg-[#de633e] w-8 shadow-lg" : "bg-gray-300 w-2"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentCard(Math.min(cards.length - 1, currentCard + 1))}
              disabled={currentCard === cards.length - 1}
              className="p-3 rounded-full bg-[#de633e] text-white hover:bg-[#c85530] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-xl shadow-lg border border-[#de633e]"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Share button */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full bg-[#de633e] text-white hover:bg-[#c85530] py-3 rounded-2xl transition-all font-semibold flex items-center justify-center gap-2 shadow-lg border border-[#de633e]"
            >
              <Share2 className="w-4 h-4" />
              Share This Card
            </button>

            {showShareMenu && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 space-y-2 z-10 shadow-lg border border-gray-200">
                {navigator.share && (
                  <button
                    onClick={() => handleShare("native")}
                    className="w-full h-10 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium text-sm transition-all"
                  >
                    📱 Share to Apps
                  </button>
                )}
                <SocialShareButtons
                  resultId={result.id}
                  totalCost={result.totalAnnual}
                  shareText={shareText}
                  onClose={() => setShowShareMenu(false)}
                />
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              onClick={onBack}
              className="bg-white text-[#de633e] hover:bg-gray-50 h-12 rounded-2xl transition-all font-semibold border-2 border-[#de633e]"
            >
              Back
            </Button>
            <Button
              onClick={onReset}
              className="bg-[#de633e] text-white hover:bg-[#c85530] h-12 rounded-2xl transition-all font-semibold shadow-lg"
            >
              Calculate Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
