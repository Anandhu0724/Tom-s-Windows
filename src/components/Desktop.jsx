import React from 'react'
import AppIcon from './AppIcons'
import ClockWidget from './Widgets/ClockWidget'
import WeatherWidget from './Widgets/WeatherWidget'

export default function Desktop({
  wallpaper,
  onOpenApp,
  onOpenCopilot,
  showClockWidget,
  setShowClockWidget,
  showWeatherWidget,
  setShowWeatherWidget,
  onContextMenu,
  onClickDesktop,
  selectedIcon,
  setSelectedIcon,
}) {
  const desktopIcons = [
    { id: 'explorer', name: 'This PC', action: () => onOpenApp('explorer') },
    { id: 'browser', name: 'Microsoft Edge', action: () => onOpenApp('browser') },
    { id: 'copilot', name: 'Copilot AI', action: onOpenCopilot },
    { id: 'vscode', name: 'VS Code', action: () => onOpenApp('notepad') },
    { id: 'terminal', name: 'Terminal', action: () => onOpenApp('terminal') },
    { id: 'notepad', name: 'Notepad', action: () => onOpenApp('notepad') },
    { id: 'calculator', name: 'Calculator', action: () => onOpenApp('calculator') },
    { id: 'youtube', name: 'YouTube', action: () => onOpenApp('browser') },
    { id: 'spotify', name: 'Spotify', action: () => onOpenApp('browser') },
    { id: 'settings', name: 'Settings', action: () => onOpenApp('settings') },
  ]

  return (
    <main
      onClick={onClickDesktop}
      onContextMenu={onContextMenu}
      className="relative w-screen h-screen overflow-hidden select-none bg-cover bg-center"
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
    >
      {/* Subtle futuristic glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Desktop Icons Layer (Grid Layout on Left) */}
      <div className="absolute top-4 left-4 grid grid-flow-col grid-rows-6 gap-3 z-10 p-2">
        {desktopIcons.map((item) => {
          const isSelected = selectedIcon === item.id

          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIcon(item.id)
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                item.action()
              }}
              className={`w-20 h-22 flex flex-col items-center justify-center p-2 rounded-2xl cursor-pointer transition-all duration-150 group ${
                isSelected
                  ? 'bg-white/30 dark:bg-white/15 border border-white/40 shadow-lg backdrop-blur-md'
                  : 'hover:bg-white/15 dark:hover:bg-white/10 hover:backdrop-blur-sm'
              }`}
            >
              <div
                className="w-12 h-12 rounded-2xl bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center p-2 shadow-lg group-hover:scale-110 group-hover:shadow-cyan-500/20 transition-all"
              >
                <AppIcon id={item.id} className="w-8 h-8 drop-shadow-md" />
              </div>
              <span
                className="mt-1.5 text-[11px] font-medium text-white text-center leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-clamp-2 px-1 rounded"
              >
                {item.name}
              </span>
            </div>
          )
        })}
      </div>

      {/* Desktop Pinned Widgets Layer (Upper Right) */}
      <div className="absolute top-6 right-6 flex flex-col items-end gap-5 z-10 pointer-events-auto">
        {showClockWidget && (
          <ClockWidget
            isPinned={showClockWidget}
            onTogglePin={() => setShowClockWidget(false)}
          />
        )}

        {showWeatherWidget && (
          <WeatherWidget
            isPinned={showWeatherWidget}
            onTogglePin={() => setShowWeatherWidget(false)}
          />
        )}
      </div>
    </main>
  )
}
