## Forms handling - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


The form handling lifecycle (already shown in the creation section):

```php
// 1. Create the form
$form = $this->createForm(ContactType::class);

// 2. Handle the request (maps submitted data to the form)
$form->handleRequest($request);

// 3. Check if submitted AND valid
if ($form->isSubmitted() && $form->isValid()) {
    // 4. Get the data
    $data = $form->getData(); // Returns array or DTO depending on data_class

    // 5. Process (save, email, etc.)
    // ...

    // 6. Redirect (PRG pattern — Post/Redirect/Get)
    return $this->redirectToRoute('forms_contact');
}

// 7. Render the form (if not submitted or invalid)
return $this->render('template.html.twig', ['form' => $form]);
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Forms handling"](https://symfonycasts.com/search?q=forms%2Bhandling)
