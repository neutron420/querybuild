import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateSchema } from '@/lib/ai-client'

export async function POST(req: Request) {
  try {
    // 1. Check if the user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Get the user's prompt from the request body
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // 3. Call the AI client function to get the data
    const aiResponse = await generateSchema(prompt);

    // 4. Send the data back to the frontend
    return NextResponse.json(aiResponse);
    
  } catch (error) {
    console.error("[GENERATE_SCHEMA_API_ERROR]", error);
    const errorMessage = error instanceof Error ? error.message : "An internal error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}