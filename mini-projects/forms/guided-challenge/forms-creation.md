## Forms creation - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `FeedbackType` form with fields: `rating` (ChoiceType, 1-5), `comment` (TextareaType), `recommend` (CheckboxType).

<details><summary>Click to reveal Solution</summary>

```php
class FeedbackType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('rating', ChoiceType::class, [
                'choices' => array_combine(range(1, 5), range(1, 5)),
            ])
            ->add('comment', TextareaType::class, ['required' => false])
            ->add('recommend', CheckboxType::class, ['required' => false, 'label' => 'Would recommend?'])
            ->add('submit', SubmitType::class);
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Forms creation"](https://symfonycasts.com/search?q=forms%2Bcreation)
