"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormData } from "@/lib/types"

interface StepPricingProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function StepPricing({ formData, updateFormData, onNext, onBack }: StepPricingProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Info className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">Pricing & Settings</span>
        </div>

        {/* Pricing Type */}
        <RadioGroup
          value={formData.pricingType}
          onValueChange={(value: "fixed" | "customer-decides" | "free") =>
            updateFormData({ pricingType: value })
          }
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed" className="font-normal">Fixed price</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="customer-decides" id="customer-decides" />
            <Label htmlFor="customer-decides" className="font-normal">Customers decide a price</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free" className="font-normal">Free</Label>
          </div>
        </RadioGroup>

        {/* Price Inputs */}
        {formData.pricingType !== "free" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Price *</Label>
              <Input
                type="number"
                placeholder="999"
                value={formData.price ?? "999"}
                onChange={(e) => updateFormData({ price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Discount Price</Label>
              <Input
                type="number"
                placeholder="799"
                value={formData.discountPrice ?? ""}
                onChange={(e) => updateFormData({ discountPrice: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Offer discounted price checkbox */}
        <div className="flex items-center gap-2">
        <Checkbox
          id="discount-offer"
          checked={formData.discountOffer}
          onCheckedChange={(checked) => updateFormData({ discountOffer: !!checked })}
        />
          <Label htmlFor="discount-offer" className="font-normal text-sm">
            Offer discounted price on selling price
          </Label>
        </div>

        {/* Purchasing Power Parity */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-t">
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-t">
          <div>
            <h4 className="font-medium">Limit total number of purchases?</h4>
            <p className="text-sm text-muted-foreground">
              Set a maximum number of times this product can be purchased.
            </p>
          </div>
          <Switch
            checked={formData.limitPurchases}
            onCheckedChange={(checked) =>
              updateFormData({ limitPurchases: checked })
            }
          />
        </div>

        {/* My Class Field info */}
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="flex items-start gap-3">
            <div className="size-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
              MC
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">My Class Field</h4>
              <p className="text-xs text-muted-foreground">Digital files | 1 media</p>
              <p className="text-xs text-muted-foreground">Unlimited Sale</p>
              <p className="text-xs text-teal-600">INR 454.00 <span className="line-through text-muted-foreground">464</span></p>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="compulsory"
                  checked={formData.limitPurchases}
                  onCheckedChange={(checked) =>
                    updateFormData({ limitPurchases: !!checked })
                  }
                />
                <Label htmlFor="compulsory" className="font-normal text-xs">
                  Make this compulsory to buy
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 rounded-full bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
