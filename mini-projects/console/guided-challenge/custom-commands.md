## Custom commands - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create an `app:generate-password` command that accepts a `--length` option (default 16) and generates a random password.

**Hints:**
- Use `random_bytes()` or `bin2hex(random_bytes($length / 2))`.
- `InputOption::VALUE_REQUIRED` with default `'16'`.

<details><summary>Click to reveal Solution</summary>

```php
#[AsCommand(name: 'app:generate-password', description: 'Generate a random password')]
class GeneratePasswordCommand extends Command
{
    protected function configure(): void
    {
        $this->addOption('length', 'l', InputOption::VALUE_REQUIRED, 'Password length', '16');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $length = (int) $input->getOption('length');
        $io = new SymfonyStyle($input, $output);
        $io->success('Password: ' . bin2hex(random_bytes($length / 2)));
        return Command::SUCCESS;
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Custom commands"](https://symfonycasts.com/search?q=custom%2Bcommands)
