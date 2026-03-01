# Flashcards : Forms (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every API, option, event, and edge case covered.

---

### Creating forms

**Q: What is the primary way to create a form in a Symfony controller?**
**A:** Call `$this->createForm(FormType::class, $dataObject, $options)` in a controller extending `AbstractController`. Returns a `FormInterface`.
**Code Snippet:**
```php
$form = $this->createForm(ProductType::class, $product, [
    'method' => 'POST',
    'action' => $this->generateUrl('product_create'),
]);
```

---

**Q: How do you create a form in a service (not a controller)?**
**A:** Inject `FormFactoryInterface` and call `$factory->create(FormType::class, $data, $options)`.
**Code Snippet:**
```php
use Symfony\Component\Form\FormFactoryInterface;

class RegistrationService {
    public function __construct(private FormFactoryInterface $formFactory) {}
    public function buildForm(User $user): FormInterface {
        return $this->formFactory->create(UserRegistrationType::class, $user);
    }
}
```

---

**Q: What does `$form->handleRequest($request)` do?**
**A:** Binds incoming request data to the form (only if the request method matches the form method AND the form was submitted). Does NOT validate.
**Code Snippet:**
```php
$form->handleRequest($request);
// Now check: isSubmitted() AND isValid()
```

---

**Q: What is `$form->submit($data, $clearMissing)` and when would you prefer it over `handleRequest()`?**
**A:** Programmatically submits the form with the given data array. `$clearMissing = false` enables partial updates (PATCH semantics — only submitted fields are changed). Useful in APIs.
**Code Snippet:**
```php
// For PATCH (partial update):
$form->submit($request->request->all(), false);
```

---

**Q: What is `$form->isSubmitted()` vs `$form->isValid()`?**
**A:** `isSubmitted()` — data was bound from the request. `isValid()` — the form is submitted AND passes all validation constraints. **Always check both.**
**Code Snippet:**
```php
if ($form->isSubmitted() && $form->isValid()) {
    $data = $form->getData(); // The validated data
}
```

---

**Q: How do you retrieve the typed data object from a submitted valid form?**
**A:** `$form->getData()` returns the data class instance (the second argument of `createForm()`) with mapped field values.
**Code Snippet:**
```php
/** @var Product $product */
$product = $form->getData();
```

---

**Q: What does the `data_class` option do in a form type?**
**A:** Declares the PHP class the form maps to. Data is mapped from/to an instance of this class. Without it, the form returns an associative array.
**Code Snippet:**
```php
public function configureOptions(OptionsResolver $resolver): void {
    $resolver->setDefaults(['data_class' => Product::class]);
}
```

---

### Handling forms

**Q: What is the standard form controller pattern (new + create actions)?**
**A:** One controller action handles both GET (show the empty form) and POST (handle submission). If the form is valid, redirect; else re-render with errors.
**Code Snippet:**
```php
#[Route('/products/new', name: 'product_new', methods: ['GET','POST'])]
public function new(Request $request): Response {
    $product = new Product();
    $form = $this->createForm(ProductType::class, $product);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
        // persist $product
        return $this->redirectToRoute('product_list');
    }
    return $this->render('product/new.html.twig', ['form' => $form]);
}
```

---

**Q: What is `$form->createView()` and when is it called?**
**A:** Converts a `FormInterface` into a `FormView` tree (plain data for Twig rendering). Called before passing to the template. Since Symfony 6, passing `$form` directly to Twig is also accepted.
**Code Snippet:**
```php
// Explicit (old style — still works):
return $this->render('form.html.twig', ['form' => $form->createView()]);
// Modern (since Symfony 6):
return $this->render('form.html.twig', ['form' => $form]);
```

---

### Built-in form types

**Q: What are the 10 most important built-in Symfony form field types?**
**A:**
1. `TextType` — `<input type="text">`
2. `EmailType` — `<input type="email">`
3. `PasswordType` — `<input type="password">`
4. `TextareaType` — `<textarea>`
5. `IntegerType` / `NumberType` — numeric inputs
6. `CheckboxType` — `<input type="checkbox">`
7. `ChoiceType` — `<select>` or radio/checkbox group
8. `DateType` / `DateTimeType` — date fields
9. `FileType` — `<input type="file">`
10. `HiddenType` — `<input type="hidden">`
**Code Snippet:**
```php
$builder
    ->add('name', TextType::class, ['label' => 'Product Name'])
    ->add('price', NumberType::class, ['scale' => 2])
    ->add('category', ChoiceType::class, ['choices' => $categories])
    ->add('save', SubmitType::class);
```

---

**Q: What is the difference between `ChoiceType` with `expanded: false` vs `expanded: true`?**
**A:** `expanded: false` (default) → `<select>` dropdown. `expanded: true` → radio buttons (single choice) or checkboxes (multiple choice).
**Code Snippet:**
```php
->add('status', ChoiceType::class, [
    'choices' => ['Active' => 'active', 'Draft' => 'draft'],
    'expanded' => false,   // <select>
    'multiple' => false,   // single value
])
->add('tags', ChoiceType::class, [
    'choices' => $tagsChoices,
    'expanded' => true,    // checkboxes
    'multiple' => true,    // array of selected values
])
```

---

**Q: What is `CollectionType` and what options control adding/removing items?**
**A:** Renders a list of sub-forms (e.g., a list of addresses). Key options: `allow_add: true`, `allow_delete: true`, `entry_type:` (the sub-form type), `by_reference: false` (required for collections relying on `add*`/`remove*` methods).
**Code Snippet:**
```php
->add('addresses', CollectionType::class, [
    'entry_type'   => AddressType::class,
    'allow_add'    => true,
    'allow_delete' => true,
    'by_reference' => false,
])
```

---

**Q: What does `by_reference: false` do in a form collection?**
**A:** Forces the form to call the setter on the parent object (adder/remover methods like `addAddress()`/`removeAddress()`) rather than modifying the collection in-place by reference. Required for proper Doctrine collection tracking.
**Code Snippet:** N/A

---

**Q: What is `EntityType` and how does it differ from `ChoiceType`?**
**A:** `EntityType` extends `ChoiceType` but automatically queries a repository for choices. Requires Doctrine (`doctrine/orm`). `ChoiceType` works with plain arrays. ⚠️ Doctrine is out of exam scope — but `EntityType` may appear conceptually.
**Code Snippet:**
```php
->add('category', EntityType::class, [
    'class' => Category::class,
    'choice_label' => 'name',
])
```

---

### Custom form types

**Q: How do you create a custom form type in Symfony?**
**A:** Create a class extending `AbstractType`. Override `buildForm()` to add fields and `configureOptions()` to set defaults.
**Code Snippet:**
```php
class AddressType extends AbstractType {
    public function buildForm(FormBuilderInterface $builder, array $options): void {
        $builder
            ->add('street', TextType::class)
            ->add('city', TextType::class)
            ->add('postcode', TextType::class, ['constraints' => [new Assert\NotBlank()]]);
    }
    public function configureOptions(OptionsResolver $resolver): void {
        $resolver->setDefaults(['data_class' => Address::class]);
    }
}
```

---

**Q: What is the purpose of `getParent()` in a custom form type?**
**A:** Returns the parent type whose behaviors are inherited. Default is `FormType`. Changing it (e.g., to `ChoiceType`) lets you build specialized choice types.
**Code Snippet:**
```php
class YesNoType extends AbstractType {
    public function getParent(): string { return ChoiceType::class; }
    public function configureOptions(OptionsResolver $resolver): void {
        $resolver->setDefaults(['choices' => ['Yes' => true, 'No' => false]]);
    }
}
```

---

**Q: What is `getBlockPrefix()` in a form type and what is it used for?**
**A:** Returns a string prefix used to identify the form type in Twig theming. Defaults to the class name in snake_case (without `_type`). Used in block names like `address_widget`, `address_label`.
**Code Snippet:**
```php
public function getBlockPrefix(): string { return 'address'; }
// Twig will look for: {% block address_widget %}, {% block address_row %}
```

---

### Form rendering with Twig

**Q: What are the main Twig functions used to render a form?**
**A:** `form(form)` — render entire form. `form_start(form)` — `<form>` tag. `form_end(form)` — closing tag + remaining fields. `form_row(form.fieldName)` — label + widget + errors. `form_widget(form.fieldName)` — widget only. `form_label(form.fieldName)` — label only. `form_errors(form)` — errors only.
**Code Snippet:**
```twig
{{ form_start(form) }}
    {{ form_row(form.name) }}
    {{ form_row(form.email, {'label': 'Your Email', 'attr': {'class': 'form-control'}}) }}
    <button type="submit">Save</button>
{{ form_end(form) }}
```

---

**Q: How do you add a CSS class or HTML attribute to a form field widget?**
**A:** Pass `'attr'` option (for rendering) in `form_widget()` or in the form type's `buildForm()`. Use `'label_attr'` for label attributes.
**Code Snippet:**
```twig
{{ form_widget(form.email, {'attr': {'class': 'form-control', 'placeholder': 'Email'}}) }}
```
```php
// Or in form type:
->add('email', EmailType::class, ['attr' => ['class' => 'form-control', 'autofocus' => true]])
```

---

**Q: What does `form_end(form)` render beyond just the closing `</form>` tag?**
**A:** It also renders any **unrendered fields** (including hidden fields like the CSRF token) automatically. Never call it without calling `form_start` first.
**Code Snippet:**
```twig
{{ form_start(form) }}
    {{ form_row(form.name) }}
    {# form_end renders _token and any other unrendered fields: #}
{{ form_end(form) }}
```

---

**Q: How do you render form-level errors (not field-level) in Twig?**
**A:** Use `form_errors(form)` with the root `form` variable, not a specific field.
**Code Snippet:**
```twig
{{ form_errors(form) }}   {# Global errors (e.g., CSRF failure, UniqueEntity) #}
{{ form_errors(form.email) }}  {# Field-specific errors #}
```

---

### Form theming

**Q: What is form theming in Symfony and how does it work?**
**A:** Custom Twig templates that override the HTML rendering of form elements by defining specific `{% block %}` blocks. Symfony ships with several built-in themes (Bootstrap 5, Foundation, etc.).
**Code Snippet:**
```yaml
# twig.yaml
twig:
    form_themes:
        - 'bootstrap_5_layout.html.twig'
        - 'form/my_custom_theme.html.twig'
```

---

**Q: How do you apply a custom theme to a single form (not globally)?**
**A:** Use the `{% form_theme %}` Twig tag in the template.
**Code Snippet:**
```twig
{% form_theme form 'form/my_custom_theme.html.twig' %}
{{ form_start(form) }}
...
```

---

**Q: What block naming convention does form theming follow?**
**A:** `{block_prefix}_{type}` where `type` is: `widget`, `label`, `row`, `errors`. E.g., `text_widget`, `textarea_row`, `choice_label`. Override a built-in block to change rendering for all fields of that type.
**Code Snippet:**
```twig
{# Override all text field widgets: #}
{% block text_widget %}
    <input class="my-input {{ block('widget_attributes') }}" {{ block('widget_attributes') }} value="{{ value }}">
{% endblock %}
```

---

**Q: What built-in form themes ship with Symfony?**
**A:**
- `form_div_layout.html.twig` — default (divs)
- `form_table_layout.html.twig` — table layout
- `bootstrap_3_layout.html.twig`
- `bootstrap_4_layout.html.twig`
- `bootstrap_5_layout.html.twig`
- `foundation_6_layout.html.twig`
**Code Snippet:**
```yaml
twig:
    form_themes: ['bootstrap_5_layout.html.twig']
```

---

### CSRF protection

**Q: How is CSRF protection applied to Symfony forms automatically?**
**A:** The `CsrfExtension` adds a hidden `_token` field to every form. The token is validated on `handleRequest()`. No extra code needed.
**Code Snippet:** N/A

---

**Q: How do you disable CSRF protection for a specific form?**
**A:** Set `csrf_protection: false` in the form options.
**Code Snippet:**
```php
$form = $this->createForm(ApiType::class, $data, ['csrf_protection' => false]);
```

---

**Q: What option controls the CSRF token ID for a form type?**
**A:** `csrf_token_id:` in `configureOptions()`. Defaults to the block prefix. Changing it allows multiple forms on the same page to have different tokens.
**Code Snippet:**
```php
$resolver->setDefaults([
    'csrf_token_id' => 'product_delete',
]);
```

---

**Q: How do you manually validate a CSRF token in a controller (outside a form)?**
**A:** Use `$this->isCsrfTokenValid($tokenId, $submittedToken)` from `AbstractController`.
**Code Snippet:**
```php
if (!$this->isCsrfTokenValid('delete_product', $request->request->get('_token'))) {
    throw new InvalidCsrfTokenException();
}
```

---

### File upload

**Q: Which form field type handles file uploads?**
**A:** `FileType`. Renders `<input type="file">`. The mapped value is an `UploadedFile` instance on submit.
**Code Snippet:**
```php
->add('avatar', FileType::class, [
    'label' => 'Avatar (image file)',
    'mapped' => false,    // Don't map to entity – handle manually
    'required' => false,
    'constraints' => [
        new Assert\File(['mimeTypes' => ['image/jpeg', 'image/png']])
    ],
])
```

---

**Q: Why do you often use `mapped: false` with `FileType`?**
**A:** The entity typically stores the filename (string), not the `UploadedFile`. Using `mapped: false` means the file is not automatically mapped to the entity — you handle the `UploadedFile` separately in the controller.
**Code Snippet:**
```php
$avatarFile = $form->get('avatar')->getData();
if ($avatarFile instanceof UploadedFile) {
    $filename = uniqid().'.'.$avatarFile->guessExtension();
    $avatarFile->move($this->getParameter('avatars_dir'), $filename);
    $user->setAvatar($filename);
}
```

---

**Q: What multipart encoding must a form use for file uploads?**
**A:** `enctype="multipart/form-data"`. When using `form_start()` with a `FileType` field, Symfony adds this automatically.
**Code Snippet:**
```twig
{# Symfony adds enctype automatically when FileType is present: #}
{{ form_start(form) }}
{# Results in: <form method="post" enctype="multipart/form-data"> #}
```

---

### Data transformers

**Q: What is a Data Transformer in Symfony Forms and when do you need one?**
**A:** Converts between the **form representation** (what the user enters, e.g., a comma-separated string) and the **data representation** (what the PHP object expects, e.g., an array). Needed when the form's raw input format doesn't match the model.
**Code Snippet:**
```php
class TagsToStringTransformer implements DataTransformerInterface {
    public function transform(mixed $tags): string {
        return implode(',', $tags ?? []);
    }
    public function reverseTransform(mixed $value): array {
        return array_filter(array_map('trim', explode(',', $value ?? '')));
    }
}
```

---

**Q: How do you attach a Data Transformer to a form field?**
**A:** Call `->addModelTransformer()` or `->addViewTransformer()` on the `FormBuilderInterface`.
**Code Snippet:**
```php
$builder->get('tags')
    ->addModelTransformer(new TagsToStringTransformer());
```

---

**Q: What is the difference between `addModelTransformer()` and `addViewTransformer()`?**
**A:**
- `ModelTransformer` — converts between **model** (PHP object property) ↔ **norm** (normalized data, usually array/scalar).
- `ViewTransformer` — converts between **norm** ↔ **view** (what is displayed in the HTML widget).
Both are rarely needed at the same time; model transformers are more common.
**Code Snippet:** N/A

---

### Form events

**Q: What are the four main Form events and when does each fire?**
**A:**
1. `PRE_SET_DATA` — before data is bound to the form (on form creation)
2. `POST_SET_DATA` — after data is bound (form created, data accessible)
3. `PRE_SUBMIT` — before submitted data is bound (raw request data accessible)
4. `POST_SUBMIT` — after submitted data is bound (validation runs after this)
**Code Snippet:**
```php
$builder->addEventListener(FormEvents::PRE_SET_DATA, function(FormEvent $event) {
    $data = $event->getData();
    $form = $event->getForm();
    if ($data && $data->isEditing()) {
        $form->remove('password'); // Remove password field on edit
    }
});
```

---

**Q: When would you use `PRE_SUBMIT` event versus `POST_SET_DATA`?**
**A:** `PRE_SUBMIT` — modify the form structure **based on submitted raw data** (before normalization). `POST_SET_DATA` — modify the form structure **based on the bound data model** (e.g., add/remove fields depending on the existing object's state).
**Code Snippet:**
```php
// PRE_SUBMIT: only add a field if the submitted 'type' checkbox is checked
$builder->addEventListener(FormEvents::PRE_SUBMIT, function(FormEvent $event) {
    $data = $event->getData();
    if (!empty($data['isPremium'])) {
        $event->getForm()->add('premiumCode', TextType::class);
    }
});
```

---

**Q: How do you add a dynamic field to a form type based on a custom option?**
**A:** Read the option in `buildForm()` and conditionally add the field.
**Code Snippet:**
```php
public function buildForm(FormBuilderInterface $builder, array $options): void {
    $builder->add('name', TextType::class);
    if ($options['show_address']) {
        $builder->add('address', AddressType::class);
    }
}
public function configureOptions(OptionsResolver $resolver): void {
    $resolver->setDefaults(['data_class' => User::class, 'show_address' => false]);
    $resolver->setAllowedTypes('show_address', 'bool');
}
```

---

### Form type extensions

**Q: What is a Form Type Extension (`AbstractTypeExtension`) and what can it do?**
**A:** Adds new behavior or options to **existing** form types without subclassing them. Alters the build process for all fields of a given type (or all types via `FormType::class`).
**Code Snippet:**
```php
class HelpTextExtension extends AbstractTypeExtension {
    public function buildView(FormView $view, FormInterface $form, array $options): void {
        $view->vars['help'] = $options['help_text'];
    }
    public function configureOptions(OptionsResolver $resolver): void {
        $resolver->setDefined('help_text');
        $resolver->setDefault('help_text', null);
    }
    public static function getExtendedTypes(): iterable {
        return [FormType::class]; // Applies to ALL form types
    }
}
```

---

**Q: How do you target a Type Extension to a specific form type?**
**A:** Return only that type's FQCN from `getExtendedTypes()`.
**Code Snippet:**
```php
public static function getExtendedTypes(): iterable {
    return [TextType::class]; // Only extends text inputs
}
```

---

**Q: What is the difference between `buildForm()` and `buildView()` in a Type Extension?**
**A:** `buildForm()` — adds/modifies form builder options (fields, data transformers, events). `buildView()` — modifies the `FormView` vars passed to Twig (adds `vars['help']`, etc.) for rendering.
**Code Snippet:** N/A

---

### OptionsResolver component

**Q: What is `OptionsResolver` used for in form types?**
**A:** Declares, validates, and normalizes options for form types and custom components. Used in `configureOptions()` to define allowed options, defaults, required options, and type constraints.
**Code Snippet:**
```php
public function configureOptions(OptionsResolver $resolver): void {
    $resolver->setDefaults(['data_class' => Product::class, 'max_price' => 9999.0]);
    $resolver->setRequired('currency');
    $resolver->setAllowedTypes('max_price', ['int', 'float']);
    $resolver->setAllowedValues('currency', ['EUR', 'USD', 'GBP']);
}
```

---

**Q: What exception does `OptionsResolver` throw for an unknown option?**
**A:** `Symfony\Component\OptionsResolver\Exception\UndefinedOptionsException`.
**Code Snippet:**
```php
$resolver->setDefined(['extra_classes', 'show_help']); // define optional options
// If caller passes 'unknown_option' → UndefinedOptionsException
```

---

**Q: What is `setNormalizer()` in `OptionsResolver`?**
**A:** Applies a transformation to an option after it is resolved. Used to coerce values (e.g., cast a string to uppercase, transform null to an empty array).
**Code Snippet:**
```php
$resolver->setNormalizer('currency', function(Options $options, string $value): string {
    return strtoupper($value);
});
```

---
