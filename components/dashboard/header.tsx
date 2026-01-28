"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useWebsites } from "@/contexts/website-context"

interface HeaderProps {
  onCreateWebsite: () => void
}

export function Header({ onCreateWebsite }: HeaderProps) {
  const { websites } = useWebsites()
  const [activeTab, setActiveTab] = useState("published")

  // Calculate counts
  const publishedCount = websites.filter(w => w.published && w.status === 'Published').length
  const unpublishedCount = websites.filter(w => !w.published || w.status !== 'Published').length
  const draftsCount = websites.filter(w => w.status === 'Draft').length

  return (
    <div className="relative">
      {/* Hero Banner */}
      <div
        className="h-36 sm:h-44 md:h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-background">Website</h1>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-background border-b px-4 sm:px-6 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 min-w-0">
            {/* Mobile: control menu */}
            <div className="w-full sm:hidden">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter websites" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">
                    Published ({publishedCount})
                  </SelectItem>
                  <SelectItem value="unpublished">
                    Unpublished ({unpublishedCount})
                  </SelectItem>
                  <SelectItem value="drafts">
                    Drafts ({draftsCount})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop: tab list */}
            <div className="hidden sm:block">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent gap-1 p-0">
                  <TabsTrigger
                    value="published"
                    className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-1.5 text-sm"
                  >
                    Published ({publishedCount})
                  </TabsTrigger>
                  <TabsTrigger
                    value="unpublished"
                    className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-1.5 text-sm"
                  >
                    Unpublished ({unpublishedCount})
                  </TabsTrigger>
                  <TabsTrigger
                    value="drafts"
                    className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-1.5 text-sm"
                  >
                    Drafts ({draftsCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:justify-end">
            <Button
              onClick={onCreateWebsite}
              className="w-full sm:w-auto rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Plus className="size-4 mr-1" />
              Create Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
