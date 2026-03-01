# Flashcards : Miscellaneous (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading.
> ⚠️ Mailer, Mime, Translation bridge, Lock component, and ESI are OUT OF SCOPE (see `deprecations/`).

---

### Configuration (DotEnv)

**Q: What is the DotEnv component and what file does it read?**
**A:** `DotEnv` loads environment variables from `.env` files into PHP's `$_ENV`, `$_SERVER`, and `getenv()`. The main file is `.env`.
**Code Snippet:**
```bash
# .env
APP_ENV=dev
APP_SECRET=change_me_in_production
DATABASE_URL="postgresql://user:pwd@127.0.0.1:5432/mydb"
```

---

**Q: What is the priority order of Symfony's DotEnv files (from lowest to highest priority)?**
**A:**
1. `.env` — base defaults, committed to VCS
2. `.env.local` — local overrides, NOT committed
3. `.env.{APP_ENV}` — environment-specific (e.g., `.env.test`)
4. `.env.{APP_ENV}.local` — environment + local override (highest priority)
**Code Snippet:** N/A

---

**Q: What is the purpose of `.env.local` vs `.env`?**
**A:** `.env` is committed to version control and contains safe defaults or placeholders. `.env.local` is gitignored and contains actual secrets/overrides per developer machine.
**Code Snippet:**
```bash
# .gitignore
/.env.local
/.env.*.local
```

---

**Q: How do you access an environment variable as a container parameter in Symfony?**
**A:** Use `%env(VAR_NAME)%` syntax in YAML config or `#[Autowire(env: 'VAR_NAME')]` in PHP.
**Code Snippet:**
```yaml
# services.yaml
parameters:
    api_url: '%env(API_BASE_URL)%'
```
```php
public function __construct(
    #[Autowire(env: 'API_BASE_URL')] string $apiUrl
) {}
```

---

**Q: What are Symfony environment variable processors and give 4 examples?**
**A:** Processors transform the string value of an env var. Syntax: `%env(PROCESSOR:VAR)%`.
- `int:` → cast to int
- `bool:` → cast to bool
- `base64:` → base64-decode
- `json:` → JSON decode to array
- `resolve:` → resolve %parameter% references inside the value
**Code Snippet:**
```yaml
parameters:
    debug_mode: '%env(bool:APP_DEBUG)%'
    max_retries: '%env(int:MAX_RETRIES)%'
    config_data: '%env(json:CONFIG_JSON)%'
```

---

**Q: What is the `.env.test` file used for?**
**A:** Sets environment variables for the `test` environment so tests run with different settings (e.g., `APP_ENV=test`, in-memory transport for Messenger, test database name).
**Code Snippet:**
```bash
# .env.test
APP_ENV=test
MESSENGER_TRANSPORT_DSN=in-memory://
```

---

**Q: How do you dump all resolved container parameters including env vars from the CLI?**
**A:** `php bin/console debug:container --parameters` or `php bin/console debug:dotenv` for the env file hierarchy.
**Code Snippet:**
```bash
php bin/console debug:dotenv
php bin/console debug:container --parameters
```

---

**Q: Are `.env` files read in production by default?**
**A:** No — for performance, Symfony skips the DotEnv component entirely in production when a `.env.local.php` cached file exists, or when you set env vars via the server/hosting environment directly. Use the `symfony:dump-env` command to generate the cached PHP file.
**Code Snippet:**
```bash
# Generate optimized PHP env cache for production:
composer dump-env prod
# Creates: .env.local.php
```

---

### Configuration (ExpressionLanguage)

**Q: What is the ExpressionLanguage component, where is it used in Symfony?**
**A:** A PHP library that compiles simple expressions (strings) into PHP code and Evaluates them at runtime or compile time. Used in: route `condition:`, DI configuration (`@=expression`), security `access_control.allow_if`, validator `Expression` constraint.
**Code Snippet:**
```php
use Symfony\Component\ExpressionLanguage\ExpressionLanguage;
$el = new ExpressionLanguage();
$result = $el->evaluate('user.isActive() and request.getClientIp() != "1.2.3.4"', [
    'user' => $user,
    'request' => $request,
]);
```

---

**Q: How do you use ExpressionLanguage in a route condition?**
**A:** Use the `condition:` route option with an expression string. Available variables: `context` (RequestContext) and `request` (Request).
**Code Snippet:**
```yaml
api_only:
    path: /special
    condition: "request.headers.get('X-Custom') === 'secret'"
    controller: App\Controller\SpecialController::action
```

---

**Q: How do you use ExpressionLanguage in an `access_control` rule?**
**A:** Use `allow_if:` — expression can reference `user`, `object`, `roles`, `request`, `token`.
**Code Snippet:**
```yaml
access_control:
    - path: ^/admin/profile
      allow_if: "'ROLE_ADMIN' in roles or (user and user.getUsername() == request.attributes.get('username'))"
```

---

**Q: How do you add custom functions to the ExpressionLanguage component?**
**A:** Call `$el->addFunction(new ExpressionFunction('name', $compiler, $evaluator))` or register an `ExpressionFunctionProviderInterface`.
**Code Snippet:**
```php
$el->addFunction(ExpressionFunction::fromPhp('str_starts_with'));
$result = $el->evaluate("str_starts_with(name, 'admin')", ['name' => 'admin_user']);
```

---

### Error handling

**Q: What component handles PHP errors and exceptions in Symfony?**
**A:** The `ErrorHandler` component (from `symfony/error-handler`). It converts PHP errors to exceptions and registers custom error/exception handlers.
**Code Snippet:**
```php
// Registered automatically in Kernel — no manual setup needed.
// Converts E_NOTICE, E_WARNING, etc. to \ErrorException.
```

---

**Q: What is the Symfony `ErrorHandler` component's main responsibility?**
**A:** Convert PHP native errors (notices, warnings) into `\ErrorException` instances, provide a rich HTML error page in dev (with source code, stack trace), and log errors appropriately.
**Code Snippet:** N/A

---

**Q: How do you create a custom error controller in Symfony?**
**A:** Create a controller class and register it as `framework.error_controller` in `framework.yaml`. It receives the `Request` and a `\Throwable`.
**Code Snippet:**
```yaml
# framework.yaml
framework:
    error_controller: App\Controller\ErrorController::show
```
```php
class ErrorController {
    public function show(Request $request, \Throwable $exception): Response {
        $code = $exception instanceof HttpExceptionInterface
            ? $exception->getStatusCode() : 500;
        return $this->render("errors/error$code.html.twig", [], new Response('', $code));
    }
}
```

---

**Q: How do you preview error pages in development mode?**
**A:** Navigate to `/_error/{statusCode}` (e.g., `/_error/404`, `/_error/500`). This route is registered by the FrameworkBundle only in dev mode.
**Code Snippet:**
```bash
curl http://localhost:8000/_error/404
curl http://localhost:8000/_error/500
```

---

**Q: What does `set_error_handler()` do and does Symfony override it?**
**A:** PHP's built-in function to set a custom error handler. Symfony's `ErrorHandler` replaces it with its own handler that throws exceptions. You should not override this after Symfony boots.
**Code Snippet:** N/A

---

### Code debugging (Web Profiler / VarDumper)

**Q: What is the Symfony Web Profiler and when is it enabled?**
**A:** A toolbar + panel system that appears in dev mode at the bottom of every page, showing request info, queries, events, cache usage, logs, etc. Enabled by installing `symfony/profiler-pack` in `dev` env.
**Code Snippet:**
```bash
composer require --dev symfony/profiler-pack
```

---

**Q: How do you access the full Profiler for a previous request?**
**A:** Click the token link in the Debug Toolbar (bottom bar), or navigate to `/_profiler/<token>`. List recent profiling data at `/_profiler`.
**Code Snippet:**
```bash
# Browse:
http://localhost:8000/_profiler
http://localhost:8000/_profiler/abcd1234  # specific request token
```

---

**Q: What is the `VarDumper` component and what function does it provide?**
**A:** A component for dumping variable contents in a readable, structured, colorized format. Provides the `dump()` function (used everywhere: PHP, Twig, CLI).
**Code Snippet:**
```php
dump($product);           // in PHP (shows in Debug Toolbar)
dd($product);             // dump and die
```
```twig
{{ dump(product) }}       {# in Twig templates #}
```

---

**Q: What is the difference between `dump()` and `dd()` in Symfony?**
**A:** `dump()` outputs the variable and **continues execution**. `dd()` (dump and die) dumps and **stops execution** immediately.
**Code Snippet:**
```php
dump($user);   // continues
dd($user);     // stops here — equivalent to dump($user); exit;
```

---

**Q: When does `dump()` output appear vs in the Debug Toolbar?**
**A:** In HTML responses, `dump()` output is injected into the Toolbar's Profiler (not inline). For CLI or non-HTML responses, it is output directly to STDOUT.
**Code Snippet:** N/A

---

**Q: What Twig global variable provides access to debug info in templates?**
**A:** `app` provides `app.debug` (bool). The `dump()` Twig function is available only when `kernel.debug = true`.
**Code Snippet:**
```twig
{% if app.debug %}
    {{ dump(entity) }}
{% endif %}
```

---

### Deployment

**Q: What are the essential Symfony deployment steps for a production release?**
**A:**
1. Upload code (Git pull / Deployer / Capistrano)
2. `composer install --no-dev --optimize-autoloader`
3. `php bin/console cache:clear --env=prod --no-debug`
4. `php bin/console cache:warmup --env=prod`
5. `composer dump-env prod` (optimize env vars)
6. Apply database migrations (if Doctrine used)
7. Reload web server / PHP-FPM
**Code Snippet:**
```bash
composer install --no-dev --optimize-autoloader
php bin/console cache:clear --env=prod --no-debug
php bin/console cache:warmup --env=prod
composer dump-env prod
```

---

**Q: Why is `--optimize-autoloader` important for production?**
**A:** Generates a class map (all classes → file paths). Autoloading becomes a simple array lookup instead of recursive filesystem scanning — significantly faster in production.
**Code Snippet:**
```bash
composer install --no-dev --optimize-autoloader
# or:
composer dump-autoload --optimize --no-dev
```

---

**Q: What is `composer dump-env prod` and what file does it create?**
**A:** Dumps all env vars (from `.env` chain) into a highly optimized PHP file `.env.local.php`. In production, Symfony reads this file instead of parsing `.env` files, for maximum performance.
**Code Snippet:**
```bash
composer dump-env prod
# Creates: .env.local.php
```

---

**Q: Why should `var/` be writable by the web server in production?**
**A:** Symfony writes cache files to `var/cache/` and logs to `var/log/`. Both must be writable by the PHP process. Set proper ownership (`www-data` or equivalent) and mode (`0775` or `0755`).
**Code Snippet:**
```bash
chmod -R 775 var/
chown -R www-data:www-data var/
```

---

### Internationalization (Intl component)

**Q: What is the Symfony `Intl` component?**
**A:** Provides access to ICU (International Components for Unicode) data: country names, currency names, language names, locale names, timezones — all localized. Does NOT require the `intl` PHP extension to provide basic data.
**Code Snippet:**
```bash
composer require symfony/intl
```

---

**Q: How do you get a localized list of country names using the Intl component?**
**A:** Use `Symfony\Component\Intl\Countries::getNames($locale)`.
**Code Snippet:**
```php
use Symfony\Component\Intl\Countries;
$countries = Countries::getNames('fr'); // ['AF' => 'Afghanistan', 'DE' => 'Allemagne', ...]
$name = Countries::getName('US', 'fr'); // 'États-Unis'
```

---

**Q: How do you use the Intl component to get a localized currency name?**
**A:** Use `Symfony\Component\Intl\Currencies::getName($currency, $locale)`.
**Code Snippet:**
```php
use Symfony\Component\Intl\Currencies;
$name = Currencies::getName('EUR', 'fr'); // 'euro'
$symbol = Currencies::getSymbol('USD', 'en'); // '$'
$list = Currencies::getNames('de'); // All currencies in German
```

---

**Q: How do you get a list of locale names using the Intl component?**
**A:** Use `Symfony\Component\Intl\Locales::getNames($displayLocale)`.
**Code Snippet:**
```php
use Symfony\Component\Intl\Locales;
$locales = Locales::getNames('en'); // ['af' => 'Afrikaans', 'en' => 'English', ...]
$name = Locales::getName('fr', 'en'); // 'French'
```

---

**Q: What is the `NumberFormatter` class from the PHP `intl` extension used for in Symfony?**
**A:** Formats numbers, currencies, percentages, and ordinals according to locale rules. Used internally by Twig's `number_format` filter and can be used directly in PHP services.
**Code Snippet:**
```php
$formatter = new \NumberFormatter('de_DE', \NumberFormatter::CURRENCY);
echo $formatter->formatCurrency(1234.56, 'EUR'); // 1.234,56 €
```

---

**Q: What is the `IntlDateFormatter` class used for?**
**A:** Formats `DateTime` objects according to locale-specific date and time conventions.
**Code Snippet:**
```php
$formatter = new \IntlDateFormatter('fr_FR', \IntlDateFormatter::LONG, \IntlDateFormatter::NONE);
echo $formatter->format(new \DateTime()); // e.g. '1 mars 2026'
```

---

### HTTP Caching (in Misc context)
*(See dedicated `http-caching.md` deck for full detail)*

**Q: What is the relationship between HTTP Caching covered in `miscellaneous.md` and the standalone `http-caching.md` topic?**
**A:** `miscellaneous.md` references HTTP Caching as a related concept. The full sub-topic (`HttpCache` component, expiration, validation, ETags) has its own dedicated topic file `topics/http-caching.md` with a matching flashcard deck `flashcards/http-caching.md`.
**Code Snippet:** N/A

---

### Components (in-scope selection)

**Q: List the in-scope Symfony standalone components covered under the Miscellaneous topic.**
**A:** `Config`, `Console`, `DependencyInjection`, `EventDispatcher`, `Filesystem`, `Finder`, `HttpFoundation`, `HttpKernel`, `Process`, `Routing`, `Serializer`, `Stopwatch`, `Yaml`.
*(Excluded: Mailer, Mime, Lock, MonologBridge, AssetMapper/Webpack — see deprecations/)*
**Code Snippet:** N/A

---

**Q: What does the `Filesystem` component provide?**
**A:** Object-oriented filesystem operations: `copy()`, `mkdir()`, `remove()`, `touch()`, `rename()`, `exists()`, `symlink()`, `dumpFile()`, `appendToFile()`. Throws `IOException` on failure.
**Code Snippet:**
```php
use Symfony\Component\Filesystem\Filesystem;
$fs = new Filesystem();
$fs->mkdir('/tmp/my-dir', 0775);
$fs->dumpFile('/tmp/hello.txt', 'Hello World');
$fs->copy('/tmp/hello.txt', '/tmp/backup.txt');
$fs->remove(['/tmp/hello.txt', '/tmp/backup.txt']);
```

---

**Q: What does the `Finder` component do and how do you use it?**
**A:** Provides a fluent API to find files and directories on the filesystem with filters by name, date, size, depth, content, etc.
**Code Snippet:**
```php
use Symfony\Component\Finder\Finder;
$finder = new Finder();
$finder->files()
    ->in('/src')
    ->name('*.php')
    ->notName('*Test*')
    ->contains('function parse')
    ->size('> 1K');

foreach ($finder as $file) {
    echo $file->getRealPath().PHP_EOL;
}
```

---

**Q: What does the `Process` component allow you to do?**
**A:** Run external commands from PHP in a subprocess (similar to `shell_exec` but safer, with timeout, working directory, environment variables, and proper output handling).
**Code Snippet:**
```php
use Symfony\Component\Process\Process;
$process = new Process(['ls', '-la', '/tmp']);
$process->run();
if (!$process->isSuccessful()) {
    throw new ProcessFailedException($process);
}
echo $process->getOutput();
```

---

**Q: What is the `Yaml` component used for and what are its two main methods?**
**A:** Parse YAML strings into PHP arrays (`Yaml::parse()`) and dump PHP arrays into YAML strings (`Yaml::dump()`).
**Code Snippet:**
```php
use Symfony\Component\Yaml\Yaml;

$array = Yaml::parseFile('/config/services.yaml');
$yaml  = Yaml::dump(['key' => 'value', 'list' => [1, 2, 3]], 2); // indent: 2
```

---

**Q: What is the `Stopwatch` component and how do you use it for profiling?**
**A:** Measures time and memory for sections of code. Used internally by the Profiler.
**Code Snippet:**
```php
use Symfony\Component\Stopwatch\Stopwatch;

$sw = new Stopwatch();
$sw->start('import');
$this->importer->run();
$event = $sw->stop('import');
echo $event->getDuration().'ms, '.$event->getMemory().' bytes';
```

---

**Q: What does the `Serializer` component do and what are the two main operations?**
**A:** **Normalize**: Converts any PHP object to a simple array/scalar structure. **Denormalize**: Converts an array back to a typed object. **Encode**: Converts the normalized data to a format (JSON, XML, CSV). **Decode**: Reverses encode.
**Code Snippet:**
```php
use Symfony\Component\Serializer\SerializerInterface;

// Serialize object → JSON:
$json = $serializer->serialize($product, 'json', ['groups' => ['read']]);
// Deserialize JSON → object:
$product = $serializer->deserialize($json, Product::class, 'json');
```

---

**Q: What is a Serializer group and how do you define one?**
**A:** Groups control which properties are serialized. Annotate properties with `#[Groups(['group_name'])]` and pass the group in the context.
**Code Snippet:**
```php
use Symfony\Component\Serializer\Annotation\Groups;

class Product {
    #[Groups(['read', 'write'])]
    public string $name;
    #[Groups(['read'])]
    public \DateTimeInterface $createdAt;
}
```
```php
$serializer->serialize($product, 'json', ['groups' => ['read']]);
```

---

### Web Profiler

**Q: What is the Symfony Web Profiler and how does it differ from the debug toolbar?**
**A:** The **Debug Toolbar** is the bar at the bottom of dev pages showing quick stats. The **Web Profiler** is the full detail panel accessible by clicking the toolbar — it shows all collectors' detailed data.
**Code Snippet:** N/A

---

**Q: What is a Profiler "collector" and give 5 examples?**
**A:** A service that collects profiling data for one aspect of the request. Examples:
1. `request` — request/response data
2. `router` — matched route
3. `events` — fired events and listeners
4. `cache` — cache hits/misses
5. `form` — form rendering and errors
**Code Snippet:** N/A

---

**Q: How do you create a custom Profiler data collector?**
**A:** Extend `AbstractDataCollector` (or implement `DataCollectorInterface`). Tag with `data_collector` (auto via autoconfigure).
**Code Snippet:**
```php
use Symfony\Bundle\FrameworkBundle\DataCollector\AbstractDataCollector;

class ApiCallsCollector extends AbstractDataCollector {
    public function collect(Request $request, Response $response, ?\Throwable $exception = null): void {
        $this->data = ['calls' => $this->tracker->getCalls()];
    }
    public function getName(): string { return 'api_calls'; }
    public function getCalls(): array { return $this->data['calls']; }
}
```

---

**Q: What does the `Profiler` service allow you to do in tests?**
**A:** Access collectors after a request to assert on internal behavior (e.g., email count, query count, event firings) without relying on visible output.
**Code Snippet:**
```php
$client->enableProfiler();
$client->request('POST', '/checkout');
$profile = $client->getProfile();
$events  = $profile->getCollector('events');
self::assertCount(1, $events->getCalledListeners());
```

---
