# Quiz : Security (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Configuration and providers

**Question 1:** Security configuration in Symfony lives in:
**Type:** Single answer
- [ ] A) `config/packages/security.yaml`
- [ ] B) `config/security.php`
- [ ] C) `config/services.yaml`
- [ ] D) `src/Security/config.php`

**Correct Answer(s):** A
**Explanation:** `security.yaml` defines firewalls, providers, access control, hashers, etc.

---

**Question 2:** A user provider is responsible for:
**Type:** Single answer
- [ ] A) Rendering login forms
- [ ] B) Loading user objects from a data source (database, LDAP, memory, API)
- [ ] C) Hashing passwords
- [ ] D) Generating CSRF tokens

**Correct Answer(s):** B
**Explanation:** User providers implement `UserProviderInterface` with `loadUserByIdentifier()`.

---

**Question 3:** The `memory` user provider stores users:
**Type:** Single answer
- [ ] A) In the database
- [ ] B) Directly in the `security.yaml` configuration (in-memory)
- [ ] C) In a session
- [ ] D) In a file

**Correct Answer(s):** B
**Explanation:** `memory` provider hardcodes users in config — useful for simple apps/prototyping.

---

### Firewalls

**Question 4:** A firewall in Symfony defines:
**Type:** Single answer
- [ ] A) A physical network firewall
- [ ] B) A section of the application with its own authentication configuration
- [ ] C) A rate limiter
- [ ] D) A CORS policy

**Correct Answer(s):** B
**Explanation:** Each firewall defines patterns, providers, authenticators, and security rules for URL subsets.

---

**Question 5:** The `dev` firewall with `security: false` means:
**Type:** Single answer
- [ ] A) Development mode is disabled
- [ ] B) The firewall matches but does NOT enforce any security (used for profiler/WDT routes)
- [ ] C) All users are denied
- [ ] D) Passwords are not hashed

**Correct Answer(s):** B
**Explanation:** `security: false` disables authentication entirely for matched paths.

---

**Question 6:** `stateless: true` on a firewall means:
**Type:** Single answer
- [ ] A) The server is turned off
- [ ] B) No session is created — the user must authenticate on every request (e.g., API tokens, JWT)
- [ ] C) The firewall is disabled
- [ ] D) CSRF is enabled

**Correct Answer(s):** B
**Explanation:** Stateless firewalls don't use session-based authentication — every request must carry credentials.

---

### Authentication (Authenticators, Passports, Badges)

**Question 7:** A custom authenticator must implement:
**Type:** Single answer
- [ ] A) `AuthenticatorInterface` (with `supports()`, `authenticate()`, `onAuthenticationSuccess()`, `onAuthenticationFailure()`)
- [ ] B) `UserProviderInterface`
- [ ] C) `VoterInterface`
- [ ] D) `FormTypeInterface`

**Correct Answer(s):** A
**Explanation:** `AuthenticatorInterface` (or extend `AbstractAuthenticator`) with the four key methods.

---

**Question 8:** The `supports(Request $request): ?bool` method returns:
**Type:** Single answer
- [ ] A) The user object
- [ ] B) `true` if this authenticator should handle the request, `false` to skip it, or `null` for lazy
- [ ] C) A `Response`
- [ ] D) A `Passport`

**Correct Answer(s):** B
**Explanation:** `true` = handle, `false` = skip, `null` = lazy (call `authenticate()` which decides).

---

**Question 9:** The `authenticate()` method must return a:
**Type:** Single answer
- [ ] A) `Response`
- [ ] B) `UserInterface`
- [ ] C) `Passport` object containing user and credentials badges
- [ ] D) Boolean

**Correct Answer(s):** C
**Explanation:** `Passport` wraps `UserBadge` (who) + `CredentialsBadge` (how they prove identity).

---

**Question 10:** Which is NOT a valid Passport badge?
**Type:** Single answer
- [ ] A) `UserBadge`
- [ ] B) `PasswordCredentials`
- [ ] C) `CsrfTokenBadge`
- [ ] D) `RememberMeBadge`
- [ ] E) `DatabaseBadge`

**Correct Answer(s):** E
**Explanation:** `DatabaseBadge` doesn't exist. `UserBadge`, `PasswordCredentials`, `CsrfTokenBadge`, `RememberMeBadge` are all valid.

---

### Authorization (Roles, Access Control, Voters)

**Question 11:** Every Symfony role must start with:
**Type:** Single answer
- [ ] A) `AUTH_`
- [ ] B) `ROLE_`
- [ ] C) `PERM_`
- [ ] D) `ACCESS_`

**Correct Answer(s):** B
**Explanation:** Symfony enforces `ROLE_` prefix. Unknown prefixes throw errors.

---

**Question 12:** `access_control` in `security.yaml` defines:
**Type:** Single answer
- [ ] A) Route definitions
- [ ] B) URL path-based authorization rules (e.g., `/admin/*` requires `ROLE_ADMIN`)
- [ ] C) Rate limiting rules
- [ ] D) Cookie policies

**Correct Answer(s):** B
**Explanation:** `access_control` maps URL patterns to required roles/expressions.

---

**Question 13:** `access_control` rules are evaluated:
**Type:** Single answer
- [ ] A) All rules matching the URL
- [ ] B) Only the FIRST matching rule (top-down order matters)
- [ ] C) In reverse order
- [ ] D) Randomly

**Correct Answer(s):** B
**Explanation:** The first matching rule wins. Order is critical.

---

**Question 14:** What is a Voter in Symfony?
**Type:** Single answer
- [ ] A) A form element
- [ ] B) A class that decides whether a user has permission to perform an action on a subject
- [ ] C) A database query
- [ ] D) A route matcher

**Correct Answer(s):** B
**Explanation:** Voters implement `VoterInterface` with `vote()` returning `ACCESS_GRANTED`, `ACCESS_DENIED`, or `ACCESS_ABSTAIN`.

---

**Question 15:** A voter returns `ACCESS_ABSTAIN` when:
**Type:** Single answer
- [ ] A) The user is denied
- [ ] B) The voter cannot make a decision (doesn't apply to this attribute/subject)
- [ ] C) The user is granted access
- [ ] D) An error occurred

**Correct Answer(s):** B
**Explanation:** `ABSTAIN` = "I don't know, ask other voters." The strategy (affirmative/consensus/unanimous) determines the final decision.

---

**Question 16:** `$this->denyAccessUnlessGranted('ROLE_ADMIN')` in a controller does what?
**Type:** Single answer
- [ ] A) Logs the user out
- [ ] B) Throws `AccessDeniedException` (403) unless the current user has `ROLE_ADMIN`
- [ ] C) Redirects to login
- [ ] D) Returns a JSON error

**Correct Answer(s):** B
**Explanation:** If the user doesn't have the required role, a 403 `AccessDeniedException` is thrown.

---

**Question 17:** The `#[IsGranted('ROLE_ADMIN')]` attribute on a controller:
**Type:** Single answer
- [ ] A) Defines a route
- [ ] B) Checks authorization before the controller executes — denies with 403 if not granted
- [ ] C) Creates a user
- [ ] D) Authenticates the user

**Correct Answer(s):** B
**Explanation:** `#[IsGranted]` is an attribute-based shortcut for `denyAccessUnlessGranted()`.

---

### Password hashing

**Question 18:** Symfony recommends which algorithm for password hashing?
**Type:** Single answer
- [ ] A) MD5
- [ ] B) SHA-256
- [ ] C) `auto` (which uses bcrypt or argon2 depending on PHP configuration)
- [ ] D) Plain text

**Correct Answer(s):** C
**Explanation:** `algorithm: auto` picks the best available algorithm (argon2id > argon2i > bcrypt).

---

**Question 19:** `UserPasswordHasherInterface::hashPassword()` is used to:
**Type:** Single answer
- [ ] A) Verify a password
- [ ] B) Hash a plain-text password for storage
- [ ] C) Decrypt a password
- [ ] D) Generate a random password

**Correct Answer(s):** B
**Explanation:** Hashes the password. `isPasswordValid()` verifies.

---

### CSRF Protection

**Question 20:** In a Symfony form, CSRF protection is:
**Type:** Single answer
- [ ] A) Disabled by default
- [ ] B) Enabled by default — a hidden `_token` field is added and validated
- [ ] C) Handled by the browser
- [ ] D) Only available with JavaScript

**Correct Answer(s):** B
**Explanation:** Forms automatically include a CSRF token field validated on submission.

---

**Question 21:** For stateless APIs, CSRF protection is typically:
**Type:** Single answer
- [ ] A) Essential
- [ ] B) Disabled — APIs use token authentication (JWT, API keys) which is immune to CSRF
- [ ] C) Required by law
- [ ] D) Enhanced

**Correct Answer(s):** B
**Explanation:** CSRF attacks exploit cookies. Stateless APIs with Bearer tokens aren't vulnerable.

---

### Remember Me

**Question 22:** The `remember_me` firewall feature:
**Type:** Single answer
- [ ] A) Remembers the user's password
- [ ] B) Sets a persistent cookie that authenticates the user even after the session expires
- [ ] C) Saves the user's form data
- [ ] D) Remembers the last visited URL

**Correct Answer(s):** B
**Explanation:** Remember Me uses a secure cookie to re-authenticate automatically.

---

**Question 23:** `RememberMeBadge` in the Passport:
**Type:** Single answer
- [ ] A) Forces remember-me
- [ ] B) Tells the security system that this authenticator supports remember-me (user must also check the box)
- [ ] C) Disables remember-me
- [ ] D) Encrypts the cookie

**Correct Answer(s):** B
**Explanation:** Adding `RememberMeBadge` enables the feature. The user still needs to opt in (unless `always_remember_me: true`).

---

### UserInterface

**Question 24:** The `UserInterface` requires which methods? (Select all)
**Type:** Multiple choice
- [ ] A) `getRoles(): array`
- [ ] B) `getUserIdentifier(): string`
- [ ] C) `eraseCredentials(): void`
- [ ] D) `getPassword(): string`
- [ ] E) `getUsername(): string`

**Correct Answer(s):** A, B, C
**Explanation:** `UserInterface` requires `getRoles()`, `getUserIdentifier()`, `eraseCredentials()`. `getPassword()` belongs to `PasswordAuthenticatedUserInterface`.

---

**Question 25:** `eraseCredentials()` is called:
**Type:** Single answer
- [ ] A) When the user is deleted
- [ ] B) After authentication — to clear sensitive data (plain passwords) from memory
- [ ] C) During logout
- [ ] D) Never

**Correct Answer(s):** B
**Explanation:** Called after authentication to scrub sensitive data that shouldn't persist in the session.

---

### Role hierarchy

**Question 26:** Role hierarchy allows:
**Type:** Single answer
- [ ] A) `ROLE_ADMIN` to automatically include `ROLE_USER` without explicit assignment
- [ ] B) Users to change their own roles
- [ ] C) Roles to expire
- [ ] D) Database-level permissions

**Correct Answer(s):** A
**Explanation:** `role_hierarchy: ROLE_ADMIN: ROLE_USER` means admins implicitly have `ROLE_USER`.

---

### Logout

**Question 27:** Symfony's logout is configured in:
**Type:** Single answer
- [ ] A) A controller action
- [ ] B) The `security.yaml` firewall section under `logout:`
- [ ] C) `services.yaml`
- [ ] D) `routing.yaml`

**Correct Answer(s):** B
**Explanation:** `logout: path: app_logout` — Symfony handles the logout logic automatically, no controller code needed.

---

**Question 28:** The logout handler:
**Type:** Single answer
- [ ] A) Requires a controller method with logic
- [ ] B) Is handled entirely by Symfony — the controller method body is never reached
- [ ] C) Must return a Response
- [ ] D) Must delete the database record

**Correct Answer(s):** B
**Explanation:** The controller method can be empty — Symfony's security listener intercepts the request before it reaches the controller.

---

### Switch User / Impersonation

**Question 29:** The `switch_user` feature allows:
**Type:** Single answer
- [ ] A) Switching between Symfony versions
- [ ] B) An admin to impersonate another user for debugging/support purposes
- [ ] C) Switching databases
- [ ] D) Switching authentication methods

**Correct Answer(s):** B
**Explanation:** Append `?_switch_user=username` to impersonate. Requires `ROLE_ALLOWED_TO_SWITCH`.

---

**Question 30:** To exit impersonation, you use:
**Type:** Single answer
- [ ] A) `?_switch_user=_exit`
- [ ] B) `?logout=true`
- [ ] C) Clear the session
- [ ] D) Restart the server

**Correct Answer(s):** A
**Explanation:** `?_switch_user=_exit` reverts to the original user.

---

---
