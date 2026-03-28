"use client"

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AppSettings } from "@/hooks/use-simulated-app"
import { translations } from "@/lib/translations"
import { Activity, Clock, Users, Timer, RotateCcw, Zap, Keyboard } from "lucide-react"

interface SettingsSheetProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
  playerCount: number
  setPlayerCount: (val: number) => void
  uptimeSeconds: number
  setUptimeSeconds: (val: number) => void
  timeSinceLastPlayer: number
  setTimeSinceLastPlayer: (val: number) => void
  isOnline: boolean
  setIsOnline: (val: boolean) => void
  resetSimulation: () => void
}

export function SettingsSheet({ 
  settings, 
  onUpdate, 
  playerCount, 
  setPlayerCount, 
  uptimeSeconds, 
  setUptimeSeconds,
  timeSinceLastPlayer,
  setTimeSinceLastPlayer,
  isOnline,
  setIsOnline,
  resetSimulation
}: SettingsSheetProps) {
  const t = translations[settings.language]

  const handleStepDurationChange = (index: number, value: string) => {
    const newDurations = [...settings.stepDurations]
    newDurations[index] = parseInt(value) || 0
    onUpdate({ stepDurations: newDurations })
  }

  const stepKeys = ['closing', 'maintenance', 'uploading', 'notifying', 'facade_shutdown', 'shutdown']

  return (
    <SheetContent 
      className="sm:max-w-md overflow-y-auto" 
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <SheetHeader className="mb-6">
        <SheetTitle>{t.settingsTitle}</SheetTitle>
        <SheetDescription>{t.settingsDesc}</SheetDescription>
      </SheetHeader>
      
      <div className="space-y-6">
        {/* Server Status Edit */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-primary">
            <Activity className="h-4 w-4" />
            {t.serverStatus}
          </div>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="uptime">{t.editData.uptime}</Label>
              <Input 
                id="uptime"
                type="number"
                value={uptimeSeconds}
                onChange={(e) => setUptimeSeconds(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant={isOnline ? "default" : "outline"} 
                className="flex-1"
                onClick={() => setIsOnline(true)}
              >
                {t.running}
              </Button>
              <Button 
                variant={!isOnline ? "destructive" : "outline"} 
                className="flex-1"
                onClick={() => setIsOnline(false)}
              >
                {t.offline}
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Inactivity Edit */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-primary">
            <Clock className="h-4 w-4" />
            {t.shutdownCountdown}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="elapsed">{t.editData.elapsed}</Label>
            <Input 
              id="elapsed"
              type="number"
              value={timeSinceLastPlayer}
              onChange={(e) => setTimeSinceLastPlayer(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <Separator />

        {/* Simulation Speed Edit */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-primary">
            <Zap className="h-4 w-4" />
            {t.editData.speed}
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Input 
                id="speed"
                type="number"
                min={1}
                value={settings.simulationSpeed}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  onUpdate({ simulationSpeed: isNaN(val) ? 1 : Math.max(1, val) });
                }}
                className="font-mono font-bold text-lg h-12"
              />
              <span className="text-2xl font-black text-muted-foreground/30 italic select-none">X</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Keyboard className="h-3 w-3" />
              {t.editData.pauseShortcut}
            </div>
            <Switch 
              checked={settings.enablePauseShortcut}
              onCheckedChange={(val) => onUpdate({ enablePauseShortcut: val })}
            />
          </div>
        </div>

        <Separator />

        {/* Players Edit */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-primary">
            <Users className="h-4 w-4" />
            {t.onlinePlayers}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="online">{t.editData.online}</Label>
              <Input 
                id="online"
                type="number"
                value={playerCount}
                onChange={(e) => setPlayerCount(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max">{t.editData.max}</Label>
              <Input 
                id="max"
                type="number"
                value={settings.maxPlayers}
                onChange={(e) => onUpdate({ maxPlayers: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Keyboard className="h-3 w-3" />
              {t.editData.playerControls}
            </div>
            <Switch 
              checked={settings.enablePlayerControls}
              onCheckedChange={(val) => onUpdate({ enablePlayerControls: val })}
            />
          </div>
        </div>

        <Separator />

        {/* Evacuation Steps Edit */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-primary">
            <Timer className="h-4 w-4" />
            {t.editData.stepDurations}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stepKeys.map((key, index) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`step-${index}`} className="text-[10px] uppercase text-muted-foreground truncate block">
                  {(t.steps as any)[key].title}
                </Label>
                <Input 
                  id={`step-${index}`}
                  type="number"
                  value={settings.stepDurations[index]}
                  onChange={(e) => handleStepDurationChange(index, e.target.value)}
                  className="h-8"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="pt-2">
          <Button 
            variant="outline" 
            className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/5"
            onClick={resetSimulation}
          >
            <RotateCcw className="h-4 w-4" />
            {t.editData.reset}
          </Button>
        </div>

        <div className="pt-4">
          <p className="text-[10px] text-muted-foreground text-center italic">
            Ender Evac Simulation Debugger
          </p>
        </div>
      </div>
    </SheetContent>
  )
}
