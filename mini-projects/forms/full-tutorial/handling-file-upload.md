## Handling file upload - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
// In the FormType:
->add('attachment', FileType::class, [
    'label' => 'Upload a file (PDF)',
    'mapped' => false, // Not mapped to the entity
    'required' => false,
    'constraints' => [
        new File([
            'maxSize' => '2M',
            'mimeTypes' => ['application/pdf'],
            'mimeTypesMessage' => 'Please upload a valid PDF',
        ]),
    ],
])
```

```php
// In the controller:
$file = $form->get('attachment')->getData();
if ($file) {
    $newFilename = uniqid() . '.' . $file->guessExtension();
    $file->move($this->getParameter('upload_directory'), $newFilename);
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Handling file upload"](https://symfonycasts.com/search?q=handling%2Bfile%2Bupload)
