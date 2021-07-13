## MongoDB Setup

# Local database deployment from command line

Start up instances:

```bash
cd database
docker-compose up
```

Connect to MongoDB Docker container:
```bash
docker container ls
docker exec -it myContainerId bash
```
where myContainerId is the ID of the 'mongo' container

then execute the following, replacing user and password with that defined in docker-compose.yml

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
