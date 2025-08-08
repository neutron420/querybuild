# 🧪 TestSprite MCP Guide for QueryBuild

## What is TestSprite MCP?

TestSprite is a testing framework that's installed as an MCP (Model Context Protocol) server in your Cursor environment. It provides powerful testing capabilities directly within your development workflow.

## 🚀 How to Use TestSprite MCP

### 1. **Access TestSprite Commands**

Since TestSprite is installed as an MCP server, you can access it through Cursor's command palette or by asking me to help you with testing tasks.

### 2. **Available TestSprite Features**

TestSprite can help you with:

- **Test Generation** - Create tests for your components
- **Test Execution** - Run tests and get results
- **Test Data Management** - Generate test data
- **Integration Testing** - Test your complete workflows
- **Test Reporting** - Get detailed test reports

### 3. **Testing Your QueryBuild Application**

Here are the key areas you can test:

#### **A. AI Chat Interface Testing**
```typescript
// Example test for your AI chat interface
describe('AI Chat Interface', () => {
  test('should send message and receive AI response', async () => {
    // Test the chat functionality
  });
  
  test('should handle loading states correctly', () => {
    // Test loading animations
  });
  
  test('should display error messages on API failure', () => {
    // Test error handling
  });
});
```

#### **B. Database Schema Generation Testing**
```typescript
// Example test for schema generation
describe('Schema Generation', () => {
  test('should generate PostgreSQL schema correctly', async () => {
    // Test PostgreSQL schema generation
  });
  
  test('should generate MongoDB schema correctly', async () => {
    // Test MongoDB schema generation
  });
  
  test('should create valid ER diagrams', async () => {
    // Test diagram generation
  });
});
```

#### **C. Editor Component Testing**
```typescript
// Example test for the React Flow editor
describe('Database Editor', () => {
  test('should add tables to canvas', () => {
    // Test table addition
  });
  
  test('should connect tables with relationships', () => {
    // Test relationship creation
  });
  
  test('should save and load diagrams', () => {
    // Test persistence
  });
});
```

### 4. **Setting Up Tests with TestSprite**

#### **Step 1: Create Test Files**
Create test files in your project:
```
querybuild/
├── __tests__/
│   ├── components/
│   │   ├── ai-chat.test.tsx
│   │   ├── schema-generator.test.tsx
│   │   └── editor.test.tsx
│   ├── pages/
│   │   ├── ai.test.tsx
│   │   └── main.test.tsx
│   └── api/
│       └── chat.test.ts
```

#### **Step 2: Install Testing Dependencies**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

#### **Step 3: Configure Jest**
Create `jest.config.js`:
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
```

#### **Step 4: Create Jest Setup**
Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom';
```

### 5. **Example Test Implementation**

#### **Testing the AI Chat Interface**
```typescript
// __tests__/components/ai-chat.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AiPage from '@/app/ai/page';

describe('AI Chat Interface', () => {
  test('renders chat interface correctly', () => {
    render(<AiPage />);
    
    expect(screen.getByText('Query Build AI')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message Query Build AI...')).toBeInTheDocument();
  });

  test('sends message and shows loading state', async () => {
    render(<AiPage />);
    
    const input = screen.getByPlaceholderText('Message Query Build AI...');
    const sendButton = screen.getByTitle('Send message');
    
    fireEvent.change(input, { target: { value: 'Hello AI' } });
    fireEvent.click(sendButton);
    
    // Check if loading state appears
    await waitFor(() => {
      expect(screen.getByText('Query Build AI')).toBeInTheDocument();
    });
  });
});
```

#### **Testing API Endpoints**
```typescript
// __tests__/api/chat.test.ts
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/app/api/chat/route';

describe('Chat API', () => {
  test('responds with AI message', async () => {
    const req = {
      method: 'POST',
      body: { message: 'Hello' },
    } as NextApiRequest;
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
    
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        reply: expect.any(String),
      })
    );
  });
});
```

### 6. **Running Tests with TestSprite**

#### **Using TestSprite Commands**
You can ask me to help you:
- Generate tests for specific components
- Run existing tests
- Create test data
- Analyze test coverage
- Debug failing tests

#### **Example Commands**
```
"Generate tests for the AI chat interface"
"Run all tests and show me the results"
"Create test data for user authentication"
"Show me test coverage for the editor component"
```

### 7. **TestSprite Integration Benefits**

1. **Automated Test Generation** - TestSprite can analyze your code and generate relevant tests
2. **Smart Test Data** - Generate realistic test data for your database schemas
3. **Integration Testing** - Test complete user workflows from start to finish
4. **Performance Testing** - Test your AI response times and component performance
5. **Visual Testing** - Test UI components and user interactions

### 8. **Best Practices**

#### **Test Organization**
- Group related tests in describe blocks
- Use descriptive test names
- Test one thing per test case
- Use setup and teardown functions

#### **Test Data Management**
- Use factories for creating test data
- Mock external APIs (like Google Gemini)
- Use consistent test data across tests

#### **Component Testing**
- Test user interactions
- Test error states
- Test loading states
- Test accessibility features

### 9. **Getting Help with TestSprite**

If you need help with TestSprite:
1. Ask me to generate tests for specific components
2. Request help debugging failing tests
3. Ask for test data generation
4. Get help with test configuration

### 10. **Next Steps**

1. **Start with Component Tests** - Test your AI chat interface first
2. **Add API Tests** - Test your chat and schema generation endpoints
3. **Integration Tests** - Test complete user workflows
4. **Performance Tests** - Test AI response times and UI performance

Would you like me to help you set up specific tests for your QueryBuild application?
