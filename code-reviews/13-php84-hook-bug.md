# Code Review #13: PHP 8.4 Property Hooks

## The Code

```php
class Product {
    public private(set) string $name {
        set => trim($value);
    }
}
```

**Question:** What is syntactically wrong with this asymmetric visibility & property hook in PHP 8.4?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** You cannot combine asymmetric visibility `private(set)` with a `set` hook directly without care. While asymmetric visibility defines the access level, if a hook defines `set`, the `set` operation is controlled by the hook. Furthermore, in PHP 8.4, asymmetric visibility is declared as `public private(set) string $name;`.

</details>
