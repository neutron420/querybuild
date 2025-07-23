// app/lib/ai-client.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

export async function generateSchema(userInput: string) {
  if (!userInput) {
    throw new Error("User input is required.");
  }

  // --- START: ENHANCED PROMPT FOR ALL OPERATIONS ---
  const prompt = `
    You are an expert database architect. Based on the following user request, generate a complete and well-structured database schema and corresponding CRUD (Create, Read, Update, Delete) operations.

    The output MUST be a single, valid JSON object with the following keys: "schema", "diagram", "postgresqlCode", "mysqlCode", "mongoDbSchema", "prismaSchema", and "crudOperations".

    ### Instructions & Constraints:
    1.  **Schema Generation**: Generate schemas for PostgreSQL, MySQL, MongoDB, and Prisma.
    2.  **Relational Schemas (PostgreSQL & MySQL)**:
        * Every table must have a UUID primary key named 'id'. For PostgreSQL, use \`DEFAULT gen_random_uuid()\`. For MySQL, use \`(UUID())\` and the CHAR(36) type.
        * Use appropriate data types for each dialect (e.g., \`TIMESTAMPTZ\` for PostgreSQL, \`DATETIME\` for MySQL).
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

    ### User Request:
    "${userInput}"
  `;
  // --- END: ENHANCED PROMPT ---

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonResponse = JSON.parse(response.text());
    
    // Updated validation to check for all new keys
    if (!jsonResponse.schema || !jsonResponse.diagram || !jsonResponse.postgresqlCode || !jsonResponse.mysqlCode || !jsonResponse.mongoDbSchema || !jsonResponse.prismaSchema || !jsonResponse.crudOperations) {
        throw new Error("AI response is missing one or more required keys.");
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error generating schema with AI:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse the AI's JSON response. The format might be invalid.");
    }
    throw new Error("An error occurred while generating the database schema.");
  }
}