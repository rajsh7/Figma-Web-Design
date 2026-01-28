"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FormData } from "@/lib/types"

interface StepProductDetailsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function StepProductDetails({ formData, updateFormData, onNext, onBack }: StepProductDetailsProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Step Tabs */}
      <Tabs defaultValue="product-details" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none p-0 h-auto">
          <TabsTrigger
            value="digital-files"
            className="data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <Info className="size-4" />
              Digital Files | 1 media
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="product-details"
            className="data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3 text-sm"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger
            value="price-policy"
            className="data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3 text-sm"
          >
            Price/Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product-details" className="pt-6">
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="size-4 text-muted-foreground" />
                <Label>Title</Label>
              </div>
              <Select
                value={formData.productTitle}
                onValueChange={(value) => updateFormData({ productTitle: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-1">Product Title 1</SelectItem>
                  <SelectItem value="product-2">Product Title 2</SelectItem>
                  <SelectItem value="product-3">Product Title 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product descriptions */}
            <div className="space-y-2">
              <Label>Product descriptions</Label>
              <Input
                placeholder="Descriptions"
                value={formData.productDescription}
                onChange={(e) => updateFormData({ productDescription: e.target.value })}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="pt-4">
        <Button
          onClick={onNext}
          className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
