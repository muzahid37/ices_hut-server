const jwt = require("jsonwebtoken");

const webToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(401).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you have not authinticate token");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  webToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed for do this ");
    }
  });
};

module.exports = { webToken, verifyTokenAndAuthorization };
