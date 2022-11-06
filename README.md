# This is the Main Application for team B2ST in DCSIL

## Running App

### Development

1. Install Docker/Docker Compose. Make sure docker daemon is running.
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
- Database
    - Run `docker-compose exec -it mongo bash` to access the DB.

