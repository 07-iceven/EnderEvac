
"use client"

import { useState, useEffect } from 'react'

export interface AppSettings {
  shutdownThreshold: number // hours
  githubRepo: string
  githubToken: string
  qqGroup: string
  websiteUrl: string
  announcementContent: string
  accentColor: string // hex
}

export interface LogEntry {
  id: string
  timestamp: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
}

const DEFAULT_SETTINGS: AppSettings = {
  shutdownThreshold: 24,
  githubRepo: 'https://github.com/YourName/MinecraftServer-Backup',
  githubToken: 'ghp_************************************',
  qqGroup: '123456789',
  websiteUrl: 'https://myserver.com',
  announcementContent: 'Due to long-term inactivity, the server is now officially closed. The source files are available on GitHub.',
  accentColor: '#0078D4',
}

export function useSimulatedApp() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [playerCount, setPlayerCount] = useState(0)
  const [isOnline, setIsOnline] = useState(true)
  const [timeSinceLastPlayer, setTimeSinceLastPlayer] = useState(0) // seconds

  // Initial load
  useEffect(() => {
    const savedSettings = localStorage.getItem('minedown-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
    const savedTheme = localStorage.getItem('minedown-theme')
    if (savedTheme === 'light') setIsDarkMode(false)

    addLog('System initialized. Waiting for player activity monitoring...', 'info')
  }, [])

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('minedown-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Accent color effect
  useEffect(() => {
    const root = window.document.documentElement
    const hex = settings.accentColor
    // Convert hex to HSL for CSS variables
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

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceLastPlayer(prev => prev + 1)
      
      // Randomly log "events"
      if (Math.random() > 0.99) {
        const events = [
          'Checking player status via RCON...',
          'Monitoring network traffic: No packets from clients.',
          'GitHub API connectivity verified.',
          'Website ping: OK.',
          'QQ Group bot status: Connected.'
        ]
        addLog(events[Math.floor(Math.random() * events.length)], 'info')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const addLog = (message: string, type: LogEntry['type']) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }
    setLogs(prev => [newLog, ...prev].slice(0, 50))
  }

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('minedown-settings', JSON.stringify(updated))
    addLog('Configuration updated successfully.', 'success')
  }

  return {
    settings,
    updateSettings,
    isDarkMode,
    setIsDarkMode,
    logs,
    playerCount,
    isOnline,
    timeSinceLastPlayer,
    addLog
  }
}
