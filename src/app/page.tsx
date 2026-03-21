"use client"

import { useSimulatedApp } from "@/hooks/use-simulated-app"
import { ServerStatus } from "@/components/dashboard/ServerStatus"
import { LogViewer } from "@/components/dashboard/LogViewer"
import { ConfigPanel } from "@/components/dashboard/ConfigPanel"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sun, Moon, Github, Settings, LayoutDashboard, Database, HelpCircle } from "lucide-react"

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

  return (
    <div className="min-h-screen font-body flex">
      {/* Sidebar - Fluent inspired */}
      <aside className="w-64 border-r fluent-glass flex flex-col hidden lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">E</div>
            <h1 className="text-xl font-headline font-bold tracking-tight">Ender-Evac</h1>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-secondary/50">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Database className="h-4 w-4" />
              Backups
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <HelpCircle className="h-4 w-4" />
              Documentation
            </Button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 space-y-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/30 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            V1.0.4-Stable
          </div>
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Star on GitHub
            </a>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background/50">
        <header className="h-16 border-b fluent-glass flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Automata Control Center</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Separator orientation="vertical" className="h-4 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-bold">AD</span>
              </div>
              <span className="text-sm font-medium hidden sm:inline">Admin User</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full">
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-headline font-bold">Dashboard</h2>
                <p className="text-muted-foreground">Monitor server status and automated shutdown tasks.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Refresh</Button>
                <Button>Manual Shutdown</Button>
              </div>
            </div>
            
            <ServerStatus 
              isOnline={isOnline} 
              playerCount={playerCount} 
              timeSinceLastPlayer={timeSinceLastPlayer} 
              thresholdHours={settings.shutdownThreshold} 
            />
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <ConfigPanel settings={settings} onUpdate={updateSettings} />
            </div>
            <div className="xl:col-span-1">
              <LogViewer logs={logs} />
            </div>
          </div>
        </div>

        <footer className="border-t py-6 px-8 flex justify-between items-center text-xs text-muted-foreground">
          <p>© 2024 Ender-Evac. Developed for April 1st Release.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
