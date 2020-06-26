const express = require("express");
const app = express();
const port = 8000;

app.listen(port, function (err) {
  if (err) {
    console.log(`Error Occured, ${err}`);
  } else {
    console.log(`Port is running on ${port}`);
  }
});
