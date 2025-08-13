'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Copy, Download, Loader2, CheckCircle } from 'lucide-react';

interface MongoOutputProps {
  isLoading: boolean;
  schemaData: {
    mongoDbSchema: string | object; // Can be a string or an object
  } | null;
}

export default function MongoOutput({ isLoading, schemaData }: MongoOutputProps) {
  const [copied, setCopied] = useState(false);

  const mongoDbSchema = schemaData?.mongoDbSchema;
  let formattedSchema = '';

  if (mongoDbSchema) {
    // Check if the schema is an object and stringify it, otherwise, it's already a string.
    if (typeof mongoDbSchema === 'object') {
      formattedSchema = JSON.stringify(mongoDbSchema, null, 2);
    } else {
      // If it's a string, try to parse and re-stringify for pretty printing
      try {
        formattedSchema = JSON.stringify(JSON.parse(mongoDbSchema), null, 2);
      } catch {
        formattedSchema = mongoDbSchema; // Fallback to the original string if it's not valid JSON
      }
    }
  }

  const handleCopy = async () => {
    if (formattedSchema) {
      await navigator.clipboard.writeText(formattedSchema);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (formattedSchema) {
      const blob = new Blob([formattedSchema], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schema.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="w-full h-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Code className="h-5 w-5 text-green-500" />
          MongoDB Schema
        </CardTitle>
        <CardDescription>Generated MongoDB JSON schema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : formattedSchema ? (
          <>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!formattedSchema}>
                {copied ? <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!formattedSchema}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{formattedSchema}</code>
              </pre>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Your generated MongoDB schema will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}