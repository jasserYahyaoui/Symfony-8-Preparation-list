# Ticket: HTTP Caching

## 🎯 Le Besoin
L'API de notre application renvoie la liste des articles de blog. Cette liste ne change presque jamais (1 fois par jour maximum).
Actuellement, chaque requête tape dans la base de données, causant des lenteurs.
Nous voulons indiquer aux navigateurs et aux reverse proxies (comme Varnish ou le HttpCache de Symfony) de mettre en cache cette réponse pendant une heure.

## 📋 Directives
- **Utiliser :** L'objet `Response` du composant `HttpFoundation`.
- **Méthode :** Configurer les headers de cache HTTP (modèle d'expiration).
- **En-têtes :** `Cache-Control: max-age=3600, public` (le cache doit être public et partagé) ou utiliser les méthodes helpers de l'objet `Response` (`setSharedMaxAge()`).
- **PHP 8.4 & Symfony 8.0 :** Coder une classe `BlogController` avec une route fictive.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BlogController extends AbstractController
{
    #[Route('/api/articles', name: 'api_articles', methods: ['GET'])]
    public function listArticles(): Response
    {
        // ... (Logique métier: fetch data from DB)
        $data = ['article1', 'article2'];

        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');

        // C'est ici que s'opère la magie du cache HTTP !
        // Configure "Cache-Control: max-age=3600, public, s-maxage=3600"
        $response->setPublic();
        $response->setMaxAge(3600); // Cache navigateur
        $response->setSharedMaxAge(3600); // Cache proxy (Varnish/CDN)

        return $response;
    }
}
```

</details>
