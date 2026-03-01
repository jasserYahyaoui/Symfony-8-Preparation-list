# Flashcards : Templating with Twig (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every filter, function, tag, and edge case covered.

---

### TwigBundle and Twig environment

**Q: What does the `TwigBundle` provide and what is its primary configuration file?**
**A:** Integrates the Twig template engine into Symfony. Provides the `twig` service, `Environment`, and connects to the event system. Config: `config/packages/twig.yaml`.
**Code Snippet:**
```yaml
twig:
    default_path: '%kernel.project_dir%/templates'
    debug: '%kernel.debug%'
    strict_variables: '%kernel.debug%'
    form_themes: ['bootstrap_5_layout.html.twig']
```

---

**Q: What does `strict_variables: true` do in Twig?**
**A:** Throws an error when accessing an undefined variable. With `false` (default in prod), undefined variables silently return `null`.
**Code Snippet:**
```yaml
twig:
    strict_variables: true  # recommended in dev
```

---

**Q: How do you render a Twig template from a Symfony controller?**
**A:** Use `$this->render('path/template.html.twig', $vars)` from `AbstractController`. The template path is relative to `templates/`.
**Code Snippet:**
```php
return $this->render('product/show.html.twig', [
    'product' => $product,
    'related' => $related,
]);
```

---

**Q: What is `Environment` in Twig and how do you inject it in a service?**
**A:** The Twig `Environment` is the main rendering engine. Inject `Twig\Environment` to render templates from services.
**Code Snippet:**
```php
use Twig\Environment;

class EmailService {
    public function __construct(private Environment $twig) {}
    public function renderBody(Order $order): string {
        return $this->twig->render('email/order_confirm.html.twig', ['order' => $order]);
    }
}
```

---

### Twig syntax

**Q: What are the three tag delimiters in Twig and what does each do?**
**A:**
- `{{ expression }}` — outputs the evaluated value
- `{% tag %}` — executes logic (if, for, block, include, etc.)
- `{# comment #}` — comment (not rendered in output)
**Code Snippet:**
```twig
{{ product.name }}
{% if product.inStock %}In stock{% endif %}
{# This is a comment #}
```

---

**Q: What is the dot `.` accessor in Twig and how does it resolve properties?**
**A:** Twig's dot notation tries in order: array access (`$a['key']`), public property (`$a->key`), getter (`$a->getKey()`), hasser (`$a->hasKey()`), isser (`$a->isKey()`), magic `__get('key')`.
**Code Snippet:**
```twig
{{ product.name }}       {# tries $product->name, then $product->getName() #}
{{ user.isActive }}      {# tries $user->isActive, then $user->isIsActive(), then $user->isActive() #}
{{ items['first'] }}     {# explicit array access #}
```

---

**Q: What is the `is defined` test and what is the `??` (null-coalescing) Twig operator?**
**A:** `is defined` returns `true` if the variable exists and is not `null`. `??` provides a default value if left side is `null` or undefined.
**Code Snippet:**
```twig
{% if error is defined %}{{ error }}{% endif %}
{{ user.name ?? 'Anonymous' }}
{{ items[0] ?? 'No item' }}
```

---

**Q: How do you assign a variable in Twig?**
**A:** Use the `{% set %}` tag.
**Code Snippet:**
```twig
{% set total = 0 %}
{% for item in cart %}
    {% set total = total + item.price %}
{% endfor %}
Total: {{ total }}
```

---

**Q: What is the `not`, `and`, `or` logical operator syntax in Twig?**
**A:** Twig uses `not`, `and`, `or` (English words), not `!`, `&&`, `||`.
**Code Snippet:**
```twig
{% if not user.isActive or user.roles|length == 0 %}
    Access denied.
{% endif %}
```

---

**Q: What does `{% spaceless %}` (or `|spaceless` filter) do in Twig?**
**A:** Removes whitespace between HTML tags. The block tag version removes whitespace inside. Mostly a legacy feature; prefer CSS/minification tools.
**Code Snippet:**
```twig
{% spaceless %}
    <div>
        <span>Hello</span>
    </div>
{% endspaceless %}
```

---

### Auto-escaping

**Q: What is auto-escaping in Twig and when does it apply?**
**A:** Output from `{{ }}` is automatically HTML-escaped to prevent XSS. Applied by default in `.html.twig` templates. Disabled in `.txt.twig` or `.js.twig` (different escaper strategies).
**Code Snippet:**
```twig
{{ '<script>alert(1)</script>' }}
{# Output: &lt;script&gt;alert(1)&lt;/script&gt; -- safe #}
```

---

**Q: How do you output a variable unescaped (when you know it's safe HTML)?**
**A:** Use the `raw` filter. Use with extreme caution — only for trusted, already-sanitized HTML.
**Code Snippet:**
```twig
{{ product.description|raw }}  {# NOT escaped — dangerous with user input! #}
```

---

**Q: What is the `escape` (or `e`) filter and what strategies does it support?**
**A:** `|escape('strategy')` escapes for a specific context. Strategies: `html` (default), `js`, `css`, `url`, `html_attr`.
**Code Snippet:**
```twig
{{ value|escape('js') }}       {# safe inside <script> tags #}
{{ value|escape('url') }}      {# safe inside URLs #}
{{ value|escape('html_attr') }} {# safe inside HTML attributes #}
{{ value|e }}                  {# shorthand for |escape('html') #}
```

---

**Q: How do you mark a string as safe (trusted) in Twig to bypass auto-escaping?**
**A:** Use `Twig\Markup` class (PHP side) when returning safe HTML strings, or the `raw` filter in templates. From a PHP Twig function, return a `Markup` object.
**Code Snippet:**
```php
// In a custom Twig function:
return new \Twig\Markup('<strong>Bold</strong>', 'UTF-8');
// Won't be escaped when output
```

---

### Template inheritance

**Q: What is template inheritance in Twig and what tag enables it?**
**A:** A parent template defines `{% block %}` areas. Child templates use `{% extends 'parent.html.twig' %}` and override blocks. Only one `{% extends %}` per template; must be the first tag.
**Code Snippet:**
```twig
{# base.html.twig #}
<!DOCTYPE html>
<html>
<head>{% block title %}My App{% endblock %}</head>
<body>{% block body %}{% endblock %}</body>
</html>
```
```twig
{# product/show.html.twig #}
{% extends 'base.html.twig' %}
{% block title %}{{ product.name }} — {{ parent() }}{% endblock %}
{% block body %}<h1>{{ product.name }}</h1>{% endblock %}
```

---

**Q: What does `{{ parent() }}` do in a Twig block?**
**A:** Calls the parent template's block content. Useful for appending to the parent block rather than fully replacing it.
**Code Snippet:**
```twig
{% block stylesheets %}
    {{ parent() }}  {# Include parent's stylesheets #}
    <link rel="stylesheet" href="{{ asset('css/product.css') }}">
{% endblock %}
```

---

**Q: Can a Twig template extend another template that itself extends a base template?**
**A:** Yes — Twig supports multi-level inheritance without limit. Each level can override or call `parent()` for blocks.
**Code Snippet:**
```twig
{# admin/base.html.twig extends base.html.twig #}
{# admin/users.html.twig extends admin/base.html.twig #}
```

---

**Q: What is `{% use %}` in Twig and how does it differ from `{% extends %}`?**
**A:** `{% use %}` imports blocks from another template without establishing full inheritance. Allows "mixin-like" block reuse from multiple templates. Unlike `{% extends %}`, the current template remains the top-level.
**Code Snippet:**
```twig
{% use 'blocks/sidebar.html.twig' %}   {# Import sidebar blocks #}
{% block sidebar %}{{ block('sidebar_content') }}{% endblock %}
```

---

### Global variables

**Q: What is the `app` global variable in Twig and what properties does it expose?**
**A:** Auto-registered by TwigBundle: `app.user` (current user), `app.request` (Request), `app.session` (Session), `app.flashes(['type'])`, `app.environment`, `app.debug`.
**Code Snippet:**
```twig
{{ app.user.email }}
{{ app.environment }}   {# 'dev' or 'prod' #}
{% if app.debug %}<div class="debug-bar">...</div>{% endif %}
{% for msg in app.flashes('success') %}<div>{{ msg }}</div>{% endfor %}
```

---

**Q: How do you register a custom global Twig variable?**
**A:** In `twig.yaml` under `globals:`, or via a Twig Extension that registers globals in `getGlobals()`.
**Code Snippet:**
```yaml
twig:
    globals:
        site_name: 'My Application'
        ga_tracking_id: '%env(GA_TRACKING_ID)%'
```
```twig
{{ site_name }}
```

---

**Q: How do you access a Symfony service as a Twig global?**
**A:** Reference it with `@service_id` in `twig.yaml` globals.
**Code Snippet:**
```yaml
twig:
    globals:
        cart_service: '@App\Service\CartService'
```
```twig
Items in cart: {{ cart_service.count }}
```

---

### Filters and functions

**Q: List 8 important built-in Twig filters and what they do.**
**A:**
1. `|upper` / `|lower` — case conversion
2. `|length` — count items or string chars
3. `|date('Y-m-d')` — format DateTime
4. `|number_format(2, '.', ',')` — number formatting
5. `|slice(start, length)` — array/string slice
6. `|sort` / `|sort(arrow)` — sort array
7. `|join(', ')` — join array into string
8. `|replace({'a': 'b'})` — string replacement
**Code Snippet:**
```twig
{{ 'hello world'|upper }}           {# HELLO WORLD #}
{{ items|length }}                  {# count #}
{{ product.createdAt|date('d/m/Y') }}
{{ price|number_format(2, '.', ',') }}
{{ tags|join(', ') }}
```

---

**Q: What does the `|trans` filter do and what arguments does it accept?**
**A:** Translates a key using the Translation component. Arguments: `|trans({params}, 'domain')`. The translation domain defaults to `messages`.
**Code Snippet:**
```twig
{{ 'greeting'|trans }}
{{ 'hello.name'|trans({'%name%': user.name}) }}
{{ 'error.count'|trans({'%n%': errors|length}, 'validators') }}
```

---

**Q: What is the `path()` Twig function and how do you add query parameters?**
**A:** Generates a relative URL for a named route. Extra params not in the path become query string.
**Code Snippet:**
```twig
<a href="{{ path('product_list') }}">All products</a>
<a href="{{ path('product_show', {id: product.id}) }}">View</a>
<a href="{{ path('product_list', {page: 2, sort: 'price'}) }}">Page 2</a>
{# → /products?page=2&sort=price #}
```

---

**Q: What is the `url()` Twig function and how does it differ from `path()`?**
**A:** `url()` generates an **absolute URL** (with scheme and host). `path()` generates a relative path.
**Code Snippet:**
```twig
{{ url('product_show', {id: product.id}) }}
{# → https://example.com/products/42 #}
```

---

**Q: What does the `asset()` Twig function do?**
**A:** Generates a versioned URL for a static asset in `public/`. The `asset_version` config adds a cache-busting query string.
**Code Snippet:**
```twig
<img src="{{ asset('images/logo.png') }}" alt="Logo">
<link rel="stylesheet" href="{{ asset('css/app.css') }}">
```
```yaml
framework:
    assets:
        version: 'v3'  # adds ?v3 to URLs
```

---

**Q: What is the `dump()` Twig function and when is it available?**
**A:** Outputs the structure of a variable using the VarDumper component. Available only when `kernel.debug` is `true`.
**Code Snippet:**
```twig
{{ dump(product) }}
{{ dump(app.user, app.request) }}
```

---

**Q: What does the `is` operator do in Twig and give 5 built-in test names?**
**A:** Tests a value against a condition. Tests: `is defined`, `is null`, `is odd`, `is even`, `is empty`, `is iterable`, `is same as(value)`, `is divisible by(n)`.
**Code Snippet:**
```twig
{% if count is even %}Even{% else %}Odd{% endif %}
{% if value is null %}No value{% endif %}
{% if items is empty %}No results{% endif %}
{% if obj is same as(otherObj) %}Same instance{% endif %}
```

---

### Includes and embedding

**Q: What is `{% include %}` in Twig and how does it differ from `{% embed %}`?**
**A:** `{% include %}` renders another template with the CURRENT context (variables available). `{% embed %}` includes a template AND allows overriding its blocks.
**Code Snippet:**
```twig
{# Simple include: #}
{% include 'partials/_header.html.twig' %}
{% include 'partials/_alert.html.twig' with {type: 'success', msg: 'Saved!'} only %}
```
```twig
{# Embed: include AND override blocks #}
{% embed 'components/card.html.twig' %}
    {% block card_body %}<p>Custom content</p>{% endblock %}
{% endembed %}
```

---

**Q: What does the `only` keyword do in `{% include %}`?**
**A:** Restricts the included template to ONLY variables explicitly passed via `with`. No parents variables leak in.
**Code Snippet:**
```twig
{% include '_partial.html.twig' with {title: 'Custom'} only %}
```

---

### Loops and conditions

**Q: What special variables are available inside a Twig `{% for %}` loop?**
**A:** `loop.index` (1-based), `loop.index0` (0-based), `loop.revindex` (reverse, 1-based), `loop.first` (bool), `loop.last` (bool), `loop.length` (total count).
**Code Snippet:**
```twig
{% for product in products %}
    {{ loop.index }}. {{ product.name }}
    {% if loop.last %} (last!){% endif %}
{% else %}
    No products found.
{% endfor %}
```

---

**Q: What does the `{% else %}` clause of a `{% for %}` loop do?**
**A:** Renders when the iterable is empty — avoids a separate `{% if %}` check around the loop.
**Code Snippet:**
```twig
{% for post in posts %}
    <li>{{ post.title }}</li>
{% else %}
    <li>No posts yet.</li>
{% endfor %}
```

---

**Q: How do you iterate over key-value pairs in Twig?**
**A:** `{% for key, value in assocArray %}`.
**Code Snippet:**
```twig
{% for lang, label in {'en': 'English', 'fr': 'Français'} %}
    <option value="{{ lang }}">{{ label }}</option>
{% endfor %}
```

---

**Q: How do you filter a loop using `if` inline in Twig?**
**A:** Add `if condition` after the `in`:
**Code Snippet:**
```twig
{% for user in users if user.isActive %}
    {{ user.name }}
{% endfor %}
```
⚠️ Note: when using inline `if`, `loop.length` and `loop.revindex` are NOT available.

---

### URL generation

**Q: How do you generate an absolute URL in a Twig template for an email?**
**A:** Use `url()` instead of `path()`.
**Code Snippet:**
```twig
Click here to confirm: <a href="{{ url('email_confirm', {token: token}) }}">Confirm</a>
```

---

### Controller rendering

**Q: What is the `render` Twig function for embedding controller output?**
**A:** `{{ render(path('route_name')) }}` or `{{ render(controller('App\\Controller\\X::method')) }}` — makes a sub-request to a controller and embeds the response body.
**Code Snippet:**
```twig
{{ render(path('sidebar_latest_news')) }}
{{ render(controller('App\\Controller\\WidgetController::cart')) }}
```

---

**Q: What is `render_esi` and why is it out of scope for the Symfony 8 exam?**
**A:** `render_esi()` renders a controller as an ESI (Edge Side Include) fragment — used for partial caching. **ESI is explicitly OUT OF SCOPE** for the Symfony 8 certification.
**Code Snippet:** N/A *(out of scope)*

---

### Translations (in-scope: Twig `trans` usage)

**Q: What is the `{% trans %}` block tag and how does it differ from `|trans`?**
**A:** `{% trans %}...{% endtrans %}` translates multi-word content including HTML. `|trans` works on a string expression. Both use the same translation system.
**Code Snippet:**
```twig
{% trans %}Hello, %name%!{% endtrans %}
{% trans with {'%name%': user.name} %}Hello, %name%!{% endtrans %}
{% trans from 'validators' %}error.required{% endtrans %}
```

---

**Q: How do you handle pluralization in Twig translations?**
**A:** Use `{% trans %}` with `|transchoice` (deprecated) or the ICU transpiler. The modern way is Symfony's pluralization in the translation catalog via `{0} No items|{1} One item|[2,Inf] %count% items`.
**Code Snippet:**
```twig
{{ 'item_count'|trans({'%count%': items|length}) }}
{# messages.en.yaml: item_count: "{0} No items|{1} One item|[2,Inf] %count% items" #}
```

---

### String interpolation

**Q: How do you embed Twig expressions inside strings using string interpolation?**
**A:** Use `#{}` inside double-quoted strings.
**Code Snippet:**
```twig
{% set msg = "Hello, #{user.name}! You have #{inbox|length} messages." %}
{{ msg }}
```

---

**Q: What is the difference between single-quoted and double-quoted Twig strings?**
**A:** Single-quoted: literal string (no interpolation, no escape sequences like `\n`). Double-quoted: supports `#{expression}` interpolation and escape sequences.
**Code Snippet:**
```twig
{% set a = 'Hello #{name}' %}   {# Literal: "Hello #{name}" #}
{% set b = "Hello #{name}" %}   {# Interpolated: "Hello World" #}
```

---

### Assets management

**Q: What does `{{ asset('path/to/file.css') }}` generate and where must the file live?**
**A:** A URL to a file under `public/`. The `asset()` function prepends the base URL and may append a version.
**Code Snippet:**
```twig
<link rel="stylesheet" href="{{ asset('css/app.css') }}">
{# → <link href="/css/app.css?v=3"> (with version) #}
```

---

**Q: How do you configure the asset version in Symfony?**
**A:** Set `assets.version` in `framework.yaml`.
**Code Snippet:**
```yaml
framework:
    assets:
        version: 'v%(version)s'
        version_format: '%%s?version=%%s'
        # Or just:
        version: '2.0'
```

---

**Q: What is a named asset package and when is it useful?**
**A:** Multiple asset packages can be configured with different `base_url` (e.g., CDN). Use `asset('path', 'cdn_package')` in Twig to use a specific package.
**Code Snippet:**
```yaml
framework:
    assets:
        packages:
            cdn:
                base_url: 'https://cdn.example.com'
```
```twig
<img src="{{ asset('images/hero.jpg', 'cdn') }}">
```

---

### Macros

**Q: What is a Twig macro and what problem does it solve?**
**A:** A reusable template snippet with arguments — like a function for Twig. Avoids copy-pasting repeated HTML structures (form fields, buttons, cards, etc.).
**Code Snippet:**
```twig
{% macro button(label, type = 'button', class = 'btn') %}
    <button type="{{ type }}" class="{{ class }}">{{ label }}</button>
{% endmacro %}
```

---

**Q: How do you call a macro defined in the same template?**
**A:** Use `_self.macroName()`.
**Code Snippet:**
```twig
{% import _self as forms %}
{{ forms.button('Save', 'submit', 'btn btn-primary') }}
```

---

**Q: How do you import macros from an external template?**
**A:** `{% from 'macros/buttons.html.twig' import button, input %}` or `{% import 'macros.html.twig' as m %}`.
**Code Snippet:**
```twig
{% from 'macros/ui.html.twig' import button, alert %}
{{ button('Submit', 'submit') }}
{{ alert('danger', 'An error occurred.') }}
```

---

**Q: Do macros have access to the current template's variables by default?**
**A:** No. Macros are isolated — they only have access to variables explicitly passed as arguments (similar to a function scope). They do NOT see `app`, `product`, etc.
**Code Snippet:**
```twig
{# WRONG: #}
{% macro greeting() %} Hello, {{ user.name }} {% endmacro %}
{# RIGHT: #}
{% macro greeting(user) %} Hello, {{ user.name }} {% endmacro %}
```

---

### Custom extensions

**Q: What can a custom Twig Extension expose? List all 5 types.**
**A:** (1) **Filters** (`getFilters()`), (2) **Functions** (`getFunctions()`), (3) **Tests** (`getTests()`), (4) **Globals** (`getGlobals()`), (5) **Tags/Node visitors** (`getTokenParsers()`, `getNodeVisitors()`).
**Code Snippet:**
```php
class AppExtension extends AbstractExtension {
    public function getFilters(): array {
        return [new TwigFilter('price', [$this, 'formatPrice'])];
    }
    public function getFunctions(): array {
        return [new TwigFunction('qr_code', [$this, 'renderQrCode'], ['is_safe' => ['html']])];
    }
}
```

---

**Q: How do you mark a custom Twig function as returning safe HTML (to skip auto-escaping)?**
**A:** Pass `['is_safe' => ['html']]` as the third argument to `new TwigFunction(...)`.
**Code Snippet:**
```php
new TwigFunction('render_icon', [$this, 'icon'], ['is_safe' => ['html']]);
// Now {{ render_icon('home') }} output is NOT escaped
```

---

**Q: How do you give a custom Twig function access to the Twig `Environment` object?**
**A:** Pass `['needs_environment' => true]` — the `Environment` is injected as the first argument to the callback.
**Code Snippet:**
```php
new TwigFunction('include_raw', [$this, 'includeRaw'], ['needs_environment' => true]);
// Callback:
public function includeRaw(Environment $env, string $template): string {
    return $env->render($template);
}
```

---

**Q: How do you give a custom Twig filter access to the current template context (variables)?**
**A:** Pass `['needs_context' => true]` — the full template context array is injected as the first argument.
**Code Snippet:**
```php
new TwigFilter('context_aware', [$this, 'func'], ['needs_context' => true]);
// Callback:
public function func(array $context, mixed $value): string {
    $env = $context['app']->getEnvironment();
    return $env === 'dev' ? "[$value]" : $value;
}
```

---

**Q: What is the autoconfigure tag needed to register a custom Twig Extension as a service?**
**A:** `twig.extension`. With `autoconfigure: true`, any class extending `AbstractExtension` is auto-tagged — no manual registration needed.
**Code Snippet:**
```php
// With autoconfigure: true — this is enough:
class AppExtension extends AbstractExtension { ... }
```

---

**Q: How do you create a custom Twig test (the `is` operator)?**
**A:** Return a `TwigTest` from `getTests()`.
**Code Snippet:**
```php
public function getTests(): array {
    return [
        new TwigTest('even_price', fn($val) => $val % 2 === 0),
    ];
}
```
```twig
{% if product.price is even_price %}Even price!{% endif %}
```

---
