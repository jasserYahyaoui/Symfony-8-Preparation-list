## Authentication - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What are the 3 main components of Symfony's authentication system?

<details><summary>Click to reveal Solution</summary>

1. **User Provider**: Loads user data (from memory, database, LDAP, etc.). Implements `UserProviderInterface`.
2. **Firewall**: Defines which parts of the app are protected and which authenticator to use.
3. **Authenticator**: Handles the actual authentication logic (login form, API token, OAuth). Implements `AuthenticatorInterface`.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Authentication"](https://symfonycasts.com/search?q=authentication)
