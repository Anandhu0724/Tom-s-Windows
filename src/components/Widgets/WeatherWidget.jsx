import React, { useState } from 'react'
import { CloudSun, Wind, Droplets, ArrowUp, ArrowDown, MapPin, RefreshCw, Pin, PinOff } from 'lucide-react'

export default function WeatherWidget({ isPinned = true, onTogglePin }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [city, setCity] = useState("Seattle, WA")

  const handleRefresh = (e) => {
    e.stopPropagation()
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }

  const hourlyForecast = [
    { time: 'Now', temp: '72°', icon: '☀️' },
    { time: '1 PM', temp: '74°', icon: '⛅' },
    { time: '2 PM', temp: '75°', icon: '⛅' },
    { time: '3 PM', temp: '73°', icon: '🌤️' },
    { time: '4 PM', temp: '70°', icon: '☁️' },
  ]

  return (
    <div className="relative group select-none w-80 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl p-5 transition-all duration-300 hover:shadow-cyan-500/10 hover:border-white/40 dark:hover:border-white/20">
      {/* Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleRefresh}
          title="Refresh Weather"
          className="p-1.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
        {onTogglePin && (
          <button
            onClick={onTogglePin}
            title={isPinned ? "Unpin widget" : "Pin widget"}
            className="p-1.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200"
          >
            {isPinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* City Location */}
      <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
        <MapPin className="w-3.5 h-3.5 text-cyan-500" />
        <span>{city}</span>
      </div>

      {/* Main Condition */}
      <div className="flex items-center justify-between my-2">
        <div>
          <div className="text-4xl font-extrabold text-slate-800 dark:text-white flex items-baseline">
            72<span className="text-2xl font-light text-cyan-500">°F</span>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Partly Cloudy</p>
        </div>
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400/80 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <CloudSun className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Weather Stats */}
      <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/20 dark:border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          <span>48% Hum</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Wind className="w-3.5 h-3.5 text-teal-400" />
          <span>9 mph</span>
        </div>
        <div className="flex items-center justify-end gap-1 text-slate-600 dark:text-slate-300">
          <span className="flex items-center text-rose-500 font-semibold"><ArrowUp className="w-3 h-3" />76°</span>
          <span className="flex items-center text-cyan-500 font-semibold"><ArrowDown className="w-3 h-3" />64°</span>
        </div>
      </div>

      {/* Hourly forecast row */}
      <div className="flex items-center justify-between pt-1">
        {hourlyForecast.map((hour, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-colors">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{hour.time}</span>
            <span className="text-sm">{hour.icon}</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{hour.temp}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
