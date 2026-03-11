window.CodeReviewBank = window.CodeReviewBank || {};
window.CodeReviewBank['controllers'] = window.CodeReviewBank['controllers'] || [];
window.CodeReviewBank['controllers'].push(...\
[
  {
    "id": "cr-controllers-bank-1",
    "title": "Controller Challenge: Legacy Request #1",
    "content": "```php\nclass Ctrl1 extends AbstractController {\n    public function index() {\n        $req = $this->getRequest();\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "$this->getRequest() was removed. Inject 'Request $request' in the method instead."
  },
  {
    "id": "cr-controllers-bank-2",
    "title": "Controller Challenge: Legacy Request #2",
    "content": "```php\nclass Ctrl2 extends AbstractController {\n    public function index() {\n        $req = $this->getRequest();\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "$this->getRequest() was removed. Inject 'Request $request' in the method instead."
  },
  {
    "id": "cr-controllers-bank-3",
    "title": "Controller Challenge: Legacy Request #3",
    "content": "```php\nclass Ctrl3 extends AbstractController {\n    public function index() {\n        $req = $this->getRequest();\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "$this->getRequest() was removed. Inject 'Request $request' in the method instead."
  },
  {
    "id": "cr-controllers-bank-4",
    "title": "Controller Challenge: Legacy Request #4",
    "content": "```php\nclass Ctrl4 extends AbstractController {\n    public function index() {\n        $req = $this->getRequest();\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "$this->getRequest() was removed. Inject 'Request $request' in the method instead."
  },
  {
    "id": "cr-controllers-bank-5",
    "title": "Controller Challenge: Legacy Request #5",
    "content": "```php\nclass Ctrl5 extends AbstractController {\n    public function index() {\n        $req = $this->getRequest();\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "$this->getRequest() was removed. Inject 'Request $request' in the method instead."
  },
  {
    "id": "cr-controllers-bank-6",
    "title": "Controller Challenge: Return Type #6",
    "content": "```php\nclass Ctrl6 extends AbstractController {\n    public function index(): string\n    {\n        return $this->render('...');\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Controller actions should return a 'Response' object (or null/void if async/special), not 'string'."
  },
  {
    "id": "cr-controllers-bank-7",
    "title": "Controller Challenge: Return Type #7",
    "content": "```php\nclass Ctrl7 extends AbstractController {\n    public function index(): array\n    {\n        return $this->render('...');\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Controller actions should return a 'Response' object (or null/void if async/special), not 'array'."
  },
  {
    "id": "cr-controllers-bank-8",
    "title": "Controller Challenge: Return Type #8",
    "content": "```php\nclass Ctrl8 extends AbstractController {\n    public function index(): int\n    {\n        return $this->render('...');\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Controller actions should return a 'Response' object (or null/void if async/special), not 'int'."
  },
  {
    "id": "cr-controllers-bank-9",
    "title": "Controller Challenge: Return Type #9",
    "content": "```php\nclass Ctrl9 extends AbstractController {\n    public function index(): bool\n    {\n        return $this->render('...');\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Controller actions should return a 'Response' object (or null/void if async/special), not 'bool'."
  },
  {
    "id": "cr-controllers-bank-10",
    "title": "Controller Challenge: Return Type #10",
    "content": "```php\nclass Ctrl10 extends AbstractController {\n    public function index(): object\n    {\n        return $this->render('...');\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Controller actions should return a 'Response' object (or null/void if async/special), not 'object'."
  },
  {
    "id": "cr-controllers-bank-11",
    "title": "Controller Challenge: Redirect Syntax #11",
    "content": "```php\nclass Ctrl11 extends AbstractController {\n    public function go() {\n        return $this->redirect('/home', 200);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Check status code! 200 is for OK (use 302 for redirect)."
  },
  {
    "id": "cr-controllers-bank-12",
    "title": "Controller Challenge: Redirect Syntax #12",
    "content": "```php\nclass Ctrl12 extends AbstractController {\n    public function go() {\n        return $this->redirect('/login', 404);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Check status code! 404 is for Not Found."
  },
  {
    "id": "cr-controllers-bank-13",
    "title": "Controller Challenge: Redirect Syntax #13",
    "content": "```php\nclass Ctrl13 extends AbstractController {\n    public function go() {\n        return $this->redirect('/old', 500);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Check status code! 500 is for Server Error."
  },
  {
    "id": "cr-controllers-bank-14",
    "title": "Controller Challenge: Redirect Syntax #14",
    "content": "```php\nclass Ctrl14 extends AbstractController {\n    public function go() {\n        return $this->redirect('/new', 201);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Check status code! 201 is for Created."
  },
  {
    "id": "cr-controllers-bank-15",
    "title": "Controller Challenge: Redirect Syntax #15",
    "content": "```php\nclass Ctrl15 extends AbstractController {\n    public function go() {\n        return $this->redirect('/', 403);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Check status code! 403 is for Forbidden."
  },
  {
    "id": "cr-controllers-bank-16",
    "title": "Controller Challenge: Flash Array #16",
    "content": "```php\nclass Ctrl16 {\n    public function save() {\n        $this->addFlash('info', ['msg' => 'data']);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Flash messages are typically strings. Storing raw arrays like data can cause issues in Twig templates."
  },
  {
    "id": "cr-controllers-bank-17",
    "title": "Controller Challenge: Flash Array #17",
    "content": "```php\nclass Ctrl17 {\n    public function save() {\n        $this->addFlash('info', ['msg' => 'error']);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Flash messages are typically strings. Storing raw arrays like error can cause issues in Twig templates."
  },
  {
    "id": "cr-controllers-bank-18",
    "title": "Controller Challenge: Flash Array #18",
    "content": "```php\nclass Ctrl18 {\n    public function save() {\n        $this->addFlash('info', ['msg' => 'ok']);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Flash messages are typically strings. Storing raw arrays like ok can cause issues in Twig templates."
  },
  {
    "id": "cr-controllers-bank-19",
    "title": "Controller Challenge: Flash Array #19",
    "content": "```php\nclass Ctrl19 {\n    public function save() {\n        $this->addFlash('info', ['msg' => 'saved']);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Flash messages are typically strings. Storing raw arrays like saved can cause issues in Twig templates."
  },
  {
    "id": "cr-controllers-bank-20",
    "title": "Controller Challenge: Flash Array #20",
    "content": "```php\nclass Ctrl20 {\n    public function save() {\n        $this->addFlash('info', ['msg' => 'deleted']);\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Flash messages are typically strings. Storing raw arrays like deleted can cause issues in Twig templates."
  },
  {
    "id": "cr-controllers-bank-21",
    "title": "Controller Challenge: File Upload Check #21",
    "content": "```php\npublic function upload(Request $request) {\n    $file = $request->files->get('doc');\n    if ($file) { $file->move('/tmp'); }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Security: Always verify $file is an instance of UploadedFile before calling move()."
  },
  {
    "id": "cr-controllers-bank-22",
    "title": "Controller Challenge: File Upload Check #22",
    "content": "```php\npublic function upload(Request $request) {\n    $file = $request->files->get('doc');\n    if ($file) { $file->move('./uploads'); }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Security: Always verify $file is an instance of UploadedFile before calling move()."
  },
  {
    "id": "cr-controllers-bank-23",
    "title": "Controller Challenge: File Upload Check #23",
    "content": "```php\npublic function upload(Request $request) {\n    $file = $request->files->get('doc');\n    if ($file) { $file->move('var/data'); }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Security: Always verify $file is an instance of UploadedFile before calling move()."
  },
  {
    "id": "cr-controllers-bank-24",
    "title": "Controller Challenge: File Upload Check #24",
    "content": "```php\npublic function upload(Request $request) {\n    $file = $request->files->get('doc');\n    if ($file) { $file->move('/var/www/html'); }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Security: Always verify $file is an instance of UploadedFile before calling move()."
  },
  {
    "id": "cr-controllers-bank-25",
    "title": "Controller Challenge: File Upload Check #25",
    "content": "```php\npublic function upload(Request $request) {\n    $file = $request->files->get('doc');\n    if ($file) { $file->move('public/files'); }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Security: Always verify $file is an instance of UploadedFile before calling move()."
  },
  {
    "id": "cr-controllers-bank-26",
    "title": "Controller Challenge: Session Access #26",
    "content": "```php\npublic function index(Request $request) {\n    $session = $request->getSession();\n    $session->set('key', 'val');\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ensure the request has a session (hasSession()) before calling getSession() to avoid exceptions."
  },
  {
    "id": "cr-controllers-bank-27",
    "title": "Controller Challenge: Session Access #27",
    "content": "```php\npublic function index(Request $request) {\n    $session = $request->getSession();\n    $session->set('key', 'val');\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ensure the request has a session (hasSession()) before calling getSession() to avoid exceptions."
  },
  {
    "id": "cr-controllers-bank-28",
    "title": "Controller Challenge: Session Access #28",
    "content": "```php\npublic function index(Request $request) {\n    $session = $request->getSession();\n    $session->set('key', 'val');\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ensure the request has a session (hasSession()) before calling getSession() to avoid exceptions."
  },
  {
    "id": "cr-controllers-bank-29",
    "title": "Controller Challenge: Session Access #29",
    "content": "```php\npublic function index(Request $request) {\n    $session = $request->getSession();\n    $session->set('key', 'val');\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ensure the request has a session (hasSession()) before calling getSession() to avoid exceptions."
  },
  {
    "id": "cr-controllers-bank-30",
    "title": "Controller Challenge: Session Access #30",
    "content": "```php\npublic function index(Request $request) {\n    $session = $request->getSession();\n    $session->set('key', 'val');\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ensure the request has a session (hasSession()) before calling getSession() to avoid exceptions."
  },
  {
    "id": "cr-controllers-bank-31",
    "title": "Controller Challenge: Route Attribute #31",
    "content": "```php\nclass Ctrl31 {\n    #[Route('/api', name: 'api_31')]\n    protected function api() { }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions MUST be public. 'protected' methods cannot be accessed by the Router."
  },
  {
    "id": "cr-controllers-bank-32",
    "title": "Controller Challenge: Route Attribute #32",
    "content": "```php\nclass Ctrl32 {\n    #[Route('/api', name: 'api_32')]\n    protected function api() { }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions MUST be public. 'protected' methods cannot be accessed by the Router."
  },
  {
    "id": "cr-controllers-bank-33",
    "title": "Controller Challenge: Route Attribute #33",
    "content": "```php\nclass Ctrl33 {\n    #[Route('/api', name: 'api_33')]\n    protected function api() { }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions MUST be public. 'protected' methods cannot be accessed by the Router."
  },
  {
    "id": "cr-controllers-bank-34",
    "title": "Controller Challenge: Route Attribute #34",
    "content": "```php\nclass Ctrl34 {\n    #[Route('/api', name: 'api_34')]\n    protected function api() { }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions MUST be public. 'protected' methods cannot be accessed by the Router."
  },
  {
    "id": "cr-controllers-bank-35",
    "title": "Controller Challenge: Route Attribute #35",
    "content": "```php\nclass Ctrl35 {\n    #[Route('/api', name: 'api_35')]\n    protected function api() { }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions MUST be public. 'protected' methods cannot be accessed by the Router."
  },
  {
    "id": "cr-controllers-bank-36",
    "title": "Controller Challenge: JSON Array #36",
    "content": "```php\npublic function api() {\n    return $this->json('success');\n}\n```",
    "bugLine": 2,
    "bugMessage": "$this->json() expects an array or object as first argument, not a string 'success'."
  },
  {
    "id": "cr-controllers-bank-37",
    "title": "Controller Challenge: JSON Array #37",
    "content": "```php\npublic function api() {\n    return $this->json('{\"id\":1}');\n}\n```",
    "bugLine": 2,
    "bugMessage": "$this->json() expects an array or object as first argument, not a string '{\"id\":1}'."
  },
  {
    "id": "cr-controllers-bank-38",
    "title": "Controller Challenge: JSON Array #38",
    "content": "```php\npublic function api() {\n    return $this->json('ok');\n}\n```",
    "bugLine": 2,
    "bugMessage": "$this->json() expects an array or object as first argument, not a string 'ok'."
  },
  {
    "id": "cr-controllers-bank-39",
    "title": "Controller Challenge: JSON Array #39",
    "content": "```php\npublic function api() {\n    return $this->json('error');\n}\n```",
    "bugLine": 2,
    "bugMessage": "$this->json() expects an array or object as first argument, not a string 'error'."
  },
  {
    "id": "cr-controllers-bank-40",
    "title": "Controller Challenge: JSON Array #40",
    "content": "```php\npublic function api() {\n    return $this->json('done');\n}\n```",
    "bugLine": 2,
    "bugMessage": "$this->json() expects an array or object as first argument, not a string 'done'."
  },
  {
    "id": "cr-controllers-bank-41",
    "title": "Controller Challenge: Forward Params #41",
    "content": "```php\npublic function go() {\n    return $this->forward('App\\Ctrl::target', [\n        'id' => 1\n    ]);\n}\n```",
    "bugLine": 3,
    "bugMessage": "Forwarding parameters must match the target action arguments exactly."
  },
  {
    "id": "cr-controllers-bank-42",
    "title": "Controller Challenge: Forward Params #42",
    "content": "```php\npublic function go() {\n    return $this->forward('App\\Ctrl::target', [\n        'id' => 10\n    ]);\n}\n```",
    "bugLine": 3,
    "bugMessage": "Forwarding parameters must match the target action arguments exactly."
  },
  {
    "id": "cr-controllers-bank-43",
    "title": "Controller Challenge: Forward Params #43",
    "content": "```php\npublic function go() {\n    return $this->forward('App\\Ctrl::target', [\n        'id' => 100\n    ]);\n}\n```",
    "bugLine": 3,
    "bugMessage": "Forwarding parameters must match the target action arguments exactly."
  },
  {
    "id": "cr-controllers-bank-44",
    "title": "Controller Challenge: Forward Params #44",
    "content": "```php\npublic function go() {\n    return $this->forward('App\\Ctrl::target', [\n        'id' => 500\n    ]);\n}\n```",
    "bugLine": 3,
    "bugMessage": "Forwarding parameters must match the target action arguments exactly."
  },
  {
    "id": "cr-controllers-bank-45",
    "title": "Controller Challenge: Forward Params #45",
    "content": "```php\npublic function go() {\n    return $this->forward('App\\Ctrl::target', [\n        'id' => 999\n    ]);\n}\n```",
    "bugLine": 3,
    "bugMessage": "Forwarding parameters must match the target action arguments exactly."
  },
  {
    "id": "cr-controllers-bank-46",
    "title": "Controller Challenge: Abstract Access #46",
    "content": "```php\nclass Ctrl46 {\n    public function index() {\n        return $this->render('view.html.twig');\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Method render() is in AbstractController. This class needs to extend it or inject Twig."
  },
  {
    "id": "cr-controllers-bank-47",
    "title": "Controller Challenge: Abstract Access #47",
    "content": "```php\nclass Ctrl47 {\n    public function index() {\n        return $this->render('view.html.twig');\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Method render() is in AbstractController. This class needs to extend it or inject Twig."
  },
  {
    "id": "cr-controllers-bank-48",
    "title": "Controller Challenge: Abstract Access #48",
    "content": "```php\nclass Ctrl48 {\n    public function index() {\n        return $this->render('view.html.twig');\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Method render() is in AbstractController. This class needs to extend it or inject Twig."
  },
  {
    "id": "cr-controllers-bank-49",
    "title": "Controller Challenge: Abstract Access #49",
    "content": "```php\nclass Ctrl49 {\n    public function index() {\n        return $this->render('view.html.twig');\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Method render() is in AbstractController. This class needs to extend it or inject Twig."
  },
  {
    "id": "cr-controllers-bank-50",
    "title": "Controller Challenge: Abstract Access #50",
    "content": "```php\nclass Ctrl50 {\n    public function index() {\n        return $this->render('view.html.twig');\n    }\n}\n```",
    "bugLine": 3,
    "bugMessage": "Method render() is in AbstractController. This class needs to extend it or inject Twig."
  }
]
);