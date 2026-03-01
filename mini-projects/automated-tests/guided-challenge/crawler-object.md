## Crawler object - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Write a test that checks the contact form page has a `<form>` element with a submit button.

<details><summary>Click to reveal Solution</summary>

```php
public function testContactFormExists(): void
{
    $client = static::createClient();
    $crawler = $client->request('GET', '/forms/contact');

    $this->assertResponseIsSuccessful();
    $this->assertSelectorExists('form');
    $this->assertSelectorExists('button[type="submit"]');
    $this->assertCount(1, $crawler->filter('form'));
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Crawler object"](https://symfonycasts.com/search?q=crawler%2Bobject)
