window.CodeReviewBank = window.CodeReviewBank || {};
window.CodeReviewBank['dependency-injection'] = window.CodeReviewBank['dependency-injection'] || [];
window.CodeReviewBank['dependency-injection'].push(...\
[
  {
    "id": "cr-di-bank-1",
    "title": "DI Challenge: Missing Parameter % #1",
    "content": "```php\nclass Service1 {\n    public function __construct(\n        #[Autowire(param: 'kernel.project_dir')]\n        private string $dir\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Parameters in #[Autowire] must be wrapped in % signs: '%kernel.project_dir%'."
  },
  {
    "id": "cr-di-bank-2",
    "title": "DI Challenge: Missing Parameter % #2",
    "content": "```php\nclass Service2 {\n    public function __construct(\n        #[Autowire(param: 'kernel.cache_dir')]\n        private string $dir\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Parameters in #[Autowire] must be wrapped in % signs: '%kernel.cache_dir%'."
  },
  {
    "id": "cr-di-bank-3",
    "title": "DI Challenge: Missing Parameter % #3",
    "content": "```php\nclass Service3 {\n    public function __construct(\n        #[Autowire(param: 'app.version')]\n        private string $dir\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Parameters in #[Autowire] must be wrapped in % signs: '%app.version%'."
  },
  {
    "id": "cr-di-bank-4",
    "title": "DI Challenge: Missing Parameter % #4",
    "content": "```php\nclass Service4 {\n    public function __construct(\n        #[Autowire(param: 'database.host')]\n        private string $dir\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Parameters in #[Autowire] must be wrapped in % signs: '%database.host%'."
  },
  {
    "id": "cr-di-bank-5",
    "title": "DI Challenge: Missing Parameter % #5",
    "content": "```php\nclass Service5 {\n    public function __construct(\n        #[Autowire(param: 'mailer.dsn')]\n        private string $dir\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Parameters in #[Autowire] must be wrapped in % signs: '%mailer.dsn%'."
  },
  {
    "id": "cr-di-bank-6",
    "title": "DI Challenge: Property Promotion #6",
    "content": "```php\nclass Service6 {\n    public function __construct(\n        LoggerInterface $logger\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Missing visibility (private/protected/public) for constructor property promotion."
  },
  {
    "id": "cr-di-bank-7",
    "title": "DI Challenge: Property Promotion #7",
    "content": "```php\nclass Service7 {\n    public function __construct(\n        EntityManagerInterface $logger\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Missing visibility (private/protected/public) for constructor property promotion."
  },
  {
    "id": "cr-di-bank-8",
    "title": "DI Challenge: Property Promotion #8",
    "content": "```php\nclass Service8 {\n    public function __construct(\n        RouterInterface $logger\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Missing visibility (private/protected/public) for constructor property promotion."
  },
  {
    "id": "cr-di-bank-9",
    "title": "DI Challenge: Property Promotion #9",
    "content": "```php\nclass Service9 {\n    public function __construct(\n        EventDispatcherInterface $logger\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Missing visibility (private/protected/public) for constructor property promotion."
  },
  {
    "id": "cr-di-bank-10",
    "title": "DI Challenge: Property Promotion #10",
    "content": "```php\nclass Service10 {\n    public function __construct(\n        Security $logger\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Missing visibility (private/protected/public) for constructor property promotion."
  },
  {
    "id": "cr-di-bank-11",
    "title": "DI Challenge: Ambiguous Autowire #11",
    "content": "```php\nclass Service11 {\n    public function __construct(\n        private PaymentInterface $processor\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ambiguous service! Multiple implementations found for PaymentInterface. Use #[Autowire(service: '...')] to disambiguate."
  },
  {
    "id": "cr-di-bank-12",
    "title": "DI Challenge: Ambiguous Autowire #12",
    "content": "```php\nclass Service12 {\n    public function __construct(\n        private SmsSenderInterface $processor\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ambiguous service! Multiple implementations found for SmsSenderInterface. Use #[Autowire(service: '...')] to disambiguate."
  },
  {
    "id": "cr-di-bank-13",
    "title": "DI Challenge: Ambiguous Autowire #13",
    "content": "```php\nclass Service13 {\n    public function __construct(\n        private FileUploaderInterface $processor\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ambiguous service! Multiple implementations found for FileUploaderInterface. Use #[Autowire(service: '...')] to disambiguate."
  },
  {
    "id": "cr-di-bank-14",
    "title": "DI Challenge: Ambiguous Autowire #14",
    "content": "```php\nclass Service14 {\n    public function __construct(\n        private ImageOptimizerInterface $processor\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ambiguous service! Multiple implementations found for ImageOptimizerInterface. Use #[Autowire(service: '...')] to disambiguate."
  },
  {
    "id": "cr-di-bank-15",
    "title": "DI Challenge: Ambiguous Autowire #15",
    "content": "```php\nclass Service15 {\n    public function __construct(\n        private ExportHandlerInterface $processor\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Ambiguous service! Multiple implementations found for ExportHandlerInterface. Use #[Autowire(service: '...')] to disambiguate."
  },
  {
    "id": "cr-di-bank-16",
    "title": "DI Challenge: Wrong Autowire Key #16",
    "content": "```php\nclass Service16 {\n    public function __construct(\n        #[Autowire(id: 'app.service')]\n        private string $data\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Invalid key 'id'. Use 'service' for IDs or 'param' for parameters."
  },
  {
    "id": "cr-di-bank-17",
    "title": "DI Challenge: Wrong Autowire Key #17",
    "content": "```php\nclass Service17 {\n    public function __construct(\n        #[Autowire(name: 'kernel.env')]\n        private string $data\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Invalid key 'name'. Use 'service' for IDs or 'param' for parameters."
  },
  {
    "id": "cr-di-bank-18",
    "title": "DI Challenge: Wrong Autowire Key #18",
    "content": "```php\nclass Service18 {\n    public function __construct(\n        #[Autowire(parameter: 'debug')]\n        private string $data\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Invalid key 'parameter'. Use 'service' for IDs or 'param' for parameters."
  },
  {
    "id": "cr-di-bank-19",
    "title": "DI Challenge: Wrong Autowire Key #19",
    "content": "```php\nclass Service19 {\n    public function __construct(\n        #[Autowire(ref: 'my_service')]\n        private string $data\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Invalid key 'ref'. Use 'service' for IDs or 'param' for parameters."
  },
  {
    "id": "cr-di-bank-20",
    "title": "DI Challenge: Wrong Autowire Key #20",
    "content": "```php\nclass Service20 {\n    public function __construct(\n        #[Autowire(inject: 'data')]\n        private string $data\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Invalid key 'inject'. Use 'service' for IDs or 'param' for parameters."
  },
  {
    "id": "cr-di-bank-21",
    "title": "DI Challenge: Constructor Visibility #21",
    "content": "```php\nclass Service21 {\n    private function __construct(private LoggerInterface $logger)\n    {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Service constructors must be 'public' for the container to instantiate them."
  },
  {
    "id": "cr-di-bank-22",
    "title": "DI Challenge: Constructor Visibility #22",
    "content": "```php\nclass Service22 {\n    protected function __construct(private LoggerInterface $logger)\n    {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Service constructors must be 'public' for the container to instantiate them."
  },
  {
    "id": "cr-di-bank-23",
    "title": "DI Challenge: Constructor Visibility #23",
    "content": "```php\nclass Service23 {\n    private static function __construct(private LoggerInterface $logger)\n    {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Service constructors must be 'public' for the container to instantiate them."
  },
  {
    "id": "cr-di-bank-24",
    "title": "DI Challenge: Constructor Visibility #24",
    "content": "```php\nclass Service24 {\n    protected final function __construct(private LoggerInterface $logger)\n    {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Service constructors must be 'public' for the container to instantiate them."
  },
  {
    "id": "cr-di-bank-25",
    "title": "DI Challenge: Constructor Visibility #25",
    "content": "```php\nclass Service25 {\n    private readonly function __construct(private LoggerInterface $logger)\n    {}\n}\n```",
    "bugLine": 2,
    "bugMessage": "Service constructors must be 'public' for the container to instantiate them."
  },
  {
    "id": "cr-di-bank-26",
    "title": "DI Challenge: Attribute Import #26",
    "content": "```php\nuse Symfony\\Component\\DependencyInjection\\Attribute\\AutowireService;\n\nclass Service26 {\n    #[AutowireService('app.service')]\n    public function __construct($s) {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong attribute name. In Symfony 8, use `use Symfony\\Component\\DependencyInjection\\Attribute\\Autowire;`."
  },
  {
    "id": "cr-di-bank-27",
    "title": "DI Challenge: Attribute Import #27",
    "content": "```php\nuse Symfony\\Component\\DependencyInjection\\Attribute\\AutowireService;\n\nclass Service27 {\n    #[AutowireService('app.service')]\n    public function __construct($s) {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong attribute name. In Symfony 8, use `use Symfony\\Component\\DependencyInjection\\Attribute\\Autowire;`."
  },
  {
    "id": "cr-di-bank-28",
    "title": "DI Challenge: Attribute Import #28",
    "content": "```php\nuse Symfony\\Component\\DependencyInjection\\Attribute\\AutowireService;\n\nclass Service28 {\n    #[AutowireService('app.service')]\n    public function __construct($s) {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong attribute name. In Symfony 8, use `use Symfony\\Component\\DependencyInjection\\Attribute\\Autowire;`."
  },
  {
    "id": "cr-di-bank-29",
    "title": "DI Challenge: Attribute Import #29",
    "content": "```php\nuse Symfony\\Component\\DependencyInjection\\Attribute\\AutowireService;\n\nclass Service29 {\n    #[AutowireService('app.service')]\n    public function __construct($s) {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong attribute name. In Symfony 8, use `use Symfony\\Component\\DependencyInjection\\Attribute\\Autowire;`."
  },
  {
    "id": "cr-di-bank-30",
    "title": "DI Challenge: Attribute Import #30",
    "content": "```php\nuse Symfony\\Component\\DependencyInjection\\Attribute\\AutowireService;\n\nclass Service30 {\n    #[AutowireService('app.service')]\n    public function __construct($s) {}\n}\n```",
    "bugLine": 1,
    "bugMessage": "Wrong attribute name. In Symfony 8, use `use Symfony\\Component\\DependencyInjection\\Attribute\\Autowire;`."
  },
  {
    "id": "cr-di-bank-31",
    "title": "DI Challenge: Decoration Syntax #31",
    "content": "```php\nclass Decorator31 implements ServiceInterface {\n    public function __construct(\n        private ServiceInterface $inner\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "In decoration, the inner service argument name should typically be `$decorationInner` or be explicitly matched in services.yaml."
  },
  {
    "id": "cr-di-bank-32",
    "title": "DI Challenge: Decoration Syntax #32",
    "content": "```php\nclass Decorator32 implements ServiceInterface {\n    public function __construct(\n        private ServiceInterface $inner\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "In decoration, the inner service argument name should typically be `$decorationInner` or be explicitly matched in services.yaml."
  },
  {
    "id": "cr-di-bank-33",
    "title": "DI Challenge: Decoration Syntax #33",
    "content": "```php\nclass Decorator33 implements ServiceInterface {\n    public function __construct(\n        private ServiceInterface $inner\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "In decoration, the inner service argument name should typically be `$decorationInner` or be explicitly matched in services.yaml."
  },
  {
    "id": "cr-di-bank-34",
    "title": "DI Challenge: Decoration Syntax #34",
    "content": "```php\nclass Decorator34 implements ServiceInterface {\n    public function __construct(\n        private ServiceInterface $inner\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "In decoration, the inner service argument name should typically be `$decorationInner` or be explicitly matched in services.yaml."
  },
  {
    "id": "cr-di-bank-35",
    "title": "DI Challenge: Decoration Syntax #35",
    "content": "```php\nclass Decorator35 implements ServiceInterface {\n    public function __construct(\n        private ServiceInterface $inner\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "In decoration, the inner service argument name should typically be `$decorationInner` or be explicitly matched in services.yaml."
  },
  {
    "id": "cr-di-bank-36",
    "title": "DI Challenge: Env Var Syntax #36",
    "content": "```php\nclass Service36 {\n    public function __construct(\n        #[Autowire(env: '$APP_ENV')]\n        private string $key\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Env variables in #[Autowire] should be strings like 'APP_SECRET', no extra syntax needed."
  },
  {
    "id": "cr-di-bank-37",
    "title": "DI Challenge: Env Var Syntax #37",
    "content": "```php\nclass Service37 {\n    public function __construct(\n        #[Autowire(env: '%APP_ENV%')]\n        private string $key\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Env variables in #[Autowire] should be strings like 'APP_SECRET', no extra syntax needed."
  },
  {
    "id": "cr-di-bank-38",
    "title": "DI Challenge: Env Var Syntax #38",
    "content": "```php\nclass Service38 {\n    public function __construct(\n        #[Autowire(env: '{{APP_ENV}}')]\n        private string $key\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Env variables in #[Autowire] should be strings like 'APP_SECRET', no extra syntax needed."
  },
  {
    "id": "cr-di-bank-39",
    "title": "DI Challenge: Env Var Syntax #39",
    "content": "```php\nclass Service39 {\n    public function __construct(\n        #[Autowire(env: 'env(APP_ENV)')]\n        private string $key\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Env variables in #[Autowire] should be strings like 'APP_SECRET', no extra syntax needed."
  },
  {
    "id": "cr-di-bank-40",
    "title": "DI Challenge: Env Var Syntax #40",
    "content": "```php\nclass Service40 {\n    public function __construct(\n        #[Autowire(env: 'getenv('APP_ENV')')]\n        private string $key\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Env variables in #[Autowire] should be strings like 'APP_SECRET', no extra syntax needed."
  },
  {
    "id": "cr-di-bank-41",
    "title": "DI Challenge: Static Factory #41",
    "content": "```php\nclass Factory41 {\n    public function createService(): MyService\n    {\n        return new MyService();\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Factory methods defined in services.yaml as static must have the 'static' keyword in PHP."
  },
  {
    "id": "cr-di-bank-42",
    "title": "DI Challenge: Static Factory #42",
    "content": "```php\nclass Factory42 {\n    public function createService(): MyService\n    {\n        return new MyService();\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Factory methods defined in services.yaml as static must have the 'static' keyword in PHP."
  },
  {
    "id": "cr-di-bank-43",
    "title": "DI Challenge: Static Factory #43",
    "content": "```php\nclass Factory43 {\n    public function createService(): MyService\n    {\n        return new MyService();\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Factory methods defined in services.yaml as static must have the 'static' keyword in PHP."
  },
  {
    "id": "cr-di-bank-44",
    "title": "DI Challenge: Static Factory #44",
    "content": "```php\nclass Factory44 {\n    public function createService(): MyService\n    {\n        return new MyService();\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Factory methods defined in services.yaml as static must have the 'static' keyword in PHP."
  },
  {
    "id": "cr-di-bank-45",
    "title": "DI Challenge: Static Factory #45",
    "content": "```php\nclass Factory45 {\n    public function createService(): MyService\n    {\n        return new MyService();\n    }\n}\n```",
    "bugLine": 2,
    "bugMessage": "Factory methods defined in services.yaml as static must have the 'static' keyword in PHP."
  },
  {
    "id": "cr-di-bank-46",
    "title": "DI Challenge: Interface Type Hint #46",
    "content": "```php\nclass Service46 {\n    public function __construct(\n        private AppService $dep\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Best practice: Always type-hint an Interface instead of a concrete class (AppService) to allow for easier testing and decoration."
  },
  {
    "id": "cr-di-bank-47",
    "title": "DI Challenge: Interface Type Hint #47",
    "content": "```php\nclass Service47 {\n    public function __construct(\n        private UserRepository $dep\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Best practice: Always type-hint an Interface instead of a concrete class (UserRepository) to allow for easier testing and decoration."
  },
  {
    "id": "cr-di-bank-48",
    "title": "DI Challenge: Interface Type Hint #48",
    "content": "```php\nclass Service48 {\n    public function __construct(\n        private FileLogger $dep\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Best practice: Always type-hint an Interface instead of a concrete class (FileLogger) to allow for easier testing and decoration."
  },
  {
    "id": "cr-di-bank-49",
    "title": "DI Challenge: Interface Type Hint #49",
    "content": "```php\nclass Service49 {\n    public function __construct(\n        private StripePayment $dep\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Best practice: Always type-hint an Interface instead of a concrete class (StripePayment) to allow for easier testing and decoration."
  },
  {
    "id": "cr-di-bank-50",
    "title": "DI Challenge: Interface Type Hint #50",
    "content": "```php\nclass Service50 {\n    public function __construct(\n        private AwsS3Uploader $dep\n    ) {}\n}\n```",
    "bugLine": 3,
    "bugMessage": "Best practice: Always type-hint an Interface instead of a concrete class (AwsS3Uploader) to allow for easier testing and decoration."
  }
]
);