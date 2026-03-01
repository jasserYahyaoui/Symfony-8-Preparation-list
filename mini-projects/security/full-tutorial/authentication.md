## Authentication - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Generate the User class and auth system.

```bash
php bin/console make:user
# Name: User, Store in DB: no (choose "none" for simplicity, or "yes" if using Doctrine)
# Unique field: email, Hashed passwords: yes
```

**Step 2:** Create an in-memory user provider in `config/packages/security.yaml`:

```yaml
security:
    password_hashers:
        Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface: 'auto'

    providers:
        in_memory:
            memory:
                users:
                    admin@test.com:
                        password: '$2y$13$...'  # Use: php bin/console security:hash-password
                        roles: ['ROLE_ADMIN']
                    user@test.com:
                        password: '$2y$13$...'
                        roles: ['ROLE_USER']

    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            lazy: true
            provider: in_memory
            json_login:
                check_path: /api/login
            logout:
                path: /api/logout

    access_control:
        - { path: ^/security/admin, roles: ROLE_ADMIN }
        - { path: ^/security/profile, roles: ROLE_USER }
```

**Step 3:** Hash passwords:

```bash
php bin/console security:hash-password
# Enter: "password123" → copy the hash into the YAML above
```

**Step 3b:** Create the security controller:

```bash
touch src/Controller/SecurityTopic/AuthController.php
```

```php
<?php

namespace App\Controller\SecurityTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/security')]
class AuthController extends AbstractController
{
    #[Route('/profile', name: 'security_profile')]
    public function profile(): JsonResponse
    {
        $user = $this->getUser();
        return $this->json([
            'email' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route('/admin', name: 'security_admin')]
    public function admin(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to the admin area!',
            'user' => $this->getUser()->getUserIdentifier(),
        ]);
    }

    #[Route('/public', name: 'security_public')]
    public function publicEndpoint(): JsonResponse
    {
        return $this->json(['message' => 'This is public, no auth needed.']);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/security/public
curl https://127.0.0.1:8000/security/profile  # 401 Unauthorized
curl -X POST -H "Content-Type: application/json" \
     -d '{"username":"user@test.com","password":"password123"}' \
     https://127.0.0.1:8000/api/login
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Authentication"](https://symfonycasts.com/search?q=authentication)
