# Code Review #2: Console Command

## The Code

```php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateUserCommand extends Command
{
    protected function configure(): void
    {
        $this->setDescription('Creates a new user.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('User created!');
        return 0; // SUCCESS
    }
}
```

**Question:** What is the critical missing element in this Symfony 8 Console Command?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** The command lacks a name. In Symfony 8, commmands MUST be named using the `#[AsCommand]` attribute: `#[AsCommand(name: 'app:create-user', description: 'Creates a new user.')]` above the class declaration.

</details>
