## Authenticators - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
// A Passport contains:
// 1. A UserBadge (identifies the user)
// 2. Credentials (validates authentication)
// 3. Additional Badges (CSRF, Remember-Me, etc.)

use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;

// In a custom authenticator:
public function authenticate(Request $request): Passport
{
    $email = $request->toArray()['email'] ?? '';
    $password = $request->toArray()['password'] ?? '';

    return new Passport(
        new UserBadge($email),                // WHO is authenticating
        new PasswordCredentials($password),    // HOW they prove identity
        [
            new CsrfTokenBadge('login', $request->toArray()['_csrf_token'] ?? ''),
            new RememberMeBadge(),
        ],
    );
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Authenticators"](https://symfonycasts.com/search?q=authenticators)
