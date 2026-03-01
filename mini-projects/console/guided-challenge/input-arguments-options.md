## Input (arguments, options) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What are the 4 `InputArgument` modes and 4 `InputOption` modes?

<details><summary>Click to reveal Solution</summary>

**InputArgument:**
- `REQUIRED`: Must be provided.
- `OPTIONAL`: Optional, can have a default.
- `IS_ARRAY`: Accepts multiple values (`arg1 arg2 arg3`).

**InputOption:**
- `VALUE_NONE`: Boolean flag (`--verbose`).
- `VALUE_REQUIRED`: Must have a value (`--format=json`).
- `VALUE_OPTIONAL`: Can be used with or without value (`--log` or `--log=file.txt`).
- `VALUE_IS_ARRAY`: Repeatable (`--tag=a --tag=b`).

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Input (arguments, options)"](https://symfonycasts.com/search?q=input%2B%28arguments%2C%2Boptions%29)
