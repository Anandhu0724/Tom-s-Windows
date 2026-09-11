import React, { useState } from 'react'
import { 
  Laptop, Moon, Sun, Palette, Shield, Wifi, Volume2, 
  Sparkles, Check, Image as ImageIcon, Info
} from 'lucide-react'

export default function Settings({ isDarkMode, setIsDarkMode, currentWallpaper, setWallpaper }) {
  const [activeTab, setActiveTab] = useState('personalization')

  const tabs = [
    { id: 'system', name: 'System', icon: Laptop },
    { id: 'personalization', name: 'Personalization', icon: Palette },
    { id: 'network', name: 'Network & Internet', icon: Wifi },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
  ]

  const wallpapers = [
    { name: 'Futuristic Bloom Rose (User Default)', src: '/wallpaper.jpg' },
    { name: 'Cosmic Violet Flow', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80' },
    { name: 'Cyber Silk Wave', src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80' },
    { name: 'Aurora Borealis Glass', src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80' },
  ]

  return (
    <div className="flex h-full select-none text-slate-800 dark:text-slate-200 bg-white/40 dark:bg-[#10111a]/80">
      {/* Sidebar */}
      <div className="w-56 p-3 border-r border-white/20 dark:border-white/10 space-y-1 bg-white/20 dark:bg-black/30">
        <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-500/20">
            W12
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Admin User</div>
            <div className="text-[10px] text-cyan-600 dark:text-cyan-400">Windows Insider</div>
          </div>
        </div>

        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold'
                  : 'hover:bg-white/30 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </div>

      {/* Main Settings Content */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {activeTab === 'personalization' && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Personalization</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Customize your Windows 12 Mica experience, theme, and desktop wallpapers.
            </p>

            {/* Theme Toggle */}
            <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Appearance Mode</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Currently running in {isDarkMode ? 'Dark' : 'Light'} theme with Mica glassmorphism.
                </p>
              </div>
              <div className="flex items-center gap-2 p-1 rounded-xl bg-black/10 dark:bg-black/40 border border-white/10">
                <button
                  onClick={() => setIsDarkMode(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !isDarkMode ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setIsDarkMode(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isDarkMode ? 'bg-cyan-600 shadow text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Wallpapers */}
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                Desktop Background
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {wallpapers.map((wp, idx) => (
                  <div
                    key={idx}
                    onClick={() => setWallpaper(wp.src)}
                    className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all aspect-video group ${
                      currentWallpaper === wp.src
                        ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
                        : 'border-white/20 hover:border-white/60'
                    }`}
                  >
                    <img src={wp.src} alt={wp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-end text-white">
                      <span className="text-xs font-medium truncate">{wp.name}</span>
                    </div>
                    {currentWallpaper === wp.src && (
                      <div className="absolute top-2 right-2 p-1 rounded-full bg-cyan-500 text-white shadow">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">System Information</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Device hardware specifications and Windows 12 OS build details.
            </p>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Neural Surface Studio 12</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Windows 12 Pro (Insider Dev Preview)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20 dark:border-white/10 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Processor:</span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Snapdragon X2 Neural NPU / Intel Core Ultra 9</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Installed RAM:</span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">32.0 GB High-Speed LPDDR5X</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">OS Build:</span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">26000.1000.win12_fe</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Experience:</span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Mica Glassmorphism 2.0 with Copilot Pro</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'network' || activeTab === 'privacy') && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            <Info className="w-10 h-10 mx-auto mb-2 text-cyan-500/80" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {activeTab === 'network' ? 'Network & Wi-Fi 7' : 'Windows 12 Security Shield'}
            </h3>
            <p className="text-xs mt-1">Everything is secured and operating smoothly.</p>
          </div>
        )}
      </div>
    </div>
  )
}
