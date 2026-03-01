# Quiz : Symfony Architecture (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### HttpFoundation component

**Question 1:** The HttpFoundation component replaces PHP superglobals (`$_GET`, `$_POST`, etc.) with an object-oriented API.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** HttpFoundation wraps `$_GET`, `$_POST`, `$_SERVER`, `$_FILES`, `$_COOKIE` into `Request` and `Response` objects.

---

**Question 2:** Which class in HttpFoundation represents the incoming HTTP request?
**Type:** Single answer
- [ ] A) `Symfony\Component\HttpFoundation\Response`
- [ ] B) `Symfony\Component\HttpFoundation\Request`
- [ ] C) `Symfony\Component\HttpKernel\HttpKernel`
- [ ] D) `Symfony\Component\HttpFoundation\ServerBag`

**Correct Answer(s):** B
**Explanation:** `Request` encapsulates all HTTP request data.

---

**Question 3:** Which of the following are bags in the `Request` object? (Select all)
**Type:** Multiple choice
- [ ] A) `query` (GET parameters)
- [ ] B) `request` (POST parameters)
- [ ] C) `attributes` (route parameters)
- [ ] D) `cookies`
- [ ] E) `files`
- [ ] F) `headers`

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** All six are bags (or HeaderBag/FileBag subclasses) on the Request object.

---

**Question 4:** `Request::createFromGlobals()` creates a Request from:
**Type:** Single answer
- [ ] A) A YAML configuration file
- [ ] B) The PHP superglobals (`$_GET`, `$_POST`, `$_SERVER`, `$_COOKIE`, `$_FILES`)
- [ ] C) The Symfony container
- [ ] D) A database query

**Correct Answer(s):** B
**Explanation:** `createFromGlobals()` populates the Request using PHP's superglobals.

---

**Question 5:** The `ParameterBag::get()` method returns `null` by default when the key is not found.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `get('key', $default)` returns `$default` (which defaults to `null`) if the key doesn't exist.

---

**Question 6:** Which ParameterBag method casts the value to an integer?
**Type:** Single answer
- [ ] A) `get()`
- [ ] B) `getInt()`
- [ ] C) `toInt()`
- [ ] D) `integer()`

**Correct Answer(s):** B
**Explanation:** `$request->query->getInt('page', 1)` returns an integer.

---

**Question 7:** The `InputBag` (used for `query` and `request` in Symfony 8) throws a `BadRequestException` if the value is not a string.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `InputBag::get()` in Symfony 6+ returns `string|null` and throws `BadRequestException` for non-string values. Use specific type methods (`getInt`, `getBoolean`, `getString`) for type safety.

---

**Question 8:** `Response::send()` performs which actions? (Select all)
**Type:** Multiple choice
- [ ] A) Sends HTTP headers
- [ ] B) Echoes the response body/content
- [ ] C) Terminates the PHP process
- [ ] D) Sends headers then content

**Correct Answer(s):** A, B, D
**Explanation:** `send()` calls `sendHeaders()` then `sendContent()`. It does NOT terminate the process — the Kernel does that.

---

### Symfony Flex

**Question 9:** Symfony Flex is:
**Type:** Single answer
- [ ] A) A Symfony component for CSS flexbox
- [ ] B) A Composer plugin that automates bundle and package configuration via recipes
- [ ] C) A JavaScript framework
- [ ] D) A form rendering engine

**Correct Answer(s):** B
**Explanation:** Flex is a Composer plugin that applies "recipes" to configure packages automatically (creating config files, routes, etc.).

---

**Question 10:** Flex recipes are stored in:
**Type:** Single answer
- [ ] A) The Symfony GitHub repository
- [ ] B) Two official repositories: `symfony/recipes` and `symfony/recipes-contrib`
- [ ] C) npm registry
- [ ] D) The project's `composer.json`

**Correct Answer(s):** B
**Explanation:** Official recipes in `symfony/recipes`, community recipes in `symfony/recipes-contrib`.

---

**Question 11:** When you run `composer require orm`, Flex resolves `orm` to:
**Type:** Single answer
- [ ] A) `symfony/orm-bundle` 
- [ ] B) `symfony/orm-pack` (an alias defined in Flex recipes)
- [ ] C) `doctrine/orm`
- [ ] D) Nothing — it fails

**Correct Answer(s):** B
**Explanation:** Flex supports aliases — short package names that resolve to full package names. `orm` → `symfony/orm-pack`.

---

**Question 12:** When you run `composer remove some-bundle` with Flex, Flex automatically:
**Type:** Single answer
- [ ] A) Leaves all config files untouched
- [ ] B) Executes the "uninstall" recipe, removing generated config files and routes
- [ ] C) Deletes the `vendor/` directory
- [ ] D) Clears the database

**Correct Answer(s):** B
**Explanation:** Flex recipes are bi-directional — they apply on install and "un-apply" on remove.

---

### License

**Question 13:** Symfony is released under which license?
**Type:** Single answer
- [ ] A) GPL v3
- [ ] B) MIT License
- [ ] C) Apache License 2.0
- [ ] D) BSD 3-Clause

**Correct Answer(s):** B
**Explanation:** Symfony uses the MIT License, which is very permissive (commercial use, modification, distribution, private use).

---

### Components and Bridges

**Question 14:** What is the difference between a Symfony Component and a Bridge?
**Type:** Single answer
- [ ] A) Components are standalone; Bridges integrate third-party libraries into Symfony
- [ ] B) Components require Symfony; Bridges are standalone
- [ ] C) They are the same thing
- [ ] D) Bridges are deprecated in Symfony 8

**Correct Answer(s):** A
**Explanation:** Components are self-contained libraries (HttpFoundation, Console). Bridges connect third-party libraries to Symfony (e.g., Twig Bridge, Doctrine Bridge).

---

**Question 15:** What is a Symfony Bundle?
**Type:** Single answer
- [ ] A) A standalone PHP library
- [ ] B) A structured plugin that integrates features into the Symfony framework
- [ ] C) A CSS framework
- [ ] D) A routing file

**Correct Answer(s):** B
**Explanation:** Bundles register services, routes, templates, etc., into the Symfony framework. Since Symfony 4+, most projects only use third-party bundles.

---

**Question 16:** The PSR-7 Bridge allows Symfony to:
**Type:** Single answer
- [ ] A) Use Doctrine ORM
- [ ] B) Convert between Symfony's `Request`/`Response` and PSR-7 `ServerRequestInterface`/`ResponseInterface`
- [ ] C) Parse YAML files
- [ ] D) Send emails

**Correct Answer(s):** B
**Explanation:** The PSR-7 Bridge enables interoperability between Symfony's HttpFoundation and PSR-7 compliant libraries.

---

### Code organization

**Question 17:** According to Symfony best practices, where should business logic live?
**Type:** Single answer
- [ ] A) In controllers
- [ ] B) In templates
- [ ] C) In services under `src/`
- [ ] D) In the `config/` directory

**Correct Answer(s):** C
**Explanation:** Controllers should be thin. Business logic belongs in service classes, typically in `src/Service/` or domain-oriented directories.

---

**Question 18:** The standard Symfony project structure includes which directories? (Select all)
**Type:** Multiple choice
- [ ] A) `src/` — PHP source code
- [ ] B) `config/` — configuration files
- [ ] C) `templates/` — Twig templates
- [ ] D) `public/` — web-accessible files (entry point)
- [ ] E) `var/` — cache and logs
- [ ] F) `vendor/` — Composer dependencies

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** All six are standard directories in a Symfony project.

---

### Request handling

**Question 19:** In Symfony, the request lifecycle starts with:
**Type:** Single answer
- [ ] A) The controller
- [ ] B) `public/index.php` creating a `Kernel` and calling `$kernel->handle($request)`
- [ ] C) Twig rendering
- [ ] D) The database connection

**Correct Answer(s):** B
**Explanation:** `index.php` creates the Request, passes it to the Kernel's `handle()` method, which dispatches events and resolves the controller.

---

**Question 20:** The `HttpKernel::handle()` method dispatches events in what order?
**Type:** Single answer
- [ ] A) `kernel.request` → `kernel.controller` → `kernel.controller_arguments` → `kernel.view` (if needed) → `kernel.response`
- [ ] B) `kernel.response` → `kernel.request` → `kernel.controller`
- [ ] C) `kernel.controller` → `kernel.request` → `kernel.response`
- [ ] D) `kernel.view` → `kernel.controller` → `kernel.request`

**Correct Answer(s):** A
**Explanation:** The correct order: request → controller → controller_arguments → view (if controller doesn't return Response) → response.

---

**Question 21:** If a listener on `kernel.request` sets a Response, what happens?
**Type:** Single answer
- [ ] A) The controller still runs
- [ ] B) The request lifecycle short-circuits — the controller is NOT called
- [ ] C) An error is thrown
- [ ] D) The response is ignored

**Correct Answer(s):** B
**Explanation:** Setting a Response on the `RequestEvent` short-circuits the lifecycle — skips controller resolution and execution.

---

### Exception handling

**Question 22:** Symfony converts uncaught exceptions into error pages via which kernel event?
**Type:** Single answer
- [ ] A) `kernel.request`
- [ ] B) `kernel.exception`
- [ ] C) `kernel.response`
- [ ] D) `kernel.terminate`

**Correct Answer(s):** B
**Explanation:** `kernel.exception` is dispatched when an exception is thrown. The `ErrorListener` renders the error page.

---

**Question 23:** How do you preview error pages in Symfony development mode?
**Type:** Single answer
- [ ] A) Throw an exception
- [ ] B) Visit `/_error/{statusCode}` (e.g., `/_error/404`)
- [ ] C) Edit `error.html.twig`
- [ ] D) Set `APP_ENV=prod`

**Correct Answer(s):** B
**Explanation:** The `/_error/{statusCode}` route (dev only) previews custom error pages without actually triggering an error.

---

### Event dispatcher and kernel events

**Question 24:** Which of the following are valid Symfony kernel events? (Select all)
**Type:** Multiple choice
- [ ] A) `kernel.request`
- [ ] B) `kernel.controller`
- [ ] C) `kernel.view`
- [ ] D) `kernel.response`
- [ ] E) `kernel.terminate`
- [ ] F) `kernel.exception`
- [ ] G) `kernel.controller_arguments`

**Correct Answer(s):** A, B, C, D, E, F, G
**Explanation:** All seven are valid kernel events dispatched during the request lifecycle.

---

**Question 25:** `kernel.terminate` fires:
**Type:** Single answer
- [ ] A) Before the controller runs
- [ ] B) After the response is sent to the client
- [ ] C) When an exception occurs
- [ ] D) Before the kernel boots

**Correct Answer(s):** B
**Explanation:** `kernel.terminate` fires after `$response->send()`, allowing expensive tasks (logging, email sending) to run without affecting response time.

---

**Question 26:** What does `kernel.view` do?
**Type:** Single answer
- [ ] A) Renders a Twig template
- [ ] B) Fires when the controller returns something that is NOT a `Response` object — a listener must convert it to a Response
- [ ] C) Validates the request
- [ ] D) Dispatches sub-requests

**Correct Answer(s):** B
**Explanation:** If the controller returns, say, an array, `kernel.view` allows a listener to convert it to a `Response` (e.g., `#[Template]` or API Platform).

---

**Question 27:** An event listener is registered with:
**Type:** Single answer
- [ ] A) `#[AsEventListener]`
- [ ] B) `#[AsController]`
- [ ] C) `#[AsCommand]`
- [ ] D) `#[Route]`

**Correct Answer(s):** A
**Explanation:** `#[AsEventListener(event: 'event_name', priority: N)]` registers a listener.

---

**Question 28:** What is the difference between an Event Listener and an Event Subscriber?
**Type:** Single answer
- [ ] A) Subscribers define which events they listen to internally (`getSubscribedEvents()`); listeners are configured externally (tag/attribute)
- [ ] B) They are identical
- [ ] C) Listeners can listen to multiple events; subscribers cannot
- [ ] D) Subscribers are deprecated

**Correct Answer(s):** A
**Explanation:** Subscribers implement `EventSubscriberInterface::getSubscribedEvents()`. Listeners rely on external config or `#[AsEventListener]`.

---

**Question 29:** Event listener priority: higher number means:
**Type:** Single answer
- [ ] A) Runs later
- [ ] B) Runs earlier
- [ ] C) Priority has no effect
- [ ] D) Lower importance

**Correct Answer(s):** B
**Explanation:** Higher priority = runs first. Default is 0.

---

**Question 30:** `$event->stopPropagation()` prevents:
**Type:** Single answer
- [ ] A) The request from being processed
- [ ] B) Other listeners for the same event from being called
- [ ] C) The response from being sent
- [ ] D) The kernel from terminating

**Correct Answer(s):** B
**Explanation:** After `stopPropagation()`, remaining listeners for that event are skipped.

---

### Official best practices

**Question 31:** According to Symfony best practices, controllers should:
**Type:** Single answer
- [ ] A) Contain all business logic
- [ ] B) Be thin — delegate to services and return a Response
- [ ] C) Directly access the database
- [ ] D) Define routes in YAML only

**Correct Answer(s):** B
**Explanation:** Controllers should be thin "glue" code. Business logic belongs in services.

---

**Question 32:** Symfony recommends using PHP attributes for routing over YAML configuration.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Best practices recommend `#[Route]` attributes for collocating routes with controller code.

---

### Backward compatibility promise

**Question 33:** Symfony's backward compatibility (BC) promise ensures that:
**Type:** Single answer
- [ ] A) Code working in Symfony 8.0 will work in Symfony 9.0 without changes
- [ ] B) Code working in Symfony 8.0 will work in 8.x without breaking changes (unless using deprecated features)
- [ ] C) All PHP versions are supported forever
- [ ] D) Third-party bundles never break

**Correct Answer(s):** B
**Explanation:** Within a major version (8.x), Symfony guarantees no BC breaks for non-deprecated features. Deprecations are removed in the next major.

---

**Question 34:** Deprecations in Symfony 8.x will be removed in:
**Type:** Single answer
- [ ] A) The next minor (8.1)
- [ ] B) The next major (9.0)
- [ ] C) The next patch (8.0.1)
- [ ] D) They are never removed

**Correct Answer(s):** B
**Explanation:** Deprecated features are kept through all 8.x releases and removed in 9.0.

---

### Release management and roadmap schedule

**Question 35:** How often does Symfony release a new minor version (e.g., 8.1, 8.2)?
**Type:** Single answer
- [ ] A) Every 2 months
- [ ] B) Every 6 months (May and November)
- [ ] C) Every year
- [ ] D) Every 3 years

**Correct Answer(s):** B
**Explanation:** Symfony releases a new minor version every 6 months, typically in May and November.

---

**Question 36:** Symfony Long-Term Support (LTS) versions are maintained for how long?
**Type:** Single answer
- [ ] A) 1 year
- [ ] B) 3 years (bug fixes) + 1 year (security fixes) = ~4 years total
- [ ] C) 6 months
- [ ] D) Indefinitely

**Correct Answer(s):** B
**Explanation:** LTS versions receive bug fixes for 3 years and security fixes for an additional year.

---

**Question 37:** New major versions (e.g., 8.0) remove which type of code?
**Type:** Single answer
- [ ] A) All code
- [ ] B) Only deprecated code from the previous major version's series
- [ ] C) Only security-related code
- [ ] D) No code is removed

**Correct Answer(s):** B
**Explanation:** Major versions (8.0) remove deprecations from 7.x. This is why fixing deprecation warnings before upgrading is critical.

---

### Framework interoperability and PSRs

**Question 38:** What does PSR-4 define?
**Type:** Single answer
- [ ] A) HTTP message interfaces
- [ ] B) Autoloading standard mapping namespaces to file paths
- [ ] C) Coding style (indentation, braces)
- [ ] D) Logging interface

**Correct Answer(s):** B
**Explanation:** PSR-4 defines autoloading: `App\Service\Mailer` maps to `src/Service/Mailer.php`.

---

**Question 39:** PSR-1 and PSR-12 define:
**Type:** Single answer
- [ ] A) HTTP caching strategy
- [ ] B) PHP coding style standards (naming, indentation, brackets)
- [ ] C) Database migration format
- [ ] D) Container interface

**Correct Answer(s):** B
**Explanation:** PSR-1 = Basic Coding Standard. PSR-12 = Extended Coding Style Guide.

---

**Question 40:** Which PSR defines the Logger Interface used by `Psr\Log\LoggerInterface`?
**Type:** Single answer
- [ ] A) PSR-3
- [ ] B) PSR-7
- [ ] C) PSR-11
- [ ] D) PSR-15

**Correct Answer(s):** A
**Explanation:** PSR-3 defines `LoggerInterface` with methods like `info()`, `error()`, `debug()`.

---

**Question 41:** PSR-11 defines:
**Type:** Single answer
- [ ] A) The Logger interface
- [ ] B) The Container interface (`ContainerInterface` with `get()` and `has()`)
- [ ] C) The HTTP message interface
- [ ] D) The Event Dispatcher interface

**Correct Answer(s):** B
**Explanation:** PSR-11 = `Psr\Container\ContainerInterface` — `get($id)` and `has($id)`.

---

**Question 42:** PSR-7 defines:
**Type:** Single answer
- [ ] A) Autoloading
- [ ] B) HTTP message interfaces (`RequestInterface`, `ResponseInterface`, `StreamInterface`)
- [ ] C) Event dispatching
- [ ] D) Caching interface

**Correct Answer(s):** B
**Explanation:** PSR-7 defines immutable HTTP message interfaces. Symfony uses its own mutable HttpFoundation but provides a PSR-7 Bridge.

---

### Naming conventions

**Question 43:** Symfony naming convention for services: which pattern is standard?
**Type:** Single answer
- [ ] A) `my_bundle.my_service` (snake_case dot-separated)
- [ ] B) FQCN (Fully Qualified Class Name, e.g., `App\Service\Mailer`)
- [ ] C) camelCase identifiers
- [ ] D) UUID-based IDs

**Correct Answer(s):** B
**Explanation:** Since Symfony 4+, services are identified by their FQCN. Old snake_case IDs are legacy.

---

**Question 44:** According to Symfony conventions, controller method names should be:
**Type:** Single answer
- [ ] A) Prefixed with `action` (e.g., `actionShow`)
- [ ] B) Named descriptively without suffix (e.g., `show`, `list`, `create`)
- [ ] C) Always named `__invoke`
- [ ] D) Named with `Handler` suffix

**Correct Answer(s):** B
**Explanation:** Convention: descriptive names like `show()`, `edit()`, `delete()`. Invokable controllers use `__invoke()` for single-action controllers.

---

**Question 45:** Symfony uses `camelCase` for:
**Type:** Multiple choice
- [ ] A) Method names
- [ ] B) Variable names
- [ ] C) Class names
- [ ] D) Configuration keys

**Correct Answer(s):** A, B
**Explanation:** Methods and variables use camelCase. Classes use PascalCase. Configuration keys use snake_case.

---
