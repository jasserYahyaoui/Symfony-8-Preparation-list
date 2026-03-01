## Official best practices - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Refactor a "fat controller" (given below) into a thin controller + service, following best practices.

Fat controller:
```php
public function register(Request $request): Response {
    $data = $request->toArray();
    $email = strtolower($data['email']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);
    // 50 more lines of logic...
    return $this->json(['ok' => true]);
}
```

**Hints:**
- Extract logic into a `RegistrationService`.
- Controller should call `$service->register($data)`.
- Service handles validation, normalization, hashing.

**Testing:** The behavior stays the same, but the controller is <5 lines.

<details><summary>Click to reveal Solution</summary>

Service:
```php
class RegistrationService
{
    public function register(array $data): array
    {
        $email = strtolower($data['email'] ?? '');
        $password = password_hash($data['password'] ?? '', PASSWORD_BCRYPT);
        return ['email' => $email, 'password_hashed' => true];
    }
}
```

Thin controller:
```php
#[Route('/register', methods: ['POST'])]
public function register(Request $request, RegistrationService $service): JsonResponse
{
    return $this->json($service->register($request->toArray()), Response::HTTP_CREATED);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Official best practices"](https://symfonycasts.com/search?q=official%2Bbest%2Bpractices)
