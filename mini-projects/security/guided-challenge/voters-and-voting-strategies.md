## Voters and voting strategies - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What are the 3 voting strategies and when is each used?

<details><summary>Click to reveal Solution</summary>

1. **`affirmative`** (default): Grants access if ANY voter votes `ACCESS_GRANTED`. One "yes" wins.
2. **`consensus`**: Grants access if MORE voters vote `ACCESS_GRANTED` than `ACCESS_DENIED`. Majority wins.
3. **`unanimous`**: Grants access only if ALL voters vote `ACCESS_GRANTED` (or abstain). One "no" blocks.

Configured in `security.yaml`:
```yaml
security:
    access_decision_manager:
        strategy: affirmative
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Voters and voting strategies"](https://symfonycasts.com/search?q=voters%2Band%2Bvoting%2Bstrategies)
