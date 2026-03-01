## Handling file upload - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Why do we set `mapped => false` on the `FileType` field?

<details><summary>Click to reveal Solution</summary>

`mapped => false` means:
- The field is NOT automatically mapped to a property of the form's `data_class`.
- This is necessary because an `UploadedFile` object is not the same type as the `string` path that gets stored.
- You must manually handle the file in the controller: move it, then set the filename on the entity.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Handling file upload"](https://symfonycasts.com/search?q=handling%2Bfile%2Bupload)
