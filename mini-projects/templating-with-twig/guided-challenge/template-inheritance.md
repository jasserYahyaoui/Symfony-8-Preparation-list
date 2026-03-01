## Template inheritance - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a 3-level inheritance: `base.html.twig` → `admin_layout.html.twig` → `dashboard.html.twig`. Use `{{ parent() }}` to append content from each level.

<details><summary>Click to reveal Solution</summary>

`admin_layout.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}
{% block header %}{{ parent() }} <span>| Admin Panel</span>{% endblock %}
{% block body %}
    <nav>Admin Nav: Dashboard | Users | Settings</nav>
    {% block admin_content %}{% endblock %}
{% endblock %}
```

`dashboard.html.twig`:
```twig
{% extends 'twig_topic/admin_layout.html.twig' %}
{% block title %}Dashboard{% endblock %}
{% block admin_content %}
    <h2>Dashboard</h2>
    <p>Welcome to the admin dashboard!</p>
{% endblock %}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Template inheritance"](https://symfonycasts.com/search?q=template%2Binheritance)
