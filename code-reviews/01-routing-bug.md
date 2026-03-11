# Code Review #1: Routing Configuration

## The Code

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/api/users', name: 'app_api_users', methods: 'GET')]
    public function index(): Response
    {
        return $this->json(['status' => 'ok']);
    }
}
```

**Question:** What is wrong with this routing configuration in Symfony 8.0/PHP 8.4?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** The `methods` parameter in the `#[Route]` attribute requires an **array** in Symfony 8, not a plain string. It should be `methods: ['GET']` instead of `methods: 'GET'`.

</details>
