"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Info, Check } from "lucide-react"
import { AppSettings, parseTimeToSeconds } from "@/hooks/use-simulated-app"
import { useToast } from "@/hooks/use-toast"
import { translations } from "@/lib/translations"

interface ConfigPanelProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
}

export function ConfigPanel({ settings, onUpdate }: ConfigPanelProps) {
  const { toast } = useToast()
  const [localThreshold, setLocalThreshold] = useState(settings.shutdownThreshold)
  const t = translations[settings.language]

  useEffect(() => {
    setLocalThreshold(settings.shutdownThreshold)
  }, [settings.shutdownThreshold])

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
    toast({
      title: t.toasts.configUpdated,
    })
  }

  return (
    <Card className="fluent-glass h-full">
      <CardHeader>
        <CardTitle>{t.configuration}</CardTitle>
        <CardDescription>{t.configDesc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
                className="flex-1"
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
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.timer.hint}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
