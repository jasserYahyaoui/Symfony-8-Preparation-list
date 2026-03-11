# Ticket: Content Negotiation

## 🎯 Le Besoin
Une route d'API `/api/user` doit pouvoir renvoyer les informations de l'utilisateur. 
Cependant, l'utilisateur (le client HTTP) peut choisir comment il veut recevoir l'information en envoyant l'en-tête `Accept`.
S'il envoie `Accept: application/json`, on renvoie du JSON.
S'il envoie `Accept: application/xml`, on renvoie du XML.
Sinon, par défaut, on renvoie une erreur `406 Not Acceptable`.

## 📋 Directives
- **Utiliser :** L'objet `Request` injecté dans la méthode du contrôleur.
- **Méthode :** Lire l'en-tête `Accept` ou utiliser `$request->getAcceptableContentTypes()`.
- **Réponses :** Renvoyer une `JsonResponse` ou une `Response` texte XML classique, ou une erreur 406 le cas échéant.
- **PHP 8.4 :** Utiliser la nouvelle fonction `str_contains` ou l'ordre des `if/match`.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/api/user', name: 'api_user', methods: ['GET'])]
    public function show(Request $request): Response
    {
        $userData = ['id' => 1, 'name' => 'Alice'];

        // On récupère les types MIME que le client stipule accepter
        // Le premier du tableau est celui qui a la plus grande priorité.
        $acceptTypes = $request->getAcceptableContentTypes();

        if (empty($acceptTypes)) {
            // Par défaut si aucun Accept n'est fourni, on pourrait assumer JSON.
            return new JsonResponse($userData);
        }

        // On vérifie le type le plus pertinent
        $primaryAccept = $acceptTypes[0];

        if (str_contains($primaryAccept, 'application/json') || $primaryAccept === '*/*') {
            return new JsonResponse($userData);
        }

        if (str_contains($primaryAccept, 'application/xml') || str_contains($primaryAccept, 'text/xml')) {
            $xml = '<user><id>1</id><name>Alice</name></user>';
            return new Response($xml, 200, ['Content-Type' => 'application/xml']);
        }

        // Si le format demandé n'est pas supporté (ex: image/png)
        return new Response('Format not supported', Response::HTTP_NOT_ACCEPTABLE); // 406
    }
}
```

</details>
