"use client"

import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/lib/types"

interface StepUploadFilesProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function StepUploadFiles({ formData, updateFormData, onNext }: StepUploadFilesProps) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Upload Your Digital Files</h2>

      {/* File Link */}
      <div className="flex items-center gap-2">
        <Input placeholder="Add file link" className="flex-1" />
        <Button variant="outline" size="sm">Add Link</Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">Or</div>

      {/* Upload Area */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          id="digitalFile"
          className="hidden"
          accept="*/*"
        />
        <label htmlFor="digitalFile" className="cursor-pointer">
          <Upload className="size-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Upload Image</p>
          <p className="text-xs text-muted-foreground mt-1">
            Recommending 1200px x 1200 or up to 10 mb
          </p>
        </label>
      </div>

      {/* Pricing Section */}
      <div className="space-y-4 pt-4">
        <h3 className="font-semibold">Pricing</h3>
        
        {/* Fixed Price */}
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h4 className="font-medium">Fixed Price</h4>
            <p className="text-sm text-muted-foreground">Charge A One Time Fixed Pay</p>
          </div>
          <RadioGroup
            value={formData.pricingType}
            onValueChange={(value: "fixed" | "customer-decides" | "free") =>
              updateFormData({ pricingType: value })
            }
          >
            <RadioGroupItem value="fixed" />
          </RadioGroup>
        </div>

        {/* Customers decide the Price */}
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h4 className="font-medium">Customers decide the Price</h4>
            <p className="text-sm text-muted-foreground">Charge A One Time Fixed Pay</p>
          </div>
          <RadioGroup
            value={formData.pricingType}
            onValueChange={(value: "fixed" | "customer-decides" | "free") =>
              updateFormData({ pricingType: value })
            }
          >
            <RadioGroupItem value="customer-decides" />
          </RadioGroup>
        </div>

        {/* Purchasing Power Parity */}
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h4 className="font-medium">Purchasing Power Parity</h4>
            <p className="text-sm text-muted-foreground">
              Charge different prices based on the cost of living in a country.
            </p>
          </div>
          <Switch
            checked={formData.purchasingPowerParity}
            onCheckedChange={(checked) =>
              updateFormData({ purchasingPowerParity: checked })
            }
          />
        </div>

        {/* Limit Purchases */}
        <div className="flex items-center justify-between py-3">
          <div>
            <h4 className="font-medium">Limit total number of purchases?</h4>
            <p className="text-sm text-muted-foreground">
              Charge different prices based on the cost of living in a country.
            </p>
          </div>
          <Switch
            checked={formData.limitPurchases}
            onCheckedChange={(checked) =>
              updateFormData({ limitPurchases: checked })
            }
          />
        </div>
      </div>

      {/* Next Button */}
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
