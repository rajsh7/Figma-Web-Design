"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FormData } from "@/lib/types"

interface StepSettingsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onPublish: () => void
}

export function StepSettings({ formData, updateFormData, onPublish }: StepSettingsProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Colour */}
      <div className="space-y-2">
        <Label>Colour</Label>
        <Select
          value={formData.color}
          onValueChange={(value) => updateFormData({ color: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Colour" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="red">Red</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full h-10 bg-foreground rounded-md" />
      </div>

      {/* Page Expiry */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h4 className="font-medium">Page Expiry</h4>
          <p className="text-sm text-muted-foreground">
            Turning on this option will make the page and its content expire after a defined period of time.
          </p>
        </div>
        <Switch
          checked={formData.pageExpiry}
          onCheckedChange={(checked) => updateFormData({ pageExpiry: checked })}
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h4 className="font-medium">Terms and Conditions</h4>
          <p className="text-sm text-muted-foreground">
            You can add your own terms & conditions in addition to the default terms applied by SuperProfile.
          </p>
        </div>
        <Switch
          checked={formData.termsEnabled}
          onCheckedChange={(checked) => updateFormData({ termsEnabled: checked })}
        />
      </div>

      {/* Dark theme */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h4 className="font-medium">Dark theme</h4>
        </div>
        <Switch
          checked={formData.darkTheme}
          onCheckedChange={(checked) => updateFormData({ darkTheme: checked })}
        />
      </div>

      {/* Deactivate sales */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h4 className="font-medium">Deactivate sales</h4>
        </div>
        <Switch
          checked={formData.deactivateSales}
          onCheckedChange={(checked) => updateFormData({ deactivateSales: checked })}
        />
      </div>

      {/* Tracking */}
      <div className="flex items-center justify-between py-4">
        <div>
          <h4 className="font-medium">Tracking</h4>
        </div>
        <Switch
          checked={formData.trackingEnabled}
          onCheckedChange={(checked) => updateFormData({ trackingEnabled: checked })}
        />
      </div>
    </div>
  )
}
