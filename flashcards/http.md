# Flashcards Symfony 8.0 — HTTP

Format examinateur (niveau certification):
- **Q:** question courte et piégeuse.
- **R:** réponse opérationnelle (définition + décision pratique).
- **Point examinateur:** ce qui tombe souvent en confusion.

## HTTP Specification (RFC 9110)

**Q:** Explique "HTTP Specification (RFC 9110)" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Connaître la sémantique HTTP: méthodes, codes, en-têtes, cache, négociation et requêtes conditionnelles.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Status codes

**Q:** Explique "Status codes" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Associer chaque situation au code HTTP le plus précis, pas juste au code “qui marche”.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## HTTP request

**Q:** Explique "HTTP request" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Comprendre les données d’entrée (query, request, headers, files, server) et leur cycle de vie.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## HTTP response

**Q:** Explique "HTTP response" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Maîtriser statut, en-têtes et contenu pour exprimer exactement l’intention applicative.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## HTTP methods

**Q:** Explique "HTTP methods" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Respecter la sémantique des méthodes HTTP (safe/idempotent) dans design et implémentation.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Cookies

**Q:** Explique "Cookies" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Appliquer systématiquement HttpOnly/Secure/SameSite + expiration et portée adaptées.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Caching

**Q:** Explique "Caching" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Distinguer expiration (freshness) et validation (ETag/Last-Modified), puis choisir la bonne stratégie.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Content negotiation

**Q:** Explique "Content negotiation" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **HTTP**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Language detection

**Q:** Explique "Language detection" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **HTTP**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Symfony HttpClient component

**Q:** Explique "Symfony HttpClient component" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **HTTP**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.
