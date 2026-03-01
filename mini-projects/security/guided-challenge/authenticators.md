## Authenticators - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `UserBadge`, `PasswordCredentials`, and `SelfValidatingPassport`?

<details><summary>Click to reveal Solution</summary>

- **`UserBadge`**: Identifies the user (email, username). The badge's loader function fetches the user from the provider.
- **`PasswordCredentials`**: Contains the plain password to validate against the stored hash.
- **`SelfValidatingPassport`**: Used when the authenticator handles its own credential validation (e.g., API tokens, OAuth). No `Credentials` object needed.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Authenticators"](https://symfonycasts.com/search?q=authenticators)
