## Functional tests with HttpKernel - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
mkdir -p tests/Controller
touch tests/Controller/PhpTopicControllerTest.php
```

```php
<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PhpTopicControllerTest extends WebTestCase
{
    public function testApiDemoReturns200(): void
    {
        $client = static::createClient();
        $client->request('GET', '/php/api-demo');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('Content-Type', 'application/json');

        $content = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('first_over_100', $content);
    }

    public function testNonexistentRouteReturns404(): void
    {
        $client = static::createClient();
        $client->request('GET', '/nonexistent');

        $this->assertResponseStatusCodeSame(404);
    }

    public function testPostEndpoint(): void
    {
        $client = static::createClient();
        $client->request('POST', '/http/request-json', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode(['key' => 'value']));

        $this->assertResponseIsSuccessful();
    }
}
```

**Step 4:** Run:

```bash
php bin/phpunit tests/Controller/PhpTopicControllerTest.php
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Functional tests with HttpKernel"](https://symfonycasts.com/search?q=functional%2Btests%2Bwith%2Bhttpkernel)
