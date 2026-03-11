# Ticket: Abstract Classes vs Interfaces

## 🎯 Le Besoin
L'équipe a besoin de modéliser un système de paiement. Nous avons plusieurs types de passerelles de paiement (Stripe, PayPal). 
Toutes les passerelles doivent obligatoirement posséder une méthode `pay(float $amount)`. Cependant, elles doivent également partager une méthode commune `logTransaction(string $message)` qui écrit dans un système de logs, identique pour tous, sans que chaque classe ait à la réécrire.

## 📋 Directives
- **Utiliser :** Une `abstract class` et non une `interface`.
- **Méthodes :** 
  - Une méthode abstraite `pay(float $amount): bool`.
  - Une méthode concrète `logTransaction(string $message): void`.
- **Implémentation :** Créer une classe `StripeGateway` qui hérite de cette classe abstraite et implémente la méthode de paiement.
- **PHP 8.4 :** Utiliser le typage strict et, si pertinent, la visibilité asymétrique (hook) pour une propriété (ex: la clé d'API).

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Payment;

abstract class AbstractPaymentGateway
{
    // PHP 8.4 Asymmetric Visibility : Readable from outside, but mutable only inside.
    public private(set) string $lastTransactionId = '';

    /**
     * Chaque système de paiement doit implémenter sa logique.
     */
    abstract public function pay(float $amount): bool;

    /**
     * Méthode commune partagée entre toutes les classes enfants.
     */
    public function logTransaction(string $message): void
    {
        // Dans Symfony, on injecterait un LoggerInterface ici,
        // mais pour l'exemple PHP natif :
        $time = (new \DateTimeImmutable())->format('Y-m-d H:i:s');
        error_log("[{$time}] PAYMENT LOG: {$message}");
    }
}

class StripeGateway extends AbstractPaymentGateway
{
    public function __construct(
        private readonly string $secretKey
    ) {}

    public function pay(float $amount): bool
    {
        // Logique fictive d'appel à l'API Stripe...
        $this->logTransaction("Attempting Stripe payment for amount: {$amount}");
        
        $success = true; // Simulation
        
        if ($success) {
            $this->lastTransactionId = uniqid('stripe_');
            $this->logTransaction("Success! ID: {$this->lastTransactionId}");
        }

        return $success;
    }
}

// Utilisation :
$gateway = new StripeGateway('sk_test_123');
$gateway->pay(50.0);
echo $gateway->lastTransactionId;
```

</details>
