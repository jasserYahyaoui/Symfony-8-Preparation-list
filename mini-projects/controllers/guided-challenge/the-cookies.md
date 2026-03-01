## The cookies - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Set a `theme` cookie (`dark`/`light`) and read it on the next request to customize the response.

<details><summary>Click to reveal Solution</summary>

```php
use Symfony\Component\HttpFoundation\Cookie;

#[Route('/set-theme/{theme}', name: 'ctrl_set_theme', requirements: ['theme' => 'dark|light'])]
public function setTheme(string $theme): Response
{
    $response = $this->json(['theme_set' => $theme]);
    $response->headers->setCookie(Cookie::create('theme')->withValue($theme)->withExpires('+30 days'));
    return $response;
}

#[Route('/get-theme', name: 'ctrl_get_theme')]
public function getTheme(Request $request): JsonResponse
{
    return $this->json(['current_theme' => $request->cookies->get('theme', 'light')]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The cookies"](https://symfonycasts.com/search?q=the%2Bcookies)
