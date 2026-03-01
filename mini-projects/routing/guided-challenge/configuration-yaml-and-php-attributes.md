## Configuration (YAML and PHP attributes) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create one route defined via YAML and one via attribute, both pointing to methods on the same controller. Verify both with `debug:router`.

<details><summary>Click to reveal Solution</summary>

YAML in `config/routes.yaml`:
```yaml
routing_challenge_yaml:
    path: /routing/challenge/yaml
    controller: App\Controller\RoutingTopic\ConfigController::challengeYaml
```

Attribute in controller:
```php
#[Route('/routing/challenge/attr', name: 'routing_challenge_attr')]
public function challengeAttr(): JsonResponse { return $this->json(['ok' => true]); }

public function challengeYaml(): JsonResponse { return $this->json(['ok' => true]); }
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Configuration (YAML and PHP attributes)"](https://symfonycasts.com/search?q=configuration%2B%28yaml%2Band%2Bphp%2Battributes%29)
