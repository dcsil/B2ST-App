[![Maintainability](https://api.codeclimate.com/v1/badges/40ef6e0914ef31702018/maintainability)](https://codeclimate.com/repos/6362eba2a7651b2e18001635/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/40ef6e0914ef31702018/test_coverage)](https://codeclimate.com/repos/6362eba2a7651b2e18001635/test_coverage)

# This is the Main Application for team B2ST in DCSIL

## Running App

### Development

1. On macOs, install Docker/Docker Compose. Make sure docker daemon is running. If is LINUX, go to next step.
2. At root folder, run `sh script/bootstrap`. This will install the required dependencies for this app and run `docker-compose up`.
3. The web app should run at http://localhost:3000.

## Project Setup

### Front-end

We used CRA to create a React application in our /client directory.

### Server

We setup a Node-Express server in our /server directory.

### CI

We use Github Actions for our repo's CI, the setup can be found in `./github/workflows`

### Test

Run `sh script/root` and follow instructions. We are using Jest for testing our Javascript based app.

The tests are in:
    - `./server/tests` for backend tests
    - `./client/src/tests` for frontend tests

### Datasets

We used datasets from Kaggle to train our marketing system which originated at the following links:

- https://www.kaggle.com/datasets/mkechinov/ecommerce-purchase-history-from-electronics-store
- https://www.kaggle.com/datasets/mkechinov/ecommerce-events-history-in-electronics-store

### Other Details

- Configuration
    - Credentials are mostly provided by running `script/bootstrap`.
    - You can setup your own credentials in .env, or credentials will be copied from `.env.example` when setup.
    - For twilio credentials
     - Go to https://www.twilio.com/, sign up an account
     - Fill in the TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and PHONE_NUMBER in `server/env`
- Database
    - After setup with bootstrap, run `docker-compose exec -it b2st-app_mongo_1 mongosh` to access the local DB.

## Deployment and Production

- Deployed to Heroku automatically once CI is green on master, using github workflow `heroku-deployment.ymml`.

- Production is available with Heroku.

    - Client: https://b2st-app.herokuapp.com/

    - Server: https://b2st-server.herokuapp.com/
