## Internal redirects - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `$this->redirect()` and `$this->forward()`?

<details><summary>Click to reveal Solution</summary>

- **`redirect()`**: Sends a 3xx HTTP response → browser makes a NEW request → URL changes.
- **`forward()`**: Creates an internal sub-request → same PHP process → URL does NOT change. The client receives the response from the forwarded controller without knowing.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Internal redirects"](https://symfonycasts.com/search?q=internal%2Bredirects)
