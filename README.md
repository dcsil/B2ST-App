# This is the Main Application for team B2ST in DCSIL

## Running App

### Development

1. On macOs, install Docker/Docker Compose. Make sure docker daemon is running. If is LINUX, go to next step.
2. At root folder, run `script/bootstrap`. This will install the required dependencies for this app and run `docker-compose up`.
3. The web app should run at http://localhost:3000.

## Project Setup

### Front-end

We used CRA to create a React application in our /client directory.

### Server

We setup a Node-Express server in our /server directory.

### CI

We use Github Actions for our repo's CI, the setup can be found in /.github/workflows

### Other Details

- Configuration
    - Credentials are mostly provided by running `script/bootstrap`.
    - You can setup your own credentials in .env, or credentials will be copied from `.env.example` when setup.
    - For mongo atlas credentials,
        1. Create a mongodb atlas account
        2. After login, create a cluster.
        3. On `security/database access`, create a user
        4. On `deployment/database`, click `browse collections` and create a database
        5. Now on this repo, copy `.env.example` as `.env` in `server` folder, replace with your credentials including username and password of the user you created, database name and cluster name.

        For more details check mongodb atlas documentation: https://www.mongodb.com/docs/atlas/getting-started/ 
- Database
    - Run `docker-compose exec -it mongo bash` to access the local DB.

## Deployment and Production

- Deployed to Heroku automatically once CI is green on master, using github workflow `heroku-deployment.ymml`.

- Production is available with Heroku.

    - Client: https://b2st-app.herokuapp.com/

    - Server: https://b2st-server.herokuapp.com/
