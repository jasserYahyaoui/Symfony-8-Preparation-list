## Request handling - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** From memory, list the 8 kernel events in the correct order that they fire during a normal (non-exception) request.

**Hints:**
- Starts with `kernel.request`, ends with `kernel.terminate`.
- There's one that fires AFTER the response is sent.
- Don't confuse `kernel.controller` and `kernel.controller_arguments`.

**Testing:** Check against `php bin/console debug:event-dispatcher kernel.request`.

<details><summary>Click to reveal Solution</summary>

1. `kernel.request`
2. `kernel.controller`
3. `kernel.controller_arguments`
4. `kernel.view` (only if controller returns non-Response)
5. `kernel.response`
6. `kernel.finish_request`
7. `kernel.terminate`

On exception: `kernel.exception` fires instead.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Request handling"](https://symfonycasts.com/search?q=request%2Bhandling)
