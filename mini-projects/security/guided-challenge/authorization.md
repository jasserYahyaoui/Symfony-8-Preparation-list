## Authorization - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `access_control` in YAML and `#[IsGranted]`?

<details><summary>Click to reveal Solution</summary>

- **`access_control`**: URL-pattern based. Checked BEFORE the controller. Uses regex on the path. Defined in `security.yaml`.
- **`#[IsGranted]`**: Controller/method level. Checked at controller resolution time. More granular. Can check custom attributes via voters.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Authorization"](https://symfonycasts.com/search?q=authorization)
