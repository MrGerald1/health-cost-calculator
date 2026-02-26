"use client"

import { Share2, MessageCircle, Mail, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { analytics } from "@/lib/analytics"
import { useState } from "react"

interface SocialShareButtonsProps {
  resultId: string
  totalCost: number
  shareText: string
  onClose?: () => void
}

export function SocialShareButtons({ resultId, totalCost, shareText, onClose }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = (platform: string, url?: string) => {
    console.log("[v0] Share triggered:", platform)
    analytics.trackShare(platform, resultId)

    if (url) {
      try {
        window.open(url, "_blank")
      } catch (error) {
        console.error("[v0] Error opening share URL:", error)
      }
    }

    // Close menu after sharing
    setTimeout(() => {
      onClose?.()
    }, 100)
  }

  const handleCopyText = async () => {
    try {
      console.log("[v0] Copying text to clipboard")
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      analytics.trackShare("copy_text", resultId)
      console.log("[v0] Text copied successfully")

      // Reset copied state and close menu
      setTimeout(() => {
        setCopied(false)
        onClose?.()
      }, 1500)
    } catch (error) {
      console.error("[v0] Error copying to clipboard:", error)
    }
  }

  const encodedText = encodeURIComponent(shareText)
  const whatsappUrl = `https://wa.me/?text=${encodedText}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
  const emailSubject = encodeURIComponent("Check out my health cost calculation")
  const emailBody = encodeURIComponent(shareText)
  const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-900">Share your results</p>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleShare("whatsapp", whatsappUrl)}
          className="h-11 rounded-lg flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">WhatsApp</span>
        </Button>

        <Button
          onClick={() => handleShare("twitter", twitterUrl)}
          className="h-11 rounded-lg flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-medium transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm">X/Twitter</span>
        </Button>

        <Button
          onClick={() => handleShare("email", emailUrl)}
          className="h-11 rounded-lg flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium transition-all"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">Email</span>
        </Button>

        <Button
          onClick={handleCopyText}
          className="h-11 rounded-lg flex items-center justify-center gap-2 bg-[#de633e] hover:bg-[#c85530] text-white font-medium transition-all"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
    </div>
  )
}

export default SocialShareButtons
