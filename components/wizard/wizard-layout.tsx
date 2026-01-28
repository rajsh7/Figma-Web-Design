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
}

export function WizardLayout({
  children,
  currentStep,
  totalSteps,
  stepLabel,
  onClose,
  onPublish,
  showPublish = false,
}: WizardLayoutProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  return (
    <div className="fixed inset-0 bg-background z-50 flex">
      {/* Preview Panel */}
      <div className="flex-1 bg-muted/50 flex items-center justify-center p-8">
        <div 
          className={cn(
            "bg-background rounded-lg shadow-2xl overflow-hidden transition-all duration-300",
            viewMode === "desktop" ? "w-full max-w-2xl aspect-[16/10]" : "w-80 aspect-[9/16]"
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
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">What kind of website you would like to make</h2>
                <p className="text-sm text-muted-foreground">We will customise your experience accordingly</p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-20 h-16 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                    <div className="w-8 h-6 bg-background/20 rounded" />
                  </div>
                  <div className="w-20 h-16 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <div className="w-8 h-6 bg-background/20 rounded" />
                  </div>
                  <div className="w-20 h-16 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <div className="w-8 h-6 bg-background/20 rounded" />
                  </div>
                </div>
                <Button className="mt-6 rounded-full bg-teal-500 hover:bg-teal-600 text-background">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-[480px] bg-background border-l flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="hover:bg-muted rounded-md p-1">
              <X className="size-5" />
            </button>
            <span className="text-sm font-medium">New Page</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Step indicator */}
            <div className="flex items-center gap-1.5">
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
            <span className="text-sm text-muted-foreground">{stepLabel}</span>
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
