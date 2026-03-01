## CATEGORY 1: "Internal Trace" (Execution order & Priorities)

Q: At which priority does a compiler pass execute by default if not specified in "addCompilerPass()"?
A: 0

Q: In "PassConfig", which constant represents the first pass type executed during compilation?
A: PassConfig::TYPE_BEFORE_OPTIMIZATION

Q: If two passes are added to "PassConfig::TYPE_AFTER_REMOVING" with priorities 10 and 30, which one executes first?
A: The pass with priority 30.

Q: True or False: "PassConfig::TYPE_REMOVE" passes execute before "PassConfig::TYPE_OPTIMIZE".
A: False. Optimization passes run before removal passes.

Q: Which internal Symfony class is responsible for managing the execution order of all Compiler Passes?
A: Symfony\Component\DependencyInjection\Compiler\PassConfig

Q: At which stage of the container compilation are "Aliases" usually resolved and inlined?
A: During the "Optimization" phase (PassConfig::TYPE_OPTIMIZE).

Q: What is the integer value of "PassConfig::TYPE_BEFORE_OPTIMIZATION" execution order weight?
A: 0 (it is the starting point of the config array index).

## CATEGORY 2: "Signature Specialist" (Methods & Types)

Q: Exact FQCN of the interface required to create a custom compiler pass?
A: Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface

Q: Signature of "CompilerPassInterface::process()"?
A: public function process(Symfony\Component\DependencyInjection\ContainerBuilder $container): void;

Q: What is the return type of "ContainerBuilder::findTaggedServiceIds(string $name, bool $throwOnEmpty = false)"?
A: array (Returns an array where keys are service IDs and values are arrays of tag attributes).

Q: Signature of "Definition::addMethodCall(string $method, array $arguments = [], bool $returnsClone = false)"?
A: public function addMethodCall(string $method, array $arguments = [], bool $returnsClone = false): static;

Q: Which method of "ContainerBuilder" must be used to retrieve a service definition and throw an exception if it does not exist?
A: public function getDefinition(string $id): Symfony\Component\DependencyInjection\Definition;

Q: Signature of "Reference::__construct()"?
A: public function __construct(string $id, int $invalidBehavior = Symfony\Component\DependencyInjection\ContainerInterface::EXCEPTION_ON_INVALID_REFERENCE);

Q: What does "ContainerBuilder::getParameterBag()" return?
A: Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface

## CATEGORY 3: "PHP 8.4 Synergy" (Impact on Symfony)

Q: How does Asymmetric Visibility (PHP 8.4) impact "Autowire" on properties?
A: Symfony 8.0 can autowire properties with "private(set)" but they must remain "public" or "protected" for the initial write if not using reflection.

Q: Impact of Property Hooks (PHP 8.4) on "Definition::setProperty()"?
A: Setting a property with a "set" hook via DI will trigger the hook logic instead of a direct zval assignment, allowing internal validation during injection.

Q: Can an Enum (PHP 8.1+) be defined as a service in the container since Symfony 8.0?
A: No, Enums cannot be instantiated by the container; they are accessed via "factory: [EnumClass, caseName]" or via the "!php/enum" parser.

Q: How do DNF types (PHP 8.2+) in constructor arguments affect Autowiring in Symfony 8.0?
A: Symfony supports them, but it can only autowire if exactly one service matches the intersection/union logic or if an "Alias" is provided.

## CATEGORY 4: "The Trap Room" (SensioLabs Distractors)

Q: [Code] #[AsDecorator(decorates: 'app.mailer')] class Bar { ... } - In Symfony 8.0, what happens if 'app.mailer' does not exist?
A: An 'ServiceNotFoundException' is thrown unless 'onInvalid: ContainerInterface::IGNORE_ON_INVALID_REFERENCE' is specified.

Q: What is the subtle difference between 'Reference' and 'TypedReference' in a compiler pass?
A: 'TypedReference' includes the FQCN of the service, allowing the 'AutowirePass' to verify types during compilation.

Q: [Code] $container->register('app.service', Foo::class)->setShared(false); - What is the lifecycle of this service?
A: Prototype (a new instance is created every time it is requested).

Q: In Symfony 8.0, is it possible to decorate a service that is marked as "external: true"?
A: No, "external" services (usually from the parent container in a sub-request context) cannot be decorated.

Q: True or False: 'ContainerBuilder::compile()' automatically calls 'process()' on all registered Compiler Passes.
A: True.

Q: Which 'Stamp' is used in Messenger (S8.0) to transport DI-related metadata between buses?
A: None. DI metadata is not transported via Messenger Stamps; services are reconstructed by the Worker's container.

Q: [Code] $container->findDefinition(Foo::class)->setPublic(false); - In a compiled container, can you fetch this service via '$container->get(Foo::class)'?
A: No, only public services are accessible from the compiled container via 'get()'.

**[FLASHCARD LIMIT REACHED - TYPE 'CONTINUER' FOR THE NEXT BATCH]**
## CATEGORY 1: "Internal Trace" (Lazy Loading & Proxies)

Q: At what moment is a "Lazy" service actually instantiated by the container?
A: Upon the first access to any of its public methods (via the generated Proxy object).

Q: Which internal Symfony tag is used to specify "interface proxifying" for a lazy service?
A: The "proxy" tag, with the "interface" attribute.

Q: In the compilation process, which pass is responsible for generating the Proxy classes for lazy services?
A: Symfony\Component\DependencyInjection\Compiler\ResolveNoPreloadVerifyPass (partially) and specifically the Proxy generation logic during dumping.

Q: True or False: A "Synthetic" service can be defined with a specific class in YAML.
A: False. Synthetic services do not specify a class in the configuration; they are injected manually at runtime.

Q: When using "Expression Language" in DI, at what stage is the expression evaluated if it refers to a service?
A: At runtime, when the service containing the expression is instantiated.

Q: What is the default invalid behavior for a service injected via "Autowire(lazy: true)" if the service is missing?
A: It throws a "ServiceNotFoundException" unless "onInvalid" is set to "IGNORE_ON_INVALID_REFERENCE".

## CATEGORY 2: "Signature Specialist" (Advanced Definitions)

Q: Signature of "Definition::setLazy(bool $lazy = true)"?
A: public function setLazy(bool $lazy = true): static;

Q: Which method is used to mark a service as "Synthetic" in "ContainerBuilder"?
A: public function setSynthetic(bool $boolean): static;

Q: Signature of the constructor of "Symfony\Component\DependencyInjection\ServiceLocator"?
A: public function __construct(array $factories);

Q: What does the "factories" array in "ServiceLocator" contain (internal structure)?
A: An associative array where keys are IDs and values are "Closure" objects that return the service.

Q: Signature of "ContainerBuilder::setParameter(string $name, mixed $value)"?
A: public function setParameter(string $name, mixed $value): void;

Q: What is the return type of "Definition::getArguments()"?
A: array (Returns all positional arguments defined for the service constructor).

## CATEGORY 3: "PHP 8.4 Synergy" (Advanced Interactions)

Q: How does the "readonly" class modifier (PHP 8.2+) interact with DI "Property Injection" in Symfony 8.0?
A: Property injection is IMPOSSIBLE on a "readonly" property after the constructor has finished; DI must use constructor injection or a factory.

Q: Can a Symfony 8.0 Service use "Property Hooks" (PHP 8.4) to intercept a "Method Call" injection?
A: No, Method Call injection uses method calls; Property Hooks only intercept direct property access (->property).

Q: If a service uses "Asymmetric Visibility" (private(set)), can the container inject it via "Reflection"?
A: Yes, but only if the property is not "readonly".

## CATEGORY 4: "The Trap Room" (SensioLabs Distractors - Part 2)

Q: [Code] $services->set(Foo::class)->lazy(); - If Foo is a 'final' class, what is the consequence in Symfony 8.0?
A: A 'RuntimeException' is thrown because a Proxy cannot extend a 'final' class, unless interface proxifying is used.

Q: What is the difference between 'set()' and 'register()' in ContainerBuilder?
A: 'register()' is a shortcut that creates a new 'Definition' and returns it, while 'set()' expects an existing Definition object.

Q: [Code] $container->getDefinition('app.service')->addTag('kernel.event_listener', ['event' => 'kernel.request']); - Does this register the listener automatically?
A: Only if the 'RegisterListenersPass' (or similar) runs AFTER this tag is added.

Q: True or False: In a compiled Symfony 8.0 container, you can still add new Parameters via "setParameter()".
A: False. The container is frozen after compilation.

Q: Which internal class handles the '!service' tag in YAML/PHP configurators?
A: Symfony\Component\DependencyInjection\Loader\Configurator\ReferenceConfigurator

Q: [Code] #[AsDecorator(decorates: 'inner_service', priority: 5)] - Does a higher priority run 'closer' to the original service or 'further' away?
A: Higher priority runs 'further' away (it decorates the result of lower priority decorators).

Q: What is the 'Service ID' of the inner service when using decoration with '.inner' suffix?
A: The original service ID plus '.inner' (e.g., 'app.mailer.inner').

Q: True or False: 'ServiceSubscriberInterface' allows a service to declare its dependencies to be fetched from a ServiceLocator.
A: True.

Q: In Symfony 8.0, can you use 'Autowire(expression: "...")' on a constructor parameter?
A: Yes, it uses ExpressionLanguage to resolve the value at runtime.

**[FLASHCARD LIMIT REACHED - TYPE 'CONTINUER' FOR THE NEXT BATCH]**
Q: [Code] $container->getParameterBag()->set('app.env', 'prod'); - If you call '$container->getParameter('app.env')' after compilation, what is the result?
A: 'prod' (provided the bag was updated before the container was frozen).

Q: What is the FQCN of the exception thrown when a service is requested from a 'ServiceLocator' but is missing?
A: Psr\Container\NotFoundExceptionInterface (concretely Symfony\Component\DependencyInjectionxception\ServiceNotFoundException).

**[BATCH COMPLETE - 50 CARDS GENERATED]**
