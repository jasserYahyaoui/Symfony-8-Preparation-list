# 00 — Sandbox Project Setup

> **Goal:** Create and run the single monolithic Symfony 8.0 project (`symfony-8-certif-sandbox`) that will host ALL practical exercises for every certification topic.

---

## Prerequisites Checklist

Before starting, ensure you have the following installed:

| Tool | Required Version | Check Command |
|------|-----------------|---------------|
| PHP  | 8.4+            | `php -v`      |
| Composer | 2.x+       | `composer -V`  |
| Symfony CLI | Latest  | `symfony version` |
| Docker Desktop | Latest (optional) | `docker --version` |
| Git  | Any             | `git --version` |

---

## Option A: Using Symfony CLI (Recommended)

### Step 1: Create the Symfony 8.0 project

```bash
symfony new symfony-8-certif-sandbox --version="8.0.*" --webapp
cd symfony-8-certif-sandbox
```

> **Note:** The `--webapp` flag installs the full Symfony web application skeleton (Twig, Doctrine ORM, Security, etc.). This ensures all components needed for the certification topics are available.

### Step 2: Verify the installation

```bash
php bin/console about
```

You should see Symfony version `8.0.x` and PHP `8.4.x`.

### Step 3: Start the local development server

```bash
symfony server:start -d
```

The application will be available at `https://127.0.0.1:8000/`.

### Step 4: Verify it works

```bash
symfony open:local
```

You should see the Symfony welcome page.

### Step 5: Stop the server (when done)

```bash
symfony server:stop
```

---

## Option B: Using Docker

### Step 1: Create the Symfony project (same as above)

```bash
symfony new symfony-8-certif-sandbox --version="8.0.*" --webapp
cd symfony-8-certif-sandbox
```

### Step 2: Create the `Dockerfile`

Create a file named `Dockerfile` at the project root:

```dockerfile
FROM php:8.4-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install \
    intl \
    opcache \
    zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set the document root to Symfony's public/ folder
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Allow .htaccess overrides
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader

# Set permissions for var/ directory
RUN chown -R www-data:www-data var/

EXPOSE 80
```

### Step 3: Create `compose.yaml`

Create a file named `compose.yaml` at the project root:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    volumes:
      - .:/var/www/html
      - /var/www/html/vendor  # Prevent vendor override from host
    environment:
      APP_ENV: dev
      APP_DEBUG: "1"
```

### Step 4: Build and run

```bash
docker compose up -d --build
```

The application will be available at `http://localhost:8080/`.

### Step 5: Run Symfony console commands inside the container

```bash
docker compose exec app php bin/console about
```

### Step 6: Stop the container (when done)

```bash
docker compose down
```

---

## Project Directory Structure Convention

All practical exercises will follow this namespace and directory convention. Create these directories now:

```bash
# Create topic-specific directories
mkdir -p src/Controller/PhpTopic
mkdir -p src/Controller/HttpTopic
mkdir -p src/Controller/ArchitectureTopic
mkdir -p src/Controller/RoutingTopic
mkdir -p src/Controller/ControllersTopic
mkdir -p src/Controller/TwigTopic
mkdir -p src/Controller/FormsTopic
mkdir -p src/Controller/ValidationTopic
mkdir -p src/Controller/DiTopic
mkdir -p src/Controller/SecurityTopic
mkdir -p src/Controller/CachingTopic
mkdir -p src/Controller/MessengerTopic
mkdir -p src/Controller/ConsoleTopic
mkdir -p src/Controller/TestsTopic
mkdir -p src/Controller/MiscTopic

# Other topic-specific directories (non-controller)
mkdir -p src/Command/ConsoleTopic
mkdir -p src/Command/MiscTopic
mkdir -p src/EventSubscriber/ArchitectureTopic
mkdir -p src/EventSubscriber/HttpTopic
mkdir -p src/EventListener
mkdir -p src/Form
mkdir -p src/Validator
mkdir -p src/Message
mkdir -p src/MessageHandler
mkdir -p src/Security
mkdir -p src/Service
mkdir -p src/DataTransformer
mkdir -p src/Twig
```

> **Architecture rule:** Every file you create during the exercises will go into the appropriate topic directory. This keeps the project clean and lets you isolate each exam topic.

---

## Quick Verification

Run the following to confirm everything is properly wired:

```bash
# Check routes (should show the default Symfony routes)
php bin/console debug:router

# Check the container (should list hundreds of services)
php bin/console debug:container --show-private | head -20

# Check installed packages
composer show | grep symfony
```

✅ If all three commands work, your sandbox is ready. Proceed to `01-php.md`.
