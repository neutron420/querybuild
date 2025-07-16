import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prepareDiagram } from '@/lib/diagram-generator'

/**
 * NOTE: This API route is not used in the main application flow,
 * as the /api/generate-schema route already returns the diagram.
 * This file exists to match your planned structure.
 */
export async function POST(req: Request) {
  try {
    // 1. Check for authenticated user
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Parse the request body
    const body = await req.json();
    const { diagramString } = body;

    if (!diagramString) {
      return new NextResponse("Diagram string is required", { status: 400 });
    }

    // 3. Use a helper function to validate the diagram
    const validatedDiagram = prepareDiagram(diagramString);

    // 4. Return the successful response
    return NextResponse.json({ validatedDiagram });

  } catch (error) {
    console.error("[VALIDATE_DIAGRAM_API_ERROR]", error);
    const errorMessage = error instanceof Error ? error.message : "An internal error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}