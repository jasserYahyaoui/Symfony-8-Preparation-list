## HTTP redirects - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between 301, 302, 303, and 307 redirects?

<details><summary>Click to reveal Solution</summary>

- **301 Moved Permanently**: Resource permanently moved. Browsers cache this. Method may change to GET.
- **302 Found**: Temporary redirect. Method may change to GET.
- **303 See Other**: Always use GET for the redirect. Used after POST (PRG pattern).
- **307 Temporary Redirect**: Like 302 but preserves the HTTP method (POST stays POST).

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP redirects"](https://symfonycasts.com/search?q=http%2Bredirects)
