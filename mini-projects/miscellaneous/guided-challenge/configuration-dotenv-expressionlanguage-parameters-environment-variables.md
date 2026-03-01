## Configuration (DotEnv, ExpressionLanguage, parameters, environment variables) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the load order of `.env` files? Which takes precedence?

<details><summary>Click to reveal Solution</summary>

Load order (later overrides earlier):
1. `.env` — base defaults
2. `.env.local` — local overrides (ignored in `test` env)
3. `.env.{env}` — environment-specific (e.g., `.env.prod`)
4. `.env.{env}.local` — environment-specific local
5. Real environment variables — ALWAYS win

Precedence: Real env vars > `.env.{env}.local` > `.env.{env}` > `.env.local` > `.env`

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Configuration (DotEnv, ExpressionLanguage, parameters, environment variables)"](https://symfonycasts.com/search?q=configuration%2B%28dotenv%2C%2Bexpressionlanguage%2C%2Bparameters%2C%2Benvironment%2Bvariables%29)
