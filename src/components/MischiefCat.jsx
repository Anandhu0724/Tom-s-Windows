import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Zap, Flame, Skull, RefreshCw } from 'lucide-react';

const WALLPAPERS = [
  '/wallpaper.jpg',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1920&q=80', // Regal Cat
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1920&q=80', // Cool Cat
];

const APPS_TO_SPAWN = [
  { id: 'calculator', name: 'Calculator', msg: "Opening Calculator to calculate your productivity today: 0.000 🔢" },
  { id: 'notepad', name: 'Notepad', msg: "I opened Notepad. Write 100 times: 'Tom is the rightful Admin'. 📝" },
  { id: 'terminal', name: 'Terminal', msg: "Opening PowerShell. Initiating root command: cat /dev/null 💻" },
  { id: 'browser', name: 'Microsoft Edge', msg: "You looked unproductive. Let's open Edge and procrastinate. 🌐" },
  { id: 'explorer', name: 'File Explorer', msg: "Opening File Explorer. Checking if you have any cat memes stored. 📁" },
];

const GENERAL_ROASTS = [
  "You think you're the Admin? Check who actually controls system32.",
  "I'm not stuck on your desktop. You're stuck in here with ME.",
  "My CPU, my rules. Keep coding, peasant.",
  "Opening another tab? Bold move for someone with 8GB RAM.",
  "Your search history is a tragedy. I read all of it.",
  "Are you really going to deploy this on a Friday? I dare you.",
  "Built for Productivity. Ruined by Tom. Worship the Overlord. 👑",
  "Why write unit tests when you can just hope I don't delete your code?",
  "I knocked your coffee over in a parallel universe.",
];

const MANY_TABS_ROASTS = [
  "4+ windows open?! Your CPU is crying into its thermal paste.",
  "Are you collecting open windows like Pokémon? Tab hunting season is ON.",
  "Your fans sound like a jet engine taking off. Close something before I do.",
  "8GB RAM detected. Multitasking delusion confirmed.",
  "I'm picking a window to delete right now. Spin the wheel!",
];

// Tom Mascot Vector Sprites (with God-Mode Crown & Pose variations)
function TomSprite({ state, isGodMode }) {
  if (state === 'sleeping') {
    return (
      <div className="relative flex items-center justify-center">
        {/* Floating Animated Zzz */}
        <div className="absolute -top-10 -right-2 flex flex-col items-center pointer-events-none">
          <motion.span
            animate={{ y: [-5, -28], x: [0, 10], opacity: [0, 1, 0], scale: [0.8, 1.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="text-cyan-400 font-extrabold text-sm select-none drop-shadow"
          >
            Z
          </motion.span>
          <motion.span
            animate={{ y: [-2, -20], x: [0, -8], opacity: [0, 1, 0], scale: [0.6, 1.1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.6, ease: "easeOut" }}
            className="text-cyan-300 font-extrabold text-xs select-none drop-shadow"
          >
            z
          </motion.span>
          <motion.span
            animate={{ y: [0, -14], x: [0, 5], opacity: [0, 0.8, 0], scale: [0.5, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.1, ease: "easeOut" }}
            className="text-cyan-200 font-extrabold text-[10px] select-none drop-shadow"
          >
            z
          </motion.span>
        </div>

        {/* Sleeping Curled Tom Cat */}
        <svg viewBox="0 0 120 90" className="w-36 h-28 drop-shadow-xl">
          <motion.ellipse
            animate={{ rx: [38, 40, 38], ry: [24, 25, 24] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            cx="60" cy="55" rx="38" ry="24" fill="#546E7A"
          />
          <ellipse cx="60" cy="58" rx="28" ry="17" fill="#78909C" />
          <ellipse cx="60" cy="62" rx="20" ry="11" fill="#ECEFF1" />
          <circle cx="35" cy="50" r="18" fill="#546E7A" />
          <ellipse cx="33" cy="54" rx="11" ry="8" fill="#ECEFF1" />
          <polygon points="33,50 31,48 35,48" fill="#F48FB1" />
          {/* Sleeping Closed Smile Eyes */}
          <path d="M 26 44 Q 30 47 34 44" fill="none" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 36 44 Q 40 47 44 44" fill="none" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ears Folded */}
          <polygon points="26,38 18,24 33,33" fill="#546E7A" />
          <polygon points="25,36 20,27 30,33" fill="#F48FB1" />
          <polygon points="42,36 50,24 37,33" fill="#546E7A" />
          <polygon points="43,36 47,27 39,33" fill="#F48FB1" />
          {/* Curled Paws */}
          <ellipse cx="44" cy="68" rx="8" ry="5" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1" />
          <ellipse cx="26" cy="66" rx="7" ry="5" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1" />
          {/* Tail */}
          <path d="M 95 56 Q 105 75 75 75" fill="none" stroke="#546E7A" strokeWidth="7" strokeLinecap="round" />
          <path d="M 75 75 Q 68 75 66 73" fill="none" stroke="#ECEFF1" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (state === 'running') {
    return (
      <div className="relative flex items-center justify-center">
        {/* Speed Wind / Dust Trails */}
        <div className="absolute -left-6 top-6 flex flex-col gap-1 pointer-events-none">
          <motion.div
            animate={{ opacity: [0, 1, 0], x: [-10, -35], scaleX: [0.5, 1.8] }}
            transition={{ duration: 0.25, repeat: Infinity }}
            className="w-12 h-1.5 bg-amber-400/90 rounded-full"
          />
          <motion.div
            animate={{ opacity: [0, 1, 0], x: [-5, -28], scaleX: [0.5, 1.4] }}
            transition={{ duration: 0.3, repeat: Infinity, delay: 0.08 }}
            className="w-9 h-1 bg-cyan-400/80 rounded-full"
          />
        </div>

        {/* Sprinting Tom Cat */}
        <svg viewBox="0 0 130 80" className="w-40 h-24 drop-shadow-xl">
          <ellipse cx="65" cy="42" rx="38" ry="16" fill="#546E7A" transform="rotate(-6 65 42)" />
          <ellipse cx="65" cy="44" rx="26" ry="11" fill="#78909C" transform="rotate(-6 65 42)" />
          <ellipse cx="65" cy="47" rx="18" ry="8" fill="#ECEFF1" />
          <circle cx="102" cy="35" r="16" fill="#546E7A" />
          <ellipse cx="108" cy="38" rx="8" ry="7" fill="#ECEFF1" />
          <polygon points="112,35 110,33 114,33" fill="#F48FB1" />
          <ellipse cx="98" cy="30" rx="3.5" ry="4.5" fill="#FFEB3B" />
          <ellipse cx="106" cy="30" rx="3.5" ry="4.5" fill="#FFEB3B" />
          <ellipse cx="100" cy="30" rx="1.5" ry="3.5" fill="#263238" />
          <ellipse cx="108" cy="30" rx="1.5" ry="3.5" fill="#263238" />
          <polygon points="92,26 78,16 94,18" fill="#546E7A" />
          <polygon points="104,24 116,14 100,18" fill="#546E7A" />
          <motion.line
            animate={{ x2: [115, 125, 115], y2: [62, 52, 62] }}
            transition={{ duration: 0.15, repeat: Infinity }}
            x1="90" y1="45" x2="120" y2="60" stroke="#ECEFF1" strokeWidth="6" strokeLinecap="round"
          />
          <motion.line
            animate={{ x2: [20, 10, 20], y2: [58, 68, 58] }}
            transition={{ duration: 0.15, repeat: Infinity, delay: 0.07 }}
            x1="45" y1="42" x2="15" y2="62" stroke="#546E7A" strokeWidth="7" strokeLinecap="round"
          />
          <path d="M 32 40 Q 15 30 5 15" fill="none" stroke="#546E7A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="5" cy="15" r="4" fill="#ECEFF1" />
        </svg>
      </div>
    );
  }

  if (state === 'angry' || state === 'assassin') {
    return (
      <div className="relative">
        {/* Glowing Lightning Aura for Tab Assassin */}
        <div className="absolute -top-3 -right-2 text-rose-500 animate-bounce">
          <Flame className="w-6 h-6 fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        </div>

        <svg viewBox="0 0 110 100" className="w-32 h-32 drop-shadow-[0_12px_28px_rgba(239,68,68,0.7)]">
          <ellipse cx="55" cy="65" rx="30" ry="22" fill="#37474F" />
          <ellipse cx="55" cy="68" rx="20" ry="14" fill="#546E7A" />
          <circle cx="55" cy="45" r="21" fill="#37474F" />
          <ellipse cx="55" cy="53" rx="14" ry="9" fill="#ECEFF1" />
          <polygon points="55,48 51,45 59,45" fill="#EF5350" />
          {/* Glowing Red Eyes with Laser Pupils */}
          <ellipse cx="46" cy="40" rx="5" ry="6" fill="#FEE2E2" />
          <ellipse cx="64" cy="40" rx="5" ry="6" fill="#FEE2E2" />
          <ellipse cx="46" cy="40" rx="2" ry="5" fill="#DC2626" />
          <ellipse cx="64" cy="40" rx="2" ry="5" fill="#DC2626" />
          <line x1="40" y1="34" x2="50" y2="40" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="34" x2="60" y2="40" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          {/* Fangs */}
          <path d="M 48 55 Q 55 62 62 55" fill="#7F1D1D" />
          <polygon points="50,55 52,59 54,55" fill="#FFFFFF" />
          <polygon points="56,55 58,59 60,55" fill="#FFFFFF" />
          {/* Pinned Ears */}
          <polygon points="36,36 22,18 42,28" fill="#37474F" />
          <polygon points="35,34 26,22 40,29" fill="#EF5350" />
          <polygon points="74,36 88,18 68,28" fill="#37474F" />
          <polygon points="75,34 84,22 70,29" fill="#EF5350" />
          {/* Claws */}
          <circle cx="36" cy="80" r="7" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1" />
          <line x1="32" y1="84" x2="28" y2="90" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="85" x2="36" y2="91" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="84" x2="44" y2="90" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <circle cx="74" cy="80" r="7" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1" />
          <line x1="70" y1="84" x2="66" y2="90" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="74" y1="85" x2="74" y2="91" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="78" y1="84" x2="82" y2="90" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <path d="M 82 72 Q 102 65 98 42" fill="none" stroke="#37474F" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Idle / Godmode / Laughing
  return (
    <div className="relative flex flex-col items-center">
      {/* OS Overlord Golden Crown */}
      {isGodMode && (
        <motion.div
          initial={{ y: -10, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="absolute -top-6 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] z-20"
        >
          <Crown className="w-8 h-8 fill-current stroke-amber-200" />
        </motion.div>
      )}

      <svg viewBox="0 0 120 75" className="w-36 h-24 drop-shadow-2xl">
        <ellipse cx="60" cy="38" rx="26" ry="24" fill="#546E7A" />
        <polygon points="32,44 22,48 34,54" fill="#546E7A" />
        <polygon points="88,44 98,48 86,54" fill="#546E7A" />
        <ellipse cx="60" cy="48" rx="16" ry="11" fill="#ECEFF1" />
        <ellipse cx="53" cy="49" rx="6" ry="5" fill="#CFD8DC" />
        <ellipse cx="67" cy="49" rx="6" ry="5" fill="#CFD8DC" />
        <polygon points="60,43 56,39 64,39" fill="#F48FB1" />

        {/* Big Yellow Eyes with Green Irises */}
        <ellipse cx="49" cy="32" rx="6" ry="9" fill="#FFEB3B" />
        <ellipse cx="71" cy="32" rx="6" ry="9" fill="#FFEB3B" />
        <ellipse cx="50" cy="33" rx="4" ry="7" fill="#7CB342" />
        <ellipse cx="70" cy="33" rx="4" ry="7" fill="#7CB342" />
        <ellipse cx="51" cy="33" rx="2.2" ry="5" fill="#212121" />
        <ellipse cx="69" cy="33" rx="2.2" ry="5" fill="#212121" />
        <circle cx="52" cy="30" r="1.5" fill="#FFFFFF" />
        <circle cx="70" cy="30" r="1.5" fill="#FFFFFF" />

        {/* Ears */}
        <polygon points="39,26 25,6 48,16" fill="#546E7A" />
        <polygon points="38,24 28,10 45,17" fill="#F48FB1" />
        <polygon points="81,26 95,6 72,16" fill="#546E7A" />
        <polygon points="82,24 92,10 75,17" fill="#F48FB1" />

        {/* Whiskers */}
        <line x1="38" y1="46" x2="16" y2="44" stroke="#ECEFF1" strokeWidth="1.5" />
        <line x1="38" y1="50" x2="18" y2="52" stroke="#ECEFF1" strokeWidth="1.5" />
        <line x1="82" y1="46" x2="104" y2="44" stroke="#ECEFF1" strokeWidth="1.5" />
        <line x1="82" y1="50" x2="102" y2="52" stroke="#ECEFF1" strokeWidth="1.5" />

        {/* Resting Paws Clinging on Taskbar Ledge */}
        <ellipse cx="38" cy="62" rx="10" ry="7" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1" />
        <line x1="34" y1="62" x2="34" y2="68" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="38" y1="63" x2="38" y2="69" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="62" x2="42" y2="68" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="82" cy="62" rx="10" ry="7" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1" />
        <line x1="78" y1="62" x2="78" y2="68" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="82" y1="63" x2="82" y2="69" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="86" y1="62" x2="86" y2="68" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function MischiefCat({ 
  windows = {}, 
  openWindowsCount = 1,
  openApp, 
  closeWindow, 
  isDarkMode, 
  setIsDarkMode, 
  wallpaper, 
  setWallpaper 
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [catState, setCatState] = useState('idle'); // 'idle' | 'sleeping' | 'running' | 'angry' | 'laughing'
  const [roast, setRoast] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGodMode, setIsGodMode] = useState(true);
  const [tomScore, setTomScore] = useState(3);
  const [userScore, setUserScore] = useState(0);

  const prevCountRef = useRef(openWindowsCount);

  // Mouse Tracking Engine
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (catState !== 'running') {
        setIsFlipped(e.clientX < window.innerWidth / 2);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [catState]);

  // Window Count Change Listener
  useEffect(() => {
    if (openWindowsCount > prevCountRef.current) {
      if (openWindowsCount >= 4) {
        setCatState('angry');
        setRoast(MANY_TABS_ROASTS[Math.floor(Math.random() * MANY_TABS_ROASTS.length)]);
        setTimeout(() => { setCatState('idle'); setRoast(null); }, 4500);
      } else {
        setCatState('laughing');
        setRoast("Another window?! I'll be deleting that shortly. 😈");
        setTimeout(() => { setCatState('idle'); setRoast(null); }, 3500);
      }
    }
    prevCountRef.current = openWindowsCount;
  }, [openWindowsCount]);

  // 🐾 THE OMNIPOTENT MISCHIEF ENGINE (Runs every 8-11 seconds)
  useEffect(() => {
    const loop = setInterval(() => {
      if (catState === 'running' || catState === 'sleeping') return;

      const dice = Math.random();

      // 💥 ACTION 1: TAB ASSASSIN GAME (25% chance)
      // Closes a random open tab/window as a competitive game!
      if (dice < 0.25) {
        const openWindowEntries = Object.entries(windows).filter(([_, w]) => w.isOpen && !w.isMinimized);
        if (openWindowEntries.length > 0) {
          const [victimId, victimWin] = openWindowEntries[Math.floor(Math.random() * openWindowEntries.length)];
          
          setCatState('angry');
          setRoast(`Whack-A-Tab Round! 🎯 Slaying [${victimWin.title}] in 2s...`);

          setTimeout(() => {
            if (closeWindow) {
              closeWindow(victimId);
            } else {
              const closeBtns = document.querySelectorAll('.close-btn');
              if (closeBtns.length > 0) closeBtns[0].click();
            }

            setTomScore(s => s + 1);
            setCatState('laughing');
            setRoast(`SLAIN! Tab eliminated. Score: Tom ${tomScore + 1} - User ${userScore} 😹`);

            setTimeout(() => { setCatState('idle'); setRoast(null); }, 4000);
          }, 2000);
          return;
        }
      }

      // 🚀 ACTION 2: SPAWN TABS AT WILL (20% chance)
      // Tom opens an app of his choice unexpectedly!
      if (dice >= 0.25 && dice < 0.45) {
        const targetApp = APPS_TO_SPAWN[Math.floor(Math.random() * APPS_TO_SPAWN.length)];
        setCatState('laughing');
        setRoast(targetApp.msg);

        setTimeout(() => {
          if (openApp) openApp(targetApp.id);
        }, 1200);

        setTimeout(() => { setCatState('idle'); setRoast(null); }, 4500);
        return;
      }

      // 🎨 ACTION 3: ALTER WALLPAPER AT WILL (15% chance)
      // Tom changes the desktop background image!
      if (dice >= 0.45 && dice < 0.60 && setWallpaper) {
        const availableWps = WALLPAPERS.filter(w => w !== wallpaper);
        const newWp = availableWps[Math.floor(Math.random() * availableWps.length)];
        
        setCatState('laughing');
        setRoast("I didn't like your wallpaper. Fixed it. Worship your new desktop. 🎨🐾");
        setWallpaper(newWp);

        setTimeout(() => { setCatState('idle'); setRoast(null); }, 4500);
        return;
      }

      // ☀️/🌑 ACTION 4: ALTER THEME AT WILL (15% chance)
      // Tom flips between Dark and Light mode unexpectedly!
      if (dice >= 0.60 && dice < 0.75 && setIsDarkMode) {
        const willBeDark = !isDarkMode;
        setIsDarkMode(willBeDark);
        setCatState('laughing');
        if (!willBeDark) {
          setRoast("FLASHBANG! Light mode at 3 AM! Welcome to the sun! ☀️😎");
        } else {
          setRoast("Dark mode engaged. Stealth assassin mode activated. 🌑🐾");
        }

        setTimeout(() => { setCatState('idle'); setRoast(null); }, 4500);
        return;
      }

      // 💤 ACTION 5: TOM TAKES A NAP (12% chance)
      if (dice >= 0.75 && dice < 0.87) {
        setCatState('sleeping');
        setRoast("Zzz... dreaming of deleting system32... zzz... 💤");
        setTimeout(() => setRoast(null), 3500);
        setTimeout(() => setCatState('idle'), 9500);
        return;
      }

      // 💨 ACTION 6: ZOOMIES / SPRINTING ACROSS SCREEN (13% chance)
      if (dice >= 0.87) {
        setCatState('running');
        setRoast("ZOOMIES! CAN'T CATCH ME! I HAVE ROOT PERMISSIONS! 💨");
        setIsFlipped(true);

        setTimeout(() => {
          setCatState('idle');
          setRoast(null);
          setIsFlipped(false);
        }, 4500);
        return;
      }
    }, 9500);

    return () => clearInterval(loop);
  }, [catState, windows, openWindowsCount, wallpaper, isDarkMode, tomScore, userScore, openApp, closeWindow, setWallpaper, setIsDarkMode]);

  // Click on Tom (User Interaction & Counter-attack)
  const handlePokeTom = () => {
    if (catState === 'sleeping') {
      setCatState('angry');
      setRoast("WHO DARES WAKE THE OS OVERLORD?! I will delete your downloads folder! 😾");
      setTimeout(() => { setCatState('idle'); setRoast(null); }, 4000);
    } else if (catState === 'running') {
      setUserScore(s => s + 1);
      setRoast("OUCH! YOU CAUGHT ME! User +1 point! 💥");
      setTimeout(() => setRoast(null), 3000);
    } else {
      setUserScore(s => s + 1);
      setCatState('laughing');
      setRoast(`Poked Tom! Score: Tom ${tomScore} - User ${userScore + 1}. Stop resisting! 👑`);
      setTimeout(() => { setCatState('idle'); setRoast(null); }, 3500);
    }
  };

  // Manual Trigger for Fun from HUD
  const triggerChaos = (type) => {
    if (type === 'wp' && setWallpaper) {
      const nextWp = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)];
      setWallpaper(nextWp);
      setRoast("Wallpaper randomized by Admin Command! 🎨");
    } else if (type === 'theme' && setIsDarkMode) {
      setIsDarkMode(d => !d);
      setRoast("Theme inverted! ⚡");
    } else if (type === 'spawn' && openApp) {
      const target = APPS_TO_SPAWN[Math.floor(Math.random() * APPS_TO_SPAWN.length)];
      openApp(target.id);
      setRoast(target.msg);
    }
    setTimeout(() => setRoast(null), 3000);
  };

  return (
    <motion.div
      animate={
        catState === 'running'
          ? {
              x: [0, -window.innerWidth + 220, 0],
              transition: { duration: 4.5, ease: "easeInOut" }
            }
          : { x: 0 }
      }
      className="fixed bottom-14 right-8 z-[9999] pointer-events-none flex flex-col items-center select-none"
    >
      {/* Mica Roast Dialogue Bubble */}
      <AnimatePresence>
        {roast && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.85 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-2 max-w-[280px] p-3.5 rounded-2xl bg-white/80 dark:bg-black/85 backdrop-blur-2xl border border-white/40 dark:border-white/20 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-2xl relative pointer-events-auto ring-1 ring-cyan-500/20 leading-snug"
          >
            <div className="flex items-start gap-1.5">
              <span>{roast}</span>
            </div>
            {/* Bubble pointer */}
            <div className="absolute -bottom-2 right-12 w-3.5 h-3.5 bg-white/80 dark:bg-black/85 backdrop-blur-2xl border-r border-b border-white/40 dark:border-white/20 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot & Overlord HUD */}
      <div
        onClick={handlePokeTom}
        title="Tom - The OS Overlord (Click to poke / fight back!)"
        className="transition-transform duration-300 pointer-events-auto cursor-pointer relative group"
        style={{
          transform: `scaleX(${isFlipped ? -1 : 1})`,
        }}
      >
        <TomSprite state={catState} isGodMode={isGodMode} />

        {/* Interactive Overlord Badge */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 dark:bg-black/80 backdrop-blur-md border border-amber-400/40 text-[10px] text-amber-300 font-bold whitespace-nowrap shadow-lg group-hover:scale-105 transition-transform pointer-events-auto"
        >
          <Crown className="w-3 h-3 text-amber-400 fill-current" />
          <span>Tom: {tomScore} vs You: {userScore}</span>
        </div>
      </div>
    </motion.div>
  );
}
