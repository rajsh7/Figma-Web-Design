"use client"

import { CheckCircle, ExternalLink, Pencil, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"

interface SuccessPageProps {
  websiteUrl: string
  onClose: () => void
}

export function SuccessPage({ websiteUrl, onClose }: SuccessPageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.origin + websiteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fullUrl = typeof window !== 'undefined'
    ? window.location.origin + websiteUrl
    : websiteUrl

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Background with artwork */}
      <div
        className="flex-1 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-foreground/30" />

        {/* Success Card */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="bg-background rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="size-10 text-emerald-500" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold mb-2">Your website is live!</h1>
            <p className="text-muted-foreground text-sm mb-6">
              Congratulations! Your website has been successfully generated and is ready to share with the world.
            </p>

            {/* Website URL Section */}
            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium">Your Website URL</p>
              <div className="flex items-center gap-2">
                <Input
                  value={fullUrl}
                  readOnly
                  className="text-sm bg-muted/30"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-emerald-600">Copied to clipboard!</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                asChild
              >
                <Link href={websiteUrl} target="_blank">
                  <ExternalLink className="size-4" />
                  Visit Website
                </Link>
              </Button>
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={onClose}
              >
                <Pencil className="size-4" />
                Edit Content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
