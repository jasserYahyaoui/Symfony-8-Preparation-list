## HttpKernel component and FrameworkBundle - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** List the role of `ControllerResolver`, `ArgumentResolver`, and `EventDispatcher` in the controller invocation lifecycle.

<details><summary>Click to reveal Solution</summary>

1. **ControllerResolver**: Reads `_controller` from the `Request` attributes (set by the Router) and instantiates the controller callable.
2. **ArgumentResolver**: Uses `ArgumentValueResolverInterface` implementations to resolve the method parameters (Request, route params, services, etc.).
3. **EventDispatcher**: Fires `kernel.controller` (can replace the controller), then `kernel.controller_arguments` (can modify arguments).

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HttpKernel component and FrameworkBundle"](https://symfonycasts.com/search?q=httpkernel%2Bcomponent%2Band%2Bframeworkbundle)
