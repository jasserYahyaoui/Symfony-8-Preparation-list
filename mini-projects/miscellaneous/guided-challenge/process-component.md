## Process component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `run()`, `start()`, and `mustRun()`?

<details><summary>Click to reveal Solution</summary>

- **`run()`**: Synchronous. Waits for the process to finish. Returns the exit code.
- **`start()`**: Asynchronous. Returns immediately. Use `wait()` to wait for completion.
- **`mustRun()`**: Like `run()` but throws `ProcessFailedException` if exit code ≠ 0.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Process component"](https://symfonycasts.com/search?q=process%2Bcomponent)
