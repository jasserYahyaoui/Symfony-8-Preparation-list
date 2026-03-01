## Service registration methods - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What does `autoconfigure: true` do? Name 3 interfaces that trigger autoconfiguration.

<details><summary>Click to reveal Solution</summary>

`autoconfigure: true` automatically applies:
- **Tags** and **configuration** based on the interfaces a service implements.

Interfaces:
1. `EventSubscriberInterface` → auto-tagged as `kernel.event_subscriber`.
2. `CommandInterface` / `Command` → auto-tagged as `console.command`.
3. `ConstraintValidatorInterface` → auto-tagged as `validator.constraint_validator`.
4. `Twig\Extension\ExtensionInterface` → auto-tagged as `twig.extension`.
5. `ControllerInterface` → auto-tagged as `controller.service_arguments`.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service registration methods"](https://symfonycasts.com/search?q=service%2Bregistration%2Bmethods)
