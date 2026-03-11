# Ticket: PHP 8.4 Specifics - Property Hooks & Asymmetric Visibility

## 🎯 Le Besoin
Dans une entité Symfony `Product`, vous devez avoir une propriété virtuelle `priceFormatted`, qui renvoie le prix brut de l'entité (`$this->price` en centimes) divisé par 100 et concaténé avec le symbole "€". 
De plus, la propriété interne d'identifiant `$id` doit pouvoir être lue par n'importe qui (`$product->id`), mais ne doit pouvoir être modifiée **que** par la classe elle-même (ex: doctrine lors de la construction).

## 📋 Directives
- **Utiliser :** Property Hooks (PHP 8.4) avec `get` pour la propriété calculée `priceFormatted`.
- **Utiliser :** Asymmetric Visibility (PHP 8.4) avec `public private(set)` pour l'identifiant.
- **Contexte :** Une classe fictive `Product` instanciée avec un prix et un ID.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Entity;

class Product
{
    // NOUVEAUTÉ PHP 8.4 : Asymmetric Visibility
    // Tout le monde peut LIRE l'id ($product->id)
    // Seule cette classe (et doctrine) peut le SET. 
    // Fini le getteur/setteur classique ou le readonly strict !
    public private(set) int $id;

    public function __construct(
        int $id,
        public int $priceInCents // Typiquement stocké en centimes
    ) {
        $this->id = $id;
    }

    // NOUVEAUTÉ PHP 8.4 : Property Hooks
    // Propriété "virtuelle", elle ne stocke pas de données, elle les calcule à la volée.
    public string $priceFormatted {
        get {
            $euros = $this->priceInCents / 100;
            return number_format($euros, 2, ',', ' ') . ' €';
        }
    }

    // Exemple de Hook avec Set (optionnel) : s'assurer que le prix n'est jamais négatif
    public int $safePrice {
        set(int $value) {
            if ($value < 0) {
                throw new \InvalidArgumentException('Le prix ne peut être négatif.');
            }
            $this->safePrice = $value; // Le backing value est géré automatiquement
        }
        get => $this->safePrice ?? 0;
    }
}

// Utilisation
$p = new Product(10, 1599); // 15.99 €

// Lecture autorisée
echo "ID: " . $p->id . "\n"; 

// Hook "Get" exécuté !
echo "Prix: " . $p->priceFormatted . "\n"; 

// Écriture impossible ! Erreur fatale car private(set)
// $p->id = 50; 
```

</details>
