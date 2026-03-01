## Forms creation - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Generate a form type.

```bash
php bin/console make:form ContactType
```

Or create manually:

```bash
touch src/Form/ContactType.php
touch src/Controller/FormsTopic/FormCreationController.php
touch templates/forms_topic/contact.html.twig
```

**Step 3:**

`src/Form/ContactType.php`:
```php
<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Your Name',
                'attr' => ['placeholder' => 'John Doe'],
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email Address',
            ])
            ->add('subject', ChoiceType::class, [
                'choices' => [
                    'General Inquiry' => 'general',
                    'Bug Report' => 'bug',
                    'Feature Request' => 'feature',
                ],
            ])
            ->add('message', TextareaType::class, [
                'attr' => ['rows' => 5],
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Send Message',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // 'data_class' => ContactDTO::class, // Optional: bind to a DTO
        ]);
    }
}
```

`src/Controller/FormsTopic/FormCreationController.php`:
```php
<?php

namespace App\Controller\FormsTopic;

use App\Form\ContactType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/forms')]
class FormCreationController extends AbstractController
{
    #[Route('/contact', name: 'forms_contact')]
    public function contact(Request $request): Response
    {
        $form = $this->createForm(ContactType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            $this->addFlash('success', sprintf('Message from %s received!', $data['name']));

            return $this->redirectToRoute('forms_contact');
        }

        return $this->render('forms_topic/contact.html.twig', [
            'form' => $form,
        ]);
    }
}
```

`templates/forms_topic/contact.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}
{% block title %}Contact Form{% endblock %}
{% block body %}
    <h2>Contact Form</h2>

    {% for flash in app.flashes('success') %}
        <div style="background:green;color:white;padding:10px;">{{ flash }}</div>
    {% endfor %}

    {{ form_start(form) }}
        {{ form_row(form.name) }}
        {{ form_row(form.email) }}
        {{ form_row(form.subject) }}
        {{ form_row(form.message) }}
        {{ form_row(form.submit) }}
    {{ form_end(form) }}
{% endblock %}
```

**Step 4:** Visit `https://127.0.0.1:8000/forms/contact` — fill and submit the form.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Forms creation"](https://symfonycasts.com/search?q=forms%2Bcreation)
