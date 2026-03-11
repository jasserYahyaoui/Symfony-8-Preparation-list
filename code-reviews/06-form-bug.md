# Code Review #6: Form Type

## The Code

```php
namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('username', TextType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
```

**Question:** What is flawed in the method signatures of this FormType?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** Missing return types (`void`). In Symfony 8, methods inherited from `AbstractType` strictly enforce return types. `public function buildForm(...): void` and `public function configureOptions(...): void`.

</details>
