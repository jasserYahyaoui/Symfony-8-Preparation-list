# Flashcards : Dependency Injection (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every configuration option, attribute, and edge case covered.

---

### The DI component

**Q: What problem does the Dependency Injection (DI) pattern solve?**
**A:** Eliminates hidden dependencies and tight coupling. Instead of a class creating its dependencies (`new Service()`), they are injected from outside, making the class testable and replaceable.
**Code Snippet:**
```php
// Bad (tight coupling):
class OrderService { private $mailer; public function __construct() { $this->mailer = new Mailer(); } }
// Good (DI):
class OrderService { public function __construct(private MailerInterface $mailer) {} }
```

---

**Q: What are the three types of Dependency Injection?**
**A:** (1) **Constructor injection** (preferred — dependencies are mandatory), (2) **Setter injection** (optional dependencies via `set*()` methods), (3) **Property injection** (via attributes like `#[Autowire]`).
**Code Snippet:**
```php
// Constructor (preferred):
public function __construct(private LoggerInterface $logger) {}
// Setter:
#[Required]
public function setLogger(LoggerInterface $logger): void { $this->logger = $logger; }
// Property (attribute):
#[Autowire(service: 'logger')]
private LoggerInterface $logger;
```

---

**Q: What is the Symfony DI Container and what is its primary role?**
**A:** A registry of service definitions. At compile time, it builds a graph of all services with their dependencies. At runtime, it instantiates and injects them lazily or eagerly.
**Code Snippet:**
```php
$container->get(OrderService::class); // resolved from the compiled container
```

---

**Q: What is the difference between a compiled and a non-compiled container?**
**A:** Non-compiled: services are built on every request (slow, used in tests). Compiled (`var/cache/prod/App_KernelProdContainer.php`): generates optimized PHP classes, instantiated per request in production.
**Code Snippet:**
```bash
php bin/console cache:warmup --env=prod
```

---

### Container

**Q: Why should you NOT call `$container->get()` from within a service?**
**A:** It creates a **Service Locator anti-pattern** — hides dependencies, making code untestable. Use constructor injection instead. The exception is `ServiceLocatorInterface` for explicitly lazy optional services.
**Code Snippet:** N/A

---

**Q: What is the difference between a public and a private service in Symfony?**
**A:** Private services (default) cannot be accessed via `$container->get()` at runtime — only injected at compile time. Public services are accessible from the container at runtime. In tests, the test container exposes private services.
**Code Snippet:**
```yaml
services:
    App\Service\MyService:
        public: true   # override — needed only for specific reasons
```

---

**Q: What is an "alias" in the DI container and why is it useful?**
**A:** An alias is a service ID that points to another service. Used to bind interface IDs to concrete implementations so type-hinting the interface triggers autowiring to the right class.
**Code Snippet:**
```yaml
services:
    App\Contract\PaymentGatewayInterface: '@App\Service\StripeGateway'
```
```php
// Now this autowires to StripeGateway:
public function __construct(private PaymentGatewayInterface $gateway) {}
```

---

### Built-in services

**Q: How do you see all available services in the container from the CLI?**
**A:** `php bin/console debug:container` — lists all public services. `php bin/console debug:container --show-hidden` shows private ones. `php bin/console debug:autowiring` shows all autowirable types.
**Code Snippet:**
```bash
php bin/console debug:container LoggerInterface
php bin/console debug:autowiring LoggerInterface
php bin/console debug:container --parameters
```

---

**Q: What does `php bin/console debug:autowiring` show?**
**A:** All interfaces and class type-hints that can be autowired, along with the service they resolve to. Invaluable for finding the correct type to inject.
**Code Snippet:**
```bash
php bin/console debug:autowiring Cache
# Shows: Symfony\Contracts\Cache\CacheInterface → cache.app (alias)
```

---

**Q: How do you inject a specific logger channel (e.g., `monolog.logger.payment`) instead of the default?**
**A:** Use the `#[Autowire(service: 'monolog.logger.payment')]` attribute or `$arguments` in services.yaml.
**Code Snippet:**
```php
use Symfony\Component\DependencyInjection\Attribute\Autowire;

public function __construct(
    #[Autowire(service: 'monolog.logger.payment')]
    private LoggerInterface $logger
) {}
```

---

### Parameters

**Q: How do you define a container parameter?**
**A:** In `services.yaml` (or any config file) under the `parameters:` key.
**Code Snippet:**
```yaml
parameters:
    app.api_key: '%env(API_KEY)%'
    app.max_results: 50
    app.supported_locales: ['en', 'fr', 'de']
```

---

**Q: How do you inject a container parameter into a service?**
**A:** Via `#[Autowire(param: 'param.name')]`, or the `$parameters` key in `services.yaml`, or `%param.name%` in config.
**Code Snippet:**
```php
use Symfony\Component\DependencyInjection\Attribute\Autowire;

public function __construct(
    #[Autowire(param: 'app.max_results')] private int $maxResults,
    #[Autowire(param: 'kernel.project_dir')] private string $projectDir,
) {}
```

---

**Q: What are the 5 most useful built-in container parameters?**
**A:**
- `kernel.project_dir` — absolute path to the project root
- `kernel.environment` — `dev`, `prod`, `test`
- `kernel.debug` — `true` or `false`
- `kernel.bundles` — registered bundle class names
- `kernel.secret` — `APP_SECRET` value
**Code Snippet:**
```php
#[Autowire(param: 'kernel.environment')] private string $env,
#[Autowire(param: 'kernel.project_dir')] private string $projectDir,
```

---

**Q: How do you reference one parameter inside another?**
**A:** Use `%param_name%` inside a string parameter value.
**Code Snippet:**
```yaml
parameters:
    app.upload_dir: '%kernel.project_dir%/public/uploads'
    app.cache_dir:  '%kernel.cache_dir%/my-app'
```

---

**Q: What does `%env(resolve:DATABASE_URL)%` do that `%env(DATABASE_URL)%` does not?**
**A:** `resolve:` processor expands `%parameter%` placeholders within the env var value at runtime. Without it, the raw string (including `%` chars) is returned as-is.
**Code Snippet:**
```yaml
parameters:
    db_name: my_database
    full_dsn: '%env(resolve:DATABASE_URL)%'
    # DATABASE_URL=postgresql://user:pwd@host/%db_name% → resolved to include %db_name%
```

---

### Services registering

**Q: What does the default `services.yaml` auto-registration block do?**
**A:** Automatically registers all classes in `src/` as private services using FQCN as the service ID. `autowire: true` enables type-hint injection. `autoconfigure: true` auto-applies tags (e.g., `EventSubscriberInterface` → `kernel.event_subscriber`).
**Code Snippet:**
```yaml
services:
    _defaults:
        autowire: true
        autoconfigure: true
    App\:
        resource: '../src/'
        exclude:
            - '../src/DependencyInjection/'
            - '../src/Entity/'
            - '../src/Kernel.php'
```

---

**Q: How do you exclude a directory or class from auto-registration?**
**A:** Use the `exclude:` key under the resource block.
**Code Snippet:**
```yaml
App\:
    resource: '../src/'
    exclude:
        - '../src/Entity/'
        - '../src/ValueObject/'
        - '../src/Migrations/'
```

---

**Q: How do you register a service with a manual argument override?**
**A:** Under the service's FQCN key, add `arguments:` with positional (`$0`) or named (`$argName`) entries.
**Code Snippet:**
```yaml
services:
    App\Service\PaymentService:
        arguments:
            $gateway: '@App\Service\StripeGateway'
            $apiKey: '%env(STRIPE_KEY)%'
```

---

**Q: What is the difference between `arguments` and `calls` in a service definition?**
**A:** `arguments` = constructor injection. `calls` = setter injection (calls a method after construction).
**Code Snippet:**
```yaml
App\Service\Notifier:
    calls:
        - [setLogger, ['@logger']]
        - [setMailer, ['@mailer']]
```

---

### Services autowiring

**Q: What does `autowire: true` do?**
**A:** Symfony automatically resolves constructor arguments by matching their type-hint to a registered service. No explicit arguments needed for services.
**Code Snippet:**
```php
// With autowire: true — Symfony injects all typed constructor args automatically:
class OrderService {
    public function __construct(
        private MailerInterface $mailer,
        private LoggerInterface $logger,
    ) {}
}
```

---

**Q: What happens when there are multiple services implementing the same interface and autowire is enabled?**
**A:** Symfony throws an `AutowireException` (ambiguous type). You must either: (a) bind explicitly in `_defaults.bind`, (b) use `#[Autowire(service: 'specific.service')]`, or (c) alias the interface to a concrete service.
**Code Snippet:**
```yaml
# Option 1: bind (applies globally):
services:
    _defaults:
        bind:
            PaymentGatewayInterface: '@App\Service\StripeGateway'
# Option 2: alias:
App\Contract\PaymentGatewayInterface: '@App\Service\StripeGateway'
```

---

**Q: What is `#[Autowire]` and what are its three main argument modes?**
**A:** A PHP attribute that explicitly controls DI for a single argument: (1) `service:` — inject a named service, (2) `param:` — inject a container parameter, (3) `env:` — inject an env var.
**Code Snippet:**
```php
public function __construct(
    #[Autowire(service: 'cache.app')] private CacheInterface $cache,
    #[Autowire(param: 'app.max_items')] private int $maxItems,
    #[Autowire(env: 'API_BASE_URL')] private string $apiUrl,
) {}
```

---

**Q: What is `#[AutowireInline]` and when would you use it?**
**A:** Creates an anonymous inline service definition directly as an argument — avoids registering a named service just to inject it once.
**Code Snippet:**
```php
public function __construct(
    #[AutowireInline(class: SmtpTransport::class, arguments: ['smtp.example.com'])]
    private TransportInterface $transport,
) {}
```

---

**Q: What is `_defaults.bind` and how does it complement autowiring?**
**A:** Provides a global default mapping from type or variable name to a value. Applied to ALL services under `_defaults`, without needing `#[Autowire]` on each.
**Code Snippet:**
```yaml
services:
    _defaults:
        bind:
            string $projectDir: '%kernel.project_dir%'
            Psr\Log\LoggerInterface $auditLogger: '@monolog.logger.audit'
```

---

### Services decoration

**Q: What is service decoration and what problem does it solve?**
**A:** Wraps an existing service with a new implementation without modifying the original. The decorator receives the original service injected (as `inner`) and adds behaviour around it.
**Code Snippet:**
```php
class LoggingMailer implements MailerInterface {
    public function __construct(
        #[Autowire(service: 'App\Mailer\LoggingMailer.inner')] private MailerInterface $inner,
        private LoggerInterface $logger,
    ) {}
    public function send(Email $email): void {
        $this->logger->info('Sending to: '.$email->getTo()[0]);
        $this->inner->send($email);
    }
}
```
```yaml
App\Mailer\LoggingMailer:
    decorates: App\Mailer\RealMailer
    decoration_priority: 10  # higher = outermost
```

---

**Q: What is `decoration_priority` and what number makes the decorator run first (outermost)?**
**A:** Higher number = outermost decorator (runs first before calling inner). Lower priority decorators are nested inside.
**Code Snippet:**
```yaml
App\Security\LoggingDecorator:
    decorates: App\Service\PaymentService
    decoration_priority: 10   # runs first

App\Security\AuditDecorator:
    decorates: App\Service\PaymentService
    decoration_priority: 5    # runs second
```

---

**Q: What is the `.inner` suffix in service decoration?**
**A:** Symfony automatically creates a service alias `ServiceId.inner` pointing to the decorated service. The decorator must inject it.
**Code Snippet:**
```php
// The inner (original) service is injected via .inner:
#[Autowire(service: 'App\Mailer\LoggingMailer.inner')]
private MailerInterface $inner;
```

---

### Service tags

**Q: What is a service tag and how does `autoconfigure` automate it?**
**A:** A tag marks a service with a label so the container can find all services with that label (e.g., `kernel.event_subscriber`). With `autoconfigure: true`, any class implementing the matching interface is auto-tagged.
**Code Snippet:**
```yaml
# Manual tagging (not needed with autoconfigure):
App\EventSubscriber\MySubscriber:
    tags:
        - { name: kernel.event_subscriber }
```

---

**Q: What tag do you add to register a Twig extension service?**
**A:** `twig.extension`. With autoconfigure, any class extending `AbstractExtension` is auto-tagged.
**Code Snippet:**
```yaml
App\Twig\AppExtension:
    tags:
        - { name: twig.extension }
```

---

**Q: What is a tagged iterator and how do you inject all services with a specific tag?**
**A:** Use `!tagged_iterator tag.name` in YAML or `#[AutowireIterator('tag.name')]` attribute to inject all tagged services as an iterable.
**Code Snippet:**
```yaml
App\Notifier\NotificationManager:
    arguments:
        $channels: !tagged_iterator app.notification_channel
```
```php
public function __construct(
    #[AutowireIterator('app.notification_channel')] private iterable $channels
) {}
```

---

**Q: What does `#[AutoconfigureTag]` attribute do on a class?**
**A:** Automatically applies a DI tag to the class when `autoconfigure: true`. Replaces manual tagging in YAML.
**Code Snippet:**
```php
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('app.notification_channel')]
class EmailChannel implements NotificationChannelInterface { ... }
```

---

### Semantic configuration

**Q: What is a Bundle Extension class and when is it needed?**
**A:** An `Extension` class allows a bundle to expose its own semantic configuration (under its `.yaml` key) and process it in `load()`, defining services programmatically.
**Code Snippet:**
```php
class AcmeShopExtension extends AbstractExtension {
    public function load(array $configs, ContainerBuilder $container): void {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);
        $container->setParameter('acme_shop.currency', $config['currency']);
    }
}
```

---

**Q: What does the `Configuration` class do in a bundle extension?**
**A:** Defines the schema (tree) for the bundle's config (types, required keys, defaults, allowed values). Uses `TreeBuilder` and `NodeDefinition`.
**Code Snippet:**
```php
class Configuration implements ConfigurationInterface {
    public function getConfigTreeBuilder(): TreeBuilder {
        $tree = new TreeBuilder('acme_shop');
        $tree->getRootNode()
            ->children()
                ->scalarNode('currency')->defaultValue('EUR')->end()
                ->booleanNode('enable_promo')->defaultFalse()->end()
            ->end();
        return $tree;
    }
}
```

---

### Factories

**Q: What is a service factory and when do you use one?**
**A:** Use a factory when a service requires non-trivial construction: calling a static method, another service's factory method, or when the class is external.
**Code Snippet:**
```yaml
services:
    App\Payment\Gateway:
        factory: ['App\Payment\GatewayFactory', 'create']
        arguments:
            - '%env(PAYMENT_MODE)%'
```
```php
// Or attribute-based:
class GatewayFactory {
    #[AsAlias('App\Payment\Gateway')]
    public function create(string $mode): Gateway { ... }
}
```

---

**Q: How do you use a factory from another service (not a static method)?**
**A:** In YAML, reference the service with `@service_id` as the first factory element.
**Code Snippet:**
```yaml
services:
    App\Service\PdfGenerator:
        factory: ['@App\Factory\PdfGeneratorFactory', 'build']
        arguments: ['%kernel.project_dir%']
```

---

### Compiler passes

**Q: What is a Compiler Pass and at what point in the container build does it run?**
**A:** A class implementing `CompilerPassInterface` that manipulates the `ContainerBuilder` during compilation (before the container is dumped to PHP). Used to find tagged services, modify definitions, validate configuration.
**Code Snippet:**
```php
class RegisterHandlersPass implements CompilerPassInterface {
    public function process(ContainerBuilder $container): void {
        if (!$container->has(HandlerRegistry::class)) return;
        $def = $container->findDefinition(HandlerRegistry::class);
        $tagged = $container->findTaggedServiceIds('app.handler');
        foreach ($tagged as $id => $tags) {
            $def->addMethodCall('addHandler', [new Reference($id)]);
        }
    }
}
```

---

**Q: How do you register a Compiler Pass from a Bundle or Kernel?**
**A:** Register in the Bundle class `build()` method or via the `#[AsCompilerPass]` attribute.
**Code Snippet:**
```php
// In Bundle class:
public function build(ContainerBuilder $container): void {
    $container->addCompilerPass(new RegisterHandlersPass());
}
// Or attribute:
#[AsCompilerPass]
class RegisterHandlersPass implements CompilerPassInterface { ... }
```

---

### Expressions in configuration

**Q: What is the `@=expression` syntax in DI service configuration?**
**A:** Uses Symfony ExpressionLanguage to dynamically resolve an argument at compile time. Access: `container`, `parameter()`, `service()`.
**Code Snippet:**
```yaml
services:
    App\Service\Mailer:
        arguments:
            $isDebug: "@=parameter('kernel.debug')"
            $transport: "@=service('smtp.transport')"
```

---

**Q: What variables are available inside an `@=` DI expression?**
**A:** `container` (the `ContainerBuilder`), `parameter('name')` (shortcut for a parameter), `service('id')` (shortcut for a service reference).
**Code Snippet:**
```yaml
$threshold: "@=parameter('app.rate_limit') * 2"
```

---

**Q: What is the difference between `@=` expression and `%env()%` in service arguments?**
**A:** `%env()%` is evaluated at **runtime** (env var read on each request or cached). `@=` is evaluated at **compile time** (when the container is built). Don't use `@=` for values that change between requests.
**Code Snippet:** N/A

---

### Synthetic services

**Q: What is a synthetic service?**
**A:** A service whose instantiation is entirely managed outside the container. You declare it as `synthetic: true`, then manually inject the instance via `$container->set('id', $object)` at runtime (typically in the Kernel or test setup).
**Code Snippet:**
```yaml
services:
    App\Context\RequestContext:
        synthetic: true
```
```php
// At runtime (e.g., in a listener):
$container->set(RequestContext::class, new RequestContext($request));
```

---

**Q: Why are synthetic services common in tests?**
**A:** They allow replacing real services with mocks/stubs at runtime without rebuilding the container. `static::getContainer()->set(ServiceId::class, $mock)` works because test services are public.
**Code Snippet:**
```php
$mock = $this->createMock(PaymentGatewayInterface::class);
static::getContainer()->set(PaymentGatewayInterface::class, $mock);
```

---

**Q: What does `public: true` have to do with synthetic services?**
**A:** Synthetic services must be `public: true` — they need to be set via `$container->set()` at runtime, which is only possible for public services.
**Code Snippet:**
```yaml
services:
    App\Context\TenantContext:
        synthetic: true
        public: true
```

---

### Service locators

**Q: What is a `ServiceLocatorInterface` and when is it preferable to injecting all services directly?**
**A:** A container-like object giving access to a pre-defined set of services on demand (lazy). Use when you need one of many services depending on runtime conditions, without injecting all upfront.
**Code Snippet:**
```php
use Symfony\Component\DependencyInjection\ServiceLocator;

public function __construct(
    #[AutowireLocator([
        'stripe' => StripeGateway::class,
        'paypal' => PaypalGateway::class,
    ])]
    private ServiceLocator $locator
) {}

public function pay(string $provider): void {
    $this->locator->get($provider)->charge(...);
}
```

---

**Q: How do you create a tagged service locator (locator for all services with a tag)?**
**A:** Use `!tagged_locator tag.name` (YAML) or `#[AutowireLocator]` attribute with tag name.
**Code Snippet:**
```yaml
App\Handler\Dispatcher:
    arguments:
        $handlers: !tagged_locator { tag: app.handler, index_by: key }
```

---

**Q: What is the difference between a tagged iterator and a tagged locator?**
**A:** Tagged **iterator** — all services injected eagerly as an iterable (instantiated immediately). Tagged **locator** — all services available lazily by key on demand. Prefer locators when only a subset will be used per request.
**Code Snippet:** N/A

---
