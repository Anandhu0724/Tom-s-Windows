import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wifi, Bluetooth, Moon, Sun, Volume2, SunMedium, 
  Plane, Eye, BatteryCharging, Shield, Sparkles
} from 'lucide-react'

export default function ActionCenter({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  setIsDarkMode 
}) {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  const [airplane, setAirplane] = useState(false)
  const [nightLight, setNightLight] = useState(false)
  const [volume, setVolume] = useState(75)
  const [brightness, setBrightness] = useState(90)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 right-6 z-50 w-80 rounded-3xl bg-white/40 dark:bg-black/50 backdrop-blur-3xl border border-white/30 dark:border-white/10 shadow-2xl p-4 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Quick Setting Tiles */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {/* Wi-Fi */}
            <button
              onClick={() => setWifi(!wifi)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                wifi
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-white/30 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/40'
              }`}
            >
              <Wifi className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">{wifi ? 'Wi-Fi 7' : 'Off'}</span>
            </button>

            {/* Bluetooth */}
            <button
              onClick={() => setBluetooth(!bluetooth)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                bluetooth
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-white/30 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/40'
              }`}
            >
              <Bluetooth className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">{bluetooth ? 'On' : 'Off'}</span>
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                isDarkMode
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-white/30 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/40'
              }`}
            >
              {isDarkMode ? <Moon className="w-5 h-5 mb-1" /> : <Sun className="w-5 h-5 mb-1" />}
              <span className="text-[11px] font-medium">{isDarkMode ? 'Dark' : 'Light'}</span>
            </button>

            {/* Airplane Mode */}
            <button
              onClick={() => setAirplane(!airplane)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                airplane
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-white/30 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/40'
              }`}
            >
              <Plane className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">Airplane</span>
            </button>

            {/* Night Light */}
            <button
              onClick={() => setNightLight(!nightLight)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                nightLight
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-white/30 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/40'
              }`}
            >
              <Eye className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">Night Light</span>
            </button>

            {/* Neural Acceleration */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-5 h-5 mb-1 animate-pulse" />
              <span className="text-[11px] font-medium">NPU 100%</span>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 p-3 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10">
            {/* Brightness */}
            <div className="flex items-center gap-3">
              <SunMedium className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
                className="w-full accent-cyan-500 h-1.5 bg-black/20 dark:bg-white/20 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono w-8 text-right text-slate-600 dark:text-slate-300">
                {brightness}%
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full accent-cyan-500 h-1.5 bg-black/20 dark:bg-white/20 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono w-8 text-right text-slate-600 dark:text-slate-300">
                {volume}%
              </span>
            </div>
          </div>

          {/* Footer with Battery status */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 px-1">
            <div className="flex items-center gap-1.5">
              <BatteryCharging className="w-4 h-4 text-emerald-500" />
              <span>96% Fully Charged</span>
            </div>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
              Power Mode: Efficient
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
