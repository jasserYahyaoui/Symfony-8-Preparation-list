# Code Review #15: HTTP Caching Expires

## The Code

```php
use Symfony\Component\HttpFoundation\Response;

$response = new Response();
$response->setExpires(new \DateTime('+1 hour'));
$response->setCache(['public' => true]);
```

**Question:** What happens if you run this?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** It is valid, but the best practice for robust HTTP caching in Symfony is to use `setSharedMaxAge(3600)` alongside or instead, as reverse proxies rely heavily on `s-maxage`.

</details>
