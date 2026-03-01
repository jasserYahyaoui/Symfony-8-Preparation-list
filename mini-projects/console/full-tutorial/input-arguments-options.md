## Input (arguments, options) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
protected function configure(): void
{
    $this
        // Arguments (positional, after the command name)
        ->addArgument('username', InputArgument::REQUIRED, 'The username')
        ->addArgument('role', InputArgument::OPTIONAL, 'User role', 'user')  // default
        ->addArgument('extras', InputArgument::IS_ARRAY, 'Extra values')

        // Options (named, prefixed with --)
        ->addOption('dry-run', 'd', InputOption::VALUE_NONE, 'Simulate only')       // --dry-run (bool)
        ->addOption('format', 'f', InputOption::VALUE_REQUIRED, 'Output format')     // --format=json
        ->addOption('env', null, InputOption::VALUE_OPTIONAL, 'Environment', 'dev')  // --env or --env=prod
        ->addOption('tags', null, InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY, 'Tags'); // --tags=a --tags=b
}
```

**Key differences:**
- Arguments: positional, ordered, limited.
- Options: named, unordered, can have defaults.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Input (arguments, options)"](https://symfonycasts.com/search?q=input%2B%28arguments%2C%2Boptions%29)
