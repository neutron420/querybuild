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

  const prompt = `
    Based on the following user request, generate a database schema.
    The output must be a single, valid JSON object with three keys: "schema", "diagram", and "sqlCode".

    1.  The "schema" key should contain an array of tables. Each table object must have:
        - "name": string
        - "columns": An array of column objects. Each column must have "name", "type", "isPrimaryKey" (optional), and "isForeignKey" (optional).

    2.  The "diagram" key should contain a string with Mermaid.js "erDiagram" syntax.

    3.  The "sqlCode" key should contain a string of the full SQL "CREATE TABLE" statements for the entire schema.

    User Request: "${userInput}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonResponse = JSON.parse(response.text());
    
    if (!jsonResponse.schema || !jsonResponse.diagram || !jsonResponse.sqlCode) {
        throw new Error("AI response is missing required keys.");
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error generating schema with AI:", error);
    throw new Error("Failed to generate the database schema.");
  }
}