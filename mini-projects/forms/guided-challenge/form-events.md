## Form events - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Use `FormEvents::PRE_SET_DATA` to conditionally add a `companyName` field only when editing an existing entity (not on create).

<details><summary>Click to reveal Solution</summary>

```php
$builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
    $data = $event->getData();
    $form = $event->getForm();

    // If data has an ID, it's an edit
    if ($data && $data->getId()) {
        $form->add('companyName', TextType::class);
    }
});
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Form events"](https://symfonycasts.com/search?q=form%2Bevents)
