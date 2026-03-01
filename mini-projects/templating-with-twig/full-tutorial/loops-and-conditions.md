## Loops and conditions - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch templates/twig_topic/loops.html.twig
```

`templates/twig_topic/loops.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}
{% block body %}
<h2>Loops & Conditions</h2>

{% set users = [
    {name: 'Alice', age: 30, active: true},
    {name: 'Bob', age: 17, active: false},
    {name: 'Charlie', age: 25, active: true},
] %}

<h3>For loop with loop variable</h3>
<table border="1" cellpadding="5">
<tr><th>#</th><th>Name</th><th>Age</th><th>Status</th><th>Loop info</th></tr>
{% for user in users %}
<tr>
    <td>{{ loop.index }}</td>
    <td>{{ user.name }}</td>
    <td>{{ user.age }}</td>
    <td>
        {% if user.active and user.age >= 18 %}
            ✅ Active Adult
        {% elseif user.active %}
            ⚠️ Active Minor
        {% else %}
            ❌ Inactive
        {% endif %}
    </td>
    <td>
        first={{ loop.first ? 'yes' : 'no' }},
        last={{ loop.last ? 'yes' : 'no' }},
        length={{ loop.length }}
    </td>
</tr>
{% else %}
<tr><td colspan="5">No users found.</td></tr>
{% endfor %}
</table>

<h3>Ternary operator</h3>
<p>{{ users|length > 0 ? 'Has users' : 'Empty' }}</p>

<h3>Null coalescing</h3>
<p>{{ unknown_var ?? 'default value' }}</p>
{% endblock %}
```

Add a route in `FunctionsController` or create a new one to render this template.

**Step 4:** Visit the page in browser.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Loops and conditions"](https://symfonycasts.com/search?q=loops%2Band%2Bconditions)
