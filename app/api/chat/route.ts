// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateChatResponse } from '@/lib/ai-client';

export async function POST(req: Request) {
  try {
    // 1. Check if the user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Get the user's prompt from the request body
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }

    // 3. Call the new AI client function to get a chat response
    const aiResponse = await generateChatResponse(message);

    // 4. Send the data back to the frontend
    return NextResponse.json({ reply: aiResponse });
    
  } catch (error) {
    console.error("[CHAT_API_ERROR]", error);
    const errorMessage = error instanceof Error ? error.message : "An internal error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}