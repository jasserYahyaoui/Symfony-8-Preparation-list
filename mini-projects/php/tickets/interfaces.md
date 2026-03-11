# Ticket: PHP Interfaces

## 🎯 Le Besoin
Dans Symfony, on a souvent besoin que plusieurs objets différents répondent au même contrat.
Imaginons un système de formatage de données avec plusieurs formateurs disponibles : `JsonFormatter`, `XmlFormatter`, `YamlFormatter`.

Votre classe `ReportGenerator` a besoin d'un formateur pour exporter un rapport, mais elle ne doit pas dépendre d'une classe concrète, pour qu'on puisse changer de format facilement à tout moment.

## 📋 Directives
- **Utiliser :** L'interface `FormatterInterface`.
- **Rôle de l'interface :** Forcer n'importe quel formateur à implémenter une méthode `format(array $data): string`.
- **Implémentation concrète :** Créer `JsonFormatter` qui implémente cette interface (en utilisant la fonction native `json_encode`).
- **Dependency Injection (Théorique) :** Créer la classe `ReportGenerator` recevant le `FormatterInterface` dans son constructeur.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Formatter;

/**
 * CONTRAT : Toute classe voulant être un Formatter DOIT avoir cette méthode.
 */
interface FormatterInterface
{
    public function format(array $data): string;
}

/**
 * IMPLEMENTATION n°1
 */
class JsonFormatter implements FormatterInterface
{
    public function format(array $data): string
    {
        return json_encode($data, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    }
}

/**
 * CONSUMER : Ne connait pas JsonFormatter, il connait juste l'Interface ! 
 * C'est le principe central de l'Injection de Dépendance (DI) dans Symfony.
 */
class ReportGenerator
{
    // L'injection se fait via l'interface. Symfony injectera la bonne classe configurée (Autowiring)
    public function __construct(
        private readonly FormatterInterface $formatter
    ) {}

    public function generate(array $reportData): string
    {
        // On sait que ->format() existe car c'est garanti par FormatterInterface.
        return $this->formatter->format($reportData);
    }
}

// Utilisation manuelle
$jsonFormatter = new JsonFormatter();
$generator = new ReportGenerator($jsonFormatter);
echo $generator->generate(['user' => 'admin', 'status' => 'active']);
```

</details>
