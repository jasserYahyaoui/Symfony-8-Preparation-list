## ExpressionLanguage component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
composer require expression-language
```

```php
use Symfony\Component\ExpressionLanguage\ExpressionLanguage;

#[Route('/expression-demo', name: 'misc_expression')]
public function expressionDemo(): JsonResponse
{
    $language = new ExpressionLanguage();

    return $this->json([
        'math' => $language->evaluate('1 + 2 * 3'),        // 7
        'string' => $language->evaluate('"hello " ~ "world"'), // "hello world"
        'condition' => $language->evaluate('age > 18', ['age' => 25]), // true
        'ternary' => $language->evaluate('score > 50 ? "pass" : "fail"', ['score' => 75]),
        'used_in' => ['security.yaml access_control', 'routing conditions', 'validation', 'workflow guards'],
    ]);
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "ExpressionLanguage component"](https://symfonycasts.com/search?q=expressionlanguage%2Bcomponent)
