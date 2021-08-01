const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`hello world from router server`);
});

// registration authentication
router.post("/register", (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill the fields properly" });
  }

  User.findOne({ email: email }).then((userExist) => {
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    user
      .save()
      .then(() => {
        res.status(201).json({ message: "user registered successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: "failed to register" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// signin authentication
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "plz fill the credentials" });
  }

  const userLogin = await User.findOne({ email: email });
  if (userLogin) {
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      res.json({ message: "user signin successfully" });
    }
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }

  console.log(userLogin);
});

module.exports = router;

/*/

// 2nd method for post registration

router.post("./register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill the fields properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email aready exist" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    await user.save();
    res.status(201).json({ messge: "user register sucesfully" });
  } catch (err) {
    console.log(err);
  }
});

/*/
