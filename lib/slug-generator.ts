export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

export function generateUniqueSlug(title: string, existingSlugs: string[]): string {
    let slug = generateSlug(title)

    if (!slug) {
        slug = 'website'
    }

    // Check if slug exists
    if (!existingSlugs.includes(slug)) {
        return slug
    }

    // Add number suffix if slug exists
    let counter = 1
    let uniqueSlug = `${slug}-${counter}`

    while (existingSlugs.includes(uniqueSlug)) {
        counter++
        uniqueSlug = `${slug}-${counter}`
    }

    return uniqueSlug
}
