## Workers - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Why should workers have `--time-limit` and `--memory-limit`? What happens when limits are reached?

<details><summary>Click to reveal Solution</summary>

- **`--time-limit`**: Prevents workers from running forever (avoids stale connections, memory leaks).
- **`--memory-limit`**: Prevents out-of-memory crashes.
- When limits are reached: Worker **gracefully stops** — finishes the current message, then exits. Supervisor restarts it automatically.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Workers"](https://symfonycasts.com/search?q=workers)
