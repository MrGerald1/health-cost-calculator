"use client"

import { useEffect, useRef } from "react"

interface HealthSignatureProps {
  totalDiagnoses: number
  totalVisits: number
  topExpenseIndex: number
  size?: number
  opacity?: number
  animated?: boolean
}

export function HealthSignature({
  totalDiagnoses,
  totalVisits,
  topExpenseIndex,
  size = 200,
  opacity = 1,
  animated = true,
}: HealthSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const baseRadius = Math.min(canvas.width, canvas.height) / 3

    // Generate deterministic but unique blob based on user data
    const seed = totalDiagnoses * 1000 + totalVisits * 100 + topExpenseIndex
    const random = (index: number) => {
      const x = Math.sin(seed + index) * 10000
      return x - Math.floor(x)
    }

    // Draw animated blob
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = opacity

      // Number of nodes based on totalDiagnoses
      const nodes = Math.max(5, Math.min(12, totalDiagnoses))
      const points: [number, number][] = []

      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2
        // Spikiness based on totalVisits
        const spikiness = 0.3 + (totalVisits / 10) * 0.4
        const radius = baseRadius * (0.7 + random(i) * spikiness)

        // Add animation if enabled
        const animatedRadius = animated ? radius + Math.sin(time * 0.001 + i) * (baseRadius * 0.1) : radius

        const x = centerX + Math.cos(angle) * animatedRadius
        const y = centerY + Math.sin(angle) * animatedRadius
        points.push([x, y])
      }

      // Draw blob with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#00473E")
      gradient.addColorStop(0.5, "#E97132")
      gradient.addColorStop(1, "#00473E")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(points[0][0], points[0][1])

      for (let i = 1; i < points.length; i++) {
        const xc = (points[i][0] + points[(i + 1) % points.length][0]) / 2
        const yc = (points[i][1] + points[(i + 1) % points.length][1]) / 2
        ctx.quadraticCurveTo(points[i][0], points[i][1], xc, yc)
      }
      ctx.closePath()
      ctx.fill()

      if (animated) {
        requestAnimationFrame(draw)
      }
    }

    canvas.width = size
    canvas.height = size
    draw(0)
  }, [totalDiagnoses, totalVisits, topExpenseIndex, size, opacity, animated])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
