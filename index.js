const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");
app.use(express.static("./assets"));
app.use(expressLayouts);

const db = require("./config/mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo")(session);

const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());
app.use(cookieParser());

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");
//mongo store is used to the
//session cookie in the db
app.use(
  session({
    name: "Codeial",
    //TODO
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "Connect -mongoDb Setup Ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error Occured, ${err}`);
  } else {
    console.log(`Port is running on ${port}`);
  }
});
