# Quiz : Miscellaneous (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Configuration (DotEnv)

**Question 1:** The `.env` file in Symfony defines:
**Type:** Single answer
- [ ] A) PHP classes
- [ ] B) Environment variables used for application configuration
- [ ] C) HTML templates
- [ ] D) Database schemas

**Correct Answer(s):** B
**Explanation:** `.env` files define env vars like `APP_ENV`, `APP_SECRET`, `DATABASE_URL`.

---

**Question 2:** The loading priority of `.env` files from lowest to highest is:
**Type:** Single answer
- [ ] A) `.env` → `.env.local` → `.env.${APP_ENV}` → `.env.${APP_ENV}.local`
- [ ] B) `.env.local` → `.env` → `.env.${APP_ENV}`
- [ ] C) `.env.${APP_ENV}` → `.env` → `.env.local`
- [ ] D) Only `.env` is loaded

**Correct Answer(s):** A
**Explanation:** Each level overrides the previous. `.env.prod.local` has highest priority in prod.

---

**Question 3:** `.env.local` is:
**Type:** Single answer
- [ ] A) Committed to version control
- [ ] B) Ignored by `.gitignore` — developer-specific overrides
- [ ] C) Only used in production
- [ ] D) A backup file

**Correct Answer(s):** B
**Explanation:** `.env.local` is gitignored — perfect for local database URLs, secrets, etc.

---

**Question 4:** `.env.test` is loaded when:
**Type:** Single answer
- [ ] A) `APP_ENV=prod`
- [ ] B) `APP_ENV=test` (during PHPUnit tests)
- [ ] C) Always
- [ ] D) Only in Docker

**Correct Answer(s):** B
**Explanation:** Environment-specific files like `.env.test` only load when `APP_ENV` matches.

---

**Question 5:** `composer dump-env prod` does what?
**Type:** Single answer
- [ ] A) Deletes all `.env` files
- [ ] B) Compiles env vars into a cached `.env.local.php` for production (avoids parsing `.env` files at runtime)
- [ ] C) Exports to Docker
- [ ] D) Encrypts env vars

**Correct Answer(s):** B
**Explanation:** `.env.local.php` is a PHP array — faster than parsing `.env` files on every request.

---

**Question 6:** The `APP_SECRET` env var is used for:
**Type:** Single answer
- [ ] A) Database passwords
- [ ] B) CSRF token generation, remember-me cookies, and other cryptographic operations
- [ ] C) API keys
- [ ] D) Logging

**Correct Answer(s):** B
**Explanation:** `APP_SECRET` is a secret string used as a seed for CSRF tokens, signed cookies, etc.

---

### ExpressionLanguage component

**Question 7:** The ExpressionLanguage component allows:
**Type:** Single answer
- [ ] A) Running JavaScript
- [ ] B) Compiling and evaluating string expressions with variables (used in routing `condition`, security, DI)
- [ ] C) Parsing Twig templates
- [ ] D) SQL queries

**Correct Answer(s):** B
**Explanation:** `ExpressionLanguage` evaluates expressions like `"user.isActive and 'ROLE_ADMIN' in user.roles"`.

---

**Question 8:** ExpressionLanguage is used in which Symfony features? (Select all)
**Type:** Multiple choice
- [ ] A) Route conditions
- [ ] B) Security access control expressions
- [ ] C) Service container configuration (`@=expression`)
- [ ] D) Validator constraints (`#[Assert\Expression]`)

**Correct Answer(s):** A, B, C, D
**Explanation:** All four areas use ExpressionLanguage.

---

### Error handling

**Question 9:** Symfony's ErrorHandler component replaces PHP's default error handling with:
**Type:** Single answer
- [ ] A) JSON error pages
- [ ] B) Structured exception handling — converts PHP errors/warnings to exceptions
- [ ] C) Silent error suppression
- [ ] D) Log-only error handling

**Correct Answer(s):** B
**Explanation:** `ErrorHandler` converts PHP errors into `ErrorException` instances and provides pretty error pages in dev.

---

**Question 10:** In development, Symfony shows:
**Type:** Single answer
- [ ] A) A blank page
- [ ] B) A detailed exception page with stack trace, request data, and logs
- [ ] C) A JSON error
- [ ] D) A 503 page

**Correct Answer(s):** B
**Explanation:** The dev exception page (provided by WebProfilerBundle) shows full context for debugging.

---

**Question 11:** In production, error pages:
**Type:** Single answer
- [ ] A) Show stack traces
- [ ] B) Show customizable error templates (`error404.html.twig`, `error500.html.twig`) without sensitive info
- [ ] C) Are always JSON
- [ ] D) Are disabled

**Correct Answer(s):** B
**Explanation:** Production shows custom templates in `templates/bundles/TwigBundle/Exception/`. No stack traces.

---

### Debugging

**Question 12:** The Symfony Web Debug Toolbar (WDT) is available in:
**Type:** Single answer
- [ ] A) Production
- [ ] B) Development environment only (requires `WebProfilerBundle`)
- [ ] C) All environments
- [ ] D) Only during tests

**Correct Answer(s):** B
**Explanation:** WDT and Profiler are dev-only tools.

---

**Question 13:** `dump()` and `dd()` (dump and die) are provided by:
**Type:** Single answer
- [ ] A) PHP built-in
- [ ] B) The VarDumper component
- [ ] C) Twig
- [ ] D) PHPUnit

**Correct Answer(s):** B
**Explanation:** `symfony/var-dumper` provides `dump()` and `dd()` with rich output.

---

### Deployment

**Question 14:** The recommended steps when deploying a Symfony app to production include: (Select all)
**Type:** Multiple choice
- [ ] A) `composer install --no-dev --optimize-autoloader`
- [ ] B) `php bin/console cache:clear --env=prod`
- [ ] C) `composer dump-env prod`
- [ ] D) `php bin/console cache:warmup --env=prod`

**Correct Answer(s):** A, B, C, D
**Explanation:** All four are standard production deployment steps.

---

**Question 15:** `--no-dev` in `composer install` means:
**Type:** Single answer
- [ ] A) Install all packages
- [ ] B) Skip `require-dev` packages (PHPUnit, debug tools, etc.)
- [ ] C) Skip `require` packages
- [ ] D) Install dev packages only

**Correct Answer(s):** B
**Explanation:** `--no-dev` excludes development dependencies for production.

---

### Internationalization (Intl component)

**Question 16:** The Symfony Intl component provides:
**Type:** Single answer
- [ ] A) Database translations
- [ ] B) Access to ICU localization data (country names, currency symbols, language names, timezones)
- [ ] C) HTTP translation
- [ ] D) Route translation

**Correct Answer(s):** B
**Explanation:** `Intl` provides locale-aware data: `Countries::getNames('fr')`, `Currencies::getSymbol('EUR')`, etc.

---

**Question 17:** `Countries::getName('FR', 'en')` returns:
**Type:** Single answer
- [ ] A) `FR`
- [ ] B) `France`
- [ ] C) `French Republic`
- [ ] D) `fr`

**Correct Answer(s):** B
**Explanation:** Returns the English name for the `FR` country code.

---

**Question 18:** `Currencies::getSymbol('EUR')` returns:
**Type:** Single answer
- [ ] A) `Euro`
- [ ] B) `€`
- [ ] C) `EUR`
- [ ] D) `978`

**Correct Answer(s):** B
**Explanation:** Returns the currency symbol.

---

### Symfony components in scope

**Question 19:** Which of these are standalone Symfony components in scope for the exam? (Select all)
**Type:** Multiple choice
- [ ] A) Filesystem
- [ ] B) Finder
- [ ] C) Process
- [ ] D) Yaml
- [ ] E) Stopwatch
- [ ] F) Serializer

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** All six are standalone components listed in the miscellaneous section.

---

**Question 20:** The `Filesystem` component provides:
**Type:** Single answer
- [ ] A) Database access
- [ ] B) File operations (copy, mkdir, remove, chmod, symlink, dumpFile, etc.)
- [ ] C) HTTP requests
- [ ] D) Process execution

**Correct Answer(s):** B
**Explanation:** `Filesystem` wraps common file operations with exception handling.

---

**Question 21:** The `Finder` component is used for:
**Type:** Single answer
- [ ] A) Finding database records
- [ ] B) Finding files and directories with a fluent API (name, depth, size, date filters)
- [ ] C) Finding HTTP routes
- [ ] D) Finding services

**Correct Answer(s):** B
**Explanation:** `(new Finder())->files()->in('/dir')->name('*.php')` — fluent file finder.

---

**Question 22:** The `Process` component allows:
**Type:** Single answer
- [ ] A) Symfony process management
- [ ] B) Executing external shell commands from PHP with input/output/error stream control
- [ ] C) Managing PHP processes
- [ ] D) Database process management

**Correct Answer(s):** B
**Explanation:** `$process = new Process(['ls', '-la']); $process->run();`.

---

**Question 23:** The `Yaml` component:
**Type:** Single answer
- [ ] A) Validates YAML syntax
- [ ] B) Parses YAML strings/files into PHP arrays and dumps PHP arrays as YAML
- [ ] C) Renders YAML templates
- [ ] D) Compiles YAML to PHP

**Correct Answer(s):** B
**Explanation:** `Yaml::parse($yaml)` → PHP array. `Yaml::dump($array)` → YAML string.

---

**Question 24:** The `Stopwatch` component is used for:
**Type:** Single answer
- [ ] A) Timing code execution (profiling specific sections of code)
- [ ] B) Creating timers in JavaScript
- [ ] C) Scheduling tasks
- [ ] D) Delaying execution

**Correct Answer(s):** A
**Explanation:** `$stopwatch->start('section'); ... $event = $stopwatch->stop('section');`.

---

**Question 25:** The `Serializer` component converts:
**Type:** Single answer
- [ ] A) HTTP requests to responses
- [ ] B) PHP objects to various formats (JSON, XML, CSV) and back (normalization + encoding)
- [ ] C) SQL to PHP
- [ ] D) Twig to HTML

**Correct Answer(s):** B
**Explanation:** Serializer: normalize (object → array) → encode (array → format). Deserialize does the reverse.

---

---
