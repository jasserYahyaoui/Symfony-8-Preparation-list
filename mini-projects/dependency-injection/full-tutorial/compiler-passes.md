## Compiler passes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
mkdir -p src/DependencyInjection
touch src/DependencyInjection/FormatterCompilerPass.php
```

```php
<?php

namespace App\DependencyInjection;

use App\Service\DiTopic\FormatterRegistry;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class FormatterCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        if (!$container->has(FormatterRegistry::class)) {
            return;
        }

        $definition = $container->findDefinition(FormatterRegistry::class);
        $taggedServices = $container->findTaggedServiceIds('app.formatter');

        foreach ($taggedServices as $id => $tags) {
            // Could manipulate or inspect tagged services here
        }
    }
}
```

Register in `src/Kernel.php`:
```php
protected function build(ContainerBuilder $container): void
{
    $container->addCompilerPass(new \App\DependencyInjection\FormatterCompilerPass());
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Compiler passes"](https://symfonycasts.com/search?q=compiler%2Bpasses)
