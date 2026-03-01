# Quiz : Controllers (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### HttpKernel component and FrameworkBundle

**Question 1:** The `HttpKernel` component's primary method is:
**Type:** Single answer
- [ ] A) `boot()`
- [ ] B) `handle(Request $request): Response`
- [ ] C) `dispatch(Event $event)`
- [ ] D) `render(string $template)`

**Correct Answer(s):** B
**Explanation:** `HttpKernel::handle()` accepts a `Request` and returns a `Response`, orchestrating the full request lifecycle.

---

**Question 2:** The `FrameworkBundle` is the core bundle that:
**Type:** Single answer
- [ ] A) Provides CSS frameworks
- [ ] B) Registers fundamental Symfony services (routing, DI, controller resolving, event dispatching)
- [ ] C) Manages database migrations
- [ ] D) Handles email sending

**Correct Answer(s):** B
**Explanation:** FrameworkBundle wires together the core components (HttpKernel, Routing, DI, EventDispatcher) into the Symfony framework.

---

**Question 3:** A controller in Symfony must return:
**Type:** Single answer
- [ ] A) A string
- [ ] B) A `Response` object (or something a `kernel.view` listener can convert to a Response)
- [ ] C) An array
- [ ] D) `void`

**Correct Answer(s):** B
**Explanation:** Controllers must return a `Response`. If they return something else, a `kernel.view` listener must convert it.

---

### Naming conventions

**Question 4:** The conventional name for a single-action controller (invokable) method is:
**Type:** Single answer
- [ ] A) `execute()`
- [ ] B) `run()`
- [ ] C) `__invoke()`
- [ ] D) `index()`

**Correct Answer(s):** C
**Explanation:** Invokable controllers use `__invoke()`. Symfony's router calls this automatically.

---

**Question 5:** By convention, a controller class should be in the `App\Controller` namespace.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Symfony's default project structure places controllers in `src/Controller/`.

---

### The base AbstractController class

**Question 6:** `AbstractController` provides which of the following helper methods? (Select all)
**Type:** Multiple choice
- [ ] A) `render()`
- [ ] B) `redirectToRoute()`
- [ ] C) `json()`
- [ ] D) `denyAccessUnlessGranted()`
- [ ] E) `createForm()`
- [ ] F) `addFlash()`

**Correct Answer(s):** A, B, C, D, E, F
**Explanation:** AbstractController provides all of these convenience methods.

---

**Question 7:** `AbstractController` implements `ServiceSubscriberInterface`. What does this mean?
**Type:** Single answer
- [ ] A) It injects all container services
- [ ] B) It declares a limited set of services it needs from the container (lazy service locator)
- [ ] C) It subscribes to kernel events
- [ ] D) It registers routes automatically

**Correct Answer(s):** B
**Explanation:** It uses a service locator (not the full container) with only the specific services it needs.

---

**Question 8:** You do NOT need to extend `AbstractController` to create a Symfony controller.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Any callable (class method, invokable, closure) can be a controller. `AbstractController` is a convenience.

---

### The request

**Question 9:** How do you type-hint the current request in a controller method?
**Type:** Single answer
- [ ] A) `public function show(HttpRequest $request)`
- [ ] B) `public function show(Request $request)` (from HttpFoundation)
- [ ] C) `public function show(ServerRequest $request)`
- [ ] D) `public function show(array $request)`

**Correct Answer(s):** B
**Explanation:** `Symfony\Component\HttpFoundation\Request` is automatically injected by the argument resolver.

---

**Question 10:** `$request->query->getInt('page', 1)` does what?
**Type:** Single answer
- [ ] A) Returns the `page` GET parameter as an integer, defaulting to 1
- [ ] B) Returns the POST `page` parameter
- [ ] C) Throws an exception if `page` is not set
- [ ] D) Returns a float

**Correct Answer(s):** A
**Explanation:** `query` = GET params. `getInt()` casts to integer. Default is 1 if missing.

---

**Question 11:** `#[MapQueryParameter]` attribute does what?
**Type:** Single answer
- [ ] A) Maps a form field to a query parameter
- [ ] B) Automatically extracts and type-casts a query string parameter to the controller argument
- [ ] C) Validates the query string
- [ ] D) Redirects with query parameters

**Correct Answer(s):** B
**Explanation:** `#[MapQueryParameter] int $page = 1` automatically gets `?page=N` from the URL and casts to int.

---

**Question 12:** `#[MapRequestPayload]` deserializes:
**Type:** Single answer
- [ ] A) Query string parameters into an object
- [ ] B) The request body (JSON/XML) into a DTO object using the Serializer
- [ ] C) Route parameters
- [ ] D) Session data

**Correct Answer(s):** B
**Explanation:** `#[MapRequestPayload] UserDTO $data` — deserializes the JSON/XML body into the specified class.

---

**Question 13:** `#[MapQueryString]` does what?
**Type:** Single answer
- [ ] A) Maps the entire query string into a DTO object
- [ ] B) Maps a single query parameter
- [ ] C) Parses cookies
- [ ] D) Maps route parameters

**Correct Answer(s):** A
**Explanation:** `#[MapQueryString] SearchCriteria $criteria` maps all `?key=value` parameters into the object.

---

### The response

**Question 14:** Which of these creates a JSON response in a controller?
**Type:** Single answer
- [ ] A) `return new Response(json_encode($data), 200, ['Content-Type' => 'application/json'])`
- [ ] B) `return $this->json($data, 200, ['X-Custom' => 'value'])`
- [ ] C) Both A and B work
- [ ] D) Neither

**Correct Answer(s):** C
**Explanation:** Both work. `$this->json()` is shorthand that creates a `JsonResponse`.

---

**Question 15:** `$this->render('template.html.twig', ['data' => $data])` returns:
**Type:** Single answer
- [ ] A) A string
- [ ] B) A `Response` object with the rendered template as body
- [ ] C) A Twig `Environment` instance
- [ ] D) An array

**Correct Answer(s):** B
**Explanation:** `render()` returns a full `Response` with the Twig-rendered HTML as the body.

---

### The session

**Question 16:** How do you access the session in a Symfony controller?
**Type:** Single answer
- [ ] A) `$session = $this->getSession()`
- [ ] B) `$session = $request->getSession()`
- [ ] C) `$session = $this->container->get('session')`
- [ ] D) `$session = new Session()`

**Correct Answer(s):** B
**Explanation:** `$request->getSession()` is the standard way. You can also type-hint `SessionInterface` as a parameter.

---

**Question 17:** Session data is stored:
**Type:** Single answer
- [ ] A) In the `Request` object
- [ ] B) Server-side (in files, database, or cache), identified by a session cookie sent to the client
- [ ] C) In the browser's localStorage
- [ ] D) In a cookie directly

**Correct Answer(s):** B
**Explanation:** Sessions are server-side storage, identified by a session ID cookie.

---

### The flash messages

**Question 18:** How do you add a flash message in a controller?
**Type:** Single answer
- [ ] A) `$this->addFlash('success', 'Item saved!')`
- [ ] B) `$this->session->flash('success', 'Item saved!')`
- [ ] C) `$this->request->flash('success', 'Item saved!')`
- [ ] D) `$this->flashBag->add('success', 'Item saved!')`

**Correct Answer(s):** A
**Explanation:** `AbstractController::addFlash($type, $message)` adds a flash message to the session.

---

**Question 19:** Flash messages are automatically deleted after:
**Type:** Single answer
- [ ] A) 30 seconds
- [ ] B) The next request (after being retrieved)
- [ ] C) The session expires
- [ ] D) Never — they persist forever

**Correct Answer(s):** B
**Explanation:** Flash messages are consumed (deleted) the first time they are read. They survive exactly one redirect.

---

**Question 20:** In Twig, how do you display flash messages?
**Type:** Single answer
- [ ] A) `{% for msg in app.flashes('success') %}{{ msg }}{% endfor %}`
- [ ] B) `{{ flash('success') }}`
- [ ] C) `{% flash success %}{{ message }}{% endflash %}`
- [ ] D) `{{ app.session.flash.success }}`

**Correct Answer(s):** A
**Explanation:** `app.flashes('type')` returns and clears flash messages of that type.

---

### HTTP redirects

**Question 21:** `$this->redirectToRoute('route_name', ['id' => 42])` returns:
**Type:** Single answer
- [ ] A) A `Response` with status 200
- [ ] B) A `RedirectResponse` with status 302
- [ ] C) A `JsonResponse`
- [ ] D) A `BinaryFileResponse`

**Correct Answer(s):** B
**Explanation:** `redirectToRoute()` returns a `RedirectResponse` (302 by default). Pass a third argument for 301.

---

**Question 22:** How do you make a permanent redirect (301)?
**Type:** Single answer
- [ ] A) `return $this->redirectToRoute('route', [], 301);`
- [ ] B) `return $this->redirect('/url', 301);`
- [ ] C) Both A and B
- [ ] D) Neither

**Correct Answer(s):** C
**Explanation:** Both methods accept the status code as the last parameter.

---

**Question 23:** The Post/Redirect/Get (PRG) pattern prevents:
**Type:** Single answer
- [ ] A) SQL injection
- [ ] B) Duplicate form submissions when the user refreshes the page
- [ ] C) XSS attacks
- [ ] D) CSRF attacks

**Correct Answer(s):** B
**Explanation:** PRG: POST → process → redirect (GET). Refreshing the page only re-sends the GET, not the POST.

---

### Internal redirects (forwarding)

**Question 24:** `$this->forward('App\\Controller\\Other::action', ['id' => 42])` does what?
**Type:** Single answer
- [ ] A) Sends a 302 redirect to the client
- [ ] B) Makes an internal sub-request to another controller without a client redirect
- [ ] C) Includes a Twig template
- [ ] D) Throws an exception

**Correct Answer(s):** B
**Explanation:** `forward()` creates a sub-request handled internally — the URL in the browser doesn't change.

---

### Generate 404 pages

**Question 25:** How do you throw a 404 in a controller?
**Type:** Single answer
- [ ] A) `return new Response('', 404);`
- [ ] B) `throw $this->createNotFoundException('Product not found');`
- [ ] C) `abort(404);`
- [ ] D) `throw new \Exception('Not found');`

**Correct Answer(s):** B
**Explanation:** `createNotFoundException()` throws a `NotFoundHttpException` (extends `HttpException` with status 404).

---

**Question 26:** `createNotFoundException()` throws which exception class?
**Type:** Single answer
- [ ] A) `Symfony\Component\HttpKernel\Exception\NotFoundHttpException`
- [ ] B) `Symfony\Component\HttpFoundation\Exception\NotFoundException`
- [ ] C) `RuntimeException`
- [ ] D) `LogicException`

**Correct Answer(s):** A
**Explanation:** `NotFoundHttpException` extends `HttpException` which sets the HTTP status code automatically.

---

**Question 27:** `AccesDeniedHttpException` sets which HTTP status code?
**Type:** Single answer
- [ ] A) 401
- [ ] B) 403
- [ ] C) 404
- [ ] D) 500

**Correct Answer(s):** B
**Explanation:** `AccessDeniedHttpException` → 403 Forbidden.

---

### File upload

**Question 28:** In Symfony, an uploaded file is represented by:
**Type:** Single answer
- [ ] A) `Symfony\Component\HttpFoundation\File\UploadedFile`
- [ ] B) `SplFileInfo`
- [ ] C) A string (the file path)
- [ ] D) An array from `$_FILES`

**Correct Answer(s):** A
**Explanation:** `UploadedFile` extends `SplFileInfo` and provides methods like `move()`, `guessExtension()`, `getClientOriginalName()`.

---

**Question 29:** Why should you use `$file->guessExtension()` instead of `$file->getClientOriginalExtension()`?
**Type:** Single answer
- [ ] A) It's faster
- [ ] B) It determines the extension from the file's MIME type (server-side), not the user-provided filename (which can be faked)
- [ ] C) It returns a shorter extension
- [ ] D) There is no difference

**Correct Answer(s):** B
**Explanation:** `getClientOriginalExtension()` can be spoofed by the user. `guessExtension()` uses the actual file content/MIME type.

---

**Question 30:** `$file->move($directory, $filename)` does what?
**Type:** Single answer
- [ ] A) Copies the file
- [ ] B) Moves the uploaded file from the temporary location to the target directory
- [ ] C) Deletes the file
- [ ] D) Validates the file

**Correct Answer(s):** B
**Explanation:** `move()` moves the temp uploaded file to the target path and returns a `File` object.

---

### Built-in internal controllers

**Question 31:** Symfony provides a built-in way to render a template directly from a route without a controller. The config option is:
**Type:** Single answer
- [ ] A) `controller: template`
- [ ] B) `controller: Symfony\Bundle\FrameworkBundle\Controller\TemplateController`
- [ ] C) `template: 'static/page.html.twig'` in the route definition
- [ ] D) Both B and C

**Correct Answer(s):** B
**Explanation:** `TemplateController` renders a template without writing a custom controller.

---

**Question 32:** Symfony provides a built-in `RedirectController` for:
**Type:** Single answer
- [ ] A) Rendering templates
- [ ] B) Redirecting to a URL or route directly from a route definition (no custom controller needed)
- [ ] C) Downloading files
- [ ] D) Sending emails

**Correct Answer(s):** B
**Explanation:** `RedirectController::redirectAction` or `urlRedirectAction` handles redirects from route config.

---

### Modern Request Data Mapping

**Question 33:** Using `#[MapQueryParameter]`, what happens if the query parameter is missing and no default is provided?
**Type:** Single answer
- [ ] A) `null` is injected
- [ ] B) A `404` error is thrown
- [ ] C) A `MissingParameterException` is thrown (400 Bad Request)
- [ ] D) An empty string is injected

**Correct Answer(s):** A
**Explanation:** If nullable or with a default, it's `null`/default. Without either, a 400 is returned. If typed as `int $page` without default, Symfony throws a NotFoundHttpException or BadRequestException.

---

**Question 34:** `#[MapRequestPayload]` uses which Symfony component internally for deserialization?
**Type:** Single answer
- [ ] A) Form component
- [ ] B) Serializer component
- [ ] C) Validator component
- [ ] D) ExpressionLanguage component

**Correct Answer(s):** B
**Explanation:** `#[MapRequestPayload]` uses the `Serializer` to deserialize the JSON/XML body into the DTO, then optionally validates it.

---

### Argument value resolvers

**Question 35:** What is an argument value resolver?
**Type:** Single answer
- [ ] A) A service that resolves controller method arguments from the request (e.g., entities, DTO, Request, Session)
- [ ] B) A database query builder
- [ ] C) A route compiler
- [ ] D) A template renderer

**Correct Answer(s):** A
**Explanation:** Value resolvers resolve controller arguments: `Request`, `Session`, `EntityInterface` (via attributes), etc.

---

**Question 36:** The `#[ValueResolver('resolver_name')]` attribute targets:
**Type:** Single answer
- [ ] A) Route parameters
- [ ] B) A specific controller argument, telling Symfony which value resolver to use
- [ ] C) Service declarations
- [ ] D) Twig templates

**Correct Answer(s):** B
**Explanation:** `#[ValueResolver]` is applied to a controller argument to force a specific resolver.

---

**Question 37:** Which built-in resolvers does Symfony provide? (Select all)
**Type:** Multiple choice
- [ ] A) `RequestValueResolver` (injects the `Request`)
- [ ] B) `SessionValueResolver` (injects the `Session`)
- [ ] C) `DefaultValueResolver` (uses parameter defaults)
- [ ] D) `EntityValueResolver` (resolves Doctrine entities from route params)
- [ ] E) `DateTimeValueResolver` (converts route param to `\DateTimeInterface`)

**Correct Answer(s):** A, B, C, D, E
**Explanation:** All five are built-in. EntityValueResolver bridges to Doctrine but is still a built-in resolver.

---

---
