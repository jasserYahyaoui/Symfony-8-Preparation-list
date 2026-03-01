## Functional tests with HttpKernel - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Write a test that hits `/routing/products/42` (200) and `/routing/products/abc` (404).

<details><summary>Click to reveal Solution</summary>

```php
public function testProductValid(): void
{
    $client = static::createClient();
    $client->request('GET', '/routing/products/42');
    $this->assertResponseIsSuccessful();
}

public function testProductInvalid(): void
{
    $client = static::createClient();
    $client->request('GET', '/routing/products/abc');
    $this->assertResponseStatusCodeSame(404);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Functional tests with HttpKernel"](https://symfonycasts.com/search?q=functional%2Btests%2Bwith%2Bhttpkernel)
