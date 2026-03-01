# Quiz : PHP (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading. True/False, Single answer, Multiple choice only.

---

### PHP API up to PHP 8.4 version

### Q1: PHP 8.1 introduced Fibers for cooperative multitasking.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Fibers were introduced in PHP 8.1, allowing cooperative multitasking with `Fiber`, `Fiber::suspend()`, and `Fiber::resume()`.

---

### Q2: Which PHP version introduced the `readonly` keyword for class properties?
**Type:** Single answer
- [ ] A) PHP 8.0
- [ ] B) PHP 8.1
- [ ] C) PHP 8.2
- [ ] D) PHP 8.3

**Correct Answer(s):** B
**Explanation:** `readonly` properties were introduced in PHP 8.1. PHP 8.2 extended this to `readonly` classes.

---

### Q3: Which of the following features were introduced in PHP 8.0? (Select all that apply)
**Type:** Multiple choice
- [ ] A) Named arguments
- [ ] B) Union types
- [ ] C) Match expressions
- [ ] D) Enumerations
- [ ] E) Attributes
- [ ] F) Fibers

**Correct Answer(s):** A, B, C, E
**Explanation:** Named arguments, union types, match expressions, and attributes (#[]) were all PHP 8.0 features. Enumerations came in 8.1. Fibers came in 8.1.

---

### Q4: What is the output of the following PHP 8.0 code?
```php
echo match(true) {
    1 > 2 => 'A',
    3 > 2 => 'B',
    default => 'C',
};
```
**Type:** Single answer
- [ ] A) A
- [ ] B) B
- [ ] C) C
- [ ] D) A fatal error

**Correct Answer(s):** B
**Explanation:** `match(true)` evaluates each arm's condition. `1 > 2` is false, `3 > 2` is true → returns `'B'`.

---

### Q5: PHP 8.2 introduced `readonly` classes. What does marking a class as `readonly` do?
**Type:** Single answer
- [ ] A) All methods become read-only (no side effects)
- [ ] B) All declared properties are implicitly `readonly`
- [ ] C) The class cannot be instantiated
- [ ] D) The class cannot be extended

**Correct Answer(s):** B
**Explanation:** A `readonly class` makes all declared properties implicitly `readonly`. You can still instantiate and extend it.

---

### Q6: Which PHP 8.1 feature allows declaring types on class constants?
**Type:** Single answer
- [ ] A) Typed constants
- [ ] B) `const` type declarations
- [ ] C) None — typed class constants were introduced in PHP 8.3
- [ ] D) Readonly constants

**Correct Answer(s):** C
**Explanation:** Typed class constants (e.g., `const string NAME = 'foo'`) were introduced in PHP 8.3, not 8.1.

---

### Q7: In PHP 8.0, constructor property promotion allows you to declare and assign properties in the constructor signature.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** PHP 8.0 constructor promotion: `public function __construct(private string $name) {}` declares, types, and assigns the property.

---

### Q8: Which of the following are valid PHP 8.0+ features? (Select all that apply)
**Type:** Multiple choice
- [ ] A) Nullsafe operator `?->`
- [ ] B) `str_contains()` function
- [ ] C) `str_starts_with()` function
- [ ] D) `array_find()` function
- [ ] E) `str_ends_with()` function

**Correct Answer(s):** A, B, C, E
**Explanation:** `?->`, `str_contains()`, `str_starts_with()`, `str_ends_with()` are PHP 8.0. `array_find()` is PHP 8.4.

---

### Q9: What does the `never` return type in PHP 8.1 indicate?
**Type:** Single answer
- [ ] A) The function returns `null`
- [ ] B) The function always throws an exception or calls `exit()`
- [ ] C) The function returns `void`
- [ ] D) The function has no return type

**Correct Answer(s):** B
**Explanation:** `never` means the function never returns normally — it always throws or terminates execution (`exit`, `die`).

---

### Q10: Intersection types (e.g., `CountableInterface&Iterator`) were introduced in which PHP version?
**Type:** Single answer
- [ ] A) PHP 8.0
- [ ] B) PHP 8.1
- [ ] C) PHP 8.2
- [ ] D) PHP 8.3

**Correct Answer(s):** B
**Explanation:** Intersection types (`TypeA&TypeB`) were introduced in PHP 8.1. PHP 8.2 added DNF (Disjunctive Normal Form) combining union and intersection.

---

### Q11: What is the output of this PHP 8.0 code?
```php
function test(string $a, string $b): string {
    return "$a-$b";
}
echo test(b: 'world', a: 'hello');
```
**Type:** Single answer
- [ ] A) world-hello
- [ ] B) hello-world
- [ ] C) A fatal error
- [ ] D) A warning

**Correct Answer(s):** B
**Explanation:** Named arguments allow passing arguments in any order. `a: 'hello'` and `b: 'world'` match the parameters.

---

### Q12: Which PHP version first supported Disjunctive Normal Form (DNF) types like `(A&B)|C`?
**Type:** Single answer
- [ ] A) PHP 8.1
- [ ] B) PHP 8.2
- [ ] C) PHP 8.3
- [ ] D) PHP 8.4

**Correct Answer(s):** B
**Explanation:** DNF types were introduced in PHP 8.2, combining union (`|`) and intersection (`&`) types.

---

### Q13: PHP 8.3 introduced the `#[\Override]` attribute. What does it do?
**Type:** Single answer
- [ ] A) Prevents the method from being overridden
- [ ] B) Marks a method as intentionally overriding a parent method — errors if no parent method exists
- [ ] C) Forces subclasses to override the method
- [ ] D) Marks the method as deprecated

**Correct Answer(s):** B
**Explanation:** `#[\Override]` ensures the method actually overrides a parent method. If the parent removes the method, PHP throws an error — catching accidental signature mismatches early.

---

### Q14: The `json_validate()` function was introduced in PHP 8.3.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `json_validate()` validates JSON without decoding it. Introduced in PHP 8.3.

---

### Q15: What is the output of this PHP 8.0 code?
```php
$result = match('0') {
    0 => 'integer zero',
    '0' => 'string zero',
    false => 'false',
};
echo $result;
```
**Type:** Single answer
- [ ] A) integer zero
- [ ] B) string zero
- [ ] C) false
- [ ] D) UnhandledMatchError

**Correct Answer(s):** B
**Explanation:** `match` uses strict comparison (`===`). `'0' === '0'` is true. Unlike `switch`, which uses `==`, `match` won't coerce types.

---

### Q16: In PHP 8.4, the `new MyClass()->method()` chaining syntax without parentheses wrapping is now valid.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** PHP 8.4 permits calling methods directly on `new` expressions: `new MyClass()->method()` without wrapping in `(new MyClass())->method()`.

---

### Q17: Which of the following functions were added in PHP 8.4? (Select all that apply)
**Type:** Multiple choice
- [ ] A) `array_find()`
- [ ] B) `array_find_key()`
- [ ] C) `array_any()`
- [ ] D) `array_all()`
- [ ] E) `array_filter()`

**Correct Answer(s):** A, B, C, D
**Explanation:** `array_find()`, `array_find_key()`, `array_any()`, `array_all()` are new in PHP 8.4. `array_filter()` has existed since PHP 4.

---

### Q18: PHP 8.1 added `enum` as a built-in language construct. Before 8.1, enums had to be emulated with constants or third-party libraries.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Native enumerations (both pure and backed) were introduced in PHP 8.1 as a first-class language feature.

---

### Q19: What is the output?
```php
$fn = fn(int $x) => $x * 2;
echo $fn(5);
```
**Type:** Single answer
- [ ] A) 10
- [ ] B) 5
- [ ] C) A fatal error — arrow functions require `function` keyword
- [ ] D) A warning

**Correct Answer(s):** A
**Explanation:** Arrow functions (`fn() =>`) were introduced in PHP 7.4 and return the expression result automatically. `5 * 2 = 10`.

---

### Q20: Which PHP version introduced the `null`, `true`, and `false` as standalone types?
**Type:** Single answer
- [ ] A) PHP 8.0
- [ ] B) PHP 8.1
- [ ] C) PHP 8.2
- [ ] D) PHP 8.3

**Correct Answer(s):** C
**Explanation:** `null`, `true`, and `false` as standalone types (not just in unions) were introduced in PHP 8.2.

---

### Q21: First-class callable syntax (`strlen(...)`) was introduced in PHP 8.0.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** First-class callable syntax was introduced in PHP **8.1**, not 8.0.

---

### Q22: What does `#[Attribute(Attribute::TARGET_METHOD)]` mean on a custom attribute class?
**Type:** Single answer
- [ ] A) The attribute can only be applied to methods
- [ ] B) The attribute can only be applied to classes
- [ ] C) The attribute is deprecated
- [ ] D) The attribute can be applied anywhere

**Correct Answer(s):** A
**Explanation:** `Attribute::TARGET_METHOD` restricts the attribute to methods. Other targets: `TARGET_CLASS`, `TARGET_PROPERTY`, `TARGET_PARAMETER`, `TARGET_FUNCTION`, `TARGET_CLASS_CONSTANT`, `TARGET_ALL`.

---

### Q23: PHP 8.3 introduced `#[\Override]`. What happens if you apply it to a method that does NOT override a parent method?
**Type:** Single answer
- [ ] A) Nothing happens
- [ ] B) A deprecation notice is triggered
- [ ] C) A fatal error is thrown at compile time
- [ ] D) A warning is triggered at runtime

**Correct Answer(s):** C
**Explanation:** Applying `#[\Override]` to a method that doesn't override any parent/interface method causes a fatal error at compile time.

---

### Q24: Which of these are valid `match` expression features in PHP 8.0? (Select all)
**Type:** Multiple choice
- [ ] A) Uses strict comparison (`===`)
- [ ] B) Returns a value
- [ ] C) Supports fall-through like `switch`
- [ ] D) Throws `UnhandledMatchError` if no arm matches and no `default`
- [ ] E) Multiple conditions per arm (comma-separated)

**Correct Answer(s):** A, B, D, E
**Explanation:** `match` uses `===`, returns a value, has no fall-through, throws `UnhandledMatchError` without default, and supports `1, 2 => 'result'`.

---

### Q25: What does `mixed` type mean in PHP 8.0+?
**Type:** Single answer
- [ ] A) The type is unknown
- [ ] B) Equivalent to `string|int|float|bool|array|object|callable|null`
- [ ] C) The variable must contain a mix of types
- [ ] D) The parameter is optional

**Correct Answer(s):** B
**Explanation:** `mixed` is a union of all types. It is the default when no type is declared. Cannot be combined with other types (e.g., `mixed|string` is invalid).

---

### Q26: In PHP 8.2, which of the following is deprecated?
**Type:** Multiple choice
- [ ] A) Dynamic properties on classes without `#[AllowDynamicProperties]`
- [ ] B) `utf8_encode()` and `utf8_decode()`
- [ ] C) `readonly` properties
- [ ] D) The `${}` variable interpolation syntax

**Correct Answer(s):** A, B, D
**Explanation:** In PHP 8.2: dynamic properties are deprecated (unless `#[AllowDynamicProperties]`), `utf8_encode()`/`utf8_decode()` are deprecated, and `"${expr}"` interpolation is deprecated. `readonly` is NOT deprecated.

---

### Q27: What is the output?
```php
$arr = [3, 1, 4, 1, 5];
$found = array_find($arr, fn($v) => $v > 3);
echo $found;
```
**Type:** Single answer
- [ ] A) 3
- [ ] B) 4
- [ ] C) 5
- [ ] D) `null`

**Correct Answer(s):** B
**Explanation:** `array_find()` (PHP 8.4) returns the **first** element satisfying the callback. The first element `> 3` is `4`.

---

### Q28: The `$` is required when accessing an enum case.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Enum cases are accessed with `::` without `$`: `Status::Active`, not `Status::$Active`.

---

### Q29: Named arguments can be combined with positional arguments, but positional arguments must come first.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** You can mix positional and named: `foo('a', b: 'val')`. But named cannot precede positional.

---

### Q30: What happens with this PHP 8.4 property hook?
```php
class Product {
    public string $name {
        set => trim($value);
    }
}
$p = new Product();
$p->name = '  Hello  ';
echo $p->name;
```
**Type:** Single answer
- [ ] A) `  Hello  ` (untrimmed)
- [ ] B) `Hello`
- [ ] C) An error — hooks require both get and set
- [ ] D) An error — hooks are not valid PHP

**Correct Answer(s):** B
**Explanation:** PHP 8.4 property hooks allow defining `set` alone. The value is transformed by `trim()` before storage. Reading returns `Hello`.

---

### Object Oriented Programming

### Q31: Which of the following are valid visibility modifiers in PHP 8.x? (Select all)
**Type:** Multiple choice
- [ ] A) `public`
- [ ] B) `private`
- [ ] C) `protected`
- [ ] D) `internal`
- [ ] E) `package`

**Correct Answer(s):** A, B, C
**Explanation:** PHP only has `public`, `private`, and `protected`. There is no `internal` or `package` visibility in PHP.

---

### Q32: What is the output?
```php
class A {
    public function whoAmI(): string {
        return static::class;
    }
}
class B extends A {}
echo (new B())->whoAmI();
```
**Type:** Single answer
- [ ] A) A
- [ ] B) B
- [ ] C) A fatal error
- [ ] D) An empty string

**Correct Answer(s):** B
**Explanation:** `static::class` uses late static binding — resolves to the actual class at runtime (`B`), not the declaring class (`A`).

---

### Q33: Which keyword prevents a class from being instantiated?
**Type:** Single answer
- [ ] A) `final`
- [ ] B) `abstract`
- [ ] C) `static`
- [ ] D) `readonly`

**Correct Answer(s):** B
**Explanation:** `abstract` classes cannot be instantiated directly. `final` prevents subclassing. `static` is for static members. `readonly` affects properties.

---

### Q34: A `final` class can be extended by another class.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** `final` prevents any class from extending it. Attempting to extend a `final` class causes a fatal error.

---

### Q35: What is the correct way to call a parent constructor in PHP?
**Type:** Single answer
- [ ] A) `parent::__construct()`
- [ ] B) `super().__init__()`
- [ ] C) `this->parent->construct()`
- [ ] D) `$this->__construct()`

**Correct Answer(s):** A
**Explanation:** In PHP, `parent::__construct()` calls the parent's constructor. There is no `super` keyword.

---

### Q36: What is the output?
```php
class Counter {
    private static int $count = 0;
    public function __construct() { self::$count++; }
    public static function getCount(): int { return self::$count; }
}
new Counter();
new Counter();
new Counter();
echo Counter::getCount();
```
**Type:** Single answer
- [ ] A) 1
- [ ] B) 3
- [ ] C) 0
- [ ] D) A fatal error

**Correct Answer(s):** B
**Explanation:** Static property `$count` is shared across all instances. Three instantiations increment it to 3.

---

### Q37: Which magic method is called when accessing a non-existent or inaccessible property?
**Type:** Single answer
- [ ] A) `__call()`
- [ ] B) `__get()`
- [ ] C) `__set()`
- [ ] D) `__isset()`

**Correct Answer(s):** B
**Explanation:** `__get($name)` is invoked when reading an inaccessible property. `__set()` is for writing. `__call()` is for methods.

---

### Q38: PHP supports multiple inheritance (extending more than one class).
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** PHP only supports single inheritance. Multiple inheritance is achieved via interfaces and traits.

---

### Q39: Which of the following are valid ways to check an object's type in PHP? (Select all)
**Type:** Multiple choice
- [ ] A) `instanceof`
- [ ] B) `is_a()`
- [ ] C) `typeof()`
- [ ] D) `get_class()`
- [ ] E) `::class`

**Correct Answer(s):** A, B, D, E
**Explanation:** `instanceof`, `is_a()`, `get_class()`, and `Foo::class` all work. `typeof()` does not exist in PHP.

---

### Q40: What is the output?
```php
class Base {
    public function hello(): string { return 'Base'; }
}
class Child extends Base {
    public function hello(): string { return 'Child'; }
}
function greet(Base $obj): void { echo $obj->hello(); }
greet(new Child());
```
**Type:** Single answer
- [ ] A) Base
- [ ] B) Child
- [ ] C) A TypeError
- [ ] D) A fatal error

**Correct Answer(s):** B
**Explanation:** Polymorphism — the overridden `hello()` in `Child` is called. `Child extends Base`, so it satisfies the `Base` type hint.

---

### Q41: Which of the following statements about `__clone()` are true? (Select all)
**Type:** Multiple choice
- [ ] A) It is called when `clone $object` is used
- [ ] B) It performs a deep copy by default
- [ ] C) It allows customizing the clone behavior
- [ ] D) It is always public

**Correct Answer(s):** A, C
**Explanation:** `__clone()` is called after a shallow copy is made. PHP does NOT deep-clone by default. `__clone()` can have any visibility.

---

### Q42: What is the output?
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

**Correct Answer(s):** A
**Explanation:** `__toString()` is called when an object is used in a string context (e.g., `echo`). Returns `'Object A'`.

---

### Q43: What is late static binding and which keyword enables it?
**Type:** Single answer
- [ ] A) `self` — resolves at runtime
- [ ] B) `static` — resolves at runtime to the calling class
- [ ] C) `parent` — resolves at runtime
- [ ] D) `this` — resolves at compile time

**Correct Answer(s):** B
**Explanation:** `static::` uses late static binding — it resolves to the class that called the method at runtime, not the class where the method was defined.

---

### Q44: An `abstract` method must NOT have a body.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Abstract methods are declared with `;` — no body. Subclasses must implement them.

---

### Q45: What is the output?
```php
interface Printable { public function print(): void; }
class Doc implements Printable { public function print(): void { echo 'Doc'; } }
$obj = new Doc();
echo $obj instanceof Printable ? 'Yes' : 'No';
```
**Type:** Single answer
- [ ] A) Yes
- [ ] B) No
- [ ] C) A fatal error
- [ ] D) Doc

**Correct Answer(s):** A
**Explanation:** `Doc` implements `Printable`, so `instanceof Printable` is `true`.

---

### Q46: In PHP 8, you can use union types for properties. What is the syntax?
**Type:** Single answer
- [ ] A) `public string|int $value;`
- [ ] B) `public (string, int) $value;`
- [ ] C) `public union(string, int) $value;`
- [ ] D) `public $value: string|int;`

**Correct Answer(s):** A
**Explanation:** Union types use `TypeA|TypeB` syntax: `public string|int $value;`

---

### Q47: Promoted constructor parameters cannot have default values.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Promoted parameters CAN have defaults: `public function __construct(private string $name = 'default') {}`

---

### Q48: What is the output?
```php
$obj = new stdClass();
$obj->dynamic = 'test';
echo $obj->dynamic;
```
**Type:** Single answer
- [ ] A) test
- [ ] B) A deprecation notice in PHP 8.2+
- [ ] C) A fatal error
- [ ] D) null

**Correct Answer(s):** A
**Explanation:** `stdClass` is implicitly marked with `#[AllowDynamicProperties]`, so dynamic properties work without deprecation on `stdClass` specifically.

---

### Q49: What happens when you try to set a `readonly` property twice?
**Type:** Single answer
- [ ] A) The second value overwrites the first
- [ ] B) An `Error` is thrown
- [ ] C) A deprecation notice is logged
- [ ] D) Nothing — the second assignment is silently ignored

**Correct Answer(s):** B
**Explanation:** Attempting to modify a `readonly` property after initialization throws an `Error: Cannot modify readonly property`.

---

### Q50: Which PHP version introduced the `enum` keyword?
**Type:** Single answer
- [ ] A) PHP 7.4
- [ ] B) PHP 8.0
- [ ] C) PHP 8.1
- [ ] D) PHP 8.2

**Correct Answer(s):** C
**Explanation:** Enumerations were introduced in PHP 8.1 as a first-class language construct.

---

### Namespaces

### Q51: What keyword is used to declare a namespace in PHP?
**Type:** Single answer
- [ ] A) `package`
- [ ] B) `namespace`
- [ ] C) `module`
- [ ] D) `import`

**Correct Answer(s):** B
**Explanation:** The `namespace` keyword declares a namespace. It must be the first statement in the file (after `declare(strict_types=1)`).

---

### Q52: The `namespace` declaration must be the very first statement in a PHP file.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** `namespace` must be the first statement, EXCEPT `declare(strict_types=1)` and comments can precede it.

---

### Q53: What does the `use` keyword do at the top of a PHP file?
**Type:** Single answer
- [ ] A) Includes another file
- [ ] B) Imports a class, function, or constant from a namespace
- [ ] C) Creates a dependency injection
- [ ] D) Starts a namespace block

**Correct Answer(s):** B
**Explanation:** `use App\Service\Mailer;` imports the class for use without the full namespace. Also works for functions (`use function`) and constants (`use const`).

---

### Q54: What is the output?
```php
namespace App\Service;
class Logger { public function log(): string { return __NAMESPACE__; } }
echo (new Logger())->log();
```
**Type:** Single answer
- [ ] A) `App\Service`
- [ ] B) `Logger`
- [ ] C) `App\Service\Logger`
- [ ] D) An empty string

**Correct Answer(s):** A
**Explanation:** `__NAMESPACE__` returns the current namespace as a string: `App\Service`.

---

### Q55: You can import multiple classes from the same namespace in a single `use` statement with braces.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Group use declarations: `use App\Service\{Logger, Mailer, Notifier};`

---

### Q56: How do you alias a class on import?
**Type:** Single answer
- [ ] A) `use App\Service\Logger as Log;`
- [ ] B) `import App\Service\Logger alias Log;`
- [ ] C) `use App\Service\Logger => Log;`
- [ ] D) `namespace alias Log = App\Service\Logger;`

**Correct Answer(s):** A
**Explanation:** The `as` keyword creates an alias: `use App\Service\Logger as Log;`

---

### Q57: What does a leading backslash `\` before a class name mean?
**Type:** Single answer
- [ ] A) It references the class in the current namespace
- [ ] B) It references the class in the global namespace
- [ ] C) It's invalid syntax
- [ ] D) It imports the class

**Correct Answer(s):** B
**Explanation:** `\DateTime` explicitly references the global namespace, avoiding conflicts with a `DateTime` class in the current namespace.

---

### Q58: Two classes in different namespaces can have the same short class name.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `App\Model\User` and `App\Security\User` can both exist. Namespaces prevent naming collisions.

---

### Q59: What is PSR-4 and how does it relate to namespaces?
**Type:** Single answer
- [ ] A) A coding standard for indentation
- [ ] B) An autoloading standard mapping namespace prefixes to directory structures
- [ ] C) A standard for HTTP messages
- [ ] D) A security standard for PHP

**Correct Answer(s):** B
**Explanation:** PSR-4 maps namespace prefixes (e.g., `App\`) to base directories (e.g., `src/`), enabling automatic class loading via Composer.

---

### Q60: What is the output?
```php
namespace App;
function strlen(string $s): int { return 42; }
echo strlen('hello');
```
**Type:** Single answer
- [ ] A) 5
- [ ] B) 42
- [ ] C) An error — cannot redefine strlen
- [ ] D) A warning

**Correct Answer(s):** B
**Explanation:** PHP resolves unqualified function calls by checking the current namespace first. Since `App\strlen()` exists, it returns 42. Use `\strlen()` to call the global version.

---

### Attributes

### Q61: PHP Attributes were introduced in which version?
**Type:** Single answer
- [ ] A) PHP 7.4
- [ ] B) PHP 8.0
- [ ] C) PHP 8.1
- [ ] D) PHP 8.2

**Correct Answer(s):** B
**Explanation:** Attributes (`#[...]`) were introduced in PHP 8.0, replacing docblock annotations.

---

### Q62: What is the syntax for applying an attribute to a class in PHP 8?
**Type:** Single answer
- [ ] A) `@Attribute class Foo {}`
- [ ] B) `#[MyAttribute] class Foo {}`
- [ ] C) `/** @MyAttribute */ class Foo {}`
- [ ] D) `[MyAttribute] class Foo {}`

**Correct Answer(s):** B
**Explanation:** PHP 8 uses `#[AttributeName]` syntax before the target declaration.

---

### Q63: An attribute class must itself be marked with `#[Attribute]` to be used as an attribute.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** An attribute class must have `#[Attribute]` (or `#[Attribute(Attribute::TARGET_*)]`) applied.

---

### Q64: Which of the following are valid `Attribute::TARGET_*` flags? (Select all)
**Type:** Multiple choice
- [ ] A) `TARGET_CLASS`
- [ ] B) `TARGET_METHOD`
- [ ] C) `TARGET_PROPERTY`
- [ ] D) `TARGET_PARAMETER`
- [ ] E) `TARGET_NAMESPACE`
- [ ] F) `TARGET_FUNCTION`

**Correct Answer(s):** A, B, C, D, F
**Explanation:** There is no `TARGET_NAMESPACE`. All others are valid: class, method, property, parameter, function, class_constant.

---

### Q65: Attributes can accept arguments. How do you pass arguments to an attribute in PHP 8?
**Type:** Single answer
- [ ] A) `#[Route('/path', name: 'route_name')]`
- [ ] B) `#[Route, '/path', 'route_name']`
- [ ] C) `@Route('/path', 'route_name')`
- [ ] D) `#Route('/path')`

**Correct Answer(s):** A
**Explanation:** Attributes use standard constructor argument syntax inside `#[...]`: positional and/or named arguments.

---

### Q66: Multiple attributes can be applied to the same target.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** You can stack multiple attributes: `#[Route('/a')] #[Route('/b')]` or `#[Route('/a'), Cache(60)]`.

---

### Q67: Which Symfony components heavily use PHP Attributes in Symfony 8? (Select all)
**Type:** Multiple choice
- [ ] A) Routing
- [ ] B) Dependency Injection
- [ ] C) Validation
- [ ] D) Twig rendering
- [ ] E) Messenger

**Correct Answer(s):** A, B, C, E
**Explanation:** Routing (`#[Route]`), DI (`#[Autowire]`, `#[AsCommand]`), Validation (`#[Assert\NotBlank]`), and Messenger (`#[AsMessageHandler]`) all use attributes. Twig rendering itself doesn't use PHP attributes.

---

### Q68: Attributes are read at compile time and automatically execute code.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Attributes are metadata. They do NOT execute code on their own. They must be read reflectively (`ReflectionClass::getAttributes()`) and instantiated to take effect.

---

### Q69: How do you retrieve attributes from a class at runtime in PHP?
**Type:** Single answer
- [ ] A) `$class->annotations()`
- [ ] B) `(new ReflectionClass(Foo::class))->getAttributes()`
- [ ] C) `Attribute::get(Foo::class)`
- [ ] D) `get_attributes(Foo::class)`

**Correct Answer(s):** B
**Explanation:** PHP's Reflection API: `(new ReflectionClass(Foo::class))->getAttributes()` returns `ReflectionAttribute[]`.

---

### Q70: What does `#[Attribute(Attribute::IS_REPEATABLE)]` allow?
**Type:** Single answer
- [ ] A) The attribute can be used on any target
- [ ] B) The attribute can be applied multiple times to the same target
- [ ] C) The attribute is inherited by subclasses
- [ ] D) The attribute self-executes on each use

**Correct Answer(s):** B
**Explanation:** By default, an attribute can only be applied once per target. `IS_REPEATABLE` allows multiple uses on the same declaration.

---

### Interfaces

### Q71: An interface can contain method implementations in PHP 8.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Interfaces cannot have method bodies (implementations). Only method signatures, constants, and type declarations. Method implementations are for abstract classes or traits.

---

### Q72: An interface can declare constants.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Interfaces can declare constants: `const VERSION = '1.0';`. These are public and cannot be overridden by implementing classes (in PHP 8.1+, they can be typed in 8.3).

---

### Q73: A PHP class can implement multiple interfaces.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `class Foo implements A, B, C {}` — a class can implement unlimited interfaces.

---

### Q74: What happens if a class implements an interface but does not define all its methods?
**Type:** Single answer
- [ ] A) A deprecation notice
- [ ] B) A fatal error
- [ ] C) The undefined methods return `null`
- [ ] D) A warning

**Correct Answer(s):** B
**Explanation:** The class must implement ALL interface methods with compatible signatures, or it must be declared `abstract`. Otherwise, fatal error.

---

### Q75: Interfaces can extend other interfaces.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `interface B extends A {}` — interfaces can extend one or more interfaces.

---

### Q76: All methods declared in an interface are implicitly:
**Type:** Single answer
- [ ] A) `private`
- [ ] B) `protected`
- [ ] C) `public`
- [ ] D) `abstract`

**Correct Answer(s):** C
**Explanation:** All interface methods are implicitly `public`. You cannot declare `private` or `protected` methods in an interface.

---

### Q77: An interface can be instantiated directly with `new InterfaceName()`.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Interfaces cannot be instantiated. Only concrete classes implementing them can be.

---

### Q78: Which of these is a valid interface extending multiple interfaces?
**Type:** Single answer
- [ ] A) `interface C extends A, B {}`
- [ ] B) `interface C implements A, B {}`
- [ ] C) `interface C : A, B {}`
- [ ] D) `interface C inherits A, B {}`

**Correct Answer(s):** A
**Explanation:** Interfaces use `extends` (not `implements`) and can extend multiple interfaces simultaneously.

---

### Anonymous functions and closures

### Q79: What is the difference between an anonymous function and an arrow function in PHP?
**Type:** Single answer
- [ ] A) Arrow functions can have multiple expressions; anonymous functions cannot
- [ ] B) Anonymous functions capture variables by value using `use`; arrow functions auto-capture from outer scope
- [ ] C) Arrow functions require the `function` keyword
- [ ] D) There is no difference

**Correct Answer(s):** B
**Explanation:** Anonymous functions require `use ($var)` to capture outer variables. Arrow functions (`fn() =>`) automatically capture by value.

---

### Q80: What is the output?
```php
$x = 10;
$fn = function() use ($x) { return $x; };
$x = 20;
echo $fn();
```
**Type:** Single answer
- [ ] A) 10
- [ ] B) 20
- [ ] C) null
- [ ] D) An error

**Correct Answer(s):** A
**Explanation:** `use ($x)` captures **by value** at the time the closure is defined. `$x` was `10` when captured. Changing `$x` later has no effect.

---

### Q81: What is the output?
```php
$x = 10;
$fn = function() use (&$x) { return $x; };
$x = 20;
echo $fn();
```
**Type:** Single answer
- [ ] A) 10
- [ ] B) 20
- [ ] C) null
- [ ] D) An error

**Correct Answer(s):** B
**Explanation:** `use (&$x)` captures **by reference**. When `$x` changes to 20, the closure sees the updated value.

---

### Q82: Arrow functions (`fn() =>`) can contain multiple statements.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Arrow functions only support a single expression whose result is automatically returned. For multiple statements, use a regular `function() {}`.

---

### Q83: What is the output?
```php
$x = 5;
$fn = fn() => $x * 2;
$x = 10;
echo $fn();
```
**Type:** Single answer
- [ ] A) 10
- [ ] B) 20
- [ ] C) 5
- [ ] D) An error

**Correct Answer(s):** A
**Explanation:** Arrow functions capture **by value** at definition time. `$x` was 5 → `5 * 2 = 10`. Changing `$x` to 10 afterward doesn't affect the captured value.

---

### Q84: `Closure::bind()` and `Closure::bindTo()` allow changing the `$this` context of a closure.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** These methods rebind a closure to a new object context (like C# delegates or JavaScript's `.bind()`).

---

### Q85: `Closure::fromCallable()` converts a callable (e.g., a function name string) into a `Closure` instance.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `Closure::fromCallable('strlen')` creates a `Closure` wrapping `strlen`. In PHP 8.1, `strlen(...)` is the shorthand.

---

### Q86: A closure defined with `static function()` has access to `$this`.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** A `static` closure does NOT have access to `$this`. It saves memory by not binding to the enclosing object.

---

### Abstract classes

### Q87: An abstract class can contain both abstract and concrete (implemented) methods.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Abstract classes can mix abstract methods (no body) and concrete methods (with body). Subclasses must implement only the abstract ones.

---

### Q88: An abstract class can be instantiated directly with `new AbstractClassName()`.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Abstract classes cannot be instantiated. Only concrete subclasses can.

---

### Q89: What is the key difference between an abstract class and an interface?
**Type:** Single answer
- [ ] A) Abstract classes can have state (properties); interfaces cannot (except constants)
- [ ] B) Interfaces can have constructors; abstract classes cannot
- [ ] C) Abstract classes support multiple inheritance
- [ ] D) Interfaces support properties

**Correct Answer(s):** A
**Explanation:** Abstract classes can have properties, constructors, and implemented methods. Interfaces can only have method signatures and constants.

---

### Q90: A class can extend an abstract class AND implement one or more interfaces simultaneously.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `class Foo extends AbstractBar implements InterfaceA, InterfaceB {}` is perfectly valid.

---

### Q91: If a child class extends an abstract class but doesn't implement all abstract methods, what must the child class be declared as?
**Type:** Single answer
- [ ] A) `final`
- [ ] B) `abstract`
- [ ] C) `static`
- [ ] D) `readonly`

**Correct Answer(s):** B
**Explanation:** If not all abstract methods are implemented, the child must also be declared `abstract`.

---

### Exception and error handling

### Q92: Which of these is the base class for all exceptions in PHP?
**Type:** Single answer
- [ ] A) `Exception`
- [ ] B) `Throwable`
- [ ] C) `Error`
- [ ] D) `RuntimeException`

**Correct Answer(s):** B
**Explanation:** `Throwable` is the root interface. `Exception` (user-level) and `Error` (engine-level) both implement it. `try/catch (\Throwable $e)` catches everything.

---

### Q93: What is the difference between `Exception` and `Error` in PHP?
**Type:** Single answer
- [ ] A) `Exception` is for user-thrown errors; `Error` is for engine-level errors (type errors, division by zero)
- [ ] B) They are identical
- [ ] C) `Error` is deprecated in PHP 8
- [ ] D) `Exception` cannot be caught

**Correct Answer(s):** A
**Explanation:** `Error` is for internal PHP errors (TypeError, ValueError, etc.). `Exception` is for application-level errors. Both extend `Throwable`.

---

### Q94: Can you have multiple `catch` blocks for a single `try` block?
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `try { } catch (TypeError $e) { } catch (RuntimeException $e) { } catch (\Throwable $e) { }` — multiple catches are valid.

---

### Q95: What is the pipe (`|`) catch syntax in PHP 8.0?
**Type:** Single answer
- [ ] A) Catch the first exception type only
- [ ] B) Catch multiple exception types in a single `catch` block
- [ ] C) Re-throw the exception
- [ ] D) Log the exception

**Correct Answer(s):** B
**Explanation:** `catch (TypeError | ValueError $e)` catches either type in one block. Introduced in PHP 8.0.

---

### Q96: The `finally` block is executed:
**Type:** Single answer
- [ ] A) Only if an exception is thrown
- [ ] B) Only if no exception is thrown
- [ ] C) Always, whether or not an exception was thrown
- [ ] D) Only if the exception is caught

**Correct Answer(s):** C
**Explanation:** `finally` always executes — after `try` (if no exception) or after `catch` (if exception). Used for cleanup.

---

### Q97: PHP 8.0 allows non-capturing catches. What does `catch (Exception)` (without `$e`) mean?
**Type:** Single answer
- [ ] A) The exception is silently ignored
- [ ] B) The exception is caught but not assigned to a variable
- [ ] C) The exception is automatically re-thrown
- [ ] D) It's invalid syntax

**Correct Answer(s):** B
**Explanation:** Non-capturing catch: `catch (Exception)` catches the exception but doesn't assign it to a variable. Useful when you don't need the exception object.

---

### Q98: What does `set_exception_handler()` do?
**Type:** Single answer
- [ ] A) Registers a handler for uncaught exceptions
- [ ] B) Replaces the `try/catch` mechanism
- [ ] C) Prevents exceptions from being thrown
- [ ] D) Logs all exceptions automatically

**Correct Answer(s):** A
**Explanation:** `set_exception_handler(callable $handler)` registers a global handler for uncaught exceptions (last resort before script termination).

---

### Traits

### Q99: What is a Trait in PHP?
**Type:** Single answer
- [ ] A) A class that can be instantiated
- [ ] B) A mechanism for code reuse in single-inheritance languages
- [ ] C) A type of interface
- [ ] D) A namespace

**Correct Answer(s):** B
**Explanation:** Traits enable horizontal code reuse — you can insert methods into classes without inheritance.

---

### Q100: Traits can contain properties.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Traits can define properties. If two traits define the same property, there must be no conflict (same visibility and initial value).

---

### Q101: Traits can implement interfaces.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Traits cannot implement interfaces directly. The class using the trait must declare `implements InterfaceName`.

---

### Q102: If two traits define a method with the same name, what keyword resolves the conflict?
**Type:** Single answer
- [ ] A) `resolve`
- [ ] B) `insteadof`
- [ ] C) `override`
- [ ] D) `prefer`

**Correct Answer(s):** B
**Explanation:** `use TraitA, TraitB { TraitA::method insteadof TraitB; }` resolves the conflict by choosing TraitA's version.

---

### Q103: What does `as` do in the context of a trait `use` statement?
**Type:** Single answer
- [ ] A) Changes the trait method's visibility or creates an alias
- [ ] B) Removes the method
- [ ] C) Makes the method abstract
- [ ] D) Imports the trait from a different namespace

**Correct Answer(s):** A
**Explanation:** `use TraitA { method as protected aliasName; }` — creates an alias and/or changes visibility.

---

### Q104: In PHP, the precedence for method resolution is: class method > trait method > inherited method.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** The class's own methods override trait methods, which override inherited methods from parent classes.

---

### Q105: A trait can contain abstract methods.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Traits can declare `abstract` methods that the using class must implement.

---

### Enums

### Q106: What is the difference between a pure enum and a backed enum in PHP 8.1?
**Type:** Single answer
- [ ] A) Pure enums have no associated value; backed enums have a scalar value (string or int) for each case
- [ ] B) Pure enums can only have integer cases
- [ ] C) Backed enums cannot be used in `match` expressions
- [ ] D) There is no difference

**Correct Answer(s):** A
**Explanation:** Pure: `enum Status { case Active; }`. Backed: `enum Status: string { case Active = 'active'; }`. Backed enums have `->value` and `::from()`.

---

### Q107: What is the output?
```php
enum Color: string {
    case Red = 'red';
    case Blue = 'blue';
}
echo Color::Red->value;
```
**Type:** Single answer
- [ ] A) Red
- [ ] B) red
- [ ] C) 0
- [ ] D) An error

**Correct Answer(s):** B
**Explanation:** `->value` returns the backing value of a backed enum case: `'red'`.

---

### Q108: What does `Color::from('red')` do?
**Type:** Single answer
- [ ] A) Returns `Color::Red`
- [ ] B) Returns `'red'`
- [ ] C) Throws a `ValueError` if the value doesn't exist
- [ ] D) Both A and C (returns the case if found, throws ValueError if not)

**Correct Answer(s):** D
**Explanation:** `::from()` returns the matching case. If no case matches, it throws `ValueError`. Use `::tryFrom()` to get `null` instead.

---

### Q109: `Enum::tryFrom()` returns `null` if no matching case is found.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `tryFrom()` is the null-safe version of `from()`.

---

### Q110: Enums can implement interfaces.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `enum Status: string implements Printable { ... }` — enums can implement interfaces.

---

### Q111: Enums can have methods (non-static).
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Enums support methods, static methods, and constants.

---

### Q112: You can use `new` to instantiate an enum case.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Enum cases are accessed via `EnumName::CaseName`, not instantiated with `new`.

---

### Q113: Enums can have constructors.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** B
**Explanation:** Enums cannot have constructors. Their cases are fixed at compile time.

---

### Q114: What does `Color::cases()` return?
**Type:** Single answer
- [ ] A) An array of all case names as strings
- [ ] B) An array of all enum case instances
- [ ] C) An integer count of cases
- [ ] D) An associative array of name => value

**Correct Answer(s):** B
**Explanation:** `::cases()` returns an array of all enum case instances: `[Color::Red, Color::Blue, ...]`.

---

### Q115: Enums support the `use` keyword for traits.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Enums CAN use traits, as long as the trait doesn't define properties (enums don't allow instance properties).

---

### PHP 8.4 Specifics

### Q116: PHP 8.4 property hooks allow defining custom get and set behavior directly on a property without traditional getter/setter methods.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Property hooks use `{ get => ...; set => ...; }` syntax directly on the property declaration.

---

### Q117: What is the output?
```php
class User {
    public string $name {
        set => strtoupper($value);
    }
}
$u = new User();
$u->name = 'alice';
echo $u->name;
```
**Type:** Single answer
- [ ] A) alice
- [ ] B) ALICE
- [ ] C) Alice
- [ ] D) An error

**Correct Answer(s):** B
**Explanation:** The `set` hook transforms the value with `strtoupper()` before storing. Reading returns `ALICE`.

---

### Q118: What does `public private(set) string $name;` mean in PHP 8.4?
**Type:** Single answer
- [ ] A) The property is both public and private simultaneously
- [ ] B) Reading is public, but writing is restricted to the class itself (private)
- [ ] C) The property is only accessible in the constructor
- [ ] D) This is invalid syntax

**Correct Answer(s):** B
**Explanation:** Asymmetric visibility: `public` for reading, `private(set)` restricts writing to the class. External code can read but cannot set.

---

### Q119: Which of the following are valid asymmetric visibility declarations in PHP 8.4? (Select all)
**Type:** Multiple choice
- [ ] A) `public private(set) string $name;`
- [ ] B) `public protected(set) string $name;`
- [ ] C) `protected private(set) string $name;`
- [ ] D) `private public(set) string $name;`

**Correct Answer(s):** A, B, C
**Explanation:** The set-visibility must be the same as or more restrictive than the get-visibility. `private public(set)` is invalid — `public(set)` is less restrictive than `private`.

---

### Q120: `array_any()` in PHP 8.4 returns `true` if at least one element satisfies the callback.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** `array_any([1,2,3], fn($v) => $v > 2)` → `true`. At least one element (3) satisfies the condition.

---

### Q121: What does `array_all()` return in PHP 8.4?
**Type:** Single answer
- [ ] A) `true` if at least one element matches the callback
- [ ] B) `true` only if ALL elements match the callback
- [ ] C) An array of matching elements
- [ ] D) The count of matching elements

**Correct Answer(s):** B
**Explanation:** `array_all()` returns `true` only if every element satisfies the callback. Like `every()` in JavaScript.

---

### Q122: What does `array_find_key()` return in PHP 8.4?
**Type:** Single answer
- [ ] A) The first value satisfying the callback
- [ ] B) The key of the first element satisfying the callback
- [ ] C) All keys of matching elements
- [ ] D) `true` if a key matching the callback exists

**Correct Answer(s):** B
**Explanation:** `array_find_key()` returns the key (not the value) of the first matching element, or `null` if none match.

---

### Q123: In PHP 8.4, `new` expressions can chain method calls without wrapping in parentheses.
```php
$result = new DateTime()->format('Y-m-d');
```
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** PHP 8.4 allows `new Class()->method()` without `(new Class())->method()`.

---

### Q124: Property hooks can define both `get` and `set` independently. You are NOT required to define both.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** You can define only `set`, only `get`, or both. Each is optional.

---

### Q125: What is the output?
```php
$arr = [1, 2, 3, 4, 5];
$result = array_find($arr, fn($v) => $v > 10);
var_dump($result);
```
**Type:** Single answer
- [ ] A) `false`
- [ ] B) `0`
- [ ] C) `NULL`
- [ ] D) An error

**Correct Answer(s):** C
**Explanation:** `array_find()` returns `null` when no element matches the callback.

