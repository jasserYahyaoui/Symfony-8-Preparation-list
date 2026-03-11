---
title: Dependency Injection
---
[Back to index](../docs/legacy-readme.md#table-of-contents)

# Dependency Injection

## Dependency Injection component
- [The DependencyInjection Component - symfony.com](https://symfony.com/doc/8.0/components/dependency_injection.html)

## Service container
- [Service Container - symfony.com](https://symfony.com/doc/8.0/service_container.html)

## Built-in services
- [Service Container - symfony.com](https://symfony.com/doc/8.0/service_container.html)
- [Debugging Services - symfony.com](https://symfony.com/doc/current/service_container/debug.html) (compatible with 8.0)

## Configuration parameters
- [Configuration Parameters - symfony.com](https://symfony.com/doc/8.0/configuration.html#configuration-parameters)

## Services registration (YAML and PHP attributes)
- [Creating/Configuring Services in the Container - symfony.com](https://symfony.com/doc/8.0/service_container.html#creating-configuring-services-in-the-container)

## Service decoration
- [How to Decorate Services - symfony.com](https://symfony.com/doc/8.0/service_container/service_decoration.html)

## Tags
- [How to Work with Service Tags - symfony.com](https://symfony.com/doc/8.0/service_container/tags.html)

## Semantic configuration
- [How to Create Friendly Configuration for a Bundle - symfony.com](https://symfony.com/doc/current/bundles/configuration.html) (compatible with 8.0)
- [How to Load Service Configuration inside a Bundle - symfony.com](https://symfony.com/doc/current/bundles/extension.html) (compatible with 8.0)

## Factories
- [Using a Factory to Create Services - symfony.com](https://symfony.com/doc/8.0/service_container/factories.html)

## Compiler passes
- [How to Work with Compiler Passes in Bundles - symfony.com](https://symfony.com/doc/8.0/service_container/compiler_passes.html)

## Services autowiring
- [Defining Services Dependencies Automatically (Autowiring) Version >= 3.3 - symfony.com](https://symfony.com/doc/8.0/service_container/autowiring.html)
- [Autowiring Types - symfony.com](https://symfony.com/doc/8.0/service_container/autowiring.html#autowiring-other-methods)
- [Troubleshooting Autowiring - symfony.com](https://symfony.com/doc/8.0/service_container/autowiring.html#troubleshooting-autowiring)

## Expressions in configuration
- [How to Inject Values Based on Complex Expressions - symfony.com](https://symfony.com/doc/8.0/service_container/expression_language.html)
- [The ExpressionLanguage Component - symfony.com](https://symfony.com/doc/8.0/components/expression_language.html)

## Advanced Autowiring Attributes
- [AutowireInline - symfony.com](https://symfony.com/doc/8.0/service_container/autowiring.html#autowire-inline) : Permet d'injecter un service défini "à la volée".
- `#[AutoconfigurePackage]` : Facilite la configuration automatique des bundles tiers.

### AutowireInline Example
```php
public function __construct(
    #[AutowireInline(class: AppLogger::class, arguments: ['%kernel.debug%'])]
    private LoggerInterface $logger,
) {}
```

## Synthetic services
- [How to Create a Synthetic Service - symfony.com](https://symfony.com/doc/8.0/testing/service_testing.html#synthetic-services)

## Service locators
- [Service Subscribers & Locators - symfony.com](https://symfony.com/doc/8.0/service_container/service_subscribers_locators.html)
- [Defining a Service Locator - symfony.com](https://symfony.com/doc/8.0/service_container/service_subscribers_locators.html#defining-a-service-locator)
