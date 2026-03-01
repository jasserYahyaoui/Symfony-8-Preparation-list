## Finder component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\Finder\Finder;

#[Route('/finder-demo', name: 'misc_finder')]
public function finderDemo(): JsonResponse
{
    $finder = new Finder();
    $finder->files()
        ->in($this->getParameter('kernel.project_dir') . '/src')
        ->name('*.php')
        ->depth('< 3')
        ->sortByName();

    $files = [];
    foreach ($finder as $file) {
        $files[] = $file->getRelativePathname();
    }

    return $this->json([
        'total_php_files' => count($files),
        'first_10' => array_slice($files, 0, 10),
    ]);
}
```

**Key methods:** `files()`, `directories()`, `in()`, `name()`, `notName()`, `depth()`, `size()`, `date()`, `contains()`, `notContains()`, `sortByName()`, `sortByModifiedTime()`.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Finder component"](https://symfonycasts.com/search?q=finder%2Bcomponent)
