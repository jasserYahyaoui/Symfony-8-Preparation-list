## Stamps and envelopes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Stamp\DelayStamp;
use Symfony\Component\Messenger\Stamp\TransportNamesStamp;

#[Route('/send-delayed', name: 'messenger_delayed', methods: ['POST'])]
public function sendDelayed(MessageBusInterface $bus): JsonResponse
{
    $message = new SendNotification('user@test.com', 'Delayed', 'This was delayed 30s');

    // Method 1: Dispatch with stamps
    $bus->dispatch($message, [
        new DelayStamp(30000), // 30 seconds delay in milliseconds
    ]);

    // Method 2: Create an Envelope manually
    $envelope = new Envelope($message, [
        new DelayStamp(60000),
        new TransportNamesStamp(['async']), // Force specific transport
    ]);
    $bus->dispatch($envelope);

    return $this->json(['status' => 'dispatched with delay']);
}
```

**Key stamps:**
- `DelayStamp(int $delay)`: Delay processing (ms).
- `TransportNamesStamp(array $transportNames)`: Route to specific transport.
- `HandledStamp`: Added after a handler processes the message.
- `SentStamp`: Added when message is sent to a transport.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Stamps and envelopes"](https://symfonycasts.com/search?q=stamps%2Band%2Benvelopes)
