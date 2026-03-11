window.CodeReviewBank = window.CodeReviewBank || {};
window.CodeReviewBank['routing'] = window.CodeReviewBank['routing'] || [];
window.CodeReviewBank['routing'].push(...\
[
  {
    "id": "cr-routing-fw-1",
    "title": "Array Requirements #1",
    "content": "```php\nclass Controller1 {\n    #[Route('/users', methods: 'GET')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'methods' parameter requires an array, eg: ['GET']."
  },
  {
    "id": "cr-routing-fw-2",
    "title": "Array Requirements #2",
    "content": "```php\nclass Controller2 {\n    #[Route('/users', methods: 'POST')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'methods' parameter requires an array, eg: ['POST']."
  },
  {
    "id": "cr-routing-fw-3",
    "title": "Array Requirements #3",
    "content": "```php\nclass Controller3 {\n    #[Route('/users', methods: 'PUT')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'methods' parameter requires an array, eg: ['PUT']."
  },
  {
    "id": "cr-routing-fw-4",
    "title": "Array Requirements #4",
    "content": "```php\nclass Controller4 {\n    #[Route('/users', methods: 'DELETE')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'methods' parameter requires an array, eg: ['DELETE']."
  },
  {
    "id": "cr-routing-fw-5",
    "title": "Array Requirements #5",
    "content": "```php\nclass Controller5 {\n    #[Route('/users', methods: 'PATCH')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'methods' parameter requires an array, eg: ['PATCH']."
  },
  {
    "id": "cr-routing-fw-6",
    "title": "Priority Typing #6",
    "content": "```php\nclass Controller6 {\n    #[Route('/users', priority: '10')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'priority' parameter must be a valid integer, not a string '10'."
  },
  {
    "id": "cr-routing-fw-7",
    "title": "Priority Typing #7",
    "content": "```php\nclass Controller7 {\n    #[Route('/users', priority: '50')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'priority' parameter must be a valid integer, not a string '50'."
  },
  {
    "id": "cr-routing-fw-8",
    "title": "Priority Typing #8",
    "content": "```php\nclass Controller8 {\n    #[Route('/users', priority: '-1')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'priority' parameter must be a valid integer, not a string '-1'."
  },
  {
    "id": "cr-routing-fw-9",
    "title": "Priority Typing #9",
    "content": "```php\nclass Controller9 {\n    #[Route('/users', priority: '99')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'priority' parameter must be a valid integer, not a string '99'."
  },
  {
    "id": "cr-routing-fw-10",
    "title": "Priority Typing #10",
    "content": "```php\nclass Controller10 {\n    #[Route('/users', priority: '0')]\n    public function index() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "The 'priority' parameter must be a valid integer, not a string '0'."
  },
  {
    "id": "cr-routing-fw-11",
    "title": "Action Visibility #11",
    "content": "```php\nclass Controller11 {\n    #[Route('/profile', name: 'profile_11')]\n    private function show() {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions must have 'public' visibility, not 'private'."
  },
  {
    "id": "cr-routing-fw-12",
    "title": "Action Visibility #12",
    "content": "```php\nclass Controller12 {\n    #[Route('/profile', name: 'profile_12')]\n    protected function show() {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions must have 'public' visibility, not 'protected'."
  },
  {
    "id": "cr-routing-fw-13",
    "title": "Action Visibility #13",
    "content": "```php\nclass Controller13 {\n    #[Route('/profile', name: 'profile_13')]\n    private static function show() {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions must have 'public' visibility, not 'private static'."
  },
  {
    "id": "cr-routing-fw-14",
    "title": "Action Visibility #14",
    "content": "```php\nclass Controller14 {\n    #[Route('/profile', name: 'profile_14')]\n    protected final function show() {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions must have 'public' visibility, not 'protected final'."
  },
  {
    "id": "cr-routing-fw-15",
    "title": "Action Visibility #15",
    "content": "```php\nclass Controller15 {\n    #[Route('/profile', name: 'profile_15')]\n    private readonly function show() {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Route actions must have 'public' visibility, not 'private readonly'."
  },
  {
    "id": "cr-routing-fw-16",
    "title": "Stateless Boolean #16",
    "content": "```php\nclass Controller16 {\n    #[Route('/api', stateless: 'true')]\n    public function api() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "'stateless' must be a boolean (true/false), not ''true''."
  },
  {
    "id": "cr-routing-fw-17",
    "title": "Stateless Boolean #17",
    "content": "```php\nclass Controller17 {\n    #[Route('/api', stateless: 'false')]\n    public function api() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "'stateless' must be a boolean (true/false), not ''false''."
  },
  {
    "id": "cr-routing-fw-18",
    "title": "Stateless Boolean #18",
    "content": "```php\nclass Controller18 {\n    #[Route('/api', stateless: 1)]\n    public function api() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "'stateless' must be a boolean (true/false), not '1'."
  },
  {
    "id": "cr-routing-fw-19",
    "title": "Stateless Boolean #19",
    "content": "```php\nclass Controller19 {\n    #[Route('/api', stateless: 0)]\n    public function api() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "'stateless' must be a boolean (true/false), not '0'."
  },
  {
    "id": "cr-routing-fw-20",
    "title": "Stateless Boolean #20",
    "content": "```php\nclass Controller20 {\n    #[Route('/api', stateless: 'yes')]\n    public function api() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "'stateless' must be a boolean (true/false), not ''yes''."
  },
  {
    "id": "cr-routing-fw-21",
    "title": "Route Naming #21",
    "content": "```php\nclass Controller21 {\n    #[Route('/path_21')]\n    public function act_21() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Best practice: Always explicitly set the 'name' parameter for your routes."
  },
  {
    "id": "cr-routing-fw-22",
    "title": "Route Naming #22",
    "content": "```php\nclass Controller22 {\n    #[Route('/path_22')]\n    public function act_22() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Best practice: Always explicitly set the 'name' parameter for your routes."
  },
  {
    "id": "cr-routing-fw-23",
    "title": "Route Naming #23",
    "content": "```php\nclass Controller23 {\n    #[Route('/path_23')]\n    public function act_23() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Best practice: Always explicitly set the 'name' parameter for your routes."
  },
  {
    "id": "cr-routing-fw-24",
    "title": "Route Naming #24",
    "content": "```php\nclass Controller24 {\n    #[Route('/path_24')]\n    public function act_24() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Best practice: Always explicitly set the 'name' parameter for your routes."
  },
  {
    "id": "cr-routing-fw-25",
    "title": "Route Naming #25",
    "content": "```php\nclass Controller25 {\n    #[Route('/path_25')]\n    public function act_25() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Best practice: Always explicitly set the 'name' parameter for your routes."
  },
  {
    "id": "cr-routing-fw-26",
    "title": "Attribute Import #26",
    "content": "```php\nuse Symfony\\Component\\Routing\\Route;\n\nclass Controller26 {\n    #[Route('/path')]\n    public function act() {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong import path. In Symfony 8, use `use Symfony\\Component\\Routing\\Attribute\\Route;`."
  },
  {
    "id": "cr-routing-fw-27",
    "title": "Attribute Import #27",
    "content": "```php\nuse Symfony\\Component\\Routing\\Route;\n\nclass Controller27 {\n    #[Route('/path')]\n    public function act() {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong import path. In Symfony 8, use `use Symfony\\Component\\Routing\\Attribute\\Route;`."
  },
  {
    "id": "cr-routing-fw-28",
    "title": "Attribute Import #28",
    "content": "```php\nuse Symfony\\Component\\Routing\\Route;\n\nclass Controller28 {\n    #[Route('/path')]\n    public function act() {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong import path. In Symfony 8, use `use Symfony\\Component\\Routing\\Attribute\\Route;`."
  },
  {
    "id": "cr-routing-fw-29",
    "title": "Attribute Import #29",
    "content": "```php\nuse Symfony\\Component\\Routing\\Route;\n\nclass Controller29 {\n    #[Route('/path')]\n    public function act() {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong import path. In Symfony 8, use `use Symfony\\Component\\Routing\\Attribute\\Route;`."
  },
  {
    "id": "cr-routing-fw-30",
    "title": "Attribute Import #30",
    "content": "```php\nuse Symfony\\Component\\Routing\\Route;\n\nclass Controller30 {\n    #[Route('/path')]\n    public function act() {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong import path. In Symfony 8, use `use Symfony\\Component\\Routing\\Attribute\\Route;`."
  },
  {
    "id": "cr-routing-fw-31",
    "title": "Param Mismatch #31",
    "content": "```php\nclass Controller31 {\n    #[Route('/post/{id}')]\n    public function show(int $postId) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "The argument `$postId` does not match the defined route parameter `{id}`."
  },
  {
    "id": "cr-routing-fw-32",
    "title": "Param Mismatch #32",
    "content": "```php\nclass Controller32 {\n    #[Route('/post/{id}')]\n    public function show(int $idx) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "The argument `$idx` does not match the defined route parameter `{id}`."
  },
  {
    "id": "cr-routing-fw-33",
    "title": "Param Mismatch #33",
    "content": "```php\nclass Controller33 {\n    #[Route('/post/{id}')]\n    public function show(int $identifier) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "The argument `$identifier` does not match the defined route parameter `{id}`."
  },
  {
    "id": "cr-routing-fw-34",
    "title": "Param Mismatch #34",
    "content": "```php\nclass Controller34 {\n    #[Route('/post/{id}')]\n    public function show(int $post_id) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "The argument `$post_id` does not match the defined route parameter `{id}`."
  },
  {
    "id": "cr-routing-fw-35",
    "title": "Param Mismatch #35",
    "content": "```php\nclass Controller35 {\n    #[Route('/post/{id}')]\n    public function show(int $slug) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "The argument `$slug` does not match the defined route parameter `{id}`."
  },
  {
    "id": "cr-routing-fw-36",
    "title": "Requirement Syntax #36",
    "content": "```php\nclass Controller36 {\n    #[Route('/post/{id}', requirements: ['id' => 'd+'])]\n    public function show(int $id) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Regex shortcut requires valid formatting or double backslashes for `d+`."
  },
  {
    "id": "cr-routing-fw-37",
    "title": "Requirement Syntax #37",
    "content": "```php\nclass Controller37 {\n    #[Route('/post/{id}', requirements: ['id' => 'w+'])]\n    public function show(int $id) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Regex shortcut requires valid formatting or double backslashes for `w+`."
  },
  {
    "id": "cr-routing-fw-38",
    "title": "Requirement Syntax #38",
    "content": "```php\nclass Controller38 {\n    #[Route('/post/{id}', requirements: ['id' => '0-9+'])]\n    public function show(int $id) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Regex shortcut requires valid formatting or double backslashes for `0-9+`."
  },
  {
    "id": "cr-routing-fw-39",
    "title": "Requirement Syntax #39",
    "content": "```php\nclass Controller39 {\n    #[Route('/post/{id}', requirements: ['id' => 'a-z+'])]\n    public function show(int $id) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Regex shortcut requires valid formatting or double backslashes for `a-z+`."
  },
  {
    "id": "cr-routing-fw-40",
    "title": "Requirement Syntax #40",
    "content": "```php\nclass Controller40 {\n    #[Route('/post/{id}', requirements: ['id' => 'A-Z+'])]\n    public function show(int $id) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Regex shortcut requires valid formatting or double backslashes for `A-Z+`."
  },
  {
    "id": "cr-routing-fw-41",
    "title": "Missing Defaults #41",
    "content": "```php\nclass Controller41 {\n    #[Route('/page/{page}')]\n    public function show(int $page = 1) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "If the argument has a default value (1), it should be defined in the route parameter like `{page?1}` or via the `defaults` array."
  },
  {
    "id": "cr-routing-fw-42",
    "title": "Missing Defaults #42",
    "content": "```php\nclass Controller42 {\n    #[Route('/page/{page}')]\n    public function show(int $page = 10) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "If the argument has a default value (10), it should be defined in the route parameter like `{page?10}` or via the `defaults` array."
  },
  {
    "id": "cr-routing-fw-43",
    "title": "Missing Defaults #43",
    "content": "```php\nclass Controller43 {\n    #[Route('/page/{page}')]\n    public function show(int $page = 0) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "If the argument has a default value (0), it should be defined in the route parameter like `{page?0}` or via the `defaults` array."
  },
  {
    "id": "cr-routing-fw-44",
    "title": "Missing Defaults #44",
    "content": "```php\nclass Controller44 {\n    #[Route('/page/{page}')]\n    public function show(int $page = 5) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "If the argument has a default value (5), it should be defined in the route parameter like `{page?5}` or via the `defaults` array."
  },
  {
    "id": "cr-routing-fw-45",
    "title": "Missing Defaults #45",
    "content": "```php\nclass Controller45 {\n    #[Route('/page/{page}')]\n    public function show(int $page = 20) {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "If the argument has a default value (20), it should be defined in the route parameter like `{page?20}` or via the `defaults` array."
  },
  {
    "id": "cr-routing-fw-46",
    "title": "Condition Syntax #46",
    "content": "```php\nclass Controller46 {\n    #[Route('/admin', condition: '$request->getMethod() == \\\"GET\\\"')]\n    public function admin() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "ExpressionLanguage syntax error. Should use `request.getMethod() == ...` or similar."
  },
  {
    "id": "cr-routing-fw-47",
    "title": "Condition Syntax #47",
    "content": "```php\nclass Controller47 {\n    #[Route('/admin', condition: '$_POST')]\n    public function admin() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "ExpressionLanguage syntax error. Should use `request.getMethod() == ...` or similar."
  },
  {
    "id": "cr-routing-fw-48",
    "title": "Condition Syntax #48",
    "content": "```php\nclass Controller48 {\n    #[Route('/admin', condition: '$request->headers')]\n    public function admin() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "ExpressionLanguage syntax error. Should use `request.getMethod() == ...` or similar."
  },
  {
    "id": "cr-routing-fw-49",
    "title": "Condition Syntax #49",
    "content": "```php\nclass Controller49 {\n    #[Route('/admin', condition: '$context->getHost()')]\n    public function admin() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "ExpressionLanguage syntax error. Should use `request.getMethod() == ...` or similar."
  },
  {
    "id": "cr-routing-fw-50",
    "title": "Condition Syntax #50",
    "content": "```php\nclass Controller50 {\n    #[Route('/admin', condition: '$request->isXmlHttpRequest()')]\n    public function admin() {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "ExpressionLanguage syntax error. Should use `request.getMethod() == ...` or similar."
  }
]
);