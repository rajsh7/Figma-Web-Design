"use client"

import React from "react"

import { X, Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface WizardLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  stepLabel: string
  onClose: () => void
  onPublish?: () => void
  showPublish?: boolean
  preview?: React.ReactNode
}

export function WizardLayout({
  children,
  currentStep,
  totalSteps,
  stepLabel,
  onClose,
  onPublish,
  showPublish = false,
  preview,
}: WizardLayoutProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col md:flex-row">
      {/* Preview Panel */}
      <div className="hidden md:flex flex-1 bg-muted/50 items-center justify-center p-8 overflow-y-auto">
        <div 
          className={cn(
            "bg-background rounded-lg shadow-2xl overflow-y-auto transition-all duration-300 h-full",
            viewMode === "desktop" ? "w-full max-w-6xl" : "w-[32rem]"
          )}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-1.5 p-3 border-b">
              <div className="size-2.5 rounded-full bg-destructive" />
              <div className="size-2.5 rounded-full bg-amber-400" />
              <div className="size-2.5 rounded-full bg-emerald-400" />
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-1">
                  <button 
                    onClick={() => setViewMode("desktop")}
                    className={cn(
                      "p-1 rounded",
                      viewMode === "desktop" && "bg-background shadow-sm"
                    )}
                  >
                    <Monitor className="size-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode("mobile")}
                    className={cn(
                      "p-1 rounded",
                      viewMode === "mobile" && "bg-background shadow-sm"
                    )}
                  >
                    <Smartphone className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-muted/5">
              {preview ? (
                <div className="h-full w-full flex justify-center items-start">
                  <div
                    className={cn(
                      "origin-top transform",
                      viewMode === "desktop" ? "scale-[1.0]" : "scale-[1.0]"
                    )}
                  >
                    {preview}
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2">Start customizing your page</h2>
                    <p className="text-sm text-muted-foreground">
                      As you fill in the steps on the right, a live preview of your page will appear here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full md:w-[480px] bg-background md:border-l flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="hover:bg-muted rounded-md p-1">
              <X className="size-5" />
            </button>
            <span className="text-sm font-medium">New Page</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Preview toggle (mobile only) */}
            <div className="md:hidden">
              <div className="flex items-center gap-2 bg-muted rounded-md px-2 py-1">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={cn(
                    "p-1 rounded",
                    viewMode === "desktop" && "bg-background shadow-sm"
                  )}
                  aria-label="Desktop preview"
                >
                  <Monitor className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={cn(
                    "p-1 rounded",
                    viewMode === "mobile" && "bg-background shadow-sm"
                  )}
                  aria-label="Mobile preview"
                >
                  <Smartphone className="size-4" />
                </button>
              </div>
            </div>

            {/* Step indicator */}
            <div className="hidden sm:flex items-center gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    i < currentStep ? "bg-foreground" : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="hidden sm:inline text-sm text-muted-foreground">{stepLabel}</span>
            {showPublish && (
              <Button
                onClick={onPublish}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90 ml-2"
                size="sm"
              >
                Publish page
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
