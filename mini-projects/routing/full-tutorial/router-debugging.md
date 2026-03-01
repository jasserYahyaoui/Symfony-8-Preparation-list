## Router debugging - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Run these commands:

```bash
# List all routes
php bin/console debug:router

# Show details of a specific route
php bin/console debug:router routing_product_show

# Test which route matches a given URL
php bin/console router:match /routing/products/42

# Test with a specific method
php bin/console router:match /routing/resource --method=POST
```

**Step 4:** Observe the output and understand:
- Route name, path, methods, requirements, defaults, condition, controller.
- Which route is matched for a given URL + method combination.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Router debugging"](https://symfonycasts.com/search?q=router%2Bdebugging)
