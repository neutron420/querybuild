// app/(dashboard)/dashboard/page.tsx
'use client'

import { UserButton } from '@clerk/nextjs'
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
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Database Schema Designer</h1>
          <p className="text-gray-600 mt-2">Describe your database, and let AI do the rest.</p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
      
      {/* Input Component */}
      <SchemaInput 
        onGenerate={handleSchemaGenerate}
        isLoading={isLoading}
      />
      
      {/* Output Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ERDiagram 
          // Pass the entire response object as it contains schema and diagram
          schemaData={apiResponse}
          isLoading={isLoading}
        />
        <SQLOutput 
          // Pass only the relevant part of the data
          schemaData={{ sqlCode: apiResponse?.sqlCode ?? '' }}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}