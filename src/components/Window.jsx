import React from 'react'
import { Rnd } from 'react-rnd'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Square, Copy, X } from 'lucide-react'

export default function Window({
  id,
  title,
  icon: Icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  defaultPosition = { x: 100, y: 50 },
  defaultSize = { width: 750, height: 500 },
  minWidth = 360,
  minHeight = 300,
  children,
}) {
  if (!isOpen || isMinimized) return null

  return (
    <Rnd
      style={{ zIndex }}
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      position={isMaximized ? { x: 8, y: 8 } : undefined}
      size={
        isMaximized
          ? { width: 'calc(100vw - 16px)', height: 'calc(100vh - 84px)' }
          : undefined
      }
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      bounds="window"
      minWidth={minWidth}
      minHeight={minHeight}
      dragHandleClassName="window-titlebar"
      onMouseDown={() => onFocus(id)}
      className="select-none"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full flex flex-col rounded-2xl overflow-hidden bg-white/45 dark:bg-black/45 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl shadow-black/40 ring-1 ring-black/5"
      >
        {/* Mica Window Titlebar */}
        <div
          className="window-titlebar h-10 px-3 flex items-center justify-between border-b border-white/20 dark:border-white/10 bg-white/30 dark:bg-white/5 cursor-move"
          onDoubleClick={() => onMaximize(id)}
        >
          {/* App Info */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            {Icon && <Icon className="w-4 h-4 text-cyan-500" />}
            <span className="tracking-wide">{title}</span>
          </div>

          {/* Windows 12 Controls: Minimize, Maximize, Close */}
          <div className="flex items-center gap-1 no-drag">
            <button
              onClick={() => onMinimize(id)}
              className="w-8 h-7 flex items-center justify-center rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
              title="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onMaximize(id)}
              className="w-8 h-7 flex items-center justify-center rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
              title={isMaximized ? "Restore Down" : "Maximize"}
            >
              {isMaximized ? (
                <Copy className="w-3 h-3" />
              ) : (
                <Square className="w-3 h-3" />
              )}
            </button>
            <button
              onClick={() => onClose(id)}
              className="close-btn w-8 h-7 flex items-center justify-center rounded-lg hover:bg-rose-500 hover:text-white transition-colors text-slate-600 dark:text-slate-300"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Window App Body */}
        <div className="flex-1 relative overflow-hidden bg-white/20 dark:bg-black/20">
          {children}
        </div>
      </motion.div>
    </Rnd>
  )
}
