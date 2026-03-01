# Flashcards : Controllers (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every technical detail, API, and edge case covered.

---

### HttpKernel component and FrameworkBundle

**Q: What role does the `HttpKernel` component play in the Symfony request lifecycle?**
**A:** It is the central orchestrator — it receives a `Request`, dispatches kernel events, calls the matched controller, and returns a `Response`. It converts the request/controller cycle into HTTP.
**Code Snippet:** N/A

---

**Q: What interface must any callable used as a Symfony controller satisfy?**
**A:** None — any PHP callable works (class method, invokable class, closure, static method). The only requirement is that it returns a `Response` (or something convertible via `kernel.view`).
**Code Snippet:**
```php
// Class method controller (most common):
public function list(): Response { ... }
// Invokable class:
class ListProductsController { public function __invoke(): Response { ... } }
// Closure route:
$routes->add('home', '/')->controller(fn() => new Response('Hello'));
```

---

**Q: What does `AbstractController` provide that a plain PHP class does not?**
**A:** Helper methods: `render()`, `json()`, `redirect()`, `redirectToRoute()`, `forward()`, `generateUrl()`, `getUser()`, `isGranted()`, `denyAccessUnlessGranted()`, `addFlash()`, `createForm()`, `createNotFoundException()`, `dispatchMessage()`.
**Code Snippet:**
```php
class ProductController extends AbstractController {
    public function show(int $id): Response {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('product/show.html.twig', ['id' => $id]);
    }
}
```

---

**Q: Does extending `AbstractController` inject the service container into the controller?**
**A:** Yes — `AbstractController` has a `setContainer()` method and accesses a limited set of services via `$this->container`. However, services beyond the "allowed list" must be injected via constructor.
**Code Snippet:**
```php
// Services auto-accessible in AbstractController (no DI needed):
// Twig, router, security, form factory, session, etc.
// Custom services: inject via constructor
public function __construct(private OrderService $orders) {}
```

---

**Q: What is the `#[AsController]` attribute in Symfony 8 and when should you use it?**
**A:** Tags a class as a controller service (applying `controller.service_arguments` tag). Needed when the class does NOT extend `AbstractController` and is not autoconfigured as a controller automatically.
**Code Snippet:**
```php
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ApiProductController {
    public function __construct(private ProductService $service) {}
    public function list(): Response { ... }
}
```

---

### Naming conventions

**Q: What is the naming convention for a Symfony controller class?**
**A:** `PascalCase` + `Controller` suffix. Located in `src/Controller/`.
**Code Snippet:**
```php
// File: src/Controller/ProductController.php
class ProductController extends AbstractController {}
```

---

**Q: What is the convention for controller action method names?**
**A:** Descriptive verb names: `list()`, `show()`, `new()`, `create()`, `edit()`, `update()`, `delete()`. The `Action` suffix is optional (it was required in older Symfony versions).
**Code Snippet:**
```php
#[Route('/products', name: 'product_list', methods: ['GET'])]
public function list(): Response { ... }

#[Route('/products/{id}', name: 'product_show')]
public function show(Product $product): Response { ... }
```

---

**Q: What is the conventional route name format for a controller action?**
**A:** `resource_action` in snake_case: `product_list`, `product_show`, `user_edit`, `order_checkout_confirm`.
**Code Snippet:** N/A

---

### The base AbstractController class

**Q: What are the security-related helper methods provided by `AbstractController`?**
**A:** `getUser()` (current user), `isGranted($attr, $subject)` (check permission), `denyAccessUnlessGranted($attr, $subject)` (deny or throw 403).
**Code Snippet:**
```php
$user = $this->getUser();                        // ?UserInterface
$can  = $this->isGranted('ROLE_ADMIN');          // bool
$this->denyAccessUnlessGranted('edit', $post);  // throws if false
```

---

**Q: What is the difference between `$this->render()` and `$this->renderView()` in `AbstractController`?**
**A:** `render()` returns a full `Response` with rendered Twig. `renderView()` returns only the rendered string (useful when you need to embed template output into something else, like an email body).
**Code Snippet:**
```php
return $this->render('email/welcome.html.twig', ['user' => $user]);      // Response
$html = $this->renderView('email/welcome.html.twig', ['user' => $user]); // string
```

---

**Q: How do you create and return a JSON response using `AbstractController`?**
**A:** Use `$this->json($data, $status, $headers, $context)`. It uses the Symfony Serializer if available, otherwise `json_encode()`.
**Code Snippet:**
```php
return $this->json(['products' => $list], 200, [], ['groups' => ['read']]);
```

---

**Q: What does `$this->createNotFoundException()` return and what HTTP code does it produce?**
**A:** Returns a `NotFoundHttpException` (extends `HttpException`). When thrown, it produces a `404 Not Found` response.
**Code Snippet:**
```php
$product = $this->repo->find($id);
if (!$product) {
    throw $this->createNotFoundException('Product '.$id.' not found.');
}
```

---

**Q: What does `dispatchMessage()` do in `AbstractController`?**
**A:** Dispatches a Messenger message via the `MessageBusInterface`. Shortcut to avoid injecting the bus manually.
**Code Snippet:**
```php
$this->dispatchMessage(new ProcessOrderMessage($order->getId()));
```

---

### The request

**Q: How do you access the `Request` object in a Symfony controller?**
**A:** Type-hint it as a parameter of the action method. Symfony injects it automatically via the `RequestValueResolver`.
**Code Snippet:**
```php
public function search(Request $request): Response {
    $q = $request->query->getString('q');
    return $this->render('search/results.html.twig', ['query' => $q]);
}
```

---

**Q: What is `$request->getMethod()` and what does it return?**
**A:** Returns the HTTP method as an uppercase string: `'GET'`, `'POST'`, `'PUT'`, `'PATCH'`, `'DELETE'`, etc.
**Code Snippet:**
```php
if ($request->isMethod('POST')) {
    // handle form submission
}
```

---

**Q: How do you get the client's IP address from the `Request` object?**
**A:** `$request->getClientIp()`. If behind a reverse proxy, configure trusted proxies in `framework.yaml` so Symfony reads `X-Forwarded-For` correctly.
**Code Snippet:**
```php
$ip = $request->getClientIp();
```
```yaml
framework:
    trusted_proxies: '127.0.0.1,REMOTE_ADDR'
    trusted_headers: ['x-forwarded-for', 'x-forwarded-host', 'x-forwarded-port', 'x-forwarded-proto']
```

---

**Q: How do you determine the request format (HTML, JSON, XML) from the `Request` object?**
**A:** Use `$request->getRequestFormat()` (returns `html`, `json`, `xml`, etc.) or `$request->getPreferredFormat()`. Format is determined by the `_format` route parameter or the `Accept` header.
**Code Snippet:**
```php
if ('json' === $request->getPreferredFormat()) {
    return $this->json($data);
}
return $this->render('template.html.twig', $data);
```

---

**Q: What is the difference between `$request->query` and `$request->request` bags?**
**A:** `query` = URL query string (`GET` params). `request` = POST body params. Do NOT use `$request->get()` as it searches both plus attributes.
**Code Snippet:**
```php
$page  = $request->query->getInt('page', 1);    // ?page=2 in URL
$email = $request->request->getString('email'); // POST body field
```

---

**Q: What does `$request->attributes->get('_route')` return?**
**A:** The name of the matched route (e.g., `'product_show'`). The `attributes` bag holds all routing metadata: `_route`, `_controller`, `_route_params`, and custom route defaults.
**Code Snippet:**
```php
$routeName = $request->attributes->get('_route');
$routeParams = $request->attributes->get('_route_params');
```

---

### The response

**Q: What are the four most commonly used `Response` subclasses in Symfony?**
**A:**
1. `Response` — plain text/HTML
2. `JsonResponse` — JSON body with correct `Content-Type`
3. `RedirectResponse` — HTTP redirect (301/302)
4. `BinaryFileResponse` — file download
**Code Snippet:**
```php
new Response('<h1>Hello</h1>', 200, ['Content-Type' => 'text/html']);
new JsonResponse(['ok' => true], 201);
new RedirectResponse('/new-url', 301);
new BinaryFileResponse('/path/to/file.pdf');
```

---

**Q: How do you set a custom response header in Symfony?**
**A:** Use the `headers` property on the `Response` object (a `ResponseHeaderBag`). Call `set()`, `add()`, `remove()`.
**Code Snippet:**
```php
$response = new Response($content);
$response->headers->set('X-Custom-Header', 'my-value');
$response->headers->set('Cache-Control', 'no-cache, private');
return $response;
```

---

**Q: What does `$response->setPublic()` / `$response->setPrivate()` do?**
**A:** Sets the `Cache-Control: public` or `Cache-Control: private` directive. Public responses may be cached by shared caches (reverse proxies). Private only by the user's browser.
**Code Snippet:**
```php
$response->setPublic();
$response->setMaxAge(3600);     // Cache-Control: public, max-age=3600
$response->setPrivate();
$response->setMaxAge(0);        // Cache-Control: private, max-age=0
```

---

**Q: What is `Response::HTTP_*` constant series and give 5 examples?**
**A:** Named constants for HTTP status codes:
- `Response::HTTP_OK` = 200
- `Response::HTTP_CREATED` = 201
- `Response::HTTP_NO_CONTENT` = 204
- `Response::HTTP_NOT_FOUND` = 404
- `Response::HTTP_UNPROCESSABLE_ENTITY` = 422
**Code Snippet:**
```php
return new Response('', Response::HTTP_NO_CONTENT);
return new JsonResponse($data, Response::HTTP_CREATED);
```

---

### The cookies

**Q: How do you add a cookie to a Symfony response?**
**A:** Use `$response->headers->setCookie(Cookie::create(...))`.
**Code Snippet:**
```php
use Symfony\Component\HttpFoundation\Cookie;

$cookie = Cookie::create('remember_token')
    ->withValue('abc123')
    ->withExpires(new \DateTime('+30 days'))
    ->withHttpOnly(true)
    ->withSecure(true)
    ->withSameSite(Cookie::SAMESITE_LAX);

$response->headers->setCookie($cookie);
```

---

**Q: How do you delete (expire) a cookie in Symfony?**
**A:** Use `$response->headers->clearCookie('name')` — sets the cookie with past expiry date.
**Code Snippet:**
```php
$response->headers->clearCookie('remember_token');
// Optional: pass path and domain if they were set originally
$response->headers->clearCookie('token', '/', 'example.com');
```

---

**Q: What is the `SameSite` attribute on a cookie and what are the three valid values?**
**A:** Controls whether the cookie is sent with cross-site requests. Values: `Strict` (never cross-site), `Lax` (top-level navigation GET only), `None` (always, requires `Secure`).
**Code Snippet:** N/A

---

### The session

**Q: How do you access the session in a Symfony controller?**
**A:** Inject `SessionInterface` or `RequestStack` into the controller, or use `$request->getSession()` (requires the session to be started).
**Code Snippet:**
```php
// Via RequestStack (preferred in services):
public function __construct(private RequestStack $requestStack) {}
public function doSomething(): void {
    $session = $this->requestStack->getSession();
    $session->set('cart_id', 42);
}

// In a controller action:
public function action(Request $request): Response {
    $session = $request->getSession();
    $value = $session->get('cart_id');
}
```

---

**Q: What is the difference between `$session->set()` and `$session->get()` and `$session->has()`?**
**A:** `set($key, $value)` stores a value. `get($key, $default)` retrieves it (with optional default). `has($key)` checks existence. `remove($key)` deletes. `clear()` empties the session.
**Code Snippet:**
```php
$session->set('user_prefs', ['theme' => 'dark']);
$theme = $session->get('user_prefs', [])['theme'] ?? 'light';
if ($session->has('cart')) { ... }
$session->remove('cart');
```

---

**Q: How do you store complex objects in the Symfony session safely?**
**A:** Objects stored in the session are serialized. They must be serializable (no closures, resources, etc.). Prefer storing only IDs or simple arrays and re-fetching objects from the database.
**Code Snippet:**
```php
// Bad: stores full object (fragile across class changes)
$session->set('user', $user);
// Good: store only the ID
$session->set('user_id', $user->getId());
```

---

### The flash messages

**Q: What is a flash message and what distinguishes it from a regular session value?**
**A:** A flash message is stored in the session but **consumed (deleted) on the next request**. It's designed for one-time UX notifications (success, error alerts).
**Code Snippet:**
```php
// Set a flash:
$this->addFlash('success', 'Product saved!');
$this->addFlash('error', 'Failed to save.');

// Read in Twig (and auto-consume):
{% for msg in app.flashes('success') %}
    <div class="alert">{{ msg }}</div>
{% endfor %}
```

---

**Q: Can you add multiple flash messages of the same type?**
**A:** Yes. `addFlash()` appends to the array for that type. `app.flashes('success')` returns all messages of that type as an array.
**Code Snippet:**
```php
$this->addFlash('error', 'Name is required.');
$this->addFlash('error', 'Email is invalid.');
// Twig: app.flashes('error') → ['Name is required.', 'Email is invalid.']
```

---

**Q: What is the `FlashBagInterface` and the preferred way to access it in a service (not a controller)?**
**A:** Access via `$requestStack->getSession()->getFlashBag()`. The `getFlashBag()` method is on `SessionInterface`, which is retrieved from the `RequestStack`.
**Code Snippet:**
```php
$flashBag = $this->requestStack->getSession()->getFlashBag();
$flashBag->add('notice', 'Your export is being processed.');
```

---

### HTTP redirects

**Q: What is the difference between a 301 and 302 redirect in Symfony and when would you use each?**
**A:** `301 Permanently Moved` — route has permanently changed (SEO: update bookmarks/caches). `302 Found` — temporary. Use `302` for POST-Redirect-GET to avoid form resubmission. Use `301` for permanent URL changes.
**Code Snippet:**
```php
// 302 (default): temporary
return $this->redirectToRoute('product_list');
// 301: permanent
return $this->redirectToRoute('product_list', [], 301);
// 303 See Other: PRG pattern after POST
return $this->redirectToRoute('product_show', ['id' => $id], 303);
```

---

**Q: What is the `Post/Redirect/Get` (PRG) pattern and why is it important?**
**A:** After a POST submission, redirect to a GET route. Prevents double-form-submission when the user refreshes the page. The status `303 See Other` is semantically correct for POST → GET redirect.
**Code Snippet:**
```php
public function create(Request $request): Response {
    $form = $this->createForm(ProductType::class);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
        // persist...
        return $this->redirectToRoute('product_show', ['id' => $product->getId()]);
    }
    return $this->render('product/new.html.twig', ['form' => $form]);
}
```

---

**Q: How do you redirect to an external URL in Symfony?**
**A:** Use `$this->redirect($url, $statusCode)` with a full URL string.
**Code Snippet:**
```php
return $this->redirect('https://external-site.com/path', 302);
```

---

**Q: What does `$this->redirectToRoute()` do internally?**
**A:** Generates the URL via the Router using the route name + params, then returns a `RedirectResponse` with that URL.
**Code Snippet:**
```php
return $this->redirectToRoute('product_show', ['id' => $id, 'tab' => 'specs']);
// Generates: /products/42?tab=specs → RedirectResponse
```

---

### Internal redirects

**Q: What is `$this->forward()` in Symfony and how does it differ from a redirect?**
**A:** `forward()` makes an **internal sub-request** — no HTTP round-trip, no new browser request. The response from the forwarded controller replaces the current response. The URL in the browser does NOT change.
**Code Snippet:**
```php
return $this->forward('App\Controller\DefaultController::index', [
    'id' => $id,
    '_format' => 'json',
]);
```

---

**Q: What is the performance implication of using `forward()` vs redirect?**
**A:** `forward()` makes an additional sub-request through the Symfony kernel (all middleware re-runs), which has overhead. A redirect is pure HTTP. Use `forward()` only when you genuinely need to reuse another action's logic without changing the URL.
**Code Snippet:** N/A

---

**Q: What is the difference between `forward()` and calling the controller method directly?**
**A:** `forward()` creates a full sub-request (listeners fire, response transformers run). Calling the method directly bypasses all kernel events. Prefer calling the method directly (via DI) for simple cases.
**Code Snippet:**
```php
// Better: call the method directly
return $this->defaultController->index($id);
// Only use forward() when you need the full kernel sub-request lifecycle
```

---

### Generate 404 pages

**Q: What is the cleanest way to throw a 404 in a Symfony controller?**
**A:** Throw a `NotFoundHttpException` using `$this->createNotFoundException()`.
**Code Snippet:**
```php
$product = $repo->find($id);
if (!$product) {
    throw $this->createNotFoundException('No product with id '.$id);
}
```

---

**Q: What HTTP status code does `NotFoundHttpException` produce?**
**A:** `404 Not Found`.
**Code Snippet:** N/A

---

**Q: How does Symfony map exceptions to HTTP status codes automatically?**
**A:** Any exception implementing `HttpExceptionInterface` (which `HttpException` subclasses do) returns its `getStatusCode()` value automatically. All other exceptions → `500 Internal Server Error`.
**Code Snippet:**
```php
throw new AccessDeniedHttpException();  // 403
throw new ConflictHttpException();      // 409
throw new TooManyRequestsHttpException(); // 429
```

---

**Q: How do you customize what the error page looks like in dev vs prod?**
**A:** In **dev**: Symfony shows the debug exception page (ExceptionController). In **prod**: renders templates from `templates/bundles/TwigBundle/Exception/error{code}.html.twig`. Preview prod error pages at `/_error/{statusCode}` in dev.
**Code Snippet:**
```
templates/bundles/TwigBundle/Exception/
├── error404.html.twig
├── error500.html.twig
└── error.html.twig   ← fallback for all other codes
```

---

### File upload

**Q: How do you access an uploaded file from a Symfony request?**
**A:** Via `$request->files->get('field_name')`. Returns an `UploadedFile` object (or null).
**Code Snippet:**
```php
/** @var \Symfony\Component\HttpFoundation\File\UploadedFile $file */
$file = $request->files->get('avatar');
if ($file && $file->isValid()) {
    $file->move('/uploads/', $file->getClientOriginalName());
}
```

---

**Q: What methods does `UploadedFile` expose to inspect the uploaded file?**
**A:** `getClientOriginalName()`, `getClientOriginalExtension()`, `getMimeType()`, `getSize()`, `getError()`, `isValid()`, `guessExtension()`, `move($dir, $filename)`.
**Code Snippet:**
```php
$ext  = $file->guessExtension();         // based on MIME, not user input
$size = $file->getSize();                 // bytes
$mime = $file->getMimeType();             // e.g. 'image/jpeg'
$safe = $file->isValid();                 // no upload errors
```

---

**Q: Why should you use `guessExtension()` instead of `getClientOriginalExtension()` for security?**
**A:** `getClientOriginalExtension()` returns what the client sent — which can be spoofed. `guessExtension()` uses the MIME type (detected server-side by Symfony) to determine the real extension.
**Code Snippet:**
```php
// Safe - server-detected:
$ext = $uploadedFile->guessExtension(); // 'jpg', 'png', etc.
// Unsafe - user-supplied:
$ext = $uploadedFile->getClientOriginalExtension(); // could be anything
```

---

**Q: How do you handle file uploads inside a Symfony form?**
**A:** Use `FileType` for the form field. The form binds the `UploadedFile` to the data object's property. Then move the file in the controller or a service after `isValid()`.
**Code Snippet:**
```php
// Form type:
$builder->add('avatar', FileType::class, ['required' => false]);
// Entity property type: ?string (filename) or UploadedFile (during form handling)
```

---

**Q: What is the maximum upload file size controlled by and how do you increase it?**
**A:** By `upload_max_filesize` and `post_max_size` in `php.ini`. Symfony itself has no limit — it defers to PHP's configuration.
**Code Snippet:**
```ini
; php.ini
upload_max_filesize = 20M
post_max_size = 25M
```

---

### Built-in internal controllers

**Q: How do you render a template directly from a route without a controller class?**
**A:** Use the `TemplateController` (via `Symfony\Bundle\FrameworkBundle\Controller\TemplateController`) as the route's controller / use the `defaults._controller` shorthand.
**Code Snippet:**
```yaml
# config/routes.yaml
about:
    path: /about
    controller: Symfony\Bundle\FrameworkBundle\Controller\TemplateController
    defaults:
        template: 'pages/about.html.twig'
        maxAge: 3600
```

---

**Q: How do you configure a redirect directly from a route definition (without a controller)?**
**A:** Use `RedirectController` as the controller with `route` (for named routes) or `path` (for external URLs) defaults.
**Code Snippet:**
```yaml
old_product_list:
    path: /old-products
    controller: Symfony\Bundle\FrameworkBundle\Controller\RedirectController
    defaults:
        route: product_list
        permanent: true   # 301
```

---

### Argument value resolvers

**Q: What is an Argument Value Resolver in Symfony?**
**A:** A service that resolves what value to inject for a controller action parameter. Symfony ships with built-in resolvers for `Request`, `UserInterface`, route attributes, session, services, etc.
**Code Snippet:** N/A

---

**Q: What built-in value resolvers are available in Symfony 8 for controller arguments?**
**A:**
- `RequestValueResolver` — injects `Request`
- `ServiceValueResolver` — injects services by type-hint
- `SessionValueResolver` — injects `SessionInterface`
- `UserValueResolver` — injects the authenticated user
- `EntityValueResolver` — (Doctrine) auto-fetches entity by route param
- `BackedEnumValueResolver` — converts route param string to Backed Enum
- `UidValueResolver` — converts route param string to `Uid` object
**Code Snippet:**
```php
public function show(
    Request $request,          // RequestValueResolver
    User $user,                // UserValueResolver (current auth user)
    #[MapEntity(id: 'id')] Product $product  // EntityValueResolver
): Response { ... }
```

---

**Q: How do you create a custom argument value resolver?**
**A:** Implement `ValueResolverInterface` with `resolve()` method. Tag it with `controller.argument_value_resolver` (done automatically with `autoconfigure`).
**Code Snippet:**
```php
use Symfony\Component\HttpKernel\Controller\ValueResolverInterface;

class CurrentSiteResolver implements ValueResolverInterface {
    public function resolve(Request $request, ArgumentMetadata $argument): iterable {
        if ($argument->getType() !== Site::class) return [];
        yield $this->siteDetector->detect($request);
    }
}
```

---

**Q: What is the `#[MapRequestPayload]` attribute and what does it do?**
**A:** Automatically deserializes the JSON request body into a typed DTO object and validates it. Throws `HttpException` on validation failure. Introduced in Symfony 6.3.
**Code Snippet:**
```php
public function create(
    #[MapRequestPayload] CreateProductDto $dto
): JsonResponse {
    // $dto is already validated and deserialized
    $product = $this->service->create($dto);
    return $this->json($product, 201);
}
```

---

**Q: What is the `#[MapQueryString]` attribute?**
**A:** Deserializes query string parameters into a typed DTO object (automatically validated). Introduced in Symfony 6.3.
**Code Snippet:**
```php
public function search(
    #[MapQueryString] SearchFilters $filters
): Response {
    // $filters->page, $filters->q, etc. auto-populated from ?page=2&q=test
}
```

---
