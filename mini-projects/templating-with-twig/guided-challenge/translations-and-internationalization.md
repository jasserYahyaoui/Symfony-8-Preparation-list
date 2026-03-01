## Translations and internationalization - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Add a `de` translation for the same keys and switch between locales using the `{_locale}` route parameter.

<details><summary>Click to reveal Solution</summary>

`translations/messages.de.yaml`:
```yaml
welcome: Willkommen
greeting: "Hallo, %name%!"
items_count: "{0}Keine Elemente|{1}Ein Element|]1,Inf[%count% Elemente"
```

Controller: use `$request->setLocale($_locale)` before rendering.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Translations and internationalization"](https://symfonycasts.com/search?q=translations%2Band%2Binternationalization)
