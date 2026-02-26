import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for analytics (in production, use a database)
const analyticsEvents: any[] = []

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()
    analyticsEvents.push({
      ...event,
      receivedAt: new Date().toISOString(),
    })

    // Keep only last 1000 events in memory
    if (analyticsEvents.length > 1000) {
      analyticsEvents.shift()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    totalEvents: analyticsEvents.length,
    recentEvents: analyticsEvents.slice(-10),
  })
}
