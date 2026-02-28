# Flashcards — DI / Routing / Controllers

1) **Q:** Autowiring: principe ?
   **R:** Résolution automatique des dépendances par type-hint depuis le conteneur de services.

2) **Q:** Différence alias de service et décoration ?
   **R:** Alias = autre nom vers un service; décoration = envelopper/composer un service existant pour étendre son comportement.

3) **Q:** Compiler pass: utilité ?
   **R:** Modifier la définition du conteneur au moment de la compilation (build-time).

4) **Q:** Requirement de route ?
   **R:** Contrainte regex sur un paramètre d’URL.

5) **Q:** Valeur par défaut de paramètre de route ?
   **R:** Permet de rendre une partie d’URL optionnelle et garantir une valeur si absente.

6) **Q:** ParamConverter est-il le mécanisme principal moderne ?
   **R:** En Symfony moderne, privilégier les argument value resolvers / mapping explicite.

7) **Q:** Différence redirect externe vs interne (forward) ?
   **R:** Redirect = nouvelle requête HTTP côté client; forward = sous-requête interne côté serveur.

8) **Q:** Pourquoi `AbstractController` est pratique mais pas obligatoire ?
   **R:** Il fournit des raccourcis utiles; mais un contrôleur peut rester une classe PHP standard pour plus de sobriété.
