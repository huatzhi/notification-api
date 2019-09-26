# notification-api

## mysql 8.0+ issue

Sequelize ORM is depend on node-mysql2, which currently does not support the new auth method.
Solution: <https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server>
Considering submit PR to fix the issue in the future.
