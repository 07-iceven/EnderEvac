"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Info, Check, Clock, Palette, Languages, Moon, Sun, Settings2 } from "lucide-react"
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
  const [hoveredColorName, setHoveredColorName] = useState<string | null>(null)
  const t = translations[settings.language]

  // RGB Local State
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 })

  useEffect(() => {
    setLocalThreshold(settings.shutdownThreshold)
  }, [settings.shutdownThreshold])

  // Sync RGB state from settings hex
  useEffect(() => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(settings.accentColor);
    if (result) {
      setRgb({
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      });
    }
  }, [settings.accentColor])

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

  // Optimized color picking logic to avoid lag
  const updateColorPreview = (hex: string) => {
    const root = window.document.documentElement
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    } else {
      s = 0
    }
    root.style.setProperty('--user-accent-h', `${Math.round(h * 360)}`)
    root.style.setProperty('--user-accent-s', `${Math.round(s * 100)}%`)
    root.style.setProperty('--user-accent-l', `${Math.round(l * 100)}%`)
  }

  const handleRgbInputChange = (channel: 'r' | 'g' | 'b', value: string) => {
    let num = parseInt(value) || 0;
    if (num < 0) num = 0;
    if (num > 255) num = 255;
    
    const newRgb = { ...rgb, [channel]: num };
    setRgb(newRgb);
    
    // Direct DOM update for performance
    const hex = "#" + ((1 << 24) + (newRgb.r << 16) + (newRgb.g << 8) + newRgb.b).toString(16).slice(1);
    updateColorPreview(hex);
  };

  const saveRgbSettings = () => {
    const hex = "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
    onUpdate({ accentColor: hex });
  };

  const isCustomColorActive = !accentColors.some(c => c.value.toLowerCase() === settings.accentColor.toLowerCase());
  
  const activeColor = accentColors.find(c => c.value.toLowerCase() === settings.accentColor.toLowerCase());
  const activeColorName = activeColor ? activeColor.name[settings.language] : t.theme.customColor;
  const currentDisplayColorName = hoveredColorName || activeColorName;

  return (
    <div className="space-y-6">
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
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 mt-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground leading-none mb-1">{t.timer.currentlyActive}</span>
                  <span className="text-lg font-mono font-bold text-foreground leading-none">{formatSeconds(totalSeconds)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mt-2 italic">
                {t.timer.hint}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">{t.theme.accentColor}</Label>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider transition-all duration-200">
                  {currentDisplayColorName}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onUpdate({ accentColor: color.value })}
                    onMouseEnter={() => {
                      updateColorPreview(color.value);
                      setHoveredColorName(color.name[settings.language]);
                    }}
                    onMouseLeave={() => {
                      updateColorPreview(settings.accentColor);
                      setHoveredColorName(null);
                    }}
                    className={`w-8 h-8 rounded-full transition-all hover:scale-110 active:scale-95 outline-none ${settings.accentColor.toLowerCase() === color.value.toLowerCase() ? 'ring-2 ring-primary ring-offset-2 shadow-md' : 'ring-1 ring-border/50'}`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}

                {/* Custom Color Popover Trigger */}
                <Popover onOpenChange={(open) => !open && saveRgbSettings()}>
                  <PopoverTrigger asChild>
                    <button
                      onMouseEnter={() => setHoveredColorName(t.theme.customColor)}
                      onMouseLeave={() => setHoveredColorName(null)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 outline-none ${isCustomColorActive ? 'ring-2 ring-primary ring-offset-2 shadow-md' : 'bg-muted ring-1 ring-border/50'}`}
                      style={isCustomColorActive ? { backgroundColor: settings.accentColor } : {}}
                    >
                      <Settings2 className={`h-4 w-4 ${isCustomColorActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-4" side="top" sideOffset={12}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.theme.customColor}</Label>
                        <div 
                          className="w-8 h-4 rounded border" 
                          style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <Label className="text-[10px] font-mono uppercase text-muted-foreground">{t.theme.rgb.r}</Label>
                          <Input 
                            type="number"
                            value={rgb.r}
                            onChange={(e) => handleRgbInputChange('r', e.target.value)}
                            className="h-8 px-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-mono uppercase text-muted-foreground">{t.theme.rgb.g}</Label>
                          <Input 
                            type="number"
                            value={rgb.g}
                            onChange={(e) => handleRgbInputChange('g', e.target.value)}
                            className="h-8 px-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-mono uppercase text-muted-foreground">{t.theme.rgb.b}</Label>
                          <Input 
                            type="number"
                            value={rgb.b}
                            onChange={(e) => handleRgbInputChange('b', e.target.value)}
                            className="h-8 px-2 text-xs"
                          />
                        </div>
                      </div>
                      <Button size="sm" className="w-full h-8 text-xs" onClick={saveRgbSettings}>
                        {t.timer.confirm}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
