## Language detection - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Extend the endpoint to set the Symfony locale on the `Request` object based on the detected language, and return the currently active locale.

**Hints:**
- `$request->setLocale($preferred)`.
- `$request->getLocale()` to retrieve it.
- Also set `$request->setDefaultLocale('en')`.

**Testing:** Different `Accept-Language` headers should change the `active_locale` field.

<details><summary>Click to reveal Solution</summary>

```php
$request->setDefaultLocale('en');
$request->setLocale($preferred);

return $this->json([
    'accept_language_header' => $request->headers->get('Accept-Language'),
    'detected_languages' => $languages,
    'preferred' => $preferred,
    'active_locale' => $request->getLocale(),
    'greeting' => $greetings[$preferred] ?? $greetings['en'],
]);
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Language detection"](https://symfonycasts.com/search?q=language%2Bdetection)
