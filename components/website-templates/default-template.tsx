"use client"

import React, { useState } from 'react'
import type { Website } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import Image from 'next/image'

interface DefaultTemplateProps {
    website: Website
}

export function DefaultTemplate({ website }: DefaultTemplateProps) {
    const { formData } = website

    if (!formData) return null

    const [coverImageError, setCoverImageError] = useState(false)
    const [galleryImageError, setGalleryImageError] = useState(false)
    const [testimonialImageError, setTestimonialImageError] = useState(false)
    const [digitalFileImageError, setDigitalFileImageError] = useState(false)

    // Theme-based styling
    const getThemeStyles = (theme: string) => {
        switch (theme) {
            case 'green':
                return {
                    primary: '#10b981',
                    secondary: '#065f46',
                    background: '#f0fdf4',
                    accent: '#34d399'
                }
            case 'modern':
                return {
                    primary: '#6366f1',
                    secondary: '#4338ca',
                    background: '#f8fafc',
                    accent: '#8b5cf6'
                }
            case 'tech':
                return {
                    primary: '#0ea5e9',
                    secondary: '#0284c7',
                    background: '#f0f9ff',
                    accent: '#06b6d4'
                }
            case 'dawn':
                return {
                    primary: '#f59e0b',
                    secondary: '#d97706',
                    background: '#fffbeb',
                    accent: '#fbbf24'
                }
            case 'dusk':
                return {
                    primary: '#8b5cf6',
                    secondary: '#7c3aed',
                    background: '#faf5ff',
                    accent: '#a78bfa'
                }
            default:
                return {
                    primary: '#000000',
                    secondary: '#374151',
                    background: '#ffffff',
                    accent: '#6b7280'
                }
        }
    }

    const themeStyles = getThemeStyles(formData.theme || 'default')

    const buttonStyle = {
        backgroundColor: (formData.buttonColor && formData.buttonColor !== '#000000') 
            ? formData.buttonColor 
            : themeStyles.primary,
        color: formData.textColor || '#FFFFFF',
    }

    const pageBackgroundStyle: React.CSSProperties = {
        backgroundColor: formData.backgroundColor || themeStyles.background,
    }

    return (
        <div
            className={`min-h-screen ${formData.darkTheme ? 'dark' : ''}`}
            style={{
                backgroundColor: (formData.backgroundColor && formData.backgroundColor !== '#FFFFFF') 
                    ? formData.backgroundColor 
                    : themeStyles.background,
                color: formData.textColor || (formData.theme === 'dusk' || formData.theme === 'tech' ? '#ffffff' : undefined)
            }}
        >
            {/* Hero Section */}
            <section className="relative py-20">
                <div className="w-full">
                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                        {formData.pageTitle || formData.productTitle || "Your Business Name"}
                    </h1>

                    {/* Cover Image - prioritize digital file cover for digital products */}
                    {(formData.digitalFileCoverImageUrl || formData.coverImageUrl) && !coverImageError && !digitalFileImageError && (
                        <div className="mb-8">
                            {(() => {
                                const imageUrl = formData.digitalFileCoverImageUrl || formData.coverImageUrl
                                const isDigitalFile = !!formData.digitalFileCoverImageUrl
                                return imageUrl.startsWith('blob:') || imageUrl.startsWith('http') ? (
                                    <img
                                        src={imageUrl}
                                        alt={formData.pageTitle || "Cover image"}
                                        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg object-cover"
                                        style={{ maxHeight: '400px' }}
                                        onError={() => isDigitalFile ? setDigitalFileImageError(true) : setCoverImageError(true)}
                                    />
                                ) : (
                                    <Image
                                        src={imageUrl}
                                        alt={formData.pageTitle || "Cover image"}
                                        width={1200}
                                        height={400}
                                        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg object-cover"
                                        style={{ maxHeight: '400px' }}
                                        onError={() => isDigitalFile ? setDigitalFileImageError(true) : setCoverImageError(true)}
                                    />
                                )
                            })()
                            }
                        </div>
                    )}

                    {/* Category Badge */}
                    {formData.category && (
                        <div className="mb-6">
                            <span 
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium capitalize text-white"
                                style={{ backgroundColor: themeStyles.primary }}
                            >
                                {formData.category}
                            </span>
                        </div>
                    )}

                    {/* Description */}
                    {(formData.description || formData.productDescription) && (
                        <div className="prose prose-lg mx-auto mb-8 max-w-2xl">
                            <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                                {formData.description || formData.productDescription}
                            </p>
                        </div>
                    )}

                    {/* Pricing */}
                    {formData.price && formData.pricingType !== 'free' && (
                        <div className="absolute top-4 right-4">
                            <div className="text-2xl font-bold">
                                {formData.discountPrice && (
                                    <span className="text-muted-foreground line-through mr-2 text-lg">
                                        ₹{formData.price}
                                    </span>
                                )}
                                <span>₹{formData.discountPrice || formData.price}</span>
                            </div>
                        </div>
                    )}

                    {/* Primary CTA */}
                    {formData.primaryCta && (
                        <div className="mb-8">
                            <Button
                                size="lg"
                                className="text-lg px-8 py-6"
                                style={buttonStyle}
                            >
                                {formData.primaryCta}
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Product Details Section */}
            {formData.showProduct && (
                <section className="py-16 bg-muted/30">
                    <div className="w-full">
                        <h2 className="text-3xl font-bold mb-6">
                            {formData.productTitle || "Product details"}
                        </h2>
                        <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                            {formData.productDescription || "Describe what customers will receive when they purchase this product."}
                        </p>
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            {formData.gallery && (
                <section className="py-16">
                    <div className="w-full">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            {formData.galleryTitle || "Gallery"}
                        </h2>
                        {formData.galleryCoverImageUrl && !galleryImageError ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {formData.galleryCoverImageUrl.startsWith('blob:') ? (
                                    <img
                                        src={formData.galleryCoverImageUrl}
                                        alt="Gallery"
                                        className="rounded-lg shadow-md w-full h-64 object-cover"
                                        onError={() => setGalleryImageError(true)}
                                    />
                                ) : (
                                    <Image
                                        src={formData.galleryCoverImageUrl}
                                        alt="Gallery"
                                        width={800}
                                        height={400}
                                        className="rounded-lg shadow-md w-full h-64 object-cover"
                                        onError={() => setGalleryImageError(true)}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                                <div className="border border-dashed rounded-lg p-6 flex items-center justify-center">
                                    Add images to your gallery from the editor.
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Testimonial Section */}
            {formData.testimonial && (
                <section className="py-16 bg-muted/30">
                    <div className="w-full">
                        <h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>
                        <div className="bg-background rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                            <div className="flex items-start gap-4">
                                {formData.testimonialImageUrl && !testimonialImageError && (
                                    formData.testimonialImageUrl.startsWith('blob:') ? (
                                        <img
                                            src={formData.testimonialImageUrl}
                                            alt={formData.testimonialName || "Testimonial"}
                                            className="w-16 h-16 rounded-full object-cover"
                                            onError={() => setTestimonialImageError(true)}
                                        />
                                    ) : (
                                        <Image
                                            src={formData.testimonialImageUrl}
                                            alt={formData.testimonialName || "Testimonial"}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 rounded-full object-cover"
                                            onError={() => setTestimonialImageError(true)}
                                        />
                                    )
                                )}
                                <div className="flex-1">
                                    <p className="text-lg mb-4 italic">
                                        {formData.testimonialComment
                                            ? `"${formData.testimonialComment}"`
                                            : "Add a customer quote to build trust and social proof."}
                                    </p>
                                    {formData.testimonialName && (
                                        <p className="font-semibold">— {formData.testimonialName}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {formData.faq && (
                <section className="py-16">
                    <div className="w-full">
                        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div className="bg-muted/30 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-3">
                                    {formData.faqQuestion || "What should I add in my FAQ?"}
                                </h3>
                                <p className="text-muted-foreground">
                                    {formData.faqAnswer ||
                                        "Use this section to answer common questions your customers may have before purchasing."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* About Us Section */}
            {formData.aboutUs && (
                <section className="py-16 bg-muted/30">
                    <div className="w-full text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            {formData.aboutUsTitle || "About Us"}
                        </h2>
                        <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                            {formData.aboutUsDescription ||
                                "Use this space to introduce yourself or your brand and explain what makes your offering unique."}
                        </p>
                    </div>
                </section>
            )}

            {/* Footer */}
            {formData.footer && (
                <footer className="py-12 px-4 border-t">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="space-y-4">
                            {/* Terms & Policies */}
                            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                                {formData.termsConditions && (
                                    <a href="#" className="hover:text-foreground">Terms & Conditions</a>
                                )}
                                {formData.refundPolicy && (
                                    <a href="#" className="hover:text-foreground">Refund Policy</a>
                                )}
                                {formData.privacyPolicy && (
                                    <a href="#" className="hover:text-foreground">Privacy Policy</a>
                                )}
                            </div>

                            <p className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} {formData.pageTitle}. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            )}

            {/* Contact Section - Always at bottom */}
            {(formData.phoneNumber || formData.whatsappNumber || formData.email || formData.address) && (
                <section className="py-16 bg-muted/30">
                    <div className="w-full text-center">
                        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            {formData.phoneNumber && (
                                <div className="flex items-center gap-3 justify-center">
                                    <span className="text-lg">📞</span>
                                    <a href={`tel:${formData.phoneNumber}`} className="text-lg hover:underline">
                                        {formData.phoneNumber}
                                    </a>
                                </div>
                            )}
                            {formData.whatsappNumber && (
                                <div className="flex items-center gap-3 justify-center">
                                    <span className="text-lg">💬</span>
                                    <a href={`https://wa.me/${formData.whatsappNumber.replace(/[^0-9]/g, '')}`} className="text-lg hover:underline">
                                        WhatsApp
                                    </a>
                                </div>
                            )}
                            {formData.email && (
                                <div className="flex items-center gap-3 justify-center">
                                    <span className="text-lg">✉️</span>
                                    <a href={`mailto:${formData.email}`} className="text-lg hover:underline">
                                        {formData.email}
                                    </a>
                                </div>
                            )}
                            {formData.address && (
                                <div className="flex items-center gap-3 justify-center">
                                    <span className="text-lg">📍</span>
                                    <span className="text-lg">{formData.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Tracking Scripts */}
            {formData.trackingEnabled && (
                <>
                    {formData.googleAnalyticsId && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${formData.googleAnalyticsId}');
                `,
                            }}
                        />
                    )}
                </>
            )}

            {/* Footer with Edit Button */}
            <footer className="py-8 px-4 border-t bg-muted/20">
                <div className="w-full text-center">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => {
                            alert('Edit Settings: Pricing, Terms & Policies, URL, etc.')
                        }}
                    >
                        Edit Website Settings
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                        Configure pricing, terms, policies, and more
                    </p>
                </div>
            </footer>
        </div>
    )
}
