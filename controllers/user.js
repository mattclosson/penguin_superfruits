//////////////////////////////
// Import Dependencies
//////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

///////////////////////////////
// Create Router
///////////////////////////////
const router = express.Router();


////////////////////////////
// ROUTES
////////////////////////////

// The Signup Routes (Get => Form, Post => form submit)
// "/user/signup"
router.get("/signup", (req, res) => {
  res.render("user/signup.liquid");
});

router.post("/signup", async (req, res) => {
  // generate a salt
  // const salt = await bcrypt.genSalt(10)

  // hash the password
  // req.body.password = await bcrypt.hash(req.body.password, salt)

  // encrypt password
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );

  // save the user to our database
  User.create(req.body)
    .then((user) => {
      // log the user as a test
      console.log(user);
      // redirect user to login
      res.redirect("/user/login");
    })
    // error handling
    .catch((error) => {
      res.json({ error });
    });
});

// The login Routes (Get => Form, Post => form submit)
// "/user/login"
router.get("/login", (req, res) => {
  res.render("user/login.liquid");
});

router.post("/login", async (req, res) => {
  // destructure username and password from req.body
  const { username, password } = req.body;

  // search for the user
  User.findOne({ username })
    .then(async (user) => {
      // check if the user exists
      if (user) {
        // compare passwords
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          // store some data in the session object
          req.session.username = username
          req.session.loggedIn = true
          // redirect to fruits index page
          res.redirect("/fruits");
        } else {
          // send error of wrong password
          res.json({ error: "password doesn't match" });
        }
      } else {
        //send error that user doesn't exist
        res.json({ error: "user doesn't exist" });
      }
    })
    // error handling
    .catch((error) => {
      res.json({ error });
    });
});

// logout route, get request to /user/logout
router.get("/logout", (req, res) => {
    // destroy the session
    req.session.destroy((err) => {
        // send user back to main page
        res.redirect("/")
    })
})

////////////////////////////////
// export the router
/////////////////////////////////
module.exports = router;