# Ticket: PHP Enums in Symfony

## 🎯 Le Besoin
Vous devez gérer le statut d'une commande (`Order`) dans votre application de e-commerce. Les statuts possibles sont : `PENDING`, `PAID`, `SHIPPED`, `CANCELLED`.
Avant PHP 8.1, on utilisait souvent des constantes de classe (`const STATUS_PENDING = 'pending';`). Vous devez moderniser cela.

## 📋 Directives
- **Utiliser :** Un `Backed Enum` (String Enum) au lieu des constantes de classe.
- **Rôle :** Définir les valeurs sous-jacentes pour la base de données (ex: `'pending'`, `'paid'`).
- **Méthode :** Ajouter une méthode `getLabel(): string` à l'enum qui renvoie une version lisible par l'homme (ex: "En attente", "Payée", "Expédiée", "Annulée") que vous pourrez utiliser dans un template Twig ou un Formulaire Symfony.
- **PHP 8.4 :** L'utiliser dans une classe `Order` avec un typage strict et une propriété par défaut.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Model;

/**
 * Backed Enum : chaque cas est associé à une valeur textuelle.
 */
enum OrderStatus: string
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case SHIPPED = 'shipped';
    case CANCELLED = 'cancelled';

    /**
     * Méthode permettant de traduire l'enum pour l'UI (Twig / Form ChoiceType)
     */
    public function getLabel(): string
    {
        return match($this) {
            self::PENDING => 'En attente',
            self::PAID => 'Payée',
            self::SHIPPED => 'Expédiée',
            self::CANCELLED => 'Annulée',
        };
    }
    
    // PHP 8.4 : Optionnellement on peut utiliser des attributs sur les cases !
}

class Order
{
    // PHP 8.4 Property Hooks pourraient être utilisés ici, mais on garde simple
    public function __construct(
        public int $id,
        public OrderStatus $status = OrderStatus::PENDING
    ) {}

    public function markAsPaid(): void
    {
        $this->status = OrderStatus::PAID;
    }
}

// Utilisation
$order = new Order(101);
echo $order->status->value; // Affiche : pending
echo $order->status->getLabel(); // Affiche : En attente

$order->markAsPaid();
echo $order->status->name; // Affiche : PAID
```

</details>
