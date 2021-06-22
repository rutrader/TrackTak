## MongoDB Setup

# Local database deployment from command line

Start up instances:

```bash
cd database
docker-compose up
```

Connect to MongoDB Docker container then execute:

```bash
mongo -u <DATABASE_ROOT_USER> -p <DATABASE_ROOT_PASSWORD> --authenticationDatabase admin

 db.createUser({
  "user": "<DATABASE_USER>",
  "pwd": "<DATABASE_PASSWORD>",
  "roles": [{
    "role": "readWrite",
    "db": "<DATABASE_NAME>"
  }]
})
```
