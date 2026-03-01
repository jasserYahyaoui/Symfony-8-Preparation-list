# Quiz : Messenger (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading.

---

### Messenger component

**Question 1:** The Messenger component provides:
**Type:** Single answer
- [ ] A) Email sending
- [ ] B) A message bus for dispatching messages to handlers (sync and async)
- [ ] C) Chat functionality
- [ ] D) WebSocket support

**Correct Answer(s):** B
**Explanation:** Messenger implements the command/query bus pattern — dispatch messages, handle them synchronously or via transports.

---

**Question 2:** A message in Symfony Messenger is:
**Type:** Single answer
- [ ] A) An HTTP request
- [ ] B) A plain PHP object (DTO) carrying data
- [ ] C) A database record
- [ ] D) A Twig template

**Correct Answer(s):** B
**Explanation:** Messages are simple PHP classes — no interface required. They carry data for handlers to process.

---

### Messages and handlers

**Question 3:** A message handler is registered with:
**Type:** Single answer
- [ ] A) `#[AsMessageHandler]` attribute
- [ ] B) `#[Route]` attribute
- [ ] C) `#[AsController]`
- [ ] D) `#[AsCommand]`

**Correct Answer(s):** A
**Explanation:** `#[AsMessageHandler]` or implementing `MessageHandlerInterface` (with autoconfigure).

---

**Question 4:** The handler's `__invoke()` method receives:
**Type:** Single answer
- [ ] A) A `Request` object
- [ ] B) The message object as its argument
- [ ] C) A `Response` object
- [ ] D) An array

**Correct Answer(s):** B
**Explanation:** `public function __invoke(MyMessage $message)` — the message type is inferred from the type-hint.

---

**Question 5:** One message can have multiple handlers.
**Type:** True / False
- [ ] A) True
- [ ] B) False

**Correct Answer(s):** A
**Explanation:** Multiple handlers for the same message type are supported. Each is called independently.

---

### Transports

**Question 6:** A transport determines:
**Type:** Single answer
- [ ] A) The HTTP protocol version
- [ ] B) How and where messages are sent for async processing (e.g., AMQP, Redis, Doctrine, in-memory)
- [ ] C) The database driver
- [ ] D) The template engine

**Correct Answer(s):** B
**Explanation:** Transports connect Messenger to queuing backends (RabbitMQ, Redis, Doctrine DBAL, Amazon SQS, etc.).

---

**Question 7:** The `sync://` transport:
**Type:** Single answer
- [ ] A) Sends messages to RabbitMQ
- [ ] B) Handles messages immediately in the current process (no queue)
- [ ] C) Uses Redis
- [ ] D) Drops messages

**Correct Answer(s):** B
**Explanation:** `sync://` = synchronous processing. Useful for development or when async isn't needed.

---

### Routing messages

**Question 8:** Routing in Messenger determines:
**Type:** Single answer
- [ ] A) HTTP routes for messages
- [ ] B) Which transport a message is sent to when dispatched
- [ ] C) The controller that handles the message
- [ ] D) The database table

**Correct Answer(s):** B
**Explanation:** `messenger.routing` maps message classes to transport names.

---

**Question 9:** If a message is NOT routed to any transport, it is:
**Type:** Single answer
- [ ] A) Dropped silently
- [ ] B) Handled synchronously (inline)
- [ ] C) An error is thrown
- [ ] D) Queued in the default transport

**Correct Answer(s):** B
**Explanation:** Unrouted messages are handled synchronously by their handlers in the current process.

---

### Stamps and Envelopes

**Question 10:** An `Envelope` wraps:
**Type:** Single answer
- [ ] A) HTML content
- [ ] B) A message + metadata (stamps)
- [ ] C) A database query
- [ ] D) A template

**Correct Answer(s):** B
**Explanation:** `Envelope` = message + stamps (metadata like delay, transport name, retry count).

---

**Question 11:** `DelayStamp` does what?
**Type:** Single answer
- [ ] A) Cancels the message
- [ ] B) Delays the message processing by a specified number of milliseconds
- [ ] C) Prioritizes the message
- [ ] D) Encrypts the message

**Correct Answer(s):** B
**Explanation:** `new DelayStamp(5000)` = delay 5 seconds before processing.

---

**Question 12:** You can dispatch a message with stamps using:
**Type:** Single answer
- [ ] A) `$bus->dispatch(new Envelope($message, [new DelayStamp(3000)]))`
- [ ] B) `$bus->send($message, 3000)`
- [ ] C) `$bus->queue($message, ['delay' => 3000])`
- [ ] D) `$bus->push($message)`

**Correct Answer(s):** A
**Explanation:** Wrap the message in an `Envelope` with stamps, then dispatch.

---

### Workers

**Question 13:** The Messenger worker is started with:
**Type:** Single answer
- [ ] A) `php bin/console messenger:consume async`
- [ ] B) `php bin/console messenger:start`
- [ ] C) `php bin/console messenger:run`
- [ ] D) `php bin/console queue:work`

**Correct Answer(s):** A
**Explanation:** `messenger:consume <transport>` starts the worker that processes queued messages.

---

**Question 14:** `--limit=10` on `messenger:consume` means:
**Type:** Single answer
- [ ] A) Process max 10 messages then stop
- [ ] B) Process 10 messages per second
- [ ] C) Use 10 threads
- [ ] D) Limit queue size to 10

**Correct Answer(s):** A
**Explanation:** `--limit=10` processes 10 messages then gracefully stops the worker.

---

### Retries and failures

**Question 15:** When a handler throws an exception, the message is:
**Type:** Single answer
- [ ] A) Lost forever
- [ ] B) Retried according to the retry strategy, then sent to the failure transport
- [ ] C) Re-dispatched immediately
- [ ] D) Logged and ignored

**Correct Answer(s):** B
**Explanation:** Failed messages are retried (configurable delays/multiplier). After max retries, sent to the failure transport.

---

**Question 16:** `messenger:failed:show` displays:
**Type:** Single answer
- [ ] A) All successful messages
- [ ] B) All messages in the failure transport
- [ ] C) Transport configuration
- [ ] D) Worker status

**Correct Answer(s):** B
**Explanation:** Lists failed messages for inspection and potential replay.

---

**Question 17:** `messenger:failed:retry` does what?
**Type:** Single answer
- [ ] A) Deletes failed messages
- [ ] B) Re-dispatches failed messages for another processing attempt
- [ ] C) Shows error logs
- [ ] D) Stops the worker

**Correct Answer(s):** B
**Explanation:** Retries specific failed messages by re-dispatching them.

---

### Middleware

**Question 18:** Messenger middleware executes:
**Type:** Single answer
- [ ] A) Before and after the handler (like a pipeline/chain of responsibility)
- [ ] B) Only before the handler
- [ ] C) Only after the handler
- [ ] D) Independently from the handler

**Correct Answer(s):** A
**Explanation:** Middleware wraps the handler — code before `$stack->next()->handle()` runs before, code after runs after.

---

**Question 19:** Built-in middleware includes: (Select all)
**Type:** Multiple choice
- [ ] A) `SendMessageMiddleware` (sends to transport)
- [ ] B) `HandleMessageMiddleware` (calls the handler)
- [ ] C) `AddBusNameStampMiddleware`
- [ ] D) `LoggingMiddleware`

**Correct Answer(s):** A, B, C
**Explanation:** `SendMessageMiddleware`, `HandleMessageMiddleware`, and `AddBusNameStampMiddleware` are built-in. There's no built-in `LoggingMiddleware`.

---

### Events

**Question 20:** Messenger dispatches events during message processing. Which are valid? (Select all)
**Type:** Multiple choice
- [ ] A) `WorkerMessageReceivedEvent`
- [ ] B) `WorkerMessageHandledEvent`
- [ ] C) `WorkerMessageFailedEvent`
- [ ] D) `SendMessageToTransportsEvent`
- [ ] E) `WorkerStartedEvent`

**Correct Answer(s):** A, B, C, D, E
**Explanation:** All five are valid Messenger events for monitoring and extending behavior.

---

---
