<div align="center">

# 🚀 QueryBuild

### *AI-Powered Database Schema Generator*

**Transform your database ideas into production-ready schemas**

*QueryBuild leverages Google's Gemini AI to generate complete database schemas, visual diagrams, and CRUD operations from natural language descriptions.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<br/>

[**🌐 Live Demo**](https://your-demo-link.com) • [**📖 Documentation**](https://your-docs-link.com) • [**🐛 Report Bug**](https://github.com/neutron420/querybuild/issues) • [**💡 Request Feature**](https://github.com/neutron420/querybuild/issues)

<br/>

---

<br/>

## 📋 Table of Contents

**[Overview](#-overview)** • **[Features](#-features)** • **[Tech Stack](#-tech-stack)** • **[Getting Started](#-getting-started)** • **[Usage](#-usage)** • **[Contributing](#-contributing)** • **[License](#-license)** • **[Contact](#-contact)**

<br/>

---

<br/>

## 🎯 Overview

**QueryBuild revolutionizes database design** by eliminating the tedious process of manual schema creation. 

Simply describe your application's data requirements in plain English, and our AI-powered engine generates:

✨ **Complete database schemas** for multiple database systems  
📊 **Visual ER diagrams** for better understanding  
⚡ **Ready-to-use CRUD operations**  
🛠️ **Modern ORM configurations** (Prisma)

*Perfect for developers, startups, and teams looking to accelerate their development workflow.*

<br/>

---

<br/>

## ✨ Features

### 🤖 **AI-Powered Generation**
- Natural language processing using Google Gemini AI
- Intelligent schema optimization and best practices
- Context-aware relationship detection

### 🗄️ **Multi-Database Support**
- **PostgreSQL** - Production-ready schemas
- **MySQL** - Optimized for performance
- **MongoDB** - Document-based structures
- **Prisma ORM** - Type-safe database access

### 📊 **Visual Diagrams**
- Interactive Entity-Relationship diagrams
- Mermaid.js powered visualizations
- Export-ready formats

### ⚡ **CRUD Operations**
- Auto-generated Create, Read, Update, Delete operations
- Optimized queries for each database type
- Production-ready code snippets

### 🎨 **Modern Interface**
- Clean, intuitive design
- Real-time preview
- Copy-to-clipboard functionality
- Download generated files

<br/>

---

<br/>



## 🛠️ Tech Stack

### **Frontend Technologies**
🎨 **Next.js 15** - React framework with App Router  
📝 **TypeScript 5** - Type-safe development  
✨ **Tailwind CSS 4** - Utility-first styling  
🎭 **Framer Motion** - Smooth animations  
🧩 **Radix UI** - Accessible components

### **Backend & AI**
🤖 **Google Gemini AI** - Natural language processing  
🔐 **Clerk Authentication** - Secure user management  
📊 **Mermaid.js** - Diagram generation

### **Development Tools**
⚡ **Turbopack** - Ultra-fast bundler  
🔍 **ESLint** - Code quality  
💅 **Prettier** - Code formatting

<br/>

---

<br/>

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** ≥ 18.17.0
- **npm**, **yarn**, or **pnpm**

<br/>

### **Installation**

**1. Clone the repository**
```bash
git clone https://github.com/neutron420/querybuild.git
cd querybuild
```

**2. Install dependencies**
```bash
npm install
# or
yarn install
# or  
pnpm install
```

**3. Environment Setup**

Create `.env.local` in the root directory:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/main
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/main

# Google Generative AI
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your API keys:**
- 🔐 [Clerk Dashboard](https://dashboard.clerk.com/)
- 🤖 [Google AI Studio](https://aistudio.google.com/app/apikey)

**4. Start Development Server**
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to view the application.

<br/>

---

<br/>

## 📖 Usage

### **Quick Start Guide**

**1. 🔐 Sign In** - Create an account or sign in with existing credentials

**2. 📝 Describe Database** - Enter your requirements in natural language
```
Example: "A social media app with users, posts, comments, 
likes, and follower relationships"
```

**3. 🚀 Generate** - Click "Generate Schema" and wait for AI processing

**4. 📊 Review Output** - Examine the generated ER diagram and code

**5. 💾 Export** - Copy code or download files for your project

<br/>

### **Example Prompts**

**🛒 E-commerce Platform**
```text
An online store with customers, products, categories, shopping carts, 
orders, payments, and inventory tracking
```

**📝 Blog System**
```text
A blogging platform with authors, posts, categories, tags, comments, 
and user authentication
```

**📋 Task Management**
```text
A project management tool with users, projects, tasks, assignments, 
deadlines, and progress tracking
```

<br/>

---

<br/>

## 🔧 API Reference

### **Schema Generation Endpoint**

```typescript
POST /api/generate-schema

// Request Body
{
  "description": "Your database description",
  "userId": "user_id",
  "options": {
    "includeIndexes": true,
    "includeTriggers": false,
    "optimizeForRead": true
  }
}

// Response
{
  "success": true,
  "data": {
    "erDiagram": "mermaid_diagram_code",
    "schemas": {
      "postgresql": "CREATE TABLE...",
      "mysql": "CREATE TABLE...",
      "mongodb": "db.collection...",
      "prisma": "model User..."
    },
    "crudOperations": {
      "create": "INSERT INTO...",
      "read": "SELECT * FROM...",
      "update": "UPDATE ... SET...",
      "delete": "DELETE FROM..."
    }
  }
}
```

<br/>

---

<br/>

## 🤝 Contributing

**We welcome contributions! Here's how you can help:**

### **Development Workflow**

**1. Fork** the project

**2. Create** your feature branch
```bash
git checkout -b feature/amazing-feature
```

**3. Commit** your changes
```bash
git commit -m 'Add amazing feature'
```

**4. Push** to the branch
```bash
git push origin feature/amazing-feature
```

**5. Open** a Pull Request

<br/>

### **Contribution Guidelines**

✅ Follow the existing code style  
✅ Add tests for new features  
✅ Update documentation as needed  
✅ Ensure all tests pass before submitting

<br/>

### **Development Setup**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

<br/>

---

<br/>

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

<br/>

---

<br/>

## 📞 Contact

**Project Maintainer**: Ritesh Kumar Singh  
**Email**: [fnaticritesh2004@gmail.com](mailto:fnaticritesh2004@gmail.com)  
**LinkedIn**: [Ritesh Kumar Singh](https://www.linkedin.com/in/ritesh-singh1/)

**Project Repository**: [https://github.com/neutron420/querybuild](https://github.com/neutron420/querybuild)

<br/>

---

<br/>

## 🙏 Acknowledgments

**Special thanks to the amazing tools and services that make QueryBuild possible:**

[**Vercel**](https://vercel.com/) • [**Google AI**](https://ai.google.dev/) • [**Clerk**](https://clerk.dev/) • [**Shadcn/ui**](https://ui.shadcn.com/) • [**Mermaid**](https://mermaid-js.github.io/) • [**Radix UI**](https://www.radix-ui.com/)

<br/>

---

<br/>

**⭐ Star this repo if you find it helpful!**

**Made with ❤️ by [Ritesh Kumar Singh](https://github.com/neutron420)**

<br/>

</div>
