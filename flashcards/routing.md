# Flashcards : Routing (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every configuration option, attribute syntax, and edge case covered.

---

### Routing component

**Q: What is the Symfony Routing component's single responsibility?**
**A:** Map an incoming URL (path + method + host + etc.) to a controller callable. The result is stored in `$request->attributes` as `_controller`, `_route`, `_route_params`.
**Code Snippet:** N/A

---

**Q: What loaders does Symfony support for route configuration?**
**A:** PHP Attributes (default), YAML, XML, and PHP closures/fluent API. All can be mixed, configured per-resource in `config/routes.yaml`.
**Code Snippet:**
```yaml
# config/routes.yaml
controllers:
    resource:
        path: ../src/Controller/
        namespace: App\Controller
    type: attribute
```

---

**Q: What is the `_controller` value format for the route `defaults` in YAML?**
**A:** A string in the format `App\Controller\MyController::methodName` (FQCN::method), or a service ID with `::` method.
**Code Snippet:**
```yaml
home:
    path: /
    defaults:
        _controller: App\Controller\HomeController::index
```

---

**Q: How does Symfony load all routes defined via PHP Attributes from a directory?**
**A:** By configuring a resource/directory import in `config/routes.yaml` with `type: attribute`.
**Code Snippet:**
```yaml
controllers:
    resource:
        path: ../src/Controller/
        namespace: App\Controller
    type: attribute
```

---

**Q: How do you debug all registered routes in a Symfony project?**
**A:** Use `php bin/console debug:router` (or `router:debug`). Filter with `--name` or `--path`. Use `--show-controllers` to see matched controller.
**Code Snippet:**
```bash
php bin/console debug:router
php bin/console debug:router product_show
php bin/console debug:router --path=/products
php bin/console router:match /products/42
```

---

**Q: What does `php bin/console router:match /products/42` do?**
**A:** Simulates route matching for the given URL, showing which route matches and what parameters are extracted. Useful for debugging routing conflicts.
**Code Snippet:**
```bash
php bin/console router:match /products/42
php bin/console router:match /products/42 --method=POST
```

---

### Configuration (YAML and Attributes)

**Q: What is the minimum `#[Route]` attribute configuration required on a controller method?**
**A:** At minimum, `path:` (the URL pattern). Name and methods are optional but strongly recommended.
**Code Snippet:**
```php
#[Route('/products')]               // minimal
#[Route('/products', name: 'product_list', methods: ['GET'])]  // recommended
public function list(): Response { ... }
```

---

**Q: Where can the `#[Route]` attribute be placed in Symfony 8?**
**A:** On a **controller method** (most common) or on the **controller class** (adds a prefix to all method routes in that class).
**Code Snippet:**
```php
#[Route('/products')]               // Class prefix
class ProductController {
    #[Route('/', name: 'product_list')]      // → /products/
    public function list() {}
    #[Route('/{id}', name: 'product_show')] // → /products/{id}
    public function show(int $id) {}
}
```

---

**Q: How do you define a route that matches multiple HTTP methods?**
**A:** Pass an array to `methods:` in `#[Route]`.
**Code Snippet:**
```php
#[Route('/api/product/{id}', methods: ['GET', 'HEAD'])]
public function show(int $id): Response { ... }
```

---

**Q: How do you define the same path for multiple HTTP methods that call different actions?**
**A:** Use separate `#[Route]` definitions with different `methods:` values and different `name:`.
**Code Snippet:**
```php
#[Route('/api/products/{id}', name: 'product_show',   methods: ['GET'])]
public function show(int $id): Response {}

#[Route('/api/products/{id}', name: 'product_update', methods: ['PUT'])]
public function update(int $id, Request $request): Response {}

#[Route('/api/products/{id}', name: 'product_delete', methods: ['DELETE'])]
public function delete(int $id): Response {}
```

---

**Q: How do you define a YAML route with multiple methods?**
**A:** Use the `methods:` key with an array.
**Code Snippet:**
```yaml
api_product_show:
    path: /api/products/{id}
    controller: App\Controller\ProductController::show
    methods: [GET, HEAD]
```

---

**Q: What is the `condition:` option in a route definition?**
**A:** An ExpressionLanguage expression that must evaluate to `true` for the route to match. Checked after path/method/host matching.
**Code Snippet:**
```yaml
api_route:
    path: /api/resource
    controller: App\Controller\ApiController::action
    condition: "context.getMethod() in ['GET', 'POST'] and request.headers.get('Accept') matches '/application\\/json/i'"
```
```php
#[Route('/api', condition: "request.headers.get('Accept') matches '/json/i'")]
```

---

### Route parameters

**Q: How do you define a required route parameter and access it in the controller?**
**A:** Use `{paramName}` in the path. Symfony injects it as a controller argument matching the parameter name (or reads from `$request->attributes`).
**Code Snippet:**
```php
#[Route('/products/{id}', name: 'product_show')]
public function show(int $id): Response {
    // $id is automatically cast to int
}
```

---

**Q: How do you define an optional route parameter with a default value?**
**A:** Set a `defaults:` for the parameter. Declare it with a default value in the controller method signature.
**Code Snippet:**
```php
#[Route('/blog/{page}', name: 'blog_list', defaults: ['page' => 1])]
public function list(int $page): Response { ... }
// /blog/ → page=1, /blog/3 → page=3
```

---

**Q: How do you add a regex requirement to a route parameter?**
**A:** Use the `requirements:` option in the attribute or YAML.
**Code Snippet:**
```php
#[Route('/products/{id}', requirements: ['id' => '\d+'])]
public function show(int $id): Response { ... }
// Only matches if id is numeric — /products/abc will 404
```
```yaml
product_show:
    path: /products/{id}
    requirements:
        id: \d+
```

---

**Q: How do you add requirements directly inline in the route parameter syntax?**
**A:** Use `{name<regex>}` in the path string — a shortcut for `requirements`.
**Code Snippet:**
```php
#[Route('/products/{id<\d+>}', name: 'product_show')]
```

---

**Q: How do you make a route parameter that is a slug (only a-z, 0-9, dashes)?**
**A:** Add a regex requirement `[a-z0-9-]+` to the parameter.
**Code Snippet:**
```php
#[Route('/articles/{slug<[a-z0-9-]+>}', name: 'article_show')]
public function show(string $slug): Response { ... }
```

---

**Q: What is the `{_locale}` special parameter and what does Symfony do with it automatically?**
**A:** Symfony recognises `_locale` as the application locale. When present in the route, it automatically calls `$request->setLocale()` with the matched value.
**Code Snippet:**
```php
#[Route('/{_locale}/products', name: 'product_list', requirements: ['_locale' => 'en|fr|de'])]
public function list(): Response { ... }
```

---

**Q: What is the `{_format}` special parameter?**
**A:** Sets `$request->setRequestFormat()` automatically. Allows content-negotiation via URL (e.g., `/products.json` vs `/products.html`).
**Code Snippet:**
```php
#[Route('/products.{_format}', defaults: ['_format' => 'html'], requirements: ['_format' => 'html|json'])]
public function list(Request $request): Response {
    if ('json' === $request->getRequestFormat()) {
        return $this->json($data);
    }
    return $this->render('product/list.html.twig', $data);
}
```

---

### URL generation

**Q: How do you generate a URL from a route name in a controller?**
**A:** Use `$this->generateUrl('route_name', $params)` (relative) or `$this->generateUrl('route_name', $params, UrlGeneratorInterface::ABSOLUTE_URL)` (absolute).
**Code Snippet:**
```php
$url = $this->generateUrl('product_show', ['id' => 42]);
// /products/42

$absoluteUrl = $this->generateUrl(
    'product_show',
    ['id' => 42],
    UrlGeneratorInterface::ABSOLUTE_URL
);
// https://example.com/products/42
```

---

**Q: How do you generate a URL from inside a service (not a controller)?**
**A:** Inject `RouterInterface` or `UrlGeneratorInterface` and call `generate()`.
**Code Snippet:**
```php
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class NotificationService {
    public function __construct(private UrlGeneratorInterface $router) {}

    public function getConfirmUrl(int $userId): string {
        return $this->router->generate(
            'user_confirm_email',
            ['id' => $userId],
            UrlGeneratorInterface::ABSOLUTE_URL
        );
    }
}
```

---

**Q: What are the four `UrlGeneratorInterface` reference type constants?**
**A:**
- `ABSOLUTE_PATH` (default = 0) → `/path/to/resource`
- `ABSOLUTE_URL` (1) → `https://host/path/to/resource`
- `RELATIVE_PATH` (2) → `../../resource`
- `NETWORK_PATH` (3) → `//host/path/to/resource`
**Code Snippet:**
```php
$this->router->generate('route', [], UrlGeneratorInterface::ABSOLUTE_URL);
$this->router->generate('route', [], UrlGeneratorInterface::NETWORK_PATH);
```

---

**Q: How do you append query string parameters when generating a URL?**
**A:** Any params that are NOT part of the route pattern are appended as query string.
**Code Snippet:**
```php
$url = $this->generateUrl('product_list', ['page' => 2, 'sort' => 'price']);
// /products?page=2&sort=price
```

---

### Redirect configuration

**Q: How do you configure a permanent redirect between routes directly in `routes.yaml` without a controller?**
**A:** Use the `RedirectController` bundle controller with `permanent: true`.
**Code Snippet:**
```yaml
old_blog:
    path: /old-blog/{page}
    controller: Symfony\Bundle\FrameworkBundle\Controller\RedirectController
    defaults:
        route: blog_list
        permanent: true  # 301
```

---

**Q: How do you redirect from HTTP to HTTPS at the routing/firewall level?**
**A:** Use `access_control` with `requires_channel: https` in `security.yaml`. Alternatively set it in the `defaults` of the route.
**Code Snippet:**
```yaml
# security.yaml
access_control:
    - { path: ^/, requires_channel: https }
```

---

### Sub-domain based routing

**Q: How do you restrict a route to a specific subdomain using the `host:` option?**
**A:** Add the `host:` parameter to the route with an expression (can include `{subdomain}` placeholders).
**Code Snippet:**
```php
#[Route('/dashboard', host: 'admin.{domain}', defaults: ['domain' => 'example.com'], requirements: ['domain' => '.+'])]
public function dashboard(): Response { ... }
```
```yaml
admin_dashboard:
    path: /dashboard
    host: admin.{domain}
    defaults:
        domain: example.com
```

---

**Q: How do you group routes under the same host/subdomain?**
**A:** Import them in `routes.yaml` and add the `host:` option at the import level (applies to all routes in the imported file).
**Code Snippet:**
```yaml
admin_routes:
    resource: '../src/Controller/Admin/'
    type: attribute
    host: 'admin.{domain}'
    defaults:
        domain: example.com
```

---

**Q: Can a route host pattern include a dynamic variable? How is it accessed?**
**A:** Yes — `host: '{subdomain}.example.com'` binds `subdomain` as a route parameter injected into the controller just like path parameters.
**Code Snippet:**
```php
#[Route('/profile', host: '{subdomain}.example.com')]
public function profile(string $subdomain): Response { ... }
```

---

### Conditional request matching

**Q: What can you use in the `condition:` route option to inspect the request?**
**A:** Symfony ExpressionLanguage with access to `context` (`RequestContext`) and `request` (`Request` object). Useful for header inspection, IP checks, custom logic.
**Code Snippet:**
```yaml
api_mobile:
    path: /home
    condition: "request.headers.get('User-Agent') matches '/iPhone/i'"
    controller: App\Controller\MobileController::home
```

---

**Q: What is the performance trade-off of using `condition:` on routes?**
**A:** Route conditions are evaluated at match time (not compile time). If many routes have conditions, each request must evaluate them. Cache cannot fully optimize them.
**Code Snippet:** N/A

---

### HTTP methods

**Q: What HTTP status does Symfony return when a path matches but the method does not?**
**A:** `405 Method Not Allowed`, and includes an `Allow` header listing the permitted methods.
**Code Snippet:**
```bash
# Route only has GET defined, client sends DELETE:
# → 405 Method Not Allowed
# → Allow: GET
```

---

**Q: How do you override the HTTP method for HTML forms (which only support GET/POST)?**
**A:** Add a hidden `_method` field with value `DELETE`, `PUT`, or `PATCH`. Enable `http_method_override` in `framework.yaml`.
**Code Snippet:**
```twig
<form method="POST" action="{{ path('product_delete', {id: product.id}) }}">
    <input type="hidden" name="_method" value="DELETE">
    <button type="submit">Delete</button>
</form>
```
```yaml
# framework.yaml
framework:
    http_method_override: true
```

---

### Locale guessing

**Q: How does Symfony determine the locale on a per-request basis from routing?**
**A:** From the `_locale` route parameter (highest priority). If not set, falls back to `Accept-Language` (if `LocaleListener` is configured), then `default_locale` from `framework.yaml`.
**Code Snippet:**
```php
#[Route('/{_locale}/news', requirements: ['_locale' => 'en|fr|de'])]
public function news(): Response { ... }
```

---

**Q: What service/subscriber is responsible for setting the locale from the request?**
**A:** `LocaleListener` (event subscriber subscribed to `kernel.request`). It reads `_locale` from route attributes and calls `$request->setLocale()`.
**Code Snippet:** N/A

---

**Q: How do you persist the locale across requests in a session-based application?**
**A:** Save the locale to the session in a listener subscribed to `kernel.request`, and restore it. Or use a dedicated `LocaleSubscriber` pattern.
**Code Snippet:**
```php
public function onKernelRequest(RequestEvent $event): void {
    $request = $event->getRequest();
    if (!$request->hasPreviousSession()) return;
    $locale = $request->attributes->get('_locale')
        ?? $request->getSession()->get('_locale', 'en');
    $request->setLocale($locale);
    $request->getSession()->set('_locale', $locale);
}
```

---

### Route debugging

**Q: What does `php bin/console debug:router --show-aliases` show?**
**A:** Shows route aliases — alternative names that point to the same route.
**Code Snippet:**
```bash
php bin/console debug:router --show-aliases
```

---

**Q: How do you verify whether a specific URL matches any route from the CLI?**
**A:** Use `php bin/console router:match <url> [--method=METHOD]`.
**Code Snippet:**
```bash
php bin/console router:match /products/42 --method=GET
php bin/console router:match /products/new --method=POST
```

---

**Q: What does `debug:router --format=json` produce?**
**A:** Outputs all routes in JSON format, useful for tooling or programmatic analysis.
**Code Snippet:**
```bash
php bin/console debug:router --format=json > routes.json
```

---
