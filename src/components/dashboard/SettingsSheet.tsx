"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Github, Megaphone } from "lucide-react"
import { AppSettings } from "@/hooks/use-simulated-app"
import { translations } from "@/lib/translations"

interface SettingsSheetProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
}

export function SettingsSheet({ settings, onUpdate }: SettingsSheetProps) {
  const t = translations[settings.language]

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader className="mb-6">
        <SheetTitle>{t.settingsTitle}</SheetTitle>
        <SheetDescription>{t.settingsDesc}</SheetDescription>
      </SheetHeader>

      <Tabs defaultValue="github" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="github" className="gap-2">
            <Github className="h-4 w-4" />
            {t.tabs.github}
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-2">
            <Megaphone className="h-4 w-4" />
            {t.tabs.announcements}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="github" className="space-y-6">
          <div className="space-y-2">
            <Label>{t.github.repo}</Label>
            <Input 
              value={settings.githubRepo} 
              onChange={(e) => onUpdate({ githubRepo: e.target.value })}
              placeholder="https://github.com/..." 
            />
          </div>
          <div className="space-y-2">
            <Label>{t.github.token}</Label>
            <Input 
              type="password" 
              value={settings.githubToken} 
              onChange={(e) => onUpdate({ githubToken: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">{t.github.hint}</p>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label>{t.push.qq}</Label>
              <Input value={settings.qqGroup} onChange={(e) => onUpdate({ qqGroup: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t.push.website}</Label>
              <Input value={settings.websiteUrl} onChange={(e) => onUpdate({ websiteUrl: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t.push.message}</Label>
            <Textarea 
              className="min-h-[120px]" 
              value={settings.announcementContent}
              onChange={(e) => onUpdate({ announcementContent: e.target.value })}
            />
          </div>
        </TabsContent>
      </Tabs>
    </SheetContent>
  )
}
