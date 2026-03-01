# Quiz : Automated Tests (Symfony 8.0 Certification)
> Exam-grade mock test — 100+ questions based on official Symfony 8.0 syllabus.

---

## Unit tests with PHPUnit

### Q1: What base class should a standard unit test extend in a Symfony 8 application?
**Type:** Single answer
- [ ] A) `Symfony\Bundle\FrameworkBundle\Test\WebTestCase`
- [ ] B) `PHPUnit\Framework\TestCase`
- [ ] C) `Symfony\Bundle\FrameworkBundle\Test\KernelTestCase`
- [ ] D) `Symfony\Component\Console\Tester\CommandTester`

**Correct Answer(s):** B
**Explanation:** Unit tests do not require the Symfony kernel or container to boot. Therefore, they extend PHPUnit's native `TestCase` directly.
**Reference:** https://symfony.com/doc/8.0/testing.html#unit-tests

### Q2: It is a best practice to fetch active database connection services during a unit test.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Unit tests assert the behavior of a single, isolated class. Interacting with databases turns it into an integration test. You should mock dependencies instead.
**Reference:** https://symfony.com/doc/8.0/testing.html#unit-tests

### Q3: How do you create a basic mock object using PHPUnit's built-in framework inside a test case?
**Type:** Single answer
- [ ] A) `new Mock(LoggerInterface::class)`
- [ ] B) `static::getContainer()->getMock(LoggerInterface::class)`
- [ ] C) `$this->createMock(LoggerInterface::class)`
- [ ] D) `$this->getMockBuilder(LoggerInterface::class)->build()`

**Correct Answer(s):** C
**Explanation:** `createMock()` creates a test double where all methods return `null` by default. `getMockBuilder()` is only needed for complex mock configurations.
**Reference:** https://phpunit.readthedocs.io/en/9.6/test-doubles.html

### Q4: Which method chain correctly asserts that a mock's method was called exactly once and forces it to return a specific value?
```php
$mock = $this->createMock(MyApi::class);
// What goes here?
```
**Type:** Single answer
- [ ] A) `$mock->shouldReceive('getData')->once()->andReturn(['id' => 1]);`
- [ ] B) `$mock->assertCalled('getData', 1)->willReturn(['id' => 1]);`
- [ ] C) `$mock->expects($this->once())->method('getData')->willReturn(['id' => 1]);`
- [ ] D) `$this->assertMethodCalled($mock, 'getData', 1);`

**Correct Answer(s):** C
**Explanation:** Option C uses the correct PHPUnit expectation API. Option A is Mockery syntax, not native PHPUnit. 
**Reference:** https://phpunit.readthedocs.io/en/9.6/test-doubles.html

### Q5: In PHPUnit 10/11+, how do you run the same test method multiple times with different datasets?
**Type:** Single answer
- [ ] A) By calling `$this->runWithData()` inside the test.
- [ ] B) By using the `@dataProvider` PHPDoc annotation.
- [ ] C) By using the `#[DataProvider]` PHP attribute pointing to a provider method.
- [ ] D) By writing a `foreach` loop inside the test method.

**Correct Answer(s):** C
**Explanation:** PHPUnit has migrated from PHPDoc annotations to native PHP attributes like `#[DataProvider]`.
**Reference:** https://phpunit.readthedocs.io/en/11.0/writing-tests-for-phpunit.html#data-providers

### Q6: If your class under test throws an exception, how do you assert it in PHPUnit?
```php
public function testExceptionIsThrown(): void
{
    // ... setup ...
    $calculator->divide(10, 0);
}
```
**Type:** Single answer
- [ ] A) Call `$this->assertThrows(\InvalidArgumentException::class);` after the code.
- [ ] B) Call `$this->expectException(\InvalidArgumentException::class);` before the code.
- [ ] C) Wrap the code in a `try/catch` and assert the catch block was reached.
- [ ] D) Call `$calculator->expectException(\InvalidArgumentException::class);`

**Correct Answer(s):** B
**Explanation:** You must call `expectException` _before_ invoking the code that is supposed to trigger the exception.
**Reference:** https://phpunit.readthedocs.io/en/9.6/writing-tests-for-phpunit.html#testing-exceptions

### Q7: How do you mock a service that is injected into your class via constructor injection for a unit test?
**Type:** Single answer
- [ ] A) Use `static::getContainer()->set()` to override the service.
- [ ] B) Create the mock and pass it manually when instantiating the class via `new`.
- [ ] C) Add the `#[Mock]` attribute to the class property.
- [ ] D) You cannot mock constructor-injected services.

**Correct Answer(s):** B
**Explanation:** In a unit test, there is no DI Container. You are responsible for instantiating the class manually and providing its mocked dependencies.
**Reference:** https://symfony.com/doc/8.0/testing.html#unit-tests

### Q8: What method is called by PHPUnit immediately before every single test method executes?
**Type:** Single answer
- [ ] A) `__construct()`
- [ ] B) `initialize()`
- [ ] C) `setUp()`
- [ ] D) `beforeTest()`

**Correct Answer(s):** C
**Explanation:** `setUp()` is used to initialize shared objects or reset state needed by the tests. `tearDown()` is called after each test.
**Reference:** https://phpunit.readthedocs.io/en/9.6/fixtures.html

### Q9: What happens if a unit test class is placed in the `tests/` directory but the filename is `Calculator.php`?
**Type:** Single answer
- [ ] A) PHPUnit runs the tests normally.
- [ ] B) PHPUnit throws a `ClassNotFoundException`.
- [ ] C) PHPUnit ignores the file completely.
- [ ] D) Symfony caches it but does not execute it.

**Correct Answer(s):** C
**Explanation:** By default, PHPUnit's file discovery mechanism looks exclusively for files ending with the suffix `Test.php`.
**Reference:** https://phpunit.readthedocs.io/en/9.6/writing-tests-for-phpunit.html

### Q10: How do you mark a unit test as skipped programmatically inside the test method?
**Type:** Single answer
- [ ] A) `throw new SkippedException();`
- [ ] B) `return false;`
- [ ] C) `$this->skipTest();`
- [ ] D) `$this->markTestSkipped('Reason');`

**Correct Answer(s):** D
**Explanation:** This halts the test execution immediately and marks it as 'Skipped' (S) in the PHPUnit output rather than failing it.
**Reference:** https://phpunit.readthedocs.io/en/9.6/incomplete-and-skipped-tests.html

### Q11: What is the purpose of `$this->createPartialMock()` in PHPUnit?
**Type:** Single answer
- [ ] A) It mocks an interface without implementing any methods.
- [ ] B) It mocks only specific methods of a class, leaving the others to execute their real logic.
- [ ] C) It creates a mock that is only valid for half of the test duration.
- [ ] D) It creates an abstract class mock.

**Correct Answer(s):** B
**Explanation:** Useful when testing a class but needing to isolate one specific internal API call while keeping the rest of the actual class logic intact.
**Reference:** https://phpunit.readthedocs.io/en/9.6/test-doubles.html

### Q12: How do you assert that an array contains a specific key in PHPUnit?
**Type:** Single answer
- [ ] A) `$this->assertArrayHasKey('username', $data);`
- [ ] B) `$this->assertKeyExists('username', $data);`
- [ ] C) `$this->assertTrue(isset($data['username']));`
- [ ] D) `$this->assertContains('username', array_keys($data));`

**Correct Answer(s):** A
**Explanation:** `assertArrayHasKey()` is the dedicated, expressive assertion for explicitly verifying the presence of a key, yielding better failure messages than `assertTrue`.
**Reference:** https://phpunit.readthedocs.io/en/9.6/assertions.html#assertarrayhaskey

### Q13: In PHPUnit, what is the fundamental difference between `assertEquals()` and `assertSame()`?
**Type:** Multiple choice
- [ ] A) `assertEquals()` uses loose comparison (`==`).
- [ ] B) `assertEquals()` uses strict comparison (`===`).
- [ ] C) `assertSame()` ensures that variables reference the exact same object instance.
- [ ] D) `assertSame()` is only used for strings.

**Correct Answer(s):** A, C
**Explanation:** `assertSame()` ensures identical type/value and identical object references, whereas `assertEquals` checks values neutrally.
**Reference:** https://phpunit.readthedocs.io/en/9.6/assertions.html#assertsame

### Q14: How do you configure PHPUnit to run a specific group of tests via the CLI?
**Type:** Single answer
- [ ] A) `php bin/phpunit --filter=api`
- [ ] B) `php bin/phpunit --group=api`
- [ ] C) `php bin/phpunit -g api`
- [ ] D) Both B and C

**Correct Answer(s):** D
**Explanation:** Assuming tests are tagged with `#[Group('api')]`, using either `--group` or the shorthand `-g` will execute only that subset.
**Reference:** https://phpunit.readthedocs.io/en/9.6/textui.html#command-line-options

### Q15: Which PHP attributes can tell PHPUnit 10+ to ignore or permanently skip a test method without adding logic inside the method?
**Type:** Multiple choice
- [ ] A) `#[Ignore]`
- [ ] B) `#[SkipTest]`
- [ ] C) `#[RequiresPhpExtension('redis')]`
- [ ] D) `#[RequiresPhp('8.4')]`

**Correct Answer(s):** A, C, D
**Explanation:** Attributes allow you to set strict environmental requirements or permanently skip tests without adding PHP `markTestSkipped` logic inside the method body.
**Reference:** https://phpunit.readthedocs.io/en/11.0/attributes.html

---

## Functional tests with PHPUnit

### Q16: What base class must a Symfony functional test extend to easily make HTTP requests against the application?
**Type:** Single answer
- [ ] A) `PHPUnit\Framework\TestCase`
- [ ] B) `Symfony\Bundle\FrameworkBundle\Test\WebTestCase`
- [ ] C) `Symfony\Bundle\FrameworkBundle\Test\KernelTestCase`
- [ ] D) `Symfony\Component\BrowserKit\TestCase`

**Correct Answer(s):** B
**Explanation:** `WebTestCase` boots the Symfony kernel automatically and provides the `createClient()` method to simulate HTTP requests.
**Reference:** https://symfony.com/doc/8.0/testing.html#functional-tests

### Q17: If you only need access to the Dependency Injection Container but do NOT need to simulate HTTP browser requests, what class should you extend?
**Type:** Single answer
- [ ] A) `WebTestCase`
- [ ] B) `IntegrationTestCase`
- [ ] C) `ContainerTestCase`
- [ ] D) `KernelTestCase`

**Correct Answer(s):** D
**Explanation:** `KernelTestCase` boots the kernel and exposes the container via `static::getContainer()`, making it faster/lighter than `WebTestCase` for non-HTTP integration tests.
**Reference:** https://symfony.com/doc/8.0/testing.html#integration-tests

### Q18: Are real HTTP requests sent over the physical network when using `$client->request()` inside `WebTestCase`?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** The client (`KernelBrowser`) creates a synthetic `Request` object and passes it directly to the Symfony Kernel's `handle()` method. No web server (like Nginx) or actual network activity is involved.
**Reference:** https://symfony.com/doc/8.0/testing.html#making-requests

### Q19: By default, what environment does `WebTestCase` boot the Symfony kernel in?
**Type:** Single answer
- [ ] A) `dev`
- [ ] B) `test`
- [ ] C) `prod`
- [ ] D) Whatever is set in the local `.env.local`

**Correct Answer(s):** B
**Explanation:** It forces the environment to `test` by default, activating configurations defined in `config/packages/test/`.
**Reference:** https://symfony.com/doc/8.0/testing.html#set-up-your-test-environment

### Q20: How do you override Kernel environment options before creating the test client?
**Type:** Single answer
- [ ] A) `putenv('APP_ENV=prod'); $client = static::createClient();`
- [ ] B) `$client = static::createClient(['environment' => 'prod', 'debug' => false]);`
- [ ] C) `$client = static::createClient('prod', false);`
- [ ] D) `static::$kernel->setEnvironment('prod');`

**Correct Answer(s):** B
**Explanation:** Passing an array of kernel options to `createClient()` allows you to test how the application behaves in production mode without debug tools enabled.
**Reference:** https://symfony.com/doc/8.0/testing.html#customizing-the-client

### Q21: What happens to the database automatically between functional tests in native Symfony?
**Type:** Single answer
- [ ] A) Elements inserted by the test are deleted automatically via a transaction rollback.
- [ ] B) The database is dropped and recreated.
- [ ] C) Nothing. The database state persists unless you manually intervene.
- [ ] D) The schema is updated automatically.

**Correct Answer(s):** C
**Explanation:** Symfony does not automatically reset databases natively. You must use third-party bundles (like DAMADoctrineTestBundle) or run schema scripts before tests.
**Reference:** https://symfony.com/doc/8.0/testing.html#resetting-the-database-automatically

### Q22: What happens to the Dependency Injection container between test methods in a `WebTestCase`?
**Type:** Single answer
- [ ] A) The exactly same instantiated container object is shared across all test methods to save memory.
- [ ] B) The kernel is shut down, and a fresh container is served for every test method.
- [ ] C) It is cleared only if you call `static::clearContainer()`.
- [ ] D) It is serialized and unserialized.

**Correct Answer(s):** B
**Explanation:** The kernel is shut down at the end of every test method (during `tearDown()`) to ensure absolute test isolation. 
**Reference:** https://symfony.com/doc/8.0/testing.html#functional-tests

### Q23: How do you assert that a functional test successfully returned a 200-299 HTTP status code?
**Type:** Single answer
- [ ] A) `$this->assertEquals(200, $client->getResponse()->getStatusCode());`
- [ ] B) `$this->assertResponseIsSuccessful();`
- [ ] C) `$this->assertTrue($client->getResponse()->isSuccessful());`
- [ ] D) Either B or C, though B is the native BrowserKit assertion.

**Correct Answer(s):** D
**Explanation:** `$this->assertResponseIsSuccessful()` is the dedicated, expressive assertion provided by Symfony's BrowserKit, though manually checking `isSuccessful()` is technically valid.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q24: How do you access the Kernel instance inside a `KernelTestCase` or `WebTestCase` after it has been booted?
**Type:** Single answer
- [ ] A) `static::$kernel`
- [ ] B) `$this->getKernel()`
- [ ] C) `static::getContainer()->get('kernel')`
- [ ] D) Both A and C

**Correct Answer(s):** D
**Explanation:** `static::$kernel` stores the booted kernel directly. You can also fetch it from the container. 
**Reference:** https://symfony.com/doc/8.0/testing.html#integration-tests

### Q25: Why is `static::createClient()` implemented as a static method?
**Type:** Multiple choice
- [ ] A) To allow the client to manage the static Kernel instance safely.
- [ ] B) To prevent maintaining non-static test state that could leak between test methods.
- [ ] C) Because non-static methods cannot make HTTP requests in PHPUnit.
- [ ] D) So it can be called from Data Providers before the class is instantiated.

**Correct Answer(s):** A, B
**Explanation:** It manages the static Kernel property internally and guarantees the environment boots predictably devoid of lingering object states from previous tests.
**Reference:** https://symfony.com/doc/8.0/testing.html#functional-tests

### Q26: Can you call `static::createClient()` multiple times in the same test method to simulate different users?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Yes, this simulates concurrent users interacting with the application. Each client maintains its own cookie jar and session history.
**Reference:** https://symfony.com/doc/8.0/testing.html#customizing-the-client

### Q27: How can you verify that a specific PHP exception was thrown during a request in a functional test, bypassing the HTML error page?
**Type:** Single answer
- [ ] A) It is impossible; Symfony always intercepts exceptions to render a 500 error page.
- [ ] B) Set `APP_ENV=prod`.
- [ ] C) Call `$client->catchExceptions(false);` before the request.
- [ ] D) Use `$this->expectException()` immediately after `$client->request()`.

**Correct Answer(s):** C
**Explanation:** Disabling exception catching on the KernelBrowser allows the raw PHP exception to bubble up to PHPUnit, allowing you to use `$this->expectException()`.
**Reference:** https://symfony.com/doc/8.0/testing.html#debugging-functional-tests

### Q28: How do you explicitly assert that the response is a 404 Not Found using BrowserKit assertions?
**Type:** Single answer
- [ ] A) `$this->assertResponseIsNotFound();`
- [ ] B) `$this->assertResponseStatusCodeSame(404);`
- [ ] C) `$this->assertHttpStatusCode(404);`
- [ ] D) `$this->assertEquals(404, $client->getStatus());`

**Correct Answer(s):** B
**Explanation:** This BrowserKit assertion strictly compares the HTTP status of the kernel response against the provided integer.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q29: Does `WebTestCase` support session persistence (cookies) between multiple `$client->request()` calls made by the same client instance?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** The `KernelBrowser` mimics a real browser session. Cookies and session identifiers are stored in its internal cookie jar and sent with subsequent requests automatically.
**Reference:** https://symfony.com/doc/8.0/testing.html#browsing-the-site

### Q30: How do you properly test a redirect response using the client?
**Type:** Single answer
- [ ] A) The client automatically follows it, so just assert the final page content.
- [ ] B) The client ignores it; wait 3 seconds and retry.
- [ ] C) `$client->request()`, assert the redirect status (3xx), then manually call `$client->followRedirect()`.
- [ ] D) Pass `['redirect' => true]` to the `request()` method.

**Correct Answer(s):** C
**Explanation:** The client does NOT follow redirects automatically by default. You must assert the redirect is correct, then order the client to simulate the navigation.
**Reference:** https://symfony.com/doc/8.0/testing.html#redirecting

---

## Client Object (KernelBrowser)

### Q31: What exact class instance does the `static::createClient()` method return?
**Type:** Single answer
- [ ] A) `Symfony\Component\HttpClient\HttpClient`
- [ ] B) `Symfony\Component\BrowserKit\HttpBrowser`
- [ ] C) `Symfony\Bundle\FrameworkBundle\KernelBrowser`
- [ ] D) `Symfony\Component\HttpFoundation\Request`

**Correct Answer(s):** C
**Explanation:** It extends the abstract BrowserKit implementation and is specifically wired to communicate directly with the Symfony Kernel without networking.
**Reference:** https://symfony.com/doc/8.0/testing.html#making-requests

### Q32: How do you submit a raw JSON payload (e.g., to test an API endpoint) using the `KernelBrowser`?
```php
$client->request(
    'POST', 
    '/api', 
    [], 
    [], 
    ['CONTENT_TYPE' => 'application/json'], 
    // What goes here?
);
```
**Type:** Single answer
- [ ] A) Pass the JSON string as the 6th argument (`$content`).
- [ ] B) Pass the JSON string inside the 3rd argument (`$parameters`).
- [ ] C) You must use `json_decode()` and pass an array.
- [ ] D) `KernelBrowser` cannot submit raw payloads.

**Correct Answer(s):** A
**Explanation:** The 6th parameter of `request()` allows injecting raw body content string. The 3rd parameter is only for URL-encoded form data.
**Reference:** https://symfony.com/doc/8.0/testing.html#making-requests

### Q33: How do you set HTTP headers on the Client before making a request?
**Type:** Single answer
- [ ] A) `$client->setHeader('Accept-Language', 'fr');`
- [ ] B) Pass them in the 5th argument (`$server`) array of `request()`, prefixed with `HTTP_`.
- [ ] C) `$client->getRequest()->headers->set('Accept-Language', 'fr');`
- [ ] D) Inject a `HeaderBag` service into the container.

**Correct Answer(s):** B
**Explanation:** Following standard PHP `$_SERVER` array conventions, standard headers sent to the Kernel must be prefixed with `HTTP_` and capitalized (e.g., `HTTP_ACCEPT_LANGUAGE`).
**Reference:** https://symfony.com/doc/8.0/testing.html#customizing-the-client

### Q34: What happens if you run `$client->followRedirects(true);` before making a request?
**Type:** Single answer
- [ ] A) The test fails immediately.
- [ ] B) The client will throw an exception if a redirect occurs.
- [ ] C) The client will automatically jump to the target URL natively every time it catches a 3xx redirect response.
- [ ] D) It has no effect; you must use `followRedirect()`.

**Correct Answer(s):** C
**Explanation:** Enabling this feature saves you from calling `$client->followRedirect()` manually after every submission, which is useful when testing forms.
**Reference:** https://symfony.com/doc/8.0/testing.html#redirecting

### Q35: How do you retrieve the exact `Response` object after making a request with the Client?
**Type:** Single answer
- [ ] A) `$response = $client->request('GET', '/');`
- [ ] B) `$response = $client->getResponse();`
- [ ] C) `$response = static::$kernel->getResponse();`
- [ ] D) `$response = $client->getLatestResponse();`

**Correct Answer(s):** B
**Explanation:** The `request()` method returns a `Crawler`. To inspect the raw response headers or view the status code, you must call `$client->getResponse()`.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q36: How do you retrieve the Symfony Container directly from the initialized Client?
**Type:** Single answer
- [ ] A) `$client->getContainer()`
- [ ] B) `$client->getKernel()->getContainer()`
- [ ] C) `$client->container`
- [ ] D) You physically cannot; you must use `static::getContainer()`.

**Correct Answer(s):** A
**Explanation:** `KernelBrowser` provides the fluent `getContainer()` method, exposing the test DI container to fetch services or parameters quickly.
**Reference:** https://symfony.com/doc/8.0/testing.html#retrieving-services-in-the-test

### Q37: How do you simulate an AJAX (XMLHttpRequest) request using the Client?
**Type:** Single answer
- [ ] A) `$client->ajax('GET', '/api');`
- [ ] B) Pass `['ajax' => true]` to the options array.
- [ ] C) Pass the `HTTP_X_REQUESTED_WITH` header to the `$server` array.
- [ ] D) `$client->xmlHttpRequest('GET', '/api');`

**Correct Answer(s):** C
**Explanation:** Symfony's internal `$request->isXmlHttpRequest()` evaluates exclusively based on the presence of the `X-Requested-With: XMLHttpRequest` header.
**Reference:** https://symfony.com/doc/8.0/testing.html#ajax-requests

### Q38: How do you simulate an HTTP Basic Authentication login for a single request?
**Type:** Single answer
- [ ] A) `$client->request('GET', '/admin', auth: ['admin', 'secret']);`
- [ ] B) Pass the `PHP_AUTH_USER` and `PHP_AUTH_PW` keys in the `$server` array of the `request()` method.
- [ ] C) `$client->login('admin', 'secret');`
- [ ] D) It is not possible with `KernelBrowser`.

**Correct Answer(s):** B
**Explanation:** The BrowserKit relies on server variables. Populating `PHP_AUTH_USER` correctly spoofs HTTP Basic Auth.
**Reference:** https://symfony.com/doc/8.0/testing.html#http-authentication

### Q39: How do you securely log in a User entity directly into the session, bypassing the actual form authentication firewall for faster tests?
**Type:** Single answer
- [ ] A) `$client->getCookieJar()->set('user_id', 1);`
- [ ] B) `$client->loginUser($user);`
- [ ] C) `$container->get('security.token_storage')->setToken($token);`
- [ ] D) `static::$kernel->login($user);`

**Correct Answer(s):** B
**Explanation:** `loginUser()` is a native helper on `WebTestCase` (and `KernelBrowser`) that generates a security token and injects it into the session, radically speeding up test suites.
**Reference:** https://symfony.com/doc/8.0/testing.html#logging-in-users-in-tests

### Q40: How do you access the internal Cookie Jar of the Client to manipulate cookies prior to a request?
**Type:** Single answer
- [ ] A) `$client->cookies()->add($cookie);`
- [ ] B) `static::$kernel->getCookieJar();`
- [ ] C) `$client->getCookieJar()->set($cookie);`
- [ ] D) `$client->getSession()->setCookie($cookie);`

**Correct Answer(s):** C
**Explanation:** The `CookieJar` holds all cookies simulating a real browser. You can modify it directly before making a request to test cookie-dependent logic.
**Reference:** https://symfony.com/doc/8.0/testing.html#browsing-the-site


## Crawler Object (CssSelector and DomCrawler components)

### Q41: Under what condition does the Client's `request()` method return a `Crawler` instance that can actually parse the DOM?
**Type:** Single answer
- [ ] A) Always, regardless of the response.
- [ ] B) Only when the HTTP response's Content-Type is `text/html` or `text/xml`.
- [ ] C) When the status code is 200.
- [ ] D) When `parse: true` is passed to the request.

**Correct Answer(s):** B
**Explanation:** If the response is a JSON payload, `request()` executes successfully, but the returned `Crawler` may be empty/invalid for DOM traversal. Use `getContent()` for APIs.
**Reference:** https://symfony.com/doc/8.0/testing.html#dom-crawler

### Q42: How do you select all elements with the class `btn-primary` using the Crawler?
**Type:** Single answer
- [ ] A) `$crawler->getElementsByClassName('btn-primary');`
- [ ] B) `$crawler->find('.btn-primary');`
- [ ] C) `$crawler->filter('.btn-primary');`
- [ ] D) `$crawler->select('.btn-primary');`

**Correct Answer(s):** C
**Explanation:** `filter()` uses the `CssSelector` component to convert CSS into XPath queries. It returns a new Crawler instance containing the matched nodes.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#node-filtering

### Q43: How do you extract an HTML attribute value from a selected node via the Crawler?
**Type:** Single answer
- [ ] A) `$crawler->filter('img')->getAttribute('src');`
- [ ] B) `$crawler->filter('img')->attr('src');`
- [ ] C) `$crawler->filter('img')->get('src');`
- [ ] D) `$crawler->filter('img')['src'];`

**Correct Answer(s):** B
**Explanation:** `attr()` requires exactly one argument—the name of the attribute—and returns its string value for the first node in the Crawler list.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#extracting-information

### Q44: If multiple nodes are selected in a single Crawler instance, what does calling `text()` return?
**Type:** Single answer
- [ ] A) A concatenated string of all text in all nodes.
- [ ] B) An array of strings.
- [ ] C) It returns the text content of only the *first* node in the selection list.
- [ ] D) It throws a `LogicException`.

**Correct Answer(s):** C
**Explanation:** Unlike Javascript's `innerText`, calling `text()` directly on a Crawler with multiple nodes does not concatenate all text. You must loop over them or use `each()`.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#node-values

### Q45: How can you retrieve the text content of ALL matched nodes as a PHP array?
**Type:** Single answer
- [ ] A) `$texts = $crawler->filter('p')->toArray();`
- [ ] B) `$texts = $crawler->filter('p')->allText();`
- [ ] C) `$texts = $crawler->filter('p')->extract(['_text']);`
- [ ] D) `$texts = $crawler->filter('p')->each(fn (Crawler $node) => $node->text());`

**Correct Answer(s):** C, D
**Explanation:** Both `extract(['_text'])` and mapping over the array with `each()` are natively supported ways to pull all textual nodes into an array.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#node-values

### Q46: How do you find a specific HTML form by its submit button text using the Crawler?
**Type:** Single answer
- [ ] A) `$crawler->filter("form:contains('Submit')")->first();`
- [ ] B) `$crawler->getFormByButton('Submit Order');`
- [ ] C) `$crawler->selectButton('Submit Order')->form();`
- [ ] D) `$crawler->findForm('Submit Order');`

**Correct Answer(s):** C
**Explanation:** `selectButton()` specifically looks for `<button>` or `<input type="submit">` by value or exact text, then `form()` traverses upward.
**Reference:** https://symfony.com/doc/8.0/testing.html#submitting-forms

### Q47: How do you fetch a specific hyperlink by its exact visible text?
**Type:** Single answer
- [ ] A) `$crawler->selectLink('Read More')->link();`
- [ ] B) `$crawler->filter('a[text="Read More"]');`
- [ ] C) `$crawler->link('Read More');`
- [ ] D) `$crawler->getLink('Read More');`

**Correct Answer(s):** A
**Explanation:** `selectLink()` searches for an anchor `<a>` tag whose exact text content, `title`, `id`, or `alt` matches.
**Reference:** https://symfony.com/doc/8.0/testing.html#interacting-with-links

### Q48: How do you submit a form while simulating the user overriding a specific field value using the Client and the matched Form object?
**Type:** Single answer
- [ ] A) `$form->setValue('user[name]', 'Fabien'); $client->submit($form);`
- [ ] B) `$client->submit($form, ['user[name]' => 'Fabien']);`
- [ ] C) `$client->request('POST', $form->getUri(), ['user[name]' => 'Fabien']);`
- [ ] D) B and C are functionally identical in effect, though B uses the native helper.

**Correct Answer(s):** D
**Explanation:** The Client handles generating the proper payload. Handing an array to `submit()` merges values safely natively.
**Reference:** https://symfony.com/doc/8.0/testing.html#submitting-forms

### Q49: How can you select a specific input field within a DomCrawler Form object to manipulate it directly?
**Type:** Single answer
- [ ] A) By treating the Form object like an array or using string notation. (e.g., `$form['user[email]']`)
- [ ] B) `$form->getField('user[email]')`
- [ ] C) `$form->filter('input[name="user[email]"]')`
- [ ] D) It is impossible; you must pass an array to `submit()`.

**Correct Answer(s):** A
**Explanation:** Symfony simplifies form manipulation by implementing `ArrayAccess`, mapping input names natively to array keys on the Form DOM object.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#forms

### Q50: How do you extract the raw HTML string of a single selected node?
**Type:** Single answer
- [ ] A) `$crawler->filter('div')->html();`
- [ ] B) `$crawler->filter('div')->rawHtml();`
- [ ] C) `$crawler->filter('div')->getHtml();`
- [ ] D) `$crawler->filter('div')->innerHtml();`

**Correct Answer(s):** A
**Explanation:** `html()` works similarly to Javascript's `innerHTML`, returning the HTML contents nested inside the selected element.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#extracting-information

### Q51: How can you traverse the DOM upwards to the parent node from an existing Crawler?
**Type:** Multiple choice
- [ ] A) `$crawler->parents()`
- [ ] B) `$crawler->closest('div')`
- [ ] C) `$crawler->up()`
- [ ] D) `$crawler->parent()`

**Correct Answer(s):** A, B
**Explanation:** `parents()` returns all ancestors. `closest()` is specifically for finding the nearest ancestor matching a CSS selector. 
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#node-traversing

### Q52: How do you select the Nth matching HTML node within a Crawler selection list?
**Type:** Single answer
- [ ] A) `$crawler->filter('li')->get(1);`
- [ ] B) `$crawler->filter('li')[1];`
- [ ] C) `$crawler->filter('li')->eq(1);`
- [ ] D) `$crawler->filter('li')->nth(1);`

**Correct Answer(s):** C
**Explanation:** Using the `eq()` method with a 0-based index returns a brand new Crawler containing just that specific node. 
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#node-filtering

### Q53: How do you count the total number of nodes in a Crawler selection?
**Type:** Single answer
- [ ] A) `$crawler->size()`
- [ ] B) `$crawler->count()`
- [ ] C) `$crawler->length`
- [ ] D) `count($crawler->filter('div'))`

**Correct Answer(s):** B, D
**Explanation:** The Crawler implements the PHP `Countable` interface. You can therefore call `$crawler->count()` directly or pass it to `count()`.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#node-values

### Q54: What does the `$crawler->form()` method do if there are multiple `<form>` nodes in the current selection?
**Type:** Single answer
- [ ] A) It returns an array of `Form` objects.
- [ ] B) It throws an `InvalidArgumentException`.
- [ ] C) It extracts and instantiates a `Form` object representing only the very first matched node.
- [ ] D) It returns a `Crawler` containing all forms.

**Correct Answer(s):** C
**Explanation:** Like `text()` and `attr()`, `form()` creates a `Symfony\Component\DomCrawler\Form` instance based solely on the first mapped `<form>` node.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#forms

### Q55: How do you upload a simulated physical file using a Form object in functional tests?
**Type:** Single answer
- [ ] A) Map the file input key to a physical file path string in the `submit()` data array.
- [ ] B) `$form['user[avatar]']->upload('/path/to/test.jpg');`
- [ ] C) It is impossible to upload files automatically without raw cURL.
- [ ] D) Both A and B are valid natively.

**Correct Answer(s):** D
**Explanation:** The Form field API provides a dedicated `upload()` method to instruct the Client to generate multipart form data for the file, which can also be triggered via standard array submits.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#forms

### Q56: How can you filter nodes using native XPath instead of CSS?
**Type:** Single answer
- [ ] A) `$crawler->filter('xpath=//table')`
- [ ] B) `$crawler->query('//table')`
- [ ] C) `$crawler->xpath('//table')`
- [ ] D) `$crawler->filterXPath('//descendant-or-self::table')`

**Correct Answer(s):** D
**Explanation:** Using `filterXPath()` directly skips the `CssSelector` translation step, providing better performance and flexibility for complex queries.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#node-filtering

### Q57: How do you retrieve the HTML of the entire element itself (including tags), rather than just its inside content?
**Type:** Single answer
- [ ] A) `$crawler->html(true)`
- [ ] B) `$crawler->outerHtml()`
- [ ] C) `$crawler->getHtml()`
- [ ] D) `$crawler->dump()`

**Correct Answer(s):** B
**Explanation:** `outerHtml()` acts like JS's outerHTML property, whereas `html()` is similar to JS's innerHTML.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#extracting-information

### Q58: Can you instantiate a Crawler manually without ever making an HTTP request via the Client?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** The DomCrawler is a standalone component. You can pass an HTML string directly to its constructor: `new Crawler('<html>...</html>');`.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html

### Q59: How do you explicitly simulate checking a checkbox on a Form before submitting?
**Type:** Single answer
- [ ] A) `$form['terms'] = true;`
- [ ] B) `$form['terms']->check();`
- [ ] C) `$form['terms']->tick();`
- [ ] D) `$form->select('terms');`

**Correct Answer(s):** C
**Explanation:** Checkboxes and radio buttons have specific methods (`tick()`, `untick()`, `select()`) to alter their boolean or selected states securely.
**Reference:** https://symfony.com/doc/8.0/components/dom_crawler.html#forms

### Q60: How do you submit a form button directly in one line without first extracting the Form object?
**Type:** Single answer
- [ ] A) `$client->submitForm('Submit Order', ['user[name]' => 'Fabien']);`
- [ ] B) `$client->post('Submit Order', ...)`
- [ ] C) `$client->clickForm('Submit Order')`
- [ ] D) You must always extract the form first.

**Correct Answer(s):** A
**Explanation:** This shortcut method finds the button by text, extracts the parent form, merges the new data, and calls submit automatically.
**Reference:** https://symfony.com/doc/8.0/testing.html#submitting-forms

---

## Profiler object (WebProfiler bundle)

### Q61: What command enables the profiler in your application when starting the Symfony local server natively?
**Type:** Single answer
- [ ] A) `symfony server:start --profile`
- [ ] B) `php bin/console server:start --dev`
- [ ] C) N/A. The profiler is enabled via bundles (`WebProfilerBundle`) and environment config, not the server command.
- [ ] D) `symfony server:start --env=dev`

**Correct Answer(s):** C
**Explanation:** The profiler is fundamentally linked to the application environment configuration, not the web server execution arguments.
**Reference:** https://symfony.com/doc/8.0/profiler.html

### Q62: Why might `$client->getProfile()` return `null` when a functional test executes a valid HTTP request?
**Type:** Single answer
- [ ] A) The test failed.
- [ ] B) Because the profiler is disabled by default in the `test` environment to increase speed.
- [ ] C) Because the response was a redirect.
- [ ] D) Because you are using `KernelBrowser`.

**Correct Answer(s):** B
**Explanation:** To access the profile in a test, you must instruct `framework.yaml` specifically in the `test` environment to enable the collection of profiler data via `framework: profiler: collect: true`.
**Reference:** https://symfony.com/doc/8.0/testing/profiling.html

### Q63: How do you programmatically enable the profiler dynamically for just *one* specific test method without changing global config?
**Type:** Single answer
- [ ] A) `$client->enableProfiler();` immediately *before* making the HTTP request.
- [ ] B) `$client->enableProfiler();` immediately *after* making the HTTP request.
- [ ] C) `static::getContainer()->get('profiler')->enable();`
- [ ] D) Both A and C.

**Correct Answer(s):** A
**Explanation:** Calling it post-request has no effect because the listeners that collect system data during the request lifecycle were not active during the kernel transit.
**Reference:** https://symfony.com/doc/8.0/testing/profiling.html

### Q64: How do you assert the number of executed database queries using the profiler in a functional test?
**Type:** Single answer
- [ ] A) `$profile->getQueries()->count();`
- [ ] B) `$client->getProfile()->getCollector('db')->getQueryCount();`
- [ ] C) `$client->getDatabaseProfiler()->count();`
- [ ] D) `$this->assertDbQueries(5);`

**Correct Answer(s):** B
**Explanation:** The `getCollector('name')` method extracts specific data bags provided by bundles (Doctrine in this case).
**Reference:** https://symfony.com/doc/8.0/testing/profiling.html

### Q65: How do you reliably retrieve the list of emails sent during the request through the profiler to make assertions natively?
**Type:** Single answer
- [ ] A) `$client->getProfile()->getCollector('swiftmailer')->getMessages();`
- [ ] B) `$collector = $client->getProfile()->getCollector('mailer');`
- [ ] C) `$this->getMailerMessages();`
- [ ] D) `$this->assertEmailCount(1);`

**Correct Answer(s):** B, D
**Explanation:** While B extracts the manual collector, D is the native BrowserKit/Mailer assertion which uses the collector implicitly.
**Reference:** https://symfony.com/doc/8.0/mailer.html#testing

### Q66: Is it possible to inspect the total Twig rendering time via the Profiler object in tests?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** The profiler stores extensive analytics. You can use `$profile->getCollector('twig')->getTime()` to assert performance metrics within tests.
**Reference:** https://symfony.com/doc/8.0/profiler.html

### Q67: What does the standard `request` collector of the Profile store?
**Type:** Single answer
- [ ] A) Only the HTTP status code.
- [ ] B) The full SQL request log.
- [ ] C) Complete Request and Response data, including sessions, headers, and flashed messages.
- [ ] D) A copy of the routing map.

**Correct Answer(s):** C
**Explanation:** It stores snapshots of the HTTP transaction objects which are invaluable for debugging.
**Reference:** https://symfony.com/doc/8.0/profiler.html

---

## Framework Objects Access

### Q68: How do you get immediate access to an internal private service inside a `WebTestCase` without modifying the application code?
**Type:** Single answer
- [ ] A) It is impossible.
- [ ] B) Fetch it via `static::getContainer()->get('MyService')`.
- [ ] C) You must alias it in `services_test.yaml`.
- [ ] D) Extract it from the KernelBrowser object.

**Correct Answer(s):** B
**Explanation:** When running under PHPUnit, Symfony boots a specialized "Test Container" that uniquely exposes all private services directly to allow deep integration tests natively.
**Reference:** https://symfony.com/doc/8.0/testing.html#retrieving-services-in-the-test

### Q69: If you modify a database record manually during a test via Doctrine's ObjectManager, will standard `$client->request()` instances reflect the change?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Yes, provided the changes are `flush()`ed correctly into the shared test database connecting both the test and the spawned kernel.
**Reference:** https://symfony.com/doc/8.0/testing.html#integration-tests

### Q70: Does `$client->getContainer()` return the *exact* same physical PHP object instance as `static::getContainer()` within a test?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** There is only one active Kernel process per test execution unless explicitly rebooted. Both methods return the exact identical active injection container in memory.
**Reference:** https://symfony.com/doc/8.0/testing.html#retrieving-services-in-the-test

### Q71: How do you mock a service dynamically within the test container immediately before calling `$client->request()`?
**Type:** Single answer
- [ ] A) `$client->inject(Service::class, $mock);`
- [ ] B) `static::getContainer()->set(Service::class, $mock);`
- [ ] C) `static::$kernel->overrideService($mock);`
- [ ] D) It is impossible; containers are locked after boot.

**Correct Answer(s):** B
**Explanation:** The test container exclusively permits overwriting defined services with mock instances dynamically. When the controller runs later in the request, it will receive your mock natively.
**Reference:** https://symfony.com/doc/8.0/testing.html#mocking-services

### Q72: What happens if you attempt to use `$container->set()` to inject an array or native string value into the container rather than a physical object object?
**Type:** Single answer
- [ ] A) It overwrites the parameter smoothly.
- [ ] B) Symfony throws an `InvalidArgumentException` stating it must be an object.
- [ ] C) It caches the string and ignores it.
- [ ] D) The container rebuilds.

**Correct Answer(s):** B
**Explanation:** Only instantiated PHP objects can be set directly via `set()`. For scalar parameters, the container requires compilation-time declaration.
**Reference:** https://symfony.com/doc/8.0/testing.html#retrieving-services-in-the-test

### Q73: How can you assert that a mocked service method was executed exactly once during a functional request lifecycle without using `$this`?
**Type:** Single answer
- [ ] A) You write custom loops inside the mock.
- [ ] B) You must use profiler data.
- [ ] C) Construct the Mock using PHPUnit, apply `expects()` assertions to it, set it in the container, and run the request. PHPUnit verifies it automatically.
- [ ] D) Use `$client->assertServiceCalled()`.

**Correct Answer(s):** C
**Explanation:** Because the container injects the exact object instance you registered, PHPUnit will validate the call assertions normally during tear down.
**Reference:** https://phpunit.readthedocs.io/en/9.6/test-doubles.html

### Q74: Why is it frequently necessary to `clear()` Doctrine's ObjectManager registry during loops or massive datasets in functional tests natively?
**Type:** Single answer
- [ ] A) To prevent database locks.
- [ ] B) Because caching flushed entities consumes massive amounts of RAM and could cross-contaminate valid assertions later.
- [ ] C) To prevent lazy loading errors.
- [ ] D) To reset autoincrement IDs.

**Correct Answer(s):** B
**Explanation:** `clear()` detaches all current entities from the unit of work cache. You must do this to enforce clean reads for isolated transactions.
**Reference:** https://symfony.com/doc/8.0/testing.html#integration-tests

### Q75: How do you retrieve a Symfony compiled container parameter (e.g., `kernel.project_dir`) directly inside a functional test?
**Type:** Single answer
- [ ] A) `getenv('kernel.project_dir');`
- [ ] B) `static::getContainer()->getParameter('kernel.project_dir');`
- [ ] C) `static::$kernel->getParam('kernel.project_dir');`
- [ ] D) `$client->get('kernel.project_dir');`

**Correct Answer(s):** B
**Explanation:** Since parameters are fully compiled inside the container on boot, they can be read precisely like services via `getParameter()`.
**Reference:** https://symfony.com/doc/8.0/testing.html#retrieving-services-in-the-test

### Q76: What is a known limitation of using `$container->set()` dynamically for mocking services in deeply wired test applications?
**Type:** Single answer
- [ ] A) It throws a deprecation notice.
- [ ] B) If the service is injected natively via constructor injection in another instantiated service *before* the test runs, replacing the root service might not update the dependencies already wired in memory.
- [ ] C) It only works for public services.
- [ ] D) It crashes if the service has autowiring enabled.

**Correct Answer(s):** B
**Explanation:** Setting services dynamically is most reliable for services fetched at runtime or controllers pulled right before routing. Static constructor injections may miss the update.
**Reference:** https://symfony.com/doc/8.0/testing.html#mocking-services

### Q77: Should you use `setUp()` or `tearDown()` manually to execute native `TRUNCATE` operations on database data for functional tests?
**Type:** Single answer
- [ ] A) Yes, it is the safest method.
- [ ] B) No, Symfony relies on automated bundles (like `DAMADoctrineTestBundle`) which utilizes database transactions for immediate rollback.
- [ ] C) Yes, but only in `WebTestCase`.
- [ ] D) No, you must drop the database using the console command.

**Correct Answer(s):** B
**Explanation:** Transaction rollbacks are instantaneous compared to wiping and reinserting schema data between 100+ tests manually.
**Reference:** https://symfony.com/doc/8.0/testing.html#resetting-the-database-automatically

### Q78: How do you boot the Kernel forcibly in a `KernelTestCase` without explicitly making an HTTP request?
**Type:** Single answer
- [ ] A) `$client->request();`
- [ ] B) `self::bootKernel();`
- [ ] C) `static::getContainer();`
- [ ] D) `new Kernel('test', true);`

**Correct Answer(s):** B
**Explanation:** `bootKernel()` instantiates the framework context, reads configuration, sets up the cache, and fully initializes the service container explicitly.
**Reference:** https://symfony.com/doc/8.0/testing.html#integration-tests

### Q79: What environment variable implicitly switches the container to expose private services natively to PHPUnit?
**Type:** Single answer
- [ ] A) `SYMFONY_ENV`
- [ ] B) `APP_DEBUG=1`
- [ ] C) `APP_ENV=test`
- [ ] D) `phpunit=true`

**Correct Answer(s):** C
**Explanation:** When the environment is `test`, the `FrameworkBundle` specifically overrides container constraints via a compiler pass (`TestServiceContainerWeakRefPass`) to expose features.
**Reference:** https://symfony.com/doc/8.0/testing.html#retrieving-services-in-the-test

### Q80: How does Symfony optimize container booting between different tests sharing the same configuration?
**Type:** Single answer
- [ ] A) It doesn't; it reinstantiates XML files completely.
- [ ] B) The test cases detect changes to kernel parameters or source code and selectively leverage compiled php container dumps.
- [ ] C) It runs tests asynchronously.
- [ ] D) It bypasses DI and uses global variables natively.

**Correct Answer(s):** B
**Explanation:** `KernelBrowser` and Test Cases are heavily optimized to only boot a fresh container natively from zero when internal environment tokens flip or cache runs cold.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-against-different-configurations


## Client Configuration

### Q81: How do you globally set custom server parameters (like `HTTP_HOST`) for all subsequent requests made by a test Client?
**Type:** Single answer
- [ ] A) `putenv('HTTP_HOST=api.example.com');`
- [ ] B) Pass them as the second argument array to `static::createClient()`.
- [ ] C) `$client->getServer()->set('HTTP_HOST', 'api.example.com');`
- [ ] D) `$kernel->getContainer()->setParameter('HTTP_HOST', 'api.example.com');`

**Correct Answer(s):** B
**Explanation:** Defining them during `createClient()` applies them globally to every simulated request made by that specific client instance.
**Reference:** https://symfony.com/doc/8.0/testing.html#customizing-the-client

### Q82: How can you disable the automatic reboot of the Symfony Kernel between requests in the same test method?
**Type:** Single answer
- [ ] A) `$client->disableReboot();`
- [ ] B) `static::$kernel->keepAlive();`
- [ ] C) Pass `['reboot' => false]` to `createClient()`.
- [ ] D) It is impossible to disable the reboot natively.

**Correct Answer(s):** A
**Explanation:** Normally, the Client shuts down the kernel after every request to ensure pristine state. Disabling this allows state (like static variables) to persist across multiple requests.
**Reference:** https://symfony.com/doc/8.0/testing.html#making-requests

### Q83: Where should test-specific service overriding configurations be defined in a standard Symfony application?
**Type:** Single answer
- [ ] A) In `config/services.yaml` under a `when@test` block.
- [ ] B) In the `config/packages/test/` directory.
- [ ] C) In an `.env.test` file.
- [ ] D) Either A or B.

**Correct Answer(s):** D
**Explanation:** Symfony automatically loads specific configuration files based on the active `APP_ENV`. Both `when@test` inside the main YAML files and dedicated files in the `test/` directory are valid natively.
**Reference:** https://symfony.com/doc/8.0/configuration.html#configuration-environments

### Q84: How do you universally mock the current time in a test suite using Symfony 8.0 natively?
**Type:** Single answer
- [ ] A) Use the `ClockMock` provided by the PHPUnit Bridge component.
- [ ] B) Refactor all code to accept standard PHP `DateTime` objects as arguments.
- [ ] C) Use `Clock::set(new MockClock('2026-03-01 12:00:00'));` provided by the Clock component.
- [ ] D) Install the internal `symfony/time-travel` polyfill.

**Correct Answer(s):** C
**Explanation:** The Clock component enables time-traveling natively in tests by overriding the Global Clock instance without relying on complex PHP process extensions.
**Reference:** https://symfony.com/doc/8.0/components/clock.html#testing-time-sensitive-code

### Q85: How do you mock DNS responses or `gethostbyname` during tests natively with Symfony tools?
**Type:** Single answer
- [ ] A) By overriding the Linux `/etc/hosts` file.
- [ ] B) By using the `DnsMock` provided by the PHPUnit Bridge component.
- [ ] C) By using `$client->mockDns()`.
- [ ] D) By overriding the curl extensions inside PHPUnit.

**Correct Answer(s):** B
**Explanation:** This allows tests that depend on native PHP DNS resolution functions (like `checkdnsrr`) to run offline natively without causing network timeouts.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#dns-routing

---

## Request and Response Objects Introspection

### Q86: How do you retrieve the full unparsed string content of an HTTP response in a test?
**Type:** Single answer
- [ ] A) `$client->getResponse()->getContent();`
- [ ] B) `$client->getResponseBody();`
- [ ] C) `$crawler->html();`
- [ ] D) `$response->body;`

**Correct Answer(s):** A
**Explanation:** Content parsing logic is usually necessary to validate JSON API responses manually.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q87: How do you assert that a specific HTTP Header (like `Cache-Control`) is present on the response natively?
**Type:** Single answer
- [ ] A) `$this->assertTrue($client->getResponse()->hasHeader('Cache-Control'));`
- [ ] B) `$this->assertResponseHasHeader('Cache-Control');`
- [ ] C) `$this->assertHeaderExists('Cache-Control');`
- [ ] D) Both A and B.

**Correct Answer(s):** B
**Explanation:** `assertResponseHasHeader()` is the dedicated, expressive assertion provided by Symfony's BrowserKit for this exact purpose.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q88: How do you inspect a specific flash message set during a functional test before the response is fully evaluated?
**Type:** Single answer
- [ ] A) Extract it from the HTML DOM natively.
- [ ] B) `$client->getRequest()->getSession()->getFlashBag()->get('success');`
- [ ] C) `$client->getFlashes('success');`
- [ ] D) Use the `$this->assertFlashMessage()` shortcut.

**Correct Answer(s):** B
**Explanation:** Assuming the session was initialized, you can extract internal session objects explicitly via `$client->getRequest()` before or during kernel transit.
**Reference:** https://symfony.com/doc/8.0/testing.html#accessing-internal-objects

### Q89: How do you logically verify the exact `Content-Type` header of a simulated incoming request in a test?
**Type:** Single answer
- [ ] A) `$client->getRequest()->headers->get('Content-Type');`
- [ ] B) `$client->getRequestType();`
- [ ] C) `$client->getServerParameter('HTTP_CONTENT_TYPE');`
- [ ] D) Both A and C.

**Correct Answer(s):** D
**Explanation:** Both inspecting the hydrated Request object headers bag and verifying the raw server parameters backing it are valid native approaches.
**Reference:** https://symfony.com/doc/8.0/testing.html#accessing-internal-objects

---

## PHPUnit Assertions

### Q90: Which BrowserKit assertion natively verifies that an HTML element exists a specific number of times in the DOM?
**Type:** Single answer
- [ ] A) `$this->assertElementCount()`
- [ ] B) `$this->assertDomCount()`
- [ ] C) `$this->assertSelectorCount()`
- [ ] D) `$this->assertCountNode()`

**Correct Answer(s):** C
**Explanation:** This natively combines the Crawler filter logic with an integer count assertion natively. (e.g., `$this->assertSelectorCount(3, '.product-card');`)
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q91: Which assertion explicitly verifies that an element exists AT LEAST ONCE in the DOM using a CSS selector?
**Type:** Single answer
- [ ] A) `$this->assertSelectorExists()`
- [ ] B) `$this->assertNodePresent()`
- [ ] C) `$this->assertDomHas()`
- [ ] D) `$this->assertTrue($crawler->contains('.login-form'))`

**Correct Answer(s):** A
**Explanation:** This natively checks that the CSS selector matches `count > 0` nodes.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q92: Which assertion strictly verifies that the response is fundamentally successful (status 2xx) without hardcoding the integer?
**Type:** Single answer
- [ ] A) `$this->assertResponseIsOk()`
- [ ] B) `$this->assertResponseIsSuccessful()`
- [ ] C) `$this->assertStatus(200)`
- [ ] D) `$this->assertTrue($response->isOk())`

**Correct Answer(s):** B
**Explanation:** Unlike `assertResponseStatusCodeSame(200)`, this assertion automatically accepts 201 Created or 204 No Content as valid successes seamlessly.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q93: How do you explicitly verify the exact HTTP status code of the response in BrowserKit?
**Type:** Single answer
- [ ] A) `$this->assertResponseStatusCodeSame()`
- [ ] B) `$this->assertHttpStatusCode()`
- [ ] C) `$this->assertEqualsStatusCode()`
- [ ] D) `$this->assertResponseStatus()`

**Correct Answer(s):** A
**Explanation:** Evaluates exactly if the code matches the integer argument natively. (e.g., `$this->assertResponseStatusCodeSame(403);`)
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q94: How do you natively assert that an exception thrown during the test contains specific string text in PHPUnit?
**Type:** Single answer
- [ ] A) `$this->assertExceptionMessageContains('User not found');`
- [ ] B) `$this->expectExceptionMessage('User not found');`
- [ ] C) `$this->assertThrowsMessage('User not found');`
- [ ] D) `$this->catchException()->assertContains('User not found');`

**Correct Answer(s):** B
**Explanation:** Must be called before the exception logic, this natively checks the Exception message attribute using partial string matching natively.
**Reference:** https://phpunit.readthedocs.io/en/9.6/writing-tests-for-phpunit.html#testing-exceptions

### Q95: Which functional assertion verifies the exact text content of a DOM element natively?
**Type:** Single answer
- [ ] A) `$this->assertTextSame()`
- [ ] B) `$this->assertSelectorTextSame()`
- [ ] C) `$this->assertElementIncludesText()`
- [ ] D) `$this->assertHtmlContains()`

**Correct Answer(s):** B
**Explanation:** This strips nested HTML and compares the raw inner text strictly with the expected string natively.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q96: What is the primary BrowserKit assertion for validating that the response redirects to a specific route?
**Type:** Single answer
- [ ] A) `$this->assertResponseRedirects()`
- [ ] B) `$this->assertRedirect()`
- [ ] C) `$this->assertLocationHeader()`
- [ ] D) `$this->assertRouteIs()`

**Correct Answer(s):** A
**Explanation:** Checks both the location header and the 3xx status code implicitly. The second argument allows strict HTTP status code checking natively.
**Reference:** https://symfony.com/doc/8.0/testing.html#redirecting

### Q97: What does `$this->assertPageTitleSame()` natively evaluate?
**Type:** Single answer
- [ ] A) The URL path of the page.
- [ ] B) The exact text content of the `<title>` tag in the HTML head.
- [ ] C) The first `<h1>` element on the page.
- [ ] D) The Symfony routing name.

**Correct Answer(s):** B
**Explanation:** A declarative shortcut exclusively for evaluating the HTML title element, bypassing manual CSS selectors naturally.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q98: What does the BrowserKit assertion `$this->assertAnySelectorTextContains()` natively accomplish?
**Type:** Single answer
- [ ] A) It checks if any element matching the selector contains the text, rather than failing if the *first* one doesn't.
- [ ] B) It checks the entire raw HTML body for the text, ignoring selectors entirely.
- [ ] C) It returns true if the text doesn't exist anywhere in the matching selectors.
- [ ] D) It checks if multiple different selectors contain the text simultaneously.

**Correct Answer(s):** A
**Explanation:** Vital for asserting lists, tables, or dynamic content where the exact hierarchical order of elements isn't guaranteed natively.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q99: How do you assert that a cookie was sent with a specific value in the native response?
**Type:** Single answer
- [ ] A) `$this->assertCookieIs('theme', 'dark');`
- [ ] B) `$this->assertResponseCookieValueSame('theme', 'dark');`
- [ ] C) `$this->assertEquals('dark', $client->getCookie('theme'));`
- [ ] D) `$this->assertHeaderContains('Set-Cookie', 'theme=dark');`

**Correct Answer(s):** B
**Explanation:** The dedicated BrowserKit assertion explicitly checks the Response cookies bag for a matching string value natively.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q100: Which assertion natively assesses if the response is completely uncacheable by proxies or clients?
**Type:** Single answer
- [ ] A) `$this->assertResponseIsUncacheable()`
- [ ] B) `$this->assertNoCache()`
- [ ] C) `$this->assertCacheControl('no-cache')`
- [ ] D) `$this->assertResponseNotCacheable()`

**Correct Answer(s):** A
**Explanation:** Analyzes the `Cache-Control` HTTP headers deeply for traits like `no-cache`, `no-store`, and `private` natively.
**Reference:** https://symfony.com/doc/8.0/http_cache.html#testing-caching

---

## Handling legacy deprecated code

### Q101: What environment variable exclusively controls the behavior of deprecation notices triggered during a test suite?
**Type:** Single answer
- [ ] A) `SYMFONY_DEPRECATIONS`
- [ ] B) `PHPUNIT_DEPRECATIONS_HELPER`
- [ ] C) `SYMFONY_DEPRECATIONS_HELPER`
- [ ] D) `APP_IGNORE_DEPRECATIONS`

**Correct Answer(s):** C
**Explanation:** This variable, typically set in `phpunit.xml.dist`, controls how the PHPUnit Bridge identifies and handles deprecated code triggering `E_USER_DEPRECATED` natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#configuration

### Q102: What does the configuration value `SYMFONY_DEPRECATIONS_HELPER=weak` accomplish natively?
**Type:** Single answer
- [ ] A) It ignores all deprecation notices completely and prevents them from failing the test suite.
- [ ] B) It fails the suite only if specifically more than 10 deprecations occur.
- [ ] C) It only reports indirect deprecations from vendors.
- [ ] D) It throws fatal exceptions on every single deprecation.

**Correct Answer(s):** A
**Explanation:** This is often used on existing legacy projects to prevent newly upgraded framework packages throwing underlying notices from causing CI/CD pipeline failures natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#configuration

### Q103: If `SYMFONY_DEPRECATIONS_HELPER` is natively set to `max[direct]=0`, what happens?
**Type:** Single answer
- [ ] A) The test suite fails if there are any deprecations whatsoever (including third-party vendors).
- [ ] B) The test suite fails if there are any *direct* deprecation notices triggered by your application code (excluding third-party vendor libraries).
- [ ] C) The test suite allows unlimited direct deprecations but fails on vendor ones.
- [ ] D) The test suite disables PHP unit completely.

**Correct Answer(s):** B
**Explanation:** "direct" targets your specific source code namespace manually. "indirect" identifies deprecations called internally by vendors (like Symfony core or Monolog) natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#configuration

### Q104: How can a developer intentionally test a specifically deprecated feature without the PHPUnit Bridge failing the single test method natively?
**Type:** Single answer
- [ ] A) By calling `$this->ignoreDeprecations();`.
- [ ] B) By catching the `E_USER_DEPRECATED` error manually.
- [ ] C) By adding the `#[Group('legacy')]` PHP attribute to the test method.
- [ ] D) You cannot; all deprecations must be fixed.

**Correct Answer(s):** C
**Explanation:** The bridge seamlessly ignores deprecation limits dynamically for any test tagged with the "legacy" group, letting it safely execute natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#making-tests-fail

### Q105: What does the exact `SYMFONY_DEPRECATIONS_HELPER=999999` value represent conceptually natively?
**Type:** Single answer
- [ ] A) A magic value telling the bridge to disable itself.
- [ ] B) A timestamp for when deprecation warnings should expire.
- [ ] C) A numerical threshold baseline limit representing the maximum exact number of deprecations allowed before the suite explicitly fails.
- [ ] D) The maximum length of string characters allowed in deprecation traces.

**Correct Answer(s):** C
**Explanation:** You can assign an exact raw integer natively. If the tests generate fewer deprecations than the limit, the suite passes. If it goes over, it fails natively. This is helpful for progressively burning down technical debt natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#configuration

### Q106: Can the `SYMFONY_DEPRECATIONS_HELPER` be natively overridden entirely on the CLI command line?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Yes, via standard OS environment variables like `SYMFONY_DEPRECATIONS_HELPER=weak php bin/phpunit`. Any CLI-passed OS environment variable naturally overrides the XML configuration files natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#configuration

### Q107: If a legacy test method triggers a deprecation notice globally, how does the bridge output the notice in the final suite summary natively?
**Type:** Single answer
- [ ] A) It prints a single line with purely the total count.
- [ ] B) It categorizes them natively into detailed breakdowns: Direct, Indirect, Legacy, Self, and Other.
- [ ] C) It silently logs them strictly to `test.log`.
- [ ] D) It generates a CSV natively.

**Correct Answer(s):** B
**Explanation:** It prints a comprehensive summary accurately categorized by internal urgency and package origin at the absolute bottom of the PHPUnit CLI output, offering exact paths for remediation natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#deprecations-notices

### Q108: What is the `ClockMock` class natively provided by the PHPUnit Bridge historically used for before the Clock component?
**Type:** Single answer
- [ ] A) Mocking database timestamps strictly.
- [ ] B) Mocking PHP's native time functions (`time()`, `microtime()`, `date()`) to freeze time strictly in old codebases.
- [ ] C) Measuring exactly how long test methods run natively.
- [ ] D) Forcing test timeouts explicitly.

**Correct Answer(s):** B
**Explanation:** While native Symfony 8 applications use the `Clock` component interface natively, old legacy applications can use `ClockMock` natively via the `@group time-sensitive` annotation natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#clock-mocking

### Q109: Aside from the deprecation helper entirely, what CLI option runs ONLY tests that previously failed consecutively?
**Type:** Single answer
- [ ] A) `--filter=failed`
- [ ] B) `--run-failed`
- [ ] C) `--order-by=defects`
- [ ] D) `--fail-fast`

**Correct Answer(s):** C
**Explanation:** While not exclusive to Symfony, leveraging caching failed tests via `--order-by=defects` is critical for developer velocity natively in the Symfony ecosystem natively.
**Reference:** https://phpunit.readthedocs.io/en/9.6/textui.html#command-line-options

### Q110: If you do NOT specify or define `SYMFONY_DEPRECATIONS_HELPER` anywhere, what is the default strict behavior natively?
**Type:** Single answer
- [ ] A) It ignores all deprecations entirely.
- [ ] B) By default, it operates as if it was permanently set to `strict` or `max[total]=0`, failing tests heavily.
- [ ] C) It randomly selects a subset of notices to display.
- [ ] D) It throws a configuration exception inherently.

**Correct Answer(s):** B
**Explanation:** Symfony aggressively attempts to enforce high quality by default implicitly, throwing failures immediately natively to prevent deploying inherently deprecated code continuously.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#configuration

### Q111: How do you practically evaluate if an encapsulated form rendering safely triggers deprecation warnings internally within the vendors?
**Type:** True / False
- [ ] A) Render the form normally in a functional test. If the bridge is active and limits are exceeded, it fails natively because the bridge comprehensively intercepts all `E_USER_DEPRECATED` calls injected globally regardless of component origin safely.
- [ ] B) You must use a specialized `$form->assertNoDeprecations()` assertion logic on the form builder accurately.

**Correct Answer(s):** A
**Explanation:** The bridge globally hooks into PHP's internal error handler directly, guaranteeing intercept capability continuously across all packages natively.
**Reference:** https://symfony.com/doc/8.0/components/phpunit_bridge.html#making-tests-fail

### Q112: What does the precise `assertBrowserHasCookie()` BrowserKit assertion specifically evaluate internally?
**Type:** Single answer
- [ ] A) The physical cookie file on disk natively.
- [ ] B) It verifies the existence of a cookie configured implicitly by the `Set-Cookie` header during the immediately preceding HTTP request exactly.
- [ ] C) The PHP `$_COOKIE` superglobal explicitly.
- [ ] D) The global static request inherently.

**Correct Answer(s):** B
**Explanation:** Distinct and separate from checking the global client state manually, it strictly focuses natively on the active incoming client response transit precisely.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q113: How does explicit `assertAnySelectorTextNotContains()` explicitly contribute to automated tests natively?
**Type:** Single answer
- [ ] A) It ensures elements with specific classes inherently do not exist broadly.
- [ ] B) It natively enforces inverse string constraints on the DOM explicitly, ensuring protected or sensitive text output is aggressively hidden fundamentally.
- [ ] C) It deletes identical text implicitly.
- [ ] D) It inherently guarantees all elements securely have `display: none` natively.

**Correct Answer(s):** B
**Explanation:** This is exceptionally valuable for declarative functional security tests safely representing unauthorized user agents attempting to access sensitive records precisely and effortlessly.
**Reference:** https://symfony.com/doc/8.0/testing.html#testing-the-response

### Q114: What strict underlying core mechanism precisely allows BrowserKit to rigorously execute CSS selectors for DOM traversal consistently?
**Type:** Single answer
- [ ] A) The native generic `symfony/dom-crawler` component.
- [ ] B) A bundled JS engine.
- [ ] C) The separate, dedicated `symfony/css-selector` component.
- [ ] D) Regular expressions accurately.

**Correct Answer(s):** C
**Explanation:** BrowserKit fundamentally does not parse CSS directly; it meticulously utilizes the `CssSelector` component securely to dynamically transpile familiar CSS selector syntax seamlessly into advanced robust XPath queries against the instantiated `DOMDocument` flawlessly.
**Reference:** https://symfony.com/doc/8.0/components/css_selector.html

### Q115: How do you practically mock a completely isolated simple internal trait's method without constructing a custom stub file manually?
**Type:** Single answer
- [ ] A) using specific `$this->getObjectForTrait()` utility function internally inside PHPUnit inherently.
- [ ] B) using native complex `class@anonymous` functionality manually exactly.
- [ ] C) using external Mockery packages securely.
- [ ] D) You cannot mock simple traits securely natively.

**Correct Answer(s):** A
**Explanation:** This exclusive and powerful PHPUnit utility fundamentally creates an anonymous class implementation explicitly utilizing the specific precise trait locally, successfully exposing its concrete internal methods for robust internal validation natively and correctly.
**Reference:** https://phpunit.readthedocs.io/en/9.6/test-doubles.html#mocking-traits-and-abstract-classes

### Q116: What internal exact object strictly allows the functional native Client precisely to completely simulate HTTP request payloads accurately?
**Type:** Single answer
- [ ] A) Explicit `Symfony\Component\HttpClient\HttpClient` configurations.
- [ ] B) Implicit `GuzzleHttp` wrappers intrinsically.
- [ ] C) Internal native `Symfony\Component\BrowserKit\Request` class strictly.
- [ ] D) Standard PHP `$_POST` natively globally explicitly.

**Correct Answer(s):** C
**Explanation:** The internal simulated testing stack crucially relies securely on exclusively instantiating isolated pristine BrowserKit Request properties safely before correctly mapping seamlessly to `HttpFoundation` directly natively bypassing network transit comprehensively explicitly.
**Reference:** https://symfony.com/doc/8.0/testing.html#making-requests


