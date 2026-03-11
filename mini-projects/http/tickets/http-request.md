# Ticket: HTTP Request Object

## 🎯 Le Besoin
Lorsqu'un visiteur remplit votre formulaire de contact en `POST` `/api/contact?source=twitter`, vous devez récupérer différentes informations de sa requête.
Spécifiquement, vous avez besoin de :
1. Le paramètre d'URL `source` (query string).
2. Le champ `email` envoyé dans le corps (body POST).
3. L'adresse IP réelle de l'utilisateur.
4. Un header HTTP personnalisé `X-App-Version` qu'il aurait envoyé.

## 📋 Directives
- **Utiliser :** L'objet `Symfony\Component\HttpFoundation\Request`.
- **Méthode :** Injecter l'objet `Request` dans une méthode de contrôleur.
- **Bags (Sacs) de paramètres :**
  - Utiliser `$request->query` pour la query string (`$_GET`).
  - Utiliser `$request->request` pour le payload (`$_POST`).
  - L'IP via `$request->getClientIp()`.
  - Les headers via `$request->headers`.
- **PHP 8.4 :** Profiter du framework pour le casting sécurisé et éviter les variables superglobales natives (`$_GET`, `$_POST` etc.).

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'api_contact', methods: ['POST'])]
    public function contact(Request $request): Response
    {
        // 1. Lire la Query String (?source=twitter)
        // Le deuxième argument est la valeur par défaut si non présent.
        $source = $request->query->get('source', 'unknown');

        // 2. Lire le corps POST (équivalent $_POST)
        $email = $request->request->get('email');

        // Si on s'attendait à un payload JSON pur, on ferait plutôt :
        // $data = $request->toArray();
        // $email = $data['email'] ?? null;

        // 3. Lire l'IP (gère correctement les proxy si configuré en Symfony)
        $clientIp = $request->getClientIp();

        // 4. Lire un header personnalisé
        $appVersion = $request->headers->get('X-App-Version', '1.0');

        // Validation basique (Normalement on utilise le composant Validator)
        if (!$email) {
            return new Response('Email missing', Response::HTTP_BAD_REQUEST);
        }

        // Simuler un traitement
        $logMessage = "Contact from {$email} [IP: {$clientIp}] via {$source} (App v{$appVersion})";
        
        return new Response('Message reçu: ' . $logMessage, Response::HTTP_CREATED);
    }
}
```

</details>
