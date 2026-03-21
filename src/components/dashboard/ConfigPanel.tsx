"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Check, Clock, Palette, Languages, Moon, Sun } from "lucide-react"
import { AppSettings, parseTimeToSeconds } from "@/hooks/use-simulated-app"
import { useToast } from "@/hooks/use-toast"
import { translations } from "@/lib/translations"

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
      toast({ variant: "destructive", title: t.toasts.inputRequired, description: t.toasts.inputRequiredDesc })
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
      if (!match) { isValid = false; offendingPart = part; break }
      const unit = match[2].toLowerCase()
      if (unit !== "" && !validUnits.includes(unit)) { isValid = false; offendingPart = part; break }
    }
    if (!isValid) {
      toast({ variant: "destructive", title: t.toasts.invalidUnit, description: t.toasts.invalidUnitDesc.replace("{{part}}", offendingPart) })
      return
    }
    onUpdate({ shutdownThreshold: trimmed })
    toast({ title: t.toasts.configUpdated })
  }

  return (
    <div className="space-y-6">
      {/* Timer Configuration Card */}
      <Card className="fluent-glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {t.tabs.timer}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">{t.timer.label}</Label>
              <div className="flex gap-2">
                <Input
                  id="threshold"
                  value={localThreshold}
                  onChange={(e) => setLocalThreshold(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyThreshold()}
                  placeholder={t.timer.placeholder}
                />
                <Button onClick={handleApplyThreshold} size="sm" className="gap-2">
                  <Check className="h-4 w-4" />
                  {t.timer.confirm}
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <Info className="h-4 w-4 text-primary" />
                <span>{t.timer.currentlyActive}: <strong className="text-foreground">{formatSeconds(totalSeconds)}</strong></span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2 italic">
                {t.timer.hint}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme / Appearance Card */}
      <Card className="fluent-glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            {t.tabs.theme}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">{t.theme.darkMode}</Label>
              </div>
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-yellow-500" />}
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={setIsDarkMode} 
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold">{t.theme.accentColor}</Label>
              <TooltipProvider>
                <div className="grid grid-cols-6 gap-2">
                  {accentColors.map((color) => (
                    <Tooltip key={color.value}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onUpdate({ accentColor: color.value })}
                          className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${settings.accentColor === color.value ? 'border-foreground shadow-md' : 'border-transparent'}`}
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
          </div>
        </CardContent>
      </Card>

      {/* Language Selection Card */}
      <Card className="fluent-glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            {t.tabs.language}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant={settings.language === 'zh' ? 'default' : 'outline'}
              onClick={() => onUpdate({ language: 'zh' })}
              className="w-full text-xs sm:text-sm"
            >
              简体中文
            </Button>
            <Button 
              variant={settings.language === 'ja' ? 'default' : 'outline'}
              onClick={() => onUpdate({ language: 'ja' })}
              className="w-full text-xs sm:text-sm"
            >
              日本語
            </Button>
            <Button 
              variant={settings.language === 'en' ? 'default' : 'outline'}
              onClick={() => onUpdate({ language: 'en' })}
              className="w-full text-xs sm:text-sm"
            >
              English
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
