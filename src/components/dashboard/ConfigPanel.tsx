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
import { Github, Megaphone, Timer, Palette, Info, Check, Moon, Sun } from "lucide-react"
import { AppSettings, parseTimeToSeconds } from "@/hooks/use-simulated-app"
import { useToast } from "@/hooks/use-toast"

interface ConfigPanelProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
  isDarkMode: boolean
  setIsDarkMode: (val: boolean) => void
}

export function ConfigPanel({ settings, onUpdate, isDarkMode, setIsDarkMode }: ConfigPanelProps) {
  const { toast } = useToast()
  const [localThreshold, setLocalThreshold] = useState(settings.shutdownThreshold)

  useEffect(() => {
    setLocalThreshold(settings.shutdownThreshold)
  }, [settings.shutdownThreshold])

  const accentColors = [
    { name: '粉色', value: '#f6329a' },
    { name: '呆样橙色', value: '#ff6900' },
    { name: '红色', value: '#fb2c36' },
    { name: '琥珀色', value: '#fe9a00' },
    { name: '黄色', value: '#f0b100' },
    { name: '青柠色', value: '#7ccf00' },
    { name: '绿色', value: '#00c950' },
    { name: '翡翠色', value: '#00bc7d' },
    { name: '蓝绿色', value: '#00bba7' },
    { name: '青色', value: '#00b8db' },
    { name: '天蓝色', value: '#00a6f4' },
    { name: '蓝色', value: '#2b7fff' },
    { name: '靛蓝色', value: '#615fff' },
    { name: '紫罗兰色', value: '#8e51ff' },
    { name: '紫色', value: '#ad46ff' },
    { name: '紫红色', value: '#e12afb' },
    { name: '玫瑰色', value: '#ff2056' },
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
    if (sec > 0 || parts.length === 0) parts.push(`${sec}s`)
    return parts.join(' ')
  }

  const handleApplyThreshold = () => {
    const trimmed = localThreshold.trim()
    
    if (!trimmed) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please enter an inactivity threshold.",
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
        title: "Invalid Unit Detected",
        description: `The part "${offendingPart}" is invalid. Please use s, m, h, or d.`,
      })
      return
    }

    onUpdate({ shutdownThreshold: trimmed })
  }

  return (
    <Card className="fluent-glass">
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>Setup automated shutdown and notification parameters.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timer" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timer"><Timer className="h-4 w-4 mr-2" /> Timer</TabsTrigger>
            <TabsTrigger value="github"><Github className="h-4 w-4 mr-2" /> GitHub</TabsTrigger>
            <TabsTrigger value="announcements"><Megaphone className="h-4 w-4 mr-2" /> Push</TabsTrigger>
            <TabsTrigger value="theme"><Palette className="h-4 w-4 mr-2" /> Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="timer" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">Inactivity Threshold</Label>
              <div className="flex gap-2">
                <Input
                  id="threshold"
                  value={localThreshold}
                  onChange={(e) => setLocalThreshold(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyThreshold()}
                  placeholder="e.g. 1d 12h 30m"
                  className="flex-1"
                />
                <Button onClick={handleApplyThreshold} size="sm" className="gap-2">
                  <Check className="h-4 w-4" />
                  Confirm
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <Info className="h-3 w-3" />
                <span>Currently active: <strong>{formatSeconds(totalSeconds)}</strong></span>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported units: <strong>s</strong> (seconds), <strong>m</strong> (minutes), <strong>h</strong> (hours), <strong>d</strong> (days). 
                If no unit is specified, <strong>seconds (s)</strong> are used.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Repository URL</Label>
              <Input 
                value={settings.githubRepo} 
                onChange={(e) => onUpdate({ githubRepo: e.target.value })}
                placeholder="https://github.com/..." 
              />
            </div>
            <div className="space-y-2">
              <Label>Access Token (Simulated)</Label>
              <Input 
                type="password" 
                value={settings.githubToken} 
                onChange={(e) => onUpdate({ githubToken: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Used to push server archive when shutting down.</p>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>QQ Group ID</Label>
                <Input value={settings.qqGroup} onChange={(e) => onUpdate({ qqGroup: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input value={settings.websiteUrl} onChange={(e) => onUpdate({ websiteUrl: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Shutdown Message</Label>
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
                <Label className="text-base">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Switch between light and dark themes.</p>
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
              <Label className="text-base">Primary Accent Color</Label>
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
                        <p>{color.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
