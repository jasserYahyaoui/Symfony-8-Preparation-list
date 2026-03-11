import json

templates = [
    {"desc": "Missing Parameter %", "code": "class Service{i} {{\n    public function __construct(\n        #[Autowire(param: '{param}')]\n        private string $dir\n    ) {{}}\n}}", "line": 3, "msg": "Parameters in #[Autowire] must be wrapped in % signs: '%{param}%'.", "vars": [{"param": "kernel.project_dir"}, {"param": "kernel.cache_dir"}, {"param": "app.version"}, {"param": "database.host"}, {"param": "mailer.dsn"}]},
    {"desc": "Property Promotion", "code": "class Service{i} {{\n    public function __construct(\n        {type} $logger\n    ) {{}}\n}}", "line": 3, "msg": "Missing visibility (private/protected/public) for constructor property promotion.", "vars": [{"type": "LoggerInterface"}, {"type": "EntityManagerInterface"}, {"type": "RouterInterface"}, {"type": "EventDispatcherInterface"}, {"type": "Security"}]},
    {"desc": "Ambiguous Autowire", "code": "class Service{i} {{\n    public function __construct(\n        private {interface} $processor\n    ) {{}}\n}}", "line": 3, "msg": "Ambiguous service! Multiple implementations found for {interface}. Use #[Autowire(service: '...')] to disambiguate.", "vars": [{"interface": "PaymentInterface"}, {"interface": "SmsSenderInterface"}, {"interface": "FileUploaderInterface"}, {"interface": "ImageOptimizerInterface"}, {"interface": "ExportHandlerInterface"}]},
    {"desc": "Wrong Autowire Key", "code": "class Service{i} {{\n    public function __construct(\n        #[Autowire({key}: '{val}')]\n        private string $data\n    ) {{}}\n}}", "line": 3, "msg": "Invalid key '{key}'. Use 'service' for IDs or 'param' for parameters.", "vars": [{"key": "id", "val": "app.service"}, {"key": "name", "val": "kernel.env"}, {"key": "parameter", "val": "debug"}, {"key": "ref", "val": "my_service"}, {"key": "inject", "val": "data"}]},
    {"desc": "Constructor Visibility", "code": "class Service{i} {{\n    {vis} function __construct(private LoggerInterface $logger)\n    {{}}\n}}", "line": 2, "msg": "Service constructors must be 'public' for the container to instantiate them.", "vars": [{"vis": "private"}, {"vis": "protected"}, {"vis": "private static"}, {"vis": "protected final"}, {"vis": "private readonly"}]},
    {"desc": "Attribute Import", "code": "use Symfony\\Component\\DependencyInjection\\Attribute\\AutowireService;\n\nclass Service{i} {{\n    #[AutowireService('app.service')]\n    public function __construct($s) {{}}\n}}", "line": 1, "msg": "Wrong attribute name. In Symfony 8, use `use Symfony\\Component\\DependencyInjection\\Attribute\\Autowire;`.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "Decoration Syntax", "code": "class Decorator{i} implements ServiceInterface {{\n    public function __construct(\n        private ServiceInterface $inner\n    ) {{}}\n}}", "line": 3, "msg": "In decoration, the inner service argument name should typically be `$decorationInner` or be explicitly matched in services.yaml.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "Env Var Syntax", "code": "class Service{i} {{\n    public function __construct(\n        #[Autowire(env: '{env}')]\n        private string $key\n    ) {{}}\n}}", "line": 3, "msg": "Env variables in #[Autowire] should be strings like 'APP_SECRET', no extra syntax needed.", "vars": [{"env": "$APP_ENV"}, {"env": "%APP_ENV%"}, {"env": "{{APP_ENV}}"}, {"env": "env(APP_ENV)"}, {"env": "getenv('APP_ENV')"}]},
    {"desc": "Static Factory", "code": "class Factory{i} {{\n    public function createService(): MyService\n    {{\n        return new MyService();\n    }}\n}}", "line": 2, "msg": "Factory methods defined in services.yaml as static must have the 'static' keyword in PHP.", "vars": [{}, {}, {}, {}, {}]},
    {"desc": "Interface Type Hint", "code": "class Service{i} {{\n    public function __construct(\n        private {type} $dep\n    ) {{}}\n}}", "line": 3, "msg": "Best practice: Always type-hint an Interface instead of a concrete class ({type}) to allow for easier testing and decoration.", "vars": [{"type": "AppService"}, {"type": "UserRepository"}, {"type": "FileLogger"}, {"type": "StripePayment"}, {"type": "AwsS3Uploader"}]}
]

items = []
idx = 1
for t in templates:
    for v in t["vars"]:
        code = t["code"].format(i=idx, **v)
        msg = t["msg"].format(**v)
        items.append({
            "id": f"cr-di-bank-{idx}",
            "title": f"DI Challenge: {t['desc']} #{idx}",
            "content": f"```php\n{code}\n```",
            "bugLine": t["line"],
            "bugMessage": msg
        })
        idx += 1

js_code = "window.CodeReviewBank = window.CodeReviewBank || {};\nwindow.CodeReviewBank['dependency-injection'] = window.CodeReviewBank['dependency-injection'] || [];\nwindow.CodeReviewBank['dependency-injection'].push(...\\\n" + json.dumps(items, indent=2) + "\n);"

with open('assets/cr-di-bank.js', 'w') as f:
    f.write(js_code)

print("Generated 50 DI Code Reviews successfully.")
