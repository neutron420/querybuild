
"use client";

import { HeroSection } from "@/components/blocks/hero-section-dark";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import TestimonialsConveyor from "@/components/blocks/testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Welcome To QueryBuild"
        subtitle={{
          regular: "Transform your Database Ideas into ",
          gradient: " into digital experiences",
        }}
        description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
        ctaText="Get Started"
        ctaHref="/signup"
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
      
      {/* Database with REST API Component - Black Background Section */}
      <section className="py-20 px-4 bg-black min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Database Integration</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Connect and manage your databases with our powerful REST API integration
            </p>
          </div>
          
          {/* Centered DatabaseWithRestApi Component */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <DatabaseWithRestApi
                className="mx-auto"
                title="Data exchange using a customized REST API"
                circleText="SVG"
                badgeTexts={{
                  first: "GET",
                  second: "POST", 
                  third: "PUT",
                  fourth: "DELETE"
                }}
                buttonTexts={{
                  first: "LegionDev",
                  second: "v2_updates"
                }}
                lightColor="#00A6F5"
              />
              
              {/* GlowingEffect with minimal styling */}
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

      {/* GlowingEffect Demo Grid Section */}
      <section className="py-20 px-4 bg-zinc-950 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Interactive Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Experience our cutting-edge interface with dynamic glowing effects
            </p>
          </div>
          
          {/* GlowingEffectDemo Component */}
          <div className="px-4">
            <GlowingEffectDemo />
          </div>
        </div>
      </section>

      {/* Testimonials Section - Last Section */}
      <TestimonialsConveyor />
    </main>
  );
}