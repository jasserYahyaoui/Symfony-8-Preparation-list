## PHP API up to PHP 8.4 version - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a new endpoint `/php/string-demo` that demonstrates PHP 8.4 string and array functions on a list of user emails.

**Hints:**
- Use `array_find()` to find the first email containing `@admin`.
- Use `array_all()` to check if all emails are valid (contain `@`).
- Use `mb_ucfirst()` (PHP 8.4) to capitalize the local part of the first email.

**Testing:** `curl https://127.0.0.1:8000/php/string-demo` should return a JSON object with the results.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/string-demo', name: 'php_string_demo', methods: ['GET'])]
public function stringDemo(): JsonResponse
{
    $emails = ['alice@example.com', 'bob@admin.org', 'charlie@test.net'];

    $adminEmail = array_find($emails, fn(string $e) => str_contains($e, '@admin'));
    $allValid = array_all($emails, fn(string $e) => str_contains($e, '@'));

    $firstLocal = explode('@', $emails[0])[0];
    $capitalized = mb_ucfirst($firstLocal);

    return $this->json([
        'first_admin_email' => $adminEmail,
        'all_valid' => $allValid,
        'capitalized_local' => $capitalized,
    ]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "PHP API up to PHP 8.4 version"](https://symfonycasts.com/search?q=php%2Bapi%2Bup%2Bto%2Bphp%2B8.4%2Bversion)
