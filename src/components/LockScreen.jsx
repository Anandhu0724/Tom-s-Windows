import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Eye, EyeOff, KeyRound, Wifi, Battery, 
  Power, Moon, RotateCcw, ChevronUp, Sparkles, AlertCircle 
} from 'lucide-react';

export default function LockScreen({ isLocked, onUnlock, wallpaper }) {
  const [stage, setStage] = useState('glance'); // 'glance' | 'login'
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  // Update clock on lockscreen
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard handler: any key on glance screen moves to login screen; Enter submits password
  useEffect(() => {
    if (!isLocked) return;

    const handleKeyDown = (e) => {
      if (stage === 'glance') {
        setStage('login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, stage]);

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    if (!password) return;

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      if (password === '1111') {
        setIsVerifying(true);
        setTimeout(() => {
          setIsVerifying(false);
          setPassword('');
          onUnlock();
          setStage('glance');
        }, 800);
      } else {
        setIsVerifying(false);
        setErrorMsg('The PIN is incorrect. Try again.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 400);
  };

  if (!isLocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed inset-0 z-[10000] w-screen h-screen overflow-hidden select-none bg-black text-white font-['Plus_Jakarta_Sans',sans-serif]"
      >
        {/* Background Wallpaper */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
            stage === 'login' ? 'filter blur-2xl brightness-50 scale-105' : 'filter brightness-90'
          }`}
          style={{ backgroundImage: `url(${wallpaper || '/wallpaper.jpg'})` }}
        />

        {/* ================= STAGE 1: GLANCE SCREEN (Windows 10 / 11 Mix) ================= */}
        {stage === 'glance' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setStage('login')}
            className="relative z-10 w-full h-full flex flex-col justify-between p-10 cursor-pointer"
          >
            {/* Top Windows 11 Center-Styled Giant Clock */}
            <div className="pt-16 flex flex-col items-center text-center">
              <h1 className="text-8xl md:text-9xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                {timeStr}
              </h1>
              <p className="mt-2 text-xl md:text-2xl font-medium text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {dateStr}
              </p>

              {/* Windows Spotlight / Tom's Glance Snippet */}
              <div className="mt-8 px-4 py-2 rounded-2xl bg-white/15 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-lg flex items-center gap-3 text-xs text-slate-200">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Windows 12 Insider • Protected by Tom Security</span>
              </div>
            </div>

            {/* Bottom Glance Info */}
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-2">
                <ChevronUp className="w-4 h-4 animate-bounce text-cyan-400" />
                <span className="font-medium tracking-wide">Swipe up, click, or press any key to unlock</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-4 h-4" />
                  <span>Wi-Fi 7</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Battery className="w-4 h-4" />
                  <span>100%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= STAGE 2: LOGIN ACRYLIC SCREEN (Password: 1111) ================= */}
        {stage === 'login' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6"
          >
            {/* Login Card */}
            <div className="flex flex-col items-center max-w-sm w-full">
              {/* User Avatar with Glowing Glass Ring */}
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1 shadow-2xl shadow-cyan-500/20 ring-4 ring-white/20">
                  <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-white font-bold text-3xl">
                    W12
                  </div>
                </div>
                <div className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              {/* Username */}
              <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow mb-1">
                Administrator
              </h2>
              <p className="text-xs text-slate-300 mb-6 font-medium">
                Windows 12 Insider Preview
              </p>

              {/* Verifying Spinner or Input Box */}
              {isVerifying ? (
                <div className="flex flex-col items-center gap-3 my-4">
                  <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                  <span className="text-sm font-medium text-slate-200">Signing in...</span>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="w-full space-y-3">
                  {/* Password Input Box */}
                  <motion.div
                    animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex items-center rounded-xl bg-white/20 dark:bg-black/40 backdrop-blur-2xl border border-white/30 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/30 transition-all shadow-xl"
                  >
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter PIN (1111)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus
                      maxLength={12}
                      className="w-full px-4 py-2.5 bg-transparent text-sm text-white placeholder-slate-300 focus:outline-none tracking-widest"
                    />

                    {/* Show/Hide password toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-slate-300 hover:text-white transition-colors"
                      title={showPassword ? "Hide PIN" : "Show PIN"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    {/* Submit Arrow */}
                    <button
                      type="submit"
                      disabled={!password}
                      className="mr-1 p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white transition-colors shadow"
                      title="Submit PIN"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  {/* Error Message */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-xs text-rose-300 font-medium px-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{errorMsg} (Hint: 1111)</span>
                    </motion.div>
                  )}

                  {/* Sign in options */}
                  <div className="flex items-center justify-between text-xs text-slate-300 pt-2 px-1">
                    <button
                      type="button"
                      onClick={() => setPassword('1111')}
                      className="hover:text-cyan-400 underline transition-colors"
                    >
                      Autofill PIN (1111)
                    </button>

                    <button
                      type="button"
                      onClick={() => setStage('glance')}
                      className="hover:text-white transition-colors"
                    >
                      Back to Glance
                    </button>
                  </div>
                </form>
              )}

              {/* Tom The Cat Lockscreen Tease */}
              <div className="mt-8 px-4 py-2 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
                <span className="text-base">🐾</span>
                <span>Tom says: <em>"Password is 1111. Don't hurt your brain."</em></span>
              </div>
            </div>

            {/* Bottom Right System Icons & Power Menu */}
            <div className="absolute bottom-6 right-8 flex items-center gap-4 text-slate-300">
              <Wifi className="w-4 h-4 cursor-pointer hover:text-white" />
              <div className="relative">
                <button
                  onClick={() => setShowPowerMenu(!showPowerMenu)}
                  className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Power"
                >
                  <Power className="w-4 h-4" />
                </button>

                {showPowerMenu && (
                  <div className="absolute right-0 bottom-12 w-40 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/20 p-1.5 space-y-1 shadow-2xl text-xs z-30 animate-fade-in">
                    <button
                      onClick={() => { setShowPowerMenu(false); alert("Entering Sleep Mode..."); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 text-slate-200"
                    >
                      <Moon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Sleep</span>
                    </button>
                    <button
                      onClick={() => { setShowPowerMenu(false); window.location.reload(); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 text-slate-200"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Restart</span>
                    </button>
                    <button
                      onClick={() => { setShowPowerMenu(false); alert("Shutting Down Windows 12..."); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-rose-500/20 text-rose-400"
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>Shut Down</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
