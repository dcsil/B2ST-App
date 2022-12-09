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
     - Go to https://www.twilio.com/, sign up an account, create a message service
     - Fill in the TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_PHONE_NUMBER, TWILIO_MESSAGING_SERVICE (provided by Twilio) in `server/env`
     - Add the phone you verified with twilio as TEST_PHONE in `server/env`
- Database
    - After setup with bootstrap, run `docker-compose exec -it b2st-app_mongo_1 mongosh` to access the local DB.

## Deployment and Production

- Deployed to Heroku automatically once CI is green on master, using github workflow `heroku-deployment.ymml`.

- Production is available with Heroku.

    - Client: https://b2st-app.herokuapp.com/

    - Server: https://b2st-server.herokuapp.com/

# Demo Instruction
## SMS 
1. Pre: Get twilio credential if you want to test with your phone (Note: Twilio restrict trial account to send to unverified phone)
    - Go to twilio website and register for a trial twilio account, it should ask you to verify with your phone
    - Follow the instruction on twilio dashboard to get a twilio phone number
    - click on "messaging/service" on side bar, create a messaging service with your twilio phone number
2. In our repo, in "server/.env", fill up following environment variables:
    - TWILIO_ACCOUNT_SID: Account SID in your twilio account
    - TWILIO_AUTH_TOKEN: Auth Token in your twilio account
    - TWILIO_PHONE_NUMBER: My Twilio phone number in your twilio account info
    - TWILIO_MESSAGING_SERVICE: The messaging service sid you just applied with your twilio account
3. After you build and run the app, and logged in:
    - Go to Campaign page by clicking the side bar on dashboard
    - The first table is the contact table, you should saw a blank one.
        - Click on the "+" button to add a new contact linked to your account
        -   You should saw a dialog pop up, on the dialog, fill up the name and the phone number of the contact
        - The phone number of contact is unique with each account and should be a real phone number
        - After fill out all the input, Click submit, If everything is good, you should see a green alert popup at left buttom
        - Click refresh to see the table updated
    - After having some contacts in contact table, you can click on some rows to select
        - Then, click on the "sendText" button, you will see a send text dialog pop up.
        - Fill out the message, and you can toggle with the "promotion code" button to decide if send the text with a random generated promotion code
        - Can also schedule a text in a range of 20 min after and 7 days from now
        - Click submit. If all texts send without error, you will see a green alert popup.
    - If you have sent some texts, you can click on "refresh" on the below table and should see some rows show up.
    

## Stripe Authentication:
Note: Users do not need to create a Stripe account to make payment/subscribe. This section is only for developers!
- Create a Stripe account. The Stripe API uses API keys to authenticate requests. You can view and manage your API keys in the Stripe Dashboard.

- Test mode secret keys have the prefix sk_test_ and live mode secret keys have the prefix sk_live_. Use your API key by setting it in the initial configuration of stripe. The Node.js library will then automatically send this key in each request. You can update this API key by replacing /server/.env STRIPE_SEC string. 

## Subscription 
- You need to login as a valid user to subscribe our plan, If you are not, follow User Authentication section to register as our new user. 
- Go to Dashboard, click on Plans button at the left navbar. 
- Choose a desired plan. By clicking it, you will be redirect to a Payment page. This page is supported by Stripe. 
- Check whether the email and the price is correct. If so, use 4242 4242 4242 4242 as test visa card to pay. 
- By clicking Subscribe button, if this payment is sucess, you will be redirect to main page.
- Go to Dashboard, there will be an updated paln shown up on top right corner of you dashboard. 
- You can change your plan at anytime by repeating the same process.

## User Authentication
### Sign up
- Click Register button on the top right.
- Type in your first name, last name, email address and password. make sure all fields are valid and all checkings are passed.
- Click Sign up, you will be redirect to dashboard page. Your email address will be shown on top right corner of the dashboard. 
- If you already have an account, click "Already have an account? Sign in" to sign in.
### Log in
- If you already have an account, Log in by type in your email, and the corresponding password. 
- If logged in sucessfully you will be redirect to dashboard page. Your email address will be shown on top right corner of the dashboard. 
- If you do not have an account, click "Don't have an account? Sign Up" to Sign up.
### Log out
- If you are already signed in, Click on Log out button at the left side, you will be logged out and redirect to main page. 
