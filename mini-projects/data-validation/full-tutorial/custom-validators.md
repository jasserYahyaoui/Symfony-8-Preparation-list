## Custom validators - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
mkdir -p src/Validator
touch src/Validator/NoProfanity.php
touch src/Validator/NoProfanityValidator.php
```

`src/Validator/NoProfanity.php`:
```php
<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD)]
class NoProfanity extends Constraint
{
    public string $message = 'The text "{{ value }}" contains inappropriate language.';

    /** @var string[] */
    public array $blockedWords = ['spam', 'scam', 'hack'];
}
```

`src/Validator/NoProfanityValidator.php`:
```php
<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class NoProfanityValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof NoProfanity) {
            throw new UnexpectedTypeException($constraint, NoProfanity::class);
        }

        if (null === $value || '' === $value) {
            return; // Let NotBlank handle empty values
        }

        if (!is_string($value)) {
            throw new UnexpectedValueException($value, 'string');
        }

        $lower = strtolower($value);
        foreach ($constraint->blockedWords as $word) {
            if (str_contains($lower, $word)) {
                $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ value }}', $value)
                    ->addViolation();
                return;
            }
        }
    }
}
```

Usage:
```php
#[App\Validator\NoProfanity]
public string $comment = '';
```

**Step 4:** Test by submitting a comment containing "spam".


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Custom validators"](https://symfonycasts.com/search?q=custom%2Bvalidators)
