"use client"

import { useState } from "react"
import { MoreVertical, ArrowUpDown, FileDown, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Website } from "@/lib/types"
import Link from "next/link"

interface HistoryTableProps {
  websites: Website[]
  onDeleteWebsite: (id: string) => void
}

export function HistoryTable({ websites, onDeleteWebsite }: HistoryTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<keyof Website | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      case "Active":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      case "Pending":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100"
      case "Draft":
        return "bg-muted text-muted-foreground hover:bg-muted"
      default:
        return "bg-muted text-muted-foreground hover:bg-muted"
    }
  }

  // Filter websites by search query
  const filteredWebsites = websites.filter(website =>
    website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort websites
  const sortedWebsites = [...filteredWebsites].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (aValue === undefined || bValue === undefined) return 0

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (field: keyof Website) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleExport = () => {
    // Convert to CSV
    const headers = ["Title", "Slug", "Price", "Status", "Created", "Updated"]
    const rows = sortedWebsites.map(w => [
      w.title,
      w.slug,
      w.price,
      w.status,
      new Date(w.createdAt).toLocaleDateString(),
      new Date(w.updatedAt).toLocaleDateString()
    ])

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    // Download
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `websites-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Table Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold">History</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => handleSort('createdAt')}
          >
            <ArrowUpDown className="size-4" />
            Sort
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={handleExport}
            disabled={websites.length === 0}
          >
            <FileDown className="size-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search websites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      {/* Empty State */}
      {websites.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-2">No websites yet</p>
          <p className="text-sm text-muted-foreground">Click "Create Website" to get started</p>
        </div>
      ) : sortedWebsites.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No websites match your search</p>
        </div>
      ) : (
        <>
          {/* Mobile: Card list */}
          <div className="grid gap-3 sm:hidden">
            {sortedWebsites.map((website) => (
              <Card key={website.id} className="py-4">
                <CardHeader className="px-4 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <CardTitle className="text-base truncate">{website.title}</CardTitle>
                      <p className="text-xs text-muted-foreground truncate mt-1">{website.slug}</p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <Badge className={getStatusColor(website.status)} variant="secondary">
                        {website.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" aria-label="Actions">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/sites/${website.slug}`} target="_blank">
                              <ExternalLink className="size-4 mr-2" />
                              View Website
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDeleteWebsite(website.id)}
                          >
                            <Trash2 className="size-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-medium">{website.price || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="capitalize font-medium">{website.websiteType.replace("-", " ")}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="font-medium">{new Date(website.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-4 pt-3 border-t gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Link href={`/sites/${website.slug}`} target="_blank">
                      <ExternalLink className="size-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent text-destructive hover:text-destructive"
                    onClick={() => onDeleteWebsite(website.id)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Tablet/Desktop: Table */}
          <div className="hidden sm:block">
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('title')}
                    >
                      Website {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">Slug</TableHead>
                    <TableHead
                      className="hidden md:table-cell cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('price')}
                    >
                      Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('status')}
                    >
                      Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('createdAt')}
                    >
                      Created {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedWebsites.map((website) => (
                    <TableRow key={website.id}>
                      <TableCell className="font-medium max-w-[260px] truncate">{website.title}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm max-w-[220px] truncate">{website.slug}</TableCell>
                      <TableCell className="hidden md:table-cell">{website.price}</TableCell>
                      <TableCell className="hidden md:table-cell capitalize text-sm">{website.websiteType.replace('-', ' ')}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(website.status)} variant="secondary">
                          {website.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(website.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/sites/${website.slug}`} target="_blank">
                                <ExternalLink className="size-4 mr-2" />
                                View Website
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => onDeleteWebsite(website.id)}
                            >
                              <Trash2 className="size-4 mr-2" />
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
        </>
      )}
    </div>
  )
}
