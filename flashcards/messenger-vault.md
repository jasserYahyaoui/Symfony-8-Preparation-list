# Flashcards : Messenger Vault (Expert Level)

## CATEGORY 1: "Internal Trace" (Middleware Execution Order)
* **Q :** Quel est l'ordre d'exécution exact des middlewares dans un bus Messenger (modèle de l'oignon) ?
* **R :** Les middlewares s'exécutent dans l'ordre de leur déclaration pour la phase "aller" (avant le handler) et dans l'ordre **inverse** pour la phase "retour" (après le handler).
* **Exemple :**
```yaml
# messenger.yaml
middleware:
    - middleware_a
    - middleware_b
# Ordre : A(start) -> B(start) -> Handler -> B(end) -> A(end)
```
* **Piège :** Le middleware `send_message` est celui qui décide si le message part vers un transport asynchrone. S'il est placé avant un middleware de log, ce dernier ne loguera jamais le message en mode asynchrone car l'exécution s'arrêtera au `send_message`.

## CATEGORY 2: "Signature Specialist" (MiddlewareInterface)
* **Q :** Quelle est la signature exacte de la méthode `handle()` dans `MiddlewareInterface` ?
* **R :** `public function handle(Envelope $envelope, StackInterface $stack): Envelope;`.
* **Exemple :**
```php
use Symfony\Component\Messenger\Middleware\MiddlewareInterface;

public function handle(Envelope $envelope, StackInterface $stack): Envelope {
    // Phase ALLER
    $envelope = $stack->next()->handle($envelope, $stack);
    // Phase RETOUR
    return $envelope;
}
```
* **Piège :** Vous devez impérativement retourner un objet `Envelope`. Oublier d'appeler `$stack->next()->handle()` brisera totalement la chaîne d'exécution du bus.

## CATEGORY 3: "PHP 8.4 Synergy" (Asymmetric Visibility on Messages)
* **Q :** Comment la **Asymmetric Visibility** (PHP 8.4) améliore-t-elle la conception des messages (DTO) ?
* **R :** Elle permet de définir des messages avec des propriétés publiques en lecture (plus besoin de getters) mais privées en écriture, garantissant l'immutabilité du message une fois dispatché.
* **Exemple :**
```php
readonly class SendEmailMessage {
    public function __construct(
        public private(set) string $recipient,
        public private(set) string $content,
    ) {}
}
```
* **Piège :** Bien que `public`, la propriété ne peut pas être modifiée par un Middleware ou un Handler. Seul le constructeur (ou la classe elle-même) peut définir la valeur.

## CATEGORY 4: "Internal Trace" (Stamp vs Envelope)
* **Q :** Quelle est la différence fondamentale entre une `Envelope` et un `Stamp` dans Messenger ?
* **R :** L'`Envelope` enveloppe le message (votre DTO). Les `Stamps` sont des métadonnées attachées à l'enveloppe (ex: `DelayStamp`, `BusNameStamp`) pour configurer le comportement du bus ou du transport.
* **Exemple :**
```php
$bus->dispatch(new MyMessage(), [
    new DelayStamp(5000), // Ajoute un Stamp à l'Envelope
]);
```
* **Piège :** Votre message PHP brut ne contient jamais de Stamps. C'est l'Envelope (créée par le bus ou manuellement) qui porte la collection de Stamps.

## CATEGORY 5: "Signature Specialist" (TransportInterface)
* **Q :** Quelles sont les deux méthodes principales qu'un transport Messenger doit implémenter pour être capable d'envoyer et recevoir des messages ?
* **R :** `get(): iterable` (pour récupérer les messages depuis la file) et `send(Envelope $envelope): Envelope` (pour expédier un message vers la file).
* **Exemple :**
```php
use Symfony\Component\Messenger\Transport\TransportInterface;

class MyTransport implements TransportInterface {
    public function get(): iterable { ... }
    public function send(Envelope $envelope): Envelope { ... }
    public function ack(Envelope $envelope): void { ... }
    public function reject(Envelope $envelope): void { ... }
}
```
* **Piège :** Un transport doit aussi implémenter `ack()` (confirmer la lecture) et `reject()` (rejeter le message) pour gérer le cycle de vie complet du Worker.
