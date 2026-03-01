## Middleware - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the purpose of middleware in the Messenger pipeline? Name 2 built-in middleware.

<details><summary>Click to reveal Solution</summary>

Middleware intercepts messages before/after handling. Use cases: logging, validation, transaction wrapping, authentication.

Built-in:
1. `SendMessageMiddleware`: Routes messages to transports.
2. `HandleMessageMiddleware`: Invokes the message handler.
3. `DoctrineTransactionMiddleware`: Wraps handler in a DB transaction.
4. `ValidationMiddleware`: Validates the message object.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Middleware"](https://symfonycasts.com/search?q=middleware)
