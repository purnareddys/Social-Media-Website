const express = require("express");
const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");
app.use(express.static("./assets"));
app.use(expressLayouts);

const db = require("./config/mongoose");

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// use express router
app.use("/", require("./routes"));

//set up view engine
app.set("view engine", "ejs");
app.set("vieusers/profilews", "./views");
app.listen(port, function (err) {
  if (err) {
    console.log(`Error Occured, ${err}`);
  } else {
    console.log(`Port is running on ${port}`);
  }
});
