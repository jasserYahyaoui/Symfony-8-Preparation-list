# Flashcards : Security Vault (Expert Level)

## CATEGORY 1: "Internal Trace" (Firewall & Authentication Flow)
* **Q :** Dans quel ordre précis sont exécutés les composants du nouveau système d'authentification (Authenticator, Passport, Badges) ?
* **R :** 1. L'Authenticator crée un `Passport`. 2. Les `Badges` du Passport sont vérifiés (CSRF, etc.). 3. Le `UserProvider` charge l'utilisateur. 4. Le `UserChecker` valide l'état du compte. 5. Si tout est OK, le `Token` est créé et stocké.
* **Exemple :**
```php
// Dans un Authenticator
public function authenticate(Request $request): Passport {
    return new Passport(
        new UserBadge($email),
        new PasswordCredentials($password),
        [new CsrfTokenBadge('login', $token)]
    );
}
```
* **Piège :** Le `UserChecker` intervient **après** que les credentials ont été vérifiés mais **avant** que l'authentification ne soit finalisée. Il existe un `checkPreAuth` et un `checkPostAuth`.

## CATEGORY 2: "Signature Specialist" (Methods & Interfaces)
* **Q :** Quelle est la signature exacte de la méthode `checkPostAuth()` de `UserCheckerInterface` ?
* **R :** `public function checkPostAuth(UserInterface $user): void;`. Elle ne doit rien retourner mais lancer une `AccountStatusException` en cas de problème.
* **Exemple :**
```php
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class MyChecker implements UserCheckerInterface {
    public function checkPreAuth(UserInterface $user): void {}
    public function checkPostAuth(UserInterface $user): void {}
}
```
* **Piège :** Ne pas confondre `UserProviderInterface` (pour trouver l'utilisateur) et `UserCheckerInterface` (pour vérifier si son compte est banni/expiré).

## CATEGORY 3: "PHP 8.4 Synergy" (Security Impact)
* **Q :** Quel est l'impact de la **Asymmetric Visibility** (PHP 8.4) sur les entités User de Symfony ?
* **R :** Elle permet de déclarer des propriétés `public private(set)` pour l'identifiant (ex: email) ou les rôles. Symfony pourra lire les rôles en public, mais seule l'entité pourra les modifier en interne, renforçant l'encapsulation sans nécessiter de getters.
* **Exemple :**
```php
class User implements UserInterface {
    // Lecture publique, écriture privée
    public private(set) array $roles = [];
}
```
* **Piège :** Bien que `public`, la propriété n'est pas modifiable depuis un service externe (ex: un UserManager) sans passer par une méthode publique de l'entité si celle-ci contient une logique métier.

## CATEGORY 4: "Internal Trace" (Voters & Decision Manager)
* **Q :** Comment Symfony tranche-t-it un conflit entre plusieurs Voters lorsque la stratégie est réglée sur `consensus` ?
* **R :** Il compte les votes "accordés" (grant) et "refusés" (deny). Si accordés > refusés, l'accès est permis. En cas d'égalité, l'option `allow_if_equal_granted_denied` (par défaut `true`) décide.
* **Exemple :**
```yaml
# security.yaml
access_decision_manager:
    strategy: consensus
    allow_if_equal_granted_denied: false
```
* **Piège :** Les votes `abstain` (abstention) ne sont **jamais** pris en compte dans le calcul du total pour la stratégie `consensus`.

## CATEGORY 5: "Signature Specialist" (Access Decision)
* **Q :** Quelle est la signature exacte de la méthode `decide()` du service `AccessDecisionManagerInterface` ?
* **R :** `public function decide(TokenInterface $token, array $attributes, mixed $object = null): bool;`.
* **Exemple :**
```php
$isAllowed = $this->decisionManager->decide($token, ['ROLE_ADMIN'], $product);
```
* **Piège :** L'argument `$attributes` est obligatoirement un **tableau**, même si vous ne vérifiez qu'une seule chaîne de caractère comme un rôle.

## CATEGORY 6: "The Trap Room" (Firewall Context)
* **Q :** Que se passe-t-il si une requête HTTP matche plusieurs patterns de firewalls différents dans `security.yaml` ?
* **R :** Symfony s'arrête au **premier** firewall qui matche le pattern de l'URL. Les firewalls suivants sont totalement ignorés pour cette requête.
* **Exemple :**
```yaml
firewalls:
    admin: { pattern: ^/admin, ... }
    main: { pattern: ^/, ... } # admin doit être AVANT main
```
* **Piège :** Si vous placez un firewall avec le pattern `^/` en première position, aucun autre firewall placé après ne pourra jamais être atteint.

## CATEGORY 7: "Internal Trace" (Token Storage)
* **Q :** Comment se comporte le `TokenStorage` lors d'une sous-requête (sub-request) Twig (ex: `{{ render(controller(...)) }}`) ?
* **R :** Le `TokenStorage` est un service global (singleton). La sous-requête a accès au **même jeton de sécurité** que la requête principale par défaut.
* **Exemple :**
```twig
{# La barre latérale verra le même utilisateur que la page principale #}
{{ render(controller('App\\Controller\\SidebarController::userInfo')) }}
```
* **Piège :** Si vous modifiez l'utilisateur dans la sous-requête (ex: via un impersonation manuel), cela affectera l'objet utilisateur dans la requête principale car ils partagent la même instance en mémoire.

## CATEGORY 8: "Signature Specialist" (Passport Badges)
* **Q :** Quel est l'objet retourné par la méthode `getBadge()` de la classe `Passport` et quelle est sa particularité ?
* **R :** Elle retourne une instance de `BadgeInterface` ou `null`. La particularité est qu'un Passport ne peut contenir qu'**une seule instance** par type de badge.
* **Exemple :**
```php
$badge = $passport->getBadge(CsrfTokenBadge::class);
```
* **Piège :** Si vous essayez d'ajouter deux badges du même type, le second écrasera le premier.

## CATEGORY 9: "Internal Trace" (Access Control Execution)
* **Q :** À quel moment précis du cycle de vie du Kernel les règles de `access_control` sont-elles vérifiées ?
* **R :** Lors de l'événement `kernel.request`, mais avec une priorité très basse (**-10**). Cela garantit que le routage a déjà eu lieu et que le firewall a déjà identifié l'utilisateur.
* **Exemple :**
```yaml
# Priorité interne Symfony :
# 1. Routing (priority 32)
# 2. Firewall (priority 8)
# 3. Access Control (priority -10)
```
* **Piège :** Si vous lancez une exception dans un listener de `kernel.request` avec une priorité de 0, les règles de `access_control` n'auront pas encore été vérifiées.

## CATEGORY 10: "Signature Specialist" (User Refresh)
* **Q :** Quelle est la signature exacte de la méthode `refreshUser()` dans `UserProviderInterface` ?
* **R :** `public function refreshUser(UserInterface $user): UserInterface;`. Elle est appelée au début de chaque requête pour recharger l'utilisateur depuis la session.
* **Exemple :**
```php
public function refreshUser(UserInterface $user): UserInterface {
    if (!$user instanceof MyUser) {
        throw new UnsupportedUserException();
    }
    return $this->loadUserByIdentifier($user->getUserIdentifier());
}
```
* **Piège :** Ne pas implémenter correctement `refreshUser` provoquera une déconnexion immédiate à la fin de la première requête car Symfony ne pourra pas persister l'identité.

## CATEGORY 11: "PHP 8.4 Synergy" (Property Hooks & Security)
* **Q :** Comment les **Property Hooks** (PHP 8.4) peuvent-ils simplifier la logique des Voters ?
* **R :** On peut encapsuler des calculs de permission simples directement dans des propriétés "virtuelles" de l'entité. Le Voter n'a plus qu'à lire la propriété sans connaître la logique de calcul.
* **Exemple :**
```php
class Post {
    public bool $isArchived = false;
    public bool $isDeletable {
        get => !$this->isArchived && $this->author === $currentUser;
    }
}
```
* **Piège :** Les Property Hooks ne peuvent pas accéder au conteneur de services. Pour des vérifications complexes (ex: vérifier un quota en BDD), utilisez toujours un Voter (service).

## CATEGORY 12: "The Trap Room" (Stateless Firewalls)
* **Q :** Quelle est la conséquence principale de l'option `stateless: true` on un firewall dans Symfony 8.0 ?
* **R :** Symfony ne démarrera aucune session PHP pour les requêtes traitées par ce firewall. L'utilisateur doit être ré-authentifié à chaque requête (ex: via un Token API ou un Header).
* **Exemple :**
```yaml
firewalls:
    api:
        pattern: ^/api
        stateless: true
        access_token: { token_handler: App\Security\TokenHandler }
```
* **Piège :** Si vous activez `stateless: true`, les messages `Flash` et la protection `CSRF` basée sur la session ne fonctionneront plus.

## CATEGORY 13: "Signature Specialist" (Password Authenticated User)
* **Q :** Quelle interface spécifique doit implémenter un utilisateur pour que Symfony puisse gérer son hachage de mot de passe ?
* **R :** `Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface`. Elle ne contient qu'une seule méthode : `getPassword(): ?string`.
* **Exemple :**
```php
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

class User implements UserInterface, PasswordAuthenticatedUserInterface {
    public function getPassword(): ?string { return $this->password; }
}
```
* **Piège :** Depuis Symfony 6.0, `UserInterface` ne contient plus `getPassword()`. Si vous oubliez d'implémenter `PasswordAuthenticatedUserInterface`, le `UserPasswordHasher` refusera de traiter l'objet.

## CATEGORY 14: "Internal Trace" (Login Throttling)
* **Q :** Comment fonctionne le mécanisme de `login_throttling` par défaut dans Symfony ?
* **R :** Il utilise le composant `RateLimiter` pour limiter le nombre de tentatives de connexion échouées par IP ou par utilisateur. Il bloque l'authentification avant même d'appeler le `UserProvider`.
* **Exemple :**
```yaml
firewalls:
    main:
        login_throttling:
            max_attempts: 5
            interval: '15 minutes'
```
* **Piège :** Si vous utilisez un reverse proxy (Varnish, Nginx), vous **devez** configurer les `trusted_proxies` pour que Symfony puisse identifier l'IP réelle de l'attaquant, sinon il bloquera l'IP du proxy pour tout le monde.

## CATEGORY 15: "Signature Specialist" (Voter Vote)
* **Q :** Quelle est la signature exacte de la méthode `vote()` de l'interface `VoterInterface` ?
* **R :** `public function vote(TokenInterface $token, mixed $subject, array $attributes): int;`. Elle doit retourner une constante : `ACCESS_GRANTED`, `ACCESS_DENIED` ou `ACCESS_ABSTAIN`.
* **Exemple :**
```php
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;

public function vote(TokenInterface $token, mixed $subject, array $attributes): int {
    return VoterInterface::ACCESS_ABSTAIN;
}
```
* **Piège :** Si vous héritez de la classe abstraite `Voter` (recommandé), la signature change pour `voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool`. La classe de base gère la logique de retour d'entiers pour vous.

## CATEGORY 16: "The Trap Room" (Access Token Authenticator)
* **Q :** Quel est le comportement par défaut de l'authentificateur `access_token` si le token fourni dans le header `Authorization: Bearer ...` est mal formé ?
* **R :** Il lance une `BadCredentialsException`. Si le firewall n'est pas `stateless`, il redirigera vers la page de login ou affichera une erreur 401.
* **Exemple :**
```php
// config/packages/security.yaml
access_token:
    token_handler: App\Security\MyTokenHandler
```
* **Piège :** Un `TokenHandler` ne doit **pas** vérifier les droits d'accès, il doit uniquement transformer une chaîne de caractères (token) en un identifiant utilisateur (UserBadge).

## CATEGORY 17: "Internal Trace" (Logout Process)
* **Q :** Quelles sont les 3 actions principales effectuées par Symfony lors d'un `logout` ?
* **R :** 1. Invalidation de la session PHP. 2. Suppression du jeton de sécurité (`TokenStorage`). 3. Suppression des cookies `RememberMe` (si activés).
* **Exemple :**
```yaml
firewalls:
    main:
        logout:
            path: app_logout
            target: homepage
```
* **Piège :** Si vous définissez une route pour le logout, vous n'avez pas besoin de créer de contrôleur. Symfony intercepte la requête avant même qu'elle n'atteigne le contrôleur.

## CATEGORY 18: "Signature Specialist" (Ldap User Provider)
* **Q :** Quelle classe spécifique est utilisée pour charger des utilisateurs depuis un serveur LDAP dans Symfony ?
* **R :** `Symfony\Component\Security\Core\User\LdapUserProvider`. Elle nécessite l'installation du composant `Ldap`.
* **Exemple :**
```yaml
# security.yaml
providers:
    my_ldap:
        ldap:
            service: Symfony\Component\Ldap\Ldap
            base_dn: dc=example,dc=com
```
* **Piège :** Bien que LDAP soit puissant, il est souvent hors scope pour les questions de code pur de l'examen Expert, sauf pour connaître son existence comme fournisseur d'utilisateurs.

## CATEGORY 19: "Internal Trace" (Firewall Entry Point)
* **Q :** Qu'est-ce qu'un "Entry Point" d'un firewall et quand est-il appelé ?
* **R :** C'est le mécanisme qui décide de la suite à donner lorsqu'un utilisateur **non authentifié** tente d'accéder à une ressource protégée (ex: rediriger vers `/login` ou renvoyer une erreur 401).
* **Exemple :**
```yaml
firewalls:
    main:
        entry_point: form_login # Redirigera vers le formulaire de login
```
* **Piège :** Si vous avez plusieurs méthodes d'authentification (ex: `form_login` ET `http_basic`), vous **devez** spécifier quel `entry_point` doit être utilisé en cas d'échec global.

## CATEGORY 20: "Signature Specialist" (Security Event Listener)
* **Q :** Quelle est la signature de la méthode à implémenter pour écouter l'événement `SecurityEvents::INTERACTIVE_LOGIN` ?
* **R :** `public function onInteractiveLogin(InteractiveLoginEvent $event): void;`. Cet événement est lancé après une authentification réussie via un formulaire ou un autre moyen interactif.
* **Exemple :**
```php
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

public function onInteractiveLogin(InteractiveLoginEvent $event): void {
    $user = $event->getAuthenticationToken()->getUser();
}
```
* **Piège :** Cet événement n'est **pas** lancé lors d'une authentification non interactive (ex: via un token API ou un cookie RememberMe). Pour cela, utilisez `CheckPassportEvent` ou des événements plus bas niveau.

## CATEGORY 21: "PHP 8.4 Synergy" (ReadOnly and Tokens)
* **Q :** Pourquoi l'utilisation de `readonly` sur une classe utilisateur peut-elle poser problème dans Symfony 8 ?
* **R :** Parce que certaines parties du framework (ou de Doctrine) peuvent avoir besoin de modifier l'état de l'objet utilisateur (ex: changer le mot de passe, mettre à jour la date de dernière connexion) après son instanciation.
* **Exemple :**
```php
// À éviter pour une entité User classique
readonly class User implements UserInterface { ... }
```
* **Piège :** Préférer les propriétés `readonly` individuelles pour ce qui ne doit jamais changer (ex: ID technique) ou la **Asymmetric Visibility** de PHP 8.4 pour protéger les propriétés sans bloquer l'évolution de l'objet.

## CATEGORY 22: "The Trap Room" (Custom Voter Priority)
* **Q :** Comment changer l'ordre d'exécution d'un Voter personnalisé par rapport aux Voters natifs de Symfony (ex: RoleVoter) ?
* **R :** En modifiant la priorité de son tag `security.voter` dans le conteneur de services. Une priorité plus élevée s'exécute plus tôt.
* **Exemple :**
```yaml
# services.yaml
App\Security\Voter\MyVoter:
    tags:
        - { name: security.voter, priority: 100 }
```
* **Piège :** Changer la priorité des Voters n'a d'impact réel que si votre stratégie de décision est `affirmative` (le premier qui accepte gagne) ou si vous avez besoin qu'un Voter pré-remplisse des données pour les suivants.

## CATEGORY 23: "Signature Specialist" (Self Validating Passport)
* **Q :** Quelle est la différence majeure entre un `Passport` classique et un `SelfValidatingPassport` ?
* **R :** Un `SelfValidatingPassport` est utilisé lorsque les credentials ne nécessitent pas de vérification supplémentaire par Symfony (ex: authentification par token API ou certificat client déjà validé par le serveur web).
* **Exemple :**
```php
public function authenticate(Request $request): Passport {
    return new SelfValidatingPassport(new UserBadge($apiToken));
}
```
* **Piège :** Si vous utilisez `SelfValidatingPassport`, Symfony ne vérifiera **pas** le mot de passe, même si vous fournissez un `PasswordCredentials` par erreur.

## CATEGORY 24: "Internal Trace" (Switch User / Impersonation)
* **Q :** Quelle permission spéciale est nécessaire pour permettre l'impersonnalisation d'un utilisateur (`_switch_user`) ?
* **R :** L'utilisateur actuel doit posséder le rôle `ROLE_ALLOWED_TO_SWITCH`. Ce comportement est activé via l'option `switch_user: true` dans le firewall.
* **Exemple :**
```yaml
firewalls:
    main:
        switch_user: true
# URL: /?_switch_user=admin@example.com
```
* **Piège :** Lors de l'impersonnalisation, le jeton de sécurité contient l'utilisateur "cible", mais vous pouvez retrouver l'utilisateur "réel" original via le badge `SwitchUserBadge` ou en vérifiant le rôle `ROLE_PREVIOUS_ADMIN`.

## CATEGORY 25: "Signature Specialist" (LogoutEvent)
* **Q :** Quelle est la signature de la méthode pour écouter l'événement `LogoutEvent` introduit dans les versions récentes de Symfony ?
* **R :** `public function onLogout(LogoutEvent $event): void;`. Cet événement permet de personnaliser la redirection finale ou de nettoyer des données spécifiques lors de la déconnexion.
* **Exemple :**
```php
use Symfony\Component\Security\Http\Event\LogoutEvent;

public function onLogout(LogoutEvent $event): void {
    $response = $event->getResponse();
    $token = $event->getToken();
}
```
* **Piège :** Ne confondez pas `LogoutEvent` avec les anciens `LogoutHandlerInterface` qui sont désormais dépréciés ou supprimés au profit du système d'événements.

## CATEGORY 26: "The Trap Room" (security: false vs public firewalls)
* **Q :** Quelle est la différence fondamentale entre un firewall avec `security: false` et un firewall classique sans restriction d'accès ?
* **R :** Un firewall avec `security: false` désactive **totalement** le composant Security pour les URLs correspondantes. L'objet `app.user` sera toujours `null` et `is_granted()` lancera une erreur.
* **Exemple :**
```yaml
firewalls:
    dev:
        pattern: ^/(_(profiler|wdt)|css|images|js)/
        security: false
```
* **Piège :** Si vous avez besoin de savoir si un utilisateur est connecté sur votre page d'accueil tout en la laissant publique, ne mettez pas `security: false`. Utilisez un firewall normal mais sans règle `access_control` restrictive.

## CATEGORY 27: "Internal Trace" (Expression Language in access_control)
* **Q :** Comment utiliser l'ExpressionLanguage pour autoriser l'accès uniquement si l'utilisateur possède deux rôles simultanément ?
* **R :** En utilisant l'option `allow_if` dans une règle de `access_control` avec l'opérateur `and`.
* **Exemple :**
```yaml
access_control:
    - { path: ^/super-admin, allow_if: "is_granted('ROLE_ADMIN') and is_granted('ROLE_MANAGER')" }
```
* **Piège :** Par défaut, la clé `roles: [ROLE_A, ROLE_B]` dans `access_control` fonctionne comme un **OR** (ou). Seul `allow_if` permet de faire des combinaisons logiques complexes (AND, conditions sur la requête, etc.).

## CATEGORY 28: "Signature Specialist" (UserBadge constructor)
* **Q :** Quels sont les deux arguments principaux du constructeur de `UserBadge` ?
* **R :** L'identifiant de l'utilisateur (string) et optionnellement une "User Loader" callable pour charger l'utilisateur manuellement sans passer par le `UserProvider` global.
* **Exemple :**
```php
$badge = new UserBadge($identifier, function($userIdentifier) {
    return $this->myRepository->findCustomUser($userIdentifier);
});
```
* **Piège :** Si vous fournissez une callable en second argument, Symfony **ignorera** totalement le `UserProvider` configuré dans le firewall pour cet utilisateur précis.

## CATEGORY 29: "Internal Trace" (Authentication Failure Flow)
* **Q :** Que se passe-t-il immédiatement après qu'un Authenticateur a échoué à valider les credentials ?
* **R :** Symfony déclenche l'événement `CheckPassportEvent` (si le passeport est invalide), puis appelle la méthode `onAuthenticationFailure()` de l'Authenticator. Enfin, il délègue la réponse à l'Entry Point si aucune réponse n'est retournée.
* **Exemple :**
```php
public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response {
    return new JsonResponse(['error' => 'Invalide'], 401);
}
```
* **Piège :** Si `onAuthenticationFailure` retourne `null`, Symfony laisse les autres authentificateurs du firewall tenter leur chance (si configuré).

## CATEGORY 30: "Signature Specialist" (onAuthenticationSuccess)
* **Q :** Quelle est la signature exacte de la méthode `onAuthenticationSuccess()` de l'interface `AuthenticatorInterface` ?
* **R :** `public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response;`.
* **Exemple :**
```php
public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response {
    return new RedirectResponse($this->urlGenerator->generate('dashboard'));
}
```
* **Piège :** Si cette méthode retourne `null`, la requête HTTP continue normalement vers le contrôleur initialement demandé (utile pour les API ou les authentifications transparentes).

## CATEGORY 31: "PHP 8.4 Synergy" (Dynamic Roles with Hooks)
* **Q :** Comment utiliser les **Property Hooks** de PHP 8.4 pour gérer des rôles dynamiques dans une entité User ?
* **R :** On peut définir un hook `get` sur la propriété `$roles` qui calcule les rôles à la volée (ex: ajouter ROLE_ADMIN si l'email finit par @company.com) tout en gardant la propriété compatible avec `UserInterface`.
* **Exemple :**
```php
class User implements UserInterface {
    public array $roles {
        get {
            $roles = $this->rawRoles;
            if (str_ends_with($this->email, '@admin.com')) $roles[] = 'ROLE_ADMIN';
            return array_unique($roles);
        }
    }
}
```
* **Piège :** Attention à ne pas créer de boucles infinies si le hook appelle d'autres méthodes de l'entité qui elles-mêmes lisent les rôles.

## CATEGORY 32: "The Trap Room" (Lazy Firewalls & Session)
* **Q :** Pourquoi un firewall peut-il être considéré comme "Lazy" (paresseux) par défaut dans Symfony 8 ?
* **R :** Parce que Symfony ne démarre la session et ne vérifie l'authentification que si le code accède réellement à l'utilisateur ou à une ressource protégée. Cela économise des ressources sur les pages publiques.
* **Exemple :**
```twig
{# La session ne démarre que si cette ligne est exécutée #}
{% if app.user %} ... {% endif %}
{% if is_granted('ROLE_USER') %} ... {% endif %}
```
* **Piège :** Si vous avez un listener qui logue systématiquement `app.user` à chaque requête, vous cassez le bénéfice du "Lazy Firewall" et forcez le démarrage de la session partout.

## CATEGORY 33: "Signature Specialist" (RememberMeHandlerInterface)
* **Q :** Quel est le rôle de l'interface `RememberMeHandlerInterface` introduite pour moderniser le système ?
* **R :** Elle définit comment les "Remember Me" tokens sont créés et consommés. Elle remplace la logique interne complexe par une interface plus simple à décorer ou à remplacer.
* **Exemple :**
```php
use Symfony\Component\Security\Http\RememberMe\RememberMeHandlerInterface;

public function consumeRememberMe(RememberMeDetails $rememberMeDetails): UserInterface { ... }
```
* **Piège :** Pour l'examen Expert, retenez que le système "Remember Me" est désormais découplé de l'Authenticator principal grâce à cette interface.

## CATEGORY 34: "Internal Trace" (CheckPassportEvent Priority)
* **Q :** Quel est l'événement Symfony permettant d'ajouter des vérifications de sécurité transversales sur TOUS les Passports (ex: vérifier si l'IP est bannie) ?
* **R :** L'événement `CheckPassportEvent`. Les listeners de cet événement sont exécutés juste après la création du Passport par l'Authenticator.
* **Exemple :**
```php
#[AsEventListener(event: CheckPassportEvent::class)]
public function onCheckPassport(CheckPassportEvent $event): void {
    $passport = $event->getPassport();
    // Logique de blocage global
}
```
* **Piège :** Si un listener de `CheckPassportEvent` lance une exception, le processus d'authentification s'arrête immédiatement et `onAuthenticationFailure()` est appelé.

## CATEGORY 35: "Signature Specialist" (AuthenticationUtils)
* **Q :** Quelles sont les deux méthodes principales fournies par le service `AuthenticationUtils` pour gérer les formulaires de login ?
* **R :** `getLastAuthenticationError()` (pour récupérer l'erreur de la tentative précédente) et `getLastUsername()` (pour pré-remplir le champ identifiant).
* **Exemple :**
```php
public function login(AuthenticationUtils $authUtils): Response {
    return $this->render('login.html.twig', [
        'last_username' => $authUtils->getLastUsername(),
        'error' => $authUtils->getLastAuthenticationError(),
    ]);
}
```
* **Piège :** Ces données sont stockées en session. Si le firewall est `stateless: true`, `AuthenticationUtils` ne pourra rien récupérer.

## CATEGORY 36: "PHP 8.4 Synergy" (Intersection Types in Voters)
* **Q :** Comment les **Intersection Types** (PHP 8.2+) ou l'évolution des types en PHP 8.4 peuvent-ils sécuriser un Voter ?
* **R :** On peut typer l'argument `$subject` de manière très précise dans `supports()` pour s'assurer qu'il implémente plusieurs interfaces simultanément, évitant des erreurs de cast à l'exécution.
* **Exemple :**
```php
protected function supports(string $attribute, mixed $subject): bool {
    return $subject instanceof (PostInterface & OwnableInterface);
}
```
* **Piège :** Symfony passe `mixed` à la méthode `supports()`. Un mauvais typage direct dans la signature de la méthode (au lieu d'un `instanceof` interne) provoquera une `TypeError` si le sujet ne correspond pas.

## CATEGORY 37: "The Trap Room" (Console & Security User)
* **Q :** Peut-on récupérer l'utilisateur connecté via `app.user` ou le `TokenStorage` dans une commande Console Symfony ?
* **R :** Non, par défaut l'utilisateur sera toujours `null`. Les commandes console s'exécutent en dehors de tout contexte de requête HTTP et de session.
* **Exemple :**
```php
// Dans une commande CLI
$user = $this->tokenStorage->getToken()?->getUser(); // Retournera null
```
* **Piège :** Si vous avez besoin d'agir "au nom d'un utilisateur" en CLI, vous devez charger l'utilisateur manuellement depuis la BDD et créer manuellement un `PostAuthenticationToken` à injecter dans le `TokenStorage`.

## CATEGORY 38: "Signature Specialist" (AccessDecisionManager strategies)
* **Q :** Quelles sont les 3 constantes de classe représentant les stratégies de décision dans Symfony ?
* **R :** `AccessDecisionManager::STRATEGY_AFFIRMATIVE`, `AccessDecisionManager::STRATEGY_CONSENSUS`, et `AccessDecisionManager::STRATEGY_UNANIMOUS`.
* **Exemple :**
```yaml
# En YAML, on utilise les noms en minuscules
access_decision_manager:
    strategy: unanimous
```
* **Piège :** La stratégie `unanimous` (unanimité) est la plus stricte : elle refuse l'accès si au moins UN voter dit "NON", même si tous les autres disent "OUI".

## CATEGORY 39: "Internal Trace" (Authenticator resolve methods)
* **Q :** Dans quel ordre l'interface `AuthenticatorInterface` appelle-t-elle ses méthodes lors d'une requête ?
* **R :** 1. `supports(Request $request)` (booléen). 2. `authenticate(Request $request)` (renvoie un Passport). 3. `onAuthenticationSuccess` ou `onAuthenticationFailure` (renvoie une Response).
* **Exemple :**
```php
// 1. On vérifie si c'est la page de login en POST
public function supports(Request $request): ?bool {
    return $request->getPathInfo() === '/login' && $request->isMethod('POST');
}
```
* **Piège :** Si `supports()` retourne `null` ou `false`, l'Authenticator est ignoré et Symfony passe au suivant ou continue la requête.

## CATEGORY 40: "Signature Specialist" (PasswordUpgraderInterface)
* **Q :** Quel est le but de l'interface `PasswordUpgraderInterface` et quelle méthode définit-elle ?
* **R :** Elle permet de mettre à jour automatiquement le hachage d'un mot de passe (ex: passer de BCrypt à Argon2) dès que l'utilisateur se connecte. Méthode : `upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void`.
* **Exemple :**
```php
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface {
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void {
        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->flush();
    }
}
```
* **Piège :** L'appel à `upgradePassword` est transparent et automatique par Symfony lors d'un login réussi si l'algorithme configuré dans `security.yaml` est plus fort que celui stocké.

## CATEGORY 41: "PHP 8.4 Synergy" (Attribute Inheritance)
* **Q :** Peut-on hériter des attributs de sécurité (ex: `#[IsGranted]`) d'une interface sur une classe implémentant cette interface ?
* **R :** Non, par défaut PHP n'hérite pas des attributs des interfaces. Cependant, Symfony scanne intelligemment les classes parentes et les interfaces pour certains attributs comme `#[Route]`, mais pour la sécurité, il est préférable de les redéfinir explicitement sur la classe ou la méthode.
* **Exemple :**
```php
#[IsGranted('ROLE_USER')] // À mettre sur la classe concrète
class MyController implements MyInterface { ... }
```
* **Piège :** Ne comptez jamais sur l'héritage d'attributs de sécurité depuis une interface pour protéger vos méthodes, testez toujours via un test fonctionnel.

## CATEGORY 42: "The Trap Room" (Multiple User Providers)
* **Q :** Si vous avez configuré plusieurs `providers` dans un firewall via `chain`, que se passe-t-il si le premier provider trouve un utilisateur mais que le mot de passe est invalide ?
* **R :** L'authentification échoue immédiatement. Symfony n'essaiera **pas** le second provider si l'utilisateur a été trouvé par le premier mais que les credentials sont faux.
* **Exemple :**
```yaml
providers:
    chain_provider:
        chain:
            providers: [db_users, ldap_users]
```
* **Piège :** Le "chaining" ne sert qu'à **trouver** l'objet utilisateur (l'identité). Une fois l'utilisateur identifié, c'est ce compte (et lui seul) qui est testé pour l'authentification.

## CATEGORY 43: "Signature Specialist" (UserInterface - eraseCredentials)
* **Q :** Pourquoi la méthode `eraseCredentials()` est-elle obligatoire dans `UserInterface` ?
* **R :** Pour permettre de supprimer de l'objet utilisateur les données sensibles temporaires (ex: le mot de passe en clair stocké juste pendant le formulaire) après l'authentification réussie.
* **Exemple :**
```php
public function eraseCredentials(): void {
    $this->plainPassword = null;
}
```
* **Piège :** Oublier de vider ces données peut laisser traîner des mots de passe en clair dans la mémoire de PHP ou dans les logs du Profiler.
