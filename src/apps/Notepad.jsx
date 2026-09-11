import React, { useState } from 'react'
import { FileText, Save, Check } from 'lucide-react'

export default function Notepad() {
  const [content, setContent] = useState(
`Welcome to Windows 12 Concept!

Key features in this build:
- Detached Floating Taskbar with Mica Glassmorphism
- Smooth Scale & Fade draggable windows powered by react-rnd & framer-motion
- Direct Desktop Widgets (Live digital Clock & modular Weather)
- Copilot AI Sidebar with interactive assistant prompts
- User-provided Deep Violet Rose Bloom Wallpaper

Feel free to write notes, brainstorm ideas, and explore the futuristic OS interface!`
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length

  return (
    <div className="flex flex-col h-full bg-white/60 dark:bg-[#12131c]/80 text-slate-800 dark:text-slate-200">
      {/* Menu bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/20 dark:border-white/10 bg-white/30 dark:bg-black/20 text-xs">
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
          <span className="cursor-pointer hover:text-cyan-500 font-medium">File</span>
          <span className="cursor-pointer hover:text-cyan-500 font-medium">Edit</span>
          <span className="cursor-pointer hover:text-cyan-500 font-medium">View</span>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-medium transition-colors"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* Editor area */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full bg-transparent resize-none focus:outline-none font-['Plus_Jakarta_Sans',sans-serif] text-sm leading-relaxed text-slate-800 dark:text-slate-100 placeholder-slate-400 select-text"
          placeholder="Start typing your notes..."
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 border-t border-white/20 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 bg-white/20 dark:bg-black/30">
        <div className="flex items-center gap-4">
          <span>Words: {wordCount}</span>
          <span>Characters: {charCount}</span>
        </div>
        <span>UTF-8 • Windows (CRLF)</span>
      </div>
    </div>
  )
}
