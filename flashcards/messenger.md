# Flashcards : Messenger (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading. Routing messages & Stamps/Envelopes included.

---

### Messenger component

**Q: What is the core architectural pattern that the Messenger component implements?**
**A:** The **Message Bus** pattern (also Command Bus / Event Bus). You `dispatch()` a message; the bus routes it to one or more handlers, either immediately (sync) or queued (async via a transport).
**Code Snippet:**
```php
$this->bus->dispatch(new ProcessOrderMessage($order->getId()));
```

---

**Q: What is the only constraint on a Messenger message object?**
**A:** None — it is a plain PHP object (POPO). No interface or base class required. It must be **serializable** (no closures or resources) if dispatched to an async transport.
**Code Snippet:**
```php
class ProcessOrderMessage {
    public function __construct(
        public readonly int $orderId,
        public readonly string $currency = 'EUR',
    ) {}
}
```

---

**Q: How does Symfony identify which handler to call for a given message?**
**A:** By the **type-hint** of the handler's `__invoke()` (or the first argument of any `#[AsMessageHandler]`-annotated method). The type-hint = the message class.
**Code Snippet:**
```php
#[AsMessageHandler]
class ProcessOrderHandler {
    public function __invoke(ProcessOrderMessage $message): void {
        // ...
    }
}
```

---

**Q: What are the three pre-configured bus names in a standard Symfony project?**
**A:** `messenger.bus.default`, `command.bus` (one handler, command pattern), `query.bus` (returns result), `event.bus` (multiple handlers, no return). These are convention-based names — only `messenger.bus.default` is guaranteed to exist without extra config.
**Code Snippet:**
```php
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
// Target a specific bus:
#[AsMessageHandler(bus: 'command.bus')]
class CreateUserHandler { ... }
```

---

**Q: What is the `MessageBusInterface` and how do you inject it?**
**A:** The main DI interface for dispatching messages. Autowired by type. If multiple buses exist, use `#[Target('bus_name')]` to disambiguate.
**Code Snippet:**
```php
use Symfony\Component\Messenger\MessageBusInterface;

public function __construct(
    private MessageBusInterface $bus,
    #[Target('event.bus')] private MessageBusInterface $eventBus,
) {}
```

---

**Q: Can a single message have multiple handlers? What bus option controls this?**
**A:** Yes. By default, multiple handlers are allowed. Set `allow_multiple_handlers: false` on a bus to restrict to exactly one handler per message (typical for command buses).
**Code Snippet:**
```yaml
framework:
    messenger:
        buses:
            command.bus:
                default_middleware:
                    enabled: true
                    allow_no_handlers: false
```

---

### Transports

**Q: What is a Messenger transport and what is its role?**
**A:** A storage/queue driver (Redis, AMQP, Doctrine DBAL, in-memory) that holds messages until a worker processes them. Without a transport pointing to async storage, messages are handled synchronously.
**Code Snippet:**
```yaml
framework:
    messenger:
        transports:
            async:
                dsn: '%env(MESSENGER_TRANSPORT_DSN)%'
                options:
                    queue_name: default
```

---

**Q: What does the `sync://` transport do?**
**A:** Processes messages **immediately and synchronously** in the same request/process. Useful for development or for messages that must not be delayed.
**Code Snippet:**
```yaml
transports:
    sync: 'sync://'
routing:
    App\Message\QuickTask: sync
```

---

**Q: What does the `in-memory://` transport do and when is it used?**
**A:** Stores dispatched messages in a PHP array (RAM only). Never actually consumed by workers. Used in tests to assert on dispatch count/content without real queues.
**Code Snippet:**
```yaml
# config/packages/test/messenger.yaml
framework:
    messenger:
        transports:
            async: 'in-memory://'
```
```php
/** @var InMemoryTransport $transport */
$transport = static::getContainer()->get('messenger.transport.async');
self::assertCount(1, $transport->getSent());
```

---

**Q: What is the `failed` transport and how does it work?**
**A:** A special transport that receives messages that failed all retry attempts. You can then inspect with `messenger:failed:show`, retry with `messenger:failed:retry`, or delete with `messenger:failed:remove`.
**Code Snippet:**
```yaml
framework:
    messenger:
        failure_transport: failed
        transports:
            async:
                dsn: '%env(MESSENGER_TRANSPORT_DSN)%'
                failure_transport: failed
            failed:
                dsn: '%env(MESSENGER_TRANSPORT_DSN)%'
                options: { queue_name: failed }
```

---

**Q: What DSN format does Symfony use for an in-process async transport backed by Doctrine DBAL?**
**A:** `doctrine://default?queue_name=messenger` (using the `doctrine/messenger` bridge). Creates a `messenger_messages` table in the database. ⚠️ Doctrine is out of exam scope — understand the DSN format conceptually.
**Code Snippet:**
```yaml
transports:
    async: 'doctrine://default?queue_name=orders'
```

---

**Q: How do you configure a transport with retry options?**
**A:** Use the `retry_strategy` sub-key under the transport definition.
**Code Snippet:**
```yaml
transports:
    async:
        dsn: '%env(MESSENGER_TRANSPORT_DSN)%'
        retry_strategy:
            max_retries: 5
            delay: 500       # ms before first retry
            multiplier: 2    # exponential backoff
            max_delay: 30000 # cap at 30s
```

---

### Messages and handlers

**Q: What is the `#[AsMessageHandler]` attribute and what does it replace?**
**A:** It marks a class (or method) as a Messenger handler. Replaces the old `MessageHandlerInterface`. With `autoconfigure: true`, it is auto-tagged as `messenger.message_handler`.
**Code Snippet:**
```php
#[AsMessageHandler]
class SendWelcomeEmailHandler {
    public function __invoke(UserRegisteredMessage $message): void {
        $this->mailer->sendWelcome($message->email);
    }
}
```

---

**Q: How do you handle a message with a named method instead of `__invoke()`?**
**A:** Pass `method:` to `#[AsMessageHandler]`.
**Code Snippet:**
```php
#[AsMessageHandler(method: 'handle')]
class OrderHandler {
    public function handle(ProcessOrderMessage $message): void { ... }
    public function cancel(CancelOrderMessage $message): void { ... } // needs its own attribute
}
```

---

**Q: How do you return a result from a message handler (query bus pattern)?**
**A:** Return the value from `__invoke()`. Access it from the dispatching side via `$envelope->last(HandledStamp::class)->getResult()`.
**Code Snippet:**
```php
// Handler:
public function __invoke(FindUserQuery $query): User {
    return $this->repo->find($query->id) ?? throw new UserNotFound();
}

// Dispatch side:
$envelope = $this->queryBus->dispatch(new FindUserQuery($id));
$user = $envelope->last(HandledStamp::class)->getResult();
```

---

**Q: What does `dispatch_after_current_bus` middleware do?**
**A:** Delays dispatching messages to the bus until the current handler finishes successfully. Useful in transactional contexts (if the outer handler fails, inner dispatches are not sent).
**Code Snippet:**
```yaml
command.bus:
    middleware:
        - dispatch_after_current_bus
```

---

### Routing messages

**Q: How do you map a message class to a transport in `messenger.yaml`?**
**A:** Use the `routing:` section. The key is the message FQCN (or wildcard `*`), the value is a transport name or array.
**Code Snippet:**
```yaml
framework:
    messenger:
        routing:
            App\Message\SendEmailMessage: async
            App\Message\CriticalAlert: [async, audit_log]
            'App\Message\Report\*': reports_transport
```

---

**Q: What happens when no route is configured for a dispatched message?**
**A:** It is handled **synchronously** — the handler runs immediately in the current request with no queuing.
**Code Snippet:** N/A

---

**Q: How do you dispatch a message to a specific transport regardless of routing config?**
**A:** Wrap it in an `Envelope` with a `TransportNamesStamp`.
**Code Snippet:**
```php
use Symfony\Component\Messenger\Stamp\TransportNamesStamp;

$this->bus->dispatch(
    new Envelope(new ProcessOrderMessage(42), [new TransportNamesStamp(['async'])])
);
```

---

**Q: How do you send a message to multiple transports?**
**A:** In `routing:`, provide an array of transport names. The message is **sent to all** listed transports.
**Code Snippet:**
```yaml
routing:
    App\Message\ImportantEvent: [transport_one, transport_two]
```

---

**Q: What is the `*` wildcard in routing and when should you use it with care?**
**A:** Routes all unmatched messages to the specified transport. Useful as a default catch-all but can accidentally route messages you intended to be synchronous.
**Code Snippet:**
```yaml
routing:
    'App\Message\*': async      # All App\Message\ classes → async
    App\Message\LowPriority: sync  # Exception: must come BEFORE the wildcard? No — more specific wins.
```

---

**Q: How do you force a message to be handled synchronously even when a transport route exists?**
**A:** Dispatch it with `TransportNamesStamp(['sync'])`, which overrides the configured routing.
**Code Snippet:**
```php
$this->bus->dispatch(
    (new Envelope(new EmailMessage()))->with(new TransportNamesStamp(['sync']))
);
```

---

### Stamps and Envelopes

**Q: What is an `Envelope` in Symfony Messenger?**
**A:** A wrapper around the message that carries an array of `Stamp` objects (metadata). When you call `$bus->dispatch($message)`, it is immediately wrapped in an `Envelope`.
**Code Snippet:**
```php
use Symfony\Component\Messenger\Envelope;

$envelope = new Envelope($message, [new DelayStamp(5_000)]);
$this->bus->dispatch($envelope);
```

---

**Q: What is a `Stamp` and what interface must it implement?**
**A:** A metadata object attached to an `Envelope`. Must implement `Symfony\Component\Messenger\Stamp\StampInterface`. No methods are required — it's a marker with optional data.
**Code Snippet:**
```php
use Symfony\Component\Messenger\Stamp\StampInterface;

class CorrelationIdStamp implements StampInterface {
    public function __construct(public readonly string $id) {}
}
```

---

**Q: What are the 5 most important built-in Stamps?**
**A:**
1. `DelayStamp(ms)` — delay before processing
2. `TransportNamesStamp(['name'])` — override routing
3. `HandledStamp` — added after handling, contains handler result
4. `SentStamp` — added after message is sent to a transport
5. `ReceivedStamp` — added when consumed from a transport
**Code Snippet:**
```php
use Symfony\Component\Messenger\Stamp\{DelayStamp, HandledStamp};

$this->bus->dispatch(new Envelope($msg, [new DelayStamp(60_000)])); // 60s delay

// After dispatch with sync handler:
$envelope = $this->bus->dispatch(new QueryMessage());
$result = $envelope->last(HandledStamp::class)->getResult();
```

---

**Q: How do you retrieve a specific stamp from an Envelope?**
**A:** Use `$envelope->last(StampClass::class)` for the most recent, or `$envelope->all(StampClass::class)` for all instances of that type.
**Code Snippet:**
```php
$sent = $envelope->last(SentStamp::class);
if ($sent) {
    echo 'Sent to transport: '.$sent->getSenderClass();
}
```

---

**Q: How do you attach a custom stamp at dispatch time?**
**A:** Create the `Envelope` with the stamp in the constructor, or chain `->with(new MyStamp(...))`.
**Code Snippet:**
```php
$envelope = (new Envelope($message))
    ->with(new CorrelationIdStamp('req-xyz-123'))
    ->with(new DelayStamp(10_000));
$this->bus->dispatch($envelope);
```

---

**Q: How do you read a custom stamp inside a middleware?**
**A:** In the middleware's `handle()` method, call `$envelope->last(MyStamp::class)` before or after passing to `$stack->next()`.
**Code Snippet:**
```php
public function handle(Envelope $envelope, StackInterface $stack): Envelope {
    $stamp = $envelope->last(CorrelationIdStamp::class);
    $this->logger->info('Processing', ['correlation_id' => $stamp?->id]);
    return $stack->next()->handle($envelope, $stack);
}
```

---

### Workers

**Q: What command starts a Messenger worker?**
**A:** `php bin/console messenger:consume <transport_name(s)>`. The worker loops, polling the transport for messages.
**Code Snippet:**
```bash
php bin/console messenger:consume async
php bin/console messenger:consume async audit_log --time-limit=3600 --limit=100
```

---

**Q: What does `--time-limit` do on `messenger:consume`?**
**A:** Stops the worker after N seconds. Combined with a process manager (Supervisor) that restarts it, this prevents memory leaks from long-running processes.
**Code Snippet:**
```bash
php bin/console messenger:consume async --time-limit=3600
```

---

**Q: What does `--limit` do on `messenger:consume`?**
**A:** Stops the worker after processing N messages. Useful for batch processing or memory management.
**Code Snippet:**
```bash
php bin/console messenger:consume async --limit=500
```

---

**Q: How do you gracefully stop all running workers?**
**A:** `php bin/console messenger:stop-workers` — sends a signal to all workers to finish their current message and then stop.
**Code Snippet:**
```bash
php bin/console messenger:stop-workers
```

---

**Q: What Messenger worker lifecycle events can you subscribe to?**
**A:** `WorkerStartedEvent`, `WorkerMessageReceivedEvent`, `WorkerMessageHandledEvent`, `WorkerMessageFailedEvent`, `WorkerRunningEvent`, `WorkerStoppedEvent`.
**Code Snippet:**
```php
#[AsEventListener(WorkerMessageFailedEvent::class)]
public function onFailure(WorkerMessageFailedEvent $event): void {
    $this->alerting->send(
        'Message failed: '.get_class($event->getEnvelope()->getMessage()),
        ['error' => $event->getThrowable()->getMessage()]
    );
}
```

---

### Retries and failures

**Q: How does Messenger handle a handler exception by default?**
**A:** Retries up to 3 times with exponential back-off. After all retries exhausted, sends to `failure_transport` (if configured) or the message is lost.
**Code Snippet:**
```yaml
transports:
    async:
        retry_strategy:
            max_retries: 3
            delay: 1000
            multiplier: 2
```

---

**Q: How do you permanently reject a message and skip all retries?**
**A:** Throw `UnrecoverableMessageHandlingException` from the handler. Messenger routes it straight to the failure transport without retrying.
**Code Snippet:**
```php
use Symfony\Component\Messenger\Exception\UnrecoverableMessageHandlingException;

public function __invoke(ProcessPaymentMessage $msg): void {
    if ($msg->isFraud()) {
        throw new UnrecoverableMessageHandlingException('Fraud detected — no retry.');
    }
}
```

---

**Q: What commands manage the failure transport?**
**A:**
- `messenger:failed:show` — list failed messages
- `messenger:failed:retry` — retry one or all
- `messenger:failed:remove` — delete messages
**Code Snippet:**
```bash
php bin/console messenger:failed:show
php bin/console messenger:failed:retry --force   # retry all
php bin/console messenger:failed:remove 42       # remove by ID
```

---

### Middleware

**Q: What is Middleware in Messenger and in what pattern does it sit?**
**A:** Middleware wraps every `dispatch()` call in an onion-layer pattern (decorator/chain of responsibility). Each middleware can run code **before** and **after** the next layer, including the handler.
**Code Snippet:**
```php
class LoggingMiddleware implements MiddlewareInterface {
    public function handle(Envelope $envelope, StackInterface $stack): Envelope {
        $this->logger->info('dispatching '.get_class($envelope->getMessage()));
        $envelope = $stack->next()->handle($envelope, $stack);
        $this->logger->info('handled');
        return $envelope;
    }
}
```

---

**Q: How do you register custom middleware on a bus?**
**A:** Add it under the bus's `middleware:` list in `messenger.yaml`.
**Code Snippet:**
```yaml
framework:
    messenger:
        buses:
            messenger.bus.default:
                middleware:
                    - App\Middleware\LoggingMiddleware
                    - App\Middleware\AuditMiddleware
```

---

**Q: What are the two most important built-in middlewares automatically added to every bus?**
**A:**
1. `SendMessageMiddleware` — reads routing config and sends to transport
2. `HandleMessageMiddleware` — calls the actual message handler(s)
**Code Snippet:** N/A

---

**Q: What does `add_bus_name_stamp_middleware` do?**
**A:** Adds a `BusNameStamp` to every envelope, recording which bus dispatched the message. Useful when consuming from a shared transport that receives messages from multiple buses.
**Code Snippet:**
```yaml
messenger.bus.default:
    middleware:
        - add_bus_name_stamp_middleware: messenger.bus.default
```

---

### Events

**Q: When does `WorkerMessageReceivedEvent` fire and what can you do with it?**
**A:** Fires on the worker side just after a message is received from the transport, before the handler runs. You can inspect the envelope or even prevent handling by calling `$event->shouldHandle(false)`.
**Code Snippet:**
```php
#[AsEventListener(WorkerMessageReceivedEvent::class)]
public function onReceived(WorkerMessageReceivedEvent $event): void {
    if ($this->maintenanceMode->isActive()) {
        $event->shouldHandle(false); // Requeue / skip
    }
}
```

---

**Q: When does `WorkerMessageHandledEvent` fire?**
**A:** After a message is successfully handled (all handlers ran without exception). The envelope (with `HandledStamp`) is accessible.
**Code Snippet:** N/A

---

**Q: When does `WorkerMessageFailedEvent` fire and is the message automatically retried?**
**A:** After a handler throws. Retrying is managed by the retry strategy — this event fires first, allowing you to log or send alerts. `$event->willRetry()` tells you if a retry is scheduled.
**Code Snippet:**
```php
public function onFailure(WorkerMessageFailedEvent $event): void {
    if (!$event->willRetry()) {
        $this->notifier->criticalAlert('Message permanently failed');
    }
}
```

---
