"use client"

import { Package, ShoppingCart, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    description: "Order #1234 from John Doe",
    time: "2 min ago",
    icon: ShoppingCart,
    iconColor: "text-primary bg-primary/15",
  },
  {
    id: 2,
    type: "stock",
    title: "Low stock alert",
    description: "Smart Watch Pro is running low",
    time: "15 min ago",
    icon: AlertTriangle,
    iconColor: "text-warning bg-warning/15",
  },
  {
    id: 3,
    type: "product",
    title: "Product added",
    description: "New product: Wireless Earbuds",
    time: "1 hour ago",
    icon: Package,
    iconColor: "text-chart-2 bg-chart-2/15",
  },
  {
    id: 4,
    type: "complete",
    title: "Order completed",
    description: "Order #1230 has been delivered",
    time: "2 hours ago",
    icon: CheckCircle,
    iconColor: "text-success bg-success/15",
  },
  {
    id: 5,
    type: "pending",
    title: "Order pending",
    description: "Order #1228 awaiting payment",
    time: "3 hours ago",
    icon: Clock,
    iconColor: "text-muted-foreground bg-muted",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/20 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight">Recent Activity</h3>
        <p className="text-sm text-muted-foreground mt-1">Latest updates from your store</p>
      </div>
      
      <div className="space-y-1">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "group flex items-start gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-accent/50 cursor-pointer",
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                activity.iconColor
              )}
            >
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none mb-1">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <time className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
              {activity.time}
            </time>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200">
        View all activity
      </button>
    </div>
  )
}
