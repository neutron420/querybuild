// app/(dashboard)/dashboard/page.tsx
'use client'

import { useState } from 'react'
import SchemaInput from '@/components/SchemaInput'
import ERDiagram from '@/components/ERDiagram'
import SQLOutput from '@/components/SQLOutput'

// Define specific types to replace 'any'
interface Column {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
}

interface Table {
  name: string;
  columns: Column[];
}

interface ApiResponse {
  schema: {
    tables: Table[];
  };
  diagram: string;
  sqlCode: string;
}

export default function DashboardPage() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSchemaGenerate = async (prompt: string) => {
    if (!prompt) return;
    
    setIsLoading(true)
    setApiResponse(null); // Clear previous results
    
    try {
      const response = await fetch('/api/generate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate schema from API')
      }

      const data: ApiResponse = await response.json()
      setApiResponse(data)
    } catch (error) {
      console.error('Error generating schema:', error)
      // Optionally, show an alert to the user
      alert(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-200 mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11h8M8 15h5" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Database Schema Designer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Describe your database requirements, and let our AI create a complete schema with entity relationships and SQL code
          </p>
        </div>

        {/* Input Component */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <SchemaInput 
            onGenerate={handleSchemaGenerate}
            isLoading={isLoading}
          />
        </div>

        {/* Output Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ER Diagram */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Entity Relationship Diagram
              </h3>
            </div>
            <div className="p-6">
              <ERDiagram 
                // Pass the entire response object as it contains schema and diagram
                schemaData={apiResponse}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* SQL Output */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Generated SQL Code
              </h3>
            </div>
            <div className="p-6">
              <SQLOutput 
                // Pass only the relevant part of the data
                schemaData={{ sqlCode: apiResponse?.sqlCode ?? '' }}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Schema</h3>
                <p className="text-gray-600">Our AI is analyzing your requirements and creating your database schema...</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!apiResponse && !isLoading && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11h8M8 15h5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Design Your Database</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter your database requirements above to get started. Our AI will generate a complete schema with relationships and SQL code.
            </p>
          </div>
        )}

        {/* Success State Indicator */}
        {apiResponse && !isLoading && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Schema generated successfully! Review your entity relationship diagram and SQL code below.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}