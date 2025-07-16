/**
 * NOTE: The actual generation of the diagram syntax from the AI
 * happens inside `lib/ai-client.ts` for better efficiency.
 * This file can be used for any future diagram-specific helper functions.
 */

/**
 * A simple helper function to validate or prepare the diagram string.
 * @param diagramString The Mermaid syntax string from the AI.
 * @returns The validated diagram string.
 */
export function prepareDiagram(diagramString: string): string {
  if (!diagramString || !diagramString.trim().startsWith('erDiagram')) {
    throw new Error("Invalid or empty diagram string provided.");
  }
  // This function could be expanded to perform more complex transformations if needed.
  return diagramString.trim();
}