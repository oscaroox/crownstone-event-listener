## Event Server


## setup 
```bash
npm install
```


### Env file

Before starting the app create a .env file and copy the contents of the example.env into it.
The example.env file contains environment variables that are unique for each developer. you should change these with your keys/values.


### Adding new users to event server

When a new user uses the crownstone for the first time, the lambda function will need to send the userid and accessToken to this server.
Once we get this information we can store the user in our database and start listening for events for that user.
Before the lambda function can call this server, we must assign it a valid JWT token. this can be done by running the `npm run generate:token` command in the root of this project.


### Handling Events
[TODO]

### database
[TOOO]

### Project structure
[TODO]


### Deploying to production
[TODO]