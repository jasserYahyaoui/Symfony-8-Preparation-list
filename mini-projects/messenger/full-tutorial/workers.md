## Workers - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
# Start a worker
php bin/console messenger:consume async -vv

# With limits (prevent memory leaks)
php bin/console messenger:consume async --limit=100 --time-limit=3600 --memory-limit=128M

# Process all queued messages then stop
php bin/console messenger:consume async --limit=10
```

**Supervisor config** (`/etc/supervisor/conf.d/messenger.conf`):
```ini
[program:messenger-worker]
command=php /path/to/bin/console messenger:consume async --time-limit=3600
autostart=true
autorestart=true
numprocs=2
process_name=%(program_name)s_%(process_num)02d
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Workers"](https://symfonycasts.com/search?q=workers)
