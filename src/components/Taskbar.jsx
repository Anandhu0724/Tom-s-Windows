import React, { useState, useEffect } from 'react'
import AppIcon, { WindowsLogo } from './AppIcons'
import { Wifi, Volume2, Battery, Search, Sparkles } from 'lucide-react'

export default function Taskbar({
  openWindows,
  activeWindowId,
  isStartOpen,
  onToggleStart,
  isCopilotOpen,
  onToggleCopilot,
  isActionCenterOpen,
  onToggleActionCenter,
  onAppClick,
  isDarkMode,
}) {
  const [timeStr, setTimeStr] = useState('')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }))
      setDateStr(now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: '2-digit' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // App definitions for taskbar matching user's reference image
  const taskbarApps = [
    { id: 'explorer', name: 'File Explorer' },
    { id: 'browser', name: 'Microsoft Edge' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'spotify', name: 'Spotify' },
    { id: 'vscode', name: 'Visual Studio Code' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'terminal', name: 'Windows Terminal' },
    { id: 'settings', name: 'Settings' },
  ]

  return (
    <nav 
      aria-label="Windows 12 Taskbar"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-white/40 dark:bg-black/45 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl h-14 px-3 flex items-center gap-1.5 select-none transition-all duration-300 ring-1 ring-black/5"
    >
      {/* Start Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleStart(); }}
        title="Start"
        className={`relative p-2.5 rounded-xl hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center group ${
          isStartOpen ? 'bg-white/40 dark:bg-white/20 shadow-md' : 'hover:bg-white/30 dark:hover:bg-white/10'
        }`}
      >
        <WindowsLogo className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(0,120,212,0.8)] transition-all" />
      </button>

      {/* Search Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleStart(); }}
        title="Search"
        className="p-2.5 rounded-xl hover:scale-105 active:scale-95 hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-200 text-slate-700 dark:text-slate-200"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Copilot AI Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleCopilot(); }}
        title="Copilot AI"
        className={`relative p-2 rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center ${
          isCopilotOpen
            ? 'bg-gradient-to-tr from-cyan-500/40 to-blue-500/40 border border-cyan-400/40 shadow-lg shadow-cyan-500/20'
            : 'hover:bg-white/30 dark:hover:bg-white/10'
        }`}
      >
        <AppIcon id="copilot" className="w-6 h-6 animate-pulse" />
      </button>

      {/* Vertical Subtle Separator */}
      <div className="w-px h-6 bg-white/20 dark:bg-white/10 mx-1" />

      {/* Pinned / Running Apps with Authentic Logos */}
      <div className="flex items-center gap-1">
        {taskbarApps.map((app) => {
          const isOpen = Boolean(openWindows[app.id]?.isOpen)
          const isActive = activeWindowId === app.id && !openWindows[app.id]?.isMinimized

          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              title={app.name}
              className={`relative p-2 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center group ${
                isActive 
                  ? 'bg-white/50 dark:bg-white/20 shadow-md' 
                  : isOpen 
                  ? 'bg-white/20 dark:bg-white/5' 
                  : 'hover:bg-white/30 dark:hover:bg-white/10'
              }`}
            >
              <AppIcon id={app.id} className="w-6 h-6 group-hover:drop-shadow-md transition-all" />

              {/* Running indicator pill underneath */}
              {isOpen && (
                <span
                  className={`absolute -bottom-1 h-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-4 bg-cyan-500 shadow-sm shadow-cyan-500'
                      : 'w-1.5 bg-slate-400 dark:bg-slate-300'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Vertical Subtle Separator */}
      <div className="w-px h-6 bg-white/20 dark:bg-white/10 mx-1" />

      {/* System Tray & Quick Settings */}
      <div
        onClick={(e) => { e.stopPropagation(); onToggleActionCenter(); }}
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-white/30 dark:hover:bg-white/10 transition-all text-slate-700 dark:text-slate-200 text-xs ${
          isActionCenterOpen ? 'bg-white/40 dark:bg-white/20 shadow-sm' : ''
        }`}
        title="Internet, Sound & Battery Status"
      >
        <Wifi className="w-3.5 h-3.5" />
        <Volume2 className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
      </div>

      {/* Clock & Calendar Trigger */}
      <div
        onClick={(e) => { e.stopPropagation(); onToggleActionCenter(); }}
        className="flex flex-col items-end px-2.5 py-1 rounded-xl cursor-pointer hover:bg-white/30 dark:hover:bg-white/10 transition-all text-slate-800 dark:text-slate-200"
        title="Open Notification and Quick Center"
      >
        <span className="text-[11px] font-semibold leading-tight">{timeStr}</span>
        <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">{dateStr}</span>
      </div>
    </nav>
  )
}
