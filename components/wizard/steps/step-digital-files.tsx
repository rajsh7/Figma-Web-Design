"use client"

import React from "react"

import { Upload, Info } from "lucide-react"
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { FormData } from "@/lib/types"

interface StepDigitalFilesProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function StepDigitalFiles({ formData, updateFormData, onNext }: StepDigitalFilesProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData({
        digitalFileCoverImage: file,
        digitalFileCoverImageUrl: URL.createObjectURL(file),
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Step Tabs */}
      <Tabs defaultValue="digital-files" className="w-full">
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

        <TabsContent value="digital-files" className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info className="size-4 text-muted-foreground" />
              <span className="text-sm">What is Payment Page for ?</span>
            </div>

            <Select
              value={formData.digitalFileType}
              onValueChange={(value: "single" | "multiple") =>
                updateFormData({ digitalFileType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Single or multiple digital files" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single digital file</SelectItem>
                <SelectItem value="multiple">Multiple digital files</SelectItem>
              </SelectContent>
            </Select>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="digitalFileCoverImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="digitalFileCoverImage" className="cursor-pointer">
                  {formData.digitalFileCoverImageUrl ? (
                    <img
                      src={formData.digitalFileCoverImageUrl || "/placeholder.svg"}
                      alt="Cover"
                      className="mx-auto max-h-32 rounded-md object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="size-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Image</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommending 1200px x 1200 or up to 10 mb
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="product-details" className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>URL</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Website Link" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website Link</SelectItem>
                  <SelectItem value="product">Product Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Add Website Link"
                value={formData.digitalFileUrl}
                onChange={(e) => updateFormData({ digitalFileUrl: e.target.value })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="price-policy" className="pt-6">
          <p className="text-sm text-muted-foreground">Configure pricing and policies</p>
        </TabsContent>
      </Tabs>

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
