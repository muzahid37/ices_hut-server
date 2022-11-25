const router = require("express").Router();
// var CryptoJS = require("crypto-js");

const User = require("../models/User");
router.get("/authTest", (req, res) => {
  res.send("auth test is successfull ");
});

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    // CryptoJS.AES.encrypt(
    //   res.body.password,
    //   process.env.PASS_SEC
    // ).toString(),
  });
  try {
    const saveuser = await newUser.save();
    res.status(201).json(saveuser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
