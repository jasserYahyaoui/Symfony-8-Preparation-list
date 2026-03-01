# Deprecations

This directory contains topics and sections that are **out of scope** for the **Symfony 8.0 Certification Exam**.

They are preserved here for historical reference and to avoid accidental re-introduction into the study materials.

## Contents

| File | Reason for exclusion |
|---|---|
| `http-caching-esi.md` | ESI (Edge Side Includes) is not listed in the Symfony 8 exam topics |
| `php-and-web-security.md` | "PHP and Web Security" as a combined topic no longer exists in the Symfony 8 exam. PHP is now standalone and the old "Web Security" content (SPL, PHP Extensions) is removed from scope. |
| `httpclient-component.md` | The HttpClient component is a standalone third-party HTTP client; it is not listed as an exam topic in the official Symfony 8.0 certification syllabus. |
| `mailer-mime-components.md` | Mailer and Mime components are third-party bridges/integrations; they are **explicitly excluded** from the Symfony 8.0 exam scope. |
| `translation-bridge.md` | The Translation bridge (third-party translation services) is explicitly excluded. Note: the `trans()` Twig filter and basic Intl component usage ARE in scope in their respective topics. |

## Scope Reference

Items are excluded per the mission brief constraints:
> **STRICTLY EXCLUDED:** Doctrine/Database, Symfony UX, Symfony AI, Monolog, AssetMapper/Webpack Encore, PHP Polyfills, Third-party bundles, Third-party bridges (Mailer, Messenger, Translation, etc.)
