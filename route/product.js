const Product = require("../models/Product");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./webToken");
const router = require("express").Router();
// CREATE;
router.post("/", async (req, res) => {
  // verifyTokenAndAdmin
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
// const router = require("express").Router();
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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
//   }
// });
// //DELETE
// router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("User has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// router.get("/find/:id", async (req, res) => {
//   // verifyTokenAndAdmin
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// // get all users
// router.get("/", async (req, res) => {
//   // verifyTokenAndAdmin
//   const query = req.query.new;
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// router.get("/stats", async (req, res) => {
//   // verifyTokenAndAdmin
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
