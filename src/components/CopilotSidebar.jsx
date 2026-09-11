import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, X, Send, Bot, User, CornerDownLeft, 
  RotateCcw, Image, Mic, Copy, Check, Terminal, Code
} from 'lucide-react'

export default function CopilotSidebar({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'copilot',
      text: "Hello! I'm your futuristic Windows 12 Copilot assistant. How can I inspire or accelerate your workflow today?",
      time: 'Just now'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const promptPills = [
    "✨ What's new in Windows 12?",
    "🚀 Generate a futuristic React UI component",
    "🎨 Change theme to Neon Cyberpunk",
    "📁 Organize my downloaded files",
  ]

  const handleSend = (textToSend) => {
    const query = (textToSend || inputText).trim()
    if (!query) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate smart AI response
    setTimeout(() => {
      let replyText = ""
      const q = query.toLowerCase()

      if (q.includes("windows 12") || q.includes("new")) {
        replyText = "Windows 12 concept introduces **Floating Detached Mica Taskbar**, direct **Desktop Interactive Widgets**, high-precision **Window scale/fade animations**, and system-wide **Neural Copilot 2.0** integrated seamlessly into your desktop."
      } else if (q.includes("react") || q.includes("ui") || q.includes("component")) {
        replyText = "Here is how you can use Framer Motion with Tailwind for Mica Glassmorphism:\n\n```jsx\n<motion.div\n  initial={{ scale: 0.95, opacity: 0 }}\n  animate={{ scale: 1, opacity: 1 }}\n  className=\"bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl\"\n>\n  {children}\n</motion.div>\n```"
      } else if (q.includes("theme") || q.includes("wallpaper")) {
        replyText = "I've applied your futuristic deep violet rose bloom wallpaper. You can also toggle light/dark modes instantly from the Action Center or in Windows Settings!"
      } else if (q.includes("files") || q.includes("organize")) {
        replyText = "I scanned your storage: 420 GB free on (C:). Would you like me to bundle your recent screenshots and archive temporary downloads?"
      } else {
        replyText = `Understood! I've analyzed "${query}". With the Windows 12 neural engine, I can automate this task, generate code, or customize your workspace on the fly.`
      }

      const copilotMsg = {
        id: Date.now() + 1,
        sender: 'copilot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, copilotMsg])
      setIsTyping(false)
    }, 900)
  }

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'copilot',
        text: "Chat cleared. Ready for your next idea or question!",
        time: 'Just now'
      }
    ])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0.5 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 right-0 h-[calc(100vh-80px)] w-96 max-w-[90vw] z-40 rounded-l-3xl bg-white/40 dark:bg-black/45 backdrop-blur-3xl border-l border-t border-b border-white/25 dark:border-white/10 shadow-2xl flex flex-col select-none overflow-hidden my-auto"
          style={{ top: '12px' }}
        >
          {/* Header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-white/20 dark:border-white/10 bg-white/20 dark:bg-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  Copilot AI
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-semibold uppercase">
                    PRO
                  </span>
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Next-Gen System Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="p-1.5 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-colors text-slate-600 dark:text-slate-400"
                title="Close Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 select-text">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'copilot' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed relative group ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-600/20'
                      : 'bg-white/60 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-white/30 dark:border-white/10 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-black/5 dark:border-white/5 text-[9px] opacity-70">
                    <span>{msg.time}</span>
                    {msg.sender === 'copilot' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/20"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 dark:bg-slate-800 flex items-center justify-center text-slate-200 shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pl-9">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Copilot is formulating...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
            {promptPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pill.replace(/^[^\s]+\s/, ''))}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-white/15 transition-colors shrink-0"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-white/20 dark:border-white/10 bg-white/20 dark:bg-white/5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/60 dark:bg-black/40 border border-white/30 dark:border-white/10 shadow-inner">
              <input
                type="text"
                placeholder="Ask Copilot anything..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend()
                }}
                className="flex-1 bg-transparent text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="p-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white transition-all shadow-sm shadow-cyan-600/30"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Powered by GPT-5 Quantum
              </span>
              <span>Press Enter ↵</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
