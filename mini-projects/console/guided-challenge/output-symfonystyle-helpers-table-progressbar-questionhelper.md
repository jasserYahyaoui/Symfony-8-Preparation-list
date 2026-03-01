## Output (SymfonyStyle, helpers: Table, ProgressBar, QuestionHelper) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a command that displays a table of all topics, their difficulty, and estimated hours. Use `SymfonyStyle::createTable()`.

<details><summary>Click to reveal Solution</summary>

```php
$io->table(
    ['Topic', 'Tier', 'Hours'],
    [
        ['PHP', 'Foundations', '4'],
        ['HTTP', 'Foundations', '3'],
        ['Routing', 'Core', '4'],
        // ... etc
    ]
);
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Output (SymfonyStyle, helpers: Table, ProgressBar, QuestionHelper)"](https://symfonycasts.com/search?q=output%2B%28symfonystyle%2C%2Bhelpers%3A%2Btable%2C%2Bprogressbar%2C%2Bquestionhelper%29)
