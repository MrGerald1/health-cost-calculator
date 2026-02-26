export interface RespondentResponse {
  id: string
  timestamp: string
  diagnoses: Array<{
    diagnosisId: string
    label: string
    frequency: number
    cost: number
  }>
  totalCost: number
  totalVisits: number
  insurance: "yes" | "no"
  email: string
  percentOfAverageSpending: number
}

const STORAGE_KEY = "skydd_health_responses"

export const responseStorage = {
  // Save a single response
  saveResponse(data: Omit<RespondentResponse, "id" | "timestamp">): RespondentResponse {
    const response: RespondentResponse = {
      id: `resp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...data,
    }

    try {
      const responses = this.getAllResponses()
      responses.push(response)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(responses))
      return response
    } catch (error) {
      console.error("[v0] Error saving response:", error)
      throw error
    }
  },

  // Get all responses
  getAllResponses(): RespondentResponse[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("[v0] Error retrieving responses:", error)
      return []
    }
  },

  // Get response count
  getResponseCount(): number {
    return this.getAllResponses().length
  },

  // Get responses with email
  getEmailResponses(): RespondentResponse[] {
    return this.getAllResponses().filter((r) => r.email)
  },

  // Export all responses as JSON
  exportAsJSON(): string {
    const responses = this.getAllResponses()
    return JSON.stringify(responses, null, 2)
  },

  // Export as CSV
  exportAsCSV(): string {
    const responses = this.getAllResponses()
    if (responses.length === 0) return "No responses recorded"

    const headers = [
      "ID",
      "Timestamp",
      "Diagnoses",
      "Total Cost",
      "Total Visits",
      "Has Insurance",
      "Email",
      "% of Average Spending",
    ]

    const rows = responses.map((r) => [
      r.id,
      r.timestamp,
      r.diagnoses.map((d) => `${d.label}(${d.frequency}x)`).join("; "),
      `₦${r.totalCost.toLocaleString()}`,
      r.totalVisits,
      r.insurance === "yes" ? "Yes" : "No",
      r.email,
      `${Math.round((r.totalCost / 36000) * 100)}%`,
    ])

    return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
  },

  // Clear all responses (use with caution)
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY)
  },

  // Get summary statistics
  getSummary() {
    const responses = this.getAllResponses()
    if (responses.length === 0) {
      return {
        totalResponses: 0,
        averageSpending: 0,
        emailCount: 0,
        insuranceCount: 0,
        topConditions: [],
      }
    }

    const averageSpending = Math.round(responses.reduce((sum, r) => sum + r.totalCost, 0) / responses.length)
    const emailCount = responses.filter((r) => r.email).length
    const insuranceCount = responses.filter((r) => r.insurance === "yes").length

    // Count diagnoses
    const diagnosisCounts: Record<string, number> = {}
    responses.forEach((r) => {
      r.diagnoses.forEach((d) => {
        diagnosisCounts[d.label] = (diagnosisCounts[d.label] || 0) + 1
      })
    })

    const topConditions = Object.entries(diagnosisCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, count]) => ({ label, count }))

    return {
      totalResponses: responses.length,
      averageSpending,
      emailCount,
      insuranceCount,
      percentageWithInsurance: Math.round((insuranceCount / responses.length) * 100),
      topConditions,
    }
  },
}
