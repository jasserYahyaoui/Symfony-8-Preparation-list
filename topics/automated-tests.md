---
title: Automated Tests
---
[Back to index](../readme.md#table-of-contents)

# Automated Tests
 -  [Testing - symfony.com](https://symfony.com/doc/8.0/testing.html)
 -  [PHPUnit 9.6 Manual - phpunit.readthedocs.io](https://phpunit.readthedocs.io/en/9.6/)

> Note: PHPUnit Bridge is not included in the exam.

## Unit tests with PHPUnit
-  [Unit tests - symfony.com](https://symfony.com/doc/8.0/testing.html#unit-tests)
-  [Writing Tests for PHPUnit - phpunit.readthedocs.io](https://phpunit.readthedocs.io/en/9.6/writing-tests-for-phpunit.html)

## Functional tests with PHPUnit
-  [Functional tests - symfony.com](https://symfony.com/doc/8.0/testing.html#functional-tests)
> **[NOTE]** "Configuring a Database for Tests" (Doctrine fixtures, etc.) is **excluded** from this exam scope.
-  [Fixtures - phpunit.readthedocs.io](https://phpunit.readthedocs.io/en/9.6/fixtures.html)
-  [WebTestCase abstract class - github.com](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Bundle/FrameworkBundle/Test/WebTestCase.php)

## Client object
-  [Making Requests - symfony.com](https://symfony.com/doc/8.0/testing.html#making-requests)
-  [KernelBrowser - github.com](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Bundle/FrameworkBundle/KernelBrowser.php)

## Crawler object (CssSelector and DomCrawler components)
-  [The DomCrawler Component - symfony.com](https://symfony.com/doc/8.0/components/dom_crawler.html)
-  [The CssSelector Component - symfony.com](https://symfony.com/doc/8.0/components/css_selector.html)
-  [Write Your First Application Test - symfony.com](https://symfony.com/doc/8.0/testing.html#write-your-first-application-test)
-  [The DOM Crawler - symfony.com](https://symfony.com/doc/8.0/testing/dom_crawler.html)
-  [Crawler class - github.com](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Component/DomCrawler/Crawler.php)

## Profiler object (WebProfiler bundle)
-  [The WebProfilerBundle - symfony.com](https://symfony.com/doc/8.0/profiler.html)
-  [How to Use the Profiler in a Functional Test - symfony.com](https://symfony.com/doc/8.0/testing/profiling.html)

## Framework objects access
-  [Retrieving Services in the Test - symfony.com](https://symfony.com/doc/8.0/testing.html#retrieving-services-in-the-test)

## Client configuration
-  [Set-up your Test Environment - symfony.com](https://symfony.com/doc/8.0/testing.html#set-up-your-test-environment)

## Request and response objects introspection
-  [Accessing Internal Objects - symfony.com](https://symfony.com/doc/8.0/testing.html#accessing-internal-objects)

## PHPUnit assertions
-  [Assertions - phpunit.readthedocs.io](https://phpunit.readthedocs.io/en/9.6/assertions.html)
-  [BrowserKit Assertions - symfony.com](https://symfony.com/doc/8.0/testing.html#testing-the-response)

## Handling legacy deprecated code
While the PHPUnit Bridge component itself is out of scope, the exam covers the handling of deprecated code, notably via the `SYMFONY_DEPRECATIONS_HELPER` environment variable.

-  [SYMFONY_DEPRECATIONS_HELPER - symfony.com](https://symfony.com/doc/8.0/components/phpunit_bridge.html#configuration)
