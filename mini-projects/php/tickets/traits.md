# Ticket: PHP Traits

## 🎯 Le Besoin
Il vous arrive de créer des `EventListeners` et des `Command` de console dans Symfony qui ont toutes deux besoin de formater des logs d'une façon très spécifique interne à votre entreprise (`[CORP_LOG] - 2025-01-01 : ...`).
Puisqu'en PHP l'héritage multiple (extender 2 classes) est impossible (une `Command` hérite déjà de `Symfony\Component\Console\Command\Command`), comment partager cette méthode `logCorp()` entre ces deux classes distinctes ?

## 📋 Directives
- **Utiliser :** Un `Trait`.
- **Mécanique :** Créer le trait `CorpLogTrait` contenant la méthode.
- **Intégration :** L'inclure avec le mot-clé `use` à l'intérieur d'une classe fictive.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Utils;

/**
 * 1. Définition du Trait
 * Le trait est littéralement "copié-collé" par le compilateur là où on l'utilise.
 */
trait CorpLogTrait
{
    public function logCorp(string $message): void
    {
        $date = (new \DateTimeImmutable())->format('Y-m-d H:i:s');
        $formatted = "[CORP_LOG] - {$date} : {$message}";
        
        // Logique fictive
        echo $formatted . "\n";
    }
}

/**
 * 2. Utilisation dans une classe qui hérite DÉJÀ d'autre chose
 */
abstract class CoreController {}

class MyCustomController extends CoreController
{
    // INCLUSION DU TRAIT
    use CorpLogTrait;

    public function doSomething(): void
    {
        // La méthode logCorp est maintenant disponible comme si
        // elle avait été écrite directement dans cette classe.
        $this->logCorp("Action terminée dans le contrôleur.");
    }
}

// Test
$controller = new MyCustomController();
$controller->doSomething(); 
// Affiche : [CORP_LOG] - 2026-10-10 12:00:00 : Action terminée dans le contrôleur.
```

</details>
