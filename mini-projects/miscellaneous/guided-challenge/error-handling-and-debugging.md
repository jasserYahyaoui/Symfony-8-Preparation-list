## Error handling and debugging - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `dump()`, `dd()`, and `var_dump()`?

<details><summary>Click to reveal Solution</summary>

- **`var_dump()`**: Raw PHP. Outputs directly. No formatting. No profiler integration.
- **`dump()`**: Symfony/VarDumper. Beautiful formatting. Integrates with the Profiler toolbar and `server:dump`.
- **`dd()`**: Same as `dump()` but also calls `die()` — halts execution.

In production, `dump()` silently sends to the profiler. `dd()` should NEVER be in production code.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Error handling and debugging"](https://symfonycasts.com/search?q=error%2Bhandling%2Band%2Bdebugging)
