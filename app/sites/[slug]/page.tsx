"use client"

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { getWebsiteBySlug } from '@/lib/website-storage'
import { DefaultTemplate } from '@/components/website-templates/default-template'
import type { Website } from '@/lib/types'

export default function WebsitePage() {
    const params = useParams()
    const slug = params.slug as string
    const [website, setWebsite] = useState<Website | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (slug) {
            const data = getWebsiteBySlug(slug)
            setWebsite(data)
            setLoading(false)
        }
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (!website || !website.formData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-2">404</h1>
                    <p className="text-muted-foreground">Website not found</p>
                </div>
            </div>
        )
    }

    return <DefaultTemplate website={website} />
}
