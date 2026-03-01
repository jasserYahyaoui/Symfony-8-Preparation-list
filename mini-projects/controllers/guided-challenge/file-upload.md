## File upload - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Add validation: only accept PDF or PNG files under 2MB.

<details><summary>Click to reveal Solution</summary>

```php
$allowedMimes = ['application/pdf', 'image/png'];
$maxSize = 2 * 1024 * 1024; // 2MB

if (!in_array($file->getClientMimeType(), $allowedMimes)) {
    return $this->json(['error' => 'Only PDF and PNG allowed'], 422);
}

if ($file->getSize() > $maxSize) {
    return $this->json(['error' => 'File too large (max 2MB)'], 422);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "File upload"](https://symfonycasts.com/search?q=file%2Bupload)
