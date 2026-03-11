import json

templates = [
    {"desc": "Array Requirements", "code": "class Controller{i} {{\n    #[Route('/users', methods: '{method}')]\n    public function index() {{}}\n}}", "line": 2, "msg": "The 'methods' parameter requires an array, eg: ['{method}'].", "vars": [{"method": "GET"}, {"method": "POST"}, {"method": "PUT"}, {"method": "DELETE"}, {"method": "PATCH"}]},
    {"desc": "Priority Typing", "code": "class Controller{i} {{\n    #[Route('/users', priority: '{prio}')]\n    public function index() {{}}\n}}", "line": 2, "msg": "The 'priority' parameter must be a valid integer, not a string '{prio}'.", "vars": [{"prio": "10"}, {"prio": "50"}, {"prio": "-1"}, {"prio": "99"}, {"prio": "0"}]},
    {"desc": "Action Visibility", "code": "class Controller{i} {{\n    #[Route('/profile', name: 'profile_{i}')]\n    {vis} function show() {{}}\n}}", "line": 3, "msg": "Route actions must have 'public' visibility, not '{vis}'.", "vars": [{"vis": "private"}, {"vis": "protected"}, {"vis": "private static"}, {"vis": "protected final"}, {"vis": "private readonly"}]},
    {"desc": "Stateless Boolean", "code": "class Controller{i} {{\n    #[Route('/api', stateless: {val})]\n    public function api() {{}}\n}}", "line": 2, "msg": "'stateless' must be a boolean (true/false), not '{val}'.", "vars": [{"val": "'true'"}, {"val": "'false'"}, {"val": "1"}, {"val": "0"}, {"val": "'yes'"}]},
    {"desc": "Route Naming", "code": "class Controller{i} {{\n    #[Route('/path_{i}')]\n    public function act_{i}() {{}}\n}}", "line": 2, "msg": "Best practice: Always explicitly set the 'name' parameter for your routes.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "Attribute Import", "code": "use Symfony\\Component\\Routing\\Route;\n\nclass Controller{i} {{\n    #[Route('/path')]\n    public function act() {{}}\n}}", "line": 1, "msg": "Wrong import path. In Symfony 8, use `use Symfony\\Component\\Routing\\Attribute\\Route;`.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "Param Mismatch", "code": "class Controller{i} {{\n    #[Route('/post/{{id}}')]\n    public function show(int ${var}) {{}}\n}}", "line": 3, "msg": "The argument `${var}` does not match the defined route parameter `{{id}}`.", "vars": [{"var": "postId"}, {"var": "idx"}, {"var": "identifier"}, {"var": "post_id"}, {"var": "slug"}]},
    {"desc": "Requirement Syntax", "code": "class Controller{i} {{\n    #[Route('/post/{{id}}', requirements: ['id' => '{req}'])]\n    public function show(int $id) {{}}\n}}", "line": 2, "msg": "Regex shortcut requires valid formatting or double backslashes for `{req}`.", "vars": [{"req": "d+"}, {"req": "w+"}, {"req": "0-9+"}, {"req": "a-z+"}, {"req": "A-Z+"}]},
    {"desc": "Missing Defaults", "code": "class Controller{i} {{\n    #[Route('/page/{{page}}')]\n    public function show(int $page = {val}) {{}}\n}}", "line": 2, "msg": "If the argument has a default value ({val}), it should be defined in the route parameter like `{{page?{val}}}` or via the `defaults` array.", "vars": [{"val": "1"}, {"val": "10"}, {"val": "0"}, {"val": "5"}, {"val": "20"}]},
    {"desc": "Condition Syntax", "code": "class Controller{i} {{\n    #[Route('/admin', condition: '{cond}')]\n    public function admin() {{}}\n}}", "line": 2, "msg": "ExpressionLanguage syntax error. Should use `request.getMethod() == ...` or similar.", "vars": [{"cond": "$request->getMethod() == \\\"GET\\\""}, {"cond": "$_POST"}, {"cond": "$request->headers"}, {"cond": "$context->getHost()"}, {"cond": "$request->isXmlHttpRequest()"}]}
]

items = []
idx = 1
for t in templates:
    for v in t["vars"]:
        code = t["code"].format(i=idx, **v)
        msg = t["msg"].format(**v)
        items.append({
            "id": f"cr-routing-fw-{idx}",
            "title": f"{t['desc']} #{idx}",
            "content": f"```php\n{code}\n```",
            "bugLine": t["line"],
            "bugMessage": msg
        })
        idx += 1

js_code = "window.CodeReviewBank = window.CodeReviewBank || {};\nwindow.CodeReviewBank['routing'] = window.CodeReviewBank['routing'] || [];\nwindow.CodeReviewBank['routing'].push(...\\\n" + json.dumps(items, indent=2) + "\n);"

with open('assets/cr-routing-bank.js', 'w') as f:
    f.write(js_code)

print("Generated 50 Code Reviews successfully.")
