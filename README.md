# SummitAi

**SummitAi** is a web application designed to help users organize and generate concise summaries of their meetings. Users can upload a PDF or paste raw transcript text, which is processed and structured into a summary with clear sections: **Title**, **Summary**, **Questions**, **Decisions**, **Actions**, and **Tags**.

Each meeting gets its own dedicated page. All meetings are accessible from a personalized **dashboard**, which supports **client-side substring searching** and **tag-based filtering** to quickly find relevant summaries. Meetings can be modified on its meeting page to add / remove content.

This project introduced me to:

* **Openrouter api calling & structured prompt design**
* **Dynamic client-side filtering and search**
* **Text-to-structured-data workflows using LLMs**

It also builds on prior experience with:

* **Next.js** & **React**
* **TailwindCSS**
* **shadcn/ui**
* **better-auth** (email + OAuth)
* **Zod** for schema validation
* **Prisma ORM** with **PostgreSQL**
* **React Query**
* **Nodemailer**
* **Vercel** deployment

🔗 **Live Demo**: [summitai-seven.vercel.app](https://summitai-seven.vercel.app)

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Folder Structure](#folder-structure)
* [Challenges Faced](#challenges-faced)
* [Future Improvements](#future-improvements)

---

## Features

* **Meeting Summarization**

  * Upload PDF or paste raw meeting transcript
  * Transcripts are processed via Mistral Small 3.2 24B (accessed through OpenRouter)
  * Summaries structured into: Title, Summary, Questions, Decisions, Actions, and Tags
* **User Dashboard**

  * Displays all user meetings as clickable cards
  * Client-side filtering by tag and substring search
* **User Authentication**

  * Email + password signup/login with email verification (Nodemailer)
  * OAuth via Google & GitHub (via better-auth)
* **Validation & Type Safety**

  * Schema-based validation using Zod (frontend + backend)
* **Responsive & Accessible UI**

  * Styled using TailwindCSS and shadcn/ui
* **Serverless & Scalable**

  * Deployed on Vercel with Postgres + Prisma ORM

---

## Tech Stack

| Area             | Tech                                                             |
| ---------------- | ---------------------------------------------------------------- |
| **Frontend**     | Next.js, React, TypeScript, TailwindCSS, shadcn/ui               |
| **State & Data** | React Query, Zod, React Hook Form                                |
| **Backend**      | API Routes (Next.js), OpenRouter (Mistral 3.2), Prisma ORM       |
| **Database**     | PostgreSQL                                                       |
| **Auth**         | better-auth, Nodemailer, OAuth (Google, GitHub)                  |
| **Deployment**   | Vercel                                                           |

---

## Folder Structure

```
/app                # Next.js app directory
/actions            # Auth + nodemailer api actions
/components         # Shared UI components
/app/api            # API routes (auth, summarization, meetings)
/lib                # Utility functions (auth, openrouter. prisma, nodemailer)
/hooks              # Hooks for api calling using react query
./prisma            # Prisma schema and migrations
/types              # Shared TypeScript types
```

---

## Challenges Faced

* **Structured outputs from Mistral via OpenRouter** — crafting prompts to return consistent JSON from Mistral required fine-tuning, especially on longer or messy transcripts.
* **Dashboard filtering** — building performant client-side filtering for both text and tags.
* **Handling unstructured input** — ensuring robustness when users upload poor-quality PDFs or poorly formatted text.

---

## Future Improvements

* Support multiple file types (e.g. `.docx`, `.txt`)
* Add tag suggestions based on content
* Export summaries to PDF or markdown
* Add role-based access or teams
* Test coverage (unit & integration tests)

---

## Conclusion

SummitAi was a deep dive into structured AI outputs, fullstack development, and user-centered UX. It combines LLM-powered processing with practical user tools, all built on a modern web stack. It taught me valuable lessons about handling dynamic, unstructured data and turning it into usable knowledge for users.
