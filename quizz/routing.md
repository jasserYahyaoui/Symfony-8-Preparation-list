# Quiz : Routing (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Routing component and FrameworkBundle

**Question 1:** The Symfony Routing component's primary job is to:
**Type:** Single answer
- [ ] A) Generate HTML forms
- [ ] B) Map an incoming URL to a controller callable
- [ ] C) Manage database connections
- [ ] D) Parse YAML files

**Correct Answer(s):** B
**Explanation:** The Router matches the URL and HTTP method to a route definition, resolving the controller.

---

**Question 2:** Symfony routes can be defined in which formats? (Select all)
**Type:** Multiple choice
- [ ] A) PHP attributes
- [ ] B) YAML
- [ ] C) XML
- [ ] D) PHP files
- [ ] E) JSON

**Correct Answer(s):** A, B, C, D
**Explanation:** Symfony supports attributes, YAML, XML, and PHP for route definitions. JSON is not supported.

---

### Configuration (YAML and PHP attributes)

**Question 3:** What is the correct PHP attribute syntax to define a route?
**Type:** Single answer
- [ ] A) `#[Route('/products', name: 'product_list')]`
- [ ] B) `@Route('/products', name='product_list')`
- [ ] C) `#Route('/products')`
- [ ] D) `[Route('/products')]`

**Correct Answer(s):** A
**Explanation:** PHP 8 attribute syntax: `#[Route(path, name:)]`.

---

**Question 4:** In YAML, a basic route looks like:
**Type:** Single answer
- [ ] A) `product_list: { url: /products, handler: App\Controller\ProductController }`
- [ ] B) `product_list: { path: /products, controller: App\Controller\ProductController::list }`
- [ ] C) `product_list: { route: /products, action: list }`
- [ ] D) `/products: App\Controller\ProductController`

**Correct Answer(s):** B
**Explanation:** YAML route: name as key, `path:` and `controller:` (FQCN::method format).

---

**Question 5:** When applying `#[Route]` on a class AND on a method, the class-level route acts as:
**Type:** Single answer
- [ ] A) An alias
- [ ] B) A prefix for all method routes in that controller
- [ ] C) A default route
- [ ] D) An override

**Correct Answer(s):** B
**Explanation:** Class-level `#[Route('/admin')]` + method `#[Route('/users')]` = `/admin/users`.

---

### Restrict URL parameters

**Question 6:** How do you add a regex constraint to a route parameter?
**Type:** Single answer
- [ ] A) `#[Route('/products/{id}', requirements: ['id' => '\d+'])]`
- [ ] B) `#[Route('/products/{id:int}')]`
- [ ] C) `#[Route('/products/{id}', type: 'integer')]`
- [ ] D) `#[Route('/products/{id}', validate: ['id' => 'numeric'])]`

**Correct Answer(s):** A
**Explanation:** The `requirements:` parameter maps parameter names to regex patterns.

---

**Question 7:** What happens when a route parameter doesn't match its `requirements` regex?
**Type:** Single answer
- [ ] A) The parameter is set to null
- [ ] B) The route doesn't match — the router tries the next route
- [ ] C) A 500 error is thrown
- [ ] D) The value is coerced to match

**Correct Answer(s):** B
**Explanation:** If requirements don't match, the route simply doesn't match. The router continues trying other routes.

---

**Question 8:** The requirement `'\d+'` means:
**Type:** Single answer
- [ ] A) Any string
- [ ] B) One or more digits
- [ ] C) Exactly one digit
- [ ] D) An alphabetic string

**Correct Answer(s):** B
**Explanation:** `\d+` = one or more digits (0-9).

---

### Set default values to URL parameters

**Question 9:** How do you make a route parameter optional with a default value?
**Type:** Single answer
- [ ] A) `#[Route('/blog/{page}', defaults: ['page' => 1])]` or `public function list(int $page = 1)`
- [ ] B) `#[Route('/blog/{page?}')]`
- [ ] C) `#[Route('/blog/{page}', optional: true)]`
- [ ] D) `#[Route('/blog/[page]')]`

**Correct Answer(s):** A
**Explanation:** Use `defaults:` in the route attribute OR a PHP default value in the method signature.

---

**Question 10:** If a route has `/blog/{page}` with default `page=1`, which URL will match?
**Type:** Multiple choice
- [ ] A) `/blog`
- [ ] B) `/blog/`
- [ ] C) `/blog/2`
- [ ] D) `/blog/abc`

**Correct Answer(s):** A, B, C, D
**Explanation:** All match (unless `requirements` restricts `page`). `/blog` and `/blog/` use the default value 1.

---

### URLs generation

**Question 11:** In a controller, how do you generate a URL for a route?
**Type:** Single answer
- [ ] A) `$this->generateUrl('route_name', ['id' => 42])`
- [ ] B) `$this->createUrl('route_name')`
- [ ] C) `$this->url('route_name')`
- [ ] D) `Route::generate('route_name')`

**Correct Answer(s):** A
**Explanation:** `AbstractController::generateUrl()` — generates a relative URL.

---

**Question 12:** To generate an absolute URL (with scheme and host), pass which constant?
**Type:** Single answer
- [ ] A) `UrlGeneratorInterface::ABSOLUTE_URL`
- [ ] B) `UrlGeneratorInterface::ABSOLUTE_PATH`
- [ ] C) `UrlGeneratorInterface::RELATIVE_PATH`
- [ ] D) `UrlGeneratorInterface::FULL_URL`

**Correct Answer(s):** A
**Explanation:** `ABSOLUTE_URL` generates `https://example.com/path`. `ABSOLUTE_PATH` (default) generates `/path`.

---

**Question 13:** In Twig, `{{ path('route_name', {id: 42}) }}` generates:
**Type:** Single answer
- [ ] A) An absolute URL
- [ ] B) A relative path (e.g., `/products/42`)
- [ ] C) A JavaScript object
- [ ] D) A route object

**Correct Answer(s):** B
**Explanation:** `path()` = relative path. `url()` = absolute URL.

---

**Question 14:** Extra parameters passed to `path()` or `generateUrl()` that are not in the route pattern become:
**Type:** Single answer
- [ ] A) Ignored
- [ ] B) Query string parameters
- [ ] C) An error
- [ ] D) Hash fragments

**Correct Answer(s):** B
**Explanation:** `path('list', {page: 2, sort: 'name'})` → `/list?page=2&sort=name` if `page` and `sort` are not route params.

---

### Trigger redirects

**Question 15:** How do you define a redirect directly in route configuration (no controller)?
**Type:** Single answer
- [ ] A) Use `RedirectController::urlRedirectAction` or `RedirectController::redirectAction`
- [ ] B) Use `controller: redirect`
- [ ] C) It's not possible without a controller
- [ ] D) Use `forward: /new-url`

**Correct Answer(s):** A
**Explanation:** Symfony's built-in `RedirectController` handles redirects from route config without custom code.

---

### Special internal routing attributes

**Question 16:** Which of the following are special route parameters recognized by Symfony? (Select all)
**Type:** Multiple choice
- [ ] A) `_controller`
- [ ] B) `_format`
- [ ] C) `_locale`
- [ ] D) `_fragment`
- [ ] E) `_method`

**Correct Answer(s):** A, B, C, D
**Explanation:** `_controller` (callable), `_format` (request format), `_locale` (locale), `_fragment` (URL fragment). `_method` is a form field, not a route parameter.

---

**Question 17:** The `_locale` route parameter automatically:
**Type:** Single answer
- [ ] A) Translates the page
- [ ] B) Sets the request locale via `$request->setLocale()`
- [ ] C) Validates the language
- [ ] D) Redirects to a localized page

**Correct Answer(s):** B
**Explanation:** `_locale` is read by `LocaleListener` which calls `$request->setLocale()`.

---

### Domain name matching

**Question 18:** How do you restrict a route to a specific subdomain?
**Type:** Single answer
- [ ] A) `#[Route('/dashboard', host: 'admin.example.com')]`
- [ ] B) `#[Route('/dashboard', subdomain: 'admin')]`
- [ ] C) `#[Route('admin://dashboard')]`
- [ ] D) It's not possible

**Correct Answer(s):** A
**Explanation:** The `host:` parameter matches the request's hostname.

---

**Question 19:** Can the `host` parameter contain placeholders (e.g., `{subdomain}.example.com`)?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `host: '{subdomain}.example.com'` captures the subdomain as a route parameter.

---

### Conditional request matching

**Question 20:** The `condition:` route option uses which Symfony component?
**Type:** Single answer
- [ ] A) Validator
- [ ] B) ExpressionLanguage
- [ ] C) Security
- [ ] D) Form

**Correct Answer(s):** B
**Explanation:** `condition:` accepts an ExpressionLanguage expression evaluated at routing time.

---

**Question 21:** What variables are available in a route `condition:` expression?
**Type:** Multiple choice
- [ ] A) `context` (RequestContext)
- [ ] B) `request` (Request)
- [ ] C) `user` (current User)
- [ ] D) `params` (route parameters)

**Correct Answer(s):** A, B
**Explanation:** Only `context` and `request` are available. `user` is NOT available (security hasn't run yet at routing time).

---

**Question 22:** Example condition: `condition: "request.headers.get('User-Agent') matches '/Firefox/'"` matches only:
**Type:** Single answer
- [ ] A) Firefox browsers
- [ ] B) Chrome browsers
- [ ] C) All browsers
- [ ] D) No browsers

**Correct Answer(s):** A
**Explanation:** The `matches` operator performs a regex match on the User-Agent header.

---

### HTTP methods matching

**Question 23:** How do you restrict a route to only accept POST requests?
**Type:** Single answer
- [ ] A) `#[Route('/submit', methods: ['POST'])]`
- [ ] B) `#[Route('/submit', method: 'POST')]`
- [ ] C) `#[Route('/submit', httpMethod: 'POST')]`
- [ ] D) `#[Post('/submit')]`

**Correct Answer(s):** A
**Explanation:** The `methods:` parameter accepts an array of allowed HTTP methods.

---

**Question 24:** If a route matches the URL but NOT the HTTP method, Symfony returns:
**Type:** Single answer
- [ ] A) 404 Not Found
- [ ] B) 405 Method Not Allowed
- [ ] C) 400 Bad Request
- [ ] D) 500 Internal Server Error

**Correct Answer(s):** B
**Explanation:** `405 Method Not Allowed` with an `Allow` header listing the valid methods.

---

**Question 25:** A route with no `methods:` restriction matches:
**Type:** Single answer
- [ ] A) Only GET
- [ ] B) Only GET and POST
- [ ] C) All HTTP methods
- [ ] D) Only safe methods

**Correct Answer(s):** C
**Explanation:** Without `methods:`, a route matches ALL HTTP methods.

---

### User's locale guessing

**Question 26:** The `_locale` route parameter sets the locale for:
**Type:** Single answer
- [ ] A) Only database queries
- [ ] B) The entire request (translations, number/date formatting, etc.)
- [ ] C) Only URL generation
- [ ] D) Only Twig rendering

**Correct Answer(s):** B
**Explanation:** `_locale` determines the request locale used by Translation, Intl, Twig, and all locale-aware services.

---

**Question 27:** The `framework.default_locale` configuration sets:
**Type:** Single answer
- [ ] A) The locale used when no `_locale` is in the route and no session locale is set
- [ ] B) The locale used for all requests regardless of route
- [ ] C) The database collation
- [ ] D) The server timezone

**Correct Answer(s):** A
**Explanation:** `default_locale` is the fallback when no locale is determined from the route, session, or `Accept-Language`.

---

### Router debugging

**Question 28:** Which command lists all registered routes?
**Type:** Single answer
- [ ] A) `php bin/console debug:router`
- [ ] B) `php bin/console router:list`
- [ ] C) `php bin/console routes:show`
- [ ] D) `php bin/console list:routes`

**Correct Answer(s):** A
**Explanation:** `debug:router` shows all routes, their paths, methods, and controller references.

---

**Question 29:** `php bin/console debug:router --show-controllers` shows:
**Type:** Single answer
- [ ] A) Only route names
- [ ] B) The FQCN and method of each route's controller
- [ ] C) Only HTTP methods
- [ ] D) The route conditions

**Correct Answer(s):** B
**Explanation:** `--show-controllers` adds the controller column to the output.

---

**Question 30:** `php bin/console router:match /products/42` does what?
**Type:** Single answer
- [ ] A) Creates a new route
- [ ] B) Shows which route matches the given URL path and what parameters are resolved
- [ ] C) Deletes the route
- [ ] D) Generates the URL

**Correct Answer(s):** B
**Explanation:** `router:match` simulates URL matching and shows the matched route, controller, and extracted parameters.

---

**Question 31:** `router:match` can simulate a specific HTTP method with:
**Type:** Single answer
- [ ] A) `--method=POST`
- [ ] B) `-X POST`
- [ ] C) `--http-method POST`
- [ ] D) `--verb POST`

**Correct Answer(s):** A
**Explanation:** `php bin/console router:match /path --method=POST` simulates a POST request for matching.

---

---
