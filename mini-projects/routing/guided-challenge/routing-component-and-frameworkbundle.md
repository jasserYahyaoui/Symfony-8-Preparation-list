## Routing component and FrameworkBundle - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Inject `RouterInterface` and list all routes whose name starts with `routing_`, showing their path and methods.

**Hints:**
- `$router->getRouteCollection()->all()` returns all routes.
- Each `Route` object has `->getPath()` and `->getMethods()`.

**Testing:** The response should list all routes you've created in this file.

<details><summary>Click to reveal Solution</summary>

```php
$routes = $router->getRouteCollection()->all();
$filtered = [];
foreach ($routes as $name => $route) {
    if (str_starts_with($name, 'routing_')) {
        $filtered[$name] = [
            'path' => $route->getPath(),
            'methods' => $route->getMethods(),
        ];
    }
}
return $this->json($filtered);
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Routing component and FrameworkBundle"](https://symfonycasts.com/search?q=routing%2Bcomponent%2Band%2Bframeworkbundle)
