"use client"

import React, { useState } from "react"

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
import { validateImageFile, getFilePreviewUrl, isValidUrl } from "@/lib/file-utils"

interface StepPageDetailsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function StepPageDetails({ formData, updateFormData, onNext }: StepPageDetailsProps) {
  const [coverImageLink, setCoverImageLink] = useState(formData.coverImageUrl)
  const [galleryImageLink, setGalleryImageLink] = useState(formData.galleryCoverImageUrl)
  const [testimonialImageLink, setTestimonialImageLink] = useState(formData.testimonialImageUrl)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateImageFile(file)
      
      if (!validation.isValid) {
        alert(validation.error)
        return
      }
      
      updateFormData({
        coverImage: file,
        coverImageUrl: getFilePreviewUrl(file),
      })
      setCoverImageLink("") // Clear link input when file is uploaded
    }
  }

  const handleAddCoverLink = () => {
    if (coverImageLink.trim()) {
      if (!isValidUrl(coverImageLink.trim())) {
        alert("Please enter a valid URL")
        return
      }
      
      updateFormData({
        coverImage: null,
        coverImageUrl: coverImageLink.trim(),
      })
    }
  }

  const handleAddGalleryLink = () => {
    if (galleryImageLink.trim()) {
      if (!isValidUrl(galleryImageLink.trim())) {
        alert("Please enter a valid URL")
        return
      }
      
      updateFormData({
        galleryCoverImage: null,
        galleryCoverImageUrl: galleryImageLink.trim(),
      })
    }
  }

  const handleAddTestimonialLink = () => {
    if (testimonialImageLink.trim()) {
      if (!isValidUrl(testimonialImageLink.trim())) {
        alert("Please enter a valid URL")
        return
      }
      
      updateFormData({
        testimonialImage: null,
        testimonialImageUrl: testimonialImageLink.trim(),
      })
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Create Your Website</h2>
        <p className="text-sm text-muted-foreground mb-6">Tell us about your business or product. We'll create a beautiful website for you!</p>

        {/* Website Page Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="pageTitle">Your Business/Product Name</Label>
            <span className="text-xs text-muted-foreground">{formData.pageTitle.length}/50</span>
          </div>
          <Input
            id="pageTitle"
            placeholder="e.g., John's Bakery, Handmade Jewelry Store"
            value={formData.pageTitle ?? ""}
            onChange={(e) => updateFormData({ pageTitle: e.target.value })}
            maxLength={50}
          />
        </div>

        {/* Select/Category */}
        <div className="space-y-2 mt-4">
          <Label>What type of business do you have?</Label>
          <Select
            value={formData.category ?? ""}
            onValueChange={(value) => updateFormData({ category: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restaurant">Restaurant/Food</SelectItem>
              <SelectItem value="retail">Retail/Shopping</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="handmade">Handmade/Crafts</SelectItem>
              <SelectItem value="education">Education/Training</SelectItem>
              <SelectItem value="health">Health/Fitness</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cover Image */}
        <div className="space-y-2 mt-4">
          <Label>Main Photo (Your logo, product, or storefront)</Label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <Input
              placeholder="Or paste image link from Google/Facebook"
              className="flex-1"
              value={coverImageLink ?? ""}
              onChange={(e) => setCoverImageLink(e.target.value)}
            />
            <Button
              variant="outline"
              size="sm"
              className="sm:w-auto w-full"
              type="button"
              onClick={handleAddCoverLink}
            >
              Add Photo
            </Button>
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
                  <p className="text-sm text-muted-foreground">Click to upload your photo</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Best size: 1200px x 600px (up to 10MB)
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mt-4">
          <Label>Tell customers about your business</Label>
          <div className="border rounded-md">
            <Textarea
              placeholder="e.g., We make fresh homemade bread daily using traditional recipes. Visit our bakery for the best pastries in town!"
              value={formData.description ?? ""}
              onChange={(e) => updateFormData({ description: e.target.value })}
              className="border-0 min-h-24 resize-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Primary CTA */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <Label>Call-to-Action Button Text</Label>
            <span className="text-xs text-muted-foreground">{formData.primaryCta.length}/50</span>
          </div>
          <Input
            placeholder="e.g., Order Now, Contact Us, Buy Now, Learn More"
            value={formData.primaryCta ?? ""}
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
                  updateFormData({ [section.key]: !!checked })
                }
              />
              <Label htmlFor={section.key} className="font-normal cursor-pointer">
                {section.label}
              </Label>
            </div>
          ))}
        </div>

        {/* Gallery settings */}
        {formData.gallery && (
          <div className="mt-4 space-y-3 border rounded-md p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="galleryTitle">Gallery Title</Label>
                <span className="text-xs text-muted-foreground">
                  {formData.galleryTitle.length}/80
                </span>
              </div>
              <Input
                id="galleryTitle"
                placeholder="Gallery"
                value={formData.galleryTitle ?? ""}
                onChange={(e) => updateFormData({ galleryTitle: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Gallery Image</Label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <Input
                  placeholder="Add image link"
                  className="flex-1"
                  value={galleryImageLink ?? ""}
                  onChange={(e) => setGalleryImageLink(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className="sm:w-auto w-full"
                  onClick={handleAddGalleryLink}
                >
                  Add Link
                </Button>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="galleryImage"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const validation = validateImageFile(file)
                      
                      if (!validation.isValid) {
                        alert(validation.error)
                        return
                      }
                      
                      updateFormData({
                        galleryCoverImage: file,
                        galleryCoverImageUrl: getFilePreviewUrl(file),
                      })
                      setGalleryImageLink("") // Clear link input when file is uploaded
                    }
                  }}
                />
                <label htmlFor="galleryImage" className="cursor-pointer">
                  {formData.galleryCoverImageUrl ? (
                    <img
                      src={formData.galleryCoverImageUrl}
                      alt="Gallery"
                      className="mx-auto max-h-32 w-full max-w-xs rounded-md object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="size-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload gallery image</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Show Product settings */}
        {formData.showProduct && (
          <div className="mt-4 space-y-3 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="productTitle">Product Title</Label>
              <Input
                id="productTitle"
                placeholder="Name of your product"
                value={formData.productTitle ?? ""}
                onChange={(e) => updateFormData({ productTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productDescription">Product Description</Label>
              <Textarea
                id="productDescription"
                placeholder="Describe what customers will get when they purchase."
                value={formData.productDescription ?? ""}
                onChange={(e) => updateFormData({ productDescription: e.target.value })}
                className="min-h-24 resize-y"
              />
            </div>
          </div>
        )}

        {/* Testimonial settings */}
        {formData.testimonial && (
          <div className="mt-4 space-y-3 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="testimonialName">Customer Name</Label>
              <Input
                id="testimonialName"
                placeholder="Name"
                value={formData.testimonialName ?? ""}
                onChange={(e) => updateFormData({ testimonialName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonialComment">Testimonial</Label>
              <Textarea
                id="testimonialComment"
                placeholder="What did your customer say?"
                value={formData.testimonialComment ?? ""}
                onChange={(e) => updateFormData({ testimonialComment: e.target.value })}
                className="min-h-24 resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label>Customer Image</Label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <Input
                  placeholder="Add image link"
                  className="flex-1"
                  value={testimonialImageLink ?? ""}
                  onChange={(e) => setTestimonialImageLink(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className="sm:w-auto w-full"
                  onClick={handleAddTestimonialLink}
                >
                  Add Link
                </Button>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="testimonialImage"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const validation = validateImageFile(file)
                      
                      if (!validation.isValid) {
                        alert(validation.error)
                        return
                      }
                      
                      updateFormData({
                        testimonialImage: file,
                        testimonialImageUrl: getFilePreviewUrl(file),
                      })
                      setTestimonialImageLink("") // Clear link input when file is uploaded
                    }
                  }}
                />
                <label htmlFor="testimonialImage" className="cursor-pointer">
                  {formData.testimonialImageUrl ? (
                    <img
                      src={formData.testimonialImageUrl}
                      alt="Customer"
                      className="mx-auto max-h-24 w-full max-w-[96px] rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="size-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload customer photo</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* FAQ settings */}
        {formData.faq && (
          <div className="mt-4 space-y-3 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="faqQuestion">FAQ Question</Label>
              <Input
                id="faqQuestion"
                placeholder="What question do customers usually ask?"
                value={formData.faqQuestion ?? ""}
                onChange={(e) => updateFormData({ faqQuestion: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faqAnswer">FAQ Answer</Label>
              <Textarea
                id="faqAnswer"
                placeholder="Answer this question to remove purchase friction."
                value={formData.faqAnswer ?? ""}
                onChange={(e) => updateFormData({ faqAnswer: e.target.value })}
                className="min-h-24 resize-y"
              />
            </div>
          </div>
        )}

        {/* About Us settings */}
        {formData.aboutUs && (
          <div className="mt-4 space-y-3 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="aboutUsTitle">About Us heading</Label>
              <Input
                id="aboutUsTitle"
                placeholder="About Us"
                value={formData.aboutUsTitle ?? ""}
                onChange={(e) => updateFormData({ aboutUsTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutUsDescription">About Us description</Label>
              <Textarea
                id="aboutUsDescription"
                placeholder="Tell visitors who you are and why they should trust you."
                value={formData.aboutUsDescription ?? ""}
                onChange={(e) => updateFormData({ aboutUsDescription: e.target.value })}
                className="min-h-24 resize-y"
              />
            </div>
          </div>
        )}

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
            <Label>WhatsApp Number (if different)</Label>
            <Input
              placeholder="e.g., +91 98765 43210"
              value={formData.whatsappNumber || ""}
              onChange={(e) => updateFormData({ whatsappNumber: e.target.value })}
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
          
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              placeholder="e.g., Shop 123, Main Street, City - 400001"
              value={formData.address || ""}
              onChange={(e) => updateFormData({ address: e.target.value })}
            />
          </div>
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
