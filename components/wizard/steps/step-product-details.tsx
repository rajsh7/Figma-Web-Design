"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label>Title</Label>
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
