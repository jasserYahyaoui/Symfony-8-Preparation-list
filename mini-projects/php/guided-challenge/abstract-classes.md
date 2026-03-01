## Abstract classes - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `YamlHandler` that extends `AbstractDataHandler`. Override `validate()` to also remove empty strings.

**Hints:**
- `format()`: use `symfony/yaml` component's `Yaml::dump($data)` or basic `key: value` implode.
- Override `validate()`: call `parent::validate($data)` then additionally filter empty strings.

**Testing:** Add to the controller, hit `/php/abstract-demo`, verify blanks and nulls are removed.

<details><summary>Click to reveal Solution</summary>

```php
<?php

namespace App\Service\PhpTopic\Handler;

class YamlHandler extends AbstractDataHandler
{
    protected function format(array $data): string
    {
        $lines = [];
        foreach ($data as $i => $v) {
            $lines[] = "- {$v}";
        }
        return implode("\n", $lines);
    }

    public function getFormat(): string
    {
        return 'yaml';
    }

    protected function validate(array $data): array
    {
        $data = parent::validate($data);
        return array_filter($data, fn(mixed $item) => $item !== '');
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Abstract classes"](https://symfonycasts.com/search?q=abstract%2Bclasses)
