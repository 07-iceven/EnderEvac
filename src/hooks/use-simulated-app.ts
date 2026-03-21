"use client"

import { useState, useEffect } from 'react'
import { Language } from '@/lib/translations'
import { useToast } from '@/hooks/use-toast'

export interface AppSettings {
  shutdownThreshold: string // e.g., "24h", "30m", "1d"
  githubRepo: string
  githubToken: string
  qqGroup: string
  websiteUrl: string
  announcementContent: string
  accentColor: string // hex
  language: Language
  maxPlayers: number
}

const DEFAULT_SETTINGS: AppSettings = {
  shutdownThreshold: '24h',
  githubRepo: 'https://github.com/YourName/MinecraftServer-Backup',
  githubToken: 'ghp_************************************',
  qqGroup: '123456789',
  websiteUrl: 'https://myserver.com',
  announcementContent: 'Due to long-term inactivity, the server is now officially closed. The source files are available on GitHub.',
  accentColor: '#0078D4',
  language: 'zh',
  maxPlayers: 20
}

export function parseTimeToSeconds(timeStr: string): number {
  const units: { [key: string]: number } = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400
  }
  
  const regex = /(\d+)([smhd])/g
  let totalSeconds = 0
  let match
  let hasMatch = false

  while ((match = regex.exec(timeStr.toLowerCase())) !== null) {
    const value = parseInt(match[1])
    const unit = match[2]
    totalSeconds += value * (units[unit] || 0)
    hasMatch = true
  }

  if (!hasMatch && /^\d+$/.test(timeStr.trim())) {
    return parseInt(timeStr.trim()) * 1
  }

  return totalSeconds || 86400
}

export function useSimulatedApp() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [playerCount, setPlayerCount] = useState(0)
  const [isOnline, setIsOnline] = useState(true)
  const [isEvacuating, setIsEvacuating] = useState(false)
  const [timeSinceLastPlayer, setTimeSinceLastPlayer] = useState(0)
  const [uptimeSeconds, setUptimeSeconds] = useState(14 * 86400 + 2 * 3600)
  const [currentEvacStep, setCurrentEvacStep] = useState(0)
  
  // Separate pause states to avoid conflicts
  const [isManualPaused, setIsManualPaused] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  const isPaused = isManualPaused || isSettingsOpen

  useEffect(() => {
    const savedSettings = localStorage.getItem('enderevac-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        if (typeof parsed.shutdownThreshold === 'number') {
          parsed.shutdownThreshold = `${parsed.shutdownThreshold}h`
        }
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      } catch (e) {
        console.error("Failed to parse settings", e)
      }
    }
    const savedTheme = localStorage.getItem('enderevac-theme')
    if (savedTheme === 'light') setIsDarkMode(false)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('enderevac-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    const root = window.document.documentElement
    const hex = settings.accentColor
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s, l = (max + min) / 2
    if (max === min) h = s = 0
    else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    root.style.setProperty('--user-accent-h', `${Math.round(h * 360)}`)
    root.style.setProperty('--user-accent-s', `${Math.round(s * 100)}%`)
    root.style.setProperty('--user-accent-l', `${Math.round(l * 100)}%`)
    root.classList.add('custom-accent-vars')
  }, [settings.accentColor])

  // Global F1 Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault()
        setIsManualPaused(prev => {
          const next = !prev
          // Execute side effect after a tick to avoid React rendering warnings
          setTimeout(() => {
            toast({
              title: next ? "模拟已暂停" : "模拟已恢复",
              description: next ? "按下 F1 键可恢复计时" : "按下 F1 键可再次暂停",
            })
          }, 0)
          return next
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toast])

  // Logic: Reset timer when players join
  useEffect(() => {
    if (playerCount > 0) {
      setTimeSinceLastPlayer(0)
      if (isEvacuating) {
        setIsEvacuating(false)
      }
    }
  }, [playerCount, isEvacuating])

  useEffect(() => {
    const interval = setInterval(() => {
      // If paused by either settings or manual F1, do not increment any timers
      if (isPaused) return

      // Increment inactivity timer only if no players are online and server is online
      if (isOnline && (playerCount === 0 || isEvacuating)) {
        setTimeSinceLastPlayer(prev => prev + 1)
      }
      
      if (isOnline) {
        setUptimeSeconds(prev => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isOnline, playerCount, isEvacuating, isPaused])

  useEffect(() => {
    const threshold = parseTimeToSeconds(settings.shutdownThreshold)
    
    if (timeSinceLastPlayer >= threshold && !isEvacuating && isOnline && playerCount === 0) {
      setIsEvacuating(true)
    }

    if (isEvacuating) {
      const evacSeconds = timeSinceLastPlayer - threshold
      const step = Math.min(Math.floor(evacSeconds / 5) + 1, 6)
      setCurrentEvacStep(step)
      
      if (step === 6) {
        setIsOnline(false)
        setIsEvacuating(false)
      }
    } else if (!isOnline) {
      setCurrentEvacStep(6)
    } else {
      setCurrentEvacStep(0)
    }
  }, [timeSinceLastPlayer, settings.shutdownThreshold, isEvacuating, isOnline, playerCount])

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('enderevac-settings', JSON.stringify(updated))
  }

  const triggerManualEvac = () => {
    setTimeSinceLastPlayer(parseTimeToSeconds(settings.shutdownThreshold))
    setIsEvacuating(true)
  }

  return {
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
    isPaused,
    isManualPaused,
    setIsSettingsOpen
  }
}
