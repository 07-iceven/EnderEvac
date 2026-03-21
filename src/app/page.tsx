"use client"

import { useSimulatedApp, parseTimeToSeconds } from "@/hooks/use-simulated-app"
import { ServerStatus } from "@/components/dashboard/ServerStatus"
import { LogViewer } from "@/components/dashboard/LogViewer"
import { ConfigPanel } from "@/components/dashboard/ConfigPanel"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { translations } from "@/lib/translations"

export default function Home() {
  const { 
    settings, 
    updateSettings, 
    isDarkMode, 
    setIsDarkMode, 
    logs, 
    playerCount, 
    isOnline, 
    timeSinceLastPlayer 
  } = useSimulatedApp()

  const t = translations[settings.language]
  const thresholdSeconds = parseTimeToSeconds(settings.shutdownThreshold)

  return (
    <div className="min-h-screen font-body bg-background/50">
      <main className="flex flex-col min-w-0">
        <header className="h-16 border-b fluent-glass flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">E</div>
            <h1 className="text-xl font-headline font-bold tracking-tight">{t.title}</h1>
            <Separator orientation="vertical" className="h-4 mx-2 hidden sm:block" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">{t.subtitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">{t.refresh}</Button>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full">
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-headline font-bold">{t.dashboard}</h2>
                <p className="text-muted-foreground">{t.dashboardDesc}</p>
              </div>
              <div className="flex gap-2">
                <Button>{t.manualShutdown}</Button>
              </div>
            </div>
            
            <ServerStatus 
              isOnline={isOnline} 
              playerCount={playerCount} 
              timeSinceLastPlayer={timeSinceLastPlayer} 
              thresholdSeconds={thresholdSeconds}
              language={settings.language}
            />
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1">
              <ConfigPanel 
                settings={settings} 
                onUpdate={updateSettings} 
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </div>
            <div className="xl:col-span-2">
              <LogViewer logs={logs} language={settings.language} />
            </div>
          </div>
        </div>

        <footer className="border-t py-6 px-8 mt-auto flex justify-between items-center text-xs text-muted-foreground">
          <p>{t.footer.copy}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">{t.footer.privacy}</a>
            <a href="#" className="hover:underline">{t.footer.terms}</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
