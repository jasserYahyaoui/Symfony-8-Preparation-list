## Modern Request Data Mapping - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/ControllersTopic/DataMappingController.php
```

```php
<?php

namespace App\Controller\ControllersTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/controllers')]
class DataMappingController extends AbstractController
{
    // #[MapQueryParameter] — extracts and casts a single query parameter
    #[Route('/search', name: 'ctrl_search', methods: ['GET'])]
    public function search(
        #[MapQueryParameter] string $q = '',
        #[MapQueryParameter] int $page = 1,
        #[MapQueryParameter] int $limit = 10,
        #[MapQueryParameter] bool $includeArchived = false,
    ): JsonResponse {
        return $this->json([
            'query' => $q,
            'page' => $page,
            'limit' => $limit,
            'include_archived' => $includeArchived,
        ]);
    }

    // #[MapRequestPayload] — deserializes JSON/XML body into a DTO
    #[Route('/create-user', name: 'ctrl_create_user', methods: ['POST'])]
    public function createUser(
        #[MapRequestPayload] UserDTO $user,
    ): JsonResponse {
        return $this->json([
            'created' => [
                'name' => $user->name,
                'email' => $user->email,
                'age' => $user->age,
            ],
        ], Response::HTTP_CREATED);
    }
}
```

Create the DTO:

```bash
mkdir -p src/DTO
touch src/DTO/UserDTO.php
```

```php
<?php

namespace App\DTO;

class UserDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly int $age = 0,
    ) {}
}
```

**Step 4:** Test:

```bash
curl "https://127.0.0.1:8000/controllers/search?q=symfony&page=2&limit=5&includeArchived=true"

curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Jasser","email":"j@test.com","age":25}' \
     https://127.0.0.1:8000/controllers/create-user
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Modern Request Data Mapping"](https://symfonycasts.com/search?q=modern%2Brequest%2Bdata%2Bmapping)
