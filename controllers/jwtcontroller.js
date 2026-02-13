const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config"); 

const isAuth = async (req, res, next) => {
  console.log("middle");
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided or incorrect format");
    return res.status(401).json({
      isAuthenticated: false,
      message: "No token provided or incorrect format",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; 
    console.log("Token verified, user:", req.user);
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error.message);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "Token expired" });
    }
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Invalid token" });
  }
};

module.exports = {isAuth};