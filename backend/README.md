# Backend Setup

## npm install

- CORS
- dotenv
- Express
- knex
- pg

### Backend Instructions

> `npm run start` or `npm run start:dev` starts the server on `localhost:5001`. Start:dev will execute nodemon for automated server resets when backend files are updated and saved.

> To setup the local development server you need to change the environment variable in ./backend/src/db/connection.js to represent `development` rather than `production`.

`const environment = process.env.NODE_ENV || 'development'`

> Rename the .env.sample to .env in your ./backend root directory so that the application knows where to send it's requests.

---

# Testing Setup

## npm --save-dev install

- jest
- nodemon
- supertest

### Testing Instructions

> You can run the tests by typing in the command console from the backend directory: `npm run test` this will run both pizza-toppings.test and topping.test files.

---
