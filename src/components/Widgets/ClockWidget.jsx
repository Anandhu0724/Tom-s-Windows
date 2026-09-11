import React, { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Clock, Pin, PinOff } from 'lucide-react'

export default function ClockWidget({ isPinned = true, onTogglePin }) {
  const [time, setTime] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const seconds = time.getSeconds().toString().padStart(2, '0')
  const dateString = time.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  const yearString = time.getFullYear()

  return (
    <div className="relative group select-none w-72 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl p-5 transition-all duration-300 hover:shadow-cyan-500/10 hover:border-white/40 dark:hover:border-white/20">
      {/* Pin / Unpin control */}
      {onTogglePin && (
        <button
          onClick={onTogglePin}
          title={isPinned ? "Unpin widget" : "Pin widget"}
          className="absolute top-3 right-3 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200"
        >
          {isPinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
        </button>
      )}

      <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
        <Clock className="w-3.5 h-3.5 animate-pulse" />
        <span>Live Time & Schedule</span>
      </div>

      <div className="flex items-baseline gap-2">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white drop-shadow-sm">
          {hours.split(' ')[0]}
        </h2>
        <span className="text-sm font-semibold text-cyan-500 dark:text-cyan-400">
          :{seconds}
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 ml-auto">
          {hours.split(' ')[1]}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-white/20 dark:border-white/10 pt-3">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{dateString}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{yearString} • Insider Edition</p>
        </div>
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className="p-2 rounded-xl bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-slate-200"
          title="Toggle mini calendar"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>
      </div>

      {showCalendar && (
        <div className="mt-3 pt-3 border-t border-white/20 dark:border-white/10 animate-fade-in text-xs">
          <div className="grid grid-cols-7 gap-1 text-center font-medium text-slate-400 dark:text-slate-400 mb-1">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-slate-700 dark:text-slate-300">
            {Array.from({ length: 31 }, (_, i) => {
              const dayNum = i + 1
              const isToday = dayNum === time.getDate()
              return (
                <div
                  key={i}
                  className={`py-0.5 rounded-md ${
                    isToday
                      ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/30'
                      : 'hover:bg-white/20 dark:hover:bg-white/10'
                  }`}
                >
                  {dayNum}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
