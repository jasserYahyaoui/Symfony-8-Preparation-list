# Ticket: Namespaces & Use Statements

## 🎯 Le Besoin
Vous écrivez un composant très basique de base de données.
Vous avez besoin d'importer et d'utiliser la classe globale `PDO` (Native à PHP).
Vous créez 2 classes qui doivent se parler : `App\Database\Connection` et `App\Query\QueryBuilder`.

## 📋 Directives
- **Utiliser :** Les `namespace` appropriés au début de chaque fichier (virtuel).
- **Utilisation du Global Space :** Dans `Connection`, utiliser `\PDO`, soit en utilisant un antislash direct lors de l'instanciation, soit avec un mot-clé `use PDO;`.
- **Interopérabilité :** Importer la classe de `App\Database\Connection` pour l'utiliser dans `App\Query\QueryBuilder` en utilisant un mot-clé `use`.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

// --- Fichier 1 : src/Database/Connection.php ---
namespace App\Database;

use PDO; // Importation de la classe depuis le root namespace global de PHP (\)

class Connection
{
    public function getPdo(): PDO
    {
        // Utilisation de la classe PDO native
        return new PDO('sqlite::memory:');
    }
}


// --- Fichier 2 : src/Query/QueryBuilder.php ---
namespace App\Query;

// Importation de la classe Connection qui est dans un AUTRE namespace
use App\Database\Connection;
use PDO;

class QueryBuilder
{
    private PDO $pdo;

    public function __construct(Connection $connection)
    {
        // On récupère le PDO fourni
        $this->pdo = $connection->getPdo();
    }

    public function fetchAll(string $sql): array
    {
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
```

</details>
