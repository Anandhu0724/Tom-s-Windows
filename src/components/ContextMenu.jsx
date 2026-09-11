import React from 'react'
import { 
  Eye, RefreshCw, Plus, Terminal, Settings, 
  Sparkles, Clock, CloudSun, LayoutGrid
} from 'lucide-react'

export default function ContextMenu({ 
  x, 
  y, 
  onClose, 
  onOpenApp, 
  onToggleClockWidget, 
  onToggleWeatherWidget,
  showClockWidget,
  showWeatherWidget
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ top: `${Math.min(y, window.innerHeight - 320)}px`, left: `${Math.min(x, window.innerWidth - 220)}px` }}
      className="fixed z-50 w-56 rounded-2xl bg-white/60 dark:bg-black/70 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl p-1.5 space-y-0.5 text-xs text-slate-800 dark:text-slate-200 select-none animate-fade-in"
    >
      <button
        onClick={() => { window.location.reload() }}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5 text-cyan-500" />
        <span>Refresh Desktop</span>
      </button>

      <div className="h-px bg-white/20 dark:bg-white/10 my-1" />

      <button
        onClick={() => { onToggleClockWidget(); onClose(); }}
        className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Clock Widget</span>
        </div>
        <span className="text-[10px] text-cyan-500 font-semibold">{showClockWidget ? 'Pinned' : 'Off'}</span>
      </button>

      <button
        onClick={() => { onToggleWeatherWidget(); onClose(); }}
        className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <CloudSun className="w-3.5 h-3.5 text-amber-400" />
          <span>Weather Widget</span>
        </div>
        <span className="text-[10px] text-cyan-500 font-semibold">{showWeatherWidget ? 'Pinned' : 'Off'}</span>
      </button>

      <div className="h-px bg-white/20 dark:bg-white/10 my-1" />

      <button
        onClick={() => { onOpenApp('terminal'); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
      >
        <Terminal className="w-3.5 h-3.5 text-slate-400" />
        <span>Open in Windows Terminal</span>
      </button>

      <button
        onClick={() => { onOpenApp('settings'); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
      >
        <Settings className="w-3.5 h-3.5 text-slate-400" />
        <span>Personalize & Display</span>
      </button>
    </div>
  )
}
