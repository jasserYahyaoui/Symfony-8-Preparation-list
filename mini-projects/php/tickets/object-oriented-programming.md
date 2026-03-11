# Ticket: Object-Oriented Programming (OOP) Essentials

## 🎯 Le Besoin
Créez une hiérarchie simple d'utilisateurs (`User`). Vous avez un constructeur de base pour un utilisateur standard. Un utilisateur possède un email, un nom et un mot de passe protégé. Un super-administrateur (`SuperAdmin`) hérite de cet utilisateur mais ajoute automatiquement un rôle spécifique lors de l'instanciation.

## 📋 Directives
- **Utiliser :** L'héritage (`extends`).
- **Constructeur :** Utiliser la "Constructor Property Promotion" (PHP 8) dans la classe mère.
- **Méthode Parent :** Dans le constructeur de `SuperAdmin`, appeler le constructeur du parent (`parent::__construct(...)`).
- **PHP 8.4 :** Utiliser le typage strict et utiliser la visibilité appropriée (`protected` vs `private`) pour que la classe enfant puisse ou non accéder à certaines propriétés si nécessaire, ou utiliser le mot clé `readonly` ou le hook de propriété si pertinent, mais restons simple.

---

<details>
<summary>💡 Solution (PHP 8.4 & Symfony 8.0)</summary>

```php
<?php

namespace App\Model;

/**
 * 1. Classe mère encapsulant la logique de base
 */
class User
{
    // PHP 8 Constructor Property Promotion 
    // + "readonly" pour empêcher la modification de l'email une fois instancié
    public function __construct(
        public readonly string $email,
        public string $name,
        // Protected : accessible aux classes enfants, mais pas à l'extérieur
        protected string $passwordHash,
        protected array $roles = ['ROLE_USER']
    ) {}

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function changePassword(string $newHash): void
    {
        $this->passwordHash = $newHash;
    }
}

/**
 * 2. Héritage (extends)
 */
class SuperAdmin extends User
{
    public function __construct(string $email, string $name, string $passwordHash)
    {
        // 3. Appel du constructeur parent
        parent::__construct($email, $name, $passwordHash);
        
        // 4. Surcharge spécifique à l'enfant
        // "roles" est protected dans le parent, on peut donc agir dessus.
        $this->roles[] = 'ROLE_SUPER_ADMIN';
    }

    /**
     * Surcharge d'une méthode existante
     */
    public function changePassword(string $newHash): void
    {
        // Logique spécifique avant d'appeler le parent...
        error_log("SuperAdmin {$this->email} changed password.");
        parent::changePassword($newHash);
    }
}

// Utilisation
$admin = new SuperAdmin('admin@app.com', 'Boss', '$2y$10$...');
print_r($admin->getRoles()); // ['ROLE_USER', 'ROLE_SUPER_ADMIN']
```

</details>
