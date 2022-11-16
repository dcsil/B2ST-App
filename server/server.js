const express = require("express");
const cors = require("cors");
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
require("dotenv").config({path: "./.env"});
const app = express();
const port = process.env.PORT || 5000;
const db = require("./config/db");
//import sms.js
const {sendSMS,getSMS,router }= require("./routes/sms");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
// TODO - uncomment before deploying
app.use(Sentry.Handlers.errorHandler());

app.use(cors());
app.use(express.json());
app.use(router);



db.connect(() => {
  app.use("/users", require("./routes/user"))
  app.get("/", (req, res)=>{
    res.send("Api Running")
  })
  app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`)
    // getSMS({datesent:"2022-11-16", limit:10}).then((messages) => {console.log(messages)});
    // sendSMS("Hello World", "");
  });
});
