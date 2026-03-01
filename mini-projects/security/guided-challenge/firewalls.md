## Firewalls - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What does `stateless: true` mean? When would you use it?

<details><summary>Click to reveal Solution</summary>

- `stateless: true`: No PHP session is created. The user must authenticate on EVERY request (via token, API key, etc.).
- Use for: REST APIs, microservices, JWT-based auth.
- Without it: Symfony creates a session cookie after login and uses it for subsequent requests.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Firewalls"](https://symfonycasts.com/search?q=firewalls)
