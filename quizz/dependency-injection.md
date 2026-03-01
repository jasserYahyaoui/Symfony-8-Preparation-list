# Quiz : Dependency Injection (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### DI component and container

**Question 1:** The DI container in Symfony is responsible for:
**Type:** Single answer
- [ ] A) Rendering templates
- [ ] B) Creating, configuring, and injecting service instances based on their dependencies
- [ ] C) Routing HTTP requests
- [ ] D) Validating form data

**Correct Answer(s):** B
**Explanation:** The DI container manages service lifecycle: instantiation, configuration, dependency injection.

---

**Question 2:** In production, the Symfony container is:
**Type:** Single answer
- [ ] A) Built on every request
- [ ] B) Compiled into a cached PHP class for maximum performance
- [ ] C) Stored in the database
- [ ] D) Not used

**Correct Answer(s):** B
**Explanation:** Container compilation creates an optimized PHP file in `var/cache/` — services are resolved at compile time.

---

### Services and parameters

**Question 3:** In Symfony, by default, services are:
**Type:** Single answer
- [ ] A) All public
- [ ] B) Private (only accessible via injection, not `$container->get()`)
- [ ] C) Optional
- [ ] D) Lazy-loaded

**Correct Answer(s):** B
**Explanation:** With `autoconfigure: true` and `autowire: true`, services are private by default.

---

**Question 4:** Parameters in the container are accessed with which syntax in YAML?
**Type:** Single answer
- [ ] A) `$parameter_name`
- [ ] B) `%parameter_name%`
- [ ] C) `@parameter_name`
- [ ] D) `{parameter_name}`

**Correct Answer(s):** B
**Explanation:** Parameters use `%name%` syntax. Services use `@service_id`.

---

**Question 5:** `#[Autowire('%kernel.project_dir%')]` on a constructor parameter:
**Type:** Single answer
- [ ] A) Injects a service
- [ ] B) Injects a container parameter value
- [ ] C) Injects an environment variable
- [ ] D) Injects the Kernel object

**Correct Answer(s):** B
**Explanation:** `%param%` syntax injects the resolved container parameter value.

---

### Autowiring

**Question 6:** Autowiring automatically:
**Type:** Single answer
- [ ] A) Creates database tables
- [ ] B) Resolves constructor dependencies by their type-hint, injecting matching services
- [ ] C) Generates routes
- [ ] D) Compiles Twig templates

**Correct Answer(s):** B
**Explanation:** Autowiring uses type-hints to resolve and inject the correct service automatically.

---

**Question 7:** When two services implement the same interface, autowiring fails unless:
**Type:** Single answer
- [ ] A) You delete one service
- [ ] B) You use `#[Autowire]` attribute, interface aliases, or `bind:` to specify which one
- [ ] C) You make both public
- [ ] D) You restart the server

**Correct Answer(s):** B
**Explanation:** Ambiguity requires explicit resolution via attributes, aliases, or configuration.

---

**Question 8:** `#[AutowireInline]` does what?
**Type:** Single answer
- [ ] A) Inlines the service definition at the injection point (creates a private instance specific to this consumer)
- [ ] B) Autowires from the environment
- [ ] C) Creates a lazy proxy
- [ ] D) Injects a tagged service

**Correct Answer(s):** A
**Explanation:** `#[AutowireInline]` creates an inline, non-shared service definition specific to that injection point.

---

### Service decoration

**Question 9:** Service decoration means:
**Type:** Single answer
- [ ] A) Adding CSS styles to a service
- [ ] B) Replacing a service with a new one that wraps the original (decorator pattern)
- [ ] C) Deleting a service
- [ ] D) Moving a service to a different namespace

**Correct Answer(s):** B
**Explanation:** Decoration wraps the original service. The decorator receives the original as a dependency.

---

**Question 10:** The `#[AsDecorator('decorated.service')]` attribute:
**Type:** Single answer
- [ ] A) Deletes the original service
- [ ] B) Replaces the original service with the decorated one; the original is injected as `inner`
- [ ] C) Duplicates the service
- [ ] D) Makes the service public

**Correct Answer(s):** B
**Explanation:** The decorator replaces the service ID. The original is available via `.inner` or `#[Autowire(service: '.inner')]`.

---

### Tags

**Question 11:** Service tags are used to:
**Type:** Single answer
- [ ] A) Label services for collection by compiler passes (e.g., `twig.extension`, `kernel.event_listener`)
- [ ] B) Create HTML tags
- [ ] C) Version services
- [ ] D) Log service calls

**Correct Answer(s):** A
**Explanation:** Tags allow compiler passes to find and process groups of services (e.g., all Twig extensions).

---

**Question 12:** `#[AutoconfigureTag('app.handler')]` on a class:
**Type:** Single answer
- [ ] A) Tags the service manually
- [ ] B) Automatically tags the service with `app.handler` when `autoconfigure: true`
- [ ] C) Removes the tag
- [ ] D) Creates a new service

**Correct Answer(s):** B
**Explanation:** `AutoconfigureTag` auto-tags services extending/implementing the tagged class/interface.

---

**Question 13:** `#[TaggedIterator('app.handler')]` on a constructor parameter:
**Type:** Single answer
- [ ] A) Injects a single service with that tag
- [ ] B) Injects an iterable of ALL services tagged with `app.handler`
- [ ] C) Injects the tag name
- [ ] D) Injects a lazy proxy

**Correct Answer(s):** B
**Explanation:** `#[TaggedIterator]` injects an iterable of all matching tagged services.

---

### Factories

**Question 14:** A factory is used to create a service when:
**Type:** Single answer
- [ ] A) Construction requires complex logic or a static method call
- [ ] B) The service is always public
- [ ] C) The service has no dependencies
- [ ] D) The service is deprecated

**Correct Answer(s):** A
**Explanation:** Factories handle cases where `new ClassName()` isn't sufficient (static factory methods, complex initialization).

---

**Question 15:** In YAML, a factory is configured with:
**Type:** Single answer
- [ ] A) `factory: ['@App\Factory\FooFactory', 'create']`
- [ ] B) `builder: App\Factory\FooFactory::create`
- [ ] C) `constructor: factory`
- [ ] D) `init: App\Factory\FooFactory`

**Correct Answer(s):** A
**Explanation:** `factory:` takes an array `[service or class, method]` or `[class, staticMethod]`.

---

### Compiler passes

**Question 16:** A compiler pass runs:
**Type:** Single answer
- [ ] A) On every HTTP request
- [ ] B) At container compilation time — allows programmatic modification of the container
- [ ] C) At runtime
- [ ] D) During template rendering

**Correct Answer(s):** B
**Explanation:** Compiler passes modify the container definition before it's compiled to PHP cache. They run once during cache warmup.

---

**Question 17:** A compiler pass must implement:
**Type:** Single answer
- [ ] A) `CompilerPassInterface` with a `process(ContainerBuilder $container)` method
- [ ] B) `EventSubscriberInterface`
- [ ] C) `KernelInterface`
- [ ] D) `FormTypeInterface`

**Correct Answer(s):** A
**Explanation:** `CompilerPassInterface::process(ContainerBuilder $container)` — gives full access to modify definitions.

---

### Expressions in configuration

**Question 18:** The `@=` prefix in service arguments allows:
**Type:** Single answer
- [ ] A) Regular expressions
- [ ] B) ExpressionLanguage expressions evaluated at compile time
- [ ] C) SQL queries
- [ ] D) Twig expressions

**Correct Answer(s):** B
**Explanation:** `@=service('router').getContext()` — uses ExpressionLanguage to derive dynamic values.

---

### Synthetic services

**Question 19:** A synthetic service is:
**Type:** Single answer
- [ ] A) A service created at runtime and injected manually into the container (not defined via config)
- [ ] B) A fake/mock service for testing
- [ ] C) A deprecated service
- [ ] D) A service generated by AI

**Correct Answer(s):** A
**Explanation:** Synthetic services are set at runtime via `$container->set('id', $instance)`. The container cannot create them itself.

---

### Service locators

**Question 20:** A service locator is:
**Type:** Single answer
- [ ] A) A mini-container that lazily provides only a subset of services
- [ ] B) A GPS service
- [ ] C) A full container
- [ ] D) A routing service

**Correct Answer(s):** A
**Explanation:** Service locators implement PSR-11 `ContainerInterface` with `get()` and `has()`, but only expose specific services.

---

**Question 21:** `#[AutowireLocator(['handler1' => HandlerA::class, 'handler2' => HandlerB::class])]` creates:
**Type:** Single answer
- [ ] A) An array of services
- [ ] B) A `ContainerInterface` locator that lazily provides `handler1` and `handler2` on demand
- [ ] C) A tagged iterator
- [ ] D) A compiler pass

**Correct Answer(s):** B
**Explanation:** `AutowireLocator` creates a service locator with named entries, lazily instantiated.

---

**Question 22:** `ServiceSubscriberInterface` is used by:
**Type:** Single answer
- [ ] A) `AbstractController` to declare which services it needs from the locator
- [ ] B) Event subscribers
- [ ] C) Template engines
- [ ] D) Database connections

**Correct Answer(s):** A
**Explanation:** `AbstractController` implements `ServiceSubscriberInterface`, declaring its service dependencies for the locator.

---

### Semantic configuration (bundles)

**Question 23:** Semantic configuration allows bundles to:
**Type:** Single answer
- [ ] A) Use environment variables
- [ ] B) Define structured configuration trees (validated at compile time) that configure their services
- [ ] C) Access the database
- [ ] D) Render templates

**Correct Answer(s):** B
**Explanation:** Bundles define `Configuration` classes using `TreeBuilder` to validate config under their namespace (e.g., `framework:`, `twig:`).

---

**Question 24:** `TreeBuilder` is used in:
**Type:** Single answer
- [ ] A) The `Configuration` class of a bundle to define the config structure
- [ ] B) The controller to build response trees
- [ ] C) Twig to build template trees
- [ ] D) The router to build route trees

**Correct Answer(s):** A
**Explanation:** `TreeBuilder` defines the config tree: nodes, types, defaults, validation rules.

---

### Environment variable integration

**Question 25:** `#[Autowire(env: 'DATABASE_URL')]` injects:
**Type:** Single answer
- [ ] A) The literal string `DATABASE_URL`
- [ ] B) The value of the `DATABASE_URL` environment variable
- [ ] C) A database connection
- [ ] D) A parameter named `DATABASE_URL`

**Correct Answer(s):** B
**Explanation:** `env:` resolves environment variables at runtime.

---

**Question 26:** Environment variable processors like `%env(int:PORT)%` do what?
**Type:** Single answer
- [ ] A) Validate the env var
- [ ] B) Process/transform the env var value (cast to int in this case)
- [ ] C) Delete the env var
- [ ] D) Log the env var

**Correct Answer(s):** B
**Explanation:** Processors transform: `int:`, `bool:`, `json:`, `resolve:`, `file:`, `csv:`, `url:`, etc.

---

### Lazy services

**Question 27:** A lazy service is:
**Type:** Single answer
- [ ] A) A service that loads slowly
- [ ] B) A proxy object that delays instantiation until a method is actually called
- [ ] C) A deprecated service
- [ ] D) A service that runs in background

**Correct Answer(s):** B
**Explanation:** Lazy services use a ghost proxy — the real object isn't created until first use (saves resources for heavy services).

---

**Question 28:** To make a service lazy in YAML:
**Type:** Single answer
- [ ] A) `lazy: true`
- [ ] B) `shared: false`
- [ ] C) `public: false`
- [ ] D) `synthetic: true`

**Correct Answer(s):** A
**Explanation:** `lazy: true` tells Symfony to generate a proxy class.

---

**Question 29:** `#[Autowire(lazy: true)]` on a constructor parameter:
**Type:** Single answer
- [ ] A) Makes the entire service lazy
- [ ] B) Injects a lazy proxy for that specific dependency
- [ ] C) Disables autowiring
- [ ] D) Makes the parameter optional

**Correct Answer(s):** B
**Explanation:** Injects a lazy proxy for just that one dependency.

---

**Question 30:** `$container->get('service')` on a private service in production throws:
**Type:** Single answer
- [ ] A) Nothing — it works fine
- [ ] B) `ServiceNotFoundException` — private services cannot be fetched from the container directly
- [ ] C) Returns `null`
- [ ] D) A deprecation notice

**Correct Answer(s):** B
**Explanation:** Private services are removed from the compiled container's public API. Use injection instead.

---

---
