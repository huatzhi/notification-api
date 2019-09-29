# notification-api
This project provide 4 api, which is `/api/register`, `/api/commonstudents`, `/api/suspend` and `/api/retirevenotifications`.

## Getting Started

### Prerequisites
You will need MySQL to run the system. NodeJs 12+ is preferred, but 10+ would still running fine.
You will also have to create the database before connecting to the system.
```
CREATE DATABASE notification_api;
```
Note that if you are running MySQL 8.0+, you might want to switch to old version of "native password" for the system to work.
Here is the example that you will need to do, changing the `password` to your desire password.

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
```
For more information regarding to this issue, consult the mysql 8.0+ issue section at the later part of this `README.md`.

### Installing
First, you will need to clone the project.
```
git clone https://github.com/huatzhi/notification-api.git
```
Then, you will need to move into the folder and install the necessary node modules.
```
cd notification-api
npm i
```
Then, you will need to change .env file to suit your environment setting.
```
DB_HOST=localhost            # where you host your mysql
DB_PORT=3306                 # the port your mysql is hosted
DB_NAME=notification_api     # the database name you just created for this system
DB_USER=root                 # your mysql user that use to connect the database
DB_PASS=root                 # your mysql password that use to connect the database
API_PORT=9000                # the api port that you want to run the system at
```
Once these are done, you can just run `npm start` to start the project.

## Running the test
Mocha is used with the shouldjs for the tests. It is already installed in the dev dependencies. This line of code is all you need to run the test.
```
npm test
```
## Deployment
Basically is the same as installing. However, instead of `npm i`, `npm i --production` is preferred to not install the dev dependency. You can also edit the pm2.json to suit your nginx load balancer. By default, run it will only create one instance.
```
pm2 start pm2.json
```

## Others

### YAGNI Approach
Any specification that does not specify in the requirement are resolve with YAGNI approach, meaning in order to not waste too much time thinking how I am going to design it (but I still did it for at least 60% of the time anyway), I'll just leave how the logic originally going to turn out unless it make no sense.

### mysql 8.0+ issue
Sequelize ORM is depend on node-mysql2, which currently does not support the new auth method.
Solution: <https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server>
Considering submit PR to fix the issue in the future.

### Publicly hosted api
<http://149.28.156.166/>
(Remember to add `/api/` at the back of the link)
