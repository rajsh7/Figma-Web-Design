"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { HistoryTable } from "@/components/dashboard/history-table"
import { WebsiteTypeModal } from "@/components/wizard/website-type-modal"
import { Wizard } from "@/components/wizard/wizard"
import { useWebsites } from "@/contexts/website-context"
import type { WebsiteType } from "@/lib/types"

export default function DashboardPage() {
  const { websites, deleteWebsite } = useWebsites()
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [selectedType, setSelectedType] = useState<WebsiteType | null>(null)
  const [showWizard, setShowWizard] = useState(false)

  const handleCreateWebsite = () => {
    setShowTypeModal(true)
  }

  const handleSelectType = (type: WebsiteType) => {
    setSelectedType(type)
    setShowTypeModal(false)
    setShowWizard(true)
  }

  const handleCloseWizard = () => {
    setShowWizard(false)
    setSelectedType(null)
  }

  const handleDeleteWebsite = (id: string) => {
    if (confirm('Are you sure you want to delete this website?')) {
      deleteWebsite(id)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateWebsite={handleCreateWebsite} />
      <HistoryTable
        websites={websites}
        onDeleteWebsite={handleDeleteWebsite}
      />

      {/* Website Type Selection Modal */}
      <WebsiteTypeModal
        open={showTypeModal}
        onOpenChange={setShowTypeModal}
        onSelect={handleSelectType}
      />

      {/* Wizard */}
      {showWizard && selectedType && (
        <Wizard websiteType={selectedType} onClose={handleCloseWizard} />
      )}
    </div>
  )
}
