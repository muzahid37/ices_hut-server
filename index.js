const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./route/user");
const authRoute = require("./route/auth");
const productRoute = require("./route/product");

const port = process.env.PORT || 5000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Db connected"));

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from ice hut server");
});

app.listen(port, () => {
  console.log(`ice hut listening on port ${port}`);
});
/// ices_hut-server
//ice_server_admin
//QpHakxuRMp9LnghI
