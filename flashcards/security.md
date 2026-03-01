# Flashcards : Security (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every configuration key, class, and edge case covered.

---

### Core concepts & configuration

**Q: What is the central configuration file for Symfony Security and what are its top-level sections?**
**A:** `config/packages/security.yaml`. Key sections: `password_hashers`, `providers`, `firewalls`, `access_control`, `role_hierarchy`.
**Code Snippet:**
```yaml
security:
    password_hashers:
        App\Entity\User: 'auto'
    providers:
        app_user_provider:
            entity: { class: App\Entity\User, property: email }
    firewalls:
        main:
            lazy: true
            provider: app_user_provider
    access_control:
        - { path: ^/admin, roles: ROLE_ADMIN }
```

---

**Q: What does `lazy: true` on a firewall do?**
**A:** Delays loading the security token until it is actually needed. Avoids unnecessary session access on fully public pages that happen to fall under the firewall's pattern.
**Code Snippet:**
```yaml
firewalls:
    main:
        lazy: true
```

---

**Q: What is a Symfony firewall and what does it protect?**
**A:** A firewall maps a URL pattern (or request matcher) to a security configuration (authenticators, provider, stateless setting). Multiple firewalls can exist; the first matching one wins.
**Code Snippet:**
```yaml
firewalls:
    api:
        pattern: ^/api
        stateless: true
        custom_authenticators:
            - App\Security\ApiKeyAuthenticator
    main:
        lazy: true
        form_login: ~
```

---

**Q: What does `stateless: true` on a firewall mean?**
**A:** No session is created for authentication. The credentials are verified on every request. Mandatory for REST APIs using tokens (JWT, API key).
**Code Snippet:**
```yaml
firewalls:
    api:
        pattern: ^/api
        stateless: true
```

---

**Q: What does the `dev` firewall do and why must it come first?**
**A:** The `dev` firewall is a pattern matching `^/(_(profiler|wdt)|css|images|js)/` — it disables security for dev tools. It must be first because firewalls match in order and the first match wins.
**Code Snippet:**
```yaml
firewalls:
    dev:
        pattern: ^/(_(profiler|wdt)|css|images|js)/
        security: false
    main:
        lazy: true
```

---

### Authentication (Authenticators / Passports / Badges)

**Q: What is a `Passport` in Symfony Security?**
**A:** An object returned by `Authenticator::authenticate()`. It holds the user (via `UserBadge`) and credentials (via `PasswordCredentials`, `SelfValidatingPassport`, etc.). Badges validate different aspects.
**Code Snippet:**
```php
public function authenticate(Request $request): Passport {
    return new Passport(
        new UserBadge($request->request->get('email')),
        new PasswordCredentials($request->request->get('password')),
        [new CsrfTokenBadge('login', $request->request->get('_csrf_token'))]
    );
}
```

---

**Q: What are the 5 main Badge types and what does each validate?**
**A:**
1. `UserBadge` — resolves the user from an identifier
2. `PasswordCredentials` — validates a plain password against the user's hash
3. `CustomCredentials` — custom validation callable
4. `CsrfTokenBadge` — validates a CSRF token
5. `RememberMeBadge` — triggers "remember me" cookie creation
**Code Snippet:**
```php
new Passport(
    new UserBadge($email, fn($id) => $this->repo->findByEmail($id)),
    new PasswordCredentials($password),
    [new CsrfTokenBadge('login', $csrfToken), new RememberMeBadge()]
);
```

---

**Q: What is `SelfValidatingPassport` and when do you use it?**
**A:** A passport that has no credential badge — often used for API tokens where the `UserBadge` callback already validates the token and resolves the user.
**Code Snippet:**
```php
return new SelfValidatingPassport(
    new UserBadge($apiKey, function(string $key): User {
        $user = $this->userRepo->findByApiKey($key);
        if (!$user) throw new CustomUserMessageAuthenticationException('Invalid API key.');
        return $user;
    })
);
```

---

**Q: What methods must a custom Authenticator implement?**
**A:**
- `supports(Request $request): bool` — should this authenticator handle this request?
- `authenticate(Request $request): Passport` — build the passport
- `onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response`
- `onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response`
**Code Snippet:**
```php
class ApiKeyAuthenticator extends AbstractAuthenticator {
    public function supports(Request $request): bool {
        return $request->headers->has('X-API-KEY');
    }
    public function authenticate(Request $request): Passport {
        $apiKey = $request->headers->get('X-API-KEY');
        return new SelfValidatingPassport(new UserBadge($apiKey, ...));
    }
    // ...
}
```

---

**Q: What does `CustomUserMessageAuthenticationException` do vs `AuthenticationException`?**
**A:** `AuthenticationException` shows a generic message. `CustomUserMessageAuthenticationException` allows you to set a user-visible message (displayed in the login error template) without exposing internals.
**Code Snippet:**
```php
throw new CustomUserMessageAuthenticationException('Account is suspended for 24 hours.');
```

---

**Q: What is the `form_login` shortcut in `security.yaml` and what does it configure?**
**A:** A built-in authenticator for HTML login forms. Configures login path, check path, CSRF protection, default success/failure targets.
**Code Snippet:**
```yaml
firewalls:
    main:
        form_login:
            login_path: app_login
            check_path: app_login
            default_target_path: /dashboard
            csrf_token_generator: security.csrf.token_manager
```

---

**Q: What is `http_basic` authentication and when would you use it?**
**A:** Built-in authenticator that reads `Authorization: Basic base64(user:pass)` header. Simple, stateless, suitable for machine-to-machine or development/test scenarios.
**Code Snippet:**
```yaml
firewalls:
    api:
        http_basic:
            realm: 'Secured Area'
```

---

### Authorization (Roles, Access Control, Voters)

**Q: What is the difference between `ROLE_USER` and `IS_AUTHENTICATED_FULLY`?**
**A:** `ROLE_USER` is a role you assign to users. `IS_AUTHENTICATED_FULLY` is a special attribute that is true only if the user authenticated during THIS request (not via remember-me cookie). `IS_REMEMBERED` is true only for remember-me authentication.
**Code Snippet:**
```yaml
access_control:
    - { path: ^/account/delete, roles: IS_AUTHENTICATED_FULLY }
    - { path: ^/account, roles: IS_REMEMBERED }
```

---

**Q: What is `role_hierarchy` and how does it work?**
**A:** Defines role inheritance. A user with `ROLE_ADMIN` automatically gets all roles listed under it. Symfony expands roles at access check time.
**Code Snippet:**
```yaml
security:
    role_hierarchy:
        ROLE_ADMIN: [ROLE_USER, ROLE_MODERATOR]
        ROLE_SUPER_ADMIN: ROLE_ADMIN
```

---

**Q: What is the difference between `access_control` and `denyAccessUnlessGranted()` in a controller?**
**A:** `access_control` is request-level (checked by the firewall before the controller runs). `denyAccessUnlessGranted()` is controller-level (more granular, can be conditional, can check custom attributes on objects).
**Code Snippet:**
```php
// Controller-level (fine-grained):
$this->denyAccessUnlessGranted('edit', $post);
// Request-level (coarse, in security.yaml):
// access_control: [{path: ^/admin, roles: ROLE_ADMIN}]
```

---

**Q: How do you create a custom Voter?**
**A:** Extend `Voter`, implement `supports($attr, $subject)` and `voteOnAttribute($attr, $subject, TokenInterface $token)`. Return `true`/`false`.
**Code Snippet:**
```php
class PostVoter extends Voter {
    protected function supports(string $attr, mixed $subject): bool {
        return in_array($attr, ['view', 'edit']) && $subject instanceof Post;
    }
    protected function voteOnAttribute(string $attr, mixed $subject, TokenInterface $token): bool {
        /** @var Post $post */
        $user = $token->getUser();
        if (!$user instanceof User) return false;
        return match ($attr) {
            'edit' => $post->getOwner() === $user,
            'view' => true,
            default => false,
        };
    }
}
```

---

**Q: What are the three built-in voter decision strategies and how do you change the default?**
**A:** `affirmative` (default — grants if ANY voter says yes), `consensus` (majority wins), `unanimous` (all must say yes). Change in `security.yaml`.
**Code Snippet:**
```yaml
security:
    access_decision_manager:
        strategy: unanimous
        allow_if_all_abstain: false
```

---

**Q: What happens when all voters abstain (return `ACCESS_ABSTAIN`)?**
**A:** Controlled by `allow_if_all_abstain` (default: `false` = deny). If `true`, access is granted when nobody acted.
**Code Snippet:**
```yaml
access_decision_manager:
    allow_if_all_abstain: true
```

---

### Users

**Q: What is `UserInterface` and what methods must a User class implement?**
**A:** The core Symfony user contract. Methods: `getUserIdentifier(): string` (the unique identifier — email or username), `getRoles(): array` (always include `ROLE_USER`), `eraseCredentials(): void` (clear plain passwords from memory).
**Code Snippet:**
```php
class User implements UserInterface {
    public function getUserIdentifier(): string { return $this->email; }
    public function getRoles(): array { return array_unique(array_merge($this->roles, ['ROLE_USER'])); }
    public function eraseCredentials(): void { $this->plainPassword = null; }
}
```

---

**Q: What is `PasswordAuthenticatedUserInterface` and why is it separate from `UserInterface`?**
**A:** An additional interface requiring `getPassword(): ?string`. Keeps password hashing separate from identity. Only implement it on users who authenticate with passwords.
**Code Snippet:**
```php
class User implements UserInterface, PasswordAuthenticatedUserInterface {
    public function getPassword(): ?string { return $this->password; }
}
```

---

**Q: What is a User Provider and what is its role?**
**A:** Loads a user from storage by their identifier. The `EntityUserProvider` loads from Doctrine. You can write custom providers implementing `UserProviderInterface`.
**Code Snippet:**
```yaml
providers:
    app_user_provider:
        entity:
            class: App\Entity\User
            property: email
```
```php
// Custom provider:
class ApiUserProvider implements UserProviderInterface {
    public function loadUserByIdentifier(string $identifier): UserInterface { ... }
    public function refreshUser(UserInterface $user): UserInterface { ... }
    public function supportsClass(string $class): bool { return $class === User::class; }
}
```

---

### Password hashers

**Q: What does `password_hashers: App\Entity\User: 'auto'` configure?**
**A:** Symfony automatically selects the best available algorithm (`bcrypt` at minimum, `argon2i` / `argon2id` if available). Automatically re-hashes on login if required.
**Code Snippet:**
```yaml
security:
    password_hashers:
        App\Entity\User: 'auto'
        # or explicit:
        App\Entity\User:
            algorithm: argon2id
            memory_cost: 65536
            time_cost: 4
```

---

**Q: How do you hash a password in a controller or command?**
**A:** Inject `UserPasswordHasherInterface` and call `hashPassword($user, $plainPassword)`.
**Code Snippet:**
```php
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

public function __construct(private UserPasswordHasherInterface $hasher) {}

$hashed = $this->hasher->hashPassword($user, $plainPassword);
$user->setPassword($hashed);
```

---

**Q: What is password rehashing and how does Symfony handle it automatically?**
**A:** When a user logs in, Symfony checks if their stored password was hashed with an outdated algorithm or cost factor. If so, it transparently rehashes and saves the new hash — no user action needed.
**Code Snippet:** N/A

---

**Q: What does `NativePasswordHasher` vs `SodiumPasswordHasher` use under the hood?**
**A:** `NativePasswordHasher` uses PHP's built-in `password_hash()` (bcrypt by default). `SodiumPasswordHasher` uses `sodium_crypto_pwhash` (Argon2id via libsodium).
**Code Snippet:** N/A

---

### Remember Me

**Q: How do you enable "Remember Me" on a Symfony firewall?**
**A:** Add `remember_me:` configuration under the firewall and include `RememberMeBadge` in the authenticator's Passport.
**Code Snippet:**
```yaml
firewalls:
    main:
        remember_me:
            secret: '%kernel.secret%'
            lifetime: 604800   # 1 week in seconds
            path: /
            secure: true
            httponly: true
            samesite: lax
```
```php
// In authenticator:
new Passport($userBadge, $credentials, [new RememberMeBadge()]);
```

---

**Q: What cookie does Remember Me set and how is it validated?**
**A:** A persistent cookie containing the user identifier + a hashed token. On the next page load, the `RememberMeAuthenticator` reads the cookie, validates the token, and authenticates the user.
**Code Snippet:** N/A

---

**Q: What `TokenInterface` is set for a user authenticated via remember-me?**
**A:** `RememberMeToken`. This can be checked via `IS_REMEMBERED` in access control. For sensitive actions, require `IS_AUTHENTICATED_FULLY`.
**Code Snippet:**
```yaml
access_control:
    - { path: ^/settings/password-change, roles: IS_AUTHENTICATED_FULLY }
    - { path: ^/settings, roles: IS_REMEMBERED }
```

---

**Q: What is the `remember_me_parameter` option and what is its default?**
**A:** The name of the form field that triggers remember me token creation. Default: `_remember_me`. The checkbox must be checked in the login form for the cookie to be set.
**Code Snippet:**
```yaml
remember_me:
    secret: '%kernel.secret%'
    remember_me_parameter: _remember_me
```
```twig
<input type="checkbox" name="_remember_me"> Keep me logged in
```

---

### CSRF Protection (Stateless)

**Q: What is stateless CSRF protection and how does it differ from session-based CSRF?**
**A:** Session-based CSRF stores a token in the session. Stateless CSRF uses a **signed token** tied to the user's IP/timestamp (no session needed). Useful for API endpoints or SPA frontends.
**Code Snippet:**
```yaml
security:
    enable_authenticator_manager: true
    # The CsrfTokenManager uses secret + user session token = stateless-safe
```

---

**Q: How do you validate a CSRF token from within a controller?**
**A:** Use `$this->isCsrfTokenValid($id, $submittedToken)` from `AbstractController`.
**Code Snippet:**
```php
if (!$this->isCsrfTokenValid('delete_item', $request->request->get('_token'))) {
    throw new InvalidCsrfTokenException();
}
```

---

**Q: How do you generate a CSRF token to embed in a Twig template?**
**A:** Use the `csrf_token('id')` Twig function.
**Code Snippet:**
```twig
<form method="DELETE" action="{{ path('item_delete', {id: item.id}) }}">
    <input type="hidden" name="_token" value="{{ csrf_token('delete_item') }}">
    <button>Delete</button>
</form>
```

---

**Q: How does the form component apply CSRF protection and where is the token stored?**
**A:** A hidden `_token` field is added automatically. The token is stored in the session under `_csrf/form_intention` and validated on `handleRequest()`.
**Code Snippet:**
```php
// Disable per-form:
$form = $this->createForm(MyType::class, $data, ['csrf_protection' => false]);
```

---

**Q: What is the `CsrfTokenBadge` in the Authenticator system and how does it differ from form CSRF?**
**A:** `CsrfTokenBadge` is a Passport badge that validates a CSRF token during custom authentication. It uses the `CsrfTokenManagerInterface` — same infrastructure but applied at the authenticator/login level.
**Code Snippet:**
```php
new CsrfTokenBadge('login_intention', $request->request->get('_csrf_token'))
```

---

### Access control

**Q: What is the priority of `access_control` rules?**
**A:** Rules are evaluated **in order** (top to bottom). The **first matching rule** applies and no further rules are checked. Put most specific paths first.
**Code Snippet:**
```yaml
access_control:
    - { path: ^/admin/users, roles: ROLE_SUPER_ADMIN }
    - { path: ^/admin, roles: ROLE_ADMIN }
    - { path: ^/profile, roles: IS_AUTHENTICATED_REMEMBERED }
```

---

**Q: What does `allow_if:` do in an `access_control` entry?**
**A:** Applies an ExpressionLanguage expression for fine-grained control. Variables available: `user`, `roles`, `token`, `request`, `object`.
**Code Snippet:**
```yaml
access_control:
    - path: ^/internal
      allow_if: "'192.168.0.' in request.getClientIp()"
```

---

**Q: What is `requires_channel: https` in `access_control`?**
**A:** Forces the URL to be accessed over HTTPS. If accessed via HTTP, Symfony redirects to the HTTPS equivalent.
**Code Snippet:**
```yaml
access_control:
    - { path: ^/, requires_channel: https }
```

---

**Q: How do you match an `access_control` rule by request attribute (not just path)?**
**A:** Use `attributes:` — a list of `[key: value]` pairs matched against `$request->attributes`.
**Code Snippet:**
```yaml
access_control:
    - { attributes: { _route: 'api_private' }, roles: ROLE_API }
```

---
