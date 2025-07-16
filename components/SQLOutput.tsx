'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Copy, Download, Loader2, CheckCircle } from 'lucide-react';

// Define the shape of the props
interface SQLOutputProps {
  isLoading: boolean;
  schemaData: {
    sqlCode: string;
  } | null;
}

export default function SQLOutput({ isLoading, schemaData }: SQLOutputProps) {
  const [copied, setCopied] = useState(false);

  const sqlCode = schemaData?.sqlCode ?? '';

  const handleCopy = async () => {
    if (sqlCode) {
      await navigator.clipboard.writeText(sqlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (sqlCode) {
      const blob = new Blob([sqlCode], { type: 'text/sql' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schema.sql';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-purple-600" />
          SQL Code
        </CardTitle>
        <CardDescription>Generated SQL code for your database schema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : sqlCode ? (
          <>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!sqlCode}>
                {copied ? <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!sqlCode}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{sqlCode}</code>
              </pre>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Your generated SQL will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}