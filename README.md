# Todai - AI Diary Analyzer

<br />
<div align="center">
  <h3 align="center">Todai</h3>

  <p align="center">
    Your AI-powered diary companion.
  </p>
</div>

<br/>
<br/>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#how-to-use">How to Use</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>
<br/>

## About The Project

Todai is a web application that provides a secure space for you to write down your thoughts and feelings. By leveraging a powerful AI model, Todai will analyze your entries, offering compassionate feedback, identifying emotional patterns and providing helpful tips. 

The goal of Todai is to provide support and a moment of reflection, acting as a personal tool for emotional awareness and well-being.

### Features

* **📝 Write & Reflect:** A clean, focused editor to write your daily diary entries.
* **🤖 AI-Powered Analysis:** Get insights into your feelings with analysis from a compassionate AI assistant.
* **🗂️ Entry History:** Easily browse, select, and manage past entries in a persistent sidebar.
* **🗑️ Delete Securely:** A confirmation step ensures you never accidentally delete an entry.
* **📱 Responsive Design:** A fully responsive interface that works beautifully on desktop and mobile devices.

### Built With

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### Project Structure

```sh
.
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   └── analyze
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components
│       ├── DeleteConfirmation.tsx
│       ├── Footer.tsx
│       └── FormattedAIResponse.tsx
└── tsconfig.json
```

## Getting Started

### Prerequisites

To run this project locally, you will need to have the following installed on your local machine:

* **[Node.js](https://nodejs.org/) (v18.x or later)**

* **npm (Node Package Manager)**
    ```sh
    npm install
    ```

### How to Use

1.  **Clone the repository**
    ```sh
    git clone https://github.com/wisauce/Todai.git
    ```

2.  **Navigate to the project directory**
    ```sh
    cd Todai
    ```

3.  **Install NPM packages**
    ```sh
    npm install
    ```

4.  **Run the application**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Contributors
| NIM | Name 
| :---: | :---: 
| 13123069 | Muhamad Hanif Hafizhan |
| 13523008 | Varel Tiara |
| 13523048 | Brian Albar Hadian | 
| 13523052 | Adhimas Aryo Bimo | 
| 13523067 | Benedict Presley | 
| 13523099 | Daniel Pedrosa Wu | 
| 18223003 | Wisa Ahmaduta Dinutama |
| 18223009 | Muhammad Faiz Alfikrona | 