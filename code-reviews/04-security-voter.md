# Code Review #4: Security Voter

## The Code

```php
namespace App\Security\Voter;

use App\Entity\Post;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class PostVoter extends Voter
{
    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, ['EDIT', 'VIEW']) && $subject instanceof Post;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if (!$user) {
            return false;
        }

        return true;
    }
}
```

**Question:** What is the security flaw / bug in this Voter?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** The `$user = $token->getUser(); if (!$user) { return false; }` check is wrong for modern Symfony. `getUser()` returns a `UserInterface` or `null`. Also, a user might not be logged in but still be allowed to `VIEW` a public post. Always check if the user is authenticated accurately, and handle the specific attribute logic.

</details>
