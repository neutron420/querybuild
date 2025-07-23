
import { GoogleGenerativeAI } from "@google/generative-ai";
interface AiResponse {
  schema: unknown;
  diagram: string;
  postgresqlCode: string;
  mysqlCode: string;
  mongoDbSchema: string;
  prismaSchema: string;
  crudOperations: unknown;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

/**
 * Extracts a JSON object from a string.
 * This fixes the error by changing the return type from 'any' to 'unknown'.
 * @param text The raw text response from the AI.
 * @returns The parsed JSON object as 'unknown' or null if not found.
 */
function extractJsonObject(text: string): unknown | null {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```|({[\s\S]*})/;
  const match = text.match(jsonRegex);

  if (match) {
    const jsonString = match[1] || match[2];
    if (jsonString) {
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.error("Failed to parse extracted JSON:", error);
        return null;
      }
    }
  }
  return null;
}

export async function generateSchema(userInput: string) {
  if (!userInput) {
    throw new Error("User input is required.");
  }

  const prompt = `
    You are an expert database architect. Based on the following user request, generate a complete and well-structured database schema and corresponding CRUD (Create, Read, Update, Delete) operations.

    The output MUST be a single, valid JSON object with the following keys: "schema", "diagram", "postgresqlCode", "mysqlCode", "mongoDbSchema", "prismaSchema", and "crudOperations".

    ### Instructions & Constraints:
    1.  **Schema Generation**: Generate schemas for PostgreSQL, MySQL, MongoDB, and Prisma.
    2.  **Relational Schemas (PostgreSQL & MySQL)**:
        * Every table must have a UUID primary key named 'id'. For PostgreSQL, use \`DEFAULT gen_random_uuid()\`. For MySQL, use \`(UUID())\` and the CHAR(36) type.
        * Include 'created_at' and 'updated_at' timestamps with appropriate default values.
        * Define foreign keys with 'ON DELETE CASCADE' where it makes sense.
        * Add comments to the SQL code.
    3.  **MongoDB Schema**:
        * Provide a JSON string representing the collections and documents. Use embedded documents for tightly coupled one-to-many relationships and references (ObjectId) for many-to-many relationships.
    4.  **Prisma Schema**:
        * Contain a single, comprehensive Prisma schema including \`datasource\` and \`generator\` blocks. Define relations correctly.
    5.  **CRUD Operations**:
        * For the "crudOperations" key, provide a JSON object where keys are table names.
        * For each table, provide example SQL statements for \`create\`, \`read\`, \`update\`, and \`delete\`. Use placeholders like '[value]'.
    6.  **Mermaid Diagram**:
        * The "diagram" key must contain a valid Mermaid.js "erDiagram" string.
        * **Crucially, each relationship definition MUST be on its own separate line.**

    ### User Request:
    "${userInput}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const parsedJson = extractJsonObject(responseText);

    if (!parsedJson) {
      throw new Error("Failed to parse the AI's JSON response. The format might be invalid.");
    }

    // Assert the type of the parsed JSON to our known interface.
    // This allows safe access to its properties for validation.
    const jsonResponse = parsedJson as AiResponse;
    
    // Validation now works without type errors.
    if (!jsonResponse.schema || !jsonResponse.diagram || !jsonResponse.postgresqlCode || !jsonResponse.mysqlCode || !jsonResponse.mongoDbSchema || !jsonResponse.prismaSchema || !jsonResponse.crudOperations) {
        throw new Error("AI response is missing one or more required keys.");
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error generating schema with AI:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse the AI's JSON response. The format might be invalid.");
    }
    // Re-throw the original error message if it's an Error instance.
    const errorMessage = error instanceof Error ? error.message : "An error occurred while generating the database schema.";
    throw new Error(errorMessage);
  }
}