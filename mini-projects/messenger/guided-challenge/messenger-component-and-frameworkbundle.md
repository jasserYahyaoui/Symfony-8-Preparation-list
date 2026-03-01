## Messenger component and FrameworkBundle - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Draw the Messenger flow: Controller → Bus → Middleware → Transport → Worker → Handler.

<details><summary>Click to reveal Solution</summary>

```
Controller
  → $bus->dispatch(new MyMessage(...))
    → Middleware Chain (SendMessageMiddleware, HandleMessageMiddleware, etc.)
      → Transport (async: Doctrine/Redis/AMQP, or sync)
        → [Queue]
          → Worker (php bin/console messenger:consume)
            → Handler::__invoke(MyMessage $msg)
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Messenger component and FrameworkBundle"](https://symfonycasts.com/search?q=messenger%2Bcomponent%2Band%2Bframeworkbundle)
