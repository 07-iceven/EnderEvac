"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Clock, AlertTriangle, Zap } from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface ServerStatusProps {
  isOnline: boolean
  isEvacuating: boolean
  playerCount: number
  timeSinceLastPlayer: number
  uptimeSeconds: number
  thresholdSeconds: number
  language: Language
  maxPlayers: number
  isPaused?: boolean
  simulationSpeed: number
}

export function ServerStatus({ 
  isOnline, 
  isEvacuating, 
  playerCount, 
  timeSinceLastPlayer, 
  uptimeSeconds, 
  thresholdSeconds, 
  language,
  maxPlayers,
  isPaused = false,
  simulationSpeed
}: ServerStatusProps) {
  const t = translations[language]
  const progress = Math.min((timeSinceLastPlayer / thresholdSeconds) * 100, 100)
  const remainingSeconds = Math.max(thresholdSeconds - timeSinceLastPlayer, 0)

  const formatFullTime = (seconds: number) => {
    const d = Math.floor(seconds / 86400)
    const h = Math.floor((seconds % 86400) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    
    const pad = (n: number) => n.toString().padStart(2, '0');

    const parts = []
    parts.push(`${pad(d)}d`)
    parts.push(`${pad(h)}h`)
    parts.push(`${pad(m)}m`)
    parts.push(`${pad(s)}s`)
    return parts.join(' ')
  }

  const statusText = isEvacuating ? t.evacuating : isOnline ? t.running : t.offline
  const statusColor = isEvacuating ? "text-yellow-500" : isOnline ? "text-green-500" : "text-red-500"

  const showEvacAlert = isEvacuating || !isOnline

  // Calculate dynamic transition duration based on simulation speed
  // Use a slightly shorter duration than the tick interval to ensure it finishes before next update
  const transitionDuration = isPaused ? 0 : Math.max(50, 1000 / simulationSpeed)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className={cn(
        "fluent-glass col-span-1 md:col-span-2 lg:col-span-4 overflow-hidden transition-all duration-500 relative min-h-[320px] flex flex-col justify-center",
        showEvacAlert ? 'border-destructive/50 ring-2 ring-destructive/20 bg-destructive/10' : 'bg-destructive/[0.02]'
      )}>
        {/* Background Progress Layer */}
        {!showEvacAlert && isOnline && (
          <div 
            className="absolute inset-y-0 left-0 bg-destructive/20 transition-all ease-linear z-0"
            style={{ 
              width: `${progress}%`,
              transitionDuration: `${transitionDuration}ms`
            }}
          />
        )}

        <div className="relative z-10 w-full h-full flex flex-col">
          {showEvacAlert ? (
            <div className={cn(
              "flex-1 flex flex-col items-center justify-center p-6 space-y-4",
              isEvacuating && 'animate-pulse'
            )}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                <AlertTriangle className="h-48 w-48 text-destructive" />
              </div>
              <div className="flex flex-col items-center gap-3">
                <Zap className={cn("h-16 w-16 text-destructive", isEvacuating ? 'fill-destructive' : '')} />
                <h3 className="text-6xl font-black text-destructive uppercase tracking-tighter text-center">
                  {isEvacuating ? t.evacuating : t.offline}
                </h3>
                <p className="text-sm font-bold text-destructive/70 tracking-widest uppercase">
                  {isEvacuating ? "Protocol Active" : "Server Shutdown Completed"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <CardHeader className="absolute top-0 left-0 right-0 flex flex-row items-center justify-between p-6 bg-transparent z-20">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t.shutdownCountdown}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {progress > 80 && isOnline && !isPaused && <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-mono text-destructive tracking-tighter drop-shadow-sm select-none text-center break-words leading-tight max-w-full">
                  {formatFullTime(remainingSeconds)}
                </div>
              </CardContent>
            </>
          )}
        </div>
      </Card>

      <Card className="fluent-glass col-span-1 md:col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{t.serverStatus}</CardTitle>
          <Activity className={cn("h-4 w-4", statusColor)} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusText}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {t.uptime}: {formatFullTime(uptimeSeconds)}
          </p>
        </CardContent>
      </Card>

      <Card className="fluent-glass col-span-1 md:col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{t.onlinePlayers}</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{playerCount} / {maxPlayers}</div>
          <Badge variant={playerCount > 0 ? "default" : "secondary"} className="mt-1">
            {playerCount > 0 ? t.activeTraffic : t.idle}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
