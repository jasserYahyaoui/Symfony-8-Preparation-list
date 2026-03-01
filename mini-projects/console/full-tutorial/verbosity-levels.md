## Verbosity levels - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
protected function execute(InputInterface $input, OutputInterface $output): int
{
    $io = new SymfonyStyle($input, $output);

    $io->text('Always shown (NORMAL)');

    if ($output->isVerbose()) {  // -v
        $io->text('Verbose info (-v): Processing started...');
    }

    if ($output->isVeryVerbose()) {  // -vv
        $io->text('Very verbose (-vv): 42 records found in table X.');
    }

    if ($output->isDebug()) {  // -vvv
        $io->text('Debug (-vvv): SQL: SELECT * FROM users WHERE ...');
    }

    return Command::SUCCESS;
}
```

| Flag | Level | Constant | Method |
|------|-------|----------|--------|
| (none) | Normal | `VERBOSITY_NORMAL` | — |
| `-v` | Verbose | `VERBOSITY_VERBOSE` | `isVerbose()` |
| `-vv` | Very Verbose | `VERBOSITY_VERY_VERBOSE` | `isVeryVerbose()` |
| `-vvv` | Debug | `VERBOSITY_DEBUG` | `isDebug()` |
| `-q` | Quiet | `VERBOSITY_QUIET` | `isQuiet()` |


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Verbosity levels"](https://symfonycasts.com/search?q=verbosity%2Blevels)
