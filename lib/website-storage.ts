import type { Website, FormData as WebsiteFormData } from './types'
import { generateUniqueSlug } from './slug-generator'

const STORAGE_KEY = 'website-builder-data'

export interface StorageData {
    websites: Website[]
}

// Get all websites from localStorage
export function getWebsites(): Website[] {
    if (typeof window === 'undefined') return []

    try {
        const data = localStorage.getItem(STORAGE_KEY)
        if (!data) return []

        const parsed: StorageData = JSON.parse(data)
        return parsed.websites || []
    } catch (error) {
        console.error('Error reading from localStorage:', error)
        return []
    }
}

// Save website to localStorage
export function saveWebsite(websiteData: Partial<Website> & { formData: WebsiteFormData }): Website {
    const websites = getWebsites()
    const now = new Date().toISOString()

    if (websiteData.id) {
        // Update existing website
        const index = websites.findIndex(w => w.id === websiteData.id)
        if (index !== -1) {
            websites[index] = {
                ...websites[index],
                ...websiteData,
                updatedAt: now,
            }
            saveToStorage({ websites })
            return websites[index]
        }
    }

    // Create new website
    const existingSlugs = websites.map(w => w.slug)
    const slug = websiteData.slug || generateUniqueSlug(websiteData.formData.pageTitle || 'website', existingSlugs)

    const newWebsite: Website = {
        id: websiteData.id || generateId(),
        title: websiteData.formData.pageTitle || 'Untitled Website',
        slug,
        price: websiteData.formData.price || '₹0',
        sale: '0',
        revenue: '₹0',
        status: websiteData.published ? 'Published' : 'Draft',
        websiteType: websiteData.formData.websiteType || 'others',
        formData: websiteData.formData,
        createdAt: now,
        updatedAt: now,
        published: websiteData.published || false,
    }

    websites.push(newWebsite)
    saveToStorage({ websites })

    return newWebsite
}

// Get single website by ID
export function getWebsiteById(id: string): Website | null {
    const websites = getWebsites()
    return websites.find(w => w.id === id) || null
}

// Get website by slug
export function getWebsiteBySlug(slug: string): Website | null {
    const websites = getWebsites()
    return websites.find(w => w.slug === slug) || null
}

// Delete website
export function deleteWebsite(id: string): boolean {
    const websites = getWebsites()
    const filtered = websites.filter(w => w.id !== id)

    if (filtered.length === websites.length) {
        return false // Website not found
    }

    saveToStorage({ websites: filtered })
    return true
}

// Update website
export function updateWebsite(id: string, updates: Partial<Website>): Website | null {
    const websites = getWebsites()
    const index = websites.findIndex(w => w.id === id)

    if (index === -1) return null

    websites[index] = {
        ...websites[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    }

    saveToStorage({ websites })
    return websites[index]
}

// Helper: Save to localStorage
function saveToStorage(data: StorageData): void {
    if (typeof window === 'undefined') return

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
        console.error('Error saving to localStorage:', error)
    }
}

// Helper: Generate unique ID
function generateId(): string {
    return `website_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get websites by status
export function getWebsitesByStatus(status: 'published' | 'unpublished' | 'draft'): Website[] {
    const websites = getWebsites()

    switch (status) {
        case 'published':
            return websites.filter(w => w.published && w.status === 'Published')
        case 'unpublished':
            return websites.filter(w => !w.published || w.status !== 'Published')
        case 'draft':
            return websites.filter(w => w.status === 'Draft')
        default:
            return websites
    }
}

// Search websites
export function searchWebsites(query: string): Website[] {
    const websites = getWebsites()
    const lowerQuery = query.toLowerCase()

    return websites.filter(w =>
        w.title.toLowerCase().includes(lowerQuery) ||
        w.slug.toLowerCase().includes(lowerQuery)
    )
}
