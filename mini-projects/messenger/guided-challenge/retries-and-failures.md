## Retries and failures - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is exponential backoff? With `delay=1000, multiplier=2, max_retries=3`, what are the retry delays?

<details><summary>Click to reveal Solution</summary>

- Retry 1: 1000ms (1s)
- Retry 2: 2000ms (2s) → `1000 * 2^1`
- Retry 3: 4000ms (4s) → `1000 * 2^2`

With `max_delay=30000`, the delay is capped at 30 seconds regardless of the multiplier.

After 3 retries, the message goes to the `failure_transport`.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Retries and failures"](https://symfonycasts.com/search?q=retries%2Band%2Bfailures)
