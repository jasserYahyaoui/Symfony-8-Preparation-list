## Validation (ETag, Last-Modified) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `If-None-Match` (ETag) and `If-Modified-Since` (Last-Modified)? When do you use each?

<details><summary>Click to reveal Solution</summary>

- **`If-None-Match` / ETag**: Content-based validation. An opaque string (hash) represents the content state. Better for content that changes independently of time (e.g., edited documents).
- **`If-Modified-Since` / Last-Modified**: Time-based validation. Server checks if content changed after the given date. Simpler but less precise (1-second granularity).
- **Best practice**: Use both together. ETag is checked first; Last-Modified is a fallback.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Validation (ETag, Last-Modified)"](https://symfonycasts.com/search?q=validation%2B%28etag%2C%2Blast-modified%29)
