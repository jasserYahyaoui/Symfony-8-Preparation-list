## Trigger redirects - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Add redirect routes to `config/routes.yaml`:

```yaml
routing_redirect_legacy:
    path: /old-products
    controller: Symfony\Bundle\FrameworkBundle\Controller\RedirectController
    defaults:
        route: routing_listing
        permanent: true  # 301

routing_redirect_external:
    path: /go-to-symfony
    controller: Symfony\Bundle\FrameworkBundle\Controller\RedirectController
    defaults:
        path: https://symfony.com
        permanent: false  # 302
```

**Step 4:** Test:

```bash
curl -i https://127.0.0.1:8000/old-products        # 301 → /routing/listing
curl -i https://127.0.0.1:8000/go-to-symfony        # 302 → https://symfony.com
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Trigger redirects"](https://symfonycasts.com/search?q=trigger%2Bredirects)
