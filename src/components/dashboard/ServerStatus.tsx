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
}

export function ServerStatus({ 
  isOnline, 
  isEvacuating, 
  playerCount, 
  timeSinceLastPlayer, 
  uptimeSeconds, 
  thresholdSeconds, 
  language,
  maxPlayers
}: ServerStatusProps) {
  const t = translations[language]
  const progress = Math.min((timeSinceLastPlayer / thresholdSeconds) * 100, 100)
  const remainingSeconds = Math.max(thresholdSeconds - timeSinceLastPlayer, 0)

  const formatFullTime = (seconds: number) => {
    const d = Math.floor(seconds / 86400)
    const h = Math.floor((seconds % 86400) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    
    const parts = []
    if (d > 0) parts.push(`${d}d`)
    if (h > 0) parts.push(`${h}h`)
    if (m > 0) parts.push(`${m}m`)
    parts.push(`${s}s`)
    return parts.join(' ')
  }

  const statusText = isEvacuating ? t.evacuating : isOnline ? t.running : t.offline
  const statusColor = isEvacuating ? "text-yellow-500" : isOnline ? "text-green-500" : "text-red-500"

  const showEvacAlert = isEvacuating || !isOnline

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className={cn(
        "fluent-glass col-span-1 md:col-span-2 lg:col-span-4 overflow-hidden transition-all duration-500 relative min-h-[300px]",
        showEvacAlert ? 'border-destructive/50 ring-2 ring-destructive/20' : 'bg-destructive/5'
      )}>
        {/* Background Progress Layer - Increased opacity for visibility */}
        {!showEvacAlert && isOnline && (
          <div 
            className="absolute inset-y-0 left-0 bg-destructive/20 transition-all duration-1000 ease-linear z-0"
            style={{ width: `${progress}%` }}
          />
        )}

        <div className="relative z-10 h-full flex flex-col">
          {showEvacAlert ? (
            <div className={cn(
              "relative h-full flex-1 flex flex-col items-center justify-center p-6",
              isEvacuating ? 'bg-destructive/10 animate-pulse' : 'bg-destructive/20'
            )}>
              <div className="absolute top-2 right-2 opacity-20">
                <AlertTriangle className="h-32 w-32 text-destructive" />
              </div>
              <div className="z-10 flex flex-col items-center gap-3">
                <Zap className={cn("h-12 w-12 text-destructive", isEvacuating ? 'fill-destructive' : '')} />
                <h3 className="text-5xl font-black text-destructive uppercase tracking-tighter text-center">
                  {isEvacuating ? t.evacuating : t.offline}
                </h3>
                <p className="text-sm font-bold text-destructive/70 tracking-widest uppercase">
                  {isEvacuating ? "Protocol Active" : "Server Shutdown Completed"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t.shutdownCountdown}
                </CardTitle>
                {progress > 80 && isOnline && <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center py-16">
                <div className="text-7xl md:text-9xl font-black font-mono text-destructive tracking-tighter drop-shadow-md">
                  {!isOnline ? "0s" : formatFullTime(remainingSeconds)}
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
