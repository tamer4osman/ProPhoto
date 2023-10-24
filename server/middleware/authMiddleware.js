const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const tokenPrefix = 'Bearer ';
    const cleanedToken = token.startsWith(tokenPrefix) ? token.slice(tokenPrefix.length).trimLeft() : token;
    
    const verified = jwt.verify(cleanedToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { verifyToken };
