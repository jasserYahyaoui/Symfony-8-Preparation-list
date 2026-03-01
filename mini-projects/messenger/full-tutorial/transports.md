## Transports - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


In `config/packages/messenger.yaml`:
```yaml
framework:
    messenger:
        transports:
            sync: 'sync://'                    # Processed immediately
            async: 'doctrine://default'         # Stored in DB, processed by worker
            # redis: 'redis://localhost:6379'   # Redis transport
            # amqp: 'amqp://guest:guest@localhost/%2f/messages'  # RabbitMQ

        routing:
            # Route messages to transports
            App\Message\SendNotification: async
            App\Message\GenerateReport: async
            # Everything else: sync (default)
```

**Step 4:** Test async processing:

```bash
# Dispatch a message (goes to doctrine transport)
curl -X POST -H "Content-Type: application/json" \
     -d '{"to":"test@test.com","subject":"Async"}' \
     https://127.0.0.1:8000/messenger/send

# Run the worker to process queued messages
php bin/console messenger:consume async -vv

# Debug: see failed messages
php bin/console messenger:failed:show
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Transports"](https://symfonycasts.com/search?q=transports)
