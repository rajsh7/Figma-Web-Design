"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Website, FormData as WebsiteFormData } from '@/lib/types'
import {
    getWebsites,
    saveWebsite as saveWebsiteToStorage,
    deleteWebsite as deleteWebsiteFromStorage,
    updateWebsite as updateWebsiteInStorage,
    getWebsitesByStatus,
    searchWebsites as searchWebsitesInStorage,
} from '@/lib/website-storage'

interface WebsiteContextType {
    websites: Website[]
    loading: boolean
    addWebsite: (formData: WebsiteFormData, published?: boolean) => Website
    updateWebsite: (id: string, updates: Partial<Website>) => void
    deleteWebsite: (id: string) => void
    getWebsiteById: (id: string) => Website | undefined
    filterByStatus: (status: 'published' | 'unpublished' | 'draft' | 'all') => Website[]
    searchWebsites: (query: string) => Website[]
    refreshWebsites: () => void
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined)

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
    const [websites, setWebsites] = useState<Website[]>([])
    const [loading, setLoading] = useState(true)

    // Load websites on mount
    useEffect(() => {
        const loadWebsites = () => {
            const loadedWebsites = getWebsites()
            setWebsites(loadedWebsites)
            setLoading(false)
        }

        loadWebsites()
    }, [])

    const refreshWebsites = useCallback(() => {
        const loadedWebsites = getWebsites()
        setWebsites(loadedWebsites)
    }, [])

    const addWebsite = useCallback((formData: WebsiteFormData, published = false) => {
        const newWebsite = saveWebsiteToStorage({ formData, published })
        setWebsites(prev => [...prev, newWebsite])
        return newWebsite
    }, [])

    const updateWebsite = useCallback((id: string, updates: Partial<Website>) => {
        const updated = updateWebsiteInStorage(id, updates)
        if (updated) {
            setWebsites(prev => prev.map(w => w.id === id ? updated : w))
        }
    }, [])

    const deleteWebsite = useCallback((id: string) => {
        const success = deleteWebsiteFromStorage(id)
        if (success) {
            setWebsites(prev => prev.filter(w => w.id !== id))
        }
    }, [])

    const getWebsiteById = useCallback((id: string) => {
        return websites.find(w => w.id === id)
    }, [websites])

    const filterByStatus = useCallback((status: 'published' | 'unpublished' | 'draft' | 'all') => {
        if (status === 'all') return websites
        return getWebsitesByStatus(status)
    }, [websites])

    const searchWebsites = useCallback((query: string) => {
        if (!query.trim()) return websites
        return searchWebsitesInStorage(query)
    }, [websites])

    const value: WebsiteContextType = {
        websites,
        loading,
        addWebsite,
        updateWebsite,
        deleteWebsite,
        getWebsiteById,
        filterByStatus,
        searchWebsites,
        refreshWebsites,
    }

    return (
        <WebsiteContext.Provider value={value}>
            {children}
        </WebsiteContext.Provider>
    )
}

export function useWebsites() {
    const context = useContext(WebsiteContext)
    if (context === undefined) {
        throw new Error('useWebsites must be used within a WebsiteProvider')
    }
    return context
}
