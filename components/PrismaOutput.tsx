'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Copy, Download, Loader2, CheckCircle } from 'lucide-react';

interface PrismaOutputProps {
  isLoading: boolean;
  schemaData: {
    prismaSchema: string;
  } | null;
}

export default function PrismaOutput({ isLoading, schemaData }: PrismaOutputProps) {
  const [copied, setCopied] = useState(false);

  const prismaSchema = schemaData?.prismaSchema ?? '';

  const handleCopy = async () => {
    if (prismaSchema) {
      await navigator.clipboard.writeText(prismaSchema);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (prismaSchema) {
      const blob = new Blob([prismaSchema], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schema.prisma';
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
          <Code className="h-5 w-5 text-teal-600" />
          Prisma Schema
        </CardTitle>
        <CardDescription>Generated Prisma schema for your database</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : prismaSchema ? (
          <>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!prismaSchema}>
                {copied ? <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!prismaSchema}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{prismaSchema}</code>
              </pre>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Your generated Prisma schema will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}