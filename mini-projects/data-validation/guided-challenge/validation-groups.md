## Validation groups - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Why would you use a `Default` group alongside custom groups?

<details><summary>Click to reveal Solution</summary>

- **`Default` group**: All constraints without an explicit `groups` key belong to the `Default` group.
- You can combine: `$validator->validate($data, null, ['Default', 'registration'])` to run both Default constraints AND registration-specific ones.
- Group `Default` and group named after the class (e.g., `UserData`) are interchangeable.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Validation groups"](https://symfonycasts.com/search?q=validation%2Bgroups)
