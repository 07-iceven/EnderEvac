"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Users, Clock, AlertTriangle } from "lucide-react"
import { Language, translations } from "@/lib/translations"

interface ServerStatusProps {
  isOnline: boolean
  isEvacuating: boolean
  playerCount: number
  timeSinceLastPlayer: number
  thresholdSeconds: number
  language: Language
}

export function ServerStatus({ isOnline, isEvacuating, playerCount, timeSinceLastPlayer, thresholdSeconds, language }: ServerStatusProps) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="fluent-glass">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{t.serverStatus}</CardTitle>
          <Activity className={`h-4 w-4 ${statusColor}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusText}</div>
          <p className="text-xs text-muted-foreground mt-1">{t.uptime}</p>
        </CardContent>
      </Card>

      <Card className="fluent-glass">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{t.onlinePlayers}</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{playerCount} / 20</div>
          <Badge variant={playerCount > 0 ? "default" : "secondary"} className="mt-1">
            {playerCount > 0 ? t.activeTraffic : t.idle}
          </Badge>
        </CardContent>
      </Card>

      <Card className="fluent-glass col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t.shutdownCountdown}
          </CardTitle>
          {progress > 80 && isOnline && !isEvacuating && <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-mono font-bold tracking-tighter">
                {formatFullTime(timeSinceLastPlayer)} / {formatFullTime(thresholdSeconds)}
              </div>
              <p className="text-xs text-muted-foreground">{t.inactivityThreshold}</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-destructive uppercase">{t.estimatedClosing}</div>
              <div className="text-lg font-bold text-destructive">{isEvacuating || !isOnline ? "0s" : formatFullTime(remainingSeconds)}</div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>
    </div>
  )
}