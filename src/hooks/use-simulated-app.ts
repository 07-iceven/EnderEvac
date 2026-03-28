"use client"

import { useState, useEffect } from 'react'
import { Language, translations } from '@/lib/translations'
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
  stepDurations: number[] // [closing, maintenance, uploading, notifying, facade_shutdown, shutdown]
  simulationSpeed: number // 1x, 2x, etc.
  enablePlayerControls: boolean
  enablePauseShortcut: boolean
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
  maxPlayers: 20,
  stepDurations: [5, 5, 5, 5, 5, 5],
  simulationSpeed: 1,
  enablePlayerControls: false,
  enablePauseShortcut: true
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
  const [evacuationElapsed, setEvacuationElapsed] = useState(0) // 跑路已用时长（秒）
  const [uptimeSeconds, setUptimeSeconds] = useState(86400)
  const [currentEvacStep, setCurrentEvacStep] = useState(0)
  
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Pause simulation with F1
      if (e.key === 'F1' && settings.enablePauseShortcut) {
        e.preventDefault()
        setIsManualPaused(prev => {
          const next = !prev
          setTimeout(() => {
            toast({
              title: next ? (settings.language === 'zh' ? "模拟已暂停" : "Simulation Paused") : (settings.language === 'zh' ? "模拟已恢复" : "Simulation Resumed"),
            })
          }, 0)
          return next
        })
      }

      // Handle player count shortcuts if enabled
      if (settings.enablePlayerControls && !isEvacuating && isOnline) {
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setPlayerCount(prev => Math.min(prev + 1, settings.maxPlayers))
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          setPlayerCount(prev => Math.max(prev - 1, 0))
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toast, settings.language, settings.enablePlayerControls, settings.enablePauseShortcut, settings.maxPlayers, isEvacuating, isOnline])

  useEffect(() => {
    if (playerCount > 0) {
      setTimeSinceLastPlayer(0)
      if (isEvacuating) {
        setIsEvacuating(false)
        setEvacuationElapsed(0)
      }
    }
  }, [playerCount, isEvacuating])

  // 倒计时阶段：受模拟速率影响
  useEffect(() => {
    if (isPaused || isEvacuating || !isOnline) return

    const speed = settings.simulationSpeed || 1
    const intervalDuration = 1000 / speed

    const interval = setInterval(() => {
      if (playerCount === 0) {
        setTimeSinceLastPlayer(prev => prev + 1)
      }
      setUptimeSeconds(prev => prev + 1)
    }, intervalDuration)

    return () => clearInterval(interval)
  }, [isOnline, playerCount, isEvacuating, isPaused, settings.simulationSpeed])

  // 跑路进程阶段：不受模拟速率影响，固定 1x 速率
  useEffect(() => {
    if (isPaused || !isEvacuating) return

    const interval = setInterval(() => {
      setEvacuationElapsed(prev => prev + 1)
      setUptimeSeconds(prev => prev + 1) // 跑路期间运行时长依然正常增加
    }, 1000)

    return () => clearInterval(interval)
  }, [isEvacuating, isPaused])

  // 触发跑路逻辑
  useEffect(() => {
    const threshold = parseTimeToSeconds(settings.shutdownThreshold)
    
    if (timeSinceLastPlayer >= threshold && !isEvacuating && isOnline && playerCount === 0) {
      setIsEvacuating(true)
      setEvacuationElapsed(0)
    }
  }, [timeSinceLastPlayer, settings.shutdownThreshold, isEvacuating, isOnline, playerCount])

  // 跑路步骤计算
  useEffect(() => {
    if (isEvacuating) {
      let cumulative = 0
      let step = 0
      for (let i = 0; i < settings.stepDurations.length; i++) {
        cumulative += settings.stepDurations[i]
        if (evacuationElapsed < cumulative) {
          step = i + 1
          break
        }
        if (i === settings.stepDurations.length - 1) {
          step = 6
        }
      }
      
      setCurrentEvacStep(step)
      
      if (step === 6) {
        setIsOnline(false)
        setIsEvacuating(false)
        setEvacuationElapsed(0)
      }
    } else if (!isOnline) {
      setCurrentEvacStep(6)
    } else {
      setCurrentEvacStep(0)
    }
  }, [evacuationElapsed, isEvacuating, isOnline, settings.stepDurations])

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('enderevac-settings', JSON.stringify(updated))
  }

  const triggerManualEvac = () => {
    setTimeSinceLastPlayer(parseTimeToSeconds(settings.shutdownThreshold))
    setEvacuationElapsed(0)
    setIsEvacuating(true)
  }

  const resetSimulation = () => {
    setIsOnline(true)
    setIsEvacuating(false)
    setTimeSinceLastPlayer(0)
    setEvacuationElapsed(0)
    setUptimeSeconds(86400)
    setCurrentEvacStep(0)
    toast({
      title: (translations as any)[settings.language].toasts.simulationReset
    })
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
    evacuationElapsed,
    uptimeSeconds,
    setUptimeSeconds,
    currentEvacStep,
    triggerManualEvac,
    resetSimulation,
    isPaused,
    isManualPaused,
    setIsSettingsOpen
  }
}
