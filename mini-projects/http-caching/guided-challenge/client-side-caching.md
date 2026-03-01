## Client side caching - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What does `no-cache` vs `no-store` vs `must-revalidate` mean?

<details><summary>Click to reveal Solution</summary>

- **`no-cache`**: Response CAN be cached, but MUST be revalidated with the server before each use (conditional request).
- **`no-store`**: Response must NOT be cached at all. Not stored anywhere (browser, proxy, CDN).
- **`must-revalidate`**: Once the cached response expires (max-age), it MUST be revalidated before reuse. Cannot serve stale content.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Client side caching"](https://symfonycasts.com/search?q=client%2Bside%2Bcaching)
