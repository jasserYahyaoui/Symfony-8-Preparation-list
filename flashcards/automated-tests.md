# Flashcards : Automated Tests (Symfony 8.0)
> Exhaustive deck — updated with PHPUnit assertions. Doctrine-specific items removed. All official exam sub-topics covered.

---

### Unit tests with PHPUnit

**Q: What is the difference between a unit test and a functional test in Symfony?**
**A:** A **unit test** tests a single class/function in isolation, with mocked dependencies —  no Symfony kernel, no HTTP, no database. A **functional test** boots the Symfony kernel, makes HTTP requests via a client, and tests the whole application stack.
**Code Snippet:**
```php
// Unit test: no kernel, no HTTP
class DiscountCalculatorTest extends TestCase {
    public function testApplyDiscount(): void {
        $calc = new DiscountCalculator();
        self::assertSame(90.0, $calc->apply(100.0, 10));
    }
}
```

---

**Q: What base class should all plain unit tests extend?**
**A:** `PHPUnit\Framework\TestCase`. No Symfony-specific base needed. Use `KernelTestCase` only when you need the DI container.
**Code Snippet:**
```php
use PHPUnit\Framework\TestCase;

class ProductTest extends TestCase {
    public function testFullName(): void {
        $product = new Product('Widget', 'Pro');
        self::assertSame('Widget Pro', $product->getFullName());
    }
}
```

---

**Q: How do you create a mock of an interface/class in PHPUnit?**
**A:** Use `$this->createMock(ClassName::class)` or `$this->createStub()`. Configure return values with `method()` + `willReturn()`. Expectations with `expects()`.
**Code Snippet:**
```php
$mailer = $this->createMock(MailerInterface::class);
$mailer->expects($this->once())
    ->method('send')
    ->with($this->isInstanceOf(Email::class));

$service = new OrderService($mailer);
$service->placeOrder($order);
```

---

**Q: What is the difference between `createMock()` and `createStub()` in PHPUnit?**
**A:** `createMock()` — verifies method call expectations (spy/mock behavior). `createStub()` — only controls return values, no call count expectations (pure stub). Use stubs when you only care about what the dependency returns, not how many times it's called.
**Code Snippet:**
```php
$stub = $this->createStub(PriceCalculator::class);
$stub->method('calculate')->willReturn(99.99);
```

---

**Q: What is a data provider in PHPUnit and how do you use it?**
**A:** A static method (or attribute) that returns an iterable of argument arrays. PHPUnit runs the test once per data set. Use `#[DataProvider('methodName')]` attribute.
**Code Snippet:**
```php
#[DataProvider('providePrices')]
public function testDiscount(float $price, float $expected): void {
    self::assertSame($expected, (new Calculator())->apply10pct($price));
}

public static function providePrices(): array {
    return [
        'standard' => [100.0, 90.0],
        'zero' => [0.0, 0.0],
    ];
}
```

---

### Functional tests with PHPUnit

**Q: What base class do Symfony functional tests extend and what does it provide?**
**A:** `Symfony\Bundle\FrameworkBundle\Test\WebTestCase`. It provides `static::createClient()` to create a `KernelBrowser` and boots the Symfony kernel automatically.
**Code Snippet:**
```php
class ProductControllerTest extends WebTestCase {
    public function testProductList(): void {
        $client = static::createClient();
        $crawler = $client->request('GET', '/products');
        self::assertResponseIsSuccessful();
        self::assertSelectorExists('table.products');
    }
}
```

---

**Q: How do you set up test environment configuration in Symfony?**
**A:** A `config/packages/test/` directory can override any package config for the `test` environment. Use `.env.test` or `.env.test.local` for environment variables.
**Code Snippet:**
```yaml
# config/packages/test/framework.yaml
framework:
    test: true
    session:
        storage_factory_id: session.storage.factory.mock_file
```

---

**Q: What is `KernelTestCase` vs `WebTestCase`?**
**A:** `KernelTestCase` boots the kernel for DI container access, but does NOT create an HTTP client (no request/response simulation). `WebTestCase extends KernelTestCase` and adds `createClient()` for HTTP simulation.
**Code Snippet:**
```php
// KernelTestCase: test a service directly
class OrderServiceTest extends KernelTestCase {
    public function testProcess(): void {
        $service = static::getContainer()->get(OrderService::class);
        // ...
    }
}
```

---

### Client object

**Q: How do you use the test client to make an HTTP request and what does it return?**
**A:** `$client->request(method, url, parameters, files, server, content)`. Returns a `Crawler` object for the response body. Response is accessible via `$client->getResponse()`.
**Code Snippet:**
```php
$crawler = $client->request('GET', '/api/products');
self::assertResponseStatusCodeSame(200);

$crawler = $client->request('POST', '/login', [
    '_username' => 'admin',
    '_password' => 'secret',
    '_csrf_token' => $token,
]);
```

---

**Q: How do you simulate an authenticated user in a functional test?**
**A:** Use `$client->loginUser($user)` to log in a `UserInterface` object without going through the full authentication form.
**Code Snippet:**
```php
$user = static::getContainer()->get(UserRepository::class)->findOneBy(['email' => 'admin@example.com']);
$client->loginUser($user);
$client->request('GET', '/admin/dashboard');
self::assertResponseIsSuccessful();
```

---

**Q: How do you submit a form in a functional test?**
**A:** Use `$crawler->selectButton('Submit')->form()` to get a `Form` object, fill in fields, then `$client->submit($form)`.
**Code Snippet:**
```php
$crawler = $client->request('GET', '/contact');
$form = $crawler->selectButton('Send')->form([
    'contact[name]' => 'John',
    'contact[email]' => 'john@example.com',
    'contact[message]' => 'Hello!',
]);
$client->submit($form);
self::assertResponseRedirects('/contact/success');
```

---

### Crawler object (CssSelector and DomCrawler components)

**Q: How do you select DOM nodes using the Crawler object?**
**A:** Use `$crawler->filter('css selector')` for CSS selectors or `$crawler->filterXPath('xpath')` for XPath. Returns a new Crawler limited to matching nodes.
**Code Snippet:**
```php
$h1 = $crawler->filter('h1')->text();
$rows = $crawler->filter('table.products tr');
$count = $rows->count();

$link = $crawler->filter('a[href="/products"]')->link();
$client->click($link);
```

---

**Q: What methods does the Crawler provide for navigating the DOM?**
**A:** `filter()`, `filterXPath()`, `first()`, `last()`, `eq(n)`, `children()`, `parents()`, `nextAll()`, `previousAll()`, `closest()`, `selectLink()`, `selectButton()`, `links()`, `text()`, `html()`, `attr('name')`.
**Code Snippet:**
```php
$secondRow = $crawler->filter('tr')->eq(1);
$href = $crawler->filter('a.read-more')->attr('href');
$allLinks = $crawler->filter('nav a')->links(); // array of Link objects
```

---

**Q: What is the `CssSelector` component and what does it do?**
**A:** It converts CSS selectors into XPath expressions. This is how the `Crawler::filter()` method works internally — CSS is translated to XPath for DOM querying.
**Code Snippet:** N/A *(internal component — no direct usage required by exam)*

---

### Profiler object (WebProfiler bundle)

**Q: How do you access the Profiler in a functional test to assert on internal data?**
**A:** Enable the profiler, make a request, then call `$client->getProfile()` to get the profiler for that request. Access collectors via `$profile->getCollector('name')`.
**Code Snippet:**
```php
$client->enableProfiler();
$client->request('POST', '/order');
$profile = $client->getProfile();

// Check email count:
$mailerProfile = $profile->getCollector('mailer');
self::assertSame(1, $mailerProfile->getMessageCount());
```

---

**Q: What is the `db` data collector in the Profiler and what does it expose?**
**A:** Records Doctrine queries (query count, time). In tests: `$profile->getCollector('db')->getQueryCount()`. Note: Doctrine is OUT OF SCOPE for exam, but the Profiler infrastructure itself is in scope.
**Code Snippet:** N/A *(Doctrine queries excluded from exam scope)*

---

### Framework objects access

**Q: How do you retrieve a service from the container in a `KernelTestCase` test?**
**A:** Use `static::getContainer()->get(ServiceClass::class)`. The test container exposes all services including private ones (unlike the production container).
**Code Snippet:**
```php
$service = static::getContainer()->get(OrderService::class);
// Note: in production, private services are not accessible via get()
// The test container makes them accessible for testing purposes
```

---

**Q: How do you replace a real service with a mock in an integration/functional test?**
**A:** Use `static::getContainer()->set(ServiceClass::class, $mock)` after creating the client/kernel. The service must be declared `synthetic: true` or be public in the test environment.
**Code Snippet:**
```php
$mock = $this->createMock(PaymentGateway::class);
$mock->method('charge')->willReturn(true);
static::getContainer()->set(PaymentGateway::class, $mock);
```

---

### Client configuration

**Q: How do you configure the test client to not follow redirects automatically?**
**A:** Pass `['followRedirects' => false]` or call `$client->followRedirects(false)`. Then check `assertResponseRedirects()` and manually follow with `$client->followRedirect()`.
**Code Snippet:**
```php
$client->followRedirects(false);
$client->request('POST', '/register', [/* ... */]);
self::assertResponseRedirects('/dashboard');
$client->followRedirect(); // manual follow
```

---

**Q: How do you set custom request headers for a test client request?**
**A:** Pass server vars in the format `HTTP_HEADER_NAME` as the 5th argument to `request()`.
**Code Snippet:**
```php
$client->request(
    'GET', '/api/me',
    [], [], // parameters, files
    ['HTTP_AUTHORIZATION' => 'Bearer '.$apiToken, 'HTTP_ACCEPT' => 'application/json']
);
```

---

### Request and response objects introspection

**Q: How do you access the Response object after a client request?**
**A:** `$client->getResponse()`. It is a standard Symfony `Response` object.
**Code Snippet:**
```php
$client->request('GET', '/api/products');
$response = $client->getResponse();
self::assertSame(200, $response->getStatusCode());
$data = json_decode($response->getContent(), true);
```

---

**Q: How do you access the internal Request object of the last test request?**
**A:** `$client->getRequest()` returns the Symfony `Request` object that was processed.
**Code Snippet:**
```php
$request = $client->getRequest();
self::assertSame('application/json', $request->headers->get('Accept'));
```

---

### PHPUnit assertions

**Q: What are the 6 most important Symfony-specific assertion methods in `WebTestCase`/`KernelTestCase`?**
**A:**
1. `assertResponseIsSuccessful()` — 2xx status
2. `assertResponseStatusCodeSame(200)` — exact code
3. `assertResponseRedirects('/url', 302)` — redirect
4. `assertSelectorTextContains('h1', 'Expected')` — DOM text
5. `assertSelectorExists('.alert-success')` — element exists
6. `assertPageTitleContains('My Page')` — title check
**Code Snippet:**
```php
self::assertResponseIsSuccessful();
self::assertResponseStatusCodeSame(201);
self::assertSelectorTextContains('h1', 'Products');
self::assertSelectorExists('.flash-success');
```

---

**Q: List 8 essential PHPUnit assertion methods for unit tests.**
**A:**
1. `assertTrue($val)` / `assertFalse($val)`
2. `assertSame($expected, $actual)` — strict equality + same type
3. `assertEquals($expected, $actual)` — loose equality
4. `assertNull($val)` / `assertNotNull($val)`
5. `assertCount($n, $array)`
6. `assertInstanceOf(ClassName::class, $obj)`
7. `assertStringContainsString('needle', 'haystack')`
8. `assertThrows(Exception::class, fn() => $risky())`
**Code Snippet:**
```php
self::assertSame(42, $result);
self::assertCount(3, $items);
self::assertInstanceOf(Order::class, $order);
self::assertStringContainsString('hello', $greeting);
```

---

**Q: What is the difference between `assertSame()` and `assertEquals()` in PHPUnit?**
**A:** `assertSame()` uses `===` (strict: value AND type must match, objects must be same instance). `assertEquals()` uses `==` (loose: `'1'` equals `1`). Always prefer `assertSame()` to avoid subtle bugs.
**Code Snippet:**
```php
self::assertSame(1, 1);      // pass
self::assertSame(1, '1');    // FAIL (different types)
self::assertEquals(1, '1'); // pass (loose)
```

---

**Q: How do you test that a specific exception is thrown using PHPUnit?**
**A:** Use `$this->expectException(ExceptionClass::class)` before the code that should throw. Optionally chain `expectExceptionMessage()`.
**Code Snippet:**
```php
$this->expectException(\InvalidArgumentException::class);
$this->expectExceptionMessage('Value must be positive');
new Product(-5); // should throw
```

---

### Handling legacy deprecated code

**Q: What is `SYMFONY_DEPRECATIONS_HELPER` and what does it do in tests?**
**A:** An environment variable that configures how PHPUnit handles deprecation warnings. Setting it to `max[self]=0` means any deprecation from your own code fails the test.
**Code Snippet:**
```bash
SYMFONY_DEPRECATIONS_HELPER=max[self]=0 php bin/phpunit
```
```xml
<!-- phpunit.xml.dist -->
<php>
    <env name="SYMFONY_DEPRECATIONS_HELPER" value="max[self]=0"/>
</php>
```

---
