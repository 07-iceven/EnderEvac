
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Users, Clock, AlertTriangle } from "lucide-react"

interface ServerStatusProps {
  isOnline: boolean
  playerCount: number
  timeSinceLastPlayer: number
  thresholdHours: number
}

export function ServerStatus({ isOnline, playerCount, timeSinceLastPlayer, thresholdHours }: ServerStatusProps) {
  const thresholdSeconds = thresholdHours * 3600
  const progress = Math.min((timeSinceLastPlayer / thresholdSeconds) * 100, 100)
  const remainingSeconds = Math.max(thresholdSeconds - timeSinceLastPlayer, 0)

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="fluent-glass">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Server Status</CardTitle>
          <Activity className={`h-4 w-4 ${isOnline ? "text-green-500" : "text-red-500"}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isOnline ? "Running" : "Offline"}</div>
          <p className="text-xs text-muted-foreground mt-1">Uptime: 14 days, 2 hours</p>
        </CardContent>
      </Card>

      <Card className="fluent-glass">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Online Players</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{playerCount} / 20</div>
          <Badge variant={playerCount > 0 ? "default" : "secondary"} className="mt-1">
            {playerCount > 0 ? "Active Traffic" : "Idle"}
          </Badge>
        </CardContent>
      </Card>

      <Card className="fluent-glass col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Shutdown Countdown
          </CardTitle>
          {progress > 80 && <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-mono font-bold tracking-tighter">
                {formatTime(timeSinceLastPlayer)} / {formatTime(thresholdSeconds)}
              </div>
              <p className="text-xs text-muted-foreground">Inactivity duration threshold</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-destructive uppercase">Estimated Closing In</div>
              <div className="text-lg font-bold text-destructive">{formatTime(remainingSeconds)}</div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>
    </div>
  )
}
