# Quiz : Data Validation (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Validator component

**Question 1:** The Symfony Validator component validates data against:
**Type:** Single answer
- [ ] A) Database schemas
- [ ] B) Constraints (rules applied via attributes, YAML, XML, or PHP)
- [ ] C) Twig templates
- [ ] D) HTTP headers

**Correct Answer(s):** B
**Explanation:** The Validator checks objects/values against Constraint classes.

---

**Question 2:** The Validator component can be used as a standalone library.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** It's a standalone component, usable without the full Symfony framework.

---

### Constraints

**Question 3:** Which of these are built-in Symfony validation constraints? (Select all)
**Type:** Multiple choice
- [ ] A) `#[Assert\NotBlank]`
- [ ] B) `#[Assert\Email]`
- [ ] C) `#[Assert\Length]`
- [ ] D) `#[Assert\Range]`
- [ ] E) `#[Assert\Regex]`
- [ ] F) `#[Assert\Choice]`

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** All six are built-in constraints in the `Symfony\Component\Validator\Constraints` namespace.

---

**Question 4:** `#[Assert\NotBlank]` fails when the value is:
**Type:** Multiple choice
- [ ] A) `null`
- [ ] B) `''` (empty string)
- [ ] C) `false`
- [ ] D) `0`
- [ ] E) `[]` (empty array)

**Correct Answer(s):** A, B, C
**Explanation:** `NotBlank` considers `null`, `''`, and `false` as blank. `0` and non-empty values pass.

---

**Question 5:** The difference between `#[Assert\NotBlank]` and `#[Assert\NotNull]` is:
**Type:** Single answer
- [ ] A) They are identical
- [ ] B) `NotNull` only checks for `null`; `NotBlank` also rejects empty strings and `false`
- [ ] C) `NotBlank` only checks for `null`
- [ ] D) `NotNull` rejects empty strings

**Correct Answer(s):** B
**Explanation:** `NotNull` → fails only on `null`. `NotBlank` → fails on `null`, `''`, `false`, empty whitespace.

---

**Question 6:** `#[Assert\Length(min: 3, max: 50)]` validates:
**Type:** Single answer
- [ ] A) Array length
- [ ] B) String character length
- [ ] C) Integer value
- [ ] D) File size

**Correct Answer(s):** B
**Explanation:** `Length` checks string length (character count), not array size or numeric value.

---

**Question 7:** `#[Assert\Range(min: 1, max: 100)]` validates:
**Type:** Single answer
- [ ] A) String length
- [ ] B) A numeric value is within the specified range
- [ ] C) Array size
- [ ] D) Date range

**Correct Answer(s):** B
**Explanation:** `Range` checks that a numeric value (or date) falls within min/max bounds.

---

**Question 8:** `#[Assert\Regex(pattern: '/^\d{5}$/')]` validates:
**Type:** Single answer
- [ ] A) That the value contains any digits
- [ ] B) That the entire value matches exactly 5 digits
- [ ] C) That the value starts with a digit
- [ ] D) That the value is a string

**Correct Answer(s):** B
**Explanation:** `^` anchor + `\d{5}` + `$` anchor = exactly five digits.

---

**Question 9:** `#[Assert\Type(type: 'integer')]` checks:
**Type:** Single answer
- [ ] A) The database column type
- [ ] B) That the PHP variable type matches (using `is_integer()` internally)
- [ ] C) The form type
- [ ] D) The HTTP content type

**Correct Answer(s):** B
**Explanation:** `Type` constraint uses internal PHP type checking (`is_int`, `is_string`, `is_bool`, etc.).

---

**Question 10:** `#[Assert\Choice(choices: ['red', 'blue', 'green'])]` validates:
**Type:** Single answer
- [ ] A) That the value is one of the specified choices
- [ ] B) That the value is not in the choices
- [ ] C) That the value contains all choices
- [ ] D) Random selection

**Correct Answer(s):** A
**Explanation:** `Choice` ensures the value matches one of the allowed values.

---

**Question 11:** You can apply constraints to class properties, methods, and even the class itself.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Property constraints, getter constraints (on methods), and class-level constraints (e.g., `#[Assert\UniqueEntity]`) are all supported.

---

### Validation groups

**Question 12:** What are validation groups?
**Type:** Single answer
- [ ] A) Groups of validators
- [ ] B) Named sets of constraints — you can selectively run only constraints belonging to specific groups
- [ ] C) User groups in the security system
- [ ] D) Form field groups

**Correct Answer(s):** B
**Explanation:** Groups let you validate different constraints for different scenarios (e.g., `create` vs `update`).

---

**Question 13:** Every constraint belongs to which default group if no group is specified?
**Type:** Single answer
- [ ] A) `all`
- [ ] B) `Default`
- [ ] C) `global`
- [ ] D) `required`

**Correct Answer(s):** B
**Explanation:** The `Default` group is applied when no `groups:` are explicitly specified.

---

**Question 14:** What is `#[Assert\GroupSequence]` used for?
**Type:** Single answer
- [ ] A) Running all groups in parallel
- [ ] B) Running validation groups in a specific order — stops at the first group that has violations
- [ ] C) Merging all groups into one
- [ ] D) Deleting groups

**Correct Answer(s):** B
**Explanation:** `GroupSequence` runs groups sequentially. If group 1 fails, group 2 is NOT validated — saves resources and prevents redundant errors.

---

**Question 15:** How do you specify which validation groups a form uses?
**Type:** Single answer
- [ ] A) `$resolver->setDefaults(['validation_groups' => ['Registration']])`
- [ ] B) `$builder->setValidationGroups(['Registration'])`
- [ ] C) `$form->validate(['Registration'])`
- [ ] D) In `config/validator.yaml`

**Correct Answer(s):** A
**Explanation:** Set `validation_groups` in the form type's `configureOptions()`.

---

### Validation messages

**Question 16:** The default error message for `#[Assert\NotBlank]` is:
**Type:** Single answer
- [ ] A) `"This field is required."`
- [ ] B) `"This value should not be blank."`
- [ ] C) `"Cannot be empty."`
- [ ] D) `"Please fill this field."`

**Correct Answer(s):** B
**Explanation:** The default is `"This value should not be blank."`. Customizable via the `message` option.

---

**Question 17:** How do you customize a constraint's error message?
**Type:** Single answer
- [ ] A) `#[Assert\NotBlank(message: 'Please enter your name')]`
- [ ] B) `#[Assert\NotBlank(error: 'Please enter your name')]`
- [ ] C) In `config/messages.yaml`
- [ ] D) Via `__toString()` on the constraint

**Correct Answer(s):** A
**Explanation:** The `message:` parameter on the constraint overrides the default message.

---

**Question 18:** Validation messages support parameters like `{{ value }}` and `{{ limit }}`.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `#[Assert\Length(max: 50, maxMessage: 'Name must be under {{ limit }} chars')]` — `{{ limit }}` = 50.

---

### Custom callbacks and validators

**Question 19:** `#[Assert\Callback]` invokes:
**Type:** Single answer
- [ ] A) A static method on the class for complex validation logic
- [ ] B) An external API
- [ ] C) A database query
- [ ] D) A form event

**Correct Answer(s):** A
**Explanation:** Callback calls a method on the class, receiving `ExecutionContextInterface` to add violations programmatically.

---

**Question 20:** The `ExecutionContextInterface::buildViolation()` method is used to:
**Type:** Single answer
- [ ] A) Create a new constraint
- [ ] B) Programmatically add a validation error with a custom message, path, and parameters
- [ ] C) Query the database
- [ ] D) Send an email

**Correct Answer(s):** B
**Explanation:** `$context->buildViolation('message')->atPath('field')->addViolation()`.

---

**Question 21:** A custom constraint requires two classes:
**Type:** Single answer
- [ ] A) A `Constraint` class and a `ConstraintValidator` class
- [ ] B) A `Form` class and a `Type` class
- [ ] C) A `Controller` and a `Service`
- [ ] D) A `Listener` and a `Subscriber`

**Correct Answer(s):** A
**Explanation:** The `Constraint` class defines the constraint configuration. The `ConstraintValidator` class contains the validation logic.

---

**Question 22:** The `ConstraintValidator::validate()` method receives which arguments?
**Type:** Single answer
- [ ] A) `($value, Constraint $constraint)` — the value being validated and the constraint instance
- [ ] B) `(Request $request, FormInterface $form)`
- [ ] C) `(array $data, array $options)`
- [ ] D) `(string $field, string $rule)`

**Correct Answer(s):** A
**Explanation:** `validate($value, Constraint $constraint)` — you check `$value` and add violations via `$this->context`.

---

**Question 23:** `#[Assert\Expression]` validates using:
**Type:** Single answer
- [ ] A) Regular expressions
- [ ] B) ExpressionLanguage expressions evaluated against the object
- [ ] C) SQL queries
- [ ] D) JavaScript expressions

**Correct Answer(s):** B
**Explanation:** `#[Assert\Expression("this.getEndDate() > this.getStartDate()")]` — uses `ExpressionLanguage` on the validated object.

---

**Question 24:** `#[Assert\Compound]` allows:
**Type:** Single answer
- [ ] A) Combining multiple constraints into a single reusable constraint
- [ ] B) Validating chemical compounds
- [ ] C) Running constraints in parallel
- [ ] D) Negating a constraint

**Correct Answer(s):** A
**Explanation:** `Compound` groups multiple constraints into one named constraint for reuse.

---

**Question 25:** `#[Assert\Valid]` on a property means:
**Type:** Single answer
- [ ] A) The property value is a valid string
- [ ] B) Cascade validation to the embedded object (validate its own constraints)
- [ ] C) Skip validation for this property
- [ ] D) The property must not be null

**Correct Answer(s):** B
**Explanation:** `#[Assert\Valid]` cascades — validates the nested object's own constraints. Without it, embedded objects are not validated.

---

**Question 26:** `#[Assert\Unique]` on an array property checks:
**Type:** Single answer
- [ ] A) That the array is not empty
- [ ] B) That all array elements are unique (no duplicates)
- [ ] C) That the array has exactly one element
- [ ] D) A database uniqueness constraint

**Correct Answer(s):** B
**Explanation:** `#[Assert\Unique]` ensures no duplicate values in the collection.

---

**Question 27:** When validating manually (not via forms), you inject:
**Type:** Single answer
- [ ] A) `ValidatorInterface` and call `$validator->validate($object)`
- [ ] B) `FormFactoryInterface`
- [ ] C) `Request`
- [ ] D) `EntityManagerInterface`

**Correct Answer(s):** A
**Explanation:** `$validator->validate($object)` returns `ConstraintViolationListInterface`.

---

**Question 28:** `$violations->count()` returns `0` means:
**Type:** Single answer
- [ ] A) Validation failed
- [ ] B) Validation passed — no violations
- [ ] C) The object was null
- [ ] D) An error occurred

**Correct Answer(s):** B
**Explanation:** Zero violations = the object satisfies all constraints.

---

**Question 29:** `#[Assert\When(expression: 'this.getType() == "business"', constraints: [new Assert\NotBlank])]` does what?
**Type:** Single answer
- [ ] A) Always validates NotBlank
- [ ] B) Only validates NotBlank when `getType()` returns `"business"` (conditional constraint)
- [ ] C) Never validates
- [ ] D) Compares two objects

**Correct Answer(s):** B
**Explanation:** `When` makes constraints conditional — applied only when the expression evaluates to `true`.

---

**Question 30:** The `#[Assert\Sequentially]` constraint runs multiple constraints in order and stops at the first failure.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `Sequentially` runs nested constraints in order, stopping at the first violation — unlike normal validation which runs all.

---

---
