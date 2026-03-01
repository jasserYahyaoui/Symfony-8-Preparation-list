## Modern Request Data Mapping - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `#[MapQueryString]` endpoint that maps the entire query string into a `SearchCriteria` DTO.

**Hints:**
- `#[MapQueryString]` maps ALL query parameters to a DTO.
- DTO: `SearchCriteria` with `query`, `sortBy`, `order` properties.

<details><summary>Click to reveal Solution</summary>

```php
// DTO
class SearchCriteria
{
    public function __construct(
        public readonly string $query = '',
        public readonly string $sortBy = 'name',
        public readonly string $order = 'asc',
    ) {}
}

// Controller
use Symfony\Component\HttpKernel\Attribute\MapQueryString;

#[Route('/advanced-search', name: 'ctrl_advanced_search', methods: ['GET'])]
public function advancedSearch(#[MapQueryString] SearchCriteria $criteria): JsonResponse
{
    return $this->json(['criteria' => $criteria]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Modern Request Data Mapping"](https://symfonycasts.com/search?q=modern%2Brequest%2Bdata%2Bmapping)
