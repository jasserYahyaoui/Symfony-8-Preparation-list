# Flashcards : Console (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Every option, argument, helper, and lifecycle detail covered.

---

### Console component

**Q: What is the Symfony Console component?**
**A:** A standalone PHP component for building command-line applications. It provides classes for defining commands, parsing arguments/options, and handling input/output.
**Code Snippet:**
```bash
composer require symfony/console
```

---

**Q: How does the Console component integrate with the Symfony framework?**
**A:** Via `bin/console` (the entry point). The framework auto-registers commands defined in `src/Command/` thanks to autoconfiguration tagging with `console.command`.
**Code Snippet:**
```bash
php bin/console list
php bin/console help <command-name>
```

---

**Q: What is the `Application` class in the Console component?**
**A:** The top-level runner. In Symfony framework, it's pre-configured. In standalone use, you instantiate it with a name/version, add commands, and call `run()`.
**Code Snippet:**
```php
$app = new Application('My CLI', '1.0.0');
$app->add(new MyCommand());
$app->run();
```

---

### Built-in commands

**Q: What are the 5 most useful built-in `bin/console` commands for day-to-day Symfony development?**
**A:**
1. `debug:router` — list all routes
2. `debug:container` — inspect DI container services
3. `cache:clear` — clear the cache
4. `debug:autowiring` — list autowirable types
5. `make:*` — (MakerBundle) generate code scaffolding
**Code Snippet:**
```bash
php bin/console debug:container --show-hidden
php bin/console cache:clear --env=prod
php bin/console debug:autowiring LoggerInterface
```

---

**Q: What command shows all registered event listeners and their priorities?**
**A:** `php bin/console debug:event-dispatcher [event-name]`
**Code Snippet:**
```bash
php bin/console debug:event-dispatcher
php bin/console debug:event-dispatcher kernel.request
```

---

**Q: How do you warm the cache for a specific environment?**
**A:** `php bin/console cache:warmup --env=prod --no-debug`
**Code Snippet:**
```bash
php bin/console cache:warmup --env=prod
```

---

**Q: What does `php bin/console secrets:set SECRET_NAME` do?**
**A:** Stores an encrypted secret in the Symfony Secrets vault (`.env.{env}.local.php` encrypted). Used for production secrets management.
**Code Snippet:**
```bash
php bin/console secrets:set DATABASE_PASSWORD
php bin/console secrets:list --reveal  # decrypt and show
```

---

### Creating custom commands

**Q: How do you create a custom Symfony console command?**
**A:** Create a class extending `Command` (or annotate with `#[AsCommand]`). Implement `configure()` and `execute()`. With autoconfigure enabled, it is auto-registered.
**Code Snippet:**
```php
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:send-report', description: 'Sends the weekly report')]
class SendReportCommand extends Command {
    protected function execute(InputInterface $input, OutputInterface $output): int {
        $output->writeln('Sending report...');
        return Command::SUCCESS;
    }
}
```

---

**Q: What are the three valid return values from `execute()` and what do they mean?**
**A:**
- `Command::SUCCESS` (= 0) — command ran correctly
- `Command::FAILURE` (= 1) — command ran but encountered an error
- `Command::INVALID` (= 2) — command was used incorrectly (bad arguments)
**Code Snippet:**
```php
protected function execute(InputInterface $input, OutputInterface $output): int {
    try {
        $this->service->process();
        return Command::SUCCESS;
    } catch (\Exception $e) {
        $output->writeln('<error>'.$e->getMessage().'</error>');
        return Command::FAILURE;
    }
}
```

---

**Q: What does the `#[AsCommand]` attribute replace and what are its parameters?**
**A:** Replaces the static `getDefaultName()` and `getDefaultDescription()` methods. Parameters: `name:` (required), `description:`, `aliases:` (alternative names), `hidden:` (hide from list).
**Code Snippet:**
```php
#[AsCommand(
    name: 'app:process-orders',
    description: 'Processes pending orders',
    aliases: ['app:orders'],
    hidden: false
)]
class ProcessOrdersCommand extends Command {}
```

---

**Q: What is the Symfony command naming convention?**
**A:** `namespace:verb-noun` in kebab-case. Application-specific commands use the `app:` prefix (e.g., `app:send-report`, `app:import-users`). The `namespace:` part groups related commands in `bin/console list`.
**Code Snippet:** N/A

---

### Configuration (name, description, help)

**Q: Where do you configure a command's name, description, arguments, options, and help text?**
**A:** In the `configure()` method (or via `#[AsCommand]` for name/description). Call `setHelp()`, `addArgument()`, `addOption()` on `$this`.
**Code Snippet:**
```php
protected function configure(): void {
    $this
        ->setHelp('This command imports users from a CSV file.')
        ->addArgument('file', InputArgument::REQUIRED, 'Path to CSV file')
        ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Preview without saving');
}
```

---

**Q: How do you access the command's help text from the CLI?**
**A:** `php bin/console help app:command-name` or `php bin/console app:command-name --help`.
**Code Snippet:**
```bash
php bin/console help app:send-report
php bin/console app:send-report --help
```

---

### Options

**Q: What are the 5 input option modes and what does each mean?**
**A:**
- `VALUE_NONE` — flag (presence = true, no value): `--dry-run`
- `VALUE_REQUIRED` — must have a value: `--format=json`
- `VALUE_OPTIONAL` — value is optional: `--format` or `--format=json`
- `VALUE_IS_ARRAY` — repeatable option: `--tag=a --tag=b`
- `VALUE_NEGATABLE` — allows `--flag` and `--no-flag`
**Code Snippet:**
```php
->addOption('format',  'f', InputOption::VALUE_REQUIRED, 'Output format', 'text')
->addOption('dry-run', null, InputOption::VALUE_NONE, 'Simulate without saving')
->addOption('tag',     null, InputOption::VALUE_IS_ARRAY | InputOption::VALUE_REQUIRED, 'Tags')
->addOption('verbose-output', null, InputOption::VALUE_NEGATABLE, 'Toggle verbose')
```

---

**Q: How do you access an option value in `execute()`?**
**A:** `$input->getOption('option-name')`. Returns `bool` for `VALUE_NONE`, `string|null` for `VALUE_REQUIRED`/`VALUE_OPTIONAL`, `array` for `VALUE_IS_ARRAY`.
**Code Snippet:**
```php
$isDryRun = $input->getOption('dry-run');        // bool
$format   = $input->getOption('format');          // string|null
$tags     = $input->getOption('tag');             // array
```

---

**Q: How do you define a shorthand (alias) for a command option?**
**A:** Pass the shortcut as the second argument to `addOption()`. Single character, used with a single dash.
**Code Snippet:**
```php
->addOption('format', 'f', InputOption::VALUE_REQUIRED, 'Output format')
// Usage: --format=json OR -f json
```

---

**Q: What is a negatable option (`VALUE_NEGATABLE`) and what boolean does it produce?**
**A:** Allows both `--name` (returns `true`) and `--no-name` (returns `false`). If the flag is omitted, returns `null`.
**Code Snippet:**
```php
->addOption('notify', null, InputOption::VALUE_NEGATABLE, 'Send notifications', null)
// --notify → true, --no-notify → false, (absent) → null
```

---

### Arguments

**Q: What are the argument modes available for command arguments?**
**A:**
- `REQUIRED` — must be provided
- `OPTIONAL` — can be omitted (specify default in `addArgument()`)
- `IS_ARRAY` — consumes remaining arguments as an array (must be last)
**Code Snippet:**
```php
->addArgument('username',  InputArgument::REQUIRED, 'The username')
->addArgument('role',      InputArgument::OPTIONAL, 'Role to assign', 'ROLE_USER')
->addArgument('tags',      InputArgument::IS_ARRAY, 'Tags (space separated)')
```

---

**Q: How do you access argument values in `execute()`?**
**A:** `$input->getArgument('name')`. Returns `string` for required/optional, `array` for `IS_ARRAY`.
**Code Snippet:**
```php
$username = $input->getArgument('username'); // string
$tags     = $input->getArgument('tags');     // array
```

---

**Q: What is the order constraint for `IS_ARRAY` arguments?**
**A:** An `IS_ARRAY` argument must be the **last argument** defined, since it consumes all remaining tokens.
**Code Snippet:**
```php
// CORRECT: IS_ARRAY last
->addArgument('dir', InputArgument::REQUIRED)
->addArgument('files', InputArgument::IS_ARRAY)
// WRONG: IS_ARRAY before another argument (runtime error)
```

---

### Input and output objects

**Q: What methods does `OutputInterface` provide for writing to the console?**
**A:** `writeln($messages)` — writes with newline. `write($messages)` — writes without newline. `writeln()` accepts arrays (one line each). Both accept formatting tags.
**Code Snippet:**
```php
$output->writeln('Processing...');
$output->writeln(['Line 1', 'Line 2']);
$output->write('Counting: ');
$output->writeln('Done.');
```

---

**Q: What are the Symfony console output formatting tags and what colour do they produce?**
**A:**
- `<info>` — green (informational)
- `<comment>` — yellow (suggestions, notes)
- `<question>` — cyan (interactive prompts)
- `<error>` — white on red (errors)
**Code Snippet:**
```php
$output->writeln('<info>Success!</info>');
$output->writeln('<error>Something went wrong.</error>');
$output->writeln('<comment>// Note: --dry-run was used</comment>');
```

---

**Q: How do you define a custom output formatter style?**
**A:** Create a `FormatterStyle` and add it to `$output->getFormatter()`.
**Code Snippet:**
```php
$output->getFormatter()->setStyle('fire', new OutputFormatterStyle('red', 'yellow', ['bold']));
$output->writeln('<fire>Custom styled text!</fire>');
```

---

**Q: What is `SymfonyStyle` and why should you prefer it over raw `InputInterface`/`OutputInterface`?**
**A:** `SymfonyStyle` is a helper that wraps both `InputInterface` and `OutputInterface`. It provides rich output methods: `title()`, `section()`, `listing()`, `table()`, `success()`, `warning()`, `error()`, `note()`, `ask()`, `confirm()`, `choice()`, `progressBar()`.
**Code Snippet:**
```php
use Symfony\Component\Console\Style\SymfonyStyle;

protected function execute(InputInterface $input, OutputInterface $output): int {
    $io = new SymfonyStyle($input, $output);
    $io->title('Sending Reports');
    $io->success('All reports sent!');
    $io->error('Failed to send report #42');
    $io->table(['ID', 'Name'], [['1', 'Widget'], ['2', 'Gadget']]);
    return Command::SUCCESS;
}
```

---

**Q: How do you render a formatted table in a console command?**
**A:** Use `SymfonyStyle::table($headers, $rows)` or the low-level `Table` helper.
**Code Snippet:**
```php
$io->table(
    ['ID', 'Email', 'Role'],
    [
        ['1', 'admin@example.com', 'ROLE_ADMIN'],
        ['2', 'user@example.com',  'ROLE_USER'],
    ]
);
```

---

### Helpers

**Q: What is the `ProgressBar` helper and how do you use it?**
**A:** Renders a progress bar in the terminal. Call `start()`, then `advance()` each iteration, then `finish()`. Or use `SymfonyStyle::progressIterate()`.
**Code Snippet:**
```php
$progressBar = $io->createProgressBar(count($items));
$progressBar->start();
foreach ($items as $item) {
    $this->process($item);
    $progressBar->advance();
}
$progressBar->finish();
$output->writeln('');
```

---

**Q: How do you ask for interactive user input in a command?**
**A:** Use `SymfonyStyle::ask()` (free text), `askHidden()` (password), `confirm()` (yes/no), `choice()` (from a list).
**Code Snippet:**
```php
$name     = $io->ask('What is your name?', 'World');
$password = $io->askHidden('Password (hidden):');
$proceed  = $io->confirm('Proceed?', false);
$env      = $io->choice('Select environment', ['dev', 'staging', 'prod'], 'dev');
```

---

**Q: What is the `QuestionHelper` and how does it relate to `SymfonyStyle`?**
**A:** `QuestionHelper` is the low-level helper for interactive questions. `SymfonyStyle::ask()` / `confirm()` / `choice()` all use it internally. You rarely need to use `QuestionHelper` directly.
**Code Snippet:**
```php
// Low-level (rarely needed):
$helper = $this->getHelper('question');
$q = new Question('Enter name: ');
$name = $helper->ask($input, $output, $q);
```

---

**Q: What is the `FormatterHelper` used for?**
**A:** Provides methods to format text in blocks: `formatBlock($messages, $style, $large)` formats text in a styled block (like error boxes). Mostly superseded by `SymfonyStyle::block()` / `error()` / `success()`.
**Code Snippet:**
```php
$helper = $this->getHelper('formatter');
$block = $helper->formatBlock('Critical error occurred!', 'error', true);
$output->writeln($block);
```

---

### Command events

**Q: What events does the Console component dispatch during command execution?**
**A:**
- `ConsoleEvents::COMMAND` — before `execute()` (can short-circuit)
- `ConsoleEvents::TERMINATE` — after `execute()`
- `ConsoleEvents::ERROR` — when an exception is thrown
**Code Snippet:**
```php
class LogCommandSubscriber implements EventSubscriberInterface {
    public static function getSubscribedEvents(): array {
        return [ConsoleEvents::TERMINATE => 'onTerminate'];
    }
    public function onTerminate(ConsoleTerminateEvent $event): void {
        $this->logger->info('Command finished: '.$event->getCommand()->getName(), [
            'exit_code' => $event->getExitCode(),
        ]);
    }
}
```

---

**Q: What does the `ConsoleEvents::ERROR` event allow you to do?**
**A:** Catch exceptions thrown during `execute()` globally (without wrapping each command in try/catch). You can log the error, send an alert, or change the exit code. The event has `getError()` and `setError()` methods.
**Code Snippet:**
```php
public function onConsoleError(ConsoleErrorEvent $event): void {
    $this->alerting->send('Command failed: '.$event->getError()->getMessage());
    // Optionally suppress: $event->setExitCode(0);
}
```

---

### Verbosity levels

**Q: What are the five verbosity levels in Symfony console and their CLI flags?**
**A:**
- `VERBOSITY_QUIET` (`-q`) — suppress all output
- `VERBOSITY_NORMAL` (default) — normal output
- `VERBOSITY_VERBOSE` (`-v`) — more info
- `VERBOSITY_VERY_VERBOSE` (`-vv`) — debug info
- `VERBOSITY_DEBUG` (`-vvv`) — all messages
**Code Snippet:**
```bash
php bin/console app:send-report -v    # verbose
php bin/console app:send-report -vvv  # debug
php bin/console app:send-report -q    # quiet
```

---

**Q: How do you conditionally write output only at a specific verbosity level?**
**A:** Check `$output->isVerbose()`, `isVeryVerbose()`, or `isDebug()`. Or use `OutputInterface::VERBOSITY_*` constants in `writeln()`.
**Code Snippet:**
```php
if ($output->isVerbose()) {
    $output->writeln('Fetching '.$url.'...');
}
$output->writeln('Done.', OutputInterface::VERBOSITY_DEBUG);
```

---

**Q: How do you use `SymfonyStyle` to write messages conditional on verbosity?**
**A:** Use the `$io->isVerbose()`, `$io->isVeryVerbose()`, `$io->isDebug()` methods. No difference from the `OutputInterface` approach.
**Code Snippet:**
```php
$io = new SymfonyStyle($input, $output);
if ($io->isVerbose()) {
    $io->note('Processing item '.$i.' of '.$total);
}
```

---
