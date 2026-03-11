# Ticket: Language Detection & Content Negotiation

## 🎯 Le Besoin
Votre application est disponible en Anglais (`en`), Français (`fr`) et Espagnol (`es`). PAr défaut, elle est en Anglais.
Lorsqu'un visiteur anonyme arrive sur la page d'accueil sans paramètre de locale, vous souhaitez lister pour lui un message de bienvenue personnalisé basé sur les préférences de langue configurées dans son navigateur (l'en-tête `Accept-Language`).

## 📋 Directives
- **Utiliser :** L'objet `Request`.
- **Méthode :** Utiliser la méthode native de `HttpFoundation\Request` permettant de trouver la langue préférée parmi une liste restreinte. Ne pas parser manuellement la chaîne `Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5`.
- **Paramètres :** La liste des langues supportées de votre application est `['en', 'fr', 'es']`.

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

class HomepageController extends AbstractController
{
    // Attention: pas de paramètre {locale} dans l'URL pour ce besoin précis
    #[Route('/', name: 'homepage', methods: ['GET'])]
    public function index(Request $request): Response
    {
        $supportedLocales = ['en', 'fr', 'es'];

        // Magie Symfony: parse l'en-tête "Accept-Language" complexe 
        // du navigateur pour recouper avec NOS langues supportées
        $preferredLanguage = $request->getPreferredLanguage($supportedLocales);

        // Si $preferredLanguage est string, c'est la langue trouvée avec le meilleur 'q'
        // Si le navigateur n'envoie rien, Symfony retournera le premier élément du tableau ('en')
        
        $messages = [
            'en' => 'Welcome to our platform!',
            'fr' => 'Bienvenue sur notre plateforme !',
            'es' => '¡Bienvenido a nuestra plataforma!'
        ];

        // On affiche le message dans la langue négociée
        return new Response($messages[$preferredLanguage]);
    }
}
```

</details>
