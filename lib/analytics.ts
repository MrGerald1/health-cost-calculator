// Analytics utility for tracking user interactions and results
export interface AnalyticsEvent {
  eventName: string
  timestamp: string
  data?: Record<string, any>
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  trackEvent(eventName: string, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      timestamp: new Date().toISOString(),
      data: {
        sessionId: this.sessionId,
        ...data,
      },
    }

    this.events.push(event)

    // Send to analytics endpoint
    if (typeof window !== "undefined") {
      navigator.sendBeacon("/api/analytics", JSON.stringify(event))
    }
  }

  trackCalculation(totalCost: number, diagnosisCount: number, state: string) {
    this.trackEvent("calculation_completed", {
      totalCost,
      diagnosisCount,
      state,
    })
  }

  trackShare(platform: string, resultId: string) {
    this.trackEvent("result_shared", {
      platform,
      resultId,
    })
  }

  trackDownload(resultId: string) {
    this.trackEvent("share_card_downloaded", {
      resultId,
    })
  }

  getSessionId() {
    return this.sessionId
  }
}

export const analytics = new Analytics()
