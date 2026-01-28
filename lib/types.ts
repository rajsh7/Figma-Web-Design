export type WebsiteType = "digital-products" | "list-multiple" | "existing-products" | "others"

export type WebsiteStatus = "Published" | "Active" | "Pending" | "Draft"

export interface Website {
  id: string
  title: string
  slug: string
  price: string
  sale: string
  revenue: string
  status: WebsiteStatus
  websiteType: WebsiteType
  formData?: FormData
  createdAt: string
  updatedAt: string
  published: boolean
}

export interface FormData {
  // Step selection
  websiteType: WebsiteType | null

  // Page Details (Step 1)
  pageTitle: string
  category: string
  coverImage: File | null
  coverImageUrl: string
  description: string
  primaryCta: string

  // Optional Sections
  gallery: boolean
  testimonial: boolean
  faq: boolean
  aboutUs: boolean
  showProduct: boolean
  footer: boolean

  // Gallery items
  galleryTitle: string
  galleryCoverImage: File | null
  galleryCoverImageUrl: string

  // Testimonial
  testimonialName: string
  testimonialComment: string
  testimonialImage: File | null
  testimonialImageUrl: string

  // FAQ
  faqQuestion: string
  faqAnswer: string

  // Digital Files (Step 2)
  digitalFileType: "single" | "multiple"
  digitalFileUrl: string
  digitalFileCoverImage: File | null
  digitalFileCoverImageUrl: string

  // Product Details
  productTitle: string
  productDescription: string

  // Pricing & Settings
  pricingType: "fixed" | "customer-decides" | "free"
  price: string
  discountPrice: string
  purchasingPowerParity: boolean
  limitPurchases: boolean

  // Advanced Settings (Step 3)
  theme: string
  style: "design" | "reset"
  buttonColor: string
  textColor: string
  checkoutType: "same-page" | "customize"
  emailRequired: boolean
  phoneRequired: boolean
  verificationOrder: boolean
  gstPrice: string
  termsConditions: string
  refundPolicy: string
  privacyPolicy: string
  pageUrl: string
  postPurchaseBehavior: string

  // Tracking
  metaPixelId: string
  googleAnalyticsId: string

  // Settings toggles
  pageExpiry: boolean
  termsEnabled: boolean
  darkTheme: boolean
  deactivateSales: boolean
  trackingEnabled: boolean
  color: string
}

export const initialFormData: FormData = {
  websiteType: null,
  pageTitle: "",
  category: "",
  coverImage: null,
  coverImageUrl: "",
  description: "",
  primaryCta: "",
  gallery: false,
  testimonial: false,
  faq: false,
  aboutUs: false,
  showProduct: false,
  footer: false,
  galleryTitle: "",
  galleryCoverImage: null,
  galleryCoverImageUrl: "",
  testimonialName: "",
  testimonialComment: "",
  testimonialImage: null,
  testimonialImageUrl: "",
  faqQuestion: "",
  faqAnswer: "",
  digitalFileType: "single",
  digitalFileUrl: "",
  digitalFileCoverImage: null,
  digitalFileCoverImageUrl: "",
  productTitle: "",
  productDescription: "",
  pricingType: "fixed",
  price: "",
  discountPrice: "",
  purchasingPowerParity: false,
  limitPurchases: false,
  theme: "default",
  style: "design",
  buttonColor: "#000000",
  textColor: "#FFFFFF",
  checkoutType: "same-page",
  emailRequired: true,
  phoneRequired: false,
  verificationOrder: false,
  gstPrice: "",
  termsConditions: "",
  refundPolicy: "",
  privacyPolicy: "",
  pageUrl: "",
  postPurchaseBehavior: "",
  metaPixelId: "",
  googleAnalyticsId: "",
  pageExpiry: true,
  termsEnabled: true,
  darkTheme: false,
  deactivateSales: false,
  trackingEnabled: false,
  color: "",
}
