"use client"

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

    const buttonStyle = {
        backgroundColor: formData.buttonColor || '#000000',
        color: formData.textColor || '#FFFFFF',
    }

    return (
        <div className={`min-h-screen ${formData.darkTheme ? 'dark bg-gray-900' : 'bg-white'}`}>
            {/* Hero Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Cover Image */}
                    {formData.coverImageUrl && (
                        <div className="mb-8">
                            <img
                                src={formData.coverImageUrl}
                                alt={formData.pageTitle}
                                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg object-cover"
                                style={{ maxHeight: '400px' }}
                            />
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {formData.pageTitle}
                    </h1>

                    {/* Category Badge */}
                    {formData.category && (
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                                {formData.category}
                            </span>
                        </div>
                    )}

                    {/* Description */}
                    {formData.description && (
                        <div className="prose prose-lg mx-auto mb-8 max-w-2xl">
                            <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                                {formData.description}
                            </p>
                        </div>
                    )}

                    {/* Pricing */}
                    {formData.price && formData.pricingType === 'fixed' && (
                        <div className="mb-8">
                            <div className="text-3xl font-bold mb-2">
                                {formData.discountPrice && (
                                    <span className="text-muted-foreground line-through mr-3">
                                        {formData.price}
                                    </span>
                                )}
                                <span>{formData.discountPrice || formData.price}</span>
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
            {formData.showProduct && formData.productTitle && (
                <section className="py-16 px-4 bg-muted/30">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">{formData.productTitle}</h2>
                        {formData.productDescription && (
                            <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                                {formData.productDescription}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            {formData.gallery && formData.galleryTitle && (
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">{formData.galleryTitle}</h2>
                        {formData.galleryCoverImageUrl && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <img
                                    src={formData.galleryCoverImageUrl}
                                    alt="Gallery"
                                    className="rounded-lg shadow-md w-full h-64 object-cover"
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Testimonial Section */}
            {formData.testimonial && formData.testimonialComment && (
                <section className="py-16 px-4 bg-muted/30">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>
                        <div className="bg-background rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                            <div className="flex items-start gap-4">
                                {formData.testimonialImageUrl && (
                                    <img
                                        src={formData.testimonialImageUrl}
                                        alt={formData.testimonialName}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <p className="text-lg mb-4 italic">"{formData.testimonialComment}"</p>
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
            {formData.faq && formData.faqQuestion && (
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div className="bg-muted/30 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-3">{formData.faqQuestion}</h3>
                                {formData.faqAnswer && (
                                    <p className="text-muted-foreground">{formData.faqAnswer}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* About Us Section */}
            {formData.aboutUs && (
                <section className="py-16 px-4 bg-muted/30">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">About Us</h2>
                        <p className="text-lg text-muted-foreground">
                            Learn more about our mission and values.
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
        </div>
    )
}
