## Voters and voting strategies - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Security/PostVoter.php
```

```php
<?php

namespace App\Security;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class PostVoter extends Voter
{
    public const EDIT = 'POST_EDIT';
    public const DELETE = 'POST_DELETE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [self::EDIT, self::DELETE])
            && is_array($subject) && isset($subject['author']);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if (!$user instanceof UserInterface) {
            return false;
        }

        return match ($attribute) {
            self::EDIT => $subject['author'] === $user->getUserIdentifier(),
            self::DELETE => in_array('ROLE_ADMIN', $user->getRoles()),
            default => false,
        };
    }
}
```

Usage:
```php
$post = ['id' => 1, 'author' => 'user@test.com', 'title' => 'Hello'];
$this->denyAccessUnlessGranted('POST_EDIT', $post);
// Or: $this->isGranted('POST_DELETE', $post);
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Voters and voting strategies"](https://symfonycasts.com/search?q=voters%2Band%2Bvoting%2Bstrategies)
