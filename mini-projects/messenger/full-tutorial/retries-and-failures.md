## Retries and failures - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


In `config/packages/messenger.yaml`:
```yaml
framework:
    messenger:
        failure_transport: failed  # Where failed messages go

        transports:
            async:
                dsn: 'doctrine://default'
                retry_strategy:
                    max_retries: 3
                    delay: 1000        # 1 second initial delay
                    multiplier: 2      # Exponential backoff: 1s, 2s, 4s
                    max_delay: 30000   # Cap at 30 seconds

            failed:
                dsn: 'doctrine://default?queue_name=failed'
```

**Handling failures:**
```bash
# List failed messages
php bin/console messenger:failed:show

# Retry a specific failed message
php bin/console messenger:failed:retry 123

# Retry all failed messages
php bin/console messenger:failed:retry

# Remove a failed message permanently
php bin/console messenger:failed:remove 123
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Retries and failures"](https://symfonycasts.com/search?q=retries%2Band%2Bfailures)
