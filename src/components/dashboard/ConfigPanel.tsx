
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Megaphone, Timer, Palette, Info, Check, Moon, Sun, Languages } from "lucide-react"
import { AppSettings, parseTimeToSeconds } from "@/hooks/use-simulated-app"
import { useToast } from "@/hooks/use-toast"
import { translations, Language } from "@/lib/translations"

interface ConfigPanelProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
  isDarkMode: boolean
  setIsDarkMode: (val: boolean) => void
}

export function ConfigPanel({ settings, onUpdate, isDarkMode, setIsDarkMode }: ConfigPanelProps) {
  const { toast } = useToast()
  const [localThreshold, setLocalThreshold] = useState(settings.shutdownThreshold)
  const t = translations[settings.language]

  useEffect(() => {
    setLocalThreshold(settings.shutdownThreshold)
  }, [settings.shutdownThreshold])

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

  const totalSeconds = parseTimeToSeconds(settings.shutdownThreshold)
  const formatSeconds = (s: number) => {
    const d = Math.floor(s / 86400)
    const h = Math.floor((s % 86400) / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    const parts = []
    if (d > 0) parts.push(`${d}d`)
    if (h > 0) parts.push(`${h}h`)
    if (m > 0) parts.push(`${m}m`)
    parts.push(`${sec}s`)
    return parts.join(' ')
  }

  const handleApplyThreshold = () => {
    const trimmed = localThreshold.trim()
    
    if (!trimmed) {
      toast({
        variant: "destructive",
        title: t.toasts.inputRequired,
        description: t.toasts.inputRequiredDesc,
      })
      return
    }

    if (/^\d+$/.test(trimmed)) {
      onUpdate({ shutdownThreshold: trimmed })
      return
    }

    const parts = trimmed.split(/\s+/)
    const validUnits = ['s', 'm', 'h', 'd']
    let isValid = true
    let offendingPart = ""

    for (const part of parts) {
      const match = part.match(/^(\d+)([a-zA-Z]*)$/)
      
      if (!match) {
        isValid = false
        offendingPart = part
        break
      }

      const unit = match[2].toLowerCase()
      if (unit !== "" && !validUnits.includes(unit)) {
        isValid = false
        offendingPart = part
        break
      }
    }

    if (!isValid) {
      toast({
        variant: "destructive",
        title: t.toasts.invalidUnit,
        description: t.toasts.invalidUnitDesc.replace("{{part}}", offendingPart),
      })
      return
    }

    onUpdate({ shutdownThreshold: trimmed })
  }

  return (
    <Card className="fluent-glass">
      <CardHeader>
        <CardTitle>{t.configuration}</CardTitle>
        <CardDescription>{t.configDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timer" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="timer"><Timer className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">{t.tabs.timer}</span></TabsTrigger>
            <TabsTrigger value="github"><Github className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">{t.tabs.github}</span></TabsTrigger>
            <TabsTrigger value="announcements"><Megaphone className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">{t.tabs.announcements}</span></TabsTrigger>
            <TabsTrigger value="theme"><Palette className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">{t.tabs.theme}</span></TabsTrigger>
            <TabsTrigger value="language"><Languages className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">{t.tabs.language}</span></TabsTrigger>
          </TabsList>

          <TabsContent value="timer" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">{t.timer.label}</Label>
              <div className="flex gap-2">
                <Input
                  id="threshold"
                  value={localThreshold}
                  onChange={(e) => setLocalThreshold(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyThreshold()}
                  placeholder={t.timer.placeholder}
                  className="flex-1"
                />
                <Button onClick={handleApplyThreshold} size="sm" className="gap-2">
                  <Check className="h-4 w-4" />
                  {t.timer.confirm}
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <Info className="h-3 w-3" />
                <span>{t.timer.currentlyActive}: <strong>{formatSeconds(totalSeconds)}</strong></span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.timer.hint}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-4 pt-4">
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

          <TabsContent value="announcements" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
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
                className="min-h-[100px]" 
                value={settings.announcementContent}
                onChange={(e) => onUpdate({ announcementContent: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="theme" className="space-y-6 pt-4">
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

            <div className="space-y-3">
              <Label className="text-base">{t.theme.accentColor}</Label>
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => (
                    <Tooltip key={color.value}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onUpdate({ accentColor: color.value })}
                          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${settings.accentColor === color.value ? 'border-foreground' : 'border-transparent'}`}
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

          <TabsContent value="language" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>{t.language.label}</Label>
              <Select 
                value={settings.language} 
                onValueChange={(val: Language) => onUpdate({ language: val })}
              >
                <SelectTrigger>
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
      </CardContent>
    </Card>
  )
}
