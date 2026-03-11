---
title: Templating with Twig
---
[Back to index](../docs/legacy-readme.md#table-of-contents)

# Templating with Twig
- [Creating and Using Templates - symfony.com](https://symfony.com/doc/8.0/templates.html)

## TwigBundle
- [TwigBundle Configuration Reference - symfony.com](https://symfony.com/doc/8.0/reference/configuration/twig.html)

## Twig syntax up to 3.22 version
- [Twig for Template Designers - twig.symfony.com](https://twig.symfony.com/doc/3.x/templates.html)
- [Twig 3.0 Release Notes - symfony.com](https://symfony.com/blog/twig-3-0-released)

## Auto escaping
- [The autoescape Tag - twig.symfony.com](https://twig.symfony.com/doc/3.x/tags/autoescape.html)
- [The escape Filter - twig.symfony.com](https://twig.symfony.com/doc/3.x/filters/escape.html)

## Template inheritance
- [Template Inheritance - twig.symfony.com](https://twig.symfony.com/doc/3.x/templates.html#template-inheritance)
  
## Global variables
- [How to Access the User, Request, Session & more in Twig via the app Variable - symfony.com](https://symfony.com/doc/8.0/templates.html#the-app-global-variable)
- [How to Inject Variables into all Templates (i.e. global Variables) - symfony.com](https://symfony.com/doc/8.0/templates.html#global-variables)

## Filters and functions
- [Filters - twig.symfony.com](https://twig.symfony.com/doc/3.x/filters/index.html)
- [Functions - twig.symfony.com](https://twig.symfony.com/doc/3.x/functions/index.html)

## Template includes
- [Including Templates - symfony.com](https://symfony.com/doc/8.0/templates.html#including-templates)

## Loops and conditions
- [For - twig.symfony.com](https://twig.symfony.com/doc/3.x/tags/for.html)

## URLs generation
- [Twig Reference - twig.symfony.com](https://twig.symfony.com/doc/3.x/) (path(), url(), asset(), etc.)

## Controller rendering
- [How to Embed Controllers in a Template - symfony.com](https://symfony.com/doc/8.0/templates.html#embedding-controllers)

## Translations and pluralization
- [Translations in Templates - symfony.com](https://symfony.com/doc/8.0/translation.html#translations-in-templates)
- [Pluralization](https://symfony.com/doc/8.0/reference/formats/message_format.html#pluralization)

## String interpolation
- [String Interpolation - twig.symfony.com](https://twig.symfony.com/doc/3.x/templates.html#string-interpolation)

## Assets management
> **[PARTIALLY OUT OF SCOPE]** Advanced asset management tools (AssetMapper, Webpack Encore) are **excluded** from the Symfony 8.0 exam. The official exam scope is limited to the basic `asset()` Twig function provided by the `AssetComponent`.
- [The Asset Component - symfony.com](https://symfony.com/doc/8.0/components/asset.html)
- [Linking to CSS/JavaScript/Images from Twig - symfony.com](https://symfony.com/doc/8.0/templates.html#linking-to-css-javascript-images-from-twig)

## Macros
- [Macros - twig.symfony.com](https://twig.symfony.com/doc/3.x/tags/macro.html)

## Custom extensions (filters, functions, tests, operators)
- [How to Write a custom Twig Extension - symfony.com](https://symfony.com/doc/8.0/templating/twig_extension.html)
- [Extending Twig - twig.symfony.com](https://twig.symfony.com/doc/3.x/advanced.html)

## Debugging variables
- [The Dump Twig Utilities - symfony.com](https://symfony.com/doc/8.0/templates.html#the-dump-twig-utilities)

## Symfony 8.0 notes
- **Twig syntax up to 3.22 version**: The exam covers Twig up to version 3.22.
- **Assets management**: Only the basic `asset()` function is in scope. AssetMapper and Webpack Encore are **explicitly excluded** from the Symfony 8.0 certification.
- **Translations**: Basic `{% trans %}` tag and `trans()` filter are in scope as part of Twig templating. Full Translation component / bridge configuration is archived in [`deprecations/translation-bridge.md`](../deprecations/translation-bridge.md).
