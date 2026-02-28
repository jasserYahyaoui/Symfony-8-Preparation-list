# Flashcards Symfony 8.0 — Security

Format examinateur (niveau certification):
- **Q:** question courte et piégeuse.
- **R:** réponse opérationnelle (définition + décision pratique).
- **Point examinateur:** ce qui tombe souvent en confusion.

## Security Core, CSRF and PasswordHasher components

**Q:** Explique "Security Core, CSRF and PasswordHasher components" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Choisir hashers/stratégie de migration sans régression sécurité.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Authentication

**Q:** Explique "Authentication" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Identifier comment Symfony authentifie (authenticator/passport/badges) et où brancher la logique.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Authorization

**Q:** Explique "Authorization" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Décider l’accès via rôles/voters/expressions selon le niveau de granularité métier.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Configuration

**Q:** Explique "Configuration" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Configurer `security.yaml` avec cohérence: `providers`, `firewalls`, `access_control`, `password_hashers`.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Providers

**Q:** Explique "Providers" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Savoir charger un utilisateur depuis mémoire, DB ou provider custom selon le contexte.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Firewalls

**Q:** Explique "Firewalls" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Segmenter les zones de sécurité et leurs mécanismes d’auth sans ambiguïté.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Users

**Q:** Explique "Users" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **Security**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Password hashers

**Q:** Explique "Password hashers" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Choisir hashers/stratégie de migration sans régression sécurité.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Roles

**Q:** Explique "Roles" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **Security**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Access Control Rules

**Q:** Explique "Access Control Rules" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **Security**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Authenticators, Passports and Badges

**Q:** Explique "Authenticators, Passports and Badges" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **Security**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Voters and voting strategies

**Q:** Explique "Voters and voting strategies" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Implémenter des décisions contextuelles testables plutôt que multiplier les if en contrôleur.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.

## Symfony 8.0 notes

**Q:** Explique "Symfony 8.0 notes" en Symfony 8.0 et donne une règle de décision en contexte d’examen.

**R:** Sur le thème **Security**, maîtriser ce sous-sujet en définition, configuration et cas d’usage concret.
Point examinateur: donner le mécanisme exact attendu par le blueprint, sans approximation.
