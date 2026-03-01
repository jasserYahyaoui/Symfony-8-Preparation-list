## Data transformers - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/DataTransformer/TagsTransformer.php
```

```php
<?php

namespace App\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

/**
 * Transforms between a comma-separated string (form) and an array (model).
 * @implements DataTransformerInterface<string[], string>
 */
class TagsTransformer implements DataTransformerInterface
{
    // Model → View (array → comma-separated string)
    public function transform(mixed $value): string
    {
        if (null === $value) {
            return '';
        }
        return implode(', ', $value);
    }

    // View → Model (comma-separated string → array)
    public function reverseTransform(mixed $value): array
    {
        if (!$value) {
            return [];
        }

        return array_map('trim', explode(',', $value));
    }
}
```

Usage in a form type:
```php
$builder->add('tags', TextType::class);
$builder->get('tags')->addModelTransformer(new TagsTransformer());
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Data transformers"](https://symfonycasts.com/search?q=data%2Btransformers)
