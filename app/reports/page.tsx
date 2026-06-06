"use client"

import { useEffect, useState } from "react"

export default function ReportsPage() {
  const [report, setReport] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8000/reports/sales")
        const data = await res.json()
        setReport(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Sales Report</h1>
      {loading ? (
        <p>Loading...</p>
      ) : report ? (
        <div className="space-y-2">
          <div>Total Orders: {report.total_orders}</div>
          <div>Total Sales: ${report.total_sales}</div>
          <div>Total Items: {report.total_items}</div>
        </div>
      ) : (
        <p>No report data</p>
      )}
    </div>
  )
}
