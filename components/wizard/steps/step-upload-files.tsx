"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/lib/types"
import { validateFile, getFilePreviewUrl, isImageFile, isValidUrl } from "@/lib/file-utils"
import { showFileUploadSuccess, showFileUploadError, showLinkAddedSuccess, showLinkAddedError } from "@/lib/toast-utils"

interface StepUploadFilesProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function StepUploadFiles({ formData, updateFormData, onNext }: StepUploadFilesProps) {
  const [fileLink, setFileLink] = useState(formData.digitalFileUrl || "")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['image/', 'application/pdf', '.zip', '.rar', '.doc', '.docx', '.txt']
      const validation = validateFile(file, allowedTypes, 10)
      
      if (!validation.isValid) {
        showFileUploadError(validation.error!)
        return
      }
      
      updateFormData({
        digitalFileCoverImage: file,
        digitalFileCoverImageUrl: getFilePreviewUrl(file),
      })
      
      showFileUploadSuccess(file.name)
    }
  }

  const handleAddLink = () => {
    if (fileLink.trim()) {
      if (!isValidUrl(fileLink.trim())) {
        showLinkAddedError("Please enter a valid URL")
        return
      }
      
      updateFormData({
        digitalFileUrl: fileLink.trim(),
        digitalFileCoverImage: null,
        digitalFileCoverImageUrl: fileLink.trim(),
      })
      
      showLinkAddedSuccess()
    }
  }
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h2 className="text-lg font-semibold">Upload Your Digital Files</h2>

      {/* Page Title */}
      <div className="space-y-2">
        <Label htmlFor="pageTitle">Page Title</Label>
        <Input
          id="pageTitle"
          placeholder="Enter your page title"
          value={formData.pageTitle}
          onChange={(e) => updateFormData({ pageTitle: e.target.value })}
        />
      </div>

      {/* File Link */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Input 
          placeholder="Add file link" 
          className="flex-1" 
          value={fileLink}
          onChange={(e) => setFileLink(e.target.value)}
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full sm:w-auto"
          onClick={handleAddLink}
          type="button"
        >
          Add Link
        </Button>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mt-6 p-4 border rounded-lg">
        <Label className="text-base font-semibold">Contact Information</Label>
        
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            placeholder="e.g., +91 98765 43210"
            value={formData.phoneNumber || ""}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            placeholder="e.g., contact@yourbusiness.com"
            value={formData.email || ""}
            onChange={(e) => updateFormData({ email: e.target.value })}
          />
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">Or</div>

      {/* Upload Area */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          id="digitalFile"
          className="hidden"
          accept="image/*,application/pdf,.zip,.rar,.doc,.docx,.txt"
          onChange={handleFileUpload}
        />
        <label htmlFor="digitalFile" className="cursor-pointer">
          {formData.digitalFileCoverImageUrl ? (
            <div className="space-y-2">
              {formData.digitalFileCoverImage && isImageFile(formData.digitalFileCoverImage) ? (
                <img
                  src={formData.digitalFileCoverImageUrl}
                  alt="Uploaded file"
                  className="mx-auto max-h-32 w-full max-w-xs rounded-md object-cover"
                />
              ) : formData.digitalFileCoverImageUrl.startsWith('http') ? (
                <img
                  src={formData.digitalFileCoverImageUrl}
                  alt="Linked image"
                  className="mx-auto max-h-32 w-full max-w-xs rounded-md object-cover"
                />
              ) : formData.digitalFileCoverImage ? (
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium">{formData.digitalFileCoverImage.name}</p>
                </div>
              ) : (
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium">Link added</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">Click to change file</p>
            </div>
          ) : (
            <>
              <Upload className="size-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Upload File</p>
              <p className="text-xs text-muted-foreground mt-1">
                Images, PDFs, ZIP files up to 10 MB
              </p>
            </>
          )}
        </label>
      </div>

      {/* Pricing Section */}
      <div className="space-y-4 pt-4">
        <h3 className="font-semibold">Pricing</h3>
        
        {/* Fixed Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b">
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b">
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b">
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
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
