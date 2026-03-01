# Anki Setup & Import Guide

This guide will walk you through how to set up Anki and import the exam-grade CSV flashcards generated in this workspace for your Symfony 8.0 Certification preparation.

## 1. Download and Install Anki
1. Go to the official Anki website: [https://apps.ankiweb.net/](https://apps.ankiweb.net/)
2. Download the version corresponding to your operating system (Windows, Mac, or Linux).
3. Install the application and open it.

## 2. Prepare the Deck
1. Open Anki.
2. At the bottom of the window, click on **Create Deck**.
3. Name your deck appropriately, for example: `Symfony 8.0 Certification - Automated Tests`.
4. Click on the newly created deck to enter it.

## 3. Import the CSV File
1. In the top menu bar, click on **File** > **Import...** (or press `Ctrl+Shift+I` / `Cmd+Shift+I`).
2. Navigate to your workspace directory and select the CSV file from `quizz/anki-exports/` (e.g., `automated-tests.csv`).

## 4. ⚠️ CRITICAL IMPORT SETTINGS
To ensure the questions, answers, code snippets, and explanations are formatted correctly, you **MUST** configure the following settings in the Import dialog window:

1. **Type:** Make sure it is set to `Basic`.
2. **Deck:** Ensure your newly created deck (e.g., `Symfony 8.0 Certification - Automated Tests`) is selected.
3. **Field separator:** This **MUST** be set to a semicolon `;`. If it defaults to a comma or tab, change it to `;`.
4. **Allow HTML in fields:** This checkbox **MUST BE CHECKED**. Without this, your code snippets (`<code>`) and line breaks (`<br>`) will render as raw text instead of actual formatting.
5. **Field Mapping:** Ensure:
   - Field 1 is mapped to `Front` (This is the Question).
   - Field 2 is mapped to `Back` (This is the Answer, Code, and Explanation).

## 5. Finish Import
1. Once you have verified the settings above, click **Import**.
2. Anki will give you a summary of how many notes were successfully added.
3. Go back to your Decks view and start studying!

### Study Tip
Use Anki daily to leverage spaced repetition. The algorithms will automatically show you the questions you struggle with more frequently, ensuring maximum retention for the Symfony 8.0 exam.
