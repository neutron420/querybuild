'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SchemaInput from '@/components/SchemaInput';
import ERDiagram from '@/components/ERDiagram';
import SQLOutput from '@/components/SQLOutput';
import PrismaOutput from '@/components/PrismaOutput';
import MongoOutput from '@/components/MongoOutput';
import CrudOutput from '@/components/CrudOutput';
import { cn } from '@/lib/utils';

// Define the structure for CRUD operations
interface CrudOperations {
  [tableName: string]: {
    create: string;
    read: string;
    update: string;
    delete: string;
  };
}

// Update the API response interface to include all generated schemas
interface ApiResponse {
  schema: {
    tables: { name: string }[];
  };
  diagram: string;
  postgresqlCode: string;
  mysqlCode: string;
  mongoDbSchema: string;
  prismaSchema: string;
  crudOperations: CrudOperations;
}

export default function DashboardPage() {
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Set the default tab to 'crud'
  const [activeTab, setActiveTab] = useState('crud');
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSchemaGenerate = async (prompt: string) => {
    if (!prompt) return;
    
    setIsLoading(true);
    setApiResponse(null);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to generate schema from API');
      }

      const data: ApiResponse = await response.json();
      setApiResponse(data);
    } catch (err) {
      console.error('Error generating schema:', err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToEditor = () => {
    setIsNavigating(true);
    router.push('/editor');
  };

  // Renders the correct output component based on the active tab
  const renderActiveTabContent = () => {
    if (!apiResponse && !isLoading) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <p>Your generated code will appear here.</p>
            </div>
        );
    }

    switch (activeTab) {
      case 'crud':
        return <CrudOutput schemaData={{ crudOperations: apiResponse?.crudOperations ?? {} }} isLoading={isLoading} />;
      case 'postgresql':
        return <SQLOutput schemaData={{ sqlCode: apiResponse?.postgresqlCode ?? '' }} isLoading={isLoading} />;
      case 'mysql':
        return <SQLOutput schemaData={{ sqlCode: apiResponse?.mysqlCode ?? '' }} isLoading={isLoading} />;
      case 'mongodb':
        return <MongoOutput schemaData={{ mongoDbSchema: apiResponse?.mongoDbSchema ?? '' }} isLoading={isLoading} />;
      case 'prisma':
        return <PrismaOutput schemaData={{ prismaSchema: apiResponse?.prismaSchema ?? '' }} isLoading={isLoading} />;
      default:
        return null;
    }
  };
  
  // Define the tabs for the UI
  const tabs = [
    { id: 'crud', label: 'CRUD Operations' },
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'mysql', label: 'MySQL' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'prisma', label: 'Prisma' },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative z-10 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Database Schema & Operations Designer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Describe your database, and let AI generate schemas and essential SQL operations for you.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <SchemaInput 
            onGenerate={handleSchemaGenerate}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-center">
            <p className="font-semibold">An Error Occurred</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ER Diagram Card */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <ERDiagram 
                schemaData={apiResponse}
                isLoading={isLoading}
              />
            </div>
            <button
              onClick={handleGoToEditor}
              className="w-full bg-black text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Go to ER Diagram Editor
            </button>
          </div>

          {/* Tabbed Output Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 sm:space-x-6 overflow-x-auto" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none',
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="pt-4">
                {renderActiveTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}