## Messages and handlers - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `GenerateReport` message with `reportType` and `userId` fields, and a handler that logs the generation.

<details><summary>Click to reveal Solution</summary>

```php
// Message
class GenerateReport
{
    public function __construct(
        public readonly string $reportType,
        public readonly int $userId,
    ) {}
}

// Handler
#[AsMessageHandler]
class GenerateReportHandler
{
    public function __invoke(GenerateReport $msg): void
    {
        // Generate report...
        logger()->info("Report '{$msg->reportType}' generated for user #{$msg->userId}");
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Messages and handlers"](https://symfonycasts.com/search?q=messages%2Band%2Bhandlers)
