## Form types - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Form/AllFieldsType.php
```

```php
<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\*;
use Symfony\Component\Form\FormBuilderInterface;

class AllFieldsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', TextType::class)
            ->add('email', EmailType::class)
            ->add('password', PasswordType::class)
            ->add('age', IntegerType::class)
            ->add('salary', MoneyType::class, ['currency' => 'EUR'])
            ->add('bio', TextareaType::class)
            ->add('birthday', DateType::class, ['widget' => 'single_text'])
            ->add('appointment', DateTimeType::class, ['widget' => 'single_text'])
            ->add('newsletter', CheckboxType::class, ['required' => false])
            ->add('gender', ChoiceType::class, [
                'choices' => ['Male' => 'm', 'Female' => 'f', 'Other' => 'o'],
                'expanded' => true, // radio buttons
            ])
            ->add('hobbies', ChoiceType::class, [
                'choices' => ['Reading' => 'read', 'Gaming' => 'game', 'Sport' => 'sport'],
                'multiple' => true,
                'expanded' => true, // checkboxes
            ])
            ->add('avatar', FileType::class, ['required' => false])
            ->add('token', HiddenType::class, ['data' => 'abc123'])
            ->add('submit', SubmitType::class);
    }
}
```

**Step 4:** Create a controller and template to render this form.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Form types"](https://symfonycasts.com/search?q=form%2Btypes)
