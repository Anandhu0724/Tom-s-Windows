import React, { useState } from 'react'
import { Delete, Divide, Equal, Minus, Plus, X, RotateCcw } from 'lucide-react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [newNumber, setNewNumber] = useState(true)

  const handleDigit = (digit) => {
    if (newNumber || display === '0') {
      setDisplay(digit)
      setNewNumber(false)
    } else {
      setDisplay(display + digit)
    }
  }

  const handleOperator = (op) => {
    setEquation(`${display} ${op} `)
    setNewNumber(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
    setNewNumber(true)
  }

  const handleCalculate = () => {
    try {
      const fullEq = equation + display
      const sanitized = fullEq.replace(/×/g, '*').replace(/÷/g, '/')
      // Safe math eval with Function
      const result = new Function(`return ${sanitized}`)()
      setDisplay(String(Number(result.toFixed(6))))
      setEquation('')
      setNewNumber(true)
    } catch {
      setDisplay('Error')
      setEquation('')
      setNewNumber(true)
    }
  }

  const buttons = [
    { label: 'C', action: handleClear, type: 'action' },
    { label: '±', action: () => setDisplay(String(-parseFloat(display))), type: 'action' },
    { label: '%', action: () => setDisplay(String(parseFloat(display) / 100)), type: 'action' },
    { label: '÷', action: () => handleOperator('/'), type: 'op' },

    { label: '7', action: () => handleDigit('7'), type: 'num' },
    { label: '8', action: () => handleDigit('8'), type: 'num' },
    { label: '9', action: () => handleDigit('9'), type: 'num' },
    { label: '×', action: () => handleOperator('*'), type: 'op' },

    { label: '4', action: () => handleDigit('4'), type: 'num' },
    { label: '5', action: () => handleDigit('5'), type: 'num' },
    { label: '6', action: () => handleDigit('6'), type: 'num' },
    { label: '-', action: () => handleOperator('-'), type: 'op' },

    { label: '1', action: () => handleDigit('1'), type: 'num' },
    { label: '2', action: () => handleDigit('2'), type: 'num' },
    { label: '3', action: () => handleDigit('3'), type: 'num' },
    { label: '+', action: () => handleOperator('+'), type: 'op' },

    { label: '0', action: () => handleDigit('0'), type: 'num', span: 'col-span-2' },
    { label: '.', action: () => { if (!display.includes('.')) handleDigit('.') }, type: 'num' },
    { label: '=', action: handleCalculate, type: 'equal' },
  ]

  return (
    <div className="flex flex-col h-full bg-white/40 dark:bg-[#0f1019]/90 p-4 text-slate-800 dark:text-slate-100 select-none">
      {/* Display */}
      <div className="flex flex-col justify-end items-end p-4 mb-4 rounded-2xl bg-white/50 dark:bg-black/40 border border-white/20 dark:border-white/10 h-28">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono h-5">
          {equation}
        </span>
        <span className="text-3xl font-extrabold tracking-tight font-mono truncate max-w-full">
          {display}
        </span>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((btn, idx) => {
          let style = "rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center "
          if (btn.type === 'num') {
            style += "bg-white/60 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 text-slate-800 dark:text-white "
          } else if (btn.type === 'op') {
            style += "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold "
          } else if (btn.type === 'equal') {
            style += "bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/30 "
          } else {
            style += "bg-slate-200/60 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 "
          }
          if (btn.span) style += btn.span

          return (
            <button key={idx} onClick={btn.action} className={style}>
              {btn.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
