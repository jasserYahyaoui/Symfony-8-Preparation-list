# Code Review #8: Controller Request

## The Code

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{
    #[Route('/api/data', name: 'api_data')]
    public function getData(): Response
    {
        $request = $this->get('request_stack')->getCurrentRequest();
        $query = $request->query->get('q');
        return $this->json(['q' => $query]);
    }
}
```

**Question:** Why is this controller action considered bad practice in Symfony 8?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** You should not fetch the Request object from the `request_stack` service via `$this->get()`. You must inject the `Request` object directly into the action method parameter: `public function getData(Request $request): Response`.

</details>
