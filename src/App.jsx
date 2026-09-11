import React, { useState, useEffect } from 'react'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import StartMenu from './components/StartMenu'
import Window from './components/Window'
import CopilotSidebar from './components/CopilotSidebar'
import ActionCenter from './components/ActionCenter'
import ContextMenu from './components/ContextMenu'
import MischiefCat from './components/MischiefCat'
import LockScreen from './components/LockScreen'

// Built-in Modular Apps
import FileExplorer from './apps/FileExplorer'
import Browser from './apps/Browser'
import Terminal from './apps/Terminal'
import Notepad from './apps/Notepad'
import Settings from './apps/Settings'
import Calculator from './apps/Calculator'

import { 
  Folder, Globe, Terminal as TerminalIcon, 
  FileText, Settings as SettingsIcon, Calculator as CalcIcon 
} from 'lucide-react'

export default function App() {
  // Theme & Wallpaper (default to user's provided rose bloom wallpaper)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [wallpaper, setWallpaper] = useState('/wallpaper.jpg')
  const [isLocked, setIsLocked] = useState(true)

  // Top-level UI Overlays
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)
  const [isActionCenterOpen, setIsActionCenterOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 })
  const [selectedIcon, setSelectedIcon] = useState(null)

  // Direct Desktop Widgets
  const [showClockWidget, setShowClockWidget] = useState(true)
  const [showWeatherWidget, setShowWeatherWidget] = useState(true)

  // Window Manager State
  const [highestZIndex, setHighestZIndex] = useState(10)
  const [activeWindowId, setActiveWindowId] = useState('explorer')
  const [windows, setWindows] = useState({
    explorer: {
      id: 'explorer',
      title: 'File Explorer',
      icon: Folder,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 120, y: 60 },
      defaultSize: { width: 780, height: 480 },
    },
    browser: {
      id: 'browser',
      title: 'Microsoft Edge',
      icon: Globe,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      defaultPosition: { x: 180, y: 70 },
      defaultSize: { width: 850, height: 530 },
    },
    terminal: {
      id: 'terminal',
      title: 'Windows PowerShell',
      icon: TerminalIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      defaultPosition: { x: 220, y: 110 },
      defaultSize: { width: 680, height: 420 },
    },
    notepad: {
      id: 'notepad',
      title: 'Notepad - Windows 12',
      icon: FileText,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      defaultPosition: { x: 260, y: 130 },
      defaultSize: { width: 640, height: 450 },
    },
    settings: {
      id: 'settings',
      title: 'Settings',
      icon: SettingsIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      defaultPosition: { x: 200, y: 80 },
      defaultSize: { width: 760, height: 510 },
    },
    calculator: {
      id: 'calculator',
      title: 'Calculator',
      icon: CalcIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      defaultPosition: { x: 300, y: 120 },
      defaultSize: { width: 340, height: 460 },
      minWidth: 320,
      minHeight: 440,
    },
  })

  // Synchronize HTML dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Window actions
  const focusWindow = (id) => {
    setHighestZIndex((prev) => {
      const nextZ = prev + 1
      setWindows((w) => ({
        ...w,
        [id]: { ...w[id], zIndex: nextZ, isMinimized: false },
      }))
      return nextZ
    })
    setActiveWindowId(id)
  }

  const openApp = (id) => {
    setHighestZIndex((prev) => {
      const nextZ = prev + 1
      setWindows((w) => ({
        ...w,
        [id]: {
          ...w[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      }))
      return nextZ
    })
    setActiveWindowId(id)
  }

  const closeWindow = (id) => {
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isOpen: false },
    }))
    if (activeWindowId === id) {
      setActiveWindowId(null)
    }
  }

  const minimizeWindow = (id) => {
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isMinimized: true },
    }))
    if (activeWindowId === id) {
      setActiveWindowId(null)
    }
  }

  const maximizeWindow = (id) => {
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isMaximized: !w[id].isMaximized },
    }))
    focusWindow(id)
  }

  const handleTaskbarAppClick = (id) => {
    let targetId = id
    if (['youtube', 'spotify', 'instagram'].includes(id)) {
      targetId = 'browser'
    } else if (id === 'vscode') {
      targetId = 'notepad'
    }
    const win = windows[targetId]
    if (!win) return
    if (!win.isOpen) {
      openApp(targetId)
    } else if (win.isMinimized) {
      focusWindow(targetId)
    } else if (activeWindowId === targetId) {
      minimizeWindow(targetId)
    } else {
      focusWindow(targetId)
    }
  }

  // Desktop click dismisses menus
  const handleDesktopClick = () => {
    setIsStartOpen(false)
    setIsActionCenterOpen(false)
    setContextMenu({ visible: false, x: 0, y: 0 })
    setSelectedIcon(null)
  }

  // Right-click desktop context menu
  const handleContextMenu = (e) => {
    e.preventDefault()
    setIsStartOpen(false)
    setIsActionCenterOpen(false)
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    })
  }

  // Count active open windows
  const openWindowsCount = Object.values(windows).filter(w => w.isOpen && !w.isMinimized).length

  return (
    <div className="relative w-screen h-screen overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Desktop Background & Pinned Widgets */}
      <Desktop
        wallpaper={wallpaper}
        onOpenApp={openApp}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        showClockWidget={showClockWidget}
        setShowClockWidget={setShowClockWidget}
        showWeatherWidget={showWeatherWidget}
        setShowWeatherWidget={setShowWeatherWidget}
        onContextMenu={handleContextMenu}
        onClickDesktop={handleDesktopClick}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
      />

      {/* Windows Manager Layer */}
      {/* File Explorer */}
      <Window
        {...windows.explorer}
        onFocus={focusWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
      >
        <FileExplorer />
      </Window>

      {/* Edge Browser */}
      <Window
        {...windows.browser}
        onFocus={focusWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
      >
        <Browser />
      </Window>

      {/* Terminal */}
      <Window
        {...windows.terminal}
        onFocus={focusWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
      >
        <Terminal />
      </Window>

      {/* Notepad */}
      <Window
        {...windows.notepad}
        onFocus={focusWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
      >
        <Notepad />
      </Window>

      {/* Settings */}
      <Window
        {...windows.settings}
        onFocus={focusWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
      >
        <Settings
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          currentWallpaper={wallpaper}
          setWallpaper={setWallpaper}
        />
      </Window>

      {/* Calculator */}
      <Window
        {...windows.calculator}
        onFocus={focusWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
      >
        <Calculator />
      </Window>

      {/* Copilot AI Sidebar */}
      <CopilotSidebar
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      {/* Start Menu Flyout */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenApp={openApp}
        onLock={() => {
          setIsStartOpen(false)
          setIsLocked(true)
        }}
        onOpenCopilot={() => {
          setIsStartOpen(false)
          setIsCopilotOpen(true)
        }}
      />

      {/* Action Center / Quick Settings Flyout */}
      <ActionCenter
        isOpen={isActionCenterOpen}
        onClose={() => setIsActionCenterOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Right Click Context Menu */}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
          onOpenApp={openApp}
          onToggleClockWidget={() => setShowClockWidget(!showClockWidget)}
          onToggleWeatherWidget={() => setShowWeatherWidget(!showWeatherWidget)}
          showClockWidget={showClockWidget}
          showWeatherWidget={showWeatherWidget}
        />
      )}

      {/* Detached Floating Taskbar */}
      <Taskbar
        openWindows={windows}
        activeWindowId={activeWindowId}
        isStartOpen={isStartOpen}
        onToggleStart={() => {
          setIsActionCenterOpen(false)
          setIsStartOpen(!isStartOpen)
        }}
        isCopilotOpen={isCopilotOpen}
        onToggleCopilot={() => {
          setIsStartOpen(false)
          setIsActionCenterOpen(false)
          setIsCopilotOpen(!isCopilotOpen)
        }}
        isActionCenterOpen={isActionCenterOpen}
        onToggleActionCenter={() => {
          setIsStartOpen(false)
          setIsActionCenterOpen(!isActionCenterOpen)
        }}
        onAppClick={handleTaskbarAppClick}
        isDarkMode={isDarkMode}
      />

      {/* Chaotic Desktop Pet - Mischief Cat (Tom - The OS Overlord) */}
      <MischiefCat 
        windows={windows}
        openWindowsCount={openWindowsCount}
        openApp={openApp}
        closeWindow={closeWindow}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        wallpaper={wallpaper}
        setWallpaper={setWallpaper}
      />

      {/* Windows 10 & 11 Mix Lock Screen (Password: 1111) */}
      <LockScreen
        isLocked={isLocked}
        onUnlock={() => setIsLocked(false)}
        wallpaper={wallpaper}
      />
    </div>
  )
}
