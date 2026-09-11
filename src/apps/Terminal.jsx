import React, { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react'

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Windows PowerShell v12.0.26000 [Mica Console]' },
    { type: 'system', text: 'Copyright (C) Microsoft Corporation. All rights reserved.' },
    { type: 'system', text: 'Type "help" to see available futuristic commands.\n' },
  ])
  const [inputVal, setInputVal] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim()
      const newHistory = [...history, { type: 'user', text: `PS C:\\Users\\Windows12> ${cmd}` }]

      switch (cmd.toLowerCase()) {
        case 'help':
          newHistory.push({
            type: 'output',
            text: `Available Commands:
  • winver        - Displays Windows 12 Version & Build
  • copilot       - Prompts Copilot AI system status
  • neofetch      - Shows futuristic OS specifications & ASCII banner
  • matrix        - Simulates cyber neural matrix stream
  • date          - Prints current timestamp
  • clear / cls   - Clears the terminal screen
  • echo [text]   - Outputs specified text`
          })
          break
        case 'winver':
          newHistory.push({
            type: 'output',
            text: 'Microsoft Windows 12 Pro Insider Preview\nBuild 26000.1000 (Mica Fluency Engine)'
          })
          break
        case 'copilot':
          newHistory.push({
            type: 'output',
            text: '✨ Copilot Neural Engine: ONLINE (Latency: 12ms, Model: GPT-5 Quantum)'
          })
          break
        case 'neofetch':
          newHistory.push({
            type: 'output',
            text: `   ___ _  _ ___   OS: Windows 12 Pro x64
  | _ \\ || |_ _|  Host: Neural Surface Pro 12
  |  _/ __ || |   Kernel: NT 12.0.26000
  |_| |_||_|___|  Uptime: 4 hours, 18 mins
                  Shell: PowerShell v12.0
                  Theme: Windows 12 Mica Dark
                  Wallpaper: Deep Violet Rose Bloom
                  CPU: Intel Core Ultra 9 / Qualcomm Snapdragon X2
                  Memory: 6.4GB / 32GB (20%)`
          })
          break
        case 'matrix':
          newHistory.push({
            type: 'output',
            text: '01001111 01010011 00100000 01010111 01001001 01001110 00110001 00110010\n[Neural Link Established. Windows 12 Quantum Virtualization Active]'
          })
          break
        case 'date':
          newHistory.push({
            type: 'output',
            text: new Date().toString()
          })
          break
        case 'clear':
        case 'cls':
          setHistory([])
          setInputVal('')
          return
        case '':
          break
        default:
          if (cmd.toLowerCase().startsWith('echo ')) {
            newHistory.push({ type: 'output', text: cmd.slice(5) })
          } else {
            newHistory.push({
              type: 'error',
              text: `'${cmd}' is not recognized as an internal or external command. Type 'help' for options.`
            })
          }
      }

      setHistory(newHistory)
      setInputVal('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0d0f18]/95 font-['JetBrains_Mono',monospace] text-xs text-slate-200 p-4 select-text">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-white/10 text-cyan-400">
        <TerminalIcon className="w-4 h-4" />
        <span className="font-semibold">Windows PowerShell v12</span>
        <Sparkles className="w-3.5 h-3.5 ml-auto text-cyan-400/60" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 leading-relaxed">
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              item.type === 'system'
                ? 'text-slate-400'
                : item.type === 'user'
                ? 'text-cyan-300 font-medium'
                : item.type === 'error'
                ? 'text-rose-400'
                : 'text-emerald-300'
            }`}
          >
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-2">
        <span className="text-cyan-400 font-semibold shrink-0">PS C:\Users\Windows12&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
          className="flex-1 bg-transparent text-slate-100 focus:outline-none caret-cyan-400"
        />
      </div>
    </div>
  )
}
