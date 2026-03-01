## Profile and profiler usage in tests - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
public function testProfiler(): void
{
    $client = static::createClient();
    $client->enableProfiler(); // MUST be called before the request

    $client->request('GET', '/php/api-demo');

    $this->assertResponseIsSuccessful();

    // Access the profiler
    $profile = $client->getProfile();

    // Check time
    $timeCollector = $profile->getCollector('time');
    $this->assertLessThan(1000, $timeCollector->getDuration()); // Under 1 second

    // Check no exceptions
    $exceptionCollector = $profile->getCollector('exception');
    $this->assertFalse($exceptionCollector->hasException());
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Profile and profiler usage in tests"](https://symfonycasts.com/search?q=profile%2Band%2Bprofiler%2Busage%2Bin%2Btests)
