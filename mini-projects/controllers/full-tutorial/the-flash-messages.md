## The flash messages - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/flash-set', name: 'ctrl_flash_set')]
public function setFlash(): JsonResponse
{
    $this->addFlash('success', 'Item created successfully!');
    $this->addFlash('warning', 'Stock is running low.');
    $this->addFlash('info', 'New features available.');

    return $this->json(['flashes_set' => 3, 'note' => 'Visit /flash-read to see them']);
}

#[Route('/flash-read', name: 'ctrl_flash_read')]
public function readFlash(RequestStack $requestStack): JsonResponse
{
    $flashBag = $requestStack->getSession()->getFlashBag();

    return $this->json([
        'flashes' => $flashBag->all(), // Returns and clears
        'note' => 'Flash messages are removed after reading',
    ]);
}
```

**Step 4:** Test: Visit `/controllers/flash-set` then `/controllers/flash-read` (second visit: empty).


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The flash messages"](https://symfonycasts.com/search?q=the%2Bflash%2Bmessages)
