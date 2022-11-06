# B2ST App

This is code development repo for B2ST.

This apps aims to provie SMS marketing automation for SMES.

## Development

1. Install Docker/Docker Compose. Make sure docker daemon is running.
2. At root folder, run `script/bootstrap`. This will install the required dependencies for this app and run `docker-compose up`.
3. The web app should run at http://localhost:3000.

### Other Details

- Configuration
    - Credentials are mostly provided by running `script/bootstrap`.
- Database
    - Run `docker-compose exec -it mongo bash` to access the DB.

