# Code Review #9: Doctrine Repository

## The Code

```php
namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function findActive()
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.active = 1')
            ->getQuery()
            ->getResult()
        ;
    }
}
```

**Question:** What is wrong with the DQL boolean comparison?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** In Doctrine DQL, boolean values should be compared with `true` or `false` using parameters or directly `expr()->eq('p.active', ':active')`, not with integer `1` (which depends on the strictness of the underlying DB).

</details>
