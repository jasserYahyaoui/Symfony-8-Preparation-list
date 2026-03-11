# Symfony 8.0 Expert Certification Strategy

> 🏆 "Expert" is not just about knowing the syntax. It's about knowing the architecture, the defaults, the best practices, and spotting the subtle traps.

This guide provides the ultimate combat strategy for passing the SensioLabs Symfony 8.0 Certification at the highest tier.

---

## 🧭 1. Managing Stress & Time During the Exam

The SensioLabs exam is precisely timed (usually 90 minutes for 75 questions). This means you have exactly **1 minute and 12 seconds per question**.

### The "3-Pass" Timing Strategy:
1. **Pass 1: The Quick Wins (0-30m)**
   - Go through all 75 questions as fast as possible.
   - If you know the answer instantly (e.g., "What attribute defines a CLI command? `#[AsCommand]`), answer it.
   - If the question requires reading a block of code or thinking for more than 30 seconds, **MARK IT FOR REVIEW** and skip it.
2. **Pass 2: The Code Readers (30-70m)**
   - Go back to the marked questions. These are usually the "Find the bug" or "What is the output" questions.
   - Read them carefully. You now have the time and mental space because the easy questions are already secured.
3. **Pass 3: The Educated Guesses (70-90m)**
   - Any question you are still unsure about must be answered now.
   - NEVER leave a question blank. There is no negative marking (usually). Eliminate the obviously wrong answers to increase your probability.

> **Mental Trick:** If you feel your heart rate spiking because you don't know 5 questions in a row, close your eyes, take a 5-second deep breath, and remember that you only need a specific percentage to pass. You can afford to miss questions.

---

## 🪤 2. SensioLabs "Gotchas" & Common Traps

The examiners love testing if you've actually used the framework vs. just read the marketing pages. Watch out for these subtle traps:

### A. The "Deprecated Interface" Trap
In Symfony 8, many marker interfaces (e.g., `MessageHandlerInterface`, `EventSubscriberInterface`) are being replaced by PHP 8 **Attributes**.
- **Trap:** Code uses `implements MessageHandlerInterface`.
- **Reality:** While it might still work via BC layer, the "correct/expert" answer for Symfony 8 is using `#[AsMessageHandler]`.

### B. The "Wrong Return Type" Trap
In modern PHP 8.x and Symfony 8, type declarations are heavily enforced.
- **Trap:** A `FormType` method `public function buildForm(FormBuilderInterface $builder, array $options) { ... }` missing the `void` return type.
- **Reality:** Modern Symfony abstract classes enforce these types. It will throw a fatal error.

### C. The "YAML vs PHP vs XML" Defaults
- **Trap:** A question asks where routes are defined by default in a new Symfony 8 project.
- **Reality:** Attributes (`#[Route]`) configured in `config/routes.yaml` (which points to the `src/Controller/` directory) are the default. XML and YAML are valid, but Attributes are the standard.

### D. The "Service Autowiring" Trap
- **Trap:** A service needs a specific parameter (like a string `$adminEmail`). You try to fetch it via `$this->container->getParameter()`.
- **Reality:** In modern Symfony, you should inject it directly into the constructor using the `#[Autowire('%admin_email%')]` attribute.

### E. The "True/False Absolutes"
- **Trap:** "It is IMPOSSIBLE to use Symfony without Twig."
- **Reality:** False. Symfony is completely modular. Watch out for absolute words like "impossible", "always", "never". They are often indicators of a False statement.

---

## 🛫 3. The "Ready for Takeoff" Checklist

Do not buy the voucher until you can confidently check ALL the boxes below:

- [ ] **The Theory Base:** I have read 100% of the topics in the `topics/` directory.
- [ ] **The Memorization:** I can answer the Anki flashcards with an 85%+ success rate.
- [ ] **The Edge Cases:** I have scored perfectly on the `quizz/` directory.
- [ ] **The Practical Skills:** I have completed every `guided-challenge/` in the `mini-projects/` without constantly looking at the full tutorial.
- [ ] **The Simulator Proof:** I have taken `mock-exam-1.md` and `mock-exam-2.md` within the 90-minute time limit, grading myself purely on the answer keys, and scored at least 80% on both.
- [ ] **The Blind Bug Finding:** I easily spotted the subtle errors in the `code-reviews/` exercises.

If you have checked all these boxes, you are not just ready to pass. You are ready to achieve the **Expert** tier.

Good luck. You've earned this.
