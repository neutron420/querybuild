"use client";

import React from "react";
import { Database, Heart, Folder, Sparkles, Activity, Shield, Zap } from "lucide-react";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className = "",
  circleText = "API",
  badgeTexts = {
    first: "GET",
    second: "POST", 
    third: "PUT",
    fourth: "DELETE"
  },
  buttonTexts = {
    first: "LegionDev",
    second: "v2_updates"
  },
  title = "Database Integration",
  lightColor = "#3b82f6"
}: DatabaseWithRestApiProps) => {
  
  return (
    <div className={`relative min-h-screen bg-black text-white overflow-hidden ${className}`}>
      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
        }
        
        @keyframes glow-path {
          0%, 100% {
            stroke-dashoffset: 100;
          }
          50% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .animate-glow {
          animation: glow-path 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .method-button {
          position: relative;
          overflow: hidden;
        }
        
        .method-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.6s;
        }
        
        .method-button:hover::before {
          left: 100%;
        }
      `}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gray-900/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-900/60 border border-gray-700/50 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Activity size={16} className="text-blue-400" />
            <span className="text-sm text-gray-300">Enterprise Database Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect and manage your databases with our powerful REST API integration.
            Built for enterprise scale and developer experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
          <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
            <Zap size={24} className="text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Sub-millisecond response times</p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
            <Shield size={24} className="text-green-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-gray-400 text-sm">Enterprise-grade security</p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
            <Database size={24} className="text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Scalable</h3>
            <p className="text-gray-400 text-sm">Handle millions of requests</p>
          </div>
        </div>

        {/* API Method Buttons */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center">
          {Object.values(badgeTexts).map((method, index) => {
            const colors = {
              0: "border-green-500/50 text-green-400 hover:border-green-400 hover:bg-green-500/10", // GET
              1: "border-blue-500/50 text-blue-400 hover:border-blue-400 hover:bg-blue-500/10",   // POST  
              2: "border-orange-500/50 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10", // PUT
              3: "border-red-500/50 text-red-400 hover:border-red-400 hover:bg-red-500/10"      // DELETE
            };
            
            return (
              <button
                key={index}
                className={`method-button bg-black border-2 ${colors[index as keyof typeof colors]} px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3 backdrop-blur-sm`}
              >
                <Database size={20} />
                {method}
              </button>
            );
          })}
        </div>

        {/* Animated connection visualization */}
        <div className="relative w-full max-w-5xl h-48 mb-16">
          <svg className="w-full h-full" viewBox="0 0 1000 200">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Network connections */}
            <path
              d="M 100 60 Q 200 30 300 60 Q 400 90 500 60 Q 600 30 700 60 Q 800 90 900 60"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="12 6"
              className="animate-glow"
            />
            <path
              d="M 100 140 Q 200 110 300 140 Q 400 170 500 140 Q 600 110 700 140 Q 800 170 900 140"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="12 6"
              className="animate-glow"
              style={{ animationDelay: '2s' }}
            />
            
            {/* Network nodes */}
            <circle cx="100" cy="60" r="6" fill="#3b82f6" className="animate-pulse" />
            <circle cx="300" cy="60" r="8" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="500" cy="60" r="10" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="700" cy="60" r="8" fill="#10b981" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="900" cy="60" r="6" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '2s' }} />
          </svg>
        </div>

        {/* Main API Dashboard */}
        <div className="relative w-full max-w-3xl animate-float">
          {/* Top badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 bg-gray-900/80 border border-gray-700/60 px-6 py-2 rounded-xl backdrop-blur-sm">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm text-gray-300 font-medium">
                REST API Gateway
              </span>
            </div>
          </div>

          {/* Main card */}
          <div className="relative bg-gray-900/60 border border-gray-700/60 rounded-2xl p-10 backdrop-blur-sm shadow-2xl">
            {/* Animated background circles */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-blue-500/10 bg-blue-500/5"
                  style={{
                    bottom: `-${20 + i * 25}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${120 + i * 50}px`,
                    height: `${120 + i * 50}px`,
                    animation: `pulse-ring 5s ease-in-out infinite ${i * 0.8}s`
                  }}
                />
              ))}
            </div>

            {/* Status badges */}
            <div className="relative z-10 flex justify-between items-center mb-10">
              <div className="flex items-center gap-3 bg-gray-800/60 border border-gray-600/50 px-4 py-3 rounded-xl backdrop-blur-sm">
                <Heart size={18} className="text-red-400" />
                <span className="text-sm font-medium">{buttonTexts.first}</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/60 border border-gray-600/50 px-4 py-3 rounded-xl backdrop-blur-sm">
                <Folder size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">{buttonTexts.second}</span>
              </div>
            </div>

            {/* Central API hub */}
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800/80 border-2 border-gray-600/60 rounded-2xl mb-6 backdrop-blur-sm">
                <span className="text-2xl font-bold text-blue-400">{circleText}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Database Gateway</h3>
              <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                Seamlessly connect your applications with our robust database infrastructure.
                Enterprise-grade performance and reliability.
              </p>
            </div>
          </div>

          {/* Bottom database icon */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-gray-800/80 border-2 border-gray-600/60 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Database size={28} className="text-blue-400" />
            </div>
          </div>
        </div>

        {/* System status */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 bg-green-900/30 border border-green-600/50 px-6 py-3 rounded-xl backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-semibold">System Operational</span>
            <div className="text-green-300 text-xs">99.9% uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;