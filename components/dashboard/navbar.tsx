"use client"

import { Bell, Search, Moon, Sun, User, Command } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileTrigger } from "./sidebar"
import { Badge } from "@/components/ui/badge"

interface NavbarProps {
  onMobileMenuClick: () => void
}

export function Navbar({ onMobileMenuClick }: NavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <MobileTrigger onClick={onMobileMenuClick} />

      {/* Search */}
      <div className="relative hidden flex-1 md:block md:max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products, orders..."
          className="h-10 w-full rounded-xl border-border/50 bg-secondary/50 pl-10 pr-12 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all duration-200"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden items-center gap-1 rounded-md border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Mobile search */}
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl md:hidden hover:bg-accent">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl hover:bg-accent">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl border-border/50 p-0">
            <DropdownMenuLabel className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <span className="font-semibold">Notifications</span>
              <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium">
                3 new
              </Badge>
            </DropdownMenuLabel>
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3 cursor-pointer focus:bg-accent">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-warning" />
                  <span className="font-medium text-sm">Low stock alert</span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">
                  Wireless Headphones is running low
                </span>
                <span className="text-[10px] text-muted-foreground/70 pl-4">2 min ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3 cursor-pointer focus:bg-accent">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="font-medium text-sm">New order received</span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">
                  Order #1234 from John Doe
                </span>
                <span className="text-[10px] text-muted-foreground/70 pl-4">15 min ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3 cursor-pointer focus:bg-accent">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium text-sm">Payment confirmed</span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">
                  $2,500 payment received
                </span>
                <span className="text-[10px] text-muted-foreground/70 pl-4">1 hour ago</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="m-0" />
            <div className="p-2">
              <Button variant="ghost" className="w-full h-8 text-xs font-medium rounded-lg">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl hover:bg-accent"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-xl p-0 hover:bg-accent">
              <Avatar className="h-8 w-8 rounded-lg ring-2 ring-border/50">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/50">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer rounded-lg">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer rounded-lg text-destructive focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
