"use client"

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AppSettings } from "@/hooks/use-simulated-app"
import { translations } from "@/lib/translations"

interface SettingsSheetProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
}

export function SettingsSheet({ settings }: SettingsSheetProps) {
  const t = translations[settings.language]

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader className="mb-6">
        <SheetTitle>{t.settingsTitle}</SheetTitle>
        <SheetDescription>{t.settingsDesc}</SheetDescription>
      </SheetHeader>
      
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/50 italic text-sm border-2 border-dashed rounded-lg">
        {/* 内容已移除 */}
      </div>
    </SheetContent>
  )
}
