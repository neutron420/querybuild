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

  // --- START: IMPROVED PROMPT ---
  const prompt = `
    You are an expert database designer. Based on the following user request, generate a complete and well-structured database schema for PostgreSQL.

    The output MUST be a single, valid JSON object with three keys: "schema", "diagram", and "sqlCode".

    ### Instructions & Constraints:
    1.  **Primary Keys**: Every table must have a primary key. Use 'id' as the primary key name and UUID as the data type by default.
    2.  **Foreign Keys**: Clearly identify foreign keys and name them logically (e.g., 'user_id').
    3.  **Data Types**: Use appropriate PostgreSQL data types (e.g., VARCHAR(255), TEXT, TIMESTAMP WITH TIME ZONE, INTEGER, BOOLEAN, UUID).
    4.  **Timestamps**: Include 'created_at' and 'updated_at' timestamp fields (TIMESTAMPTZ) for tables that represent trackable entities (like users, posts, orders).
    5.  **Mermaid Diagram**: The "diagram" key must contain a valid Mermaid.js "erDiagram" string that accurately represents the relationships between the tables.
    6.  **SQL Code**: The "sqlCode" key must contain the full "CREATE TABLE" statements for PostgreSQL, including primary key and foreign key constraints.

    ### Example Input & Output:

    **User Request Example**: "A simple blog with users and posts."

    **Expected JSON Output Example**:
    \`\`\`json
    {
      "schema": {
        "tables": [
          {
            "name": "users",
            "columns": [
              { "name": "id", "type": "UUID", "isPrimaryKey": true },
              { "name": "username", "type": "VARCHAR(255)" },
              { "name": "email", "type": "VARCHAR(255)" },
              { "name": "created_at", "type": "TIMESTAMPTZ" },
              { "name": "updated_at", "type": "TIMESTAMPTZ" }
            ]
          },
          {
            "name": "posts",
            "columns": [
              { "name": "id", "type": "UUID", "isPrimaryKey": true },
              { "name": "user_id", "type": "UUID", "isForeignKey": true },
              { "name": "title", "type": "VARCHAR(255)" },
              { "name": "content", "type": "TEXT" },
              { "name": "created_at", "type": "TIMESTAMPTZ" },
              { "name": "updated_at", "type": "TIMESTAMPTZ" }
            ]
          }
        ]
      },
      "diagram": "erDiagram\\n    users ||--o{ posts : \\"has\\"\\n    users {\\n        UUID id PK\\n        VARCHAR(255) username\\n        VARCHAR(255) email\\n        TIMESTAMPTZ created_at\\n        TIMESTAMPTZ updated_at\\n    }\\n    posts {\\n        UUID id PK\\n        UUID user_id FK\\n        VARCHAR(255) title\\n        TEXT content\\n        TIMESTAMPTZ created_at\\n        TIMESTAMPTZ updated_at\\n    }",
      "sqlCode": "CREATE TABLE users (\\n    id UUID PRIMARY KEY,\\n    username VARCHAR(255) NOT NULL,\\n    email VARCHAR(255) UNIQUE NOT NULL,\\n    created_at TIMESTAMPTZ DEFAULT NOW(),\\n    updated_at TIMESTAMPTZ DEFAULT NOW()\\n);\\n\\nCREATE TABLE posts (\\n    id UUID PRIMARY KEY,\\n    user_id UUID REFERENCES users(id),\\n    title VARCHAR(255) NOT NULL,\\n    content TEXT,\\n    created_at TIMESTAMPTZ DEFAULT NOW(),\\n    updated_at TIMESTAMPTZ DEFAULT NOW()\\n);"
    }
    \`\`\`

    ### User Request:
    "${userInput}"
  `;
  // --- END: IMPROVED PROMPT ---


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