"use client"

import { Info, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
    <div className="p-6 space-y-6">
      {/* Step Tabs */}
      <Tabs defaultValue="pricing" className="w-full">
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
            value="pricing"
            className="data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3 text-sm"
          >
            Price/Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="pt-6">
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
              className="flex gap-4"
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
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => updateFormData({ price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Discount Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.discountPrice}
                    onChange={(e) => updateFormData({ discountPrice: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Offer discounted price checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox id="discount-offer" />
              <Label htmlFor="discount-offer" className="font-normal text-sm">
                Offer discounted price on selling price
              </Label>
            </div>

            {/* Purchasing Power Parity */}
            <div className="flex items-center justify-between py-4 border-t">
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
            <div className="flex items-center justify-between py-4 border-t">
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
                    <Checkbox id="compulsory" />
                    <Label htmlFor="compulsory" className="font-normal text-xs">
                      Make this compulsory to buy
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
