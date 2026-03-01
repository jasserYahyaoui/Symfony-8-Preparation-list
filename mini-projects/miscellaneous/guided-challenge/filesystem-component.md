## Filesystem component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `dumpFile()` and `file_put_contents()`?

<details><summary>Click to reveal Solution</summary>

`dumpFile()` is **atomic**: It writes to a temporary file first, then renames it. This prevents partial writes and data corruption if the process is interrupted. `file_put_contents()` writes directly and can leave a corrupted file on failure.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Filesystem component"](https://symfonycasts.com/search?q=filesystem%2Bcomponent)
