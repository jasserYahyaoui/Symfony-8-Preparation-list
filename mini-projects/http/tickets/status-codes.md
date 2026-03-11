# Ticket: HTTP Status Codes

## 🎯 Le Besoin
Dans un projet e-commerce, un visiteur non authentifié essaie d'accéder au dossier de factures protégé. On doit l'informer qu'il a besoin de se connecter (`401`).
Un client payant essaie d'accéder à la facture d'un *autre client*. On doit l'informer qui n'a pas les droits pour cette ressource spécifique (`403`).
Un utilisateur envoie un formulaire POST incomplet ou avec des données erronées. La validation échoue. (`400` ou `422`).

Vous devez retourner ces différents cas sous forme de JSON fictif pour une API.

## 📋 Directives
- **Utiliser :** L'objet `JsonResponse`.
- **Norme :** Ne **JAMAIS** écrire les codes HTTP numériquement (ex: `403` en dur), sauf absolue nécessité.
- **Utiliser :** Les constantes de la classe `Symfony\Component\HttpFoundation\Response` (ex: `Response::HTTP_UNAUTHORIZED`).
- **PHP 8.4 :** Construire un contrôleur avec plusieurs méthodes illustrant ces retours.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class InvoiceApiController extends AbstractController
{
    /**
     * Utilisateur non identifié (Auth req.) -> 401 Unauthorized
     */
    #[Route('/api/invoices', methods: ['GET'])]
    public function listInvoices(bool $isLoggedIn = false): JsonResponse
    {
        if (!$isLoggedIn) {
            return new JsonResponse(
                ['error' => 'You must be logged in to view invoices.'],
                Response::HTTP_UNAUTHORIZED // Code 401
            );
        }
        
        return new JsonResponse(['data' => []], Response::HTTP_OK); // Code 200
    }

    /**
     * Utilisateur identifié, mais ressource interdite (Forbidden) -> 403
     */
    #[Route('/api/invoices/{id}', methods: ['GET'])]
    public function showInvoice(int $id, bool $userOwnsInvoice = false): JsonResponse
    {
        if (!$userOwnsInvoice) {
            return new JsonResponse(
                ['error' => 'You do not own this invoice.'],
                Response::HTTP_FORBIDDEN // Code 403
            );
        }

        return new JsonResponse(['invoice_id' => $id]);
    }

    /**
     * Mauvaise requête (données de formulaire invalides) -> 400 Bad Request / 422 Unprocessable Content
     */
    #[Route('/api/invoices', methods: ['POST'])]
    public function createInvoice(array $payload = []): JsonResponse
    {
        // Simulation d'une erreur de validation (ex: le champ 'amount' est manquant)
        if (empty($payload['amount'])) {
            // HTTP_UNPROCESSABLE_ENTITY (422) est de plus en plus privilégié 
            // pour les erreurs de validation sémantique plutôt qu'un vague 400.
            return new JsonResponse(
                ['error' => 'The amount is required.'],
                Response::HTTP_UNPROCESSABLE_ENTITY // Code 422
            );
        }

        // Si tout va bien (Création réussie)
        return new JsonResponse(
            ['status' => 'Invoice Created'], 
            Response::HTTP_CREATED // Code 201
        );
    }
}
```

</details>
