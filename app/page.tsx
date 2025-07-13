// app/page.tsx
"use client";
import { HeroSection } from "@/components/blocks/hero-section-dark";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Welcome To QueryBuild"
        subtitle={{
          regular: "Transform your ideas into ",
          gradient: "beautiful digital experiences",
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
            <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}