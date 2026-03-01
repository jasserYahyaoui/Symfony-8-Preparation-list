## Error handling and debugging - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\HttpKernel\Exception\HttpException;

#[Route('/error-demo/{type}', name: 'misc_error_demo')]
public function errorDemo(string $type): JsonResponse
{
    return match ($type) {
        '404' => throw $this->createNotFoundException('Page not found!'),
        '403' => throw $this->createAccessDeniedException('Access denied!'),
        '500' => throw new \RuntimeException('Internal server error!'),
        'custom' => throw new HttpException(418, "I'm a teapot!"),
        default => $this->json(['type' => $type, 'status' => 'ok']),
    };
}
```

**Debug tools:**
```bash
# Dump server (captures dump() output in terminal)
php bin/console server:dump

# In code: dump() and dd() (dump and die)
dump($variable);  # Outputs to profiler or dump server
dd($variable);    # Dumps and stops execution

# Debug commands
php bin/console debug:container
php bin/console debug:router
php bin/console debug:config framework
php bin/console debug:event-dispatcher
php bin/console debug:autowiring
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Error handling and debugging"](https://symfonycasts.com/search?q=error%2Bhandling%2Band%2Bdebugging)
