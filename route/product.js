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
router.put("/:id", async (req, res) => {
  // verifyTokenAndAdmin
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //DELETE
router.delete("/:id", async (req, res) => {
  // verifyTokenAndAdmin

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
// get Prodict
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all product
router.get("/", async (req, res) => {
  // Query depand on catagoty
  const qNew = req.query.new;
  const qCatagories = req.query.catagories;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCatagories) {
      products = await Product.find({
        catagories: {
          $in: [qCatagories],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
