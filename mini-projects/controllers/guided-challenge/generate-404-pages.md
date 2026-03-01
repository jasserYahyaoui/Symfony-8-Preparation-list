## Generate 404 pages - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What class does `createNotFoundException()` actually throw? What is its parent?

<details><summary>Click to reveal Solution</summary>

It throws `Symfony\Component\HttpKernel\Exception\NotFoundHttpException`, which extends `HttpException`, which extends `\RuntimeException`. The `HttpException` class maps to HTTP status codes — `NotFoundHttpException` maps to 404.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Generate 404 pages"](https://symfonycasts.com/search?q=generate%2B404%2Bpages)
