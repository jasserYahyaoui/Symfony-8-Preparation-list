## Template assets management - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
composer require asset
```

In any template:
```twig
<link rel="stylesheet" href="{{ asset('styles/app.css') }}">
<img src="{{ asset('images/logo.png') }}">
<script src="{{ asset('js/app.js') }}"></script>
```

The `asset()` function prepends the base path and handles versioning if configured.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Template assets management"](https://symfonycasts.com/search?q=template%2Bassets%2Bmanagement)
