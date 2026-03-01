## Firewalls - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```yaml
security:
    firewalls:
        # Firewall for API routes
        api:
            pattern: ^/api
            stateless: true
            provider: in_memory
            json_login:
                check_path: /api/login

        # Firewall for web routes
        main:
            lazy: true
            provider: in_memory
            form_login:
                login_path: /login
                check_path: /login
            logout:
                path: /logout

        # No security for dev tools
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
```

**Key concepts:**
- Firewalls are checked top-to-bottom. First match wins.
- `stateless: true` = No session (for APIs).
- `lazy: true` = User is loaded only when needed.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Firewalls"](https://symfonycasts.com/search?q=firewalls)
