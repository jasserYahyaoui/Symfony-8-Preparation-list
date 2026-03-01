## Caching types (browser, proxies, reverse-proxies) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `max-age` and `s-maxage`?

<details><summary>Click to reveal Solution</summary>

- **`max-age`**: How long the **browser** (private cache) can cache the response (in seconds).
- **`s-maxage`**: How long **shared caches** (CDN, reverse proxy) can cache the response. Overrides `max-age` for shared caches only.

Example: `Cache-Control: public, max-age=60, s-maxage=3600` → Browser caches for 60s, CDN caches for 1 hour.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Caching types (browser, proxies, reverse-proxies)"](https://symfonycasts.com/search?q=caching%2Btypes%2B%28browser%2C%2Bproxies%2C%2Breverse-proxies%29)
