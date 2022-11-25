const mongoose = require("mongoose");

const peoductScema = new mongoose.Schema(
  {
    productname: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    catagories: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", peoductScema);
