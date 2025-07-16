'use client'

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Loader2 } from 'lucide-react';

// Define the types for the props this component receives
// This should match the data structure from your API
interface Table {
  name: string;
  columns: Array<{ name: string; type: string }>;
}

interface ERDiagramProps {
  isLoading: boolean;
  schemaData: {
    schema: { tables: Table[] };
    diagram: string;
  } | null;
}

// Initialize Mermaid
mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

export default function ERDiagram({ isLoading, schemaData }: ERDiagramProps) {
  const [diagramSvg, setDiagramSvg] = useState('');

  useEffect(() => {
    const renderDiagram = async () => {
      if (schemaData?.diagram) {
        try {
          // Ensure the diagram string is valid
          const { svg } = await mermaid.render('erDiagramSvg', schemaData.diagram);
          setDiagramSvg(svg);
        } catch (error) {
          console.error("Mermaid rendering error:", error);
          setDiagramSvg('<p class="text-red-500">Error rendering diagram.</p>');
        }
      } else {
        setDiagramSvg('');
      }
    };
    
    if (!isLoading) {
      renderDiagram();
    }
  }, [schemaData, isLoading]);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-green-600" />
          ER Diagram
        </CardTitle>
        <CardDescription>Visual representation of your database schema</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : schemaData?.diagram ? (
          <div className="mermaid-container" dangerouslySetInnerHTML={{ __html: diagramSvg }} />
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Your diagram will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}