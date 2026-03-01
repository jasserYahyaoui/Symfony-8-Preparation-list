## PHP attributes or YAML-based validation - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
mkdir -p src/DTO
touch src/DTO/RegistrationData.php
touch src/Controller/ValidationTopic/ValidationController.php
```

`src/DTO/RegistrationData.php`:
```php
<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class RegistrationData
{
    #[Assert\NotBlank(message: 'Name is required.')]
    #[Assert\Length(min: 2, max: 50)]
    public string $name = '';

    #[Assert\NotBlank]
    #[Assert\Email(message: 'Invalid email "{{ value }}".')]
    public string $email = '';

    #[Assert\NotBlank]
    #[Assert\Length(min: 8, max: 128)]
    #[Assert\Regex(
        pattern: '/^(?=.*[A-Z])(?=.*\d).+$/',
        message: 'Password must contain at least one uppercase letter and one digit.',
    )]
    public string $password = '';

    #[Assert\Range(min: 18, max: 120, notInRangeMessage: 'Age must be between {{ min }} and {{ max }}.')]
    public int $age = 0;

    #[Assert\Url]
    public ?string $website = null;
}
```

`src/Controller/ValidationTopic/ValidationController.php`:
```php
<?php

namespace App\Controller\ValidationTopic;

use App\DTO\RegistrationData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/validation')]
class ValidationController extends AbstractController
{
    #[Route('/validate', name: 'validation_demo', methods: ['POST'])]
    public function validate(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $data = new RegistrationData();
        $payload = $request->toArray();
        $data->name = $payload['name'] ?? '';
        $data->email = $payload['email'] ?? '';
        $data->password = $payload['password'] ?? '';
        $data->age = $payload['age'] ?? 0;
        $data->website = $payload['website'] ?? null;

        $violations = $validator->validate($data);

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $errors[$violation->getPropertyPath()] = $violation->getMessage();
            }
            return $this->json(['valid' => false, 'errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return $this->json(['valid' => true, 'data' => [
            'name' => $data->name,
            'email' => $data->email,
            'age' => $data->age,
        ]], Response::HTTP_CREATED);
    }
}
```

**Step 4:** Test:

```bash
# Invalid
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"","email":"bad","password":"weak","age":10}' \
     https://127.0.0.1:8000/validation/validate

# Valid
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Jasser","email":"j@test.com","password":"Str0ng!Pass","age":25}' \
     https://127.0.0.1:8000/validation/validate
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "PHP attributes or YAML-based validation"](https://symfonycasts.com/search?q=php%2Battributes%2Bor%2Byaml-based%2Bvalidation)
