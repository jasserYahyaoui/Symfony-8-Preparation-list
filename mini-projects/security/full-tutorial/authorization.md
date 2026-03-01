## Authorization - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\Security\Http\Attribute\IsGranted;

// Attribute-based access control
#[IsGranted('ROLE_ADMIN')]
#[Route('/admin-only', name: 'security_admin_only')]
public function adminOnly(): JsonResponse
{
    return $this->json(['message' => 'Admin access granted!']);
}

// Programmatic check
#[Route('/check-role', name: 'security_check_role')]
public function checkRole(): JsonResponse
{
    if (!$this->isGranted('ROLE_ADMIN')) {
        throw $this->createAccessDeniedException('Admins only!');
    }
    return $this->json(['is_admin' => true]);
}

// denyAccessUnlessGranted
#[Route('/deny-demo', name: 'security_deny')]
public function denyDemo(): JsonResponse
{
    $this->denyAccessUnlessGranted('ROLE_USER');
    return $this->json(['access' => 'granted']);
}
```

**Role hierarchy** in `security.yaml`:
```yaml
security:
    role_hierarchy:
        ROLE_ADMIN: ROLE_USER
        ROLE_SUPER_ADMIN: [ROLE_ADMIN, ROLE_ALLOWED_TO_SWITCH]
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Authorization"](https://symfonycasts.com/search?q=authorization)
