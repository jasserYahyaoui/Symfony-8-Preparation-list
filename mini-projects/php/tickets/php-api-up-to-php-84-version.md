# Ticket: PHP Standard API up to 8.4

## 🎯 Le Besoin
Vous recevez une chaîne de caractères tapée par l'utilisateur: `"   HeLlo, wOrLd!  "$. Vous devez nettoyer cette chaîne :`
1. Enlever les espaces avant et après.
2. Tout mettre en minuscules, **en gérant correctement l'UTF-8** (les accents éventuels).
3. Vérifier rapidement si la chaîne nettoyée commence exactement par `"hello"`.

## 📋 Directives
- **Utiliser :** La fonction `trim()`.
- **Utiliser :** La fonction native de PHP 8 `str_starts_with()`.
- **Utiliser :** La fonction `mb_strtolower()` pour la gestion sécurisée des accents/UTF-8.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Utils;

class TextCleaner
{
    public function cleanAndVerify(string $rawInput): bool
    {
        // 1. Trim espaces
        $trimmed = trim($rawInput);

        // 2. Minuscules (UTF-8 safe ! Ne jamais utiliser strtolower en Symfony)
        $lowercased = mb_strtolower($trimmed);

        // 3. Nouveauté native (PHP 8.0)
        // Remplace l'ancienne méthode avec strpos(...) === 0
        return str_starts_with($lowercased, 'hello');
    }
}

// Utilisation
$cleaner = new TextCleaner();
$input = "   HeLlo, wOrLd!  ";

$isValid = $cleaner->cleanAndVerify($input);

if ($isValid) {
    echo "La chaîne est valide et commence par hello.";
}
```

</details>
