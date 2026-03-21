"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal } from "lucide-react"
import { LogEntry } from "@/hooks/use-simulated-app"
import { Language, translations } from "@/lib/translations"

interface LogViewerProps {
  logs: LogEntry[]
  language: Language
}

export function LogViewer({ logs, language }: LogViewerProps) {
  const t = translations[language]

  return (
    <Card className="fluent-glass flex flex-col h-full min-h-[500px]">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          {t.log.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full max-h-[800px] p-4">
          <div className="space-y-2 font-mono text-xs">
            {logs.length === 0 && (
              <div className="text-muted-foreground animate-pulse">{t.log.initializing}</div>
            )}
            {logs.map((log) => (
              <div key={log.id} className="flex gap-4 group">
                <span className="text-muted-foreground shrink-0 select-none">[{log.timestamp}]</span>
                <span className={`
                  ${log.type === 'info' ? 'text-blue-400' : ''}
                  ${log.type === 'success' ? 'text-green-400' : ''}
                  ${log.type === 'warning' ? 'text-yellow-400' : ''}
                  ${log.type === 'error' ? 'text-red-400' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
