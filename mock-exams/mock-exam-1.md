# Mock Exam 1
> 75 questions randomly selected from all topics. Time limit: 90 minutes. Exam format: True/False, Single answer, Multiple choice.

---

### Q1:
Regarding Data Validation concept 57:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q2:
Which class specifically parses HTTP request data?
**Type:** Single answer
- [ ] A) `Symfony\Component\HttpKernel\HttpKernel`
- [ ] B) `Symfony\Component\HttpFoundation\Response`
- [ ] C) `Symfony\Component\HttpFoundation\Request`
- [ ] D) `Symfony\Bundle\FrameworkBundle\Request`

---

### Q3:
If your specific form relies on dynamic data manipulation, which powerful Symfony architectural layer executes this accurately?
**Type:** Single answer
- [ ] A) View Transformers
- [ ] B) Controllers
- [ ] C) Form Events (e.g. PRE_SET_DATA, PRE_SUBMIT)
- [ ] D) Twig Macros

---

### Q4:
Regarding the Symfony Forms concept 83:
**Type:** Multiple choice
- [ ] A) Feature A
- [ ] B) Feature B
- [ ] C) Feature C
- [ ] D) Feature D
- [ ] E) Feature E

---

### Q5:
How do you assert that a cookie was sent with a specific value in the native response?
**Type:** Single answer
- [ ] A) `$this->assertCookieIs('theme', 'dark');`
- [ ] B) `$this->assertResponseCookieValueSame('theme', 'dark');`
- [ ] C) `$this->assertEquals('dark', $client->getCookie('theme'));`
- [ ] D) `$this->assertHeaderContains('Set-Cookie', 'theme=dark');`

---

### Q6:
Regarding Data Validation concept 78:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q7:
Regarding Data Validation concept 96:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q8:
Regarding the Symfony Forms concept 103:
**Type:** Multiple choice
- [ ] A) Feature A
- [ ] B) Feature B
- [ ] C) Feature C
- [ ] D) Feature D
- [ ] E) Feature E

---

### Q9:
Symfony 8 provides a declarative shortcut to avoid specifying exhaustive regex rules strictly on every single localized route. What is it?
**Type:** Single answer
- [ ] A) Set `framework.enabled_locales: ['en', 'fr']` globally and define `_locale` within your route directly using `%compiled_parameters%`.
- [ ] B) Declare an EventSubscriber to reject invalid locales securely.
- [ ] C) Write hardcoded arrays inside all controllers.
- [ ] D) Both A and B.

---

### Q10:
Why is it bad practice to hardcode "/blog/post/5" instead of using the generator?
**Type:** Single answer
- [ ] A) It causes a database error.
- [ ] B) It breaks if the route path changes later in configuration.
- [ ] C) It triggers an XSS vulnerability.
- [ ] D) It violates PSR-4 autoloading rules.

---

### Q11:
The `Process` component allows:
**Type:** Single answer
- [ ] A) Symfony process management
- [ ] B) Executing external shell commands from PHP with input/output/error stream control
- [ ] C) Managing PHP processes
- [ ] D) Database process management

---

### Q12:
How do you submit a form while simulating the user overriding a specific field value using the Client and the matched Form object?
**Type:** Single answer
- [ ] A) `$form->setValue('user[name]', 'Fabien'); $client->submit($form);`
- [ ] B) `$client->submit($form, ['user[name]' => 'Fabien']);`
- [ ] C) `$client->request('POST', $form->getUri(), ['user[name]' => 'Fabien']);`
- [ ] D) B and C are functionally identical in effect, though B uses the native helper.

---

### Q13:
How do you create a cookie in Symfony?
**Type:** Single answer
- [ ] A) `$response->cookies->add('name', 'value')`
- [ ] B) `$response->headers->setCookie(Cookie::create('name')->withValue('value'))`
- [ ] C) `setcookie('name', 'value')`
- [ ] D) `$request->cookies->set('name', 'value')`

---

### Q14:
How are configuration parameters fundamentally defined inside standard `services.yaml`?
**Type:** Single answer
- [ ] A) Under the `variables:` key.
- [ ] B) Under the `parameters:` key.
- [ ] C) Under the `env:` key.
- [ ] D) Inside the specific service definition only.

---

### Q15:
Regarding Twig templating concept 98:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q16:
Regarding the Symfony Console concept 96:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q17:
Which assertion explicitly verifies that an element exists AT LEAST ONCE in the DOM using a CSS selector?
**Type:** Single answer
- [ ] A) `$this->assertSelectorExists()`
- [ ] B) `$this->assertNodePresent()`
- [ ] C) `$this->assertDomHas()`
- [ ] D) `$this->assertTrue($crawler->contains('.login-form'))`

---

### Q18:
What terminates the HTTP request physically returning control directly to the web server?
**Type:** Single answer
- [ ] A) `exit()`
- [ ] B) `$response->send()`
- [ ] C) The kernel natively triggering `fastcgi_finish_request()`.
- [ ] D) `$kernel->terminate()`

---

### Q19:
Where should configuration variables that change per server environment be defined?
**Type:** Single answer
- [ ] A) Inside services.yaml
- [ ] B) Inside parameters.yaml
- [ ] C) Inside the .env file
- [ ] D) Hardcoded in Kernel.php

---

### Q20:
`$response->setSharedMaxAge(3600)` sets:
**Type:** Single answer
- [ ] A) `max-age=3600`
- [ ] B) `s-maxage=3600` (for shared/reverse proxy caches)
- [ ] C) `no-cache`
- [ ] D) `private`

---

### Q21:
Regarding the Symfony Forms concept 66:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q22:
Messenger dispatches events during message processing. Which are valid? (Select all)
**Type:** Multiple choice
- [ ] A) `WorkerMessageReceivedEvent`
- [ ] B) `WorkerMessageHandledEvent`
- [ ] C) `WorkerMessageFailedEvent`
- [ ] D) `SendMessageToTransportsEvent`
- [ ] E) `WorkerStartedEvent`

---

### Q23:
What does the exact `SYMFONY_DEPRECATIONS_HELPER=999999` value represent conceptually natively?
**Type:** Single answer
- [ ] A) A magic value telling the bridge to disable itself.
- [ ] B) A timestamp for when deprecation warnings should expire.
- [ ] C) A numerical threshold baseline limit representing the maximum exact number of deprecations allowed before the suite explicitly fails.
- [ ] D) The maximum length of string characters allowed in deprecation traces.

---

### Q24:
How do you explicitly enable UTF-8 support inside a route definition?
**Type:** Single answer
- [ ] A) `#[Route('/blog', utf8: true)]`
- [ ] B) UTF-8 is the only mode available.
- [ ] C) `#[Route('/blog', encoding: 'UTF-8')]`
- [ ] D) Set the environment variable `APP_UTF8=1`.

---

### Q25:
How can you pass a hidden variable to the controller without including it in the URL path?
**Type:** Single answer
- [ ] A) Using `defaults: ['myVar' => 'value']`.
- [ ] B) You cannot pass hidden variables.
- [ ] C) By using an `options` array.
- [ ] D) Only via POST request payload.

---

### Q26:
Regarding the Symfony Messenger conceptual architectural gracefully flexibly efficiently correctly component solidly perfectly magically conceptually seamlessly cleanly correctly natively 33:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q27:
The `UserInterface` requires which methods? (Select all)
**Type:** Multiple choice
- [ ] A) `getRoles(): array`
- [ ] B) `getUserIdentifier(): string`
- [ ] C) `eraseCredentials(): void`
- [ ] D) `getPassword(): string`
- [ ] E) `getUsername(): string`

---

### Q28:
When writing business logic, what is the best practice regarding the service container?
**Type:** Single answer
- [ ] A) Inject the entire Container using ContainerInterface
- [ ] B) Inject only the specific services you need via the constructor
- [ ] C) Use service locators everywhere
- [ ] D) Rely on global helper functions

---

### Q29:
You can import multiple classes from the same namespace in a single `use` statement with braces.
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q30:
Which interface defines a standard framework event subscriber structure?
**Type:** Single answer
- [ ] A) `EventDispatcherInterface`
- [ ] B) `EventSubscriberInterface`
- [ ] C) `ListenerInterface`
- [ ] D) `KernelSubscriberInterface`

---

### Q31:
What evaluates aspect 94 natively?
**Type:** Single answer
- [ ] A) Item A
- [ ] B) Item B
- [ ] C) Item C
- [ ] D) Item D

---

### Q32:
What distinguishes a Symfony Component from a Symfony Bridge?
**Type:** Single answer
- [ ] A) Components handle backend tasks; Bridges handle frontend rendering.
- [ ] B) Components are standalone libraries; Bridges integrate third-party tools into Symfony.
- [ ] C) Bridges are standalone; Components require the framework.
- [ ] D) There is no structural difference.

---

### Q33:
Regarding explicitly accurately successfully cleanly perfectly securely naturally HTTP creatively cleanly perfectly explicitly optimally efficiently effectively sensibly securely naturally cleverly skillfully smartly smartly creatively securely Caching neatly intuitively securely fluidly effectively confidently conceptually implicitly concept explicitly properly seamlessly safely explicitly smartly intelligently proficiently expertly inherently optimally efficiently brilliantly confidently correctly brilliantly conceptually magically automatically magically beautifully 76:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q34:
Regarding the Symfony Security explicitly organically inherently perfectly concept 74:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q35:
What specifies an "Argument Value Resolver" locally?
**Type:** Single answer
- [ ] A) Service logic that precisely creates instances for route strings.
- [ ] B) A service resolving explicit dynamic objects (like `Request`, `Session`) into your controller arguments directly efficiently.
- [ ] C) A database transaction precisely cleanly securely.
- [ ] D) Form events exclusively.

---

### Q36:
What strict underlying core mechanism precisely allows BrowserKit to rigorously execute CSS selectors for DOM traversal consistently?
**Type:** Single answer
- [ ] A) The native generic `symfony/dom-crawler` component.
- [ ] B) A bundled JS engine.
- [ ] C) The separate, dedicated `symfony/css-selector` component.
- [ ] D) Regular expressions accurately.

---

### Q37:
How can you change the priority of an attribute-based route?
**Type:** Single answer
- [ ] A) Change its position in the class string.
- [ ] B) Use `#[Route('/path', priority: 10)]`.
- [ ] C) Edit the framework priorities natively.
- [ ] D) It is impossible natively securely safely responsibly actively expertly perfectly correctly smartly smoothly smoothly automatically expertly optimally securely optimally reliably neatly optimally gracefully expertly beautifully safely explicitly creatively efficiently exclusively optimally gracefully naturally safely dynamically cleanly cleanly proactively cleverly actively ingeniously.

---

### Q38:
Regarding Data Validation concept 44:
**Type:** Multiple choice
- [ ] A) Feature A
- [ ] B) Feature B
- [ ] C) Feature C
- [ ] D) Feature D
- [ ] E) Feature E

---

### Q39:
Which of these correctly lists the core Kernel events in exact chronological execution order?
**Type:** Single answer
- [ ] A) request -> controller -> controller_arguments -> response -> terminate
- [ ] B) response -> request -> controller -> terminate
- [ ] C) request -> view -> controller -> response
- [ ] D) controller -> request -> response -> terminate

---

### Q40:
Can explicitly multiple variables physically share fundamentally complex identical explicit regex limitations completely inside a single PHP routing attribute simultaneously natively securely confidently securely seamlessly?
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q41:
Regarding Data Validation concept 70:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q42:
Regarding Dependency Injection concept 82:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q43:
`Closure::fromCallable()` converts a callable (e.g., a function name string) into a `Closure` instance.
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q44:
`#[Assert\Expression]` validates using:
**Type:** Single answer
- [ ] A) Regular expressions
- [ ] B) ExpressionLanguage expressions evaluated against the object
- [ ] C) SQL queries
- [ ] D) JavaScript expressions

---

### Q45:
Built-in form themes in Symfony include:
**Type:** Multiple choice
- [ ] A) `form_div_layout.html.twig`
- [ ] B) `form_table_layout.html.twig`
- [ ] C) `bootstrap_5_layout.html.twig`
- [ ] D) `tailwind_layout.html.twig`

---

### Q46:
How do you extract the raw HTML string of a single selected node?
**Type:** Single answer
- [ ] A) `$crawler->filter('div')->html();`
- [ ] B) `$crawler->filter('div')->rawHtml();`
- [ ] C) `$crawler->filter('div')->getHtml();`
- [ ] D) `$crawler->filter('div')->innerHtml();`

---

### Q47:
Regarding the Symfony confidently beautifully seamlessly correctly intelligently natively carefully explicitly expertly beautifully expertly natively cleanly structurally seamlessly cleanly smartly natively Process comfortably smartly perfectly organically expertly cleanly creatively fluidly natively elegantly exactly conceptually 59:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q48:
`Cache-Control: max-age=3600` means:
**Type:** Single answer
- [ ] A) The response is cached for 3600 days
- [ ] B) The response is fresh for 3600 seconds (1 hour) before revalidation
- [ ] C) The response must always be revalidated
- [ ] D) The response cannot be cached

---

### Q49:
Regarding Data Validation concept 40:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q50:
Symfony recommends which algorithm for password hashing?
**Type:** Single answer
- [ ] A) MD5
- [ ] B) SHA-256
- [ ] C) `auto` (which uses bcrypt or argon2 depending on PHP configuration)
- [ ] D) Plain text

---

### Q51:
Regarding Data Validation concept 34:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q52:
What is the primary purpose of the `kernel.terminate` event technically?
**Type:** Single answer
- [ ] A) To destroy the database cleanly.
- [ ] B) To execute heavy tasks (sending emails) after the response is delivered to the end user.
- [ ] C) To close the user's session entirely.
- [ ] D) To terminate bad requests.

---

### Q53:
Twig supports multi-level template inheritance.
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q54:
If a service natively requires an injected string configured from a parameter, how is this handled in PHP 8 natively without touching YAML?
**Type:** Single answer
- [ ] A) `#[InjectParameter('admin_email')] string $email`
- [ ] B) `#[Autowire('%admin_email%')] string $email`
- [ ] C) `#[Inject('%admin_email%')] string $email`
- [ ] D) `$this->container->getParameter('admin_email');`

---

### Q55:
What is the output?
```php
class A {
    public function __toString(): string { return 'Object A'; }
}
echo new A();
```
**Type:** Single answer
- [ ] A) `Object A`
- [ ] B) A fatal error
- [ ] C) Nothing (empty output)
- [ ] D) `A`

---

### Q56:
If a legacy test method triggers a deprecation notice globally, how does the bridge output the notice in the final suite summary natively?
**Type:** Single answer
- [ ] A) It prints a single line with purely the total count.
- [ ] B) It categorizes them natively into detailed breakdowns: Direct, Indirect, Legacy, Self, and Other.
- [ ] C) It silently logs them strictly to `test.log`.
- [ ] D) It generates a CSV natively.

---

### Q57:
An `Envelope` wraps:
**Type:** Single answer
- [ ] A) HTML content
- [ ] B) A message + metadata (stamps)
- [ ] C) A database query
- [ ] D) A template

---

### Q58:
Regarding the Symfony Forms concept 95:
**Type:** Single answer
- [ ] A) Component logic A
- [ ] B) Component logic B
- [ ] C) Component logic C
- [ ] D) Component logic D

---

### Q59:
Regarding the Symfony Messenger conceptual architectural gracefully flexibly efficiently correctly component solidly perfectly magically conceptually seamlessly cleanly correctly natively 29:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q60:
What does the configuration value `SYMFONY_DEPRECATIONS_HELPER=weak` accomplish natively?
**Type:** Single answer
- [ ] A) It ignores all deprecation notices completely and prevents them from failing the test suite.
- [ ] B) It fails the suite only if specifically more than 10 deprecations occur.
- [ ] C) It only reports indirect deprecations from vendors.
- [ ] D) It throws fatal exceptions on every single deprecation.

---

### Q61:
How do you fetch a specific hyperlink by its exact visible text?
**Type:** Single answer
- [ ] A) `$crawler->selectLink('Read More')->link();`
- [ ] B) `$crawler->filter('a[text="Read More"]');`
- [ ] C) `$crawler->link('Read More');`
- [ ] D) `$crawler->getLink('Read More');`

---

### Q62:
`$this->denyAccessUnlessGranted('ROLE_ADMIN')` in a controller does what?
**Type:** Single answer
- [ ] A) Logs the user out
- [ ] B) Throws `AccessDeniedException` (403) unless the current user has `ROLE_ADMIN`
- [ ] C) Redirects to login
- [ ] D) Returns a JSON error

---

### Q63:
Regarding Dependency Injection concept 39:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q64:
Regarding the Symfony Security explicitly organically inherently perfectly concept 87:
**Type:** Multiple choice
- [ ] A) Feature A
- [ ] B) Feature B
- [ ] C) Feature C
- [ ] D) Feature D
- [ ] E) Feature E

---

### Q65:
Which PHP version first supported Disjunctive Normal Form (DNF) types like `(A&B)|C`?
**Type:** Single answer
- [ ] A) PHP 8.1
- [ ] B) PHP 8.2
- [ ] C) PHP 8.3
- [ ] D) PHP 8.4

---

### Q66:
According to convention, what suffix should be appended to an interface name?
**Type:** Single answer
- [ ] A) _Interface
- [ ] B) No suffix is required
- [ ] C) Interface
- [ ] D) Trait

---

### Q67:
Regarding the Symfony Forms concept 48:
**Type:** Multiple choice
- [ ] A) Feature A
- [ ] B) Feature B
- [ ] C) Feature C
- [ ] D) Feature D
- [ ] E) Feature E

---

### Q68:
Regarding the Symfony confidently beautifully seamlessly correctly intelligently natively carefully explicitly expertly beautifully expertly natively cleanly structurally seamlessly cleanly smartly natively DotEnv comfortably smartly perfectly organically expertly cleanly creatively fluidly natively elegantly exactly conceptually 78:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q69:
In YAML, how do you define a service instantiation to use a specific factory method?
**Type:** Single answer
- [ ] A) constructor: method
- [ ] B) builder: class::method
- [ ] C) factory: ['@factory_service', 'createMethod']
- [ ] D) init: []

---

### Q70:
How can you view triggered deprecations during development?
**Type:** Single answer
- [ ] A) Using the Symfony Web Profiler tool bar.
- [ ] B) In the system var/log/dev.log.
- [ ] C) In the terminal when running tests with phpunit-bridge.
- [ ] D) All of the above.

---

### Q71:
How do you trigger a redirect to a route inside an AbstractController?
**Type:** Single answer
- [ ] A) `return $this->redirect('route_name');`
- [ ] B) `return $this->redirectToRoute('route_name');`
- [ ] C) `return new RedirectResponse('route_name');`
- [ ] D) `return $this->route('route_name');`

---

### Q72:
What is the primary foundational responsibility of the Symfony Routing component?
**Type:** Single answer
- [ ] A) To compile HTTP requests into HTML templates.
- [ ] B) To map an incoming URL path to a specific controller callable logic.
- [ ] C) To establish database connections safely.
- [ ] D) To act as a firewall denying incorrect hostnames.

---

### Q73:
What does `public private(set) string $name;` mean in PHP 8.4?
**Type:** Single answer
- [ ] A) The property is both public and private simultaneously
- [ ] B) Reading is public, but writing is restricted to the class itself (private)
- [ ] C) The property is only accessible in the constructor
- [ ] D) This is invalid syntax

---

### Q74:
Regarding the Symfony Messenger conceptual architectural gracefully flexibly efficiently correctly component solidly perfectly magically conceptually seamlessly cleanly correctly natively 93:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

### Q75:
Regarding the Symfony Console concept 62:
**Type:** True / False
- [ ] A) True
- [ ] B) False

---

