const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("user", {
    title: "User",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign Up",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        console.log("User already Exists!");
        return;
      }
      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            console.log("Error in signing up user");
            return;
          }
          console.log("Successfully created user");
        });
        return res.redirect("/users/sign-in");
      } else {
        return res.redirect("back");
      }
    }
  );
};
//sign in and create session
module.exports.createSession = function (req, res) {
  //TODO
};