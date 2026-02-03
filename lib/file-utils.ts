export interface FileValidationResult {
  isValid: boolean
  error?: string
}

export function validateImageFile(file: File): FileValidationResult {
  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return {
      isValid: false,
      error: "File size must be less than 10MB"
    }
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: "Please select an image file"
    }
  }

  return { isValid: true }
}

export function validateFile(file: File, allowedTypes: string[] = [], maxSizeMB: number = 10): FileValidationResult {
  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`
    }
  }

  // Check file type if specified
  if (allowedTypes.length > 0) {
    const isAllowed = allowedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      return file.type.startsWith(type)
    })

    if (!isAllowed) {
      return {
        isValid: false,
        error: `Please select a valid file type: ${allowedTypes.join(', ')}`
      }
    }
  }

  return { isValid: true }
}

export function isImageFile(file: File | null): boolean {
  return file ? file.type.startsWith('image/') : false
}

export function getFilePreviewUrl(file: File): string {
  return URL.createObjectURL(file)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}