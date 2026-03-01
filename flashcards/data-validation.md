# Flashcards : Data Validation (Symfony 8.0)
> Exhaustive deck — includes new sub-topic: Validation messages. All official exam sub-topics covered.

---

### Validator component

**Q: What is the Symfony Validator component and how is it related to form validation?**
**A:** The Validator component validates PHP objects using constraints. Forms use it internally when calling `handleRequest()` — after binding data, `$form->isValid()` triggers validation via the Validator.
**Code Snippet:**
```php
use Symfony\Component\Validator\Validator\ValidatorInterface;

$errors = $validator->validate($product);
foreach ($errors as $violation) {
    echo $violation->getPropertyPath().': '.$violation->getMessage();
}
```

---

**Q: What does `ValidatorInterface::validate()` return?**
**A:** A `ConstraintViolationListInterface` — a collection of violations. Empty collection means valid. Contains zero or more `ConstraintViolation` objects.
**Code Snippet:**
```php
$violations = $validator->validate($object);
if (count($violations) === 0) {
    // All valid
}
```

---

### PHP object validation

**Q: Where can you place constraints in a PHP class for Symfony validation?**
**A:** On **class properties** (validate the property value), on **getters** (validate the returned value), or on the **class itself** (class-level constraints like `UniqueEntity`). All can use PHP Attributes.
**Code Snippet:**
```php
use Symfony\Component\Validator\Constraints as Assert;

class Product {
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 100)]
    public string $name = '';

    #[Assert\Positive]
    public int $price = 0;
}
```

---

**Q: How do you validate a plain array or scalar value outside of an object?**
**A:** Use `$validator->validate($value, new Constraint(...))` directly.
**Code Snippet:**
```php
$violations = $validator->validate('not-an-email', [new Assert\Email(), new Assert\NotBlank()]);
```

---

### Built-in validation constraints

**Q: What are the 10 most commonly used built-in constraints? Give the class name and what it validates.**
**A:**
1. `NotBlank` — not empty string/null
2. `NotNull` — not null
3. `Length(min, max)` — string length
4. `Range(min, max)` — numeric value
5. `Email` — valid email format
6. `Url` — valid URL
7. `Regex(pattern)` — regex match
8. `Choice(choices, multiple)` — value in list
9. `Positive` / `PositiveOrZero` — positive number
10. `Type(type)` — PHP type check
**Code Snippet:**
```php
#[Assert\Email(message: 'Invalid email')]
#[Assert\Length(min: 8, minMessage: 'At least {{ limit }} chars')]
public string $email = '';
```

---

**Q: What does the `All` constraint do?**
**A:** Applies a set of constraints to **every element** of an array or `Traversable`. Used to validate collections.
**Code Snippet:**
```php
#[Assert\All([
    new Assert\NotBlank(),
    new Assert\Email(),
])]
public array $emails = [];
```

---

**Q: What does the `Valid` constraint do and when is it required?**
**A:** Cascades validation to nested objects. Without `#[Assert\Valid]` on a property, the nested object's own constraints are **not** validated when the parent is validated.
**Code Snippet:**
```php
class Order {
    #[Assert\Valid]
    public Address $shippingAddress;
}
```

---

**Q: What is the `Callback` constraint and what does it allow?**
**A:** Allows custom validation logic via a PHP callback (method or closure). The callback receives the value and an `ExecutionContextInterface` to add violations.
**Code Snippet:**
```php
#[Assert\Callback]
public function validatePassword(ExecutionContextInterface $context): void {
    if (!preg_match('/[A-Z]/', $this->password)) {
        $context->buildViolation('Password must contain an uppercase letter')
            ->atPath('password')
            ->addViolation();
    }
}
```

---

### Validation scopes

**Q: What is "constraint target" in Symfony validation?**
**A:** Each constraint targets either a **class property** (`PROPERTY_CONSTRAINT`), a **getter method** (`PROPERTY_CONSTRAINT`), or the **whole class** (`CLASS_CONSTRAINT`). Class-level constraints receive the entire object for cross-field validation.
**Code Snippet:**
```php
// Property target (most common):
#[Assert\NotBlank] public string $name;

// Class target (for cross-field logic):
#[Assert\Expression(
    "this.getStartDate() < this.getEndDate()",
    message: 'Start date must be before end date'
)]
class DateRange { ... }
```

---

**Q: How do you apply a constraint to a getter instead of a property?**
**A:** Place the attribute on the getter method. Symfony calls the getter and validates its return value.
**Code Snippet:**
```php
class User {
    #[Assert\IsTrue(message: 'Terms must be accepted')]
    public function isTermsAccepted(): bool {
        return $this->termsAccepted;
    }
}
```

---

### Validation groups

**Q: What are validation groups and why are they useful?**
**A:** Groups allow applying only a subset of constraints. By default, constraints belong to the `Default` group. You can create custom groups and pass them to `validate()` or configure them on a form.
**Code Snippet:**
```php
#[Assert\NotBlank(groups: ['Default', 'registration'])]
#[Assert\Email(groups: ['Default'])]
public string $email;

// Validate only 'registration' group:
$errors = $validator->validate($user, null, ['registration']);
```

---

**Q: What is the difference between the `Default` group and a named custom group?**
**A:** The `Default` group includes all constraints not explicitly assigned to a group. Named groups only contain constraints explicitly assigned to them. When you validate with `['Default']`, you get constraints assigned to `Default` + those with no group.
**Code Snippet:** N/A

---

**Q: How do you configure a Symfony form to use a specific validation group?**
**A:** Set the `validation_groups` option in the form type's `configureOptions()`.
**Code Snippet:**
```php
public function configureOptions(OptionsResolver $resolver): void {
    $resolver->setDefaults([
        'data_class' => User::class,
        'validation_groups' => ['Default', 'registration'],
    ]);
}
```

---

**Q: What is a `GroupSequence` and what problem does it solve?**
**A:** A `GroupSequence` defines groups to validate **sequentially**, stopping on the first group that has violations. Prevents wasting time validating later, dependent constraints if earlier ones already failed.
**Code Snippet:**
```php
use Symfony\Component\Validator\Constraints\GroupSequence;

#[Assert\GroupSequence(['User', 'Strict'])]
class User {
    #[Assert\NotBlank(groups: ['User'])]
    public string $username;

    #[Assert\Length(min: 8, groups: ['Strict'])]
    public string $password;
}
```

---

### Group sequence

**Q: How do you dynamically determine validation groups at runtime (e.g., based on the object state)?**
**A:** Implement `GroupSequenceProviderInterface` and the `getGroupSequence()` method on the class. Annotate the class with `#[Assert\GroupSequence(...)]` pointing to `'_group_sequence_provider_'`, or use the interface.
**Code Snippet:**
```php
use Symfony\Component\Validator\GroupSequenceProviderInterface;

class User implements GroupSequenceProviderInterface {
    public function getGroupSequence(): array|GroupSequence {
        return $this->isLegacyUser ? ['Legacy'] : ['User', 'Strict'];
    }
}
```

---

### Validation messages

**Q: How do you customize the error message of a built-in constraint?**
**A:** Pass a `message:` (or constraint-specific message parameter like `minMessage`, `maxMessage`) in the constraint's constructor or attribute arguments.
**Code Snippet:**
```php
#[Assert\Length(
    min: 8,
    minMessage: 'Your password must be at least {{ limit }} characters long.',
    max: 4096,
    maxMessage: 'Your password cannot be longer than {{ limit }} characters.'
)]
public string $password;
```

---

**Q: What placeholder syntax does Symfony use in constraint messages and what variables are available?**
**A:** Double curly braces: `{{ variable }}`. Common placeholders: `{{ value }}` (the invalid value), `{{ limit }}` (for Length/Range constraints), `{{ type }}` (for Type constraint).
**Code Snippet:**
```php
#[Assert\Range(
    min: 0,
    max: 100,
    notInRangeMessage: 'The value {{ value }} must be between {{ min }} and {{ max }}.',
)]
public int $score;
```

---

**Q: How are validation constraint messages translated in Symfony?**
**A:** Constraint messages are translated using the `validators` translation domain. Create translation files at `translations/validators.[locale].yaml` with constraint message strings as keys.
**Code Snippet:**
```yaml
# translations/validators.fr.yaml
'This value should not be blank.': 'Cette valeur ne doit pas être vide.'
```

---

### Custom callback validators

**Q: What is the signature of a `Callback` constraint static method validator?**
**A:** The method must be `static`, receive the object and an `ExecutionContextInterface`, and call `buildViolation()` if the assertion fails.
**Code Snippet:**
```php
use Symfony\Component\Validator\Context\ExecutionContextInterface;

#[Assert\Callback]
public static function validateCoupon(
    mixed $value,
    ExecutionContextInterface $context
): void {
    if (!preg_match('/^PROMO-/', $value)) {
        $context->buildViolation('Invalid coupon format.')
            ->addViolation();
    }
}
```

---

### Violations builder

**Q: How do you create a fully custom Validator Constraint with its own logic class?**
**A:** Create two classes: a **Constraint** class (the annotation/attribute) extending `Constraint`, and a **ConstraintValidator** class extending `ConstraintValidator` with a `validate()` method.
**Code Snippet:**
```php
// Constraint:
#[Attribute]
class ContainsAlphanumeric extends Constraint {
    public string $message = 'The string "{{ string }}" contains an illegal character: it can only contain letters or numbers.';
}

// Validator:
class ContainsAlphanumericValidator extends ConstraintValidator {
    public function validate(mixed $value, Constraint $constraint): void {
        if (!preg_match('/^[a-zA-Z0-9]+$/', $value)) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ string }}', $value)
                ->addViolation();
        }
    }
}
```

---

**Q: What is `setParameter()` on the violation builder used for?**
**A:** It adds a named placeholder value to the violation message, which can be interpolated or translated. These parameters use the `{{ name }}` syntax.
**Code Snippet:**
```php
$this->context->buildViolation($constraint->message)
    ->setParameter('{{ value }}', $value)
    ->setParameter('{{ limit }}', 100)
    ->atPath('amount')
    ->addViolation();
```

---

**Q: What does `atPath()` do on the violation builder?**
**A:** Sets the property path of the violation. Without this, violations appear on the object root. Use it to associate the error with a specific property in nested validation scenarios.
**Code Snippet:**
```php
$context->buildViolation('Invalid nested field.')
    ->atPath('address.city')
    ->addViolation();
```

---
