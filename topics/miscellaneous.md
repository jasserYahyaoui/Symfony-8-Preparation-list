---
title: Miscellaneous
---
[Back to index](../docs/legacy-readme.md#table-of-contents)

# Miscellaneous

> Note: [Messenger](messenger.md) is now a standalone top-level exam topic in Symfony 8 and is no longer part of "Miscellaneous".

## Configuration (including DotEnv and ExpressionLanguage components)
-  [Configuring Symfony - symfony.com](https://symfony.com/doc/8.0/configuration.html)
-  [The Config Component - symfony.com](https://symfony.com/doc/8.0/components/config.html)
-  [Caching based on Resources - symfony.com](https://symfony.com/doc/8.0/components/config/caching.html)
-  [Loading Resources - symfony.com](https://symfony.com/doc/8.0/components/config/resources.html)
-  [How to Create Friendly Configuration for a Bundle - symfony.com](https://symfony.com/doc/8.0/bundles/configuration.html)
-  [How to Load Service Configuration inside a Bundle - symfony.com](https://symfony.com/doc/8.0/bundles/extension.html)
-  [How to Simplify Configuration of Multiple Bundles - symfony.com](https://symfony.com/doc/8.0/bundles/prepend_extension.html)
-  [The Dotenv Component - symfony.com](https://symfony.com/doc/8.0/components/dotenv.html)
-  [The ExpressionLanguage Component - symfony.com](https://symfony.com/doc/8.0/components/expression_language.html)
-  [Dumping and Manipulating the AST of Expressions - symfony.com](https://symfony.com/doc/8.0/components/expression_language/ast.html)
-  [Caching Expressions Using Parser Caches - symfony.com](https://symfony.com/doc/8.0/components/expression_language/caching.html)
-  [Extending the ExpressionLanguage - symfony.com](https://symfony.com/doc/8.0/components/expression_language/extending.html)
-  [The Expression Syntax - symfony.com](https://symfony.com/doc/8.0/components/expression_language/syntax.html)
-  [How to Inject Values Based on Complex Expressions - symfony.com](https://symfony.com/doc/8.0/service_container/expression_language.html)
-  [Expression - symfony.com](https://symfony.com/doc/8.0/reference/constraints/Expression.html)

## Error handling
-  [How to Customize Error Pages - symfony.com](https://symfony.com/doc/8.0/controller/error_pages.html)
-  [ErrorHandler Component - github.com](https://github.com/symfony/error-handler)

## Code debugging
-  [The Debug Component - symfony.com](https://symfony.com/doc/8.0/components/debug.html)
-  [Troubleshooting Problems - symfony.com](https://symfony.com/doc/current/the-fast-track/en/5-debug.html) (compatible with 8.0)
-  [Profiler - symfony.com](https://symfony.com/doc/8.0/profiler.html)

## Deployment best practices
-  [How to Deploy a Symfony Application - symfony.com](https://symfony.com/doc/8.0/deployment.html)
-  [Performance - symfony.com](https://symfony.com/doc/8.0/performance.html)

## Web Profiler, Web Debug Toolbar and Data collectors
-  [Profiler - symfony.com](https://symfony.com/doc/8.0/profiler.html)
-  [Profiler: Your Debugging Best Friend - symfonycasts.com](https://symfonycasts.com/screencast/symfony/profiler)
-  [How to Create a custom Data Collector - symfony.com](https://symfony.com/doc/8.0/profiler/data_collector.html)

## Internationalization and localization
-  [Internationalization - symfony.com](https://symfony.com/doc/8.0/best_practices.html#internationalization)
-  [Localizing an Application - symfony.com](https://symfony.com/doc/current/the-fast-track/en/28-intl.html) (compatible with 8.0)
-  [The Intl Component - symfony.com](https://symfony.com/doc/8.0/components/intl.html)
> **[NOTE]** The Translation bridge (third-party integrations) is **excluded** from the exam. Basic `{% trans %}` / `|trans` Twig usage is covered in [templating-with-twig.md](templating-with-twig.md). Full Translation component details are archived in [`deprecations/translation-bridge.md`](../deprecations/translation-bridge.md).
-  Note: Intl component utilities to access ICU data are not included in the exam.

## HTTP Caching (reverse proxies, expiration, validation)
-  [HTTP Cache - symfony.com](https://symfony.com/doc/8.0/http_cache.html)
-  [Validation with the ETag Header - symfony.com](https://symfony.com/doc/8.0/http_cache/validation.html)
-  [Expiration with the Cache-Control Header - symfony.com](https://symfony.com/doc/8.0/http_cache/expiration.html)
-  Note: **ESI (Edge Side Includes) is NOT included in the exam.**
-  See also: [http-caching.md](http-caching.md)

## Components: Cache, Clock, EventDispatcher, Filesystem, Finder, Process, PropertyAccess, Runtime, Serializer
> **[OUT OF SCOPE]** Mailer, Mime (third-party bridges) have been archived in [`deprecations/mailer-mime-components.md`](../deprecations/mailer-mime-components.md). The Translation bridge is archived in [`deprecations/translation-bridge.md`](../deprecations/translation-bridge.md).
-  [The Cache Component - symfony.com](https://symfony.com/doc/8.0/components/cache.html)
-  [Cache Invalidation - symfony.com](https://symfony.com/doc/8.0/components/cache/cache_invalidation.html)
-  [The Clock Component - symfony.com](https://symfony.com/doc/8.0/components/clock.html)
-  [The EventDispatcher Component - symfony.com](https://symfony.com/doc/8.0/components/event_dispatcher.html)
-  [The EventDispatcher (and Events) - symfony.com](https://symfony.com/doc/8.0/event_dispatcher.html) (compatible with 8.0)
-  [The Filesystem Component - symfony.com](https://symfony.com/doc/8.0/components/filesystem.html)
-  [The Finder Component - symfony.com](https://symfony.com/doc/8.0/components/finder.html)
-  [The Process Component - symfony.com](https://symfony.com/doc/8.0/components/process.html)
-  [The PropertyAccess Component - symfony.com](https://symfony.com/doc/8.0/components/property_access.html)
-  [The Runtime Component - symfony.com](https://symfony.com/doc/8.0/components/runtime.html)
-  [The Serializer Component - symfony.com](https://symfony.com/doc/8.0/components/serializer.html)
-  [How to Use the Serializer - symfony.com](https://symfony.com/doc/8.0/serializer.html)

## Symfony 8.0 notes
- [HTTP Caching] : ESI is explicitly excluded from the Symfony 8 certification.
- [Messenger] : Moved to its own top-level topic.
- [Lock] : Removed from the official exam topics.
