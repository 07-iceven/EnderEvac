"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Megaphone, Timer, Palette, Info, Check, AlertCircle } from "lucide-react"
import { AppSettings, parseTimeToSeconds } from "@/hooks/use-simulated-app"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

interface ConfigPanelProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
}

export function ConfigPanel({ settings, onUpdate }: ConfigPanelProps) {
  const { toast } = useToast()
  const [localThreshold, setLocalThreshold] = useState(settings.shutdownThreshold)

  useEffect(() => {
    setLocalThreshold(settings.shutdownThreshold)
  }, [settings.shutdownThreshold])

  const accentColors = [
    { name: 'Default Blue', value: '#0078D4' },
    { name: 'Cyan', value: '#00B7C3' },
    { name: 'Purple', value: '#8764B8' },
    { name: 'Pink', value: '#E1306C' },
    { name: 'Orange', value: '#D83B01' },
    { name: 'Green', value: '#107C10' },
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

    // Detect characters that are not digits, spaces, or s, m, h, d
    const invalidChars = trimmed.match(/[^0-9\s-smhd]/gi)
    if (invalidChars) {
      const uniqueInvalids = Array.from(new Set(invalidChars))
      toast({
        variant: "destructive",
        title: "Invalid Unit Detected",
        description: `Unsupported character(s): ${uniqueInvalids.join(', ')}. Use only s, m, h, or d.`,
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
            
            <Alert className="bg-primary/5 border-primary/20">
              <Timer className="h-4 w-4" />
              <AlertTitle className="text-xs font-bold">Logic Explanation</AlertTitle>
              <AlertDescription className="text-xs">
                The server automatically powers down once the idle timer matches the confirmed value.
              </AlertDescription>
            </Alert>
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

          <TabsContent value="theme" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Primary Accent Color</Label>
              <div className="flex flex-wrap gap-2">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onUpdate({ accentColor: color.value })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${settings.accentColor === color.value ? 'border-foreground' : 'border-transparent'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
                <div className="relative">
                  <input 
                    type="color" 
                    value={settings.accentColor}
                    onChange={(e) => onUpdate({ accentColor: e.target.value })}
                    className="w-8 h-8 rounded-full bg-transparent border-none cursor-pointer p-0 overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}