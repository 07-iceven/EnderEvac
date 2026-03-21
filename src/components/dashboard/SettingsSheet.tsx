"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Github, Megaphone, Palette, Moon, Sun, Languages } from "lucide-react"
import { AppSettings } from "@/hooks/use-simulated-app"
import { translations, Language } from "@/lib/translations"

interface SettingsSheetProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
  isDarkMode: boolean
  setIsDarkMode: (val: boolean) => void
}

export function SettingsSheet({ settings, onUpdate, isDarkMode, setIsDarkMode }: SettingsSheetProps) {
  const t = translations[settings.language]

  const accentColors = [
    { name: { en: 'Pink', zh: '粉色', ja: 'ピンク' }, value: '#f6329a' },
    { name: { en: 'Orange', zh: '呆样橙色', ja: 'オレンジ' }, value: '#ff6900' },
    { name: { en: 'Red', zh: '红色', ja: 'レッド' }, value: '#fb2c36' },
    { name: { en: 'Amber', zh: '琥珀色', ja: 'アンバー' }, value: '#fe9a00' },
    { name: { en: 'Yellow', zh: '黄色', ja: 'イエロー' }, value: '#f0b100' },
    { name: { en: 'Lime', zh: '青柠色', ja: 'ライム' }, value: '#7ccf00' },
    { name: { en: 'Green', zh: '绿色', ja: 'グリーン' }, value: '#00c950' },
    { name: { en: 'Emerald', zh: '翡翠色', ja: 'エメラルド' }, value: '#00bc7d' },
    { name: { en: 'Teal', zh: '蓝绿色', ja: 'ティール' }, value: '#00bba7' },
    { name: { en: 'Cyan', zh: '青色', ja: 'シアン' }, value: '#00b8db' },
    { name: { en: 'Sky', zh: '天蓝色', ja: 'スカイ' }, value: '#00a6f4' },
    { name: { en: 'Blue', zh: '蓝色', ja: 'ブルー' }, value: '#2b7fff' },
    { name: { en: 'Indigo', zh: '靛蓝色', ja: 'インディゴ' }, value: '#615fff' },
    { name: { en: 'Violet', zh: '紫罗兰色', ja: 'バイオレット' }, value: '#8e51ff' },
    { name: { en: 'Purple', zh: '紫色', ja: 'パープル' }, value: '#ad46ff' },
    { name: { en: 'Fuchsia', zh: '紫红色', ja: 'マゼンタ' }, value: '#e12afb' },
    { name: { en: 'Rose', zh: '玫瑰色', ja: 'ローズ' }, value: '#ff2056' },
  ]

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader className="mb-6">
        <SheetTitle>{t.settingsTitle}</SheetTitle>
        <SheetDescription>{t.settingsDesc}</SheetDescription>
      </SheetHeader>

      <Tabs defaultValue="github" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="github" title={t.tabs.github}><Github className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="announcements" title={t.tabs.announcements}><Megaphone className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="theme" title={t.tabs.theme}><Palette className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="language" title={t.tabs.language}><Languages className="h-4 w-4" /></TabsTrigger>
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

        <TabsContent value="theme" className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">{t.theme.darkMode}</Label>
              <p className="text-xs text-muted-foreground">{t.theme.darkModeDesc}</p>
            </div>
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-yellow-500" />}
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={setIsDarkMode} 
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base">{t.theme.accentColor}</Label>
            <TooltipProvider>
              <div className="grid grid-cols-6 gap-3">
                {accentColors.map((color) => (
                  <Tooltip key={color.value}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onUpdate({ accentColor: color.value })}
                        className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${settings.accentColor === color.value ? 'border-foreground shadow-md' : 'border-transparent'}`}
                        style={{ backgroundColor: color.value }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color.name[settings.language]}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <div className="space-y-2">
            <Label>{t.language.label}</Label>
            <Select 
              value={settings.language} 
              onValueChange={(val: Language) => onUpdate({ language: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.language.select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh">简体中文 (Chinese)</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ja">日本語 (Japanese)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </SheetContent>
  )
}
