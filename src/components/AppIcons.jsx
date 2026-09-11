import React from 'react'

// 1. Windows Logo (4 rounded azure tiles)
export function WindowsLogo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M4 8.5C4 6.01 6.01 4 8.5 4H21.5C22.33 4 23 4.67 23 5.5V22H4V8.5Z" fill="#0078D4"/>
      <path d="M25 5.5C25 4.67 25.67 4 26.5 4H39.5C41.99 4 44 6.01 44 8.5V22H25V5.5Z" fill="#0078D4"/>
      <path d="M4 26H23V42.5C23 43.33 22.33 44 21.5 44H8.5C6.01 44 4 41.99 4 39.5V26Z" fill="#0078D4"/>
      <path d="M25 26H44V39.5C44 41.99 41.99 44 39.5 44H26.5C25.67 44 25 43.33 25 42.5V26Z" fill="#0078D4"/>
    </svg>
  )
}

// 2. File Explorer (Fluent yellow folder with blue binder)
export function FileExplorerIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M6 12C6 9.79 7.79 8 10 8H19.5L24.5 13H38C40.21 13 42 14.79 42 17V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V12Z" fill="#0078D4"/>
      <path d="M6 17C6 14.79 7.79 13 10 13H38C40.21 13 42 14.79 42 17V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V17Z" fill="#FFA000"/>
      <path d="M6 20C6 17.79 7.79 16 10 16H38C40.21 16 42 17.79 42 20V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V20Z" fill="#FFC107"/>
      <rect x="10" y="22" width="28" height="4" rx="2" fill="#FFE082" fillOpacity="0.6"/>
    </svg>
  )
}

// 3. Microsoft Edge (Wave swirl)
export function EdgeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <defs>
        <linearGradient id="edge_grad1" x1="6" y1="42" x2="36" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B5D96" />
          <stop offset="100%" stopColor="#0C9D9C" />
        </linearGradient>
        <linearGradient id="edge_grad2" x1="16" y1="6" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0CD8AB" />
          <stop offset="100%" stopColor="#25A4FF" />
        </linearGradient>
      </defs>
      <path d="M42 24C42 33.94 33.94 42 24 42C16.8 42 10.6 37.7 7.8 31.6C12.1 36.6 20.3 35.8 23.5 30.5C24.8 28.3 24.8 25.5 23.4 23.4C21.4 20.4 17.5 19.3 14 20.7C10.1 22.3 7 26.6 7 24C7 14.6 14.6 7 24 7C33.94 7 42 14.6 42 24Z" fill="url(#edge_grad1)"/>
      <path d="M24 7C34 7 42 15 42 24C42 25.5 41.8 27 41.4 28.3C39.6 20.2 30.7 15.6 22.6 17.4C18.6 18.3 15.2 20.8 13.5 24.5C11.5 20.8 11.2 16.2 12.8 12.2C15.4 9 19.5 7 24 7Z" fill="url(#edge_grad2)"/>
    </svg>
  )
}

// 4. Google Chrome
export function ChromeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="20" fill="#EA4335" />
      <path d="M41.3 14H24V24H41.3C42.8 20.8 43.6 17.4 43.6 14" fill="#FBBC05" />
      <path d="M24 24L14 41.3C17 43 20.4 44 24 44C33.4 44 41.3 37.5 43.4 28.8L32 28.8L24 24Z" fill="#34A853" />
      <path d="M24 24L14 6.7C7.3 10.5 4 17.8 4 24C4 32.8 9.7 40.3 17.8 42.9L24 24Z" fill="#EA4335" />
      <circle cx="24" cy="24" r="9" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="7" fill="#1A73E8" />
    </svg>
  )
}

// 5. Visual Studio Code
export function VSCodeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M36.5 4.5L13.8 21.8L6.4 16.2C5.5 15.5 4.1 16.1 4.1 17.3V30.7C4.1 31.9 5.5 32.5 6.4 31.8L13.8 26.2L36.5 43.5C37.8 44.5 39.7 43.6 39.7 42V6C39.7 4.4 37.8 3.5 36.5 4.5Z" fill="#0066B8"/>
      <path d="M39.7 6V42C39.7 43.6 37.8 44.5 36.5 43.5L25 34.7L33.7 27.5L39.7 32.2V6Z" fill="#007ACC"/>
      <path d="M36.5 4.5L25 13.3L33.7 20.5L39.7 15.8V6C39.7 4.4 37.8 3.5 36.5 4.5Z" fill="#1F9CF0"/>
      <path d="M13.8 21.8L25 13.3L33.7 20.5L21.3 30.1L13.8 21.8Z" fill="#005A9E"/>
      <path d="M6.4 16.2L13.8 21.8L21.3 30.1L13.8 36.2L6.4 31.8C5.5 31.1 5 30.1 5 29V19C5 17.9 5.5 16.9 6.4 16.2Z" fill="#0066B8"/>
    </svg>
  )
}

// 6. YouTube
export function YouTubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="4" y="9" width="40" height="30" rx="9" fill="#FF0000" />
      <polygon points="20,17 32,24 20,31" fill="#FFFFFF" />
    </svg>
  )
}

// 7. Spotify
export function SpotifyIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="20" fill="#1DB954" />
      <path d="M14 18.5C21 16.5 29 17.5 34 20.5" stroke="#121212" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M15.5 24C21.5 22.2 28.5 23 32.5 25.5" stroke="#121212" strokeWidth="3" strokeLinecap="round"/>
      <path d="M17 29.5C21.5 28 27 28.7 30.5 30.5" stroke="#121212" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

// 8. Instagram
export function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <defs>
        <radialGradient id="ig_grad" cx="20%" cy="100%" r="120%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#F56040" />
          <stop offset="75%" stopColor="#FD1D1D" />
          <stop offset="100%" stopColor="#C13584" />
        </radialGradient>
      </defs>
      <rect x="5" y="5" width="38" height="38" rx="11" fill="url(#ig_grad)" />
      <rect x="13" y="13" width="22" height="22" rx="6" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="24" cy="24" r="5.5" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="30.5" cy="17.5" r="1.5" fill="#FFFFFF" />
    </svg>
  )
}

// 9. Discord
export function DiscordIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="4" y="4" width="40" height="40" rx="12" fill="#5865F2" />
      <path d="M33.5 15.5C31.5 14.5 29.2 13.8 27 13.5C26.7 14 26.4 14.7 26.2 15.2C23.7 14.8 21.3 14.8 18.8 15.2C18.6 14.7 18.3 14 18 13.5C15.8 13.8 13.5 14.5 11.5 15.5C7.5 21.5 6.5 27.5 7 33.2C9.5 35.1 12 36.2 14.5 37C15.1 36.2 15.6 35.3 16 34.4C15.1 34.1 14.3 33.7 13.5 33.2C13.7 33 13.9 32.8 14.1 32.6C19 35 26 35 30.9 32.6C31.1 32.8 31.3 33 31.5 33.2C30.7 33.7 29.9 34.1 29 34.4C29.4 35.3 29.9 36.2 30.5 37C33 36.2 35.5 35.1 38 33.2C38.6 26.5 37 20.8 33.5 15.5ZM17.5 28.5C16 28.5 14.8 27.1 14.8 25.5C14.8 23.9 16 22.5 17.5 22.5C19 22.5 20.2 23.9 20.2 25.5C20.2 27.1 19 28.5 17.5 28.5ZM27.5 28.5C26 28.5 24.8 27.1 24.8 25.5C24.8 23.9 26 22.5 27.5 22.5C29 22.5 30.2 23.9 30.2 25.5C30.2 27.1 29 28.5 27.5 28.5Z" fill="#FFFFFF"/>
    </svg>
  )
}

// 10. GitHub
export function GitHubIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="20" fill="#24292E" />
      <path fillRule="evenodd" clipRule="evenodd" d="M24 10C16.27 10 10 16.27 10 24C10 30.19 14.02 35.43 19.59 37.28C20.29 37.41 20.55 36.98 20.55 36.61C20.55 36.28 20.54 35.21 20.53 33.86C16.64 34.71 15.82 32.19 15.82 32.19C15.18 30.58 14.27 30.15 14.27 30.15C13 29.29 14.37 29.31 14.37 29.31C15.77 29.41 16.51 30.75 16.51 30.75C17.75 32.88 19.78 32.26 20.57 31.91C20.7 31.01 21.06 30.4 21.46 30.05C18.35 29.7 15.09 28.5 15.09 23.13C15.09 21.6 15.64 20.35 16.54 19.37C16.4 19.02 15.91 17.59 16.68 15.66C16.68 15.66 17.86 15.28 20.54 17.1C21.66 16.79 22.86 16.63 24.05 16.63C25.24 16.63 26.44 16.79 27.56 17.1C30.24 15.28 31.42 15.66 31.42 15.66C32.19 17.59 31.7 19.02 31.56 19.37C32.46 20.35 33.01 21.6 33.01 23.13C33.01 28.52 29.74 29.69 26.62 30.04C27.12 30.47 27.57 31.33 27.57 32.64C27.57 34.52 27.55 36.03 27.55 36.61C27.55 36.98 27.81 37.42 28.52 37.28C34.09 35.43 38.1 30.19 38.1 24C38.1 16.27 31.83 10 24 10Z" fill="#FFFFFF"/>
    </svg>
  )
}

// 11. Settings (Layered Fluent Gear)
export function SettingsIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="6" y="6" width="36" height="36" rx="10" fill="#0078D4" />
      <circle cx="24" cy="24" r="7" fill="#FFFFFF" />
      <path d="M24 12V15M24 33V36M12 24H15M33 24H36M15.5 15.5L17.5 17.5M30.5 30.5L32.5 32.5M15.5 32.5L17.5 30.5M30.5 17.5L32.5 15.5" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="3.5" fill="#0078D4" />
    </svg>
  )
}

// 12. Windows Terminal
export function TerminalIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="5" y="6" width="38" height="36" rx="8" fill="#1C1C1F" stroke="#38383F" strokeWidth="2"/>
      <path d="M13 18L20 24L13 30" stroke="#00D8FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="22" y1="30" x2="33" y2="30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

// 13. Notepad
export function NotepadIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="6" width="32" height="36" rx="6" fill="#0078D4" />
      <rect x="12" y="10" width="24" height="28" rx="4" fill="#E1F5FE" />
      <line x1="16" y1="16" x2="30" y2="16" stroke="#0288D1" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="22" x2="32" y2="22" stroke="#0288D1" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="28" x2="26" y2="28" stroke="#0288D1" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="34" cy="32" r="6" fill="#FFB300"/>
      <line x1="32" y1="34" x2="38" y2="28" stroke="#FFFFFF" strokeWidth="1.5"/>
    </svg>
  )
}

// 14. Calculator
export function CalculatorIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="5" width="32" height="38" rx="8" fill="#005FB8" />
      <rect x="12" y="9" width="24" height="9" rx="3" fill="#107C41" />
      <rect x="13" y="22" width="5" height="5" rx="1.5" fill="#FFFFFF" fillOpacity="0.8"/>
      <rect x="21.5" y="22" width="5" height="5" rx="1.5" fill="#FFFFFF" fillOpacity="0.8"/>
      <rect x="30" y="22" width="5" height="5" rx="1.5" fill="#FFA000"/>
      <rect x="13" y="29" width="5" height="5" rx="1.5" fill="#FFFFFF" fillOpacity="0.8"/>
      <rect x="21.5" y="29" width="5" height="5" rx="1.5" fill="#FFFFFF" fillOpacity="0.8"/>
      <rect x="30" y="29" width="5" height="12" rx="1.5" fill="#00BCF2"/>
      <rect x="13" y="36" width="13.5" height="5" rx="1.5" fill="#FFFFFF" fillOpacity="0.8"/>
    </svg>
  )
}

// 15. Weather
export function WeatherIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="18" cy="18" r="9" fill="#FFB300" />
      <path d="M16 26C16 22.1 19.1 19 23 19C26.4 19 29.3 21.5 29.9 24.8C30.6 24.3 31.5 24 32.5 24C35.5 24 38 26.5 38 29.5C38 32.5 35.5 35 32.5 35H16C12.7 35 10 32.3 10 29C10 26 12.2 23.6 15.1 23.1C15.6 24.8 16.6 26 16 26Z" fill="#29B6F6"/>
    </svg>
  )
}

// 16. Copilot
export function CopilotIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <defs>
        <linearGradient id="copilot_grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D8FF" />
          <stop offset="35%" stopColor="#2563EB" />
          <stop offset="70%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#copilot_grad)" />
      <path d="M24 12C20 12 16 15 16 19C16 23.5 21 26 24 28C27 26 32 23.5 32 19C32 15 28 12 24 12Z" fill="#FFFFFF" fillOpacity="0.9"/>
      <circle cx="20" cy="19" r="2" fill="#2563EB" />
      <circle cx="28" cy="19" r="2" fill="#2563EB" />
      <path d="M19 32C22 35 26 35 29 32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

// 17. Microsoft Store
export function StoreIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="6" y="14" width="36" height="28" rx="7" fill="#0078D4" />
      <path d="M16 14V11C16 8.2 18.2 6 21 6H27C29.8 6 32 8.2 32 11V14" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
      <rect x="18" y="22" width="5" height="5" fill="#F25022" />
      <rect x="25" y="22" width="5" height="5" fill="#7FBA00" />
      <rect x="18" y="29" width="5" height="5" fill="#00A4EF" />
      <rect x="25" y="29" width="5" height="5" fill="#FFB900" />
    </svg>
  )
}

// 18. Xbox
export function XboxIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="20" fill="#107C41" />
      <path d="M15 15C18 19 24 27 24 27C24 27 30 19 33 15C31 13 28 12 24 12C20 12 17 13 15 15ZM10 20C12 24 18 31 24 37C19 36 14 32 11 27C10.3 25 10 22.5 10 20ZM38 20C38 22.5 37.7 25 37 27C34 32 29 36 24 37C30 31 36 24 38 20Z" fill="#FFFFFF"/>
    </svg>
  )
}

// 19. Photos
export function PhotosIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="6" y="6" width="36" height="36" rx="8" fill="#0078D4" />
      <circle cx="17" cy="17" r="4.5" fill="#FFB300" />
      <path d="M11 36L21 24L28 31L32 26L37 36H11Z" fill="#E1F5FE" />
      <path d="M21 36L28 27L37 36H21Z" fill="#81D4FA" />
    </svg>
  )
}

// Universal Component Selector
export default function AppIcon({ id, className = "w-6 h-6" }) {
  switch (id) {
    case 'start':
    case 'windows':
      return <WindowsLogo className={className} />
    case 'explorer':
      return <FileExplorerIcon className={className} />
    case 'edge':
    case 'browser':
      return <EdgeIcon className={className} />
    case 'chrome':
      return <ChromeIcon className={className} />
    case 'vscode':
      return <VSCodeIcon className={className} />
    case 'youtube':
      return <YouTubeIcon className={className} />
    case 'spotify':
      return <SpotifyIcon className={className} />
    case 'instagram':
      return <InstagramIcon className={className} />
    case 'discord':
      return <DiscordIcon className={className} />
    case 'github':
      return <GitHubIcon className={className} />
    case 'settings':
      return <SettingsIcon className={className} />
    case 'terminal':
      return <TerminalIcon className={className} />
    case 'notepad':
      return <NotepadIcon className={className} />
    case 'calculator':
      return <CalculatorIcon className={className} />
    case 'weather':
      return <WeatherIcon className={className} />
    case 'copilot':
      return <CopilotIcon className={className} />
    case 'store':
      return <StoreIcon className={className} />
    case 'xbox':
      return <XboxIcon className={className} />
    case 'photos':
      return <PhotosIcon className={className} />
    default:
      return <WindowsLogo className={className} />
  }
}
