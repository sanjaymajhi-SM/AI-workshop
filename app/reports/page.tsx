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
    <div className="py-6 px-6">
      <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
      {loading ? (
        <p>Loading...</p>
      ) : report ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-semibold">{report.total_orders}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="text-2xl font-semibold">${report.total_sales}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-semibold">{report.total_items}</p>
          </div>
        </div>
      ) : (
        <p>No report data</p>
      )}
    </div>
  )
}
