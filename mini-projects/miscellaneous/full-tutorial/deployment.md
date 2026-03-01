## Deployment - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
# 1. Set environment to production
echo 'APP_ENV=prod' > .env.local

# 2. Install production dependencies only
composer install --no-dev --optimize-autoloader

# 3. Clear and warm up the cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# 4. Compile assets (if using AssetMapper or Webpack)
php bin/console asset-map:compile

# 5. Run database migrations (if applicable)
php bin/console doctrine:migrations:migrate --no-interaction

# 6. Set permissions
chmod -R 775 var/
chown -R www-data:www-data var/
```

**Key differences dev vs prod:**
- `APP_ENV=prod`, `APP_DEBUG=0`
- No Profiler, no debug toolbar
- Compiled container (cached, faster)
- Optimized autoloader


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Deployment"](https://symfonycasts.com/search?q=deployment)
