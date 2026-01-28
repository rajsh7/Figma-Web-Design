"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Package, List, ShoppingBag, Grid3X3 } from "lucide-react"
import type { WebsiteType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface WebsiteTypeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (type: WebsiteType) => void
}

const websiteTypes = [
  {
    id: "digital-products" as WebsiteType,
    icon: Package,
    title: "Digital Products",
    description: "Sell image, video, doc and more",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: "list-multiple" as WebsiteType,
    icon: List,
    title: "List Multiple Products",
    description: "Offer monthly or yearly access to exclusive content or services",
    color: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: "existing-products" as WebsiteType,
    icon: ShoppingBag,
    title: "Existing Products",
    description: "Sell clothing, accessories, and home goods",
    color: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    id: "others" as WebsiteType,
    icon: Grid3X3,
    title: "Others",
    description: "Sell image, video, doc and more",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
  },
]

export function WebsiteTypeModal({ open, onOpenChange, onSelect }: WebsiteTypeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            What kind of website you would like to make
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          {websiteTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-lg border p-6 text-center transition-all hover:border-foreground hover:shadow-sm"
              )}
            >
              <div className={cn("rounded-lg p-3", type.color)}>
                <type.icon className={cn("size-6", type.iconColor)} />
              </div>
              <div>
                <h3 className="font-medium text-sm">{type.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
