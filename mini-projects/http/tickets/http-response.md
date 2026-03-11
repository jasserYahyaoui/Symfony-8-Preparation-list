# Ticket: HTTP Response Flexibility

## 🎯 Le Besoin
Votre contrôleur doit pouvoir renvoyer autre chose qu'un simple texte HTML.
Vous avez 3 routes à créer :
1. `/download-pdf` qui force le téléchargement du fichier `invoice.pdf` généré dans votre dossier temporaire (`/tmp/invoice.pdf`).
2. `/api/status` qui renvoie un payload JSON pur : `{"status": "ok"}`
3. `/legacy-route` qui redirige **définitivement (301)** le visiteur vers la nouvelle route `api_status`.

## 📋 Directives
- **Utiliser :** Différents types de réponses du composant HttpFoundation.
- **Classes :**
  - `BinaryFileResponse` pour le PDF.
  - `JsonResponse` pour l'API.
  - `RedirectResponse` (ou un helper du controller) pour la redirection 301.
- **PHP 8.4 & Symfony 8.0 :** Utilisation des constantes HTTP (`Response::HTTP_MOVED_PERMANENTLY`, etc).

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;

class UtilitiesController extends AbstractController
{
    /**
     * 1. Action : Forcer le téléchargement
     */
    #[Route('/download-pdf', name: 'download_pdf', methods: ['GET'])]
    public function downloadPdf(): BinaryFileResponse
    {
        $file = '/tmp/invoice.pdf'; // Chemin absolu du fichier (simulé)

        $response = new BinaryFileResponse($file);
        
        // Force le header Content-Disposition: attachment au lieu de "inline"
        // Cela oblige le navigateur à afficher la popup de téléchargement
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            'facture_2026.pdf' // Nom sous lequel l'utilisateur va le voir
        );

        return $response;
    }

    /**
     * 2. Action : Renvoyer du JSON
     */
    #[Route('/api/status', name: 'api_status', methods: ['GET'])]
    public function getStatus(): JsonResponse
    {
        // JsonResponse s'occupe de faire le json_encode()
        // et ajoute automatiquement le header Content-Type: application/json
        return new JsonResponse(['status' => 'ok']);
    }

    /**
     * 3. Action : Redirection Permanente
     */
    #[Route('/legacy-route', methods: ['GET'])]
    public function legacyRedirect(): RedirectResponse
    {
        // On génère l'URL grâce au "name" de la route destination
        $url = $this->generateUrl('api_status');

        // Utiliser le code 301 par défaut (le navigateur mettra en cache la redirection)
        // 301 = Move Permanently | 302/303/307 = Temporaire
        return new RedirectResponse($url, 301);
        
        // Alternative Symfony helper plus courte :
        // return $this->redirectToRoute('api_status', [], 301);
    }
}
```

</details>
