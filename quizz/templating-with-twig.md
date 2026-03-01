# Quiz : Templating with Twig (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### TwigBundle and Twig environment

**Question 1:** `strict_variables: true` in Twig causes:
**Type:** Single answer
- [ ] A) All variables to be typed
- [ ] B) An error when accessing undefined variables
- [ ] C) A warning if a variable is null
- [ ] D) Nothing — it's the default

**Correct Answer(s):** B
**Explanation:** With `strict_variables: true`, accessing an undefined variable throws an error instead of returning `null`.

---

**Question 2:** The default Twig template directory in a Symfony project is:
**Type:** Single answer
- [ ] A) `src/templates/`
- [ ] B) `templates/`
- [ ] C) `public/views/`
- [ ] D) `resources/views/`

**Correct Answer(s):** B
**Explanation:** `templates/` is the default path, configurable via `twig.default_path`.

---

### Twig syntax

**Question 3:** `{{ }}` in Twig is used to:
**Type:** Single answer
- [ ] A) Execute logic
- [ ] B) Output/print the value of an expression
- [ ] C) Write comments
- [ ] D) Define blocks

**Correct Answer(s):** B
**Explanation:** `{{ expression }}` outputs the result. `{% %}` = logic tags. `{# #}` = comments.

---

**Question 4:** What is the output? `{{ 'hello world'|upper }}`
**Type:** Single answer
- [ ] A) hello world
- [ ] B) HELLO WORLD
- [ ] C) Hello World
- [ ] D) Hello world

**Correct Answer(s):** B
**Explanation:** The `|upper` filter converts all characters to uppercase.

---

**Question 5:** Twig's dot `.` accessor tries to resolve `product.name` in which order?
**Type:** Single answer
- [ ] A) `$product->name` only
- [ ] B) Array key → public property → `getName()` → `hasName()` → `isName()` → `__get()`
- [ ] C) Only method calls
- [ ] D) Only array access

**Correct Answer(s):** B
**Explanation:** Twig tries array access, property, getter, hasser, isser, and magic `__get()` in order.

---

**Question 6:** `{% set total = 0 %}` does what in Twig?
**Type:** Single answer
- [ ] A) Declares a constant
- [ ] B) Assigns a value to a variable within the template
- [ ] C) Creates a macro
- [ ] D) Defines a block

**Correct Answer(s):** B
**Explanation:** `{% set %}` creates or modifies a template variable.

---

### Auto-escaping

**Question 7:** By default, Twig auto-escapes output for which strategy?
**Type:** Single answer
- [ ] A) JavaScript
- [ ] B) CSS
- [ ] C) HTML
- [ ] D) No escaping

**Correct Answer(s):** C
**Explanation:** `.html.twig` templates auto-escape for HTML context by default.

---

**Question 8:** How do you output raw (unescaped) HTML in Twig?
**Type:** Single answer
- [ ] A) `{{ content }}`
- [ ] B) `{{ content|raw }}`
- [ ] C) `{% raw %}{{ content }}{% endraw %}`
- [ ] D) `{{ content|safe }}`

**Correct Answer(s):** B
**Explanation:** `|raw` filter bypasses auto-escaping. Use with extreme caution.

---

**Question 9:** `{{ value|escape('js') }}` escapes the value for use in:
**Type:** Single answer
- [ ] A) HTML content
- [ ] B) JavaScript strings
- [ ] C) CSS properties
- [ ] D) URL parameters

**Correct Answer(s):** B
**Explanation:** `|escape('js')` escapes for safe insertion inside `<script>` tags.

---

### Template inheritance

**Question 10:** `{% extends %}` must be:
**Type:** Single answer
- [ ] A) The last tag in a template
- [ ] B) The first tag in a template (after comments)
- [ ] C) Inside a `{% block %}`
- [ ] D) Inside a `{% for %}` loop

**Correct Answer(s):** B
**Explanation:** `{% extends %}` must be the FIRST tag (content outside blocks is silently ignored in child templates).

---

**Question 11:** `{{ parent() }}` inside a block does what?
**Type:** Single answer
- [ ] A) Replaces the parent block entirely
- [ ] B) Calls the parent template's version of the current block, inserting its content
- [ ] C) Deletes the block
- [ ] D) Throws an error

**Correct Answer(s):** B
**Explanation:** `{{ parent() }}` renders the parent block's content at that position — allows appending/prepending instead of fully replacing.

---

**Question 12:** Twig supports multi-level template inheritance (A extends B extends C).
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** No limit on inheritance depth. Common: `page.html.twig extends admin/base.html.twig extends base.html.twig`.

---

### Global variables

**Question 13:** The `app` global in Twig provides which properties? (Select all)
**Type:** Multiple choice
- [ ] A) `app.user`
- [ ] B) `app.request`
- [ ] C) `app.session`
- [ ] D) `app.flashes()`
- [ ] E) `app.environment`
- [ ] F) `app.debug`

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** All six are available via the `app` global variable.

---

**Question 14:** How do you register a custom global variable in Twig?
**Type:** Single answer
- [ ] A) In `twig.yaml` under `globals:`
- [ ] B) In `services.yaml` under `parameters:`
- [ ] C) In the Kernel class
- [ ] D) You cannot add custom globals

**Correct Answer(s):** A
**Explanation:** `twig: globals: my_var: 'value'` or `my_service: '@App\Service\MyService'`.

---

### Filters and functions

**Question 15:** The `|date('Y-m-d')` filter formats:
**Type:** Single answer
- [ ] A) A string as a number
- [ ] B) A DateTime object (or timestamp) as a formatted date string
- [ ] C) A date as an integer
- [ ] D) The current timezone

**Correct Answer(s):** B
**Explanation:** `|date()` formats dates, accepting format strings like PHP's `date()`.

---

**Question 16:** `{{ products|length }}` returns:
**Type:** Single answer
- [ ] A) The first element
- [ ] B) The count/number of elements
- [ ] C) The last element
- [ ] D) A boolean

**Correct Answer(s):** B
**Explanation:** `|length` returns the count of array/string elements.

---

**Question 17:** `{{ 'hello.world'|trans }}` uses which Symfony component?
**Type:** Single answer
- [ ] A) Form
- [ ] B) Translation
- [ ] C) Serializer
- [ ] D) Validator

**Correct Answer(s):** B
**Explanation:** The `|trans` filter uses the Translation component to translate message keys.

---

### Includes and embedding

**Question 18:** `{% include 'partial.html.twig' with {name: 'John'} only %}` — what does `only` do?
**Type:** Single answer
- [ ] A) Includes the template only once
- [ ] B) Restricts the included template to ONLY the variables passed via `with` (no parent context leaks)
- [ ] C) Makes the include optional
- [ ] D) Renders only one line

**Correct Answer(s):** B
**Explanation:** `only` prevents inheriting the parent template's variables. Only `name` is available.

---

**Question 19:** What is the difference between `{% include %}` and `{% embed %}`?
**Type:** Single answer
- [ ] A) They are identical
- [ ] B) `include` renders another template; `embed` renders AND allows overriding its blocks
- [ ] C) `embed` is deprecated
- [ ] D) `include` renders blocks; `embed` does not

**Correct Answer(s):** B
**Explanation:** `{% embed %}` is like `{% include %}` + `{% extends %}` — you can override blocks of the embedded template.

---

### Loops and conditions

**Question 20:** Inside a `{% for %}` loop, `loop.first` is:
**Type:** Single answer
- [ ] A) The first value of the array
- [ ] B) A boolean: `true` if this is the first iteration
- [ ] C) The index of the first element
- [ ] D) Always `false`

**Correct Answer(s):** B
**Explanation:** `loop.first` = `true` on the first iteration; `loop.last` = `true` on the last.

---

**Question 21:** `{% for item in items %}...{% else %}No items{% endfor %}` — when does `{% else %}` render?
**Type:** Single answer
- [ ] A) After the last iteration
- [ ] B) When the iterable is empty
- [ ] C) On every odd iteration
- [ ] D) When an error occurs

**Correct Answer(s):** B
**Explanation:** The `{% else %}` clause of a `for` loop renders when the array/iterable is empty.

---

### URL generation

**Question 22:** `{{ path('route_name') }}` generates:
**Type:** Single answer
- [ ] A) An absolute URL
- [ ] B) A relative path
- [ ] C) A JavaScript URL
- [ ] D) A route object

**Correct Answer(s):** B
**Explanation:** `path()` = relative path. `url()` = absolute URL.

---

### Macros

**Question 23:** Macros DO have access to the current template's variables by default.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Macros are isolated — they only see variables explicitly passed as arguments.

---

**Question 24:** How do you import a macro from an external file?
**Type:** Single answer
- [ ] A) `{% import 'macros.html.twig' as m %}`
- [ ] B) `{% include 'macros.html.twig' %}`
- [ ] C) `{% use 'macros.html.twig' %}`
- [ ] D) `{% require 'macros.html.twig' %}`

**Correct Answer(s):** A
**Explanation:** `{% import %}` or `{% from 'file' import macro_name %}` to import macros.

---

### Custom extensions

**Question 25:** A custom Twig extension must extend:
**Type:** Single answer
- [ ] A) `Twig\Extension\AbstractExtension`
- [ ] B) `Symfony\Component\Twig\Extension`
- [ ] C) `Twig\Template`
- [ ] D) `Twig\Environment`

**Correct Answer(s):** A
**Explanation:** Custom extensions extend `AbstractExtension` and override `getFilters()`, `getFunctions()`, `getTests()`, etc.

---

**Question 26:** To mark a custom Twig function's output as safe (no auto-escaping), you pass:
**Type:** Single answer
- [ ] A) `['safe' => true]`
- [ ] B) `['is_safe' => ['html']]`
- [ ] C) `['raw' => true]`
- [ ] D) `['escape' => false]`

**Correct Answer(s):** B
**Explanation:** `['is_safe' => ['html']]` as the options array in `new TwigFunction(...)`.

---

**Question 27:** `['needs_environment' => true]` on a Twig function:
**Type:** Single answer
- [ ] A) Requires the `APP_ENV` variable
- [ ] B) Injects the `Twig\Environment` as the first argument of the callback
- [ ] C) Enables debug mode
- [ ] D) Requires the Kernel environment

**Correct Answer(s):** B
**Explanation:** The `Environment` object is prepended as the first parameter to the callback function.

---

**Question 28:** With `autoconfigure: true`, extending `AbstractExtension` automatically tags the service as:
**Type:** Single answer
- [ ] A) `kernel.event_subscriber`
- [ ] B) `twig.extension`
- [ ] C) `console.command`
- [ ] D) `messenger.message_handler`

**Correct Answer(s):** B
**Explanation:** Autoconfigure tags classes extending `AbstractExtension` with `twig.extension`.

---

**Question 29:** A custom Twig test is used with:
**Type:** Single answer
- [ ] A) `{{ value|test_name }}`
- [ ] B) `{% if value is test_name %}`
- [ ] C) `{{ test_name(value) }}`
- [ ] D) `{% test value %}`

**Correct Answer(s):** B
**Explanation:** Tests are used with the `is` operator: `{% if count is even %}`.

---

**Question 30:** Twig functions are callable with `{{ func_name(args) }}`, while filters use `{{ value|filter_name }}`.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Functions use parentheses syntax; filters use pipe syntax with the value as implicit first argument.

---

---
