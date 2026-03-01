## Output (SymfonyStyle, helpers: Table, ProgressBar, QuestionHelper) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Command/ConsoleTopic/DemoOutputCommand.php
```

```php
<?php

namespace App\Command\ConsoleTopic;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'app:demo-output', description: 'Demonstrates output helpers')]
class DemoOutputCommand extends Command
{
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // SymfonyStyle helpers
        $io->title('Output Helpers Demo');
        $io->section('1. SymfonyStyle Messages');
        $io->success('This is a success message');
        $io->warning('This is a warning');
        $io->error('This is an error');
        $io->info('This is info');
        $io->note('This is a note');
        $io->caution('This is a caution');

        // Table
        $io->section('2. Table Helper');
        $table = new Table($output);
        $table->setHeaders(['Topic', 'Difficulty', 'Hours']);
        $table->addRows([
            ['PHP 8.4', 'Medium', '4'],
            ['HTTP', 'Easy', '3'],
            ['Security', 'Hard', '8'],
        ]);
        $table->render();

        // Progress bar
        $io->section('3. Progress Bar');
        $io->progressStart(50);
        for ($i = 0; $i < 50; $i++) {
            usleep(50_000);
            $io->progressAdvance();
        }
        $io->progressFinish();

        // Interactive question
        $io->section('4. Questions');
        $name = $io->ask('What is your name?', 'Student');
        $io->success("Hello, {$name}!");

        $confirm = $io->confirm('Continue with the demo?', true);
        $io->text($confirm ? 'Continuing...' : 'Stopped.');

        return Command::SUCCESS;
    }
}
```

**Step 4:** Test: `php bin/console app:demo-output`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Output (SymfonyStyle, helpers: Table, ProgressBar, QuestionHelper)"](https://symfonycasts.com/search?q=output%2B%28symfonystyle%2C%2Bhelpers%3A%2Btable%2C%2Bprogressbar%2C%2Bquestionhelper%29)
