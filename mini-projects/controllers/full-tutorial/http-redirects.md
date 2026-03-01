## HTTP redirects - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
// Redirect to a named route
#[Route('/redirect-to-route', name: 'ctrl_redirect_route')]
public function redirectToRouteDemo(): Response
{
    return $this->redirectToRoute('ctrl_abstract_methods', [], Response::HTTP_SEE_OTHER);
}

// Redirect to an external URL
#[Route('/redirect-external', name: 'ctrl_redirect_external')]
public function redirectExternal(): Response
{
    return $this->redirect('https://symfony.com');
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP redirects"](https://symfonycasts.com/search?q=http%2Bredirects)
