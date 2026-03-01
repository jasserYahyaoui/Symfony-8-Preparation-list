# Flashcards : Mini-Projets Expert (Pratique)

## 1) Authentification complète + durcissement sécurité
* **Q :** Comment implémenter un système de "Remember Me" sécurisé dans Symfony 8 ?
* **R :** Activez l'option `remember_me` sous votre firewall dans `security.yaml` et assurez-vous d'avoir une `secret` clé robuste. Le badge `RememberMeBadge` doit être ajouté au `Passport` dans l'Authenticator.
* **Exemple :**
```yaml
# security.yaml
firewalls:
    main:
        remember_me:
            secret: '%kernel.secret%'
            lifetime: 604800 # 1 semaine
```
* **Piège :** Le "Remember Me" ne fonctionne pas si l'utilisateur ne coche pas la case correspondante dans le formulaire (nommée `_remember_me` par défaut), à moins de forcer l'option `always_remember_me: true`.

## 2) API HTTP orientée cache
* **Q :** Quelle est la différence entre l'en-tête `ETag` et `Last-Modified` pour la validation du cache ?
* **R :** `ETag` est une empreinte (hash) du contenu de la réponse. `Last-Modified` est une date de dernière modification. Les deux permettent de renvoyer une 304 si la ressource n'a pas changé.
* **Exemple :**
```php
$response->setLastModified($product->getUpdatedAt());
$response->setEtag(md5($product->getDescription()));

if ($response->isNotModified($request)) {
    return $response;
}
```
* **Piège :** Si vous utilisez les deux, Symfony (et les navigateurs) vérifiera les deux. Si l'un des deux indique que la ressource a changé, le cache sera invalidé.

## 3) Routing avancé multi-locale
* **Q :** Comment définir une route qui utilise un domaine différent selon la langue (ex: .fr pour le français, .com pour l'anglais) ?
* **R :** Utilisez l'option `host` combinée avec le paramètre spécial `{_locale}` ou des variables de configuration.
* **Exemple :**
```php
#[Route('/', name: 'homepage', host: '{subdomain}.example.com', defaults: ['subdomain' => 'www'])]
public function index() { ... }
```
* **Piège :** Le matching par `host` est sensible à la casse selon la configuration du serveur web. Symfony facilite cela mais nécessite que les `trusted_hosts` soient correctement configurés en production.

## 4) Formulaire complexe
* **Q :** Comment modifier dynamiquement un champ de formulaire en fonction des données d'un autre champ (ex: liste de villes selon le pays choisi) ?
* **R :** Utilisez les événements de formulaire, principalement `PRE_SET_DATA` (initialisation) et `PRE_SUBMIT` (soumission). Vous pouvez rajouter ou modifier des champs sur l'objet `Form` reçu dans l'événement.
* **Exemple :**
```php
$builder->get('country')->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {
    $form = $event->getForm()->getParent();
    $country = $event->getData();
    $form->add('city', EntityType::class, ['choices' => $country->getCities()]);
});
```
* **Piège :** Lors de l'événement `PRE_SUBMIT`, les données ne sont pas encore converties en objets ; ce sont des tableaux de chaînes de caractères provenant de la requête HTTP.

## 5) DI avancée
* **Q :** Quel est l'intérêt d'utiliser un `ServiceLocator` (via `ServiceSubscriberInterface`) plutôt que d'injecter directement 10 services dans un constructeur ?
* **R :** Cela permet le chargement "Lazy" (paresseux) : les services ne sont instanciés que s'ils sont réellement appelés, ce qui économise de la mémoire et du temps processeur si certains services sont rarement utilisés.
* **Exemple :**
```php
class MyService implements ServiceSubscriberInterface {
    public function __construct(private ContainerInterface $container) {}
    public static function getSubscribedServices(): array {
        return ['logger' => LoggerInterface::class];
    }
    public function do() { $this->container->get('logger')->info('...'); }
}
```
* **Piège :** Ne pas confondre avec l'anti-pattern "Service Locator" global. Ici, le Locator est restreint aux services déclarés dans `getSubscribedServices()`, respectant l'encapsulation.

## 6) Messenger en production-like
* **Q :** Que se passe-t-il si un message Messenger échoue définitivement après avoir épuisé toutes les tentatives de re-tentative (`retries`) ?
* **R :** Le message est envoyé vers le `failure_transport` (s'il est configuré). Cela permet de stocker les messages en erreur pour une inspection manuelle ultérieure sans bloquer la queue principale.
* **Exemple :**
```yaml
framework:
    messenger:
        failure_transport: failed
        transports:
            failed: 'doctrine://default?queue_name=failed'
```
* **Piège :** Si aucun `failure_transport` n'est défini, le message est simplement supprimé après l'échec de la dernière tentative, et une erreur est logguée. Les données peuvent être perdues !

## 7) Console ops toolkit
* **Q :** Comment tester une commande console Symfony de manière automatisée ?
* **R :** En utilisant la classe `CommandTester`. Elle permet de simuler les entrées utilisateur et de vérifier la sortie texte de la commande.
* **Exemple :**
```php
$command = $application->find('app:my-command');
$tester = new CommandTester($command);
$tester->execute(['name' => 'Jean']);
$this->assertStringContainsString('Hello Jean', $tester->getDisplay());
```
* **Piège :** `CommandTester` ne teste pas l'exécution réelle dans un terminal (processus séparé) mais appelle directement la méthode `execute()` dans le même processus PHP.

## 8) Pack debug & observabilité
* **Q :** Comment créer un `DataCollector` personnalisé pour le Profiler Symfony ?
* **R :** Créez une classe héritant de `AbstractDataCollector`, implémentez la méthode `collect()` et déclarez-la comme service avec le tag `data_collector`.
* **Exemple :**
```php
class MyCollector extends AbstractDataCollector {
    public function collect(Request $request, Response $response, \Throwable $exception = null): void {
        $this->data = ['nb_items' => 42];
    }
    public static function getTemplate(): ?string {
        return 'data_collector/my_collector.html.twig';
    }
}
```
* **Piège :** La méthode `collect()` est appelée à la toute fin de la requête. Vous devez donc stocker dans `$this->data` toutes les informations récoltées pendant le cycle de vie pour qu'elles soient persistées par le Profiler.
