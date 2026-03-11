# Code Review #14: Serializer Groups

## The Code

```php
namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;

class User
{
    #[Groups('api')]
    public string $username;

    #[Groups(['api', 'admin'])]
    public string $email;
}
```

**Question:** What is the subtle error in the `#[Groups]` attribute usage?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** The `#[Groups]` attribute always expects an **array** of strings, even if there is only one group. It must be `#[Groups(['api'])]`.

</details>
