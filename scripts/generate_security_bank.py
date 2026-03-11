import json

templates = [
    {"desc": "Voter Role Check", "code": "class Voter{i} {{\n    protected function vote(...) {{\n        $user = $token->getUser();\n        return $user->hasRole('{role}');\n    }}\n}}", "line": 4, "msg": "Always check if $user is an instance of UserInterface before calling hasRole() or similar.", "vars": [{"role": "ROLE_ADMIN"}, {"role": "ROLE_USER"}, {"role": "ROLE_EDITOR"}, {"role": "ROLE_SUPER_ADMIN"}, {"role": "ROLE_ALLOWED_TO_SWITCH"}]},
    {"desc": "Firewall Order", "code": "# security.yaml\nfirewalls:\n    {f1}:\n        pattern: ^/\n    {f2}:\n        pattern: ^/admin", "line": 4, "msg": "Firewall order matters! The most specific pattern (^/admin) must come BEFORE the generic one (^/).", "vars": [{"f1": "main", "f2": "admin"}, {"f1": "default", "f2": "secure"}, {"f1": "api", "f2": "api_v2"}, {"f1": "public", "f2": "private"}, {"f1": "catchall", "f2": "restricted"}]},
    {"desc": "CSRF Stateless", "code": "# security.yaml\nfirewalls:\n    main:\n        stateless: {state}\n        csrf_protection: true", "line": 5, "msg": "CSRF protection requires sessions. If 'stateless' is {state}, traditional CSRF tokens won't work.", "vars": [{"state": "true"}, {"state": "1"}, {"state": "'yes'"}, {"state": "on"}, {"state": "true"}]},
    {"desc": "Authenticator Support", "code": "class Auth{i} {{\n    public function supports(Request $request): ?bool\n    {{\n        return {ret};\n    }}\n}}", "line": 4, "msg": "In Symfony 8, supports() must return a boolean (true/false), not {ret}.", "vars": [{"ret": "null"}, {"ret": "1"}, {"ret": "'true'"}, {"ret": "new Response()"}, {"ret": "[]"}]},
    {"desc": "Access Control Type", "code": "access_control:\n    - {{ path: ^/admin, roles: {role} }}", "line": 2, "msg": "'roles' in access_control should be a string (or array of strings), not {role}.", "vars": [{"role": "true"}, {"role": "123"}, {"role": "null"}, {"role": "{}"}, {"role": "ROLE_ADMIN"}]},
    {"desc": "Password Hasher", "code": "PasswordHasherInterface $hasher;\n$hasher->hash('{plain}', '{salt}');", "line": 2, "msg": "Modern hashers in Symfony do not use a separate salt parameter; it is handled automatically.", "vars": [{"plain": "12345"}, {"plain": "password"}, {"plain": "admin"}, {"plain": "secret"}, {"plain": "qwerty"}]},
    {"desc": "User Provider Key", "code": "providers:\n    users_in_memory:\n        memory:\n            users:\n                {user}: {{ password: '...', roles: '...' }}", "line": 5, "msg": "Roles must be an array, even if there is only one, e.g. ['ROLE_USER'].", "vars": [{"user": "jasser"}, {"user": "admin"}, {"user": "guest"}, {"user": "dev"}, {"user": "tester"}]},
    {"desc": "Logout Path", "code": "firewalls:\n    main:\n        logout:\n            path: {path}", "line": 4, "msg": "The logout 'path' should be a route name (e.g. 'app_logout'), not a URL path like '{path}'.", "vars": [{"path": "/logout"}, {"path": "/admin/logout"}, {"path": "/exit"}, {"path": "/bye"}, {"path": "/signout"}]},
    {"desc": "Voter Attribute", "code": "class Voter{i} extends Voter {{\n    protected function voteOnAttribute(string $attr, $sub, TokenInterface $token)\n    {{ \n        return {val};\n    }}\n}}", "line": 4, "msg": "Voters must return a boolean. Returning {val} is ambiguous or incorrect.", "vars": [{"val": "1"}, {"val": "0"}, {"val": "null"}, {"val": "'ACCESS_GRANTED'"}, {"val": "[]"}]},
    {"desc": "Remember Me Config", "code": "firewalls:\n    main:\n        remember_me:\n            secret: '%kernel.secret%'\n            lifetime: '{time}'", "line": 5, "msg": "Lifetime must be an integer (seconds), not a string '{time}'.", "vars": [{"time": "1 week"}, {"time": "2592000"}, {"time": "30 days"}, {"time": "infinite"}, {"time": "none"}]}
]

items = []
idx = 1
for t in templates:
    for v in t["vars"]:
        code = t["code"].format(i=idx, **v)
        msg = t["msg"].format(**v)
        items.append({
            "id": f"cr-security-bank-{idx}",
            "title": f"Security Challenge: {t['desc']} #{idx}",
            "content": f"```php\n{code}\n```" if 'yaml' not in code and '#' not in code else f"```yaml\n{code}\n```",
            "bugLine": t["line"],
            "bugMessage": msg
        })
        idx += 1

js_code = "window.CodeReviewBank = window.CodeReviewBank || {};\nwindow.CodeReviewBank['security'] = window.CodeReviewBank['security'] || [];\nwindow.CodeReviewBank['security'].push(...\\\n" + json.dumps(items, indent=2) + "\n);"

with open('assets/cr-security-bank.js', 'w') as f:
    f.write(js_code)

print("Generated 50 Security Code Reviews successfully.")
