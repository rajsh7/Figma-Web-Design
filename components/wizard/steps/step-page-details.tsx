"use client"

import React from "react"

import { Upload, Plus, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FormData } from "@/lib/types"

interface StepPageDetailsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function StepPageDetails({ formData, updateFormData, onNext }: StepPageDetailsProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData({
        coverImage: file,
        coverImageUrl: URL.createObjectURL(file),
      })
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-6">Tell us about your Website Page</h2>

        {/* Website Page Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="pageTitle">Website Page Title</Label>
            <span className="text-xs text-muted-foreground">{formData.pageTitle.length}/50</span>
          </div>
          <Input
            id="pageTitle"
            placeholder="Website Page Title"
            value={formData.pageTitle}
            onChange={(e) => updateFormData({ pageTitle: e.target.value })}
            maxLength={50}
          />
        </div>

        {/* Select/Category */}
        <div className="space-y-2 mt-4">
          <Label>Select</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData({ category: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cover Image */}
        <div className="space-y-2 mt-4">
          <Label>Cover Image</Label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <Input placeholder="Add file link" className="flex-1" />
            <Button variant="outline" size="sm" className="sm:w-auto w-full">Add Link</Button>
          </div>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input
              type="file"
              id="coverImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="coverImage" className="cursor-pointer">
              {formData.coverImageUrl ? (
                <img
                  src={formData.coverImageUrl || "/placeholder.svg"}
                  alt="Cover"
                  className="mx-auto max-h-32 w-full max-w-xs rounded-md object-cover"
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

        {/* Description */}
        <div className="space-y-2 mt-4">
          <Label>Description</Label>
          <div className="border rounded-md">
            <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
              <select className="text-xs bg-transparent border-none outline-none">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
              </select>
              <div className="h-4 w-px bg-border mx-1" />
              <button className="p-1 hover:bg-muted rounded text-sm font-bold">B</button>
              <button className="p-1 hover:bg-muted rounded text-sm italic">I</button>
              <button className="p-1 hover:bg-muted rounded text-sm underline">U</button>
              <button className="p-1 hover:bg-muted rounded text-sm line-through">S</button>
              <div className="h-4 w-px bg-border mx-1" />
              <button className="p-1 hover:bg-muted rounded">
                <Link2 className="size-4" />
              </button>
            </div>
            <Textarea
              placeholder="Type your description..."
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              className="border-0 min-h-24 resize-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Primary CTA */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <Label>Primary CTA</Label>
            <span className="text-xs text-muted-foreground">{formData.primaryCta.length}/50</span>
          </div>
          <Input
            placeholder="Get it Now"
            value={formData.primaryCta}
            onChange={(e) => updateFormData({ primaryCta: e.target.value })}
            maxLength={50}
          />
        </div>

        {/* Optional Sections */}
        <div className="space-y-3 mt-6">
          <Label className="text-base font-semibold">Optional Sections</Label>
          
          {[
            { key: "gallery", label: "Gallery" },
            { key: "testimonial", label: "Testimonial" },
            { key: "faq", label: "FAQ" },
            { key: "aboutUs", label: "About Us" },
            { key: "showProduct", label: "Show Product" },
            { key: "footer", label: "Footer" },
          ].map((section) => (
            <div key={section.key} className="flex items-center gap-3 py-2 border-b">
              <Checkbox
                id={section.key}
                checked={formData[section.key as keyof FormData] as boolean}
                onCheckedChange={(checked) =>
                  updateFormData({ [section.key]: checked })
                }
              />
              <Label htmlFor={section.key} className="font-normal cursor-pointer">
                {section.label}
              </Label>
            </div>
          ))}
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
