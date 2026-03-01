## CSRF protection - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** How do you validate a CSRF token for a non-form POST action (like a delete button)?

<details><summary>Click to reveal Solution</summary>

In the template:
```twig
<form method="post" action="{{ path('item_delete', {id: item.id}) }}">
    <input type="hidden" name="_token" value="{{ csrf_token('delete-item-' ~ item.id) }}">
    <button type="submit">Delete</button>
</form>
```

In the controller:
```php
if (!$this->isCsrfTokenValid('delete-item-' . $id, $request->request->get('_token'))) {
    throw $this->createAccessDeniedException();
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "CSRF protection"](https://symfonycasts.com/search?q=csrf%2Bprotection)
