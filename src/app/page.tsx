"use client"

import { useSimulatedApp, parseTimeToSeconds } from "@/hooks/use-simulated-app"
import { ServerStatus } from "@/components/dashboard/ServerStatus"
import { EvacuationProgress } from "@/components/dashboard/EvacuationProgress"
import { ConfigPanel } from "@/components/dashboard/ConfigPanel"
import { SettingsSheet } from "@/components/dashboard/SettingsSheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Settings as SettingsIcon } from "lucide-react"
import { translations } from "@/lib/translations"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Home() {
  const { 
    settings, 
    updateSettings, 
    isDarkMode, 
    setIsDarkMode, 
    playerCount, 
    setPlayerCount,
    isOnline, 
    setIsOnline,
    isEvacuating,
    timeSinceLastPlayer,
    setTimeSinceLastPlayer,
    uptimeSeconds,
    setUptimeSeconds,
    currentEvacStep,
    triggerManualEvac,
    resetSimulation,
    isPaused,
    setIsSettingsOpen
  } = useSimulatedApp()

  const t = translations[settings.language]
  const thresholdSeconds = parseTimeToSeconds(settings.shutdownThreshold)
  
  const evacuationStartTime = thresholdSeconds
  const evacuationElapsed = isEvacuating || !isOnline 
    ? Math.max(timeSinceLastPlayer - evacuationStartTime, 0) 
    : 0

  const logoImage = PlaceHolderImages.find(img => img.id === 'app-logo')

  return (
    <div className="min-h-screen font-body bg-background/50">
      <main className="flex flex-col min-w-0">
        <header className="h-16 border-b fluent-glass flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              {logoImage && (
                <Image 
                  src={logoImage.imageUrl} 
                  alt="Logo" 
                  width={40} 
                  height={40}
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h1 className="text-xl font-headline font-bold tracking-tight">{t.title}</h1>
              <div className="flex items-center">
                <Separator orientation="vertical" className="h-4 mx-2 hidden sm:block" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">{t.subtitle}</h2>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sheet onOpenChange={setIsSettingsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <SettingsIcon className="h-4 w-4" />
                  <span className="sr-only">{t.settings}</span>
                </Button>
              </SheetTrigger>
              <SettingsSheet 
                settings={settings} 
                onUpdate={updateSettings}
                playerCount={playerCount}
                setPlayerCount={setPlayerCount}
                uptimeSeconds={uptimeSeconds}
                setUptimeSeconds={setUptimeSeconds}
                timeSinceLastPlayer={timeSinceLastPlayer}
                setTimeSinceLastPlayer={setTimeSinceLastPlayer}
                isOnline={isOnline}
                setIsOnline={setIsOnline}
                resetSimulation={resetSimulation}
              />
            </Sheet>
          </div>
        </header>

        <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Status & Progress */}
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-headline font-bold">{t.dashboard}</h2>
                    <p className="text-muted-foreground">{t.dashboardDesc}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={triggerManualEvac} 
                      disabled={isEvacuating || !isOnline}
                      variant={isEvacuating ? "secondary" : "default"}
                    >
                      {t.manualShutdown}
                    </Button>
                  </div>
                </div>
                
                <ServerStatus 
                  isOnline={isOnline} 
                  isEvacuating={isEvacuating}
                  playerCount={playerCount} 
                  timeSinceLastPlayer={timeSinceLastPlayer} 
                  uptimeSeconds={uptimeSeconds}
                  thresholdSeconds={thresholdSeconds}
                  language={settings.language}
                  maxPlayers={settings.maxPlayers}
                  isPaused={isPaused}
                  simulationSpeed={settings.simulationSpeed}
                />
              </section>

              <EvacuationProgress 
                language={settings.language} 
                currentStep={currentEvacStep} 
                evacuationTime={evacuationElapsed}
              />
            </div>

            {/* Right Column: Config Panels */}
            <div className="lg:col-span-1 space-y-8">
              <ConfigPanel 
                settings={settings} 
                onUpdate={updateSettings} 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
              />
            </div>
          </div>
        </div>

        <footer className="border-t py-6 px-8 mt-auto flex justify-between items-center text-xs text-muted-foreground">
          <p>{t.footer.copy}</p>
          <div className="flex gap-4">
            <a 
              href={settings.githubRepo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline"
            >
              {t.footer.source}
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
