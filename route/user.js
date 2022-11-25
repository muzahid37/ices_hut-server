const router = require("express").Router();

router.get("/userTest", (req, res) => {
  res.send("use test is successfull 2");
});

router.post("/userPostTest", (req, res) => {
  const usename = req.body.usename;
  res.send("your use name is " + usename);
});

// /api/user/userPostTest
module.exports = router;
