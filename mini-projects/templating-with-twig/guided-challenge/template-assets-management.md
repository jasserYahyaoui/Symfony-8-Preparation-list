## Template assets management - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `asset()` and a hardcoded `/styles/app.css` path?

<details><summary>Click to reveal Solution</summary>

- `asset()`: Handles base path prefixing (if app is in a subdirectory), asset versioning (cache busting), and CDN URL mapping. It's configuration-aware.
- Hardcoded path: None of the above. Breaks if the app base path changes, doesn't support cache busting.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Template assets management"](https://symfonycasts.com/search?q=template%2Bassets%2Bmanagement)
