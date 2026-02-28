# Mini-projets de préparation (niveau expert)

Chaque mini-projet doit être réalisable en 2 à 6 heures.

## 1) Authentification complète + durcissement sécurité
- Login form authenticator + logout.
- Contrôle d’accès multi-firewalls.
- Voter sur une ressource métier.
- CSRF + password hasher + remember me.

## 2) API HTTP orientée cache
- Endpoint JSON avec `ETag` et `Last-Modified`.
- Réponses conditionnelles (`304 Not Modified`).
- Tests fonctionnels du comportement cache.

## 3) Routing avancé multi-locale
- Routes par locale, host conditionnel, méthodes HTTP distinctes.
- Requirements regex et priorités de matching.
- Debug complet avec les commandes route.

## 4) Formulaire complexe
- FormType custom, data transformers, form events.
- Upload fichier + validation par groupes.
- Thème Twig personnalisé.

## 5) DI avancée
- Services taggés + locator.
- Décoration d’un service existant.
- Compiler pass pour registre dynamique.

## 6) Messenger en production-like
- Au moins deux transports.
- Retry strategy + failure transport.
- Worker supervisé + middleware custom.

## 7) Console ops toolkit
- Commandes avec arguments/options via attributes.
- Verbosity fine + output formaté.
- Couverture de tests de commandes.

## 8) Pack debug & observabilité
- Profiler/Data collectors.
- Gestion d’erreurs et logs contextualisés.
- Scénarios de troubleshooting documentés.

## Critères de validation
- README par projet: objectif, contexte, pièges.
- Tests automatisés minimaux.
- “Lessons learned” de 5 points en fin de projet.
