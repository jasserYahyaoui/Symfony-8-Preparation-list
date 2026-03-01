## Clock component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Why should you inject `ClockInterface` instead of using `new \DateTimeImmutable()`?

<details><summary>Click to reveal Solution</summary>

- `new \DateTimeImmutable()`: Returns the REAL current time. Cannot be mocked or controlled in tests.
- `ClockInterface::now()`: Returns a testable time. In tests, use `MockClock` to freeze time, advance time, or set specific dates. This makes time-dependent logic (cron, expiry, scheduling) fully testable.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Clock component"](https://symfonycasts.com/search?q=clock%2Bcomponent)
