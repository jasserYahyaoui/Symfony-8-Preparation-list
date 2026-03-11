# Ticket: Exception and Error Handling

## 🎯 Le Besoin
Lorsqu'un utilisateur tente d'accéder à un fichier PDF sécurisé via une fonction `downloadInvoice(int $invoiceId)`, plusieurs choses peuvent mal tourner :
1. La facture n'existe pas en base de données.
2. L'utilisateur n'a pas les droits pour cette facture.

Si une erreur se produit, nous ne voulons pas planter l'application brutalement. Nous voulons attraper l'erreur et retourner un message formaté.

## 📋 Directives
- **Utiliser :** Des exceptions personnalisées (`InvoiceNotFoundException` et `UnauthorizedAccessExeption`).
- **Architecture :** Un bloc `try ... catch ... finally`.
- **Mécanique :** 
  - Dans le `try`, faire les conditions qui lancent (`throw`) les exceptions.
  - Dans les `catch`, renvoyer un tableau JSON fictif avec une clé d'erreur.
  - Dans le `finally`, simuler la fermeture d'une ressource (ex: réinitialisation du contexte).
- **PHP :** Typage strict et utilisation du constructeur natif de l'Exception (`\RuntimeException` ou `\Exception`).

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Service;

class InvoiceNotFoundException extends \RuntimeException {}
class UnauthorizedAccessException extends \RuntimeException {}

class InvoiceDownloader
{
    public function downloadInvoice(int $invoiceId, bool $isAdmin): array
    {
        $filePointer = fopen('php://memory', 'r+'); // ressource factice

        try {
            if ($invoiceId > 1000) {
                throw new InvoiceNotFoundException("La facture avec l'ID {$invoiceId} n'existe pas.");
            }

            if (!$isAdmin) {
                throw new UnauthorizedAccessException("Vous n'avez pas l'autorisation de télécharger cette facture.");
            }

            // Code valide
            return [
                'status' => 'success',
                'data' => 'PDF_CONTENT_HERE'
            ];

        } catch (InvoiceNotFoundException $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        } catch (UnauthorizedAccessException $e) {
            return ['status' => 'forbidden', 'message' => $e->getMessage()];
        } catch (\Throwable $e) { // Attrape toutes les autres erreurs fatales et exceptions
            return ['status' => 'critical', 'message' => 'Erreur inattendue.'];
        } finally {
            // Le bloc finally est TOUJOURS exécuté, même après un return dans le try/catch.
            // Parfait pour fermer des ressources réseaux, fichiers, etc.
            if (is_resource($filePointer)) {
                fclose($filePointer);
            }
        }
    }
}

// Test
$service = new InvoiceDownloader();
print_r($service->downloadInvoice(999, false)); 
// Array ( [status] => forbidden [message] => Vous n'avez pas l'autorisation... )
```

</details>
