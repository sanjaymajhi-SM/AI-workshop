"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const products = [
  {
    id: "PRD001",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    stock: 145,
    status: "in-stock",
  },
  {
    id: "PRD002",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 299.99,
    stock: 12,
    status: "low-stock",
  },
  {
    id: "PRD003",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 380,
    status: "in-stock",
  },
  {
    id: "PRD004",
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 49.99,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "PRD005",
    name: "Stainless Steel Water Bottle",
    category: "Home",
    price: 24.99,
    stock: 567,
    status: "in-stock",
  },
  {
    id: "PRD006",
    name: "Running Shoes Elite",
    category: "Sports",
    price: 149.99,
    stock: 8,
    status: "low-stock",
  },
  {
    id: "PRD007",
    name: "Ceramic Coffee Mug Set",
    category: "Home",
    price: 34.99,
    stock: 210,
    status: "in-stock",
  },
  {
    id: "PRD008",
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 159.99,
    stock: 0,
    status: "out-of-stock",
  },
]

const statusStyles = {
  "in-stock": "bg-success/10 text-success border-success/20",
  "low-stock": "bg-warning/10 text-warning border-warning/20",
  "out-of-stock": "bg-destructive/10 text-destructive border-destructive/20",
}

const statusLabels = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
}

export function InventoryTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:border-primary/20">
      <div className="p-6 pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Product Inventory</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your products and track stock levels
            </p>
          </div>
          <Button className="w-full sm:w-auto rounded-xl h-10 px-4 gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      
      <div className="px-6">
        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-border/50 bg-secondary/50 pl-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-10 gap-2 rounded-xl border-border/50 hover:bg-accent hover:border-primary/30 transition-all duration-200">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-10 gap-2 rounded-xl border-border/50 hover:bg-accent hover:border-primary/30 transition-all duration-200">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50 bg-muted/30">
                <TableHead className="w-[100px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product</TableHead>
                <TableHead className="hidden md:table-cell text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</TableHead>
                <TableHead className="hidden sm:table-cell text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stock</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product, index) => (
                <TableRow
                  key={product.id}
                  className="group border-border/50 transition-all duration-200 hover:bg-accent/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {product.id}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right tabular-nums">
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium text-xs rounded-full px-2.5 py-0.5 transition-all duration-200",
                        statusStyles[product.status as keyof typeof statusStyles]
                      )}
                    >
                      {statusLabels[product.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-secondary"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/50">
                        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer">
                          <Eye className="h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer">
                          <Edit className="h-4 w-4" />
                          Edit product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer text-destructive focus:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{" "}
            <span className="font-semibold text-foreground">{products.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="h-9 rounded-xl border-border/50 gap-1">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-9 rounded-xl border-border/50 gap-1 hover:bg-accent hover:border-primary/30 transition-all duration-200">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
