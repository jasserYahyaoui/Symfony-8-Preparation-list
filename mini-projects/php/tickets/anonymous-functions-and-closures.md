# Ticket: Anonymous Functions & Closures

## 🎯 Le Besoin
Vous devez transformer un tableau de prix bruts (ex: `[10.0, 25.5, 50.0]`) en un tableau de prix formatés tout en appliquant une taxe dynamique. Le taux de la taxe est défini dans une variable externe au contexte de la boucle, et vous ne souhaitez pas créer de fonction globale.

## 📋 Directives
- **Utiliser :** La fonction `array_map()`.
- **Utiliser :** Une Closure (fonction anonyme) avec une "First-class callable" ou une fonction fléchée (Arrow Function) selon le contexte.
- **Paramètre externe :** Capturer la variable `$taxRate = 1.20;` dans la closure.
- **PHP 8.4 :** Profiter de la syntaxe condensée des *Arrow Functions* (`fn() => ...`) apparue en PHP 7.4 et stabilisée en PHP 8.x, puisque le contexte d'une arrow function capture automatiquement le scope parent par valeur.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Pricing;

class PriceFormatter
{
    public function applyTaxToPrices(array $rawPrices, float $taxRate): array
    {
        // Solution moderne (PHP 7.4+ -> PHP 8.4) avec Arrow Function.
        // Les arrow functions capturent automatiquement les variables du scope ($taxRate).
        return array_map(
            fn(float $price): float => round($price * $taxRate, 2),
            $rawPrices
        );
    }
    
    public function applyTaxClassic(array $rawPrices, float $taxRate): array
    {
        // Solution "classique" avec fonction anonyme standard (Closure)
        // et l'utilisation de `use()` pour importer la variable.
        return array_map(
            function (float $price) use ($taxRate): float {
                return round($price * $taxRate, 2);
            },
            $rawPrices
        );
    }
}

// Utilisation
$formatter = new PriceFormatter();
$prices = [10.50, 45.0, 100.0];
$taxRate = 1.20; // 20% TVA

$mapped = $formatter->applyTaxToPrices($prices, $taxRate);
// Résultat : [12.6, 54.0, 120.0]
```

</details>
