import React, { useState } from 'react'
import { 
  Globe, ArrowLeft, ArrowRight, RotateCw, Plus, X, Search, 
  ShieldCheck, Star, ExternalLink, Compass, Bookmark
} from 'lucide-react'

export default function Browser() {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Windows 12 Concept Hub', url: 'https://windows12.microsoft.com', active: true },
    { id: 2, title: 'Copilot AI Experience', url: 'https://copilot.microsoft.com', active: false },
  ])
  const [urlInput, setUrlInput] = useState('https://windows12.microsoft.com')
  const [activeTabId, setActiveTabId] = useState(1)

  const quickLinks = [
    { title: 'GitHub', url: 'https://github.com', color: 'from-slate-700 to-slate-900', icon: '⚡' },
    { title: 'ChatGPT', url: 'https://chatgpt.com', color: 'from-emerald-600 to-teal-700', icon: '🤖' },
    { title: 'YouTube', url: 'https://youtube.com', color: 'from-red-500 to-rose-700', icon: '▶️' },
    { title: 'Reddit', url: 'https://reddit.com', color: 'from-orange-500 to-amber-600', icon: '💬' },
    { title: 'Unsplash', url: 'https://unsplash.com', color: 'from-blue-600 to-indigo-700', icon: '📷' },
    { title: 'Vercel', url: 'https://vercel.com', color: 'from-neutral-800 to-black', icon: '▲' },
  ]

  const switchTab = (id) => {
    setActiveTabId(id)
    const tab = tabs.find(t => t.id === id)
    if (tab) setUrlInput(tab.url)
  }

  const addTab = () => {
    const newId = Date.now()
    const newTab = { id: newId, title: 'New Tab', url: 'https://start.windows12.com', active: true }
    setTabs([...tabs, newTab])
    setActiveTabId(newId)
    setUrlInput(newTab.url)
  }

  const closeTab = (id, e) => {
    e.stopPropagation()
    if (tabs.length === 1) return
    const newTabs = tabs.filter(t => t.id !== id)
    setTabs(newTabs)
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id)
      setUrlInput(newTabs[0].url)
    }
  }

  return (
    <div className="flex flex-col h-full select-none bg-slate-50 dark:bg-[#0c0d14] text-slate-800 dark:text-slate-200">
      {/* Tab Strip */}
      <div className="flex items-center px-2 pt-2 bg-white/20 dark:bg-black/30 border-b border-white/20 dark:border-white/10 gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            className={`flex items-center gap-2 max-w-[200px] px-3 py-1.5 rounded-t-xl text-xs font-medium cursor-pointer transition-all ${
              activeTabId === tab.id
                ? 'bg-white/80 dark:bg-[#1a1b26] text-cyan-600 dark:text-cyan-300 shadow-sm'
                : 'hover:bg-white/40 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{tab.title}</span>
            <button
              onClick={(e) => closeTab(tab.id, e)}
              className="p-0.5 rounded-md hover:bg-black/10 dark:hover:bg-white/20 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={addTab}
          className="p-1.5 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
          title="New tab"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Address & Navigation Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/40 dark:bg-[#141520] border-b border-white/20 dark:border-white/10">
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* URL Input */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-[#0b0c13] border border-white/30 dark:border-white/10 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-slate-200"
          />
          <Star className="w-3.5 h-3.5 text-slate-400 hover:text-amber-400 cursor-pointer" />
        </div>
      </div>

      {/* Browser Viewport */}
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white/30 dark:from-slate-900/30 to-transparent">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-cyan-500/25 mb-4">
            <Compass className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Microsoft Edge for Windows 12
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
            Futuristic web browsing with Copilot intelligence and next-gen mica glass acceleration.
          </p>

          {/* Quick Search */}
          <div className="w-full max-w-lg relative mb-8">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search with Bing or enter web address"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Quick Links Grid */}
          <div className="w-full max-w-lg">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 text-left">
              Frequently Visited
            </div>
            <div className="grid grid-cols-3 gap-3">
              {quickLinks.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setUrlInput(item.url)}
                  className="flex flex-col items-center p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 transition-all cursor-pointer group shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-lg text-white shadow-md group-hover:scale-105 transition-transform mb-1.5`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
