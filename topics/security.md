---
title: Security
---
[Back to index](../readme.md#table-of-contents)

# Security

## Security Core, CSRF and PasswordHasher components
- [The Security Component - symfony.com](https://symfony.com/doc/8.0/components/security.html)
- [The CSRF Protection - symfony.com](https://symfony.com/doc/8.0/security/csrf.html)
- [The PasswordHasher Component - symfony.com](https://symfony.com/doc/8.0/components/password_hasher.html)

## Authentication
- [Authentication - symfony.com](https://symfony.com/doc/8.0/security.html#authentication)
- [How to Build a Traditional Login Form - symfony.com](https://symfony.com/doc/8.0/security/form_login_setup.html)
- [User Providers - symfony.com](https://symfony.com/doc/8.0/security/user_providers.html) (Exam scope: focus on the provider concept; Doctrine/database specifics are out of scope.)
- [How to Impersonate a User - symfony.com](https://symfony.com/doc/8.0/security/impersonating_user.html)
- [How to Authenticate Users with API Keys - symfony.com](https://symfony.com/doc/8.0/security/api_key_authentication.html)

## Stateless CSRF Protection
- [Stateless CSRF Protection - symfony.com](https://symfony.com/doc/8.0/security/csrf.html#stateless-csrf-protection)
- Allows CSRF protection without using PHP sessions, ideal for stateless APIs.
- Configuration: `framework.csrf_protection.stateless_token_ids` or via `logout` / `firewall` settings.

## Remember Me
- [How to Add "Remember Me" Login Functionality - symfony.com](https://symfony.com/doc/8.0/security/remember_me.html)
- [RememberMeBadge - symfony.com](https://symfony.com/doc/8.0/security/remember_me.html#using-the-rememberme-badge)

## Authorization
- [Denying Access, Roles and other Authorization - symfony.com](https://symfony.com/doc/8.0/security.html#denying-access-roles-and-other-authorization)

## Configuration
- [Security - symfony.com](https://symfony.com/doc/8.0/security.html)

## Providers
- [How to Write a Custom Authenticator - symfony.com](https://symfony.com/doc/8.0/security/custom_authenticator.html)
- [How to Create a custom User Provider - symfony.com](https://symfony.com/doc/8.0/security/user_providers.html#creating-a-custom-user-provider)

## Firewalls
- [How to Restrict Firewalls to a Specific Request - symfony.com](https://symfony.com/doc/8.0/security/firewall_restriction.html)

## Users
- [User Providers - symfony.com](https://symfony.com/doc/8.0/security/user_providers.html)

## Password hashers
- [Password Hashing and Verification - symfony.com](https://symfony.com/doc/8.0/security/passwords.html)
- [Registering the User: Hashing Passwords - symfony.com](https://symfony.com/doc/8.0/security.html#registering-the-user-hashing-passwords)
- [Password Hashing and Verification (current) - symfony.com](https://symfony.com/doc/current/security/passwords.html) (compatible with 8.0)

## Roles
- [Roles - symfony.com](https://symfony.com/doc/8.0/security.html#roles)

## Access Control Rules
- [How Does the Security access_control Work? - symfony.com](https://symfony.com/doc/8.0/security/access_control.html)

## Authenticators, Passports and Badges
- [Authenticating Users - symfony.com](https://symfony.com/doc/8.0/security.html#security-authenticators)
- [How to Write a Custom Authenticator - symfony.com](https://symfony.com/doc/8.0/security/custom_authenticator.html)
- [Authenticator & The Passport - symfonycasts.com](https://symfonycasts.com/screencast/symfony-security/passport)
- [Passport Badges - symfony.com](https://symfony.com/doc/8.0/security/custom_authenticator.html#passport-badges)

## Voters and voting strategies
- [How to Use Voters to Check User Permissions - symfony.com](https://symfony.com/doc/8.0/security/voters.html)

## Symfony 8.0 notes
- [Security Core, CSRF and PasswordHasher components] : These three components are now explicitly grouped in the exam topic.
- [Authenticators, Passports and Badges] : The "Guard" system is long gone ([Guard component deprecation](https://symfony.com/blog/new-in-symfony-5-3-guard-component-deprecation)); the exam focuses entirely on the Authenticator/Passport system introduced in Symfony 5.3 and refined since.
- [Password hashers] : Ensure you use the `PasswordHasher` component and not the legacy `UserPasswordEncoder`.
