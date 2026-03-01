## Form events - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;

public function buildForm(FormBuilderInterface $builder, array $options): void
{
    $builder->add('country', ChoiceType::class, [
        'choices' => ['France' => 'FR', 'Germany' => 'DE', 'Tunisia' => 'TN'],
    ]);

    // Dynamically add a field based on submitted data
    $builder->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) {
        $data = $event->getData();
        $form = $event->getForm();

        if (isset($data['country']) && $data['country'] === 'FR') {
            $form->add('department', TextType::class, [
                'label' => 'Department (French only)',
            ]);
        }
    });
}
```

**Available events:** `PRE_SET_DATA`, `POST_SET_DATA`, `PRE_SUBMIT`, `SUBMIT`, `POST_SUBMIT`.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Form events"](https://symfonycasts.com/search?q=form%2Bevents)
