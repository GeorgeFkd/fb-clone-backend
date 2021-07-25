const jwtsecret = "my house is on fire";
const jwt = require("jsonwebtoken");

//* this is middleware for protected stuff

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, jwtsecret);

    //! this might cause trouble
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
