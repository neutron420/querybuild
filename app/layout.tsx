import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'QueryBuild',
  description: 'Transform your ideas into beautiful digital experiences.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        >
          {/* Floating auth buttons */}
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="relative group text-gray-300 hover:text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-300 border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02] backdrop-blur-sm">
                  <span className="relative z-10">Sign In</span>
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/[0.01] to-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </SignInButton>
              
              <SignUpButton>
                <button className="relative group inline-flex items-center justify-center overflow-hidden rounded-lg p-[1px] transition-all duration-300 hover:scale-105 active:scale-95">
                  {/* Enhanced gradient border */}
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/70 via-pink-500/70 to-purple-500/70 group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-purple-400 transition-all duration-300 animate-pulse" />
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-sm group-hover:blur-md transition-all duration-300" />
                  
                  {/* Button content with enhanced background */}
                  <span className="relative inline-flex items-center justify-center bg-black group-hover:bg-gray-950 text-white font-medium text-sm h-10 px-6 rounded-lg transition-all duration-300">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.03] to-pink-500/[0.03] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative z-10">Sign Up</span>
                  </span>
                  
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </button>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <div className="relative group">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: `
                        w-10 h-10 rounded-full ring-1 ring-white/10 
                        hover:ring-white/30 hover:ring-2 
                        transition-all duration-300 
                        hover:scale-105 active:scale-95
                        shadow-lg hover:shadow-xl
                        backdrop-blur-sm
                      `,
                      userButtonPopoverCard: `
                        bg-gray-900/95 border-gray-700/50 
                        backdrop-blur-xl shadow-2xl
                        rounded-xl border
                      `,
                      userButtonPopoverActionButton: `
                        text-gray-300 hover:text-white 
                        hover:bg-gray-800/50 rounded-lg
                        transition-all duration-200
                      `,
                      userButtonPopoverActionButtonText: 'text-gray-300 text-sm font-medium',
                      userButtonPopoverFooter: 'hidden',
                    },
                  }}
                />
                {/* Avatar glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
              </div>
            </SignedIn>
          </div>
                     
          <main className="min-h-screen">
            {/* Enhanced main background */}
            <div className="absolute inset-0 -z-10 h-full w-full">
              {/* Base layer */}
              <div className="absolute inset-0 bg-black" />
              
              {/* Enhanced gradient system */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-black to-gray-900/40" />
              
              {/* Multiple radial highlights for depth */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(100,100,100,0.2),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_80%,rgba(120,120,120,0.1),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(120,120,120,0.1),transparent)]" />
              
              {/* Subtle animated grain */}
              <div className="absolute inset-0 opacity-[0.02] animate-pulse" style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
                animationDuration: '4s'
              }} />
              
              {/* Enhanced vignette system */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.7))]" />
            </div>
            
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}