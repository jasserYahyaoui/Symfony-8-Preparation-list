## Forms handling - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the PRG pattern and why is it critical for form handling?

<details><summary>Click to reveal Solution</summary>

**PRG = Post/Redirect/Get**:
1. User **POSTs** the form.
2. Server processes the data and **Redirects** (302/303) to a GET route.
3. Browser performs a **GET** request on the new URL.

**Why critical**: Without PRG, if the user refreshes the page after submitting, the browser would re-POST the form data, potentially creating duplicate entries. The redirect breaks the POST cycle.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Forms handling"](https://symfonycasts.com/search?q=forms%2Bhandling)
