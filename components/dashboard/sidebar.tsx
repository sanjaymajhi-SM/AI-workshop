"use client"

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navigation = [
  { name: "Dashboard", href: "#", icon: LayoutDashboard },
  { name: "Products", href: "#products", icon: Package },
  { name: "Orders", href: "#orders", icon: ShoppingCart },
  { name: "Reports", href: "#reports", icon: BarChart3 },
  { name: "Settings", href: "#settings", icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/40 bg-sidebar/80 backdrop-blur-2xl transition-all duration-300 ease-out",
          collapsed ? "w-[72px]" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
          <Link href="#" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary/70 shadow-lg shadow-primary/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/40">
              <Package className="h-5 w-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-base font-bold tracking-tight truncate">
                  InvenTrack
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                  Dashboard
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Collapse toggle - Desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 z-50 hidden h-6 w-6 rounded-full border border-border bg-background shadow-md hover:bg-accent lg:flex transition-all duration-300 hover:scale-110"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>

        {/* Mobile close */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-4 h-8 w-8 rounded-lg lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
          <div className={cn("mb-4", collapsed ? "px-0" : "px-3")}>
            {!collapsed && (
              <span className="text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
                Menu
              </span>
            )}
          </div>
          {navigation.map((item) => {
            const isActive = activeItem === item.name
            const NavItem = (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {/* Active indicator line */}
                {isActive && !collapsed && (
                  <div className="absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary-foreground/30" />
                )}
                
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-all duration-200",
                  isActive 
                    ? "text-primary-foreground" 
                    : "group-hover:scale-110 group-hover:text-primary"
                )} />
                
                {!collapsed && (
                  <span className="truncate">{item.name}</span>
                )}
                
                {/* Hover glow effect */}
                {isActive && (
                  <div className="absolute inset-0 -z-10 rounded-xl bg-primary/20 blur-xl transition-opacity" />
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return NavItem
          })}
        </nav>

        {/* Pro upgrade card */}
        {!collapsed && (
          <div className="mx-3 mb-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-4 border border-primary/20">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Sparkles className="h-4 w-4" />
                  Upgrade to Pro
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Unlock advanced analytics and reports
                </p>
                <Button 
                  size="sm" 
                  className="mt-3 w-full rounded-lg h-8 text-xs font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-[1.02]"
                >
                  Upgrade Now
                </Button>
              </div>
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/30 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-primary/20 blur-xl" />
            </div>
          </div>
        )}

        {/* User section */}
        <div className="border-t border-border/40 p-3">
          <div className={cn(
            "flex items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-accent",
            collapsed && "justify-center"
          )}>
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-sm font-semibold text-primary-foreground ring-2 ring-primary/20">
                JD
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-sidebar" />
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            )}
          </div>
          
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mt-2 flex w-full items-center justify-center rounded-xl p-2.5 text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                Logout
              </TooltipContent>
            </Tooltip>
          ) : (
            <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}

export function MobileTrigger({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-xl lg:hidden hover:bg-accent transition-all duration-200 hover:scale-105"
      onClick={onClick}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span className="sr-only">Open sidebar</span>
    </Button>
  )
}
