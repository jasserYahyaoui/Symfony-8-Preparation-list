## Argument value resolvers - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `RequestIdResolver` that generates a unique request ID and injects it as a `string` argument.

<details><summary>Click to reveal Solution</summary>

```php
#[AsTargetedValueResolver('request_id')]
class RequestIdResolver implements ValueResolverInterface
{
    public function resolve(Request $request, ArgumentMetadata $argument): iterable
    {
        if ($argument->getType() !== 'string') {
            return [];
        }
        yield 'REQ-' . bin2hex(random_bytes(8));
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Argument value resolvers"](https://symfonycasts.com/search?q=argument%2Bvalue%2Bresolvers)
