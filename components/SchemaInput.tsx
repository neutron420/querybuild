'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Sparkles } from 'lucide-react'

interface SchemaInputProps {
  onGenerate: (description: string) => void
  isLoading: boolean
}

export default function SchemaInput({ onGenerate, isLoading }: SchemaInputProps) {
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim()) {
      onGenerate(description.trim())
    }
  }

  const examplePrompts = [
    "E-commerce platform with users, products, orders, and inventory",
    "Social media app with posts, comments, likes, and followers",
    "Library management system with books, members, and borrowing",
    "Hospital management with patients, doctors, appointments, and medical records"
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          Describe Your Database
        </CardTitle>
        <CardDescription>
          Enter a natural language description of your database requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Example: I need a database for a blog application with users, posts, comments, and categories..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] resize-none"
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            disabled={!description.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Schema...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Schema
              </>
            )}
          </Button>
        </form>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Example prompts:</p>
          <div className="grid grid-cols-1 gap-2">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setDescription(prompt)}
                disabled={isLoading}
                className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
