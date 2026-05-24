"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 18600, orders: 240 },
  { month: "Feb", revenue: 22400, orders: 280 },
  { month: "Mar", revenue: 19800, orders: 250 },
  { month: "Apr", revenue: 28400, orders: 320 },
  { month: "May", revenue: 32100, orders: 380 },
  { month: "Jun", revenue: 35800, orders: 420 },
  { month: "Jul", revenue: 38200, orders: 450 },
  { month: "Aug", revenue: 42500, orders: 480 },
  { month: "Sep", revenue: 39800, orders: 440 },
  { month: "Oct", revenue: 45200, orders: 520 },
  { month: "Nov", revenue: 48500, orders: 560 },
  { month: "Dec", revenue: 52100, orders: 620 },
]

const categoryData = [
  { category: "Electronics", sales: 4200 },
  { category: "Clothing", sales: 3800 },
  { category: "Home", sales: 2900 },
  { category: "Sports", sales: 2100 },
  { category: "Beauty", sales: 1800 },
  { category: "Books", sales: 1200 },
]

export function AnalyticsChart() {
  return (
    <div className="col-span-full lg:col-span-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/20">
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight">Analytics Overview</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Revenue and order trends over the past 12 months
        </p>
      </div>
      
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="inline-flex h-10 items-center justify-center rounded-xl bg-muted/50 p-1 text-muted-foreground">
          <TabsTrigger 
            value="revenue" 
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Orders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4 mt-0">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                  dy={10}
                />
                <YAxis
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  className="text-muted-foreground"
                  dx={-10}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-border/50 bg-popover/95 backdrop-blur-xl px-4 py-3 shadow-xl">
                          <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
                          <p className="text-lg font-bold text-foreground">
                            ${payload[0].value?.toLocaleString()}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.65 0.18 250)"
                  strokeWidth={2.5}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4 mt-0">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                  dy={10}
                />
                <YAxis
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                  dx={-10}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-border/50 bg-popover/95 backdrop-blur-xl px-4 py-3 shadow-xl">
                          <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
                          <p className="text-lg font-bold text-foreground">
                            {payload[0].value} orders
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="oklch(0.65 0.18 250)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function CategoryChart() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/20">
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight">Sales by Category</h3>
        <p className="text-sm text-muted-foreground mt-1">Top performing product categories</p>
      </div>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis
              dataKey="category"
              type="category"
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={80}
              className="text-muted-foreground"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-border/50 bg-popover/95 backdrop-blur-xl px-4 py-3 shadow-xl">
                      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
                      <p className="text-lg font-bold text-foreground">
                        {payload[0].value?.toLocaleString()} units
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="sales"
              fill="oklch(0.6 0.15 200)"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
