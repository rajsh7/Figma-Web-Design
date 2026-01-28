"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { FormData } from "@/lib/types"
import Image from "next/image"

interface StepAdvancedSettingsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const themes = [
  { id: "default", name: "Default", image: "/themes/default.jpg" },
  { id: "green", name: "Green", image: "/themes/green.jpg" },
  { id: "modern", name: "Modern", image: "/themes/modern.jpg" },
  { id: "tech", name: "Tech", image: "/themes/tech.jpg" },
  { id: "others", name: "Others", image: "/themes/others.jpg" },
  { id: "dawn", name: "Dawn", image: "/themes/dawn.jpg" },
  { id: "dusk", name: "Dusk", image: "/themes/dusk.jpg" },
]

export function StepAdvancedSettings({ formData, updateFormData, onNext, onBack }: StepAdvancedSettingsProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
      {/* Theme and Styling */}
      <div className="space-y-4">
        <h3 className="font-semibold">Theme and Styling</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => updateFormData({ theme: theme.id })}
              className={cn(
                "rounded-lg overflow-hidden border-2 transition-all",
                formData.theme === theme.id ? "border-foreground" : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <div className="aspect-video bg-gradient-to-br from-sky-400 to-teal-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-4 bg-background/30 rounded" />
                </div>
              </div>
              <p className="text-xs text-center py-1">{theme.name}</p>
            </button>
          ))}
        </div>

        {/* Style Selection */}
        <div className="flex items-center gap-4 pt-2">
          <RadioGroup
            value={formData.style}
            onValueChange={(value: "design" | "reset") =>
              updateFormData({ style: value })
            }
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="design" id="design" />
              <Label htmlFor="design" className="font-normal">Design</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="reset" id="reset" />
              <Label htmlFor="reset" className="font-normal">Reset to default</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Color Options */}
        <div className="flex gap-2">
          <Button
            variant={formData.style === "design" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
          >
            Backgrounds
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-transparent"
          >
            Buttons
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-transparent"
          >
            Images
          </Button>
        </div>

        {/* Button Color */}
        <div className="space-y-2">
          <Label>Button Colour</Label>
          <Input
            placeholder="#00000000"
            value={formData.buttonColor}
            onChange={(e) => updateFormData({ buttonColor: e.target.value })}
          />
        </div>

        {/* Text Color */}
        <div className="space-y-2">
          <Label>Text Colour</Label>
          <Input
            placeholder="#FFFFFFFF"
            value={formData.textColor}
            onChange={(e) => updateFormData({ textColor: e.target.value })}
          />
        </div>
      </div>

      {/* Checkout Experience */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Checkout Experience</h3>
        <p className="text-sm text-muted-foreground">
          Customize how you would like customers to checkout on this product
        </p>

        <div className="flex items-center gap-4">
          <span className="text-sm">Same Page Checkout</span>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            Customize
          </Button>
        </div>

        {/* Customer information */}
        <div className="space-y-2">
          <Label>Customer information</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Email ID</span>
          </div>
        </div>

        {/* Ask additional questions */}
        <div className="space-y-2">
          <Label>Ask additional questions</Label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="phone"
                checked={formData.phoneRequired}
                onCheckedChange={(checked) => updateFormData({ phoneRequired: !!checked })}
              />
              <Label htmlFor="phone" className="font-normal text-sm">Phone number</Label>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-sm text-muted-foreground">Verification Order</span>
              <Switch
                checked={formData.verificationOrder}
                onCheckedChange={(checked) => updateFormData({ verificationOrder: checked })}
              />
            </div>
          </div>
          <Button variant="link" className="text-teal-600 p-0 h-auto text-sm">
            + Add Question
          </Button>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Pricing</h3>
        <div className="space-y-2">
          <Label>GST or Price</Label>
          <Input
            placeholder="Type"
            value={formData.gstPrice}
            onChange={(e) => updateFormData({ gstPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Terms and Policies */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Terms and Policies</h3>
        
        <div className="space-y-2">
          <Label>Terms and Conditions</Label>
          <Input
            placeholder="Type"
            value={formData.termsConditions}
            onChange={(e) => updateFormData({ termsConditions: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Refund Policy</Label>
          <Input
            placeholder="Type"
            value={formData.refundPolicy}
            onChange={(e) => updateFormData({ refundPolicy: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Privacy Policy</Label>
          <Input
            placeholder="Type"
            value={formData.privacyPolicy}
            onChange={(e) => updateFormData({ privacyPolicy: e.target.value })}
          />
        </div>
      </div>

      {/* Page URL */}
      <div className="space-y-4 pt-4 border-t">
        <div className="space-y-2">
          <Label>Page URL</Label>
          <Input
            placeholder="Type"
            value={formData.pageUrl}
            onChange={(e) => updateFormData({ pageUrl: e.target.value })}
          />
        </div>
      </div>

      {/* Post Purchase Behaviour */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Post Purchase Behaviour</h3>
        <p className="text-sm text-muted-foreground">
          Define what needs to happen when someone complete the purchase.
        </p>
        <div className="space-y-2">
          <Label>What do you want to show users after their purchase? *</Label>
          <Input
            placeholder="Type"
            value={formData.postPurchaseBehavior}
            onChange={(e) => updateFormData({ postPurchaseBehavior: e.target.value })}
          />
        </div>
      </div>

      {/* Tracking */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Tracking</h3>
        
        <div className="space-y-2">
          <Label>Meta Pixel</Label>
          <p className="text-xs text-muted-foreground">
            Connect your Pixel IDs to this product to run re-marketing campaigns on Meta Business
          </p>
          <div className="space-y-2">
            <Label className="text-xs">Pixel ID</Label>
            <Input
              placeholder="Type"
              value={formData.metaPixelId}
              onChange={(e) => updateFormData({ metaPixelId: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Google Analytics</Label>
          <p className="text-xs text-muted-foreground">
            Add your Google Analytics Tracking IDs to get crucial visitor-level data on your GA dashboard.
          </p>
          <div className="space-y-2">
            <Label className="text-xs">Pixel ID</Label>
            <Input
              placeholder="Type"
              value={formData.googleAnalyticsId}
              onChange={(e) => updateFormData({ googleAnalyticsId: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4 sticky bottom-0 bg-background py-4">
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
