"use client"

import { useState } from "react"
import { WizardLayout } from "./wizard-layout"
import { StepPageDetails } from "./steps/step-page-details"
import { StepDigitalFiles } from "./steps/step-digital-files"
import { StepProductDetails } from "./steps/step-product-details"
import { StepPricing } from "./steps/step-pricing"
import { StepUploadFiles } from "./steps/step-upload-files"
import { StepAdvancedSettings } from "./steps/step-advanced-settings"
import { StepSettings } from "./steps/step-settings"
import { SuccessPage } from "./success-page"
import { useWebsites } from "@/contexts/website-context"
import type { FormData, Website, WebsiteType } from "@/lib/types"
import { initialFormData } from "@/lib/types"
import { DefaultTemplate } from "@/components/website-templates/default-template"

interface WizardProps {
  websiteType: WebsiteType
  onClose: () => void
}

type WizardStep =
  | "page-details"
  | "digital-files"
  | "product-details"
  | "pricing"
  | "upload-files"
  | "advanced-settings"
  | "settings"
  | "success"

// Define step flows for different website types
const getStepFlow = (type: WebsiteType): WizardStep[] => {
  switch (type) {
    case "digital-products":
      return ["upload-files", "pricing", "advanced-settings", "success"]
    case "list-multiple":
      return ["digital-files", "product-details", "pricing", "settings", "success"]
    case "existing-products":
      return ["page-details", "advanced-settings", "success"]
    case "others":
    default:
      return ["page-details", "advanced-settings", "success"]
  }
}

const getStepLabel = (step: WizardStep, stepIndex: number, totalSteps: number): string => {
  const labels: Record<WizardStep, string> = {
    "page-details": "Step Details",
    "digital-files": "Checkout",
    "product-details": "Checkout",
    "pricing": "Checkout",
    "upload-files": "Payment Page",
    "advanced-settings": "Advanced Settings",
    "settings": "Settings",
    "success": "Complete",
  }
  return `Step ${stepIndex + 1} - ${labels[step]}`
}

export function Wizard({ websiteType, onClose }: WizardProps) {
  const { addWebsite } = useWebsites()
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    websiteType,
  })
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [publishedWebsite, setPublishedWebsite] = useState<{ slug: string } | null>(null)

  const stepFlow = getStepFlow(websiteType)
  const currentStep = stepFlow[currentStepIndex]
  const totalSteps = stepFlow.length - 1 // Exclude success step from count

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const goToNextStep = () => {
    if (currentStepIndex < stepFlow.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handlePublish = () => {
    // Save website to storage
    const website = addWebsite(formData, true)
    setPublishedWebsite({ slug: website.slug })

    // Navigate to success page
    const successIndex = stepFlow.indexOf("success")
    if (successIndex !== -1) {
      setCurrentStepIndex(successIndex)
    }
  }

  const previewWebsite: Website = {
    id: "preview",
    title: formData.pageTitle || "Untitled page",
    slug: formData.pageUrl || "preview-page",
    price: formData.price || "0",
    sale: "0",
    revenue: "0",
    status: "Draft",
    websiteType: websiteType,
    formData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: false,
  }

  // Show success page
  if (currentStep === "success") {
    const websiteUrl = publishedWebsite
      ? `/sites/${publishedWebsite.slug}`
      : `/sites/${formData.pageUrl || 'my-page'}`

    return (
      <SuccessPage
        websiteUrl={websiteUrl}
        onClose={onClose}
      />
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case "page-details":
        return (
          <StepPageDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        )
      case "digital-files":
        return (
          <StepDigitalFiles
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        )
      case "product-details":
        return (
          <StepProductDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case "pricing":
        return (
          <StepPricing
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case "upload-files":
        return (
          <StepUploadFiles
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        )
      case "advanced-settings":
        return (
          <StepAdvancedSettings
            formData={formData}
            updateFormData={updateFormData}
            onNext={handlePublish}
            onBack={goToPreviousStep}
          />
        )
      case "settings":
        return (
          <StepSettings
            formData={formData}
            updateFormData={updateFormData}
            onPublish={handlePublish}
          />
        )
      default:
        return null
    }
  }

  return (
    <WizardLayout
      currentStep={currentStepIndex + 1}
      totalSteps={totalSteps}
      stepLabel={getStepLabel(currentStep, currentStepIndex, totalSteps)}
      onClose={onClose}
      onPublish={handlePublish}
      showPublish={currentStep === "settings" || currentStep === "advanced-settings"}
      preview={<DefaultTemplate website={previewWebsite} />}
    >
      {renderStep()}
    </WizardLayout>
  )
}
