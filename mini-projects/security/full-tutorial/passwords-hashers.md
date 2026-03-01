## Passwords hashers - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/hash-demo', name: 'security_hash', methods: ['POST'])]
public function hashDemo(
    Request $request,
    UserPasswordHasherInterface $hasher,
): JsonResponse {
    $plainPassword = $request->toArray()['password'] ?? 'test123';

    // In real code, you would have a User object
    // $hashed = $hasher->hashPassword($user, $plainPassword);
    // $isValid = $hasher->isPasswordValid($user, $plainPassword);

    return $this->json([
        'algorithm' => 'auto (bcrypt or sodium)',
        'note' => 'Use UserPasswordHasherInterface with a User object in real scenarios',
    ]);
}
```

CLI:
```bash
php bin/console security:hash-password
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Passwords hashers"](https://symfonycasts.com/search?q=passwords%2Bhashers)
