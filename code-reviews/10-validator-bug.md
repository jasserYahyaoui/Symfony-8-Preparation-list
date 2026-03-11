# Code Review #10: Custom Constraint Validator

## The Code

```php
namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class ContainsAlphanumericValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (null === $value || '' === $value) {
            return;
        }

        if (!preg_match('/^[a-zA-Z0-9]+$/', $value, $matches)) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ string }}', $value)
                ->addViolation();
        }
    }
}
```

**Question:** What is the missing validation step in this custom constraint validator?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** It doesn't check if the constraint is of the correct type: `if (!$constraint instanceof ContainsAlphanumeric) { throw new UnexpectedTypeException($constraint, ContainsAlphanumeric::class); }`.

</details>
