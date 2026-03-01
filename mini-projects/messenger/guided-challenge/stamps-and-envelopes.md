## Stamps and envelopes - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between a `Stamp` and an `Envelope`?

<details><summary>Click to reveal Solution</summary>

- **Stamp**: A single piece of metadata (delay duration, transport name, handling result).
- **Envelope**: A wrapper around the Message + a collection of Stamps. Think of it as: `Envelope = Message + Stamp[]`.

When you call `$bus->dispatch($message, $stamps)`, Symfony wraps it in an Envelope internally.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Stamps and envelopes"](https://symfonycasts.com/search?q=stamps%2Band%2Benvelopes)
