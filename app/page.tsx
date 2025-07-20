"use client";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignUpButton } from '@clerk/nextjs';
import { HeroSection } from "@/components/blocks/hero-section-dark";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import TestimonialsConveyor from "@/components/blocks/testimonials";

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStartedClick = useCallback(() => {
    if (!isLoaded || isLoading) return;
    
    if (isSignedIn) {
      setIsLoading(true);
      
      setTimeout(() => {
        router.push('/use');
        setIsLoading(false);
      }, 4000);
    }
    // If not signed in, the SignUpButton will handle the auth flow without loading
  }, [isSignedIn, isLoaded, router, isLoading]);

  // New handler for the direct use button
  const handleUseClick = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      router.push('/use');
      setIsLoading(false);
    }, 4000);
  }, [router, isLoading]);

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  // Loading Overlay Component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center">
        {/* Large Spinner */}
        <div className="relative">
          <svg 
            className="animate-spin h-16 w-16 text-white mx-auto mb-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          
          {/* Glowing effect around spinner */}
          <div className="absolute inset-0 h-16 w-16 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
        
        {/* Loading text */}
        <h3 className="text-2xl font-bold text-white mb-2">Loading QueryBuild</h3>
        <p className="text-gray-400 animate-pulse">Preparing your experience...</p>
        
        {/* Optional progress dots */}
        <div className="flex space-x-1 justify-center mt-6">
          <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );

  // Custom button component that matches your layout.tsx style
  const GetStartedButton = () => (
    <button 
      onClick={handleGetStartedClick}
      disabled={isLoading}
      className="relative group inline-flex items-center justify-center overflow-hidden rounded-lg p-[1px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {/* Enhanced gradient border */}
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/70 via-pink-500/70 to-purple-500/70 group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-purple-400 transition-all duration-300 animate-pulse" />
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-sm group-hover:blur-md transition-all duration-300" />
      
      {/* Button content with enhanced background */}
      <span className="relative inline-flex items-center justify-center bg-black group-hover:bg-gray-950 text-white font-medium text-sm h-12 px-8 rounded-lg transition-all duration-300">
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.03] to-pink-500/[0.03] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <span className="relative z-10 text-base font-semibold">
          {isSignedIn ? "Go to Use" : "Get Started"}
        </span>
      </span>
      
      {/* Hover shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </button>
  );

  // New Use button component with different styling
  const UseButton = () => (
    <button 
      onClick={handleUseClick}
      disabled={isLoading}
      className="relative group inline-flex items-center justify-center overflow-hidden rounded-lg p-[1px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {/* Enhanced gradient border with different colors */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/70 via-cyan-500/70 to-blue-500/70 group-hover:from-blue-400 group-hover:via-cyan-400 group-hover:to-blue-400 transition-all duration-300 animate-pulse" />
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-sm group-hover:blur-md transition-all duration-300" />
      
      {/* Button content with enhanced background */}
      <span className="relative inline-flex items-center justify-center bg-black group-hover:bg-gray-950 text-white font-medium text-sm h-12 px-8 rounded-lg transition-all duration-300">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] to-cyan-500/[0.03] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <span className="relative z-10 text-base font-semibold">
          Use QueryBuild
        </span>
      </span>
      
      {/* Hover shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </button>
  );

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
      
      <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <HeroSection
          title="Welcome To QueryBuild"
          subtitle={{
            regular: "Transform your Database Ideas into ",
            gradient: "digital experiences",
          }}
          description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
          ctaText={isSignedIn ? "Go to Use" : "Get Started"}
          ctaOnClick={handleUseClick}
          bottomImage={{
            light: "https://www.launchuicomponents.com/app-light.png",
            dark: "https://www.launchuicomponents.com/app-dark.png",
          }}
          gridOptions={{
            angle: 65,
            opacity: 0.4,
            cellSize: 50,
            lightLineColor: "#4a4a4a",
            darkLineColor: "#2a2a2a",
          }}
        />
        
        {/* Button overlay section */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="h-full w-full flex items-center justify-center">
            <div className="absolute bottom-20 pointer-events-auto">
              <div className="flex gap-4 items-center">
                {/* Original Get Started / Go to Use button */}
                {!isSignedIn ? (
                  <SignUpButton>
                    <GetStartedButton />
                  </SignUpButton>
                ) : (
                  <GetStartedButton />
                )}
                
                {/* New Use button - always visible */}
                <UseButton />
              </div>
            </div>
          </div>
        </div>
      </div>
             
      {/* Database Integration Section */}
      <section className="py-20 px-4 bg-black min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Database Integration</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Connect and manage your databases with our powerful REST API integration.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative">
              <DatabaseWithRestApi
                className="mx-auto"
                title="Data exchange using a customized REST API"
                circleText="API"
                badgeTexts={{ first: "GET", second: "POST", third: "PUT", fourth: "DELETE" }}
                buttonTexts={{ first: "LegionDev", second: "v2_updates" }}
                lightColor="#00A6F5"
              />
              <GlowingEffect
                blur={20}
                inactiveZone={0.3}
                proximity={100}
                spread={30}
                variant="default"
                glow={true}
                disabled={false}
                movementDuration={1.5}
                borderWidth={2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 px-4 bg-zinc-950 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Interactive Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Experience our cutting-edge interface with dynamic glowing effects.
            </p>
          </div>
          <div className="px-4">
            <GlowingEffectDemo />
          </div>
        </div>
      </section>

      <TestimonialsConveyor />
    </main>
    </>
  );
}