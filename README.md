# QueryBuild 🚀

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk&logoColor=white" alt="Clerk">
  <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?logo=google&logoColor=white" alt="Google Gemini">
</div>
<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

**Transform your database ideas into digital reality. QueryBuild is an AI-powered application that allows you to generate complete, well-structured database schemas and essential CRUD operations simply by describing your needs in natural language.**

[**Live Demo (link to your deployed project)**] · [**Report a Bug**] · [**Request a Feature**]

## 🌟 About The Project

QueryBuild is designed to accelerate the database design process for developers. By leveraging the power of Google's Gemini AI, it interprets user requirements and automatically generates the necessary assets to get a database up and running quickly. This includes visual diagrams, SQL code for multiple database systems, and modern ORM schemas.

### ✨ Key Features

* **AI-Powered Schema Generation:** Describe your application's data needs in plain English and let our AI do the heavy lifting.
* **Multi-Database Support:** Generates schemas for PostgreSQL, MySQL, and MongoDB.
* **Prisma ORM Integration:** Automatically creates a ready-to-use Prisma schema.
* **Visual ER Diagrams:** Instantly visualizes your database structure with Mermaid.js entity-relationship diagrams.
* **CRUD Operation Scaffolding:** Generates boilerplate Create, Read, Update, and Delete (CRUD) SQL statements for each table.
* **Interactive UI:** A clean, intuitive interface built for a seamless user experience.

### 🛠️ Built With

This project is built with a modern, robust tech stack:

* **Framework:** [Next.js](https://nextjs.org/) (with Turbopack)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Authentication:** [Clerk](https://clerk.com/)
* **AI:** [Google Generative AI (Gemini)](https://ai.google.dev/)
* **UI Components:** Radix UI, Lucide React, Framer Motion

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (version 18.17.0 or higher) and a package manager (npm, yarn, or pnpm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your_username/querybuild.git](https://github.com/your_username/querybuild.git)
    cd querybuild
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your API keys:

    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/main
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/main

    # Google Generative AI
    GEMINI_API_KEY=your_gemini_api_key
    ```
    *You can get your Clerk keys from the [Clerk Dashboard](https://dashboard.clerk.com/).*
    *You can get your Gemini API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1.  Navigate to the main application page after signing in (`/main`).
2.  In the input text area, describe the database you want to create. For example: *"An e-commerce platform with users, products, orders, and inventory."*
3.  Click the "Generate Schema" button.
4.  The application will display:
    * An **ER Diagram** visualizing the table relationships.
    * Tabs containing the generated code for **CRUD Operations**, **PostgreSQL**, **MySQL**, **MongoDB**, and **Prisma**.
5.  Use the "Copy" or "Download" buttons to use the generated schemas in your own project.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/neutron420/querybuild](https://github.com/your_username/querybuild)

## 🙏 Acknowledgments

* [Vercel](https://vercel.com/) for the amazing Next.js framework.
* [Clerk](https://clerk.dev/) for simplifying authentication.
* [Google](https://ai.google.dev/) for the powerful Gemini API.
* [Shadcn/ui](https://ui.shadcn.com/) for the UI components.
* [Mermaid](https://mermaid-js.github.io/mermaid/#/) for the diagramming tool.
