## The flash messages - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the critical difference between `$flashBag->peek('success')` and `$flashBag->get('success')`?

<details><summary>Click to reveal Solution</summary>

- `get('success')`: Returns the messages AND removes them from the bag (consume).
- `peek('success')`: Returns the messages WITHOUT removing them (read-only).
- `all()`: Returns ALL flash messages and removes them.
- `peekAll()`: Returns ALL flash messages without removing them.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The flash messages"](https://symfonycasts.com/search?q=the%2Bflash%2Bmessages)
