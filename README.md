# Symfony 8.0 Certification (Expert Level) - Ultimate Study Workspace

Welcome to your ultimate preparation environment for the **Symfony 8.0 Certification (Expert Level)**. This repository contains a complete, pedagogically-optimized curriculum covering all 15 topics required to pass the exam, carefully structured for a 13-week study plan.

---

## 🏗️ Global Architecture

The workspace is split into specialized directories designed for different phases of the learning process:

```text
.
├── 00-setup-sandbox.md             <-- Instructions for setting up your local environment
├── README.md                       <-- This file format and dashboard
├── study_plan.md                   <-- The 13-week day-by-day learning schedule
├── roadmap.html                    <-- Interactive visual map of the certification journey
├── topics/                         <-- Detailed theory and concept explanations (15 files)
├── flashcards/                     <-- Anki-style Q&A for active recall and memorization
├── quizz/                          <-- Exam-grade mock tests (True/False, Multiple Choice)
├── mini-projects/                  <-- Practical exercises split by topic and phase
│   ├── 00-setup-sandbox.md         <-- Monolithic sandbox setup guide
│   ├── php/                        <-- Topic folder (e.g., PHP 8.4)
│   │   ├── README.md               <-- Index of exercises for this topic
│   │   ├── full-tutorial/          <-- Step-by-step guided tutorials (Phase 1)
│   │   └── guided-challenge/       <-- Solo challenges with hidden solutions (Phase 2)
│   └── ...                         <-- Folders for the other 14 topics
└── deprecations/                   <-- Graveyard of out-of-scope topics for the 8.0 exam
```

---

## 🔄 The Learning Loop

To maximize retention and guarantee success, do **not** just read the topics passively. Use the 5-phase Spaced Repetition Loop built into this workspace:

1. 🔵 **LEARN (Theory):** Read the concept explanations in the `topics/` directory.
2. 🟡 **MEMORIZE (Recall):** Test your memory immediately using the `flashcards/` decks.
3. 🟠 **TEST (Mock Exam):** Take the rigorous `quizz/` test to identify knowledge gaps.
4. 🟢 **PRACTICE (Walkthrough):** Go to `mini-projects/[topic]/full-tutorial/` and code along with the step-by-step guide to see the concepts working in a real Symfony app.
5. 🔴 **CHALLENGE (Validation):** Wait a few days (spaced repetition), then attempt the exercises in `mini-projects/[topic]/guided-challenge/` from scratch, using the hidden solutions only if stuck.

---

## 🧭 Master Index

Use these links to navigate your workspace:

- 🗺️ **[Visual Roadmap](./roadmap.html)** — View the interactive map of your journey.
- 📅 **[13-Week Study Plan](./study_plan.md)** — Follow the day-by-day pedagogical schedule.
- 🛠️ **[Local Sandbox Setup](./mini-projects/00-setup-sandbox.md)** — Prepare your Symfony 8.0 monolithic project.

**Topics:**
1. [PHP 8.4](./topics/php.md)
2. [HTTP](./topics/http.md)
3. [Symfony Architecture](./topics/symfony-architecture.md)
4. [Routing](./topics/routing.md)
5. [Controllers](./topics/controllers.md)
6. [Templating with Twig](./topics/templating-with-twig.md)
7. [Forms](./topics/forms.md)
8. [Data Validation](./topics/data-validation.md)
9. [Dependency Injection](./topics/dependency-injection.md)
10. [Security](./topics/security.md)
11. [HTTP Caching](./topics/http-caching.md)
12. [Messenger](./topics/messenger.md)
13. [Console](./topics/console.md)
14. [Automated Tests](./topics/automated-tests.md)
15. [Miscellaneous](./topics/miscellaneous.md)
