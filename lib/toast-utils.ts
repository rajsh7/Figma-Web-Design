import { toast } from "sonner"

export function showFileUploadSuccess(fileName: string) {
  toast.success(`File uploaded successfully: ${fileName}`)
}

export function showFileUploadError(error: string) {
  toast.error(`Upload failed: ${error}`)
}

export function showLinkAddedSuccess() {
  toast.success("Link added successfully")
}

export function showLinkAddedError(error: string) {
  toast.error(`Link error: ${error}`)
}