## Client object - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
public function testClientMethods(): void
{
    $client = static::createClient();

    // Basic request
    $client->request('GET', '/caching/types');
    $this->assertResponseIsSuccessful();

    // Request with headers
    $client->request('GET', '/http/negotiate', [], [], [
        'HTTP_ACCEPT' => 'application/json',
    ]);
    $this->assertResponseHeaderSame('Content-Type', 'application/json');

    // Follow redirects
    $client->followRedirects();
    $client->request('GET', '/old-products');
    $this->assertResponseIsSuccessful();

    // Get the response
    $response = $client->getResponse();
    $statusCode = $response->getStatusCode();
    $content = $response->getContent();

    $this->assertSame(200, $statusCode);
}
```

**Key `Client` methods:**
- `request(method, uri, parameters, files, server, content)`
- `getResponse()`
- `getCrawler()` — DOM parser
- `followRedirect()` / `followRedirects()`
- `back()`, `forward()`, `reload()`
- `submitForm()`
- `clickLink()`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Client object"](https://symfonycasts.com/search?q=client%2Bobject)
