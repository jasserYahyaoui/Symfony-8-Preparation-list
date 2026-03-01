## Framework-specific testing features - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
// Response assertions
$this->assertResponseIsSuccessful();               // 2xx
$this->assertResponseStatusCodeSame(201);           // Exact code
$this->assertResponseRedirects('/other-page');       // Redirects
$this->assertResponseHeaderSame('Content-Type', 'application/json');
$this->assertResponseHasHeader('X-Custom');
$this->assertResponseNotHasHeader('X-Debug');

// DOM/HTML assertions (require a Crawler)
$this->assertSelectorExists('h1');
$this->assertSelectorNotExists('.error');
$this->assertSelectorTextContains('h1', 'Welcome');
$this->assertSelectorTextSame('title', 'Home Page');
$this->assertSelectorCount(3, '.card');

// Form assertions
$this->assertInputValueSame('contact[name]', 'Jasser');

// JSON path assertions (Symfony 6.3+)
$this->assertJsonContains(['status' => 'ok']);
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Framework-specific testing features"](https://symfonycasts.com/search?q=framework-specific%2Btesting%2Bfeatures)
