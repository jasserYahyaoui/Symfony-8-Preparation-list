## Serializer component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Use `#[Groups]` attribute to control which fields are serialized.

<details><summary>Click to reveal Solution</summary>

```php
use Symfony\Component\Serializer\Attribute\Groups;

class Product
{
    #[Groups(['list', 'detail'])]
    public string $name;

    #[Groups(['detail'])]
    public float $price;
}

// Serialize with groups:
$serializer->serialize($product, 'json', ['groups' => 'list']);
// Only includes 'name', not 'price'
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Serializer component"](https://symfonycasts.com/search?q=serializer%2Bcomponent)
