# Quiz : Forms (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Form component

**Question 1:** Symfony's Form component can be used standalone (without the full framework).
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** The Form component is a standalone Symfony component, usable without FrameworkBundle.

---

### Forms creation

**Question 2:** The recommended way to create a form in Symfony is:
**Type:** Single answer
- [ ] A) Write raw HTML
- [ ] B) Create a form type class extending `AbstractType` and use `$this->createForm()`
- [ ] C) Use JavaScript form generators
- [ ] D) Use Doctrine annotations

**Correct Answer(s):** B
**Explanation:** Custom form types in classes extending `AbstractType` with `buildForm()` and calling `$this->createForm(MyType::class)` in a controller.

---

**Question 3:** The `buildForm()` method receives which arguments?
**Type:** Single answer
- [ ] A) `(Request $request, Response $response)`
- [ ] B) `(FormBuilderInterface $builder, array $options)`
- [ ] C) `(FormInterface $form, array $data)`
- [ ] D) `(ContainerInterface $container)`

**Correct Answer(s):** B
**Explanation:** `buildForm(FormBuilderInterface $builder, array $options)` — $builder adds fields, $options contains form options.

---

**Question 4:** `$builder->add('name', TextType::class, ['label' => 'Full Name'])` does what?
**Type:** Single answer
- [ ] A) Creates a database column
- [ ] B) Adds a text input field named `name` with label `Full Name`
- [ ] C) Validates the name
- [ ] D) Creates a route

**Correct Answer(s):** B
**Explanation:** `add()` adds a form field with a type class and options.

---

### Forms handling

**Question 5:** The standard pattern for handling form submission is:
**Type:** Single answer
- [ ] A) `$form->submit($request)` then `$form->isValid()`
- [ ] B) `$form->handleRequest($request)` then `$form->isSubmitted() && $form->isValid()`
- [ ] C) `$form->process($request)`
- [ ] D) `$form->bind($request)`

**Correct Answer(s):** B
**Explanation:** `handleRequest()` extracts data from the request. Then check `isSubmitted()` and `isValid()`.

---

**Question 6:** `$form->getData()` returns:
**Type:** Single answer
- [ ] A) The raw POST data
- [ ] B) The underlying object/array mapped from the form data (after transformers)
- [ ] C) A `Request` object
- [ ] D) An array of errors

**Correct Answer(s):** B
**Explanation:** `getData()` returns the data object populated with form values (after data transformation and mapping).

---

### Form types (built-in and custom)

**Question 7:** All form types ultimately extend:
**Type:** Single answer
- [ ] A) `FormType`
- [ ] B) `AbstractType`
- [ ] C) `TextType`
- [ ] D) `InputType`

**Correct Answer(s):** A
**Explanation:** All built-in types extend `FormType`. `AbstractType` is the base class for custom types implementing `FormTypeInterface`.

---

**Question 8:** Which of these are built-in form types? (Select all)
**Type:** Multiple choice
- [ ] A) `TextType`
- [ ] B) `EmailType`
- [ ] C) `ChoiceType`
- [ ] D) `DateType`
- [ ] E) `FileType`
- [ ] F) `EntityType`

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** All six are built-in. `EntityType` requires Doctrine Bridge but is still a built-in type.

---

**Question 9:** Form type guessing uses which sources to auto-detect the field type? (Select all)
**Type:** Multiple choice
- [ ] A) Validation constraints (e.g., `#[Assert\Email]` → `EmailType`)
- [ ] B) Doctrine metadata (column type)
- [ ] C) PHP type declarations
- [ ] D) The field name string

**Correct Answer(s):** A, B
**Explanation:** Validation constraints and Doctrine metadata drive type guessing. PHP types and field names do not.

---

### Forms rendering with Twig

**Question 10:** `{{ form(form) }}` renders:
**Type:** Single answer
- [ ] A) Only the form labels
- [ ] B) The entire form (opening tag, all fields, errors, closing tag)
- [ ] C) Only the submit button
- [ ] D) Only the form opening tag

**Correct Answer(s):** B
**Explanation:** `{{ form(form) }}` renders the complete form HTML.

---

**Question 11:** Which Twig functions give granular control over form rendering? (Select all)
**Type:** Multiple choice
- [ ] A) `form_start(form)`
- [ ] B) `form_end(form)`
- [ ] C) `form_row(form.name)`
- [ ] D) `form_widget(form.name)`
- [ ] E) `form_label(form.name)`
- [ ] F) `form_errors(form.name)`

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** All are Twig form rendering functions for fine-grained control.

---

**Question 12:** `form_row()` renders:
**Type:** Single answer
- [ ] A) Only the input widget
- [ ] B) Label + widget + errors for a single field (the full "row")
- [ ] C) Only the label
- [ ] D) Only the errors

**Correct Answer(s):** B
**Explanation:** `form_row()` = `form_label()` + `form_widget()` + `form_errors()` combined.

---

### Forms theming

**Question 13:** Built-in form themes in Symfony include:
**Type:** Multiple choice
- [ ] A) `form_div_layout.html.twig`
- [ ] B) `form_table_layout.html.twig`
- [ ] C) `bootstrap_5_layout.html.twig`
- [ ] D) `tailwind_layout.html.twig`

**Correct Answer(s):** A, B, C
**Explanation:** Symfony provides div, table, Bootstrap 3/4/5, and Foundation themes. No Tailwind theme built-in.

---

**Question 14:** You can apply a form theme to a single form with:
**Type:** Single answer
- [ ] A) `{% form_theme form 'mytheme.html.twig' %}`
- [ ] B) `{% theme form 'mytheme.html.twig' %}`
- [ ] C) `{{ form_theme(form, 'mytheme') }}`
- [ ] D) `{% set_theme form 'mytheme.html.twig' %}`

**Correct Answer(s):** A
**Explanation:** `{% form_theme form 'path/to/theme.html.twig' %}` applies a theme to a specific form instance.

---

### CSRF protection

**Question 15:** Symfony forms include CSRF protection by default.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** CSRF is enabled by default. A hidden `_token` field is rendered and validated automatically.

---

**Question 16:** The hidden CSRF token field is named `_token` by default. How do you customize the token ID?
**Type:** Single answer
- [ ] A) Override `configureOptions()` with `'csrf_token_id' => 'my_custom_id'`
- [ ] B) Set `csrf_field_name` in `services.yaml`
- [ ] C) Override `getBlockPrefix()`
- [ ] D) It cannot be customized

**Correct Answer(s):** A
**Explanation:** In `configureOptions()`: `$resolver->setDefaults(['csrf_token_id' => 'custom_id'])`.

---

**Question 17:** To disable CSRF on a specific form:
**Type:** Single answer
- [ ] A) `$resolver->setDefaults(['csrf_protection' => false])`
- [ ] B) Remove `security-csrf` from composer
- [ ] C) Set `csrf: false` in `twig.yaml`
- [ ] D) Delete the `_token` field

**Correct Answer(s):** A
**Explanation:** Set `csrf_protection: false` in `configureOptions()` for that specific form type.

---

### Handling file upload

**Question 18:** For file uploads, which form type should you use?
**Type:** Single answer
- [ ] A) `TextType`
- [ ] B) `FileType`
- [ ] C) `BinaryType`
- [ ] D) `UploadType`

**Correct Answer(s):** B
**Explanation:** `FileType::class` renders `<input type="file">`.

---

**Question 19:** When using `FileType`, the form's submitted data for that field is a:
**Type:** Single answer
- [ ] A) String (file path)
- [ ] B) `UploadedFile` instance
- [ ] C) `File` instance
- [ ] D) Binary string

**Correct Answer(s):** B
**Explanation:** `UploadedFile` extends `File` and wraps the uploaded file data.

---

### Data transformers

**Question 20:** A data transformer converts data between which two representations?
**Type:** Single answer
- [ ] A) Request and Response
- [ ] B) Model data (PHP object) and view data (form widget input)
- [ ] C) Database and API
- [ ] D) YAML and PHP

**Correct Answer(s):** B
**Explanation:** Transformers convert between model format (PHP) and view format (HTML form), and vice versa.

---

**Question 21:** Which interface must a data transformer implement?
**Type:** Single answer
- [ ] A) `DataTransformerInterface`
- [ ] B) `TransformerInterface`
- [ ] C) `DataConverterInterface`
- [ ] D) `FormTransformerInterface`

**Correct Answer(s):** A
**Explanation:** `DataTransformerInterface` with `transform()` (model → view) and `reverseTransform()` (view → model).

---

**Question 22:** How do you add a model transformer to a form field?
**Type:** Single answer
- [ ] A) `$builder->get('field')->addModelTransformer($transformer)`
- [ ] B) `$builder->add('field', options: ['transformer' => $transformer])`
- [ ] C) `$builder->setTransformer($transformer)`
- [ ] D) `$form->transform($field)`

**Correct Answer(s):** A
**Explanation:** `$builder->get('fieldName')->addModelTransformer($transformer)`.

---

### Form events

**Question 23:** Which are valid form events? (Select all)
**Type:** Multiple choice
- [ ] A) `FormEvents::PRE_SET_DATA`
- [ ] B) `FormEvents::POST_SET_DATA`
- [ ] C) `FormEvents::PRE_SUBMIT`
- [ ] D) `FormEvents::SUBMIT`
- [ ] E) `FormEvents::POST_SUBMIT`

**Correct Answer(s):** A, B, C, D, E
**Explanation:** All five are valid form lifecycle events.

---

**Question 24:** `PRE_SET_DATA` fires:
**Type:** Single answer
- [ ] A) After form submission
- [ ] B) Before the initial data is set on the form (useful for dynamically adding/removing fields)
- [ ] C) After rendering
- [ ] D) When the form is validated

**Correct Answer(s):** B
**Explanation:** `PRE_SET_DATA` fires before `setData()`, allowing dynamic form modification based on the underlying data.

---

**Question 25:** `PRE_SUBMIT` fires:
**Type:** Single answer
- [ ] A) Before the submitted data is applied to the form (allows modifying raw submitted data)
- [ ] B) After validation
- [ ] C) Before rendering
- [ ] D) After the data is mapped to the object

**Correct Answer(s):** A
**Explanation:** `PRE_SUBMIT` receives the raw submitted data. You can modify it before it's processed by the form.

---

### Form type extensions

**Question 26:** A form type extension allows you to:
**Type:** Single answer
- [ ] A) Create a new form type from scratch
- [ ] B) Modify the behavior of an existing form type without subclassing it
- [ ] C) Delete a form type
- [ ] D) Create a route

**Correct Answer(s):** B
**Explanation:** Type extensions add/modify options, builders, or views of existing types (e.g., adding a help text to all `TextType`).

---

**Question 27:** A form type extension must implement:
**Type:** Single answer
- [ ] A) `FormTypeExtensionInterface`
- [ ] B) `AbstractTypeExtension`
- [ ] C) Either A or B (B extends A)
- [ ] D) `FormBuilderInterface`

**Correct Answer(s):** C
**Explanation:** `AbstractTypeExtension` implements `FormTypeExtensionInterface` and is the recommended base class.

---

**Question 28:** The `getExtendedTypes()` method returns which types the extension applies to. To extend ALL types, return:
**Type:** Single answer
- [ ] A) `[FormType::class]`
- [ ] B) `['*']`
- [ ] C) `[]`
- [ ] D) `[AbstractType::class]`

**Correct Answer(s):** A
**Explanation:** `FormType::class` is the root of all form types. Returning it applies the extension to every type.

---

### Form options (OptionsResolver component)

**Question 29:** `OptionsResolver` is used in forms to:
**Type:** Single answer
- [ ] A) Resolve database queries
- [ ] B) Define, validate, and normalize form options (defaults, allowed types, required options)
- [ ] C) Resolve service dependencies
- [ ] D) Generate URLs

**Correct Answer(s):** B
**Explanation:** `OptionsResolver` processes options passed to form types, enforcing structure and defaults.

---

**Question 30:** In `configureOptions()`, `$resolver->setDefaults(['label' => 'Submit'])` does what?
**Type:** Single answer
- [ ] A) Requires the `label` option
- [ ] B) Sets a default value for `label` that can be overridden when creating the form
- [ ] C) Prevents the `label` option from being changed
- [ ] D) Removes the `label` option

**Correct Answer(s):** B
**Explanation:** `setDefaults()` provides default values. The caller can override them.

---

**Question 31:** `$resolver->setRequired(['name'])` means:
**Type:** Single answer
- [ ] A) The option `name` must be passed explicitly — no default is set
- [ ] B) The option `name` is optional
- [ ] C) The option `name` is removed
- [ ] D) The option `name` is deprecated

**Correct Answer(s):** A
**Explanation:** `setRequired()` mandates the option. Omitting it throws `MissingOptionsException`.

---

**Question 32:** `$resolver->setAllowedTypes('port', 'int')` does what?
**Type:** Single answer
- [ ] A) Sets the default to an integer
- [ ] B) Restricts the `port` option to only accept integer values
- [ ] C) Converts the value to int
- [ ] D) Validates the port number range

**Correct Answer(s):** B
**Explanation:** `setAllowedTypes()` enforces the type. Passing a string throws `InvalidOptionsException`.

---

---
