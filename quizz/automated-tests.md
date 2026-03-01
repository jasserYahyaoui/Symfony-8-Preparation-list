# Quiz : Automated Tests (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Unit tests

**Question 1:** A unit test in Symfony extends:
**Type:** Single answer
- [ ] A) `Symfony\Bundle\FrameworkBundle\Test\WebTestCase`
- [ ] B) `PHPUnit\Framework\TestCase`
- [ ] C) `Symfony\Bundle\FrameworkBundle\Test\KernelTestCase`
- [ ] D) `Symfony\Component\Console\Tester\CommandTester`

**Correct Answer(s):** B
**Explanation:** Unit tests extend PHPUnit's `TestCase` — no Symfony kernel needed.

---

**Question 2:** Unit tests should NOT access the database, file system, or external APIs.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Unit tests are isolated — test a single class with mocked dependencies.

---

### Functional tests

**Question 3:** A functional test in Symfony extends:
**Type:** Single answer
- [ ] A) `TestCase`
- [ ] B) `WebTestCase`
- [ ] C) `KernelTestCase`
- [ ] D) `BrowserKitTestCase`

**Correct Answer(s):** B
**Explanation:** `WebTestCase` boots the kernel and provides the test `Client` for HTTP requests.

---

**Question 4:** `$client = static::createClient()` creates:
**Type:** Single answer
- [ ] A) An HTTP client that makes real network requests
- [ ] B) An in-memory test client that simulates HTTP requests to the Symfony kernel
- [ ] C) A database connection
- [ ] D) A WebSocket client

**Correct Answer(s):** B
**Explanation:** The test client makes requests directly to the kernel — no web server needed.

---

### Client object

**Question 5:** `$client->request('GET', '/products')` returns:
**Type:** Single answer
- [ ] A) A `Response` object
- [ ] B) A `Crawler` object for DOM inspection
- [ ] C) A string
- [ ] D) An array

**Correct Answer(s):** B
**Explanation:** `request()` returns a `Crawler`. Use `$client->getResponse()` for the Response.

---

**Question 6:** `$client->getResponse()->getStatusCode()` returns:
**Type:** Single answer
- [ ] A) The HTTP status code as integer (e.g., 200, 404, 500)
- [ ] B) A string
- [ ] C) A boolean
- [ ] D) A Response object

**Correct Answer(s):** A
**Explanation:** Returns the numeric HTTP status code.

---

**Question 7:** `$client->followRedirect()` does what?
**Type:** Single answer
- [ ] A) Follows the redirect response and returns the Crawler for the new page
- [ ] B) Ignores redirects
- [ ] C) Throws an exception
- [ ] D) Returns null

**Correct Answer(s):** A
**Explanation:** Manually follows a redirect (the test client does NOT auto-follow by default).

---

### Crawler

**Question 8:** `$crawler->filter('.product-name')` selects:
**Type:** Single answer
- [ ] A) URL path filter
- [ ] B) DOM elements matching the CSS selector `.product-name`
- [ ] C) Database records
- [ ] D) HTTP headers

**Correct Answer(s):** B
**Explanation:** `filter()` uses CSS selectors to find HTML elements in the response DOM.

---

**Question 9:** `$crawler->filter('h1')->text()` returns:
**Type:** Single answer
- [ ] A) The HTML of the `<h1>` element
- [ ] B) The text content of the first `<h1>` element
- [ ] C) A Crawler object
- [ ] D) The number of `<h1>` elements

**Correct Answer(s):** B
**Explanation:** `text()` returns the text content (no HTML tags). `html()` returns the inner HTML.

---

**Question 10:** `$crawler->selectLink('Next Page')->link()` returns:
**Type:** Single answer
- [ ] A) A string URL
- [ ] B) A `Link` object that can be passed to `$client->click()`
- [ ] C) A boolean
- [ ] D) A Crawler

**Correct Answer(s):** B
**Explanation:** Returns a `Link` object. Use `$client->click($link)` to follow it.

---

### Profiler

**Question 11:** To access the profiler in tests, you must:
**Type:** Single answer
- [ ] A) Enable it in `test` environment via `framework.profiler.collect: true`
- [ ] B) It's always available
- [ ] C) Install a separate package
- [ ] D) Use a different test client

**Correct Answer(s):** A
**Explanation:** The profiler must be enabled in the test environment to collect data.

---

**Question 12:** `$client->getProfile()` returns the profile of:
**Type:** Single answer
- [ ] A) The current user
- [ ] B) The most recent request's profiler data (collectors, timing, queries, etc.)
- [ ] C) The server configuration
- [ ] D) The test suite

**Correct Answer(s):** B
**Explanation:** `getProfile()` returns the `Profile` with collectors for the last request.

---

### PHPUnit assertions

**Question 13:** `$this->assertResponseIsSuccessful()` checks that the status code is:
**Type:** Single answer
- [ ] A) Exactly 200
- [ ] B) In the 2xx range (200-299)
- [ ] C) In the 3xx range
- [ ] D) Any non-error code

**Correct Answer(s):** B
**Explanation:** 2xx status codes indicate success.

---

**Question 14:** `$this->assertResponseRedirects('/login')` checks:
**Type:** Single answer
- [ ] A) That the response is a 2xx with content
- [ ] B) That the response is a redirect (3xx) to the specified URL
- [ ] C) That the response is a 404
- [ ] D) That a flash message exists

**Correct Answer(s):** B
**Explanation:** Checks both the redirect status code and the `Location` header.

---

**Question 15:** `$this->assertSelectorTextContains('h1', 'Products')` checks:
**Type:** Single answer
- [ ] A) That the `<h1>` element's text contains "Products"
- [ ] B) That the URL contains "Products"
- [ ] C) That a header is set
- [ ] D) That a form field has that value

**Correct Answer(s):** A
**Explanation:** Asserts that the CSS-selected element's text contains the expected string.

---

### PHPUnit Bridge

**Question 16:** The Symfony PHPUnit Bridge provides:
**Type:** Multiple choice
- [ ] A) Deprecation detection during tests
- [ ] B) Modified PHPUnit for Symfony compatibility
- [ ] C) Clock mocking
- [ ] D) DNS mocking

**Correct Answer(s):** A, B, C, D
**Explanation:** The Bridge detects deprecations, provides `ClockMock`, `DnsMock`, and adapts PHPUnit.

---

**Question 17:** `@group legacy` in PHPUnit Bridge:
**Type:** Single answer
- [ ] A) Marks the test as slow
- [ ] B) Silences deprecation notices for intentionally testing deprecated code
- [ ] C) Skips the test
- [ ] D) Runs the test in isolation

**Correct Answer(s):** B
**Explanation:** `@group legacy` tells the Bridge that deprecation notices are expected in this test.

---

### KernelTestCase

**Question 18:** `KernelTestCase` provides access to:
**Type:** Single answer
- [ ] A) The browser
- [ ] B) The Symfony kernel and container (for integration tests without HTTP)
- [ ] C) Only unit testing features
- [ ] D) The profiler

**Correct Answer(s):** B
**Explanation:** `KernelTestCase` boots the kernel, giving access to `static::getContainer()`.

---

**Question 19:** `static::getContainer()->get('service_id')` in a test:
**Type:** Single answer
- [ ] A) Returns the service, even if private (test container allows it)
- [ ] B) Throws an exception for private services
- [ ] C) Returns null
- [ ] D) Creates a new service

**Correct Answer(s):** A
**Explanation:** The test container makes all services public for testing purposes.

---

**Question 20:** `$this->assertResponseStatusCodeSame(404)` checks:
**Type:** Single answer
- [ ] A) That the response has a 200 status
- [ ] B) That the response status code is exactly 404
- [ ] C) That the URL is not found
- [ ] D) That a 404 template exists

**Correct Answer(s):** B
**Explanation:** Exact status code assertion.

---

---
