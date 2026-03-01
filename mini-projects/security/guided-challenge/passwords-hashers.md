## Passwords hashers - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Why does Symfony use `auto` as the default algorithm?

<details><summary>Click to reveal Solution</summary>

`auto` selects the best available algorithm:
- **Sodium (Argon2id)** if the sodium extension is installed (recommended).
- **Bcrypt** as fallback.

Benefits: Future-proof — as better algorithms are added, `auto` will use them. No code changes needed.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Passwords hashers"](https://symfonycasts.com/search?q=passwords%2Bhashers)
