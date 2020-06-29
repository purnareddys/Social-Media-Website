const Posts = require("../models/post");
module.exports.home = function (req, res) {
  Posts.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
      });
    });
};
