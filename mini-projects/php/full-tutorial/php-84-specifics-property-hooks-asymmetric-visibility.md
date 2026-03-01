## PHP 8.4 Specifics: Property Hooks & Asymmetric Visibility - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a model and controller.

```bash
touch src/Service/PhpTopic/UserProfile.php
touch src/Controller/PhpTopic/PropertyHookController.php
```

**Step 2:** Place in `src/Service/PhpTopic/`.

**Step 3:**

`src/Service/PhpTopic/UserProfile.php`:
```php
<?php

namespace App\Service\PhpTopic;

class UserProfile
{
    // Asymmetric visibility: readable publicly, writable only within the class
    public private(set) string $displayName;

    // Property hook: auto-transform on set, format on get
    public string $email {
        set => strtolower(trim($value));
        get => $this->email;
    }

    // Property hook with validation
    public int $age {
        set {
            if ($value < 0 || $value > 150) {
                throw new \InvalidArgumentException('Age must be between 0 and 150');
            }
            $this->age = $value;
        }
        get => $this->age;
    }

    public function __construct(string $displayName, string $email, int $age)
    {
        $this->displayName = $displayName;
        $this->email = $email;
        $this->age = $age;
    }

    public function updateDisplayName(string $name): void
    {
        $this->displayName = $name; // Allowed inside the class
    }

    public function toArray(): array
    {
        return [
            'display_name' => $this->displayName,
            'email' => $this->email,
            'age' => $this->age,
        ];
    }
}
```

`src/Controller/PhpTopic/PropertyHookController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Service\PhpTopic\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class PropertyHookController extends AbstractController
{
    #[Route('/php/property-hook-demo', name: 'php_property_hook_demo', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = new UserProfile(
            displayName: 'Jasser',
            email: '  JASSER@EXAMPLE.COM  ', // Will be lowercased & trimmed
            age: 25,
        );

        // $user->displayName = 'Test'; // ❌ This would fail: private(set)
        $user->updateDisplayName('Jasser Y.');  // ✅ Allowed inside class

        return $this->json([
            'profile' => $user->toArray(),
            'email_was_normalized' => $user->email === 'jasser@example.com',
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/property-hook-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "PHP 8.4 Specifics: Property Hooks & Asymmetric Visibility"](https://symfonycasts.com/search?q=php%2B8.4%2Bspecifics%3A%2Bproperty%2Bhooks%2B%26%2Basymmetric%2Bvisibility)
