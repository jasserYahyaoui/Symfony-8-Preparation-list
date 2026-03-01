## Custom commands - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Command/ConsoleTopic/GreetCommand.php
```

```php
<?php

namespace App\Command\ConsoleTopic;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:greet',
    description: 'Greets a user by name',
)]
class GreetCommand extends Command
{
    protected function configure(): void
    {
        $this
            ->addArgument('name', InputArgument::REQUIRED, 'Who to greet')
            ->addOption('yell', 'y', InputOption::VALUE_NONE, 'Shout the greeting')
            ->addOption('times', 't', InputOption::VALUE_REQUIRED, 'Repeat N times', '1');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('name');
        $greeting = "Hello, {$name}!";

        if ($input->getOption('yell')) {
            $greeting = strtoupper($greeting);
        }

        $times = (int) $input->getOption('times');
        for ($i = 0; $i < $times; $i++) {
            $io->success($greeting);
        }

        return Command::SUCCESS;
    }
}
```

**Step 4:** Test:

```bash
php bin/console app:greet Jasser
php bin/console app:greet Jasser --yell
php bin/console app:greet Jasser -y -t 3
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Custom commands"](https://symfonycasts.com/search?q=custom%2Bcommands)
