# Ticket: HTTP Specification (RFC 9110) Concepts

## 🎯 Le Besoin
En respectant strictement la norme RFC 9110, vous implémentez une API REST pour interagir avec des paramètres de l'application (`Settings`).
Lorsqu'on envoie un `PATCH` sur l'ID 5 pour activer la maintenance, si l'ID 5 n'existe pas, que renvoyer ?
Si la méthode demandée n'est pas supportée par l'API (ex: `TRACE`), que doit faire l'architecture de votre application ?

*Ce ticket est plutôt un exercice d'application de la théorie via des comportements attendus, car le noyau Symfony gère automatiquement beaucoup de ces points.*

## 📋 Directives
- **Connaître :** La sémantique des codes HTTP et de la RFC 9110.
- **Composant :** 
  - Pour une ressource introuvable (`PATCH` sur un ID inexistant), on doit renvoyer une réponse spécifique. 
  - Créer un contrôleur qui jette l'exception adéquate si l'entité n'existe pas, qui sera automatiquement convertie par Symfony.
- **Solution théorique HTTP :** 
  - Si l'ID n'existe pas : Code HTTP **404**.
  - Si méthode non supportée : Le Router Symfony s'en occupe et jette une `MethodNotAllowedHttpException` entraînant un Code **405 Method Not Allowed**.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

class SettingsController extends AbstractController
{
    /**
     * PATCH : Modification PARTIELLE selon la RFC 9110.
     * Si la ressource n'existe pas, on doit renvoyer une erreur 404.
     */
    #[Route('/api/settings/{id}', name: 'api_settings_patch', methods: ['PATCH'])]
    public function partialUpdate(int $id): JsonResponse
    {
        // Simuler la recherche de l'entité en BDD
        $settingExists = ($id === 1); // Fictivement, seul l'ID 1 existe.

        if (!$settingExists) {
            // Dans Symfony, jeter une NotFoundHttpException
            // demandera au kernel de générer automatiquement une Response 404 (Not Found)
            throw new NotFoundHttpException(sprintf('Le paramètre %d n\'existe pas.', $id));
            
            // On pourrait également retourner explicitement une JsonResponse :
            // return new JsonResponse(['error' => 'Not Found'], Response::HTTP_NOT_FOUND);
        }

        // On modifie l'entité partiellement...
        
        return new JsonResponse(['id' => $id, 'maintenance' => true]);
    }
}
```

</details>
