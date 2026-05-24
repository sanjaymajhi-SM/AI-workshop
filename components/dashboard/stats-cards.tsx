"use client"

import { Package, TrendingUp, TrendingDown, DollarSign, ShoppingCart, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Products",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    description: "vs last month",
    gradient: "from-primary/20 via-primary/10 to-transparent",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    title: "Total Revenue",
    value: "$48,574",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
    gradient: "from-success/20 via-success/10 to-transparent",
    iconBg: "bg-success/15 text-success",
  },
  {
    title: "Active Orders",
    value: "384",
    change: "-2.4%",
    trend: "down",
    icon: ShoppingCart,
    description: "vs last month",
    gradient: "from-chart-2/20 via-chart-2/10 to-transparent",
    iconBg: "bg-chart-2/15 text-chart-2",
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "+5",
    trend: "down",
    icon: AlertTriangle,
    description: "need attention",
    gradient: "from-warning/20 via-warning/10 to-transparent",
    iconBg: "bg-warning/15 text-warning",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient background */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            stat.gradient
          )} />
          
          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground tracking-wide">
                {stat.title}
              </p>
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                stat.iconBg
              )}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                <div className="mt-2 flex items-center gap-1.5 text-sm">
                  <span
                    className={cn(
                      "flex items-center gap-1 font-semibold rounded-full px-2 py-0.5",
                      stat.trend === "up" && stat.title !== "Low Stock Items"
                        ? "text-success bg-success/10"
                        : "text-destructive bg-destructive/10"
                    )}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  )
}
