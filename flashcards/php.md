# Flashcards : PHP (Symfony 8.0 / PHP 8.4)
> Exhaustive deck — all sub-topics of the official Symfony 8.0 certification PHP section.

---

### PHP API up to PHP 8.4 version

**Q: What is the minimum PHP version required by Symfony 8.0?**
**A:** PHP **8.2** minimum. The exam covers PHP API up to **8.4**.
**Code Snippet:** N/A

---

**Q: What are the two major PHP 8.4 OOP features that Symfony-style code benefits from most?**
**A:** **Property Hooks** (native get/set logic on properties) and **Asymmetric Visibility** (`public private(set)`).
**Code Snippet:**
```php
class User {
    public private(set) string $username {
        set => strtolower($value);
    }
}
```

---

**Q: What is the difference between `readonly` (PHP 8.1) and `private(set)` (PHP 8.4)?**
**A:** `readonly` — can only be written **once** (in the constructor); immutable afterwards. `private(set)` — can be written multiple times but only from within the class; still readable publicly.
**Code Snippet:**
```php
class Config {
    public readonly string $apiKey;           // immutable after __construct
    public private(set) int $retryCount = 0; // mutable internally, read-only externally
}
```

---

**Q: What new array functions were introduced in PHP 8.4?**
**A:** `array_find()`, `array_find_key()`, `array_any()`, `array_all()` — all accept a callback predicate.
**Code Snippet:**
```php
$first = array_find([1, 2, 3, 4], fn($v) => $v > 2); // 3
$allPositive = array_all([1, 2, 3], fn($v) => $v > 0); // true
```

---

**Q: What does PHP 8.3 add for class constants that is relevant to typed code?**
**A:** **Typed class constants** — you can now declare the type of a class constant explicitly.
**Code Snippet:**
```php
class Status {
    const string ACTIVE = 'active';
    const int MAX_RETRY = 3;
}
```

---

**Q: What is "readonly deep cloning" introduced in PHP 8.3?**
**A:** When you `clone` a readonly object, PHP 8.3 allows re-initialising readonly properties on the cloned instance within `__clone()`. Previously this was impossible.
**Code Snippet:**
```php
class Point {
    public function __construct(
        public readonly int $x,
        public readonly int $y
    ) {}

    public function with(int $x): static {
        $clone = clone $this;
        $clone->x = $x; // Allowed in PHP 8.3+ within __clone context
        return $clone;
    }
}
```

---

### Object Oriented Programming

**Q: What is the difference between an abstract class and an interface in PHP?**
**A:** An abstract class can have concrete methods and properties; a class can extend only one. An interface defines only method signatures; a class can implement many. Use an interface for a contract, an abstract class for shared base behaviour.
**Code Snippet:**
```php
interface Serializable { public function serialize(): string; }
abstract class BaseSerializer implements Serializable {
    protected function encode(array $data): string { return json_encode($data); }
}
```

---

**Q: What does the `readonly class` modifier (PHP 8.2) do?**
**A:** All promoted/declared properties of the class become `readonly`. No untyped or static properties are allowed.
**Code Snippet:**
```php
readonly class Money {
    public function __construct(
        public int $amount,
        public string $currency
    ) {}
}
```

---

**Q: What is the purpose of the `static` return type in PHP?**
**A:** It refers to the late-static-bound class — i.e., the class on which the method was actually called, not the class where the method is defined. Useful for fluent builder patterns in class hierarchies.
**Code Snippet:**
```php
class Query {
    public function where(string $cond): static {
        $this->conditions[] = $cond;
        return $this;
    }
}
```

---

**Q: What are Constructor Property Promotion and why do Symfony services use it extensively?**
**A:** PHP 8.0 feature — properties can be declared and initialised directly in the constructor parameter list, reducing boilerplate. Symfony services use it with `private readonly` for DI injection.
**Code Snippet:**
```php
class OrderService {
    public function __construct(
        private readonly MailerInterface $mailer,
        private readonly LoggerInterface $logger,
    ) {}
}
```

---

### Namespaces

**Q: What is the purpose of PHP namespaces and why are they critical in Symfony?**
**A:** Namespaces prevent class name collisions across different libraries/directories and enable PSR-4 autoloading. Symfony maps `App\` to `src/` and all service IDs rely on fully-qualified class names (FQCN).
**Code Snippet:**
```php
namespace App\Service;

use App\Repository\UserRepository;
use Symfony\Component\Mailer\MailerInterface;
```

---

**Q: What is a `use` statement alias and when would you use it in PHP?**
**A:** It creates a short local name for a class from another namespace to avoid verbosity or name conflicts.
**Code Snippet:**
```php
use App\Entity\User as AppUser;
use ThirdParty\Auth\User as AuthUser;

function process(AppUser $u, AuthUser $a): void {}
```

---

**Q: What is the difference between `use` for namespaces and `use` inside a closure?**
**A:** `use` at file level imports class/interface/function names. `use` inside a closure **captures** variables from the outer scope. Arrow functions (`fn =>`) capture automatically.
**Code Snippet:**
```php
$prefix = 'Hello';
$greet = function(string $name) use ($prefix) {
    return "$prefix, $name";
};
// Arrow function: equivalent without explicit `use`
$greet2 = fn(string $name) => "$prefix, $name";
```

---

**Q: What is a grouped `use` declaration (PHP 7.0+)?**
**A:** Allows importing multiple classes from the same namespace in one `use` statement using `{}`.
**Code Snippet:**
```php
use Symfony\Component\HttpFoundation\{Request, Response, JsonResponse};
```

---

### Attributes

**Q: What is a PHP 8 Attribute and how does Symfony use them?**
**A:** An Attribute is metadata attached to a class, method, property, or parameter via `#[...]` syntax. Symfony reads attributes at runtime via Reflection to configure Routing, DI, Validation, Security, Console, etc.
**Code Snippet:**
```php
#[Route('/products', name: 'product_list', methods: ['GET'])]
public function list(): Response { ... }
```

---

**Q: How do you create a custom PHP Attribute?**
**A:** Create a class annotated with `#[Attribute]` (and optionally restrict its target with `Attribute::TARGET_*` constants).
**Code Snippet:**
```php
#[Attribute(Attribute::TARGET_METHOD)]
class RateLimit {
    public function __construct(public readonly int $maxRequests) {}
}
```

---

**Q: How do you read a custom Attribute at runtime using PHP Reflection?**
**A:** Use `ReflectionClass`, `ReflectionMethod`, or `ReflectionProperty` to call `getAttributes()`, then `newInstance()` on the result.
**Code Snippet:**
```php
$ref = new ReflectionMethod(MyController::class, 'list');
$attrs = $ref->getAttributes(RateLimit::class);
if ($attrs) {
    $rl = $attrs[0]->newInstance(); // RateLimit object
    echo $rl->maxRequests;
}
```

---

**Q: What is the difference between `Attribute::TARGET_CLASS` and `Attribute::IS_REPEATABLE`?**
**A:** `TARGET_CLASS` restricts the attribute to be used only on classes. `IS_REPEATABLE` allows the same attribute to appear multiple times on the same target (e.g., multiple `#[Route]` on one method).
**Code Snippet:**
```php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class Route { public function __construct(public string $path) {} }
```

---

### Interfaces

**Q: Can an interface extend another interface in PHP?**
**A:** Yes. An interface can extend one or more other interfaces. The class implementing it must implement all methods from the entire hierarchy.
**Code Snippet:**
```php
interface ReadableInterface { public function read(): string; }
interface WritableInterface { public function write(string $data): void; }
interface StorageInterface extends ReadableInterface, WritableInterface {}
```

---

**Q: What is the difference between `instanceof` and `is_a()` in PHP?**
**A:** Both check if an object is an instance of a class/interface. `instanceof` is an operator and works at compile time; `is_a()` is a function that also accepts a string class name, useful for dynamic checks.
**Code Snippet:**
```php
$result = $obj instanceof LoggerInterface;      // operator
$result = is_a($obj, LoggerInterface::class);   // function (also works with string names)
```

---

### Anonymous functions and closures

**Q: What is the `Closure::bind()` static method used for?**
**A:** It creates a new closure bound to a given object and class scope, allowing the closure to access private/protected members of that object.
**Code Snippet:**
```php
$getClosure = Closure::bind(function() {
    return $this->privateProperty;
}, $object, MyClass::class);
echo $getClosure();
```

---

**Q: What is a first-class callable syntax introduced in PHP 8.1?**
**A:** You can get a `Closure` from any callable using `...` syntax. Makes passing methods as callbacks cleaner.
**Code Snippet:**
```php
$fn = strlen(...);           // Closure from built-in
$fn = $obj->method(...);     // Closure from object method
$fn = Str::upper(...);       // Closure from static method
```

---

### Abstract classes

**Q: Can an abstract class implement an interface without implementing all its methods?**
**A:** Yes. An abstract class can partially implement an interface, leaving some methods abstract for concrete subclasses to implement.
**Code Snippet:**
```php
interface Shape {
    public function area(): float;
    public function perimeter(): float;
}
abstract class Polygon implements Shape {
    abstract public function perimeter(): float;
    // area() must be implemented by concrete subclasses too
}
```

---

### Exception and error handling

**Q: What is the difference between `Error` and `Exception` in PHP 7+?**
**A:** Both implement `Throwable`. `Exception` is for application-level errors (catch them and recover). `Error` is for engine-level errors (TypeError, ParseError — usually fatal).
**Code Snippet:**
```php
try {
    $result = doSomething();
} catch (TypeError $e) {
    // Wrong argument type passed
} catch (Exception $e) {
    // Application logic error
} catch (\Throwable $e) {
    // Catches both Error and Exception
}
```

---

**Q: What does `set_exception_handler()` do and when does Symfony render it?**
**A:** It registers a global fallback called when an uncaught exception reaches the top level. Symfony's `ErrorHandler` component registers its own handler to render error pages.
**Code Snippet:** N/A

---

**Q: What is a `finally` block and when does it NOT execute?**
**A:** `finally` always executes after `try`/`catch` — even if an exception is thrown. Exception: it does NOT run if `exit()` / `die()` is called first, or on fatal engine errors that kill the process.
**Code Snippet:**
```php
try {
    riskyOperation();
} catch (RuntimeException $e) {
    log($e);
} finally {
    closeConnection(); // Always called
}
```

---

### Traits

**Q: What conflict resolution keywords does PHP provide for trait method collisions?**
**A:** `insteadof` (choose one over the other) and `as` (create an alias or change visibility).
**Code Snippet:**
```php
class MyClass {
    use TraitA, TraitB {
        TraitA::hello insteadof TraitB;
        TraitB::hello as helloB;
        TraitA::hello as protected; // change visibility
    }
}
```

---

**Q: Can a trait define abstract methods, constants, or static properties?**
**A:** A trait can define **abstract methods** (forcing the using class to implement them) and **static properties/methods**. PHP 8.2+ allows traits to define constants.
**Code Snippet:**
```php
trait Validatable {
    abstract protected function validate(): bool;
    const int MAX_SIZE = 100; // PHP 8.2+
    public function isValid(): bool { return $this->validate(); }
}
```

---

### Enums

**Q: What are the two types of PHP Enums and what is the key structural difference?**
**A:** **Pure Enum** — cases have no scalar value. **Backed Enum** — each case has a `string` or `int` value. All cases in a backed enum must be of the same type.
**Code Snippet:**
```php
enum Direction { case North; case South; }  // Pure
enum Status: string {                        // Backed
    case Active = 'active';
    case Inactive = 'inactive';
}
```

---

**Q: How do you get the scalar value from a Backed Enum case, and how do you go from a scalar back to an Enum case?**
**A:** Use `->value` to get the scalar. Use `::from()` (throws if not found) or `::tryFrom()` (returns null) to convert a scalar to an Enum case.
**Code Snippet:**
```php
$val = Status::Active->value;   // 'active'
$case = Status::from('active'); // Status::Active
$case = Status::tryFrom('xxx'); // null (no exception)
```

---

**Q: Can PHP Enums implement interfaces and have methods?**
**A:** Yes. Enums can implement interfaces and define methods. Methods can use `$this` / `match($this)` to branch per case.
**Code Snippet:**
```php
interface HasLabel { public function label(): string; }
enum Priority: int implements HasLabel {
    case Low = 1; case High = 3;
    public function label(): string {
        return match($this) {
            Priority::Low => 'Low Priority',
            Priority::High => 'HIGH PRIORITY',
        };
    }
}
```

---

**Q: How are Enums used as a service parameter or Twig variable in Symfony 8?**
**A:** Backed Enums can be injected as container parameters via their `->value`, and Symfony's serializer/form system can resolve them. In Twig, enum cases are accessible via their FQCN.
**Code Snippet:**
```yaml
# services.yaml
parameters:
    default_status: !php/const App\Enum\Status::Active  # not standard; use value instead
```
```php
// Preferred: inject the backed value as string param, then ::from() it
```

---

### PHP 8.4 Specifics

**Q: What is the syntax for a Property Hook with a custom setter in PHP 8.4?**
**A:** Use `{ set => expression; }` or `{ set { ... } }` directly on the property declaration. The hook receives `$value` as the incoming value.
**Code Snippet:**
```php
class User {
    public private(set) string $username {
        set => strtolower($value);
        get => ucfirst($this->username);
    }
}
```

---

**Q: What is the trap with property hooks and infinite recursion?**
**A:** Inside a `get` hook, reading `$this->propertyName` will call the hook again → infinite recursion. To access the raw value, use `$this->propertyName` only when no get hook is defined, or store in a backing private field.
**Code Snippet:**
```php
class Product {
    private string $_title = '';
    public string $title {
        get => strtoupper($this->_title);
        set { $this->_title = $value; }
    }
}
```

---
