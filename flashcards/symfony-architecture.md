# Flashcards : Symfony Architecture (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every technical detail, configuration, and edge case covered.

---

### HttpFoundation component

**Q: What is the primary purpose of the HttpFoundation component?**
**A:** It provides an object-oriented layer over PHP's `$_SERVER`, `$_GET`, `$_POST`, `$_FILES`, `$_COOKIE`, and `$_SESSION` superglobals, wrapping them into `Request` and `Response` objects.
**Code Snippet:** N/A

---

**Q: What class represents an incoming HTTP request in Symfony?**
**A:** `Symfony\Component\HttpFoundation\Request`
**Code Snippet:**
```php
use Symfony\Component\HttpFoundation\Request;
$request = Request::createFromGlobals();
```

---

**Q: How do you create a `Request` object from PHP globals (in a traditional PHP context)?**
**A:** Call `Request::createFromGlobals()` which reads `$_GET`, `$_POST`, `$_SERVER`, `$_COOKIE`, `$_FILES`.
**Code Snippet:**
```php
$request = Request::createFromGlobals();
```

---

**Q: What are the main property bags on the `Request` object and what PHP superglobal does each map to?**
**A:**
- `$request->query` → `$_GET`
- `$request->request` → `$_POST`
- `$request->files` → `$_FILES`
- `$request->cookies` → `$_COOKIE`
- `$request->server` → `$_SERVER`
- `$request->headers` → parsed from `$_SERVER` HTTP_* entries
- `$request->attributes` → route parameters and other injected values
**Code Snippet:**
```php
$page = $request->query->getInt('page', 1);
$name = $request->request->get('name');
$auth = $request->headers->get('Authorization');
$id   = $request->attributes->get('id');
```

---

**Q: How do you get the raw body content of a request (e.g., a JSON API body)?**
**A:** Use `$request->getContent()`. Returns the raw body as a string.
**Code Snippet:**
```php
$data = json_decode($request->getContent(), true);
```

---

**Q: What does `$request->isXmlHttpRequest()` return and how does it work?**
**A:** Returns `true` if the request was made via JavaScript AJAX (i.e., the `X-Requested-With: XMLHttpRequest` header is present).
**Code Snippet:**
```php
if ($request->isXmlHttpRequest()) {
    return new JsonResponse(['partial' => $html]);
}
```

---

**Q: What is the `ParameterBag` class and what type-safe getter methods does it provide?**
**A:** `ParameterBag` wraps an array and provides: `get()`, `has()`, `all()`, `keys()`, `set()`, `add()`, `remove()`, `getInt()`, `getBool()`, `getAlpha()`, `getAlnum()`, `getDigits()`, `getString()`.
**Code Snippet:**
```php
$page = $request->query->getInt('page', 1);         // int with default
$active = $request->query->getBool('active', false); // bool
$name = $request->query->getAlpha('filter', '');     // only a-z letters
```

---

**Q: How is a `Response` object sent to the client in Symfony?**
**A:** Call `$response->send()` which sends headers then body. In the FrameworkBundle, the kernel handles this automatically after returning a `Response` from the controller.
**Code Snippet:**
```php
$response = new Response('<h1>Hello</h1>', Response::HTTP_OK, ['Content-Type' => 'text/html']);
$response->send();
```

---

**Q: What is `StreamedResponse` and when should you use it?**
**A:** Used to stream large responses (file downloads, CSV exports) to the client progressively, without loading everything into memory.
**Code Snippet:**
```php
return new StreamedResponse(function() {
    foreach ($hugeCsvRows as $row) {
        echo implode(',', $row)."\n";
        flush();
    }
}, 200, ['Content-Type' => 'text/csv']);
```

---

**Q: What is a `BinaryFileResponse` and what does it optimize?**
**A:** Sends a file to the client efficiently using `X-Sendfile` or PHP's `readfile()`. Supports range requests for partial downloads automatically.
**Code Snippet:**
```php
return new BinaryFileResponse('/path/to/file.pdf');
```

---

### Symfony Flex

**Q: What is Symfony Flex and what problem does it solve?**
**A:** Flex is a Composer plugin that automates package configuration. When you `composer require` a package, Flex applies a **recipe** — creating default config files, adding env vars, and registering bundles automatically.
**Code Snippet:**
```bash
composer require symfony/orm-pack
# Flex auto-creates config/packages/doctrine.yaml, .env DATABASE_URL, etc.
```

---

**Q: What is a Flex recipe and where are they stored?**
**A:** A recipe is a YAML manifest (in `symfony/recipes` or `symfony/recipes-contrib` repositories) that instructs Flex which files to copy, env vars to add, and bundles to register.
**Code Snippet:**
```json
{
    "manifest": {
        "copy-from-recipe": { "config/": "config/" },
        "env": { "DATABASE_URL": "sqlite:///%kernel.project_dir%/var/data.db" }
    }
}
```

---

**Q: What command updates all Flex recipes in a Symfony project?**
**A:** `composer recipes:update` or `composer recipes` (to list) and `composer recipes:install --force --reset` (to force reset a specific recipe).
**Code Snippet:**
```bash
composer recipes:update
composer recipes symfony/framework-bundle
```

---

**Q: What is the role of `symfony.lock` file?**
**A:** Tracks which Flex recipe version was installed for each package, ensuring consistent recipe state across team members and deployments.
**Code Snippet:** N/A

---

**Q: What does the `symfony` CLI tool add on top of Flex?**
**A:** The `symfony` binary provides: local dev server (`symfony serve`), security checking (`symfony check:security`), remote environment variables integration, SymfonyCloud deployment. It is separate from Flex but complements it.
**Code Snippet:**
```bash
symfony serve --daemon
symfony check:security
```

---

### License

**Q: Under what license is Symfony released?**
**A:** The **MIT License** — very permissive, allows use in commercial projects with minimal restrictions.
**Code Snippet:** N/A

---

**Q: What does the MIT license allow and what does it require?**
**A:** Allows: use, copy, modify, merge, publish, distribute, sublicense, sell. Requires: include the copyright notice and MIT license text in any distributed software.
**Code Snippet:** N/A

---

### Components and Bridges

**Q: What is the difference between a Symfony Component and a Symfony Bundle?**
**A:** A **Component** is a standalone PHP library (no Symfony dependency, usable anywhere). A **Bundle** is a Symfony-specific plugin that integrates a component or feature into the framework via DI configuration, routing, etc.
**Code Snippet:** N/A

---

**Q: What is a Symfony Bridge?**
**A:** A Bridge provides integration between a Symfony component and a third-party library (e.g., Doctrine, Monolog, PHPUnit). It does NOT replace the third-party library but makes it work with Symfony conventions.
**Code Snippet:** N/A

---

**Q: Give 5 examples of Symfony standalone Components (usable without the framework).**
**A:** `Console`, `HttpFoundation`, `EventDispatcher`, `Routing`, `DependencyInjection`, `Validator`, `Form`, `Finder`, `Process`. All are available on Composer with no Symfony framework requirement.
**Code Snippet:**
```bash
composer require symfony/console
composer require symfony/event-dispatcher
```

---

**Q: What is a PSR-7 bridge and why might you need it?**
**A:** PSR-7 defines a standard HTTP message interface (from PHP-FIG). Symfony uses its own `Request`/`Response`. The `psr-http-message-bridge` converts between them, allowing Symfony to work with PSR-7-based middleware/libraries.
**Code Snippet:**
```bash
composer require symfony/psr-http-message-bridge
```

---

**Q: What is `symfony/contracts` and why does it matter for cross-project compatibility?**
**A:** A set of PHP interfaces/abstractions (like `CacheInterface`, `HttpClientInterface`, `LoggerInterface` via PSR-3) that decouple consuming code from specific implementations.
**Code Snippet:**
```php
use Symfony\Contracts\Cache\CacheInterface;
// Type-hint against contract, not implementation
public function __construct(private CacheInterface $cache) {}
```

---

### Code organization

**Q: Where should business logic live in a Symfony application according to best practices?**
**A:** In `src/` under namespaced service classes, NOT in controllers or entities. Controllers should be thin (delegate to services). Avoid fat controllers.
**Code Snippet:**
```
src/
├── Controller/      ← thin, delegates to services
├── Service/         ← business logic
├── Entity/          ← data structures
├── Repository/      ← data access
├── Form/            ← form types
└── EventSubscriber/ ← event hooks
```

---

**Q: What is the default directory structure of a Symfony 8 application?**
**A:**
- `config/` — configuration files
- `public/` — document root (index.php)
- `src/` — application code
- `templates/` — Twig templates
- `tests/` — PHPUnit tests
- `translations/` — translation files
- `var/` — cache, logs
- `vendor/` — Composer dependencies
**Code Snippet:** N/A

---

**Q: What is `src/Kernel.php` responsible for?**
**A:** The Kernel is the core of Symfony — it registers bundles, loads configuration, and handles HTTP requests by dispatching them through the `HttpKernel`.
**Code Snippet:**
```php
class Kernel extends BaseKernel {
    use MicroKernelTrait;
}
```

---

### Request handling

**Q: What is the HTTP kernel request lifecycle in Symfony? List the key kernel events in order.**
**A:**
1. `kernel.request` — before routing
2. `kernel.controller` — after routing, before controller call
3. `kernel.controller_arguments` — resolve controller arguments
4. *(controller executes)*
5. `kernel.view` — if controller returns non-Response
6. `kernel.response` — after Response created
7. `kernel.terminate` — after Response sent (post-request)
**Code Snippet:** N/A

---

**Q: What is the `Front Controller` pattern and how does Symfony implement it?**
**A:** All requests go through a single entry point: `public/index.php`. This file creates the Kernel, wraps the request, and lets the framework handle routing/dispatch.
**Code Snippet:**
```php
// public/index.php
$kernel = new Kernel($_SERVER['APP_ENV'], (bool)$_SERVER['APP_DEBUG']);
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
```

---

**Q: What is `kernel.terminate` event used for?**
**A:** Post-response processing — runs AFTER the response is sent to the client. Ideal for expensive or non-critical operations (sending emails, logging, analytics) that must not slow down the HTTP response.
**Code Snippet:**
```php
class PostResponseSubscriber implements EventSubscriberInterface {
    public static function getSubscribedEvents(): array {
        return [KernelEvents::TERMINATE => 'onTerminate'];
    }
    public function onTerminate(TerminateEvent $event): void {
        $this->statsService->flush(); // Non-blocking
    }
}
```

---

**Q: What does the `kernel.view` event allow?**
**A:** If the controller returns something that is NOT a `Response` object, the `kernel.view` event fires. Listeners can transform the return value into a `Response` (e.g., serializing an object to JSON automatically).
**Code Snippet:**
```php
public function onKernelView(ViewEvent $event): void {
    $value = $event->getControllerResult();
    if (is_array($value)) {
        $event->setResponse(new JsonResponse($value));
    }
}
```

---

### Exception handling

**Q: What happens when an uncaught exception is thrown in a Symfony controller?**
**A:** The `HttpKernel` catches it and fires a `kernel.exception` event. Listeners can transform it into a `Response`. If no listener handles it, the default error handler renders an error page (TwigBundle renders template in `templates/bundles/TwigBundle/Exception/`).
**Code Snippet:** N/A

---

**Q: How do you create a custom error page in Symfony (e.g., for 404)?**
**A:** Create a template at `templates/bundles/TwigBundle/Exception/error404.html.twig` (or `error.html.twig` for all errors). Symfony renders these automatically in production.
**Code Snippet:**
```
templates/bundles/TwigBundle/Exception/
├── error.html.twig        ← generic fallback
├── error404.html.twig     ← 404 specific
└── error500.html.twig     ← 500 specific
```

---

**Q: What is `HttpExceptionInterface` and how do you use it to control error response codes?**
**A:** Any exception implementing `HttpExceptionInterface` (via `HttpException`) automatically sets the HTTP response status code. Throw it from anywhere and Symfony renders the correct error page.
**Code Snippet:**
```php
throw new NotFoundHttpException('Product not found.');     // 404
throw new AccessDeniedHttpException('No access.');         // 403
throw new BadRequestHttpException('Invalid input.');       // 400
```

---

**Q: What is the `ErrorController` and when does Symfony use it?**
**A:** In production, uncaught exceptions are routed to `ErrorController` (or a custom `error_controller` service) which renders error templates. In dev, the `ExceptionController` shows the full debug stack.
**Code Snippet:**
```yaml
# framework.yaml
framework:
    error_controller: App\Controller\MyErrorController::show
```

---

### Event dispatcher and kernel events

**Q: What is the EventDispatcher pattern and what components does Symfony use to implement it?**
**A:** Publisher-subscriber pattern. The `EventDispatcher` dispatches events; listeners/subscribers react to them. The `EventDispatcher` component handles generic events; `HttpKernel` uses it for the HTTP request lifecycle.
**Code Snippet:**
```php
$dispatcher->dispatch(new OrderPlacedEvent($order));
```

---

**Q: What is the difference between an Event Listener and an Event Subscriber?**
**A:** A **Listener** is a callable registered for one event via config. A **Subscriber** is a class implementing `EventSubscriberInterface` that declares which events it listens to and with what priority via `getSubscribedEvents()`.
**Code Snippet:**
```php
// Subscriber (self-registering):
class OrderSubscriber implements EventSubscriberInterface {
    public static function getSubscribedEvents(): array {
        return [OrderPlacedEvent::class => ['onOrderPlaced', 10]];
    }
    public function onOrderPlaced(OrderPlacedEvent $e): void { ... }
}
```

---

**Q: How do you set listener priority and what does it mean?**
**A:** The second element in the `getSubscribedEvents()` array for each event. **Higher number = called first.** Default is 0. Negative values run after zero-priority listeners.
**Code Snippet:**
```php
public static function getSubscribedEvents(): array {
    return [
        KernelEvents::REQUEST => [
            ['onRequestFirst', 100],  // runs first
            ['onRequestSecond', 10],  // runs second
        ],
    ];
}
```

---

**Q: How do you stop event propagation so no further listeners are called?**
**A:** Call `$event->stopPropagation()` from within a listener. Subsequent listeners for that event are not called.
**Code Snippet:**
```php
public function onRequest(RequestEvent $event): void {
    if ($this->isBlacklisted($event->getRequest())) {
        $event->setResponse(new Response('Blocked', 403));
        $event->stopPropagation();
    }
}
```

---

**Q: What are the main `KernelEvents` constants and their string values?**
**A:**
- `KernelEvents::REQUEST` = `'kernel.request'`
- `KernelEvents::CONTROLLER` = `'kernel.controller'`
- `KernelEvents::CONTROLLER_ARGUMENTS` = `'kernel.controller_arguments'`
- `KernelEvents::VIEW` = `'kernel.view'`
- `KernelEvents::RESPONSE` = `'kernel.response'`
- `KernelEvents::FINISH_REQUEST` = `'kernel.finish_request'`
- `KernelEvents::TERMINATE` = `'kernel.terminate'`
- `KernelEvents::EXCEPTION` = `'kernel.exception'`
**Code Snippet:** N/A

---

**Q: How does autoconfigure work for EventSubscribers?**
**A:** When `autoconfigure: true` (default), any class implementing `EventSubscriberInterface` is automatically tagged with `kernel.event_subscriber`. No manual tag required.
**Code Snippet:**
```php
// No tags needed in services.yaml with autoconfigure:
class MySubscriber implements EventSubscriberInterface { ... }
```

---

### Official best practices

**Q: What does the Symfony best practices guide say about controller dependency injection?**
**A:** Inject services only into controllers that actually use them. Use constructor injection (preferred) or `#[Autowire]` attribute. Avoid fetching services from the container manually.
**Code Snippet:**
```php
// Good:
class ProductController extends AbstractController {
    public function __construct(private ProductRepository $repo) {}
}
// Bad: $this->container->get('product_repository')
```

---

**Q: What is the recommended way to handle configuration in Symfony?**
**A:** Use `.env` for environment-specific values, `config/packages/*.yaml` for fixed framework config, and container parameters for reusable values. Don't hardcode URLs, credentials, or environment-specific data in PHP code.
**Code Snippet:**
```yaml
# .env
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
```

---

**Q: What does the Symfony best practice say about using `$request->get()` vs specific bags?**
**A:** Avoid `$request->get()` (searches query, POST, and attributes in one call — hidden source). Use specific bags: `$request->query->get()`, `$request->request->get()`, `$request->attributes->get()`.
**Code Snippet:**
```php
// Bad: could be query, POST, or route attribute
$id = $request->get('id');
// Good: explicit source
$id = $request->attributes->get('id');
$name = $request->query->get('name');
```

---

### Backward compatibility promise

**Q: What is Symfony's Backward Compatibility (BC) Promise?**
**A:** Symfony guarantees no breaking changes within a **major.minor** version (e.g., 8.0 → 8.9). Breaking changes only happen in major releases (7.x → 8.x) and are announced via deprecations at least one major version before.
**Code Snippet:** N/A

---

**Q: What does a `@deprecated` annotation on a Symfony class mean for developers?**
**A:** The class/method will be removed in the next major version. You should migrate away from it. Symfony triggers an `E_USER_DEPRECATED` notice to warn you.
**Code Snippet:**
```php
/** @deprecated since Symfony 7.4, use NewClass instead. Will be removed in 8.0. */
class OldClass { ... }
```

---

**Q: Which symbol types are covered by Symfony's BC promise?**
**A:** **Covered**: Classes marked `@final`, public methods/properties, constructor signatures of non-service classes. **NOT covered**: `@internal` classes, `@experimental` APIs, content of deprecated items.
**Code Snippet:** N/A

---

**Q: What is the `@experimental` tag in Symfony and what does it mean?**
**A:** Marks an API that is not yet stable and may change without deprecation notice even within a minor release. Avoid in production-critical code.
**Code Snippet:** N/A

---

### Deprecations best practices

**Q: How do you trigger a deprecation warning from your own code in a Symfony-compatible way?**
**A:** Use `trigger_deprecation($package, $since, $message)` from `symfony/deprecation-contracts`.
**Code Snippet:**
```php
use function Symfony\Component\Deprecation\trigger_deprecation;

trigger_deprecation('myapp/core', '2.1', 'Method %s() is deprecated, use %s() instead.', __METHOD__, 'newMethod');
```

---

**Q: Where do Symfony deprecation warnings appear in development?**
**A:** In the Web Debug Toolbar (deprecation counter), in the Profiler's "Logs" section, and in `var/log/dev.log` if configured. Also in PHPUnit output if using the PHPUnit Bridge.
**Code Snippet:** N/A

---

### Framework overloading

**Q: How do you override a template from a third-party bundle in Symfony?**
**A:** Create a template at `templates/bundles/[BundleName]/[OriginalPath]`. Symfony's `FilesystemLoader` checks this directory first.
**Code Snippet:**
```
# Override TwigBundle's exception template:
templates/bundles/TwigBundle/Exception/error404.html.twig
# Override FOSUserBundle template (example):
templates/bundles/FOSUserBundle/Registration/register.html.twig
```

---

**Q: How do you override a service class from a bundle?**
**A:** In your `services.yaml`, redefine the service ID with your own class. Or use decoration with `decorates:` to wrap the original.
**Code Snippet:**
```yaml
services:
    # Override a bundle's router service class:
    Symfony\Component\Routing\RouterInterface:
        class: App\Routing\CustomRouter
        decorates: router
```

---

**Q: How do you override a Bundle's configuration using `prepend`?**
**A:** Implement `PrependExtensionInterface` in your bundle extension and call `$container->prependExtensionConfig('bundle_name', [...])`.
**Code Snippet:**
```php
public function prepend(ContainerBuilder $container): void {
    $container->prependExtensionConfig('security', [
        'role_hierarchy' => ['ROLE_ADMIN' => ['ROLE_USER']]
    ]);
}
```

---

### Release management and roadmap schedule

**Q: What is Symfony's release cycle?**
**A:** Minor releases every **6 months** (May and November). Each minor release has a **4-year** maintenance contract if it's an LTS, or **8 months** for standard releases. Patch releases as needed.
**Code Snippet:** N/A

---

**Q: What is a Long-Term Support (LTS) release in Symfony?**
**A:** Every **2 years** (every 4 minor releases), one version is designated LTS. LTS receives **3 years of bug fixes** and **4 years of security fixes** from release. Non-LTS gets 8 months bug + 14 months security.
**Code Snippet:** N/A

---

**Q: Is Symfony 8.0 an LTS release?**
**A:** No. In the pattern, LTS releases are those ending in `.4` (e.g., 5.4, 6.4, 7.4). 8.0 is a standard release. 8.4 (expected ~2026) would be the next LTS.
**Code Snippet:** N/A

---

**Q: What does Symfony use to manage its own deprecation cycle across majors?**
**A:** A **deprecation gate**: deprecated features emit `E_USER_DEPRECATED` in version X.y. They fire errors in version X+1.0. The bridge (PHPUnit Bridge) helps detect them in tests.
**Code Snippet:** N/A

---

### Framework interoperability and PSRs

**Q: What is PHP-FIG and what relation does Symfony have with it?**
**A:** PHP-FIG (Framework Interop Group) creates PHP Standards Recommendations (PSRs). Symfony implements or supports: PSR-3 (Logger), PSR-4 (Autoloading), PSR-6/PSR-16 (Caching), PSR-7 (HTTP Messages via bridge), PSR-11 (Container), PSR-12 (Coding style).
**Code Snippet:** N/A

---

**Q: What does PSR-4 define and how does Symfony use it?**
**A:** PSR-4 standardises autoloading: namespace prefix maps to a base directory. Composer implements it. Symfony maps `App\` to `src/`.
**Code Snippet:**
```json
{
    "autoload": {
        "psr-4": { "App\\": "src/" }
    }
}
```

---

**Q: What does PSR-12 define and why does it matter for a Symfony project?**
**A:** PSR-12 is the Extended Coding Style Guide. Symfony's own code follows PSR-12. Tools like PHP-CS-Fixer enforce it automatically.
**Code Snippet:**
```bash
php-cs-fixer fix src/ --rules=@Symfony
```

---

**Q: What does PSR-11 define and how does it relate to Symfony's service container?**
**A:** PSR-11 defines `ContainerInterface` with `get($id)` and `has($id)`. Symfony's `Container` implements it, enabling code that depends on `ContainerInterface` to work with any PSR-11-compatible container.
**Code Snippet:**
```php
use Psr\Container\ContainerInterface;
public function __construct(private ContainerInterface $locator) {}
```

---

**Q: What does PSR-3 define and what is its Symfony equivalent?**
**A:** PSR-3 defines `LoggerInterface` with levels: `emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`. Symfony's logger (Monolog) implements PSR-3.
**Code Snippet:**
```php
use Psr\Log\LoggerInterface;
public function __construct(private LoggerInterface $logger) {}
// $this->logger->error('Something failed', ['exception' => $e]);
```

---

### Naming conventions

**Q: What are Symfony's naming conventions for controllers, services, and route names?**
**A:**
- **Controllers**: `PascalCase`, suffix `Controller`, methods end in `Action` (optional)
- **Services**: FQCN as ID by default; short IDs in snake_case for named services
- **Route names**: `snake_case`, typically `resource_action` format (e.g., `product_list`, `user_show`)
- **Templates**: `snake_case` with `/`: `product/show.html.twig`
**Code Snippet:**
```php
#[Route('/products', name: 'product_list')]
class ProductController extends AbstractController {
    public function list(): Response { ... }
}
```

---

**Q: What is the Symfony convention for private vs public service names?**
**A:** All auto-registered services are **private** by default (FQCN as ID). Services explicitly given a short name (e.g., `mailer`) are usually public framework services. Your own services should remain private and be injected, not fetched.
**Code Snippet:** N/A

---

**Q: What is the Symfony naming convention for environment variables?**
**A:** `UPPER_SNAKE_CASE`. By convention, prefix them with the app name for clarity: `APP_SECRET`, `DATABASE_URL`, `MAILER_DSN`. Reference in container with `%env(VAR_NAME)%`.
**Code Snippet:**
```yaml
parameters:
    key: '%env(APP_API_KEY)%'
```

---
