
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Github, Megaphone, Timer, Palette } from "lucide-react"
import { AppSettings } from "@/hooks/use-simulated-app"

interface ConfigPanelProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
}

export function ConfigPanel({ settings, onUpdate }: ConfigPanelProps) {
  const accentColors = [
    { name: 'Default Blue', value: '#0078D4' },
    { name: 'Cyan', value: '#00B7C3' },
    { name: 'Purple', value: '#8764B8' },
    { name: 'Pink', value: '#E1306C' },
    { name: 'Orange', value: '#D83B01' },
    { name: 'Green', value: '#107C10' },
  ]

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
              <Label>Inactivity Threshold (Hours)</Label>
              <div className="flex gap-4 items-center">
                <Slider
                  value={[settings.shutdownThreshold]}
                  onValueChange={(val) => onUpdate({ shutdownThreshold: val[0] })}
                  max={168}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-center font-bold">{settings.shutdownThreshold}h</span>
              </div>
              <p className="text-xs text-muted-foreground">The server will automatically shut down if 0 players are detected for this duration.</p>
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
