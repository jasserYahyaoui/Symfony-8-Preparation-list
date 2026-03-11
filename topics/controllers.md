---
title: Controllers
---
[Back to index](../docs/legacy-readme.md#table-of-contents)

# Controllers
- [Controller - symfony.com](https://symfony.com/doc/8.0/controller.html)

## HttpKernel component and FrameworkBundle
- [The HttpKernel Component - symfony.com](https://symfony.com/doc/8.0/components/http_kernel.html)
- [AbstractController.php - github.com](https://github.com/symfony/framework-bundle/blob/8.0/Controller/AbstractController.php)

## Naming conventions
- [Controller - symfony.com](https://symfony.com/doc/8.0/controller.html)
- [Creating Routes in YAML, XML or PHP files - symfony.com](https://symfony.com/doc/8.0/routing.html#creating-routes-in-yaml-xml-or-php-files)

## The base AbstractController class
- [AbstractController.php - github.com](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Bundle/FrameworkBundle/Controller/AbstractController.php)

## The request
- [The Request and Response Object - symfony.com](https://symfony.com/doc/8.0/controller.html#the-request-and-response-object)
- [Request.php - github.com](https://github.com/symfony/http-foundation/blob/8.0/Request.php)

## The response
- [Response.php - github.com](https://github.com/symfony/http-foundation/blob/8.0/Response.php)

## The cookies
- [The HttpFoundation Component - symfony.com](https://symfony.com/doc/8.0/components/http_foundation.html)

## The session
- [Managing the Session - symfony.com](https://symfony.com/doc/8.0/controller.html#managing-the-session)

## The flash messages
- [Flash Messages - symfony.com](https://symfony.com/doc/8.0/session.html#flash-messages)

## HTTP redirects
- [Redirecting - symfony.com](https://symfony.com/doc/8.0/controller.html#redirecting)

## Internal redirects
- [How to Forward Requests to another Controller - symfony.com](https://symfony.com/doc/8.0/controller/forwarding.html)

## Generate 404 pages
- [Managing Errors and 404 Pages - symfony.com](https://symfony.com/doc/8.0/controller.html#managing-errors-and-404-pages)
- [How to Customize Error Pages - symfony.com](https://symfony.com/doc/8.0/controller/error_pages.html)

## File upload
- [How to Upload Files - symfony.com](https://symfony.com/doc/8.0/controller/upload_file.html)

## Built-in internal controllers
- [How to Render a Template directly from a route - symfony.com](https://symfony.com/doc/8.0/templates.html#rendering-a-template-directly-from-a-route)
- [How to Redirect to Urls and Routes directly from a route - symfony.com](https://symfony.com/doc/8.0/routing.html#redirecting-to-urls-and-routes-directly-from-a-route)

## Modern Request Data Mapping
- [Mapping Request Data - symfony.com](https://symfony.com/doc/8.0/controller.html#mapping-request-data)
- `#[MapQueryParameter]` : Extrait et caste un paramètre de la query string.
- `#[MapQueryString]` : Extrait et caste les paramètres de la query string dans un objet.
- `#[MapRequestPayload]` : Désérialise le corps de la requête (JSON/XML) en objet DTO.

### Example
```php
public function list(
    #[MapQueryParameter] int $page = 1,
    #[MapRequestPayload] UserDTO $data
): Response { ... }
```

## Argument value resolvers
- [Action Value Resolvers - symfony.com](https://symfony.com/doc/current/controller/value_resolver.html) (compatible with 8.0)
- [Extending Action Argument Resolving - symfony.com](https://symfony.com/doc/8.0/controller/value_resolver.html)
- [New in Symfony 6.3: Targeted Value Resolvers - symfony.com](https://symfony.com/blog/new-in-symfony-6-3-targeted-value-resolvers)
