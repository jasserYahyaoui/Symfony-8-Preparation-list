---
title: PHP
---
[Back to index](../readme.md#table-of-contents)

# PHP

## PHP API up to PHP 8.4 version
- [PHP Watch by version](https://php.watch/versions)
  - [PHP 8.4: What's New and Changed](https://php.watch/versions/8.4)
  - [PHP 8.3: What's New and Changed](https://php.watch/versions/8.3)
  - [PHP 8.2: What's New and Changed](https://php.watch/versions/8.2)
  - [PHP 8.1: What's New and Changed](https://php.watch/versions/8.1)
  - [PHP 8.0: What's New and Changed](https://php.watch/versions/8.0)
- [PHP Releases](https://www.php.net/releases/)
  - [PHP 8.4](https://www.php.net/releases/8.4/en.php)
  - [PHP 8.3](https://www.php.net/releases/8.3/en.php)
  - [PHP 8.2](https://www.php.net/releases/8.2/en.php)

## Object Oriented Programming
- [Classes and Objects - php.net](https://www.php.net/manual/en/language.oop5.php)

## Namespaces
- [Namespaces - php.net](https://www.php.net/manual/en/language.namespaces.php)
- [Declaring Namespaces - php.net](https://www.php.net/manual/en/language.namespaces.definition.php)
- [Using Namespaces: Aliasing/Importing - php.net](https://www.php.net/manual/en/language.namespaces.importing.php)
- [PHP Namespaces in 120 Seconds - symfonycasts.com](https://symfonycasts.com/screencast/php-namespaces-in-120-seconds)

## Attributes
- [Attributes - php.net](https://www.php.net/manual/en/language.attributes.php)
- [Attributes Overview - php.net](https://www.php.net/manual/en/language.attributes.overview.php)

## Interfaces
- [Object Interfaces - php.net](https://www.php.net/manual/en/language.oop5.interfaces.php)

## Anonymous functions and closures
- [Anonymous functions - php.net](https://www.php.net/manual/en/functions.anonymous.php)
- [Closure - php.net](https://www.php.net/manual/en/class.closure.php)

## Abstract classes
- [Class Abstraction - php.net](https://www.php.net/manual/en/language.oop5.abstract.php)

## Exception and error handling
- [Exceptions - php.net](https://www.php.net/manual/en/language.exceptions.php)

## Traits
- [Traits - php.net](https://www.php.net/manual/en/language.oop5.traits.php)

## Enums
- [Enumerations - php.net](https://www.php.net/manual/en/language.types.enumerations.php)

## Symfony 8.0 notes
- **PHP 8.3**: typed class constants + readonly deep-cloning; **PHP 8.4**: property hooks + asymmetric visibility.
- [Attributes] : Heavily used in Symfony 8 for Routing, DI, and Validation.
- **Enums**: focus on PHP enums (pure vs backed) and type-safety concepts.

## PHP 8.4 Specifics
- [Property Hooks](https://www.php.net/manual/en/language.oop5.property-hooks.php) : Getters/Setters natifs.
- [Asymmetric Visibility](https://www.php.net/manual/en/language.oop5.visibility.php#language.oop5.visibility-asymmetric) : `public private(set) string $name;`
- [New Array Functions](https://www.php.net/manual/en/ref.array.php) : `array_find()`, `array_find_key()`, `array_any()`, `array_all()`.

### Syntax Example (Property Hooks)
```php
class User {
    public private(set) string $username {
        set => strtolower($value);
        get => ucfirst($this->username);
    }
}
```
