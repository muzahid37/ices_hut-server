const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./webToken");
//UPDATE
const router = require("express").Router();
// router.put("/:id", verifyTokenAndAuthorization, (req, res) => {
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString();
//   }
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   } eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODIzYWI5NWNlMjg5ZjI5YzkxMmU4NiIsImlzQWRpbSI6ZmFsc2UsImlhdCI6MTY2OTU1ODMwMCwiZXhwIjoxNjY5ODE3NTAwfQ.PN_T-NcCIePSPZzgeIyp3riPBBVT5OYPWW30QNkYXEU
// });
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/user/userPostTest
module.exports = router;
