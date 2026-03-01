## Process component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\Process\Process;

#[Route('/process-demo', name: 'misc_process')]
public function processDemo(): JsonResponse
{
    $process = new Process(['php', '-v']);
    $process->run();

    return $this->json([
        'exit_code' => $process->getExitCode(), // 0 = success
        'output' => trim($process->getOutput()),
        'is_successful' => $process->isSuccessful(),
    ]);
}
```

**Key methods:** `run()`, `start()` (async), `mustRun()` (throws on failure), `setTimeout()`, `getOutput()`, `getErrorOutput()`.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Process component"](https://symfonycasts.com/search?q=process%2Bcomponent)
