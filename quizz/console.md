# Quiz : Console (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Console component

**Question 1:** The Console component allows you to:
**Type:** Single answer
- [ ] A) Build web pages
- [ ] B) Create CLI commands executed via `php bin/console`
- [ ] C) Manage databases
- [ ] D) Send emails

**Correct Answer(s):** B
**Explanation:** The Console component provides a framework for building CLI commands.

---

### Built-in and custom commands

**Question 2:** Custom commands are registered with which attribute (Symfony 8)?
**Type:** Single answer
- [ ] A) `#[AsCommand(name: 'app:my-command')]`
- [ ] B) `#[Route('/command')]`
- [ ] C) `#[AsController]`
- [ ] D) `#[Command('app:my-command')]`

**Correct Answer(s):** A
**Explanation:** `#[AsCommand]` replaces the old `$defaultName` static property.

---

**Question 3:** `#[AsCommand]` accepts which parameters? (Select all)
**Type:** Multiple choice
- [ ] A) `name:`
- [ ] B) `description:`
- [ ] C) `hidden:`
- [ ] D) `aliases:`

**Correct Answer(s):** A, B, C, D
**Explanation:** All four are valid parameters of `#[AsCommand]`.

---

### Configuration (arguments and options)

**Question 4:** In `configure()`, `$this->addArgument('name', InputArgument::REQUIRED)` means:
**Type:** Single answer
- [ ] A) The argument is optional
- [ ] B) The user MUST provide this argument when running the command
- [ ] C) The argument has a default value
- [ ] D) The argument accepts multiple values

**Correct Answer(s):** B
**Explanation:** `REQUIRED` = user must supply the value, otherwise the command errors.

---

**Question 5:** `InputArgument::IS_ARRAY` means:
**Type:** Single answer
- [ ] A) The argument is an array type
- [ ] B) The argument accepts multiple values (e.g., `app:cmd val1 val2 val3`)
- [ ] C) The argument is required
- [ ] D) The argument is hidden

**Correct Answer(s):** B
**Explanation:** `IS_ARRAY` collects all remaining arguments into an array.

---

### Options and their modes

**Question 6:** The 5 option modes in Symfony Console are:
**Type:** Multiple choice
- [ ] A) `InputOption::VALUE_NONE`
- [ ] B) `InputOption::VALUE_REQUIRED`
- [ ] C) `InputOption::VALUE_OPTIONAL`
- [ ] D) `InputOption::VALUE_IS_ARRAY`
- [ ] E) `InputOption::VALUE_NEGATABLE`

**Correct Answer(s):** A, B, C, D, E
**Explanation:** All five are valid modes: none (flag), required, optional, array, negatable (`--no-option`).

---

**Question 7:** `VALUE_NONE` means:
**Type:** Single answer
- [ ] A) The option requires a value
- [ ] B) The option is a boolean flag — no value accepted (`--verbose` not `--verbose=3`)
- [ ] C) The option is ignored
- [ ] D) The option is hidden

**Correct Answer(s):** B
**Explanation:** `VALUE_NONE` = presence/absence flag. Returns `true` if present.

---

**Question 8:** `VALUE_NEGATABLE` allows:
**Type:** Single answer
- [ ] A) Negative numbers
- [ ] B) Both `--option` (true) and `--no-option` (false) forms
- [ ] C) Empty values
- [ ] D) Null values

**Correct Answer(s):** B
**Explanation:** `--dry-run` → true, `--no-dry-run` → false, absent → null.

---

### Input/Output objects

**Question 9:** `$input->getArgument('name')` returns:
**Type:** Single answer
- [ ] A) An option value
- [ ] B) The value of the `name` argument passed by the user
- [ ] C) The command name
- [ ] D) An InputOption object

**Correct Answer(s):** B
**Explanation:** Gets the argument value by name.

---

**Question 10:** `$output->writeln('Hello')` does what?
**Type:** Single answer
- [ ] A) Writes to a log file
- [ ] B) Writes "Hello" followed by a newline to stdout
- [ ] C) Writes to the database
- [ ] D) Renders a Twig template

**Correct Answer(s):** B
**Explanation:** `writeln()` = write + newline. `write()` = no trailing newline.

---

### SymfonyStyle helper

**Question 11:** `SymfonyStyle` provides:
**Type:** Single answer
- [ ] A) CSS styling
- [ ] B) Rich output formatting (titles, tables, progress bars, questions, notes, success/error messages)
- [ ] C) Database queries
- [ ] D) HTTP responses

**Correct Answer(s):** B
**Explanation:** `SymfonyStyle` is a helper for beautiful, consistent CLI output.

---

**Question 12:** `$io->success('Done!')` outputs:
**Type:** Single answer
- [ ] A) Plain text
- [ ] B) A green success block with the message
- [ ] C) A JSON response
- [ ] D) Nothing

**Correct Answer(s):** B
**Explanation:** `success()`, `error()`, `warning()`, `note()` output styled blocks.

---

### Helpers

**Question 13:** The `QuestionHelper` allows:
**Type:** Single answer
- [ ] A) Querying the database
- [ ] B) Interactive prompts (confirmation, choice, text input) in the terminal
- [ ] C) HTTP requests
- [ ] D) Rendering templates

**Correct Answer(s):** B
**Explanation:** `QuestionHelper` or `SymfonyStyle::ask()`, `confirm()`, `choice()` for interactive input.

---

**Question 14:** The `ProgressBar` helper:
**Type:** Single answer
- [ ] A) Shows download progress
- [ ] B) Displays a progress bar for iterative operations (configurable format, steps)
- [ ] C) Tracks time
- [ ] D) Monitors memory

**Correct Answer(s):** B
**Explanation:** `$bar->start($max)`, `$bar->advance()`, `$bar->finish()`.

---

**Question 15:** The `Table` helper renders:
**Type:** Single answer
- [ ] A) HTML tables
- [ ] B) Formatted ASCII tables in the terminal
- [ ] C) Database tables
- [ ] D) CSV files

**Correct Answer(s):** B
**Explanation:** `Table` formats data as aligned ASCII tables with headers and rows.

---

### Events

**Question 16:** `ConsoleEvents::COMMAND` fires:
**Type:** Single answer
- [ ] A) After the command finishes
- [ ] B) Before the command's `execute()` method runs
- [ ] C) On error
- [ ] D) When the console boots

**Correct Answer(s):** B
**Explanation:** Fires before execution — allows disabling or modifying the command.

---

**Question 17:** `ConsoleEvents::TERMINATE` fires:
**Type:** Single answer
- [ ] A) Before execution
- [ ] B) After the command finishes (includes exit code)
- [ ] C) On error only
- [ ] D) When PHP exits

**Correct Answer(s):** B
**Explanation:** Fires after execution — access the exit code and perform cleanup.

---

**Question 18:** `ConsoleEvents::ERROR` fires:
**Type:** Single answer
- [ ] A) Before execution
- [ ] B) When an exception is thrown during command execution
- [ ] C) On successful completion
- [ ] D) On SIGTERM

**Correct Answer(s):** B
**Explanation:** Error event — allows handling/logging exceptions, optionally changing the exit code.

---

### Verbosity levels

**Question 19:** The default verbosity level is:
**Type:** Single answer
- [ ] A) `VERBOSITY_QUIET`
- [ ] B) `VERBOSITY_NORMAL`
- [ ] C) `VERBOSITY_VERBOSE`
- [ ] D) `VERBOSITY_DEBUG`

**Correct Answer(s):** B
**Explanation:** `VERBOSITY_NORMAL` is default. Use `-v`, `-vv`, `-vvv` for higher levels.

---

**Question 20:** The flags for verbosity are:
**Type:** Single answer
- [ ] A) `-v` (verbose), `-vv` (very verbose), `-vvv` (debug)
- [ ] B) `--verbose=1,2,3`
- [ ] C) `-d`, `-dd`, `-ddd`
- [ ] D) `--level=1,2,3`

**Correct Answer(s):** A
**Explanation:** `-v` = VERBOSE, `-vv` = VERY_VERBOSE, `-vvv` = DEBUG, `-q` = QUIET.

---

**Question 21:** Command return values: `Command::SUCCESS` = ?, `Command::FAILURE` = ?, `Command::INVALID` = ?
**Type:** Single answer
- [ ] A) 0, 1, 2
- [ ] B) 1, 0, -1
- [ ] C) true, false, null
- [ ] D) 200, 500, 400

**Correct Answer(s):** A
**Explanation:** `SUCCESS = 0`, `FAILURE = 1`, `INVALID = 2` — standard exit codes.

---

---
