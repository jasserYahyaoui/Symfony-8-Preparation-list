## Generate 404 pages - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/item/{id}', name: 'ctrl_item_show', requirements: ['id' => '\d+'])]
public function showItem(int $id): JsonResponse
{
    $items = [1 => 'Keyboard', 2 => 'Mouse'];

    if (!isset($items[$id])) {
        throw $this->createNotFoundException(sprintf('Item #%d not found.', $id));
    }

    return $this->json(['id' => $id, 'name' => $items[$id]]);
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/controllers/item/1    # ✅ 200
curl https://127.0.0.1:8000/controllers/item/999  # ❌ 404
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Generate 404 pages"](https://symfonycasts.com/search?q=generate%2B404%2Bpages)
