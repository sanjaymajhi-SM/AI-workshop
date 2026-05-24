"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Navbar } from "@/components/dashboard/navbar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { AnalyticsChart, CategoryChart } from "@/components/dashboard/analytics-chart"
import { InventoryTable } from "@/components/dashboard/inventory-table"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import ProductTable from "@/components/inventory/ProductTable"

export function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <div className="flex min-h-screen bg-background gradient-mesh">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <div className="flex flex-1 flex-col lg:pl-72">
        <Navbar onMobileMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          {/* DASHBOARD PAGE */}
          {activeItem === "Dashboard" && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                  Welcome back! Here&apos;s an overview of your inventory.
                </p>
              </div>
              <StatsCards />
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <AnalyticsChart />
                <CategoryChart />
              </div>
              <div className="mt-8 grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <InventoryTable />
                </div>
                <div>
                  <RecentActivity />
                </div>
              </div>
            </>
          )}

          {/* PRODUCTS PAGE */}
          {activeItem === "Products" && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Products</h1>
                <p className="mt-2 text-muted-foreground">
                  Manage your product inventory.
                </p>
              </div>
              <ProductTable />
            </>
          )}

          {/* ORDERS PAGE */}
          {activeItem === "Orders" && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Orders</h1>
              <p className="mt-2 text-muted-foreground">Manage your orders here.</p>
            </div>
          )}

          {/* REPORTS PAGE */}
          {activeItem === "Reports" && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Reports</h1>
              <p className="mt-2 text-muted-foreground">View your analytics and reports.</p>
            </div>
          )}

          {/* SETTINGS PAGE */}
          {activeItem === "Settings" && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Settings</h1>
              <p className="mt-2 text-muted-foreground">Manage your preferences.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}