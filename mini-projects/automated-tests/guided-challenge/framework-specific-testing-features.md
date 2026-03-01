## Framework-specific testing features - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Write a test that verifies a JSON endpoint returns the correct structure.

<details><summary>Click to reveal Solution</summary>

```php
public function testJsonStructure(): void
{
    $client = static::createClient();
    $client->request('GET', '/php/enum-demo/pending');

    $this->assertResponseIsSuccessful();
    $this->assertResponseHeaderSame('Content-Type', 'application/json');

    $data = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('value', $data);
    $this->assertArrayHasKey('label', $data);
    $this->assertArrayHasKey('is_final', $data);
    $this->assertSame('pending', $data['value']);
    $this->assertFalse($data['is_final']);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Framework-specific testing features"](https://symfonycasts.com/search?q=framework-specific%2Btesting%2Bfeatures)
