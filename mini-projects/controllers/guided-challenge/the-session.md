## The session - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Store a shopping cart (array of items) in the session. Add `/cart/add/{item}` and `/cart/view` endpoints.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/cart/add/{item}', name: 'ctrl_cart_add')]
public function addToCart(string $item, RequestStack $stack): JsonResponse
{
    $session = $stack->getSession();
    $cart = $session->get('cart', []);
    $cart[] = $item;
    $session->set('cart', $cart);
    return $this->json(['cart' => $cart]);
}

#[Route('/cart/view', name: 'ctrl_cart_view')]
public function viewCart(RequestStack $stack): JsonResponse
{
    return $this->json(['cart' => $stack->getSession()->get('cart', [])]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The session"](https://symfonycasts.com/search?q=the%2Bsession)
