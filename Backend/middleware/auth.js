const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoursecret');
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden - Role not allowed' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
