## CSRF protection - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


CSRF protection is **enabled by default** in Symfony forms. The `_token` hidden field is automatically added.

```php
// In form type — CSRF is ON by default
public function configureOptions(OptionsResolver $resolver): void
{
    $resolver->setDefaults([
        'csrf_protection' => true,                    // Default: true
        'csrf_field_name' => '_token',                 // Default field name
        'csrf_token_id'   => 'contact_form',           // Unique ID per form
    ]);
}
```

Manual CSRF validation (outside forms):
```php
if (!$this->isCsrfTokenValid('delete-item', $request->request->get('_token'))) {
    throw $this->createAccessDeniedException('Invalid CSRF token.');
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "CSRF protection"](https://symfonycasts.com/search?q=csrf%2Bprotection)
