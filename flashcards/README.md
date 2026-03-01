# Flashcards — Symfony 8.0 Certification

> **Objective:** Active recall decks aligned 1:1 with the official Symfony certification exam topics.
> Every deck is written in English, uses the `**Q:** / **A:** / **Code Snippet:**` format, and covers **5–15+ distinct cards per sub-heading**.

---

## Usage

1. **Daily review**: Open one deck per day. For each card, answer the question aloud before reading the answer.
2. **Spaced repetition**: Mark cards `[hard]`, `[ok]`, `[easy]`. Revisit hard cards the next day.
3. **Active recall**: Never just read — always attempt the answer before revealing it.
4. **Code drills**: For every code snippet, type it yourself from memory.

---

## Available Decks

| Deck | Lines | Coverage highlights |
|------|------:|---------------------|
| [php.md](php.md) | 457 | PHP 8.2–8.4 OOP, Attributes, Enums, Fibers, Closures, Namespaces |
| [http.md](http.md) | 437 | HTTP spec, all status families, cookies/SameSite, content negotiation, language detection |
| [symfony-architecture.md](symfony-architecture.md) | 685 | HttpFoundation bags, Flex, BC promise, Events, PSRs, naming, release cycle |
| [controllers.md](controllers.md) | 691 | AbstractController API, Request/Response, session, flash, PRG, file upload, value resolvers |
| [routing.md](routing.md) | 488 | Route attributes, requirements, URL generation, subdomains, locale guessing, conditions |
| [templating-with-twig.md](templating-with-twig.md) | 689 | Syntax, auto-escaping, inheritance, globals, filters/functions, macros, custom extensions |
| [forms.md](forms.md) | 592 | Form types, rendering, theming, CSRF, file upload, data transformers, events, OptionsResolver |
| [data-validation.md](data-validation.md) | 342 | Validator component, built-in constraints, groups, GroupSequence, validation messages, Callback, custom validators |
| [dependency-injection.md](dependency-injection.md) | 635 | Container, parameters, autowiring attributes, decoration, tags, factories, compiler passes, synthetic services, locators |
| [security.md](security.md) | 515 | Firewalls, Passport/Badges, Voters, UserInterface, password hashing, Remember Me, CSRF, access_control |
| [messenger.md](messenger.md) | 568 | Message bus, transports, routing, stamps/envelopes, workers, retries, middleware, events |
| [console.md](console.md) | 462 | AsCommand, arguments, all 5 option modes, SymfonyStyle, helpers, events, verbosity levels |
| [automated-tests.md](automated-tests.md) | 383 | Unit/functional tests, mocking, data providers, client/crawler/profiler, PHPUnit assertions |
| [http-caching.md](http-caching.md) | 308 | HttpCache component, expiration, validation (ETag/Last-Modified), Vary, stale-while-revalidate |
| [miscellaneous.md](miscellaneous.md) | 563 | DotEnv (all priorities + processors), ExpressionLanguage, ErrorHandler, deployment, Intl, components |

---

## Out-of-scope topics (not in any deck)

The following are explicitly excluded from the Symfony 8.0 exam and have been archived in [`/deprecations/`](../deprecations/):

- Doctrine / Database layer
- Symfony UX / AssetMapper / Webpack Encore
- Mailer / Mime components (as bridges)
- Translation bridge (the `|trans` filter in Twig IS in scope)
- ESI (Edge Side Includes)
- Monolog (PSR-3 Logger interface IS in scope)
- Symfony AI / LLM components

---

## Deck format reference

```markdown
### Sub-heading Name

**Q: [One specific, granular exam-style question]**
**A:** [Precise technical answer]
**Code Snippet:** ```php
// Relevant code example, or N/A
```
```

> Each sub-heading has **5–15+ cards**, each targeting exactly ONE concept or fact.
