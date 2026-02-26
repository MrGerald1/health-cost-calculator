"use client"

import { useEffect, useState } from "react"
import { responseStorage, type RespondentResponse } from "@/lib/response-storage"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [responses, setResponses] = useState<RespondentResponse[]>([])
  const [summary, setSummary] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = () => {
    const allResponses = responseStorage.getAllResponses()
    setResponses(allResponses)
    setSummary(responseStorage.getSummary())
  }

  const downloadJSON = () => {
    const data = responseStorage.exportAsJSON()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `health-responses-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadCSV = () => {
    const data = responseStorage.exportAsCSV()
    const blob = new Blob([data], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `health-responses-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to delete all responses? This cannot be undone.")) {
      responseStorage.clearAll()
      loadData()
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Health Recap Admin</h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium">Total Responses</p>
            <p className="text-3xl font-bold text-[#de633e] mt-2">{summary?.totalResponses || 0}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium">Avg. Spending</p>
            <p className="text-3xl font-bold text-[#00473E] mt-2">₦{summary?.averageSpending?.toLocaleString() || 0}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium">Email Responses</p>
            <p className="text-3xl font-bold text-[#de633e] mt-2">{summary?.emailCount || 0}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium">With Insurance</p>
            <p className="text-3xl font-bold text-[#00473E] mt-2">
              {summary?.insuranceCount || 0} ({summary?.percentageWithInsurance || 0}%)
            </p>
          </div>
        </div>

        {/* Top Conditions */}
        {summary?.topConditions && summary.topConditions.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Conditions</h2>
            <div className="space-y-2">
              {summary.topConditions.map((condition: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">{condition.label}</span>
                  <span className="text-[#de633e] font-bold">{condition.count} mentions</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={downloadJSON}
            className="bg-[#00473E] hover:bg-[#003a30] text-white px-6"
          >
            Download JSON
          </Button>
          <Button
            onClick={downloadCSV}
            className="bg-[#de633e] hover:bg-[#c85530] text-white px-6"
          >
            Download CSV
          </Button>
          <Button
            onClick={clearAllData}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 px-6"
          >
            Clear All Data
          </Button>
        </div>

        {/* Responses Table */}
        {responses.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">ID</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Timestamp</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Total Cost</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Visits</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Insurance</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Conditions</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => (
                  <tr key={response.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-mono text-xs text-gray-600">{response.id.substring(0, 12)}...</td>
                    <td className="px-6 py-3 text-gray-600">{new Date(response.timestamp).toLocaleDateString()}</td>
                    <td className="px-6 py-3 font-semibold text-[#de633e]">₦{response.totalCost.toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-900">{response.totalVisits}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          response.insurance === "yes"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {response.insurance === "yes" ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{response.email || "-"}</td>
                    <td className="px-6 py-3 text-gray-600 max-w-xs truncate">
                      {response.diagnoses.map((d) => d.label).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center shadow">
            <p className="text-gray-600 text-lg">No responses recorded yet</p>
          </div>
        )}
      </div>
    </main>
  )
}
