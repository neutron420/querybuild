'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {  Copy, Loader2, CheckCircle, DatabaseZap } from 'lucide-react';

interface CrudOperations {
  [tableName: string]: {
    create: string;
    read: string;
    update: string;
    delete: string;
  };
}

interface CrudOutputProps {
  isLoading: boolean;
  schemaData: {
    crudOperations: CrudOperations;
  } | null;
}

const OperationDisplay = ({ title, sql }: { title: string, sql: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-700 capitalize">{title}</h4>
      <div className="relative bg-gray-900 rounded-lg p-3">
        <pre className="text-gray-100 text-sm overflow-x-auto">
          <code>{sql}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7"
          onClick={handleCopy}
        >
          {copied ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400 hover:text-white" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default function CrudOutput({ isLoading, schemaData }: CrudOutputProps) {
  const crudOperations = schemaData?.crudOperations;

  return (
    <Card className="w-full h-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <DatabaseZap className="h-5 w-5 text-orange-500" />
          CRUD Operations
        </CardTitle>
        <CardDescription>Example SQL for Create, Read, Update, Delete</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : crudOperations && Object.keys(crudOperations).length > 0 ? (
          <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
            {Object.entries(crudOperations).map(([tableName, operations]) => (
              <div key={tableName} className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-800 capitalize border-b pb-2">{tableName}</h3>
                <OperationDisplay title="Create (INSERT)" sql={operations.create} />
                <OperationDisplay title="Read (SELECT)" sql={operations.read} />
                <OperationDisplay title="Update (UPDATE)" sql={operations.update} />
                <OperationDisplay title="Delete (DELETE)" sql={operations.delete} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Your generated CRUD operations will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}