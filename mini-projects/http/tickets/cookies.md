# Ticket: HTTP Cookies

## 🎯 Le Besoin
Dans l'action `/preferences/theme` de votre contrôleur, vous allez recevoir en Query Parameter un certain thème (ex: `?theme=dark`).
Vous devez créer un Cookie contenant ce thème (nommé `user_theme`), et l'attacher à la réponse afin que le navigateur s'en souvienne pendant 30 jours.
De plus, ce cookie ne doit **pas** être accessible en JavaScript par sécurité.

## 📋 Directives
- **Utiliser :** La classe `Symfony\Component\HttpFoundation\Cookie`.
- **Méthode :** L'attacher à l'objet `Response` via `$response->headers->setCookie(...)`.
- **Propriétés du Cookie :** 
  - Expiration : `+30 days` (ou via une date).
  - HttpOnly : `true` (protège des attaques XSS).
  - Secure : `true` (uniquement envoyé en HTTPS).

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ThemeController extends AbstractController
{
    #[Route('/preferences/theme', name: 'set_theme', methods: ['GET'])]
    public function setTheme(Request $request): Response
    {
        // 1. Récupération paramètre
        $theme = $request->query->get('theme', 'light'); // Défaut: light

        // 2. Création de la réponse textuelle basique
        $response = new Response("Thème enregistré : " . htmlspecialchars($theme));

        // 3. Création de l'objet Cookie
        // name, value, expire, path, domain, secure, httpOnly, raw, sameSite
        $cookie = Cookie::create('user_theme')
            ->withValue($theme)
            ->withExpires(new \DateTimeImmutable('+30 days'))
            ->withSecure(true)   // HTTPS only
            ->withHttpOnly(true) // No Javascript access (XSS mitigation)
            ->withSameSite(Cookie::SAMESITE_LAX); // Protection CSRF

        // 4. Attachement du Cookie dans la Réponse (qui génère un header "Set-Cookie")
        $response->headers->setCookie($cookie);

        return $response;
    }
}
```

</details>
