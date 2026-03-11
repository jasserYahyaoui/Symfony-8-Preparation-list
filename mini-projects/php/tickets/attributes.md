# Ticket: Attributes in PHP 8.x

## 🎯 Le Besoin
Vous devez créer une classe contrôleur Symfony fictive `ProductController` contenant une méthode `show()`. Il faut configurer la route pour cette méthode, mais **strictement sans utiliser de fichier YAML**. Tout doit être déclaré directement dans le code PHP.

## 📋 Directives
- **Utiliser :** Les `Attributes` (Attributs PHP 8).
- **Composant :** Déclarer la route avec `#[Route('/product/{id}', name: 'product_show')]` de Symfony.
- **Restriction supplémentaire :** Limiter les méthodes HTTP acceptées à `GET` uniquement via cet attribut.
- **PHP 8.4 :** Assurer le typage strict du paramètre d'URL `int $id`.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route; // Attention, dans Symfony 7/8 c'est Attribute/Route et non plus Annotation/Route

class ProductController extends AbstractController
{
    /**
     * Utilisation de l'attribut PHP 8 (#[...]) pour configurer le composant Routing.
     * C'est le standard absolu en Symfony 8.0.
     */
    #[Route(
        path: '/product/{id}', 
        name: 'product_show', 
        methods: ['GET'] // Restriction aux requêtes GET uniquement
    )]
    public function show(int $id): Response
    {
        // Mock de logique
        return new Response("<html><body>Affichage du produit ID : {$id}</body></html>");
    }
}
```

</details>
