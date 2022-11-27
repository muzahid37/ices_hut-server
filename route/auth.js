const router = require("express").Router();
const CryptoJS = require("crypto-js");

const User = require("../models/User");
router.get("/authTest", (req, res) => {
  res.send("auth test is successfull ");
});

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const saveuser = await newUser.save();
    res.status(201).json(saveuser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword != req.body.password &&
      res.status(401).json("Wrong User password");
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
// try{
//     const user = await User.findOne(
//         {
//             userName: req.body.user_name
//         }
//     );

//     !user && res.status(401).json("Wrong User Name");

//     const hashedPassword = CryptoJS.AES.decrypt(
//         user.password,
//         process.env.PASS_SEC
//     );

//     const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

module.exports = router;
