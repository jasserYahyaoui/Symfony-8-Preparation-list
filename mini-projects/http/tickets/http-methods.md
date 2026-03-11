# Ticket: HTTP Methods (GET vs POST vs PUT vs DELETE)

## 🎯 Le Besoin
Vous préparez une classe contrôleur Resource (`TaskController`) pour gérer l'entité `Task`. 
On vous demande d'écrire la structure (sans le code métier complet) des 4 routes fondamentales pour un CRUD web standard, en respectant la sémantique stricte de la norme RFC 9110 (Methods HTTP).

## 📋 Directives
- **Méthodes à écrire :**
  1. Afficher toutes les tâches -> (Lecture, idempotent).
  2. Créer une nouvelle tâche -> (Création, non idempotent).
  3. Mettre à jour une tâche **complète** -> (Remplacement, idempotent).
  4. Supprimer une tâche -> (Suppression, idempotent).
- **Rôle :** Utiliser les bons attributs `#[Route]` et spécifier la bonne clé `methods: [...]` de manière experte.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/tasks')]
class TaskController extends AbstractController
{
    /**
     * GET est SAFE et IDEMPOTENT. 
     * Il ne doit *jamais* modifier d'état côté serveur.
     */
    #[Route('', name: 'task_list', methods: ['GET'])]
    public function list(): Response
    {
        return new Response('List tasks...');
    }

    /**
     * POST n'est NI safe, NI idempotent.
     * Appeler 10 fois cette méthode créera théoriquement 10 tâches.
     */
    #[Route('', name: 'task_create', methods: ['POST'])]
    public function create(): Response
    {
        // ... (lecture payload $_POST / JSON)
        return new Response('Task created', Response::HTTP_CREATED);
    }

    /**
     * PUT est IDEMPOTENT (mais pas safe).
     * Mettre à jour avec les MÊMES données 1 ou 10 fois aura le même résultat final sur la ressource.
     * (NB: Pour une mise à jour partielle, on utiliserait PATCH).
     */
    #[Route('/{id}', name: 'task_update', methods: ['PUT'])]
    public function update(int $id): Response
    {
        return new Response('Task ' . $id . ' completely updated');
    }

    /**
     * DELETE est IDEMPOTENT (mais pas safe).
     * Supprimer une ressource déjà supprimée devrait théoriquement répondre 204 No Content, l'état reste le même.
     */
    #[Route('/{id}', name: 'task_delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        return new Response('', Response::HTTP_NO_CONTENT); // 204
    }
}
```

</details>
