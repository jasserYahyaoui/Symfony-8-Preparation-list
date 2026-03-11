# Code Review #12: Twig Rendering

## The Code

```twig
{# templates/index.html.twig #}
<h1>Welcome {{ app.user.username }}</h1>
```

**Question:** What is the potential visual/application error with this Twig snippet?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** If the user is not logged in, `app.user` will be `null`, resulting in an error calling `username` on `null`. It should be `app.user.username | default('Guest')` or checking `app.user` first.

</details>
