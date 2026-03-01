## ExpressionLanguage component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Where in Symfony is ExpressionLanguage used?

<details><summary>Click to reveal Solution</summary>

1. **Routing**: `condition` parameter for conditional route matching.
2. **Security**: `access_control` rules with `allow_if` expressions.
3. **Validation**: `#[Assert\Expression]` constraint for cross-field validation.
4. **Workflow**: Guard expressions for transition conditions.
5. **Service container**: `@=service()` expressions in DI config.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "ExpressionLanguage component"](https://symfonycasts.com/search?q=expressionlanguage%2Bcomponent)
