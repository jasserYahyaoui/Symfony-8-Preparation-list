## Filesystem component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\Filesystem\Filesystem;

#[Route('/filesystem-demo', name: 'misc_filesystem')]
public function filesystemDemo(): JsonResponse
{
    $fs = new Filesystem();
    $tmpDir = sys_get_temp_dir() . '/symfony-sandbox-test';

    $fs->mkdir($tmpDir);
    $fs->dumpFile($tmpDir . '/test.txt', 'Hello from Filesystem!');
    $exists = $fs->exists($tmpDir . '/test.txt');
    $fs->copy($tmpDir . '/test.txt', $tmpDir . '/test_copy.txt');
    $fs->remove($tmpDir);

    return $this->json([
        'created_dir' => true,
        'file_existed' => $exists,
        'cleaned_up' => !$fs->exists($tmpDir),
    ]);
}
```

**Key methods:** `mkdir()`, `touch()`, `copy()`, `rename()`, `remove()`, `exists()`, `dumpFile()`, `appendToFile()`, `chmod()`, `chown()`, `mirror()` (copy directory recursively).


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Filesystem component"](https://symfonycasts.com/search?q=filesystem%2Bcomponent)
