import json

templates = [
    {"desc": "Legacy Request", "code": "class Ctrl{i} extends AbstractController {{\n    public function index() {{\n        $req = $this->getRequest();\n    }}\n}}", "line": 3, "msg": "$this->getRequest() was removed. Inject 'Request $request' in the method instead.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "Return Type", "code": "class Ctrl{i} extends AbstractController {{\n    public function index(): {type}\n    {{\n        return $this->render('...');\n    }}\n}}", "line": 2, "msg": "Controller actions should return a 'Response' object (or null/void if async/special), not '{type}'.", "vars": [{"type": "string"}, {"type": "array"}, {"type": "int"}, {"type": "bool"}, {"type": "object"}]},
    {"desc": "Redirect Syntax", "code": "class Ctrl{i} extends AbstractController {{\n    public function go() {{\n        return $this->redirect('{url}', {code});\n    }}\n}}", "line": 3, "msg": "Check status code! {code} is for {msg_type}.", "vars": [{"url": "/home", "code": "200", "msg_type": "OK (use 302 for redirect)"}, {"url": "/login", "code": "404", "msg_type": "Not Found"}, {"url": "/old", "code": "500", "msg_type": "Server Error"}, {"url": "/new", "code": "201", "msg_type": "Created"}, {"url": "/", "code": "403", "msg_type": "Forbidden"}]},
    {"desc": "Flash Array", "code": "class Ctrl{i} {{\n    public function save() {{\n        $this->addFlash('info', ['msg' => '{msg}']);\n    }}\n}}", "line": 3, "msg": "Flash messages are typically strings. Storing raw arrays like {msg} can cause issues in Twig templates.", "vars": [{"msg": "data"}, {"msg": "error"}, {"msg": "ok"}, {"msg": "saved"}, {"msg": "deleted"}]},
    {"desc": "File Upload Check", "code": "public function upload(Request $request) {{\n    $file = $request->files->get('doc');\n    if ($file) {{ $file->move('{path}'); }}\n}}", "line": 3, "msg": "Security: Always verify $file is an instance of UploadedFile before calling move().", "vars": [{"path": "/tmp"}, {"path": "./uploads"}, {"path": "var/data"}, {"path": "/var/www/html"}, {"path": "public/files"}]},
    {"desc": "Session Access", "code": "public function index(Request $request) {{\n    $session = $request->getSession();\n    $session->set('key', 'val');\n}}", "line": 3, "msg": "Ensure the request has a session (hasSession()) before calling getSession() to avoid exceptions.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "Route Attribute", "code": "class Ctrl{i} {{\n    #[Route('/api', name: 'api_{i}')]\n    protected function api() {{ }}\n}}", "line": 3, "msg": "Route actions MUST be public. 'protected' methods cannot be accessed by the Router.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "JSON Array", "code": "public function api() {{\n    return $this->json('{data}');\n}}", "line": 2, "msg": "$this->json() expects an array or object as first argument, not a string '{data}'.", "vars": [{"data": "success"}, {"data": "{\"id\":1}"}, {"data": "ok"}, {"data": "error"}, {"data": "done"}]},
    {"desc": "Forward Params", "code": "public function go() {{\n    return $this->forward('App\\Ctrl::target', [\n        'id' => {val}\n    ]);\n}}", "line": 3, "msg": "Forwarding parameters must match the target action arguments exactly.", "vars": [{"val": "1"}, {"val": "10"}, {"val": "100"}, {"val": "500"}, {"val": "999"}]},
    {"desc": "Abstract Access", "code": "class Ctrl{i} {{\n    public function index() {{\n        return $this->render('view.html.twig');\n    }}\n}}", "line": 3, "msg": "Method render() is in AbstractController. This class needs to extend it or inject Twig.", "vars": [{}, {}, {}, {}, {}]}
]

items = []
idx = 1
for t in templates:
    for v in t["vars"]:
        code = t["code"].format(i=idx, **v)
        msg = t["msg"].format(**v)
        items.append({
            "id": f"cr-controllers-bank-{idx}",
            "title": f"Controller Challenge: {t['desc']} #{idx}",
            "content": f"```php\n{code}\n```",
            "bugLine": t["line"],
            "bugMessage": msg
        })
        idx += 1

js_code = "window.CodeReviewBank = window.CodeReviewBank || {};\nwindow.CodeReviewBank['controllers'] = window.CodeReviewBank['controllers'] || [];\nwindow.CodeReviewBank['controllers'].push(...\\\n" + json.dumps(items, indent=2) + "\n);"

with open('assets/cr-controllers-bank.js', 'w') as f:
    f.write(js_code)

print("Generated 50 Controller Code Reviews successfully.")
