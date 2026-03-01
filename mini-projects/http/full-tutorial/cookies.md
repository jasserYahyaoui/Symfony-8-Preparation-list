## Cookies - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/HttpTopic/CookieController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/CookieController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class CookieController extends AbstractController
{
    #[Route('/cookie-set', name: 'http_cookie_set', methods: ['GET'])]
    public function setCookie(): Response
    {
        $response = new JsonResponse(['message' => 'Cookies set!']);

        // Session cookie (expires when browser closes)
        $response->headers->setCookie(
            Cookie::create('session_pref', 'dark_mode')
        );

        // Persistent cookie with expiration
        $response->headers->setCookie(
            Cookie::create('remember_lang')
                ->withValue('fr')
                ->withExpires(new \DateTimeImmutable('+30 days'))
                ->withPath('/')
                ->withSecure(false)       // set true for HTTPS-only
                ->withHttpOnly(true)      // not accessible via JavaScript
                ->withSameSite(Cookie::SAMESITE_LAX)
        );

        return $response;
    }

    #[Route('/cookie-read', name: 'http_cookie_read', methods: ['GET'])]
    public function readCookies(Request $request): JsonResponse
    {
        return $this->json([
            'all_cookies' => $request->cookies->all(),
            'session_pref' => $request->cookies->get('session_pref', 'not set'),
            'remember_lang' => $request->cookies->get('remember_lang', 'not set'),
        ]);
    }

    #[Route('/cookie-delete', name: 'http_cookie_delete', methods: ['GET'])]
    public function deleteCookie(): Response
    {
        $response = new JsonResponse(['message' => 'Cookie deleted!']);

        // Clear a cookie by setting it with an expired time
        $response->headers->clearCookie('session_pref');
        $response->headers->clearCookie('remember_lang', '/');

        return $response;
    }
}
```

**Step 4:** Test it (use `-c` and `-b` to save/send cookies):

```bash
# Set cookies
curl -c cookies.txt https://127.0.0.1:8000/http/cookie-set

# Read cookies
curl -b cookies.txt https://127.0.0.1:8000/http/cookie-read

# Delete cookies
curl -b cookies.txt -c cookies.txt https://127.0.0.1:8000/http/cookie-delete

# Verify deleted
curl -b cookies.txt https://127.0.0.1:8000/http/cookie-read
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Cookies"](https://symfonycasts.com/search?q=cookies)
