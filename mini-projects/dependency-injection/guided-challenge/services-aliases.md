## Services aliases - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What happens if you type-hint `FormatterInterface` without an alias?

<details><summary>Click to reveal Solution</summary>

Autowiring fails with an error: "Cannot autowire argument... it references interface FormatterInterface but no such service exists. You should maybe alias this interface to the existing App\Service\DiTopic\JsonFormatter service."

You must create an alias to tell Symfony which implementation to use.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Services aliases"](https://symfonycasts.com/search?q=services%2Baliases)
