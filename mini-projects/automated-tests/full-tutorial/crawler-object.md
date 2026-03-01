## Crawler object - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
public function testCrawlerOnHtmlPage(): void
{
    $client = static::createClient();
    $crawler = $client->request('GET', '/twig/inheritance');

    // CSS selector assertions
    $this->assertSelectorExists('h2');
    $this->assertSelectorTextContains('h2', 'Template Inheritance');

    // Crawler methods
    $heading = $crawler->filter('h2')->first()->text();
    $this->assertSame('Template Inheritance Demo', $heading);

    // Count elements
    $this->assertGreaterThan(0, $crawler->filter('div')->count());

    // Link clicking
    // $link = $crawler->selectLink('Filters page')->link();
    // $client->click($link);
    // $this->assertResponseIsSuccessful();
}
```

**Key `Crawler` methods:**
- `filter('css selector')` — CSS selector.
- `filterXPath('//div')` — XPath.
- `text()` — Get text content.
- `html()` — Get inner HTML.
- `attr('href')` — Get attribute.
- `count()` — Number of matched elements.
- `selectLink('text')` / `selectButton('text')` — Find links/buttons.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Crawler object"](https://symfonycasts.com/search?q=crawler%2Bobject)
