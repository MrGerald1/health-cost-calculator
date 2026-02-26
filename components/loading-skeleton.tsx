"use client"

export function DiagnosisGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl border-2 border-border bg-card animate-pulse space-y-2">
          <div className="h-8 bg-muted rounded w-8 mx-auto" />
          <div className="h-4 bg-muted rounded" />
        </div>
      ))}
    </div>
  )
}

export function FrequencyItemSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-muted rounded w-32" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
        <div className="h-10 bg-muted rounded w-24" />
      </div>
    </div>
  )
}

export function ResultsCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-32" />
        <div className="h-12 bg-muted rounded w-48" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 space-y-2">
            <div className="h-3 bg-muted rounded w-20" />
            <div className="h-8 bg-muted rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
